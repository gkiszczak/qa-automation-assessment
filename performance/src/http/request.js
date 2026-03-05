import http from 'k6/http';
import { buildHeaders } from './headers.js';
import { shouldLogError, logHttpError } from '../utils/logging.js';

export function get(url, { name }) {
  const res = http.get(url, {
    headers: buildHeaders(),
    tags: { name }
  });
  
  if (shouldLogError(res)) logHttpError(res, name);
  return res;
}
