(function () {
  'use strict';

  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML =
    '<div class="search-backdrop"></div>' +
    '<div class="search-modal">' +
    '<div class="search-input-wrap">' +
    '<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
    '<input type="text" class="search-input" placeholder="Search..." autocomplete="off">' +
    '<button class="search-close" aria-label="Close">&times;</button>' +
    '</div>' +
    '<div class="search-results"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector('.search-input');
  var results = overlay.querySelector('.search-results');
  var backdrop = overlay.querySelector('.search-backdrop');
  var closeBtn = overlay.querySelector('.search-close');
  var posts = [];

  function open() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { input.focus(); }, 100);
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    input.value = '';
    results.innerHTML = '';
  }

  // 从 meta 标签读取 search.json 路径（由 EJS 模板注入，支持子目录部署）
  var searchMeta = document.querySelector('meta[name="search-path"]');
  var searchUrl = searchMeta ? searchMeta.content : '/search.json';

  fetch(searchUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) { posts = data; })
    .catch(function () {});

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function doSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q || posts.length === 0) { results.innerHTML = ''; return; }

    var filtered = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) !== -1 ||
             (p.content || '').toLowerCase().indexOf(q) !== -1;
    }).slice(0, 10);

    if (filtered.length === 0) {
      results.innerHTML = '<p class="search-empty">No results found.</p>';
      return;
    }

    results.innerHTML = filtered.map(function (p) {
      var snippet = '';
      if (p.content) {
        var idx = p.content.toLowerCase().indexOf(q);
        if (idx > -1) {
          var start = Math.max(0, idx - 40);
          var end = Math.min(p.content.length, idx + q.length + 60);
          snippet = (start > 0 ? '...' : '') + p.content.slice(start, end) + (end < p.content.length ? '...' : '');
        }
      }
      return '<a class="search-result-item" href="' + escapeHtml(p.url) + '">' +
        '<span class="search-result-title">' + escapeHtml(p.title) + '</span>' +
        (snippet ? '<span class="search-result-snippet">' + escapeHtml(snippet) + '</span>' : '') +
        '</a>';
    }).join('');
  }

  // 防抖：输入停止 200ms 后才触发搜索
  var debounceTimer = null;
  input.addEventListener('input', function () {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSearch, 200);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) { close(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); }
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);

  window.openSearch = open;
})();
