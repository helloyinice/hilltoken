#!/bin/bash
set -u
PROJ="/Users/yinice/WorkBuddy/2026-11-17-09-59-07/hilltoken-astro"

# 样式表作为静态资源放到 public，用 <link> 显式引用，绕开 Astro CSS 打包注入问题
cp "$PROJ/src/styles/site.css" "$PROJ/public/site.css"

# 清理残留空目录、重复嵌套目录，以及旧 dist
rm -rf "$PROJ/public/assets/brand-kit/media"
rm -rf "$PROJ/public/assets/assets"
rm -rf "$PROJ/dist"

cd "$PROJ" && npm run build 2>&1
echo "BUILD_EXIT=$?"

echo '=== DIST TOP-LEVEL ==='
find "$PROJ/dist" -maxdepth 2 -type f 2>&1 | sort

echo '=== ASSET PATH CHECK ==='
if [ -d "$PROJ/dist/assets/assets" ]; then
  echo "NESTED_ASSETS_PRESENT"
else
  echo "ASSET_PATH_CLEAN"
fi

echo '=== KEY FILES ==='
for f in index.html rss.xml llms.txt favicon.ico favicon.svg brand-kit/index.html brand-kit/one-page/index.html notes/nexttoken-personal-site/index.html assets/brand-kit/social/hilltoken-og-1200x630.png; do
  if [ -f "$PROJ/dist/$f" ]; then echo "OK   $f"; else echo "MISS $f"; fi
done
