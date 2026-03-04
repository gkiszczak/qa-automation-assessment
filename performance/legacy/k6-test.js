import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '60s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800']
  }
};

export default function () {
  http.get('https://reqres.in/api/users?page=1');
  sleep(1); // 1 request per second per VU
}
