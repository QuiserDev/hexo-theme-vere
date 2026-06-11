/**
 * force-prismjs.js
 *
 * Vere 主题基于 PrismJS 的 CSS 类名（.token.*、pre.line-numbers 等）设计样式。
 * 如果站点 _config.yml 中的 syntax_highlighter 不是 prismjs，
 * Hexo 会生成 highlight.js 的 HTML 结构（<figure class="highlight">），
 * 导致代码块样式完全丢失。
 *
 * 本脚本在 hexo 初始化时自动将 syntax_highlighter 覆盖为 prismjs，
 * 修改只发生在内存中，不会写入用户的 _config.yml 文件。
 *
 * 如果用户明确设置了 syntax_highlighter: false（关闭高亮），则不做干预。
 */

/* global hexo */

'use strict';

const CURRENT = hexo.config.syntax_highlighter;

// 已经正确配置，无需干预
if (CURRENT === 'prismjs') return;

// 用户明确关闭高亮，尊重
if (CURRENT === false || CURRENT === 'false') return;

// 从 highlight.js（或任何其他值）覆盖为 prismjs
hexo.config.syntax_highlighter = 'prismjs';

// 补齐 prismjs 默认配置（用户已有的配置优先）
hexo.config.prismjs = Object.assign(
  {
    preprocess: true,
    line_number: true,
    tab_replace: '',
  },
  hexo.config.prismjs || {}
);

hexo.log.info(
  'Vere: syntax_highlighter auto-set to "prismjs" (was "%s").' +
  '  Remove "highlight" block from _config.yml to silence this message.',
  CURRENT || 'undefined'
);
