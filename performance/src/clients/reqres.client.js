import http from 'k6/http';
import { check } from 'k6';
import { targets } from '../config/targets.js';

export class ReqResClient {
  constructor(baseUrl = targets.reqres.baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUsersList() {
    const url = `${this.baseUrl}${targets.reqres.usersListPath}`;
    const res = http.get(url, { tags: { name: 'GET /api/users?page=1' } });

    check(res, {
      'status is 200': (r) => r.status === 200
    });

    return res;
  }
}
