import { options } from './src/config/options.js';
import { scenarioUsersList } from './src/scenarios/users-list.scenario.js';

export { options };

/**
 * Entry point for k6.
 * Keep this file small; put logic under /src for maintainability.
 */
export default function () {
  scenarioUsersList();
}

function num(v, digits = 2) {
  if (v === undefined || v === null || Number.isNaN(v)) return 'n/a';
  return Number(v).toFixed(digits);
}

/**
 * k6 summary hook.
 * Generates artifacts directly from k6 without any Node wrapper scripts:
 * - performance/output/summary.json
 * - performance/output/performance-report.generated.md
 */
export function handleSummary(data) {
  const m = data.metrics ?? {};
  const dur = m.http_req_duration?.values ?? {};
  const failed = m.http_req_failed?.values ?? {};
  const reqs = m.http_reqs?.values ?? {};

  const md = `# Performance Report (Generated)

Source: k6 \`handleSummary\`

## Key metrics
- **P50**: ${num(dur['p(50)'])} ms
- **P95**: ${num(dur['p(95)'])} ms
- **P99**: ${num(dur['p(99)'])} ms
- **Error rate**: ${num((failed.rate ?? 0) * 100, 3)}%
- **Throughput (req/s)**: ${num(reqs.rate, 2)}

## Scenario
- 100 RPS total using \`constant-arrival-rate\` (default), with up to 100 VUs
- Duration: configurable via \`K6_DURATION\`

## Notes
- Raw numbers can fluctuate because \`reqres.in\` is a public demo API.
- For assumptions and interpretation guidelines see: \`performance/performance-report.md\`
`;

  return {
    'performance/output/summary.json': JSON.stringify(data, null, 2),
    'performance/output/performance-report.generated.md': md
  };
}
