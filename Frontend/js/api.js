// Centralised API helper — attach token, parse JSON, throw on error
(function () {
  const BASE_URL = 'http://localhost:5000';

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

    const res = await fetch(BASE_URL + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'Request failed');
    return data;
  }

  window.api = {
    get:   (path)        => request('GET',   path),
    post:  (path, body)  => request('POST',  path, body),
    patch: (path, body)  => request('PATCH', path, body),
    del:   (path)        => request('DELETE', path),
  };
})();
