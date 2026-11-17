#!/bin/bash
set -e
SRC="/Users/yinice/WorkBuddy/2026-11-17-09-59-07/hilltkoen-site"
DST="/Users/yinice/WorkBuddy/2026-11-17-09-59-07/hilltoken-astro/public"

mkdir -p "$DST"

# 静态素材、文本、图标整体复制
cp -R "$SRC/assets" "$DST/assets"
cp "$SRC/llms.txt" "$DST/llms.txt"
cp "$SRC/rss.xml" "$DST/rss.xml"
cp "$SRC/_headers" "$DST/_headers"
cp "$SRC/favicon.ico" "$DST/favicon.ico"
cp "$SRC/favicon.svg" "$DST/favicon.svg"

# 品牌素材两页 + notes 完整版：保留精心排版的原样静态页
mkdir -p "$DST/brand-kit/one-page" "$DST/notes/nexttoken-personal-site"
cp "$SRC/brand-kit/index.html" "$DST/brand-kit/index.html"
cp "$SRC/brand-kit/one-page/index.html" "$DST/brand-kit/one-page/index.html"
cp "$SRC/notes/nexttoken-personal-site/index.html" "$DST/notes/nexttoken-personal-site/index.html"

# 注意：不创建空的 media 目录——Astro 构建清理空目录时会被本机沙箱拦截。
# Pages CMS 首次上传图片时会自动创建该目录。

echo "PUBLIC_COPY_OK"
find "$DST" -type f | wc -l
