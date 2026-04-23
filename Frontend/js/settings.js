// settings.js — shared settings manager applied on every page load
(function () {
  var SETTINGS_KEY = 'schedule_settings';

  var defaults = {
    theme:          'light',
    fontSize:       'medium',
    sidebarCompact: false,
    reduceMotion:   false,
    highContrast:   false,
    notifPrefs: {
      shifts: true,
      tasks:  true,
      swaps:  true,
      system: true,
      sound:  false
    }
  };

  function load() {
    try {
      var stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return Object.assign({}, defaults, stored, {
        notifPrefs: Object.assign({}, defaults.notifPrefs, stored.notifPrefs || {})
      });
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
    document.body.style.fontSize = map[size] || '15px';
  }

  function applySidebarCompact(compact) {
    document.documentElement.setAttribute('data-sidebar', compact ? 'compact' : 'full');
  }

  function applyReduceMotion(val) {
    if (val) {
      document.documentElement.style.setProperty('--transition', 'none');
      var style = document.getElementById('_reduceMotionStyle');
      if (!style) {
        style = document.createElement('style');
        style.id = '_reduceMotionStyle';
        style.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
        document.head.appendChild(style);
      }
    } else {
      document.documentElement.style.removeProperty('--transition');
      var existing = document.getElementById('_reduceMotionStyle');
      if (existing) existing.remove();
    }
  }

  function applyHighContrast(val) {
    document.documentElement.setAttribute('data-contrast', val ? 'high' : 'normal');
  }

  function applyAll(settings) {
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    applySidebarCompact(settings.sidebarCompact);
    applyReduceMotion(settings.reduceMotion);
    applyHighContrast(settings.highContrast);
  }

  function get(key) { return load()[key]; }

  function set(key, value) {
    var settings = load();
    settings[key] = value;
    save(settings);
    applyAll(settings);
  }

  function getAll() { return load(); }

  // Apply immediately on every page load
  applyAll(load());

  window.appSettings = { get: get, set: set, getAll: getAll, applyAll: applyAll, load: load };
})();
