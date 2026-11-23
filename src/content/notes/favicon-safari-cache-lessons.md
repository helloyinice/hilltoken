---
title: "一次 favicon 排障的完整复盘：Safari 缓存锁死"
description: "主页图标在 Safari 里是灰底占位、Chrome 却正常：十余轮排查后定位为 Safari 27 独立 favicon 数据库按 URL 锁死。"
publishedTime: "2026-11-23T15:10:00+08:00"
order: "005"
external: "/notes/favicon-safari-cache-lessons/"
---

这次排障的完整排版版本（含逐条现象、十余轮排查历程、根因剖析与操作复盘）保留在站点静态页面中。本篇作为内容集合的索引条目，供 RSS 与结构化数据引用。

**一句话结论**：主页标签页图标在 Safari 里始终是默认灰底白字占位，Chrome 正常、Safari 子页面正常、Safari 带参数 URL 也正常——根因不在网站，而在 Safari 把「裸主页 `hilltoken.net`」这一个 URL 的 favicon 缓存锁死成了「加载失败」状态，且该缓存存在独立数据库 `~/Library/Safari/Favicon Cache/` 里，普通清缓存碰不到，只能手动删目录重建。

## 关键事实链

- **同一份代码、同一个文件**，Chrome 主页正常、Safari 子页正常、Safari 带参数 URL 正常，唯独 Safari 裸主页不行 → 排除"网站写错"。
- Safari 的 favicon 是**独立数据库**，按「完整 URL」做缓存键，不受「清除历史记录 / 网站数据」影响。
- 该目录受 macOS TCC 隐私保护，任何程序无法代清，只能用户在访达手动删除 `~/Library/Safari/Favicon Cache/`。

## 五条方法论

1. favicon「某页有某页没有」先做对照实验（带参数 URL vs 裸 URL），比盲改代码高效一个量级。
2. 图标标准答案先去看品牌页官方「网站图标」定义，别自己重新设计。
3. 别假设"缓存锁死"就乱改文件名/域名/声明顺序，先找正常页与异常页的真实差异。
4. 记住 Safari 的 favicon 是独立数据库，清网站数据无效。
5. 别过度依赖"看截图猜图标"，读 SVG 源码的 fill 颜色更准。
