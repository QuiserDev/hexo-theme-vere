(function () {
  'use strict';

  // 创建 overlay 元素
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<div class="lightbox-backdrop"></div>' +
    '<img class="lightbox-img" src="" alt="">' +
    '<button class="lightbox-close" aria-label="Close">&times;</button>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('.lightbox-img');
  var backdrop = overlay.querySelector('.lightbox-backdrop');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // 延迟清除 src 防止闪烁
    setTimeout(function () { img.src = ''; }, 200);
  }

  // 监听 .post-content 和 .page-content 中的图片点击
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'IMG' && (target.closest('.post-content') || target.closest('.page-content'))) {
      open(target.src, target.alt);
    }
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      close();
    }
  });
})();
