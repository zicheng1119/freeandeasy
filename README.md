# Free & Easy

这个仓库已经被配置成一个 Hugo 博客，目标发布地址是：

`https://zicheng1119.github.io/freeandeasy/`

它现在已经是一个**不依赖外部主题仓库**的独立 Hugo 项目。

## 你想要的结构

- `zicheng1119.github.io`
  - 用来放简历主页
  - 访问地址：`https://zicheng1119.github.io/`
- `freeandeasy`
  - 用来放 Hugo 博客源码
  - 访问地址：`https://zicheng1119.github.io/freeandeasy/`

## 这个仓库已经做好的事

- 配好了 Hugo 基础站点配置
- 把原来的主题代码收编进了项目本体
- 增加了首页、关于页、归档页、搜索页和首篇文章
- 配好了 GitHub Pages 官方 Actions 自动发布
- 不再需要手动提交 `public/` 目录
- 不再依赖 `.gitmodules` 或外部主题仓库

## 本地开发

启动本地预览：

```bash
hugo server -D
```

浏览器访问：

```text
http://localhost:1313/
```

## 发布到 GitHub Pages

### 1. 创建博客仓库

在 GitHub 上创建仓库：

`freeandeasy`

然后把当前项目推上去。

### 2. 打开 GitHub Pages

进入仓库：

`Settings -> Pages`

把发布源切换成：

`GitHub Actions`

这个项目已经包含 `.github/workflows/hugo.yaml`，之后每次 push 到 `main` 都会自动构建和发布。

### 3. 准备根站点仓库

再单独创建一个仓库：

`zicheng1119.github.io`

这个仓库专门放你的简历主页。

于是最终效果就是：

- `https://zicheng1119.github.io/` 是 resume
- `https://zicheng1119.github.io/freeandeasy/` 是 blog

### 4. 从简历页跳转到博客

你可以在简历主页加一个链接：

```html
<a href="https://zicheng1119.github.io/freeandeasy/">Blog</a>
```

## 新建文章

```bash
hugo new content post/my-post/index.md
```

把文章里的 `draft` 改成 `false`，或者直接保留为草稿后用 `hugo server -D` 本地预览。
