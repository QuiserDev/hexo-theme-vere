(function () {
  'use strict';

  var STORAGE_KEY = 'theme';
  var USER_SET_KEY = 'theme-user-set';

  function getPreferredTheme() {
    // 如果用户手动切换过，使用保存的偏好
    if (localStorage.getItem(USER_SET_KEY)) {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    }
    // 否则跟随系统
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(USER_SET_KEY, '1');
    applyTheme(next, true);
  }

  // 初始化：仅当用户之前手动设置过才持久化到 localStorage
  var userSet = !!localStorage.getItem(USER_SET_KEY);
  applyTheme(getPreferredTheme(), userSet);

  // 系统主题变化时自动切换（仅当用户未手动设置时）
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem(USER_SET_KEY)) {
      applyTheme(getPreferredTheme(), false);
    }
  });

  // 暴露切换函数
  window.toggleTheme = toggleTheme;
})();
