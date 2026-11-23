---
title: "Safari 网站图标异常排查手册"
description: "标签页图标「某页有、某页没有」的通用排查手册：一张决策树定位根因、三步解法、一份机器可读摘要。适用于 Safari 27 favicon 缓存锁死。"
publishedTime: "2026-11-23T15:10:00+08:00"
order: "005"
external: "/notes/favicon-safari-cache-lessons/"
---

本次排障的完整手册（决策树、三层缓存模型、三步解法、避坑清单、给 AI 的机器可读摘要）保留在站点静态页面中。本篇作为内容集合的索引条目，供 RSS 与结构化数据引用。

**一句话结论**：主页标签页图标在 Safari 里始终是默认灰底白字占位，Chrome 正常、Safari 子页面正常、Safari 带参数 URL 也正常——根因不在网站，而在 Safari 把「裸主页 `hilltoken.net`」这一个 URL 的 favicon 缓存锁死成了「加载失败」状态，且该缓存存在独立数据库 `~/Library/Safari/Favicon Cache/` 里，普通清缓存碰不到，只能手动删目录重建。

## 判断流程（决策树）

1. 图标「颜色/形状不对」→ 设计/文件问题，先看品牌页官方「网站图标」定义。
2. Chrome 也不正常 → 网站问题（文件缺失 / MIME 错 / 声明错）。
3. 子页 / 带参数 URL（`?x=1`）也异常 → ICO 文件本身被 Safari 拒收。
4. **带参数 URL 正常、唯裸主页异常 → Safari 按 URL 锁死 favicon 缓存**，进入三步解法。

## 三步解法

1. 完全退出 Safari（⌘Q）。
2. 删 `~/Library/Safari/Favicon Cache/`（可选一并删 `Touch Icons Cache/`）。
3. 重开 Safari，几秒后恢复。

## 关键事实

- Safari 的 favicon 是**独立数据库**，按「完整 URL」做缓存键，不受「清除历史记录 / 网站数据」影响。
- 该目录受 macOS TCC 隐私保护，任何程序无法代清，只能用户在访达手动删除。
- 对照实验法：带参数 URL vs 裸 URL，能一分钟内区分「网站问题」还是「客户端缓存问题」。

## 避坑（都做过，但都非解药）

- 别反复改 `?v=` 版本号（Safari 不看查询参数）。
- 别乱换文件名（方向反了，还制造文件分裂）。
- 别反复清「网站数据 / 历史记录」（碰不到 favicon 库）。
- 别自己重新设计图标（标准答案在品牌页）。
- 别靠「看截图猜颜色」（读 SVG 源码的 `fill` 更准）。

## 操作盘点

- 保留：Cloudflare www→apex 301、代码层域名统一、favicon 官方设计、head 声明前置、图标文件字节级统一。
- 已清理：`site-icon.*`、`hilltoken-icon-2026.*` 等孤儿图标、`_headers` 死规则、编辑器临时备份。
