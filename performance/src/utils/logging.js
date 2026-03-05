const MAX_ERROR_LOGS_PER_VU = Number(__ENV.K6_MAX_ERROR_LOGS_PER_VU ?? 3);
let logged = 0;

export function shouldLogError(res) {
  if (!res) return false;
  const bad = res.status === 0 || res.status >= 400;
  if (!bad) return false;
  if (logged >= MAX_ERROR_LOGS_PER_VU) return false;
  logged += 1;
  return true;
}

export function logHttpError(res, name) {
  const bodySnippet = (res.body ?? '').slice(0, 200).replace(/\s+/g, ' ');
  console.error(
    `[k6] ${name} failed: status=${res.status} vu=${__VU} iter=${__ITER} body="${bodySnippet}"`
  );
}
