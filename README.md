# Vere

一个简洁的 Hexo 博客主题，适合技术博客和个人站点。

支持深色/浅色模式、全文搜索、代码高亮（macOS 风格标题栏 + 行号）、图片灯箱、目录导航等功能。

## 特性

- **深色/浅色模式** — 可手动切换或跟随系统，偏好自动保存
- **全文搜索** — `Ctrl+K` 唤起搜索面板，浏览器端模糊匹配，结果附带上下文摘要
- **代码块** — PrismJS 高亮 + 行号 + macOS 三色圆点标题栏 + 语言标签 + 一键复制
- **图片灯箱** — 点击放大，ESC 关闭
- **目录 (TOC)** — 桌面端 sticky 侧边栏，移动端折叠面板，滚动时高亮当前章节
- **KaTeX 数学公式** — 通过 hexo-filter-katex 渲染
- **高亮标记** — `==文字==` 语法渲染为 `<mark>` 标签
- **阅读时间** — 自动估算
- **前后文章导航** — 文章底部链接到上一篇 / 下一篇
- **响应式** — 适配桌面、平板、手机

## 安装

### 直接安装

```bash
# 1. 将 vere 复制到 Hexo 站点的 themes/ 下
cp -r vere /path/to/your-hexo-site/themes/

# 2. 修改站点 _config.yml，设置 theme: vere

# 3. 安装依赖
cd /path/to/your-hexo-site
npm install hexo-filter-katex \
            hexo-generator-search \
            hexo-renderer-ejs \
            hexo-renderer-marked

# 4. 启动
npx hexo server
```

## 项目结构

```
├── layout/                  # EJS 模板
│   ├── layout.ejs           #   全局布局
│   ├── index.ejs            #   首页
│   ├── post.ejs             #   文章页
│   ├── page.ejs             #   独立页面
│   ├── archive.ejs          #   归档
│   ├── tags.ejs             #   标签云
│   ├── about.ejs            #   关于页
│   └── 404.ejs              #   404 页面
└── source/
    ├── css/style.css        #   主题样式
    └── js/                  #   交互模块
        ├── theme.js         #     深色/浅色切换
        ├── search.js        #     全文搜索
        ├── toc.js           #     目录 & 滚动高亮
        ├── copy-button.js   #     代码复制
        ├── image-lightbox.js#     图片灯箱
        ├── back-to-top.js   #     返回顶部
        └── language-label.js#     语言标签
```

## 配置说明

### 站点 `_config.yml`

```yaml
title: 我的博客
subtitle: ''
description: ''
author: 你的名字
language: zh-CN
url: https://example.com

# 代码高亮
syntax_highlighter: prismjs
prismjs:
  preprocess: true
  line_number: true

# KaTeX
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

### 主题 `_config.yml`（`themes/vere/_config.yml`）

```yaml
# 导航菜单，修改 label 即可汉化
menu:
  - label: 首页
    path: /
  - label: 归档
    path: /archives
  - label: 关于
    path: /about
  - label: 标签
    path: /tags
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
toc: false   # 设为 false 禁用该文章的目录
---
```

### 特殊语法

| 语法 | 效果 |
|------|------|
| `==高亮文字==` | 黄色背景高亮 |
| ` ```language ` 代码块 | PrismJS 高亮 + 行号 + 标题栏 |

## 自定义

### 修改配色

编辑 `source/css/style.css`，修改 `:root` 中的 CSS 变量即可调整浅色主题；`[data-theme="dark"]` 块控制暗色主题。

### 修改字体

在 `style.css` 中搜索 `font-family`，替换为你喜欢的字体。

### 添加导航链接

编辑 `themes/vere/_config.yml`，在 `menu` 列表中添加新项即可。例如：

```yaml
menu:
  - label: 首页
    path: /
  - label: 友链
    path: /links
```

## License

MIT
