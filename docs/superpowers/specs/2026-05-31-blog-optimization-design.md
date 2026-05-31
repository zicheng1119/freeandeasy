# 博客优化设计文档

- 日期：2026-05-31
- 项目：Free & Easy（Hugo 博客，基于 hugo-theme-stack，主题已内置进项目）

## 背景与目标

现有博客是一个自包含的 Hugo 站点。目标：

1. 提升美观性——确立统一的视觉基调
2. 提升功能性——增加阅读体验相关功能
3. 抹除原主题作者的署名
4. 支持在文章里插入动画、PDF、视频

## 需求确认（已与用户敲定）

- **美学方向：静谧自然**——温润米白底、苔藓绿点缀、衬线标题、大量留白，安静手记感。
- **署名处理：只清掉主题作者（hugo-theme-stack / Jimmy Cai）的署名**；`zicheng1119` 是用户自己的账号，所有相关信息（GitHub 链接、giscus 仓库、部署地址）全部保留。
- **动画需求**：滚动入场动效（全站）、交互式嵌入（iframe）、GIF/动图/动态 SVG。**不要 Lottie。**
- **功能需求**：阅读进度条 + 回到顶部、PDF 内嵌查看器、相关文章 + 上一篇/下一篇、图片点击放大。
- **视频**：已有 video/youtube/bilibili/tencent 短代码，保持不变。

## 技术方案

**分层叠加，不改主题内核。** 主题预留了 `head/custom.html` 与 `footer/custom.html` 注入点。仅新增一个自定义 CSS + 一个自定义 JS 从注入点挂载；新功能用 Hugo 短代码与少量 partial 覆盖实现。

理由：改动小、可回退、不与主题升级冲突。否决直接改主题 SCSS/布局的方案（侵入性强、易坏、难维护）。

## 详细设计

### 1. 视觉 · 静谧自然

新建 `assets/css/custom.css`，覆盖主题的 CSS 自定义属性（具体变量名在实现时读取主题 CSS 确认）：

- 配色：底色 `#f4f1ea`，苔藓绿 `#8a9a7b` / 深苔绿 `#5c6b54`，墨色 `#33352f`
- 深色模式：暖调暗色（底 `#1f2420`、文字 `#e8e4d8`、强调 `#9aab8a`）
- 字体：衬线标题栈 `Georgia, "Songti SC", "Noto Serif SC", serif`；正文保留系统无衬线以保证可读性
- 加大行高与段落留白，统一打磨卡片、链接、引用块、代码块

### 2. 抹除主题署名

grep `Stack` / `Jimmy Cai` / `CaiJimmy` / `hugo-theme-stack`，定位 LICENSE、主题配置、代码注释、页脚 powered-by 等处的署名并清除。`zicheng1119` 不动。

### 3. 插入媒体（短代码）

- `layouts/_shortcodes/pdf.html`：`{{< pdf src="xxx.pdf" height="600" >}}`，响应式 iframe 调用浏览器原生 PDF 查看器（自带翻页），附下载兜底链接。无需引入 PDF.js。
- `layouts/_shortcodes/embed.html`：`{{< embed src="xxx" ratio="16x9" >}}`，自适应 iframe，放 CodePen / 交互式 demo。
- GIF / 动图 / 动态 SVG：Markdown 原生 `![](x.gif)` 即可；灯箱逻辑对其友好处理。

### 4. 功能增强

全部写进 `assets/js/custom.js`，经 `footer/custom.html` 挂载：

- 阅读进度条（滚动联动，固定顶部）+ 回到顶部按钮（滚动后出现）
- 图片点击放大：纯原生灯箱，零依赖；已被链接包裹的图片跳过
- 滚动入场动效：IntersectionObserver 淡入/上滑；遵守 `prefers-reduced-motion`
- 相关文章 + 上一篇/下一篇：覆盖 `layouts/_partials/article/article.html`，上下篇按同分区日期，相关按共享标签

## 文件清单

- 新增：`assets/css/custom.css`、`assets/js/custom.js`、`layouts/_shortcodes/pdf.html`、`layouts/_shortcodes/embed.html`
- 改动：`layouts/_partials/head/custom.html`、`layouts/_partials/footer/custom.html`、`layouts/_partials/article/article.html`
- 清理：署名所涉的 LICENSE/主题文件（实现时 grep 定位）

## 不在范围内（YAGNI）

- Lottie 动画（用户未选）
- 重写主题 SCSS 构建管线
- 改动任何 `zicheng1119` 相关信息

## 验证方式

`hugo server -D` 后逐项手测：

1. 浅色 + 深色下静谧自然配色生效、标题为衬线
2. `pdf` 短代码渲染并可翻页；`embed` 短代码响应式
3. 阅读进度条、回到顶部、图片灯箱可用
4. 滚动入场动效触发；开启系统「减弱动态效果」时禁用
5. 任意文章页显示相关文章 + 上下篇
6. grep 确认无主题作者署名残留；`zicheng1119` 仍在
