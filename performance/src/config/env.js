/**
 * Centralized env handling.
 * Use K6_* vars to keep CI configuration explicit.
 */
export function getEnvNumber(name, defaultValue) {
  const v = __ENV[name];
  if (v === undefined || v === null || v === '') return defaultValue;
  const n = Number(v);
  return Number.isFinite(n) ? n : defaultValue;
}

export function getEnvString(name, defaultValue) {
  const v = __ENV[name];
  return (v === undefined || v === null || v === '') ? defaultValue : String(v);
}
