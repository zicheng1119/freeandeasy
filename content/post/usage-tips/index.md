---
title: 博客使用技巧
date: 2026-05-31T20:00:00+08:00
slug: usage-tips
draft: false
description: 如何在文章里插入图片、GIF、PDF、视频和交互内容，以及博客内置的阅读功能。
categories:
  - 建站
tags:
  - hugo
  - 使用指南
---

这篇汇总博客的写作与插入媒体技巧。

<!--more-->

## 新建文章

```bash
hugo new content post/我的文章/index.md
```

把文章和它的图片放在同一个文件夹里，图片用相对路径引用即可。写完把 `draft` 改成 `false`，推送到 `main` 会自动构建上线。

## 插入图片与 GIF

Markdown 原生语法即可，GIF / 动图 / 动态 SVG 同理：

```markdown
![说明文字](figures/photo.jpg)
![加载动画](figures/loading.gif)
```

文章正文里的图片**点一下会全屏放大**（灯箱），再点关闭。

## 插入 PDF

用 `pdf` 短代码内嵌一个可翻页的 PDF 查看器，`height` 可选：

```text
{{</* pdf src="files/slides.pdf" height="600" */>}}
```

## 插入视频

```text
{{</* video src="files/clip.mp4" */>}}
{{</* youtube dQw4w9WgXcQ */>}}
{{</* bilibili BV1xx411c7mD */>}}
```

## 插入交互内容

用 `embed` 短代码嵌入 CodePen、可交互 demo 等任意网页，`ratio` 支持 `16x9`（默认）/ `4x3` / `1x1`：

```text
{{</* embed src="https://codepen.io/xxx/embed/yyy" ratio="16x9" */>}}
```

## 内置阅读功能

这些无需配置，自动生效：

- 文章页顶部**阅读进度条**
- 向下滚动后右下角出现**回到顶部**按钮
- 图片**点击放大**灯箱
- 卡片、图片**滚动入场动效**（系统开启「减弱动态效果」时自动关闭）

## 相关文章

文章底部会按**共享标签**自动推荐相关文章，并显示上一篇 / 下一篇。所以记得给文章加 `tags`：

```yaml
tags:
  - hugo
  - 使用指南
```
