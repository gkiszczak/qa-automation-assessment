import { options } from './src/config/options.js';
import { runScenario } from './src/scenarios/index.js';

export { options };

export default function() {
  runScenario();
}

function num(v, digits = 2) {
  if (v === undefined || v === null || Number.isNaN(v)) return 'n/a';
  return Number(v).toFixed(digits);
}

export function handleSummary(data) {
  const m = data.metrics ?? {};
  const dur = m.http_req_duration?.values ?? {};
  const failed = m.http_req_failed?.values ?? {};
  const reqs = m.http_reqs?.values ?? {};
  
  const s2xx = m.status_2xx?.values?.count ?? 0;
  const s4xx = m.status_4xx?.values?.count ?? 0;
  const s5xx = m.status_5xx?.values?.count ?? 0;
  const s429 = m.status_429?.values?.count ?? 0;
  const terr = m.transport_errors?.values?.count ?? 0;
  
  const md = `# Performance Report (Generated)

## Scenario
- K6_SCENARIO: ${__ENV.K6_SCENARIO ?? 'users_list'}

## Latency — http_req_duration
| Metric | Value |
|---|---:|
| P50 | ${num(dur['p(50)'])} ms |
| P95 | ${num(dur['p(95)'])} ms |
| P99 | ${num(dur['p(99)'])} ms |

## Reliability
- Error rate: ${num((failed.rate ?? 0) * 100, 3)}%
- Throughput: ${num(reqs.rate, 2)} req/s

## Status breakdown
- 2xx: ${s2xx}
- 4xx: ${s4xx}
- 5xx: ${s5xx}
- 429: ${s429}
- Transport (status=0): ${terr}
`;
  
  return {
    'performance/output/summary.json': JSON.stringify(data, null, 2),
    'performance/output/performance-report.generated.md': md
  };
}