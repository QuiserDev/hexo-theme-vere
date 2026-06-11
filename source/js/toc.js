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

  // 生成嵌套 TOC 列表 HTML（反映 h2 > h3 > h4 的真实层级）
  function buildList() {
    var root = document.createElement('ul');
    root.className = 'toc-list';

    // 计算最小标题层级作为根层级
    var minLevel = 6;
    headings.forEach(function (h) {
      var lv = parseInt(h.tagName.charAt(1));
      if (lv < minLevel) minLevel = lv;
    });

    // 栈：[{ul, level}]，栈顶 ul 是当前工作容器
    var stack = [{ul: root, level: minLevel}];

    headings.forEach(function (h) {
      var level = parseInt(h.tagName.charAt(1));

      // 上升：弹出层级 >= 当前层级的栈帧
      while (stack.length > 1 && level <= stack[stack.length - 1].level) {
        stack.pop();
      }

      var top = stack[stack.length - 1];

      // 下降：创建子 ul
      if (level > top.level) {
        var lastLi = top.ul.lastElementChild;
        var subUl = document.createElement('ul');
        subUl.className = 'toc-list';
        if (lastLi && lastLi.tagName === 'LI') {
          lastLi.appendChild(subUl);
        } else {
          top.ul.appendChild(subUl);
        }
        stack.push({ul: subUl, level: level});
      }

      // 在当前容器中创建 li
      var li = document.createElement('li');
      li.className = 'toc-item toc-' + h.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.setAttribute('data-heading', h.id);
      li.appendChild(a);
      stack[stack.length - 1].ul.appendChild(li);
    });

    return root;
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
