import { getEnvNumber, getEnvString } from './env.js';

/**
 * Assignment requirement:
 * - 100 concurrent users
 * - each user sends 1 request per second
 *
 * Equivalent traffic: ~100 requests/sec total.
 *
 * For future extensibility and more precise control we use the
 * 'constant-arrival-rate' executor at 100 RPS with up to 100 VUs.
 */
const VUS = getEnvNumber('K6_VUS', 100);
const DURATION = getEnvString('K6_DURATION', '60s');
const RPS = getEnvNumber('K6_RPS', 100);

export const options = {
  scenarios: {
    users_list: {
      executor: 'constant-arrival-rate',
      rate: RPS,          // iterations per timeUnit
      timeUnit: '1s',
      duration: DURATION,
      preAllocatedVUs: VUS,
      maxVUs: VUS
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800']
  }
};
