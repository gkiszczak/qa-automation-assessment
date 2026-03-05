import { getEnvNumber, getEnvString } from './env.js';

const VUS = getEnvNumber('K6_VUS', 100);
const DURATION = getEnvString('K6_DURATION', '60s');
const STRICT = getEnvString('K6_STRICT', 'false').toLowerCase() === 'true';

export const options = {
  scenarios: {
    users_list: {
      executor: 'constant-vus',
      vus: VUS,
      duration: DURATION
    }
  },
  
  summaryTrendStats: ['min', 'avg', 'med', 'p(50)', 'p(90)', 'p(95)', 'p(99)', 'max'],
  
  thresholds: STRICT ?
    {
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(95)<800']
    } :
    {}
};