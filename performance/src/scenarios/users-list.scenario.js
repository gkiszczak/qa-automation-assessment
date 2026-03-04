import { sleep } from 'k6';
import { ReqResClient } from '../clients/reqres.client.js';

const client = new ReqResClient();

/**
 * Scenario: users list
 * Keep it small and composable. When you add more endpoints,
 * create additional scenario files and switch in performance/main.js
 * (or select via env).
 */
export function scenarioUsersList() {
  client.getUsersList();
  // Optional think time; with constant-arrival-rate this isn't required,
  // but it still represents "user pacing" realistically.
  sleep(0.1);
}
