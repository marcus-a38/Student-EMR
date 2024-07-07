const url = process.env.SERVER_URL;
const REQUEST_TIMEOUT = 60_000; // 60s
const actionMethodMap = Object.freeze({
  POST: ['login', 'logout'],
  GET: ['search', 'view']
});

const handleResponse = async function (res) {
  /* Handle unsuccessful (but non-error-causing) requests */
  return res.json().then((data) => {
    if (!res.success) {
      return Promise.reject(
        data.message || `Request failed with Status Code ${res.status}.`
      );
    }
    return data;
  });
};

export default async function request(action, json) {

  let requestMethod = '';

  for (const [method, actions] of Object.entries(actionMethodMap)) {
    if (actions.includes(action)) {
      requestMethod = method;
    }
  }

  /* Default to GET */
  requestMethod = (requestMethod !== '') ? requestMethod : 'GET';

  /* Timeout */
  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  let timeout;

  /* Fetching */
  const requestHeaders = {
    'Content-Type': 'application/json',
  };
  const fetchOptions = {
    method: requestMethod,
    headers: requestHeaders,
    body: JSON.stringify({ action: action, ...json }),
    signal: abortSignal,
  };

  return new Promise((resolve, reject) => {

    /* Set a timeout for the current request using the abort controller */
    const timeoutPromise = new Promise((_, reject) => {
      timeout = setTimeout(() => {
        abortController.abort();
        reject(new Error('Request timed out.'));
      }, REQUEST_TIMEOUT);
    });

    /* Attempt the request and timeout if >60s for a response */
    Promise.race([fetch(url, fetchOptions), timeoutPromise])
      .then((res) => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch(err => reject(err));

  }).then(res => handleResponse(res));
  
}