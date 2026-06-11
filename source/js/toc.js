(function () {
  'use strict';

  var content = document.querySelector('.post-content');
  if (!content) {
    var sidebar = document.getElementById('toc-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    return;
  }

  var headings = content.querySelectorAll('h2, h3, h4');
  if (headings.length < 2) {
    var sidebar = document.getElementById('toc-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    return;
  }

  // 给每个标题加 id
  headings.forEach(function (h, i) {
    if (!h.id) h.id = 'heading-' + i;
  });

  // 生成 TOC 列表 HTML
  function buildList() {
    var list = document.createElement('ul');
    list.className = 'toc-list';
    headings.forEach(function (h, i) {
      var li = document.createElement('li');
      li.className = 'toc-item toc-' + h.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.setAttribute('data-heading', h.id);
      li.appendChild(a);
      list.appendChild(li);
    });
    return list;
  }

  // 桌面侧边栏 TOC
  var sidebarNav = document.querySelector('.toc-nav');
  if (sidebarNav) {
    sidebarNav.appendChild(buildList());
  }

  // 移动端折叠 TOC
  var mobileNav = document.getElementById('toc');
  if (mobileNav) {
    mobileNav.appendChild(buildList());
  }

  // IntersectionObserver 滚动高亮
  var tocLinks = document.querySelectorAll('.toc-item a[data-heading]');
  if (tocLinks.length === 0 || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      var link = document.querySelector('.toc-item a[data-heading="' + id + '"]');
      if (!link) return;

      if (entry.isIntersecting) {
        // 移除所有 active
        tocLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  headings.forEach(function (h) {
    observer.observe(h);
  });
})();
