import { sleep } from 'k6';
import { ReqResClient } from '../clients/reqres.client.js';

const client = new ReqResClient();

export function scenarioUsersList() {
  client.getUsersList();
  sleep(1);
}
