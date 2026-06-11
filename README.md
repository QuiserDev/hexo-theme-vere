# Vere

一个干净、响应式的 Hexo 博客主题，适合写技术文章和个人笔记。

全部代码使用[CodeWhale](https://codewhale.net)生成（只有这一行是我手敲的），主要自用。

**亮点**：自动跟随系统的深色模式、`Ctrl+K` 全文搜索、带行号和 macOS 风格标题栏的代码块、侧边栏目录导航。

> 在线预览：[demo 地址待补充]

## 快速开始

如果你还没有 Hexo 站点，先创建一个：

```bash
npm install -g hexo-cli
hexo init my-blog
cd my-blog
```

然后把 Vere 装进去：

```bash
# 1. 下载主题到 themes/vere
git clone https://github.com/QuiserDev/hexo-theme-vere themes/vere

# 2. 安装依赖
npm install hexo-filter-katex hexo-generator-search hexo-renderer-ejs hexo-renderer-marked

# 3. 修改站点 _config.yml，把 theme 改成 vere
#    theme: vere

# 4. 启动预览
npx hexo server
```

打开浏览器访问 `http://localhost:4000`，你应该能看到 Vere 的样子了。

## 功能一览

### 🌓 深色 / 浅色模式

主题会跟随你的系统设置自动切换。你也可以点击导航栏右上角的按钮手动切换，偏好会被记住。

### 🔍 全文搜索

在任意页面按 `Ctrl+K`（Mac 上是 `Cmd+K`），弹出搜索框，输入关键词即可在所有文章中模糊搜索，结果会显示匹配的上下文片段。

### 💻 代码块

代码块自带 macOS 风格的三色圆点标题栏、行号和语言标签。右上角的复制按钮一键复制代码。

支持的语言由 PrismJS 决定，常见的 JavaScript、Python、Go、Rust、Bash 等都涵盖。

### 🖼️ 图片灯箱

点击文章中的图片可以放大查看，按 `ESC` 或点背景关闭。

### 📑 目录导航

文章中的标题会自动生成目录。在桌面端，目录会固定在左侧边栏，跟随滚动高亮当前章节；在手机上，目录折叠在文章顶部，点击展开。

如果想在某篇文章中关闭目录，在 front matter 中加上 `toc: false`。

### 📐 数学公式

本主题支持 KaTeX 渲染。在文章中写 LaTeX 公式即可：

```
$$

E = mc^2

$$

```

行内公式用 `$...$` 包裹。

### ✨ 文字高亮

用 `==高亮文字==` 的语法可以给文字加上黄色背景高亮，就像荧光笔一样。

### ⏱️ 阅读时间

每篇文章会自动显示预估阅读时间，方便读者判断篇幅。

### 📱 响应式

在手机、平板、桌面端都能正常阅读。目录在移动端会自动折叠，排版也会相应调整。

## 定制你的主题

### 修改导航菜单

编辑 `themes/vere/_config.yml`，在 `menu` 列表里添加或修改导航项。把 `label` 改成中文就行：

```yaml
menu:
  - label: 首页
    path: /
  - label: 归档
    path: /archives
  - label: 关于
    path: /about
  - label: 友链
    path: /links
```

## 站点配置参考

以下是你的 Hexo 站点 `_config.yml` 中和本主题相关的配置项，以及它们的作用：

```yaml
# 站点基本信息
title: 我的博客        # 显示在浏览器标签页和导航栏
subtitle: ''           # 可选，显示在标题下方
description: ''        # 用于 SEO 和搜索摘要
author: 你的名字
language: zh-CN        # 语言，影响日期格式等

# 代码高亮 —— 必须设为 prismjs
syntax_highlighter: prismjs
prismjs:
  preprocess: true
  line_number: true    # 显示行号

# KaTeX 数学公式 —— 需要这个 CDN 链接
katex:
  css: https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css

# 全文搜索 —— 生成 search.json 供前端读取
search:
  path: search.json
  field: all
  content: true

# 主题名称
theme: vere
```

## 文章配置

每篇文章顶部可以设置这些选项：

```yaml
---
title: 文章标题
date: 2026-06-10 12:00:00
tags:
  - demo
  - tutorial
categories:
  - 技术
toc: false   # 设为 false 可以关闭这篇文章的目录
---
```

## 项目结构

```
themes/vere/
├── layout/              # 页面模板 (EJS)
│   ├── layout.ejs       #   全局框架（header、footer 等）
│   ├── index.ejs        #   首页文章列表
│   ├── post.ejs         #   文章详情页
│   ├── page.ejs         #   独立页面
│   ├── archive.ejs      #   归档页
│   ├── tags.ejs         #   标签云
│   ├── about.ejs        #   关于页
│   └── 404.ejs          #   404 页面
└── source/
    ├── css/style.css    #   所有样式
    └── js/
        ├── theme.js     #   深色/浅色切换
        ├── search.js    #   全文搜索
        ├── toc.js       #   目录生成与高亮
        ├── copy-button.js   #   代码复制
        ├── image-lightbox.js#   图片灯箱
        ├── back-to-top.js   #   返回顶部
        └── language-label.js#   代码语言标签
```

## 常见问题

**搜索功能不工作？**

确保安装了 `hexo-generator-search` 并在站点 `_config.yml` 中正确配置了 `search` 选项。每次写完文章需要重新 `npx hexo generate` 来更新搜索索引。

**代码块没有高亮？**

检查站点 `_config.yml` 中 `syntax_highlighter` 是否设为 `prismjs`，并且 `hexo-renderer-marked` 已经安装。

**深色模式没有自动切换？**

Vere 会先检查你是否手动切换过。如果你之前点过切换按钮，它会记住你的选择而不再跟随系统。清除浏览器 localStorage 即可重置。

## License

MIT
