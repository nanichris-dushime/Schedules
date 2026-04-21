// Frontend state aligned with the current backend models:
// User, Task, Assignment, Notification, and session auth data.

(function initFrontendState() {
  const STORAGE_KEY = 'shiftSmartFrontendState';

  const defaultState = {
    session: {
      token: '',
      currentUser: null
    },
    landing: {
      badge: 'Frontend ready for backend-aligned data',
      heroStats: [],
      miniStats: [],
      highlights: {
        statusTitle: 'Ready for API integration',
        statusBody: 'Connect login, users, tasks, assignments, and notifications endpoints to populate this UI.'
      }
    },
    users: [],
    tasks: [],
    assignments: [],
    notifications: []
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeObjects(base, incoming) {
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
      return incoming === undefined ? clone(base) : incoming;
    }

    const merged = Array.isArray(base) ? [] : { ...base };
    Object.keys(incoming).forEach((key) => {
      const baseValue = base ? base[key] : undefined;
      const nextValue = incoming[key];
      merged[key] = (
        baseValue &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue) &&
        nextValue &&
        typeof nextValue === 'object' &&
        !Array.isArray(nextValue)
      )
        ? mergeObjects(baseValue, nextValue)
        : nextValue;
    });
    return merged;
  }

  function loadStoredState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaultState);
      return mergeObjects(clone(defaultState), JSON.parse(raw));
    } catch (error) {
      console.warn('Unable to load saved frontend state.', error);
      return clone(defaultState);
    }
  }

  function persistState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(window.APP_STATE));
    } catch (error) {
      console.warn('Unable to save frontend state.', error);
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function initialsFromName(name) {
    if (!name) return '--';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || '--';
  }

  function avatarTone(index) {
    const tones = ['green', 'blue', 'orange', 'purple', 'pink'];
    return tones[index % tones.length];
  }

  function roleBadgeClass(role) {
    const normalized = String(role || '').toLowerCase();
    if (normalized === 'admin' || normalized === 'administrator') return 'badge-admin';
    if (normalized === 'manager') return 'badge-manager';
    return 'badge-employee';
  }

  function assignmentBadgeClass(status) {
    const normalized = String(status || '').toLowerCase();
    if (normalized === 'confirmed') return 'badge-confirmed';
    if (normalized === 'rejected') return 'badge-rejected';
    return 'badge-pending';
  }

  function notificationBadgeClass(status) {
    return String(status || '').toLowerCase() === 'read' ? 'badge-manager' : 'badge-confirmed';
  }

  function emptyState(title, body, icon = 'database') {
    return `
      <div class="empty-state">
        <div class="empty-state-icon"><i class="fa-solid fa-${escapeHtml(icon)}"></i></div>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(body)}</p>
      </div>
    `;
  }

  function formatDate(value) {
    if (!value) return '--';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatShortDate(value) {
    if (!value) return '--';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  function formatTime(value) {
    if (!value) return '--';
    const [hours = '00', minutes = '00'] = String(value).split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatTimeRange(startTime, endTime) {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }

  function getUserById(id) {
    return (window.APP_STATE.users || []).find((user) => user.id === id) || null;
  }

  function getTaskById(id) {
    return (window.APP_STATE.tasks || []).find((task) => task.id === id) || null;
  }

  function getAssignmentsForTask(taskId) {
    return (window.APP_STATE.assignments || []).filter((assignment) => assignment.taskId === taskId);
  }

  function getAssignmentsForEmployee(employeeId) {
    return (window.APP_STATE.assignments || []).filter((assignment) => assignment.employeeId === employeeId);
  }

  function getTasksForManager(managerId) {
    return (window.APP_STATE.tasks || []).filter((task) => task.managerId === managerId);
  }

  function getUsersByRole(role) {
    return (window.APP_STATE.users || []).filter((user) => String(user.role || '').toLowerCase() === String(role || '').toLowerCase());
  }

  function buildTaskRecord(task) {
    const manager = getUserById(task.managerId);
    const assignments = getAssignmentsForTask(task.id);
    const assignedUsers = assignments.map((assignment) => getUserById(assignment.employeeId)).filter(Boolean);

    return {
      ...task,
      manager,
      managerName: manager?.fullName || 'Unknown manager',
      dateLabel: formatDate(task.date),
      shortDateLabel: formatShortDate(task.date),
      timeLabel: formatTimeRange(task.startTime, task.endTime),
      assignedUsers,
      assignmentCount: assignments.length,
      confirmedCount: assignments.filter((assignment) => assignment.status === 'confirmed').length,
      rejectedCount: assignments.filter((assignment) => assignment.status === 'rejected').length
    };
  }

  function buildAssignmentRecord(assignment) {
    const task = getTaskById(assignment.taskId);
    const employee = getUserById(assignment.employeeId);
    const manager = task ? getUserById(task.managerId) : null;

    return {
      ...assignment,
      task,
      employee,
      manager,
      taskTitle: task?.title || 'Unknown task',
      dateLabel: task ? formatDate(task.date) : '--',
      shortDateLabel: task ? formatShortDate(task.date) : '--',
      timeLabel: task ? formatTimeRange(task.startTime, task.endTime) : '--',
      managerName: manager?.fullName || 'Unknown manager',
      employeeName: employee?.fullName || 'Unknown employee'
    };
  }

  function getUnreadNotifications(userId) {
    return (window.APP_STATE.notifications || []).filter((notification) => {
      const matchesUser = userId ? notification.userId === userId : true;
      return matchesUser && notification.status === 'unread';
    });
  }

  function getVisibleNotifications(userId) {
    return (window.APP_STATE.notifications || []).filter((notification) => (userId ? notification.userId === userId : true));
  }

  function getScheduleView(tasks) {
    const records = tasks.map(buildTaskRecord);
    const uniqueDates = [...new Set(records.map((task) => task.date).filter(Boolean))].sort();
    const days = uniqueDates.map((date) => {
      const parsed = new Date(date);
      return Number.isNaN(parsed.getTime())
        ? date
        : parsed.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    });
    const timeSlots = [...new Set(records.map((task) => task.startTime).filter(Boolean))].sort();

    return {
      records,
      days,
      timeSlots: timeSlots.length ? timeSlots : ['09:00:00', '12:00:00', '15:00:00'],
      totalTasks: records.length,
      totalAssignments: records.reduce((sum, task) => sum + task.assignmentCount, 0),
      confirmedAssignments: records.reduce((sum, task) => sum + task.confirmedCount, 0),
      rejectedAssignments: records.reduce((sum, task) => sum + task.rejectedCount, 0)
    };
  }

  window.APP_STATE = loadStoredState();
  window.getData = () => window.APP_STATE;
  window.setAppData = (partialState) => {
    window.APP_STATE = mergeObjects(window.APP_STATE, partialState || {});
    persistState();
    return window.APP_STATE;
  };
  window.resetAppData = () => {
    window.APP_STATE = clone(defaultState);
    persistState();
    return window.APP_STATE;
  };
  window.helpers = {
    escapeHtml,
    initialsFromName,
    avatarTone,
    roleBadgeClass,
    assignmentBadgeClass,
    notificationBadgeClass,
    emptyState,
    formatDate,
    formatShortDate,
    formatTime,
    formatTimeRange,
    getUserById,
    getTaskById,
    getAssignmentsForTask,
    getAssignmentsForEmployee,
    getTasksForManager,
    getUsersByRole,
    buildTaskRecord,
    buildAssignmentRecord,
    getUnreadNotifications,
    getVisibleNotifications,
    getScheduleView
  };
})();
