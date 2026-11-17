# HillToken｜山外有词 — Astro 站点

把原本手写 HTML 的静态站迁移到 Astro，目标是：**内容可被 Pages CMS 在浏览器/手机上编辑**，同时补齐结构化数据、社交分享卡片等 SEO / GEO 基础设施。视觉与 URL 与现有站点保持一致。

## 目录结构

```
hilltoken-astro/
├── astro.config.mjs          # site / 静态输出 / 目录式 URL / 尾斜杠
├── .pages.yml                # Pages CMS 可编辑字段定义
├── .github/workflows/
│   └── deploy.yml            # push 到 main 自动构建并部署到 Cloudflare Pages
├── src/
│   ├── data/site.json        # 首页文案与站点设置（CMS 可编辑）
│   ├── content/notes/        # 文章 Markdown（CMS 可编辑）
│   ├── content.config.ts     # 内容集合 schema
│   ├── layouts/
│   │   ├── BaseLayout.astro  # 统一 head：SEO / OG / JSON-LD / favicon
│   │   └── Footer.astro
│   ├── components/Header.astro
│   ├── pages/
│   │   ├── index.astro       # 首页（数据驱动）
│   │   └── rss.xml.ts        # RSS 生成
│   └── styles/site.css      # 站点样式（含文章页）
├── public/                   # 原样静态资源（构建时直接拷贝）
│   ├── assets/brand-kit/**   # 品牌素材（logo/symbol/lockup/social/...）
│   ├── brand-kit/index.html  # 品牌素材完整版（保留原排版）
│   ├── brand-kit/one-page/   # 品牌素材单页版（保留原排版）
│   ├── notes/nexttoken-personal-site/  # 研究简报完整版（保留原排版）
│   ├── llms.txt / rss.xml / _headers / favicon.*
└── 上线操作卡_PagesCMS接入.html  # 用户操作卡
```

## 设计取舍

- **首页真正数据驱动**：文案抽到 `src/data/site.json`，经 Pages CMS 可视化编辑。
- **三份精心排版的页面原样保留**：品牌素材完整版与单页版、研究简报完整版，含大量内联 SVG / 表格 / 引文块，转成 CMS 字段会损失排版，因此作为 `public/` 静态页保留，视觉零改动。
- **统一 Layout 补齐基础设施**：`BaseLayout.astro` 一次性给全站加上 WebSite/Person(JSON-LD)、文章页 Article(JSON-LD)、完整 OG/Twitter 卡片（含 `og:image`）、favicon 三件套、canonical、`rel=describedby`。这些正是原站点被注释或缺失的部分。
- **RSS 由 Astro 从内容集合生成**，新增文章自动进入订阅源。

## 本地开发

```bash
npm install       # 首次
npm run dev       # 本地预览 http://localhost:4321
npm run build     # 构建到 dist/
npm run preview   # 预览构建产物
```

## 上线（一次性配置）

见 `上线操作卡_PagesCMS接入.html`。概要：

1. 创建 GitHub 公开仓库，把本项目 push 到 `main`。
2. Cloudflare 创建 API Token（Account → Cloudflare Pages → Edit），在 GitHub 仓库 Settings → Secrets 添加 `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`。
3. `app.pagescms.org` 用 GitHub 登录、安装 GitHub App 并授权该仓库，即可在手机/浏览器编辑内容。
4. 每次 push 触发 `.github/workflows/deploy.yml`，自动构建并部署到 Cloudflare Pages 项目 `hilltoken`，自定义域名不变。

## 与原站点的关系

原站点在 `../hilltkoen-site/`，是通过 wrangler 直接上传部署的现行线上版本。本项目是迁移候选，**构建验证通过后、用户确认前，不切换线上部署**。切换只需把部署来源从「直接上传 hilltkoen-site」改为「GitHub Actions 部署 dist」。
