(function () {
  'use strict';

  document.querySelectorAll('.post-content pre[class*="language-"], .page-content pre[class*="language-"]').forEach(function (pre) {
    // 从 class 中提取语言名（如 "language-javascript" -> "javascript"）
    var lang = '';
    pre.classList.forEach(function (c) {
      if (c.indexOf('language-') === 0) {
        lang = c.replace('language-', '');
      }
    });
    if (!lang) return;

    var label = document.createElement('span');
    label.className = 'code-lang';
    label.textContent = lang;

    pre.appendChild(label);
  });
})();
