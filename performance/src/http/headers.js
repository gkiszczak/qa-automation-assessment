export function buildHeaders() {
  const apiKey = __ENV.REQRES_API_KEY;
  
  const headers = {
    accept: 'application/json'
  };
  
  if (apiKey) headers['x-api-key'] = apiKey;
  
  return headers;
}
