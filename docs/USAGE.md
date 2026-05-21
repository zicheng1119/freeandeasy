# Free & Easy 使用指南

这份文档对应当前博客仓库：

`https://github.com/zicheng1119/freeandeasy`

线上地址：

- 博客：`https://zicheng1119.github.io/freeandeasy/`
- 简历主页：`https://zicheng1119.github.io/`

## 1. 仓库结构

- `hugo.toml`
  - Hugo 站点主配置
- `content/`
  - 博客内容和页面内容
- `layouts/`
  - 页面模板和局部组件
- `assets/`
  - SCSS、图标、前端脚本
- `.github/workflows/hugo.yaml`
  - GitHub Actions 自动发布流程

## 2. 本地预览

在仓库根目录运行：

```bash
hugo server -D
```

然后访问：

```text
http://localhost:1313/
```

说明：

- `-D` 会把草稿文章也一起显示
- 如果你在改样式或模板，保存后会自动刷新

## 3. 新建文章

创建新文章：

```bash
hugo new content post/my-post/index.md
```

生成出来的文章通常在：

`content/post/my-post/index.md`

推荐头部格式：

```md
---
title: "文章标题"
date: 2026-05-21
slug: "my-post"
draft: false
description: "一句摘要"
categories:
  - 分类名
tags:
  - 标签1
  - 标签2
---
```

注意：

- `draft: false` 才会正式发布
- 文章链接格式由 `hugo.toml` 中的 `post = "/p/:slug/"` 控制

## 4. 修改页面内容

常用内容文件：

- `content/_index.md`
  - 首页说明
- `content/page/about/index.md`
  - 关于页
- `content/page/archives/index.md`
  - 归档页
- `content/page/search/index.md`
  - 搜索页

如果你只是改文字，大多数情况只需要改 `content/` 下的文件。

## 5. 修改站点配置

主配置文件：

`hugo.toml`

最常改的项目：

- `baseURL`
  - 当前必须保留为 `https://zicheng1119.github.io/freeandeasy/`
- `title`
  - 站点标题
- `[params.footer]`
  - 页脚年份、文案
- `[params.sidebar]`
  - 左侧头像、emoji、副标题
- `[[menus.social]]`
  - Resume、GitHub、RSS 等链接
- `[params.widgets]`
  - 首页右侧栏模块
- `[params.colorScheme]`
  - 默认明暗模式

## 6. 修改页面样式

常用样式文件：

- `assets/scss/variables.scss`
  - 全局变量，例如颜色、字体、圆角、阴影
- `assets/scss/custom.scss`
  - 自定义视觉样式

推荐做法：

- 改配色、字体、圆角，先看 `variables.scss`
- 改首页 hero、卡片、按钮、特殊布局，先看 `custom.scss`

品牌图资源：

- `assets/img/brand-mark.svg`

## 7. 修改页面结构

常用模板文件：

- `layouts/home.html`
  - 首页结构
- `layouts/single.html`
  - 文章详情页
- `layouts/list.html`
  - 列表页
- `layouts/_partials/footer/footer.html`
  - 页脚
- `layouts/_partials/sidebar/left.html`
  - 左侧栏
- `layouts/_partials/head/custom-font.html`
  - 字体加载

## 8. 发布博客

现在不需要手动上传 `public/`。

日常发布流程：

```bash
git add .
git commit -m "写你的提交说明"
git push
```

推送到 `main` 后，GitHub Actions 会自动：

1. 安装 Hugo 和 Dart Sass
2. 构建站点
3. 发布到 GitHub Pages

工作流文件：

`/.github/workflows/hugo.yaml`

## 9. 手动重新发布

如果你没有改代码，只想重跑一次部署：

1. 打开 GitHub 仓库 `freeandeasy`
2. 进入 `Actions`
3. 选择 `Build and deploy`
4. 点击 `Run workflow`

## 10. 搜索功能说明

当前搜索功能依赖：

- 搜索页：`content/page/search/index.md`
- 搜索模板：`layouts/page/search.html`
- 搜索数据：`layouts/page/search.json`
- 搜索脚本：`assets/ts/search.tsx`

工作原理：

1. Hugo 生成一个搜索页
2. 同时为搜索页生成一个 JSON 数据文件
3. 前端脚本读取这个 JSON，在浏览器端完成搜索

如果将来搜索失效，优先检查：

- 搜索页 front matter 里是否还保留：

```yaml
outputs:
  - html
  - json
```

- `layouts/page/search.json` 是否还存在
- 推送后 GitHub Actions 是否构建成功

## 11. 常见维护命令

本地构建：

```bash
hugo --gc --minify
```

模拟线上子路径构建：

```bash
hugo --gc --minify --baseURL https://zicheng1119.github.io/freeandeasy/
```

清理后重建：

```bash
rm -rf public resources/_gen
hugo --gc --minify
```

## 12. 常见坑

- 不要把 `baseURL` 改成根域名
- 新文章如果还是 `draft: true`，线上不会显示
- 改 `layouts/` 或 `assets/` 后，最好先本地预览
- 如果线上没立刻更新，先看 GitHub Actions 是否成功
- 简历主页和博客是两个不同仓库

## 13. 简历主页在哪里改

简历主页仓库在：

`/Users/zhouzicheng/Desktop/zicheng1119.github.io`

主要文件：

- `index.html`
- `assets/styles.css`
- `.github/workflows/pages.yaml`
