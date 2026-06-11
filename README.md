# Vere

一个简洁、现代、功能完备的 Hexo 博客主题。设计风格偏学术工程师审美——干净、克制、注重阅读体验。

支持深色/浅色模式、全文搜索、代码高亮（含行号与 macOS 风格标题栏）、图片灯箱、目录导航等特性。

Screenshot

## 特性

- **深色/浅色模式** — 手动切换或自动跟随系统，偏好记忆到 localStorage
- **全文搜索** — `Ctrl+K` 唤起搜索面板，前端模糊匹配，搜索结果带上下文摘要
- **代码块** — PrismJS 语法高亮 + 行号 + macOS 风格三色圆点标题栏 + 语言标签 + 一键复制
- **图片灯箱** — 点击放大，ESC 关闭
- **目录 (TOC)** — 桌面端 sticky 侧边栏 + 移动端折叠面板，滚动高亮当前章节
- **KaTeX 数学公式** — 通过 hexo-filter-katex 渲染
- **高亮标记** — `==文字==` 语法，渲染为 `<mark>` 标签
- **阅读时间** — 自动估算（中文字数 / 400）
- **前后文章导航** — 文章底部上一篇 / 下一篇链接
- **响应式** — 适配桌面、平板、手机

## 安装

### 方式一：直接安装到已有 Hexo 站点

```bash
# 1. 将 vere 目录复制到你的 Hexo 站点的 themes/ 下
cp -r vere /path/to/your-hexo-site/themes/

# 2. 修改站点 _config.yml
# theme: vere

# 3. 安装必需插件
cd /path/to/your-hexo-site
npm install hexo-filter-katex \
            hexo-generator-search \
            hexo-renderer-ejs \
            hexo-renderer-marked

# 4. 启动
npx hexo server
```

### 方式二：通过 npm 安装（TODO）

```bash
npm install hexo-theme-vere
```

## 项目结构

```
├── layout/                  # EJS 模板
│   ├── layout.ejs           #   全局布局（head/meta/header/footer）
│   ├── index.ejs            #   首页文章列表
│   ├── post.ejs             #   文章详情
│   ├── page.ejs             #   独立页面
│   ├── archive.ejs          #   归档
│   ├── tags.ejs             #   标签云
│   ├── about.ejs            #   关于页
│   └── 404.ejs              #   404
└── source/
    ├── css/style.css        #   主题样式
    └── js/                  #   交互模块
        ├── theme.js         #     深色/浅色切换
        ├── search.js        #     全文搜索
        ├── toc.js           #     目录生成 & 高亮
        ├── copy-button.js   #     代码复制
        ├── image-lightbox.js#     图片灯箱
        ├── back-to-top.js   #     返回顶部
        └── language-label.js#     代码语言标签
```

## 配置说明

### 站点 `_config.yml`

```yaml
# 站点信息
title: 我的博客
subtitle: ''
description: ''
author: 你的名字
language: zh-CN

# URL
url: https://example.com

# 代码高亮
syntax_highlighter: prismjs
prismjs:
  preprocess: true
  line_number: true    # 显示行号

# KaTeX 数学公式
katex:
  css: https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css

# 搜索
search:
  path: search.json
  field: all
  content: true

# 主题
theme: vere
```

### 文章 Front Matter

```yaml
---
title: 文章标题
date: 2026-06-10 12:00:00
tags:
  - demo
  - tutorial
categories:
  - 技术
toc: false   # 设为 false 可禁用该文章的目录
---
```

### 特殊语法

| 语法 | 效果 |
|------|------|
| `==高亮文字==` | 黄色背景高亮 |
| `\`\`\`language` 代码块 | PrismJS 语法高亮 + 行号 + 标题栏 |

## 自定义

### 修改配色

编辑 `source/css/style.css`，修改 `:root` 中的 CSS 自定义属性即可调整亮色主题配色；`[data-theme="dark"]` 块控制暗色主题配色。

### 修改字体

在 `style.css` 中搜索 `font-family`，替换为你喜欢的字体栈。

### 添加导航链接

编辑 `layout/layout.ejs`，在 `<nav class="site-nav">` 中添加新的 `<a>` 标签。

## License

MIT
