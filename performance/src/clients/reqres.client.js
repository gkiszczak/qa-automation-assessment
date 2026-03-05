import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { targets } from '../config/targets.js';
import { get } from '../http/request.js';

export const status2xx = new Counter('status_2xx');
export const status4xx = new Counter('status_4xx');
export const status5xx = new Counter('status_5xx');
export const status429 = new Counter('status_429');
export const transportErrors = new Counter('transport_errors');

export class ReqResClient {
  constructor(baseUrl = targets.reqres.baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  getUsersList() {
    const url = `${this.baseUrl}${targets.reqres.usersListPath}`;
    const res = get(url, { name: 'GET /api/users?page=1' });
    
    if (!res || res.status === 0) {
      transportErrors.add(1);
      return res;
    }
    
    if (res.status >= 200 && res.status < 300) status2xx.add(1);
    else if (res.status >= 400 && res.status < 500) status4xx.add(1);
    else if (res.status >= 500) status5xx.add(1);
    
    if (res.status === 429) status429.add(1);
    
    check(res, { 'status is 200': (r) => r.status === 200 });
    return res;
  }
}
