import { scenarioUsersList } from './users-list.scenario.js';

export function runScenario() {
  const name = (__ENV.K6_SCENARIO ?? 'users_list').toLowerCase();
  
  switch (name) {
    case 'users_list':
      return scenarioUsersList();
    default:
      throw new Error(`Unknown scenario: ${name}`);
  }
}
