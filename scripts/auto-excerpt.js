/**
 * auto-excerpt.js
 *
 * Hexo 8.x 不再自动生成 excerpt：如果文章没有 `<!-- more -->` 也没有
 * 手动指定 `excerpt:`，post.excerpt 会是空字符串。
 *
 * 本脚本在 after_post_render 阶段：
 *   - 如果 post.excerpt 已经有值（手动指定或 <!-- more -->），保持不动
 *   - 如果 post.excerpt 为空，从 post.content 中自动提取纯文本前 200 字
 *
 * 只处理 layout 为 'post' 的页面。
 */

/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  if (data.excerpt && data.excerpt.trim()) return data;

  // 只处理文章类型的页面
  if (data.layout !== 'post') return data;

  // 移除 HTML 标签和代码块，取前 200 字符
  var text = data.content
    .replace(/<(pre|code|script|style|figure|table)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length > 200) {
    text = text.substring(0, 200) + '...';
  }

  data.excerpt = text;
  return data;
});
