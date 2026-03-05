import { getEnvNumber, getEnvString } from './env.js';

const VUS = getEnvNumber('K6_VUS', 100);
const DURATION = getEnvString('K6_DURATION', '60s');
const RPS = getEnvNumber('K6_RPS', 100);

// CI: non-strict by default (public API). Enable strict locally if needed.
const STRICT = getEnvString('K6_STRICT', 'false').toLowerCase() === 'true';

export const options = {
  scenarios: {
    users_list: {
      executor: 'constant-arrival-rate',
      rate: RPS,
      timeUnit: '1s',
      duration: DURATION,
      preAllocatedVUs: VUS,
      maxVUs: VUS
    }
  },
  
  // Ensure p50/p99 exist in summary
  summaryTrendStats: ['min', 'avg', 'med', 'p(50)', 'p(90)', 'p(95)', 'p(99)', 'max'],
  
  thresholds: STRICT ?
    {
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(95)<800']
    } :
    {}
};
