# Free & Easy 维护手册

这份文档是当前博客仓库的完整使用指南，目标是让你在不回看聊天记录的情况下，也能独立维护、扩展和发布这个站点。

对应仓库与网址：

- 博客仓库：`https://github.com/zicheng1119/freeandeasy`
- 博客地址：`https://zicheng1119.github.io/freeandeasy/`
- 简历主页仓库：`https://github.com/zicheng1119/zicheng1119.github.io`
- 简历主页地址：`https://zicheng1119.github.io/`

---

## 1. 站点结构总览

当前博客仓库最重要的目录如下：

- `hugo.toml`
  - Hugo 主配置文件
- `content/`
  - 所有内容文件，包括文章和静态页面
- `layouts/`
  - 页面模板、局部组件、搜索页模板、404 页模板
- `assets/`
  - SCSS、图标、前端脚本、品牌图
- `i18n/`
  - 多语言文案，目前中文主要看 `zh-cn.toml`
- `data/`
  - 主题或站点用到的辅助数据
- `.github/workflows/hugo.yaml`
  - GitHub Actions 自动构建并发布博客
- `docs/USAGE.md`
  - 本文档

最常改的单个文件：

- `hugo.toml`
- `content/_index.md`
- `content/page/about/index.md`
- `layouts/home.html`
- `assets/scss/custom.scss`
- `assets/scss/variables.scss`

---

## 2. 当前站点的部署逻辑

这个博客不是根域名站点，而是 GitHub Pages 的子路径站点：

- 根域名：`https://zicheng1119.github.io/`
- 博客：`https://zicheng1119.github.io/freeandeasy/`

因此 `hugo.toml` 里的 `baseURL` 必须保留为：

```toml
baseURL = "https://zicheng1119.github.io/freeandeasy/"
```

不要把它改成根域名，否则：

- CSS/JS 路径可能错
- 页面链接可能错
- 搜索、图片、RSS 可能错

---

## 3. 本地开发与预览

### 3.1 启动本地预览

在博客仓库根目录执行：

```bash
hugo server -D
```

访问：

```text
http://localhost:1313/
```

说明：

- `-D` 会把草稿文章也渲染出来
- 你改内容、样式、模板后，本地通常会自动热刷新

### 3.2 本地完整构建

如果你想模拟正式构建：

```bash
hugo --gc --minify
```

如果你想尽量接近线上环境：

```bash
hugo --gc --minify --baseURL https://zicheng1119.github.io/freeandeasy/
```

### 3.3 清理后重建

当你怀疑缓存导致异常时：

```bash
rm -rf public resources/_gen
hugo --gc --minify
```

---

## 4. 新建、编辑、删除文章

### 4.1 新建文章

执行：

```bash
hugo new content post/my-post/index.md
```

生成路径通常为：

`content/post/my-post/index.md`

### 4.2 推荐文章 front matter

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

字段说明：

- `title`
  - 页面标题
- `date`
  - 发布时间
- `slug`
  - URL 后缀
- `draft`
  - 是否为草稿
- `description`
  - 用于列表摘要、SEO、社交分享
- `categories`
  - 分类
- `tags`
  - 标签

### 4.3 草稿与正式发布

- `draft: true`
  - 本地可见，线上不发布
- `draft: false`
  - 可以正式上线

### 4.4 文章 URL 规则

当前在 `hugo.toml` 中设置为：

```toml
[permalinks]
post = "/p/:slug/"
```

所以文章最终通常会发布成：

```text
/freeandeasy/p/my-post/
```

### 4.5 删除文章

直接删除对应文章目录即可，例如：

```bash
rm -rf content/post/my-post
```

然后提交并推送。

### 4.6 修改已有文章

直接编辑对应的 `index.md` 即可，比如：

- `content/post/start-here/index.md`

---

## 5. 如何给文章加图片

推荐方式是把图片和文章放在同一目录：

```text
content/post/my-post/
  index.md
  cover.jpg
  image-1.png
```

如果你想给文章设置列表封面，可以在 front matter 里写：

```yaml
image: cover.jpg
```

正文里插图可以用普通 Markdown：

```md
![说明文字](image-1.png)
```

这种方式最稳，因为 Hugo 会把文章目录当作 Page Bundle 处理。

---

## 6. 页面类型与内容目录约定

### 6.1 首页

- 文件：`content/_index.md`
- 模板：`layouts/home.html`

改首页文字时，先看 `content/_index.md`。  
改首页布局时，先看 `layouts/home.html`。

### 6.2 关于页

- 内容：`content/page/about/index.md`

### 6.3 归档页

- 内容：`content/page/archives/index.md`
- 依赖模板：`layouts/archives.html`

### 6.4 搜索页

- 内容：`content/page/search/index.md`
- HTML 模板：`layouts/page/search.html`
- JSON 数据模板：`layouts/page/search.json`
- 前端脚本：`assets/ts/search.tsx`

### 6.5 新建普通页面

如果你想增加一个比如“项目”、“友链”、“笔记说明”页，建议用：

```text
content/page/projects/index.md
```

最小示例：

```md
---
title: 项目
date: 2026-05-21
menu:
  main:
    name: 项目
    weight: -60
    params:
      icon: link
---

这里写页面正文。
```

---

## 7. 导航、菜单与社交链接

### 7.1 左侧主菜单

当前主菜单大部分来自页面 front matter 中的：

```yaml
menu:
  main:
    weight: -70
    params:
      icon: search
```

常见页面：

- 首页
- 关于
- 归档
- 搜索

如果你要新增一个页面并想出现在主菜单里，就给它加这一段。

### 7.2 左侧社交图标区

来自 `hugo.toml` 里的 `[[menus.social]]`：

```toml
[[menus.social]]
  identifier = "github"
  name = "GitHub"
  url = "https://github.com/zicheng1119"
  [menus.social.params]
    icon = "brand-github"
    newTab = true
```

你可以：

- 改 `url`
- 改 `name`
- 改 `icon`
- 增加新的社交链接

### 7.3 可用图标

图标资源在：

- `assets/icons/`

例如：

- `home`
- `user`
- `search`
- `rss`
- `brand-github`
- `link`

图标名通常就是文件名去掉 `.svg`。

---

## 8. 站点配置详解

主配置文件是：

- `hugo.toml`

### 8.1 基础信息

```toml
baseURL = "https://zicheng1119.github.io/freeandeasy/"
locale = "zh-cn"
defaultContentLanguage = "zh-cn"
title = "Free & Easy"
copyright = "Free & Easy"
```

### 8.2 侧边栏

```toml
[params.sidebar]
  avatar = "img/brand-mark.svg"
  emoji = "🌿"
  subtitle = "记录简历之外的思考、项目与生活。"
```

可修改：

- 头像
- emoji
- 副标题

头像文件目前来自：

- `assets/img/brand-mark.svg`

### 8.3 页脚

```toml
[params.footer]
  since = 2026
  customText = "A field journal for projects, notes, and the life around them."
```

### 8.4 文章页行为

```toml
[params.article]
  headingAnchor = false
  math = false
  toc = true
  readingTime = true
```

含义：

- `headingAnchor`
  - 是否给标题加锚点链接
- `math`
  - 是否启用数学公式支持
- `toc`
  - 是否显示目录
- `readingTime`
  - 是否显示阅读时间

### 8.5 首页右侧栏模块

```toml
[params.widgets]
  homepage = [
    { type = "search" },
    { type = "archives", params = { limit = 8 } },
    { type = "categories", params = { limit = 10 } },
    { type = "tag-cloud", params = { limit = 10 } }
  ]
```

如果你不想要某个模块，删掉对应项即可。

### 8.6 颜色模式

```toml
[params.colorScheme]
  toggle = true
  default = "light"
```

可选值：

- `light`
- `dark`
- `auto`

### 8.7 评论

当前：

```toml
[params.comments]
  enabled = false
```

如果以后你想接入评论，需要：

1. 改成 `enabled = true`
2. 再补对应评论系统参数
3. 检查模板是否渲染正常

目前仓库里虽然保留了多种评论 provider 模板，但还没有配置具体服务。

---

## 9. 样式系统怎么改

### 9.1 变量层

- `assets/scss/variables.scss`

这里适合改：

- 主色
- 背景色
- 字体变量
- 阴影
- 圆角
- 代码块颜色

### 9.2 自定义层

- `assets/scss/custom.scss`

这里适合改：

- 首页 hero 区块
- 按钮
- 卡片细节
- 边距
- 响应式布局
- 个别组件视觉覆盖

### 9.3 SCSS 总入口

- `assets/scss/style.scss`

一般不需要经常改，除非你要新增新的 SCSS 文件并显式引入。

### 9.4 品牌图与资源

- `assets/img/brand-mark.svg`

如果你要换 logo，直接替换这个文件或修改 `hugo.toml` 中的头像路径。

---

## 10. 模板系统怎么改

### 10.1 首页

- `layouts/home.html`

### 10.2 文章页

- `layouts/single.html`
- `layouts/_partials/article/`

### 10.3 列表页

- `layouts/list.html`
- `layouts/_partials/article-list/`

### 10.4 页脚

- `layouts/_partials/footer/footer.html`

### 10.5 左侧栏

- `layouts/_partials/sidebar/left.html`

### 10.6 头部与字体

- `layouts/_partials/head/custom-font.html`
- `layouts/_partials/head/colorScheme.html`
- `layouts/_partials/head/style.html`

### 10.7 404 页面

- `layouts/404.html`

### 10.8 Markdown 渲染行为

- `layouts/_markup/render-image.html`
- `layouts/_markup/render-link.html`
- `layouts/_markup/render-heading.html`
- `layouts/_markup/render-blockquote.html`
- `layouts/_markup/render-codeblock-mermaid.html`

这些文件影响 Markdown 转成 HTML 后的具体表现。

---

## 11. 搜索功能完整说明

### 11.1 搜索功能依赖哪些文件

- 内容页：`content/page/search/index.md`
- 搜索页模板：`layouts/page/search.html`
- 搜索数据模板：`layouts/page/search.json`
- 搜索脚本：`assets/ts/search.tsx`
- 小组件搜索框：`layouts/_partials/widget/search.html`

### 11.2 搜索怎么工作

流程是：

1. Hugo 渲染出搜索页 HTML
2. Hugo 同时渲染搜索页 JSON 数据
3. 搜索脚本读取 JSON
4. 在浏览器端对文章内容做匹配

### 11.3 搜索页必须保留的 front matter

`content/page/search/index.md` 里必须保留：

```yaml
layout: search
outputs:
  - html
  - json
```

如果删掉 `json`，搜索页会显示出来，但不会有数据源。

### 11.4 搜索失效时怎么查

按这个顺序检查：

1. `content/page/search/index.md` 里有没有 `outputs: [html, json]`
2. `layouts/page/search.json` 是否还在
3. 本地构建后是否生成了 `public/搜索/index.json`
4. 搜索表单上是否有：

```html
data-json="/freeandeasy/搜索/index.json"
```

5. `assets/ts/search.tsx` 是否还保留了 `submit` 事件绑定
6. GitHub Actions 是否构建成功

### 11.5 搜索结果为空但页面没报错

优先考虑：

- JSON 文件路径不对
- JSON 文件没生成
- 搜索脚本没加载
- 文章内容里确实不包含关键词

---

## 12. 可用短代码

当前仓库保留的 shortcodes 在：

- `layouts/_shortcodes/`

包括：

- `youtube`
- `bilibili`
- `video`
- `quote`
- `gitlab`
- `tencent`

如果你要在文章里嵌入这些内容，可以进一步看对应 shortcode 文件的写法。

---

## 13. 多语言与文案

文案文件在：

- `i18n/`

当前中文优先看：

- `i18n/zh-cn.toml`

这里控制：

- 搜索框标签
- 搜索提示词
- 暗色模式文字
- 404 文案
- 分页提示

如果以后发现界面某处文字是空的，优先检查这里有没有对应翻译键。

---

## 14. GitHub Pages 发布流程

### 14.1 当前自动发布逻辑

文件：

- `.github/workflows/hugo.yaml`

触发条件：

- push 到 `main`
- 手动 `workflow_dispatch`

构建步骤：

1. checkout 仓库
2. 安装 Node.js
3. 安装 Dart Sass
4. 安装 Hugo
5. 执行 `hugo build`
6. 上传 `public/`
7. 发布到 GitHub Pages

### 14.2 日常发布命令

```bash
git add .
git commit -m "写你的提交说明"
git push
```

### 14.3 手动重跑部署

在 GitHub 仓库：

1. 打开 `Actions`
2. 选择 `Build and deploy`
3. 点击 `Run workflow`

### 14.4 看最近部署状态

如果本机 `gh` 可用：

```bash
gh run list -R zicheng1119/freeandeasy
```

查看某次失败日志：

```bash
gh run view <run-id> -R zicheng1119/freeandeasy --log-failed
```

---

## 15. 常见排障

### 15.1 本地能看，线上没更新

检查顺序：

1. `git push` 是否成功
2. GitHub Actions 是否成功
3. 是否等了 1 到 3 分钟
4. 浏览器是否缓存旧资源

### 15.2 页面样式丢了

常见原因：

- `baseURL` 改错
- SCSS 编译失败
- GitHub Actions 失败
- `assets/scss/style.scss` 引入链出问题

### 15.3 图片不显示

常见原因：

- 图片没放进文章 bundle 目录
- front matter 中的 `image` 路径写错
- 使用了错误的相对路径

### 15.4 搜索失效

优先看第 11 节。

### 15.5 中文界面文字变空

优先检查：

- `i18n/zh-cn.toml`
- `locale = "zh-cn"`

### 15.6 构建通过，但 `public/` 目录看起来不对

先执行：

```bash
rm -rf public resources/_gen
hugo --gc --minify
```

### 15.7 改了模板但没生效

优先检查：

- 是否改的是当前实际使用的模板文件
- 是否有局部模板覆盖
- 是否被缓存影响

---

## 16. Git 与版本管理建议

### 16.1 推荐日常操作

```bash
git status
git add .
git commit -m "你的说明"
git push
```

### 16.2 推荐的提交粒度

尽量分成：

- 内容修改
- 样式修改
- 模板修改
- 配置修改
- 发布修复

不要把完全无关的改动混在一个 commit 里。

### 16.3 大改前建议

在大改首页、搜索、模板前，先单独提交一个“当前稳定版本”。

---

## 17. 如何维护简历主页

简历主页是另一个仓库：

- 本地目录：`/Users/zhouzicheng/Desktop/zicheng1119.github.io`

主要文件：

- `index.html`
- `assets/styles.css`
- `.github/workflows/pages.yaml`

### 17.1 本地预览简历主页

```bash
cd /Users/zhouzicheng/Desktop/zicheng1119.github.io
python3 -m http.server 4173
```

访问：

```text
http://localhost:4173/
```

### 17.2 发布简历主页

```bash
cd /Users/zhouzicheng/Desktop/zicheng1119.github.io
git add .
git commit -m "更新 resume"
git push
```

---

## 18. 最常见的自定义场景

### 18.1 改站点标题

改：

- `hugo.toml` 里的 `title`

### 18.2 改左侧副标题

改：

- `hugo.toml` 里的 `[params.sidebar].subtitle`

### 18.3 改页脚文案

改：

- `hugo.toml` 里的 `[params.footer].customText`
- 或 `layouts/_partials/footer/footer.html`

### 18.4 改首页大标题和按钮

改：

- `layouts/home.html`

### 18.5 改配色

优先改：

- `assets/scss/variables.scss`
- `assets/scss/custom.scss`

### 18.6 改 logo

改：

- `assets/img/brand-mark.svg`

### 18.7 改 Resume 链接

改：

- `hugo.toml` 中 `[[menus.social]]` 的 `home`
- `layouts/home.html` 里“返回 Resume”按钮

---

## 19. 维护前检查清单

每次发布前建议快速检查：

1. 本地 `hugo server -D` 是否正常
2. 新文章是否 `draft: false`
3. 链接是否指向 `/freeandeasy/`
4. 搜索页是否还保留 `json` 输出
5. `git status` 是否确认无误

---

## 20. 最短操作速查

### 写新文章

```bash
hugo new content post/my-post/index.md
hugo server -D
git add .
git commit -m "Add my-post"
git push
```

### 改首页文案

改：

- `content/_index.md`
- `layouts/home.html`

### 改关于页

改：

- `content/page/about/index.md`

### 改颜色和字体

改：

- `assets/scss/variables.scss`
- `assets/scss/custom.scss`

### 搜索出问题

查：

- `content/page/search/index.md`
- `layouts/page/search.html`
- `layouts/page/search.json`
- `assets/ts/search.tsx`
- `i18n/zh-cn.toml`

---

## 21. 这份手册的更新原则

以后只要你改了下面这些关键能力，建议同步更新本文档：

- 新增页面结构
- 新增 front matter 规范
- 修改发布方式
- 修改搜索逻辑
- 修改简历主页联动方式

这样这份文档才能持续保持“真正能独立维护”的价值。
