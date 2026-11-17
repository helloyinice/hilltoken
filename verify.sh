#!/bin/bash
PROJ="/Users/yinice/WorkBuddy/2026-11-17-09-59-07/hilltoken-astro"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TS=$(date +%s)

echo '=== SEO 标签检查（dist/index.html）==='
HTML="$PROJ/dist/index.html"
for pat in \
  'application/ld+json' \
  '"@type":"WebSite"' \
  '"@type":"Person"' \
  'og:image' \
  'hilltoken-og-1200x630.png' \
  'twitter:card' \
  'rel="canonical"' \
  'rel="describedby"' \
  'favicon.svg' \
  'apple-touch-icon'; do
  if grep -q "$pat" "$HTML"; then echo "OK   $pat"; else echo "MISS $pat"; fi
done

echo '=== JSON-LD 数量 ==='
grep -o 'application/ld+json' "$HTML" | wc -l

echo '=== RSS 条目 ==='
grep -o '<item>' "$PROJ/dist/rss.xml" | wc -l

echo '=== 截图首页（预览 dist）==='
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --user-data-dir=/tmp/ht_astro_v_$TS --force-device-scale-factor=1 \
  --screenshot=/tmp/ht_astro_home.png --window-size=1440,900 \
  "file://$PROJ/dist/index.html" 2>&1 | grep -i written || echo "screenshot failed"

echo '=== DONE ==='
