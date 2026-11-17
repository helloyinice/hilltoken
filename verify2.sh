#!/bin/bash
PROJ="/Users/yinice/WorkBuddy/2026-11-17-09-59-07/hilltoken-astro"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TS=$(date +%s)

echo '=== CSS link 检查 ==='
grep -o '<link rel="stylesheet"[^>]*>' "$PROJ/dist/index.html" || echo "NO CSS LINK"

echo '=== site.css 存在 ==='
ls -l "$PROJ/dist/site.css" 2>&1

echo '=== 启动本地 HTTP 并截图（绝对路径资源在 http 下才正确）==='
cd "$PROJ/dist"
python3 -m http.server 8899 >/tmp/ht_http.log 2>&1 &
SRV_PID=$!
sleep 2

"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --user-data-dir=/tmp/ht_astro_v2_$TS --force-device-scale-factor=1 \
  --screenshot=/tmp/ht_astro_home2.png --window-size=1440,900 \
  "http://127.0.0.1:8899/index.html" 2>&1 | grep -i written || echo "screenshot failed"

kill $SRV_PID 2>/dev/null
echo '=== DONE ==='
