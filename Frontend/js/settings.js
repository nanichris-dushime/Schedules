// settings.js — shared settings manager (dark mode, font size, etc.)
(function () {
  var SETTINGS_KEY = 'schedule_settings';

  var defaults = {
    theme: 'light',       // 'light' | 'dark'
    fontSize: 'medium',   // 'small' | 'medium' | 'large'
    sidebarCompact: false,
    notifSound: true,
    language: 'en'
  };

  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'));
    } catch (e) {
      return Object.assign({}, defaults);
    }
  }

  function save(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  function applyFontSize(size) {
    var map = { small: '13px', medium: '15px', large: '17px' };
    document.documentElement.style.setProperty('--base-font', map[size] || '15px');
    document.body.style.fontSize = map[size] || '15px';
  }

  function applySidebarCompact(compact) {
    document.documentElement.setAttribute('data-sidebar', compact ? 'compact' : 'full');
  }

  function applyAll(settings) {
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    applySidebarCompact(settings.sidebarCompact);
  }

  function get(key) {
    return load()[key];
  }

  function set(key, value) {
    var settings = load();
    settings[key] = value;
    save(settings);
    applyAll(settings);
  }

  function getAll() { return load(); }

  // Apply on every page load immediately
  applyAll(load());

  window.appSettings = { get: get, set: set, getAll: getAll, applyAll: applyAll, load: load };
})();
