// Centralised API helper — attach token, parse JSON, throw on error
(function () {
  // In production (Render) frontend is served from the same origin as the API.
  // In local dev the backend runs on :5000 while the HTML is opened directly.
  const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';   // same origin on Render

  function getToken() {
    try {
      const raw = localStorage.getItem('shiftsmart_session');
      return raw ? (JSON.parse(raw).token || '') : '';
    } catch {
      return '';
    }
  }

  async function request(method, path, body) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const opts = { method, headers };
    if (body !== undefined) opts.body = JSON.stringify(body);

    const res  = await fetch(BASE_URL + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
    return data;
  }

  window.api = {
    get:   (path)       => request('GET',    path),
    post:  (path, body) => request('POST',   path, body),
    put:   (path, body) => request('PUT',    path, body),
    patch: (path, body) => request('PATCH',  path, body),
    del:   (path)       => request('DELETE', path),
  };
})();
