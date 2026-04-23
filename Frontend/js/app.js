// Session management, auth guards, and data loading for all dashboard pages.
// Must be loaded AFTER data.js and api.js.
(function () {
  const SESSION_KEY = 'shiftsmart_session';

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function saveSession(token, user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
    if (window.setAppData) window.setAppData({ session: { token, currentUser: user } });
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    if (window.resetAppData) window.resetAppData();
  }

  // Redirects to login if no valid session.
  // Redirects to the correct dashboard if the role doesn't match expectedRole.
  // Returns true when the session is valid and the role matches.
  function requireAuth(expectedRole) {
    const session = getSession();
    if (!session || !session.token || !session.user) {
      window.location.href = 'login.html';
      return false;
    }
    if (expectedRole && session.user.role !== expectedRole) {
      const map = { admin: 'admin.html', manager: 'manager.html', employee: 'employee.html' };
      window.location.href = map[session.user.role] || 'login.html';
      return false;
    }
    // Sync current user into APP_STATE so render functions can read it
    if (window.setAppData) {
      window.setAppData({ session: { token: session.token, currentUser: session.user } });
    }
    return true;
  }

  function logout() {
    clearSession();
    window.location.href = 'login.html';
  }

  // Fetch all collections from the API and store them in APP_STATE.
  // Uses /api/users/users for admin, /api/users/employees for manager/employee.
  async function loadAllData() {
    const session = getSession();
    const role = session && session.user ? session.user.role : '';

    // Admins get all users; managers and employees only need the employees list
    const usersEndpoint = role === 'admin' ? '/api/users/users' : '/api/users/employees';

    const [usersRes, tasksRes, assignmentsRes, notificationsRes] = await Promise.all([
      window.api.get(usersEndpoint).catch(() => ({ users: [] })),
      window.api.get('/api/tasks').catch(() => ({ tasks: [] })),
      window.api.get('/api/assignments').catch(() => ({ assignments: [] })),
      window.api.get('/api/notifications').catch(() => ({ notifications: [] })),
    ]);
    window.setAppData({
      users:         usersRes.users         || [],
      tasks:         tasksRes.tasks         || [],
      assignments:   assignmentsRes.assignments   || [],
      notifications: notificationsRes.notifications || [],
    });
  }

  window.requireAuth   = requireAuth;
  window.logout        = logout;
  window.loadAllData   = loadAllData;
  window.getSession    = getSession;
  window.saveSession   = saveSession;
  window.clearSession  = clearSession;
})();
