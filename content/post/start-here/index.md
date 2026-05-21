---
title: 从这里开始
date: 2026-05-21
slug: start-here
draft: false
description: 这篇文章解释这个博客为什么会部署在 github.io/freeandeasy。
categories:
  - 建站
tags:
  - hugo
  - github-pages
  - blog
---

这个博客被设计成 GitHub Pages 的 **project site**，也就是项目页。

所以它最终的访问地址不是根域名，而是：

`https://你的用户名.github.io/freeandeasy/`

<!--more-->

## 为什么这样配置

因为你想把：

- `https://你的用户名.github.io/` 用作在线简历
- `https://你的用户名.github.io/freeandeasy/` 用作博客

这是 GitHub Pages 非常适合的一种结构。

## 以后怎么写文章

创建新文章：

```bash
hugo new content post/my-post/index.md
```

本地预览：

```bash
hugo server -D
```

打开：

```text
http://localhost:1313/
```

推送到 GitHub 后，GitHub Actions 会自动构建并发布，不再需要手动把 `public/` 目录推到单独分支。
