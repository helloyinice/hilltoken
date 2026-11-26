/* HillToken 首页 · 滚动收缩首屏驱动 · 2026-11-24
 * 依赖 DOM：#stage #screen #copy #title #ridge #sun #cue #mast .vid
 * 纯原生 JS，无构建、无依赖；由 BaseLayout 仅在首页引入。
 */
(function () {
  'use strict';

  var screenEl = document.getElementById('screen');
  var copyEl   = document.getElementById('copy');
  var titleEl  = document.getElementById('title');
  var ridge    = document.getElementById('ridge');
  var sun      = document.getElementById('sun');
  var cue      = document.getElementById('cue');
  var stage    = document.getElementById('stage');
  var stickyEl = stage.querySelector('.sticky') || stage;
  var mast     = document.getElementById('mast');
  var vids     = Array.prototype.slice.call(document.querySelectorAll('.vid'));
  if (!screenEl || !stage || !mast) return;

  var BP = 900;                       // 与 CSS 断点一致
  var narrowMode = innerWidth < BP;

  // 竖屏用竖版素材（9:16），横屏用横版；只在跨断点时重载
  function syncSources() {
    var dir = narrowMode ? '/media/hills/v/' : '/media/hills/';
    // 竖版素材已重新封装（SAR 归 1:1、去掉 tmcd 轨），文件名没变，
    // 必须换 URL 才能绕开浏览器/CDN 的 immutable 长缓存。
    var ver = narrowMode ? '?v=20261126b' : '';
    vids.forEach(function (v) {
      // Chrome 在 JS 重写 <source> 并 load() 后可能丢掉 muted 状态；
      // 一旦 unmuted，自动播放会被策略拦下，画面就永远停在封面。
      v.muted = true;
      v.playsInline = true;
      var s = v.querySelector('source');
      if (s) {
        var base = s.getAttribute('data-src');
        if (!base) { base = s.getAttribute('src'); s.setAttribute('data-src', base); }
        if (!base) return;
        var url = base.split('/media/hills/')[1];
        if (!url) return;
        url = dir + url + ver;
        if (s.getAttribute('src') !== url) { s.setAttribute('src', url); v.load(); }
      }
      var po = v.getAttribute('data-poster');
      if (po === null) { po = v.getAttribute('poster') || ''; v.setAttribute('data-poster', po); }
      var pn = po.split('/media/hills/')[1];
      if (pn) {
        var purl = dir + pn;
        if (v.getAttribute('poster') !== purl) v.setAttribute('poster', purl);
      }
    });
  }
  syncSources();

  var vi = 0, vidsPaused = false;

  // 统一播放入口。原来直接 v.play().catch(()=>{}) 会把 Chrome 的
  // NotAllowedError / AbortError 静默吞掉，视频便永久停在 poster。
  function playVid(v) {
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    var p;
    try { p = v.play(); } catch (err) { p = Promise.reject(err); }
    if (p && p.catch) p.catch(function () {
      var retry = function () {
        v.removeEventListener('loadeddata', retry);
        v.removeEventListener('canplay', retry);
        if (!vidsPaused && !document.body.classList.contains('flat')) {
          v.muted = true;
          v.play().catch(function () {});
        }
      };
      v.addEventListener('loadeddata', retry);
      v.addEventListener('canplay', retry);
    });
  }

  // 兜底：任何一次真实手势都再试一次（应对严格的自动播放策略）
  function armGestureRetry() {
    if (armGestureRetry.bound) return;
    armGestureRetry.bound = true;
    var onGesture = function () {
      document.removeEventListener('touchend', onGesture, true);
      document.removeEventListener('pointerdown', onGesture, true);
      document.removeEventListener('click', onGesture, true);
      armGestureRetry.bound = false;
      if (!vidsPaused && !document.body.classList.contains('flat')) playVid(vids[vi]);
    };
    document.addEventListener('touchend', onGesture, true);
    document.addEventListener('pointerdown', onGesture, true);
    document.addEventListener('click', onGesture, true);
  }

  var LEN = ridge.getTotalLength();
  ridge.style.strokeDasharray = LEN;
  ridge.style.strokeDashoffset = LEN;

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp  = function (a, b, t) { return a + (b - a) * t; };
  var smooth = function (e0, e1, v) {
    var t = clamp((v - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  var easeInOut = function (t) {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  var mix = function (a, b, t) {
    return 'rgb(' + Math.round(lerp(a[0], b[0], t)) + ',' +
                    Math.round(lerp(a[1], b[1], t)) + ',' +
                    Math.round(lerp(a[2], b[2], t)) + ')';
  };

  // 开场（压在视频上）：米白字；落定（回到纸色页）：墨色字
  var L1 = [247, 244, 236], L2 = [226, 223, 214], L3 = [196, 193, 184];
  var D1 = [20, 20, 20],    D2 = [74, 74, 72],    D3 = [123, 121, 114];

  function render(p) {
    var W = innerWidth, H = innerHeight;
    var narrow = W < 900;

    // 顶部导航：开场全透明（视频顶到页沿），滚动后纸色聚拢、字色同步转墨
    var mbg = smooth(.03, .20, p);
    var mt  = mbg;
    var mlg = smooth(.12, .30, p);
    mast.style.setProperty('--mast-bg', mbg.toFixed(3));
    mast.style.setProperty('--mast-ink', mix(L1, D1, mt));
    mast.style.setProperty('--mast-ink2', mix(L2, D2, mt));
    mast.style.setProperty('--mast-ink3', mix(L3, D3, mt));
    mast.style.setProperty('--mast-line', 'rgba(20,20,20,' + (.16 * mt).toFixed(3) + ')');
    mast.style.setProperty('--mast-scrim', (1 - smooth(.03, .20, p)).toFixed(3));
    mast.style.setProperty('--mast-shA', (1 - mt).toFixed(2));
    mast.style.setProperty('--mast-shB', (mt * .9).toFixed(2));
    mast.style.setProperty('--mast-gap', lerp(0, 16, mlg).toFixed(1) + 'px');
    mast.style.setProperty('--mast-logo-w', lerp(0, narrow ? 56 : 80, mlg).toFixed(1) + 'px');
    mast.style.setProperty('--mast-logo-op', mlg.toFixed(3));

    var maxW = 1240;
    var gutter = Math.min(Math.max(W * .04, 20), 48);
    var wrapW = Math.min(W - gutter * 2, maxW);
    var wrapLeft = (W - wrapW) / 2;
    var copyTop = narrow ? 150 : Math.min(Math.max(H * .2, 180), 220);

    // 终态：右上正方形位置，只托住 logo 本身，无边框无底色
    var finalW = narrow ? Math.min(wrapW * .7, 320) : Math.min(wrapW * .30, 340);
    var finalH = finalW;
    var finalL = wrapLeft + wrapW - finalW;
    var finalT = narrow ? H * .05 : copyTop;

    var navH = mast.offsetHeight || 116;

    if (narrow) {
      // ---- 手机：整屏视频 → 向上收成 16:9 横幅 ----
      var g  = Math.min(Math.max(W * .045, 16), 26);
      var bw = W - g * 2;
      var bh = Math.round(bw * 9 / 16);
      var bt = navH + 14;
      copyEl.style.setProperty('--copytop', Math.round(bt + bh + 26) + 'px');

      var e2 = easeInOut(clamp((p - .02) / .48, 0, 1));
      screenEl.style.width  = lerp(W, bw, e2) + 'px';
      screenEl.style.height = lerp(H, bh, e2) + 'px';
      screenEl.style.left   = lerp(0, g, e2) + 'px';
      screenEl.style.top    = lerp(0, bt, e2) + 'px';
      screenEl.style.setProperty('--symh', '100%');
      screenEl.style.setProperty('--vidop', String(1 - smooth(.90, .96, p)));

      // 文案跟着视频一起从视口下方推上来，避免收缩过程中间留一段空屏
      var pushUp = Math.max(0, H - (bt + bh + 26));
      copyEl.style.setProperty('--copyty', Math.round(lerp(pushUp, 0, smooth(.05, .58, p))) + 'px');

      titleEl.style.setProperty('--op', smooth(.30, .46, p));
      titleEl.style.setProperty('--ty', lerp(20, 0, smooth(.30, .52, p)) + 'px');
      copyEl.style.setProperty('--op2', smooth(.34, .48, p));
      copyEl.style.setProperty('--ty2', lerp(8, 0, smooth(.34, .52, p)) + 'px');
      copyEl.style.setProperty('--lowop', smooth(.42, .56, p));
      copyEl.style.setProperty('--cut', (100 - 100 * smooth(.42, .60, p)).toFixed(1) + '%');
      copyEl.style.setProperty('--lowop2', smooth(.46, .62, p));
      copyEl.style.setProperty('--lowty', lerp(18, 0, smooth(.46, .66, p)) + 'px');

      ridge.style.strokeDashoffset = LEN * (1 - smooth(.54, .82, p));
      ridge.setAttribute('stroke-width', lerp(42, 46, smooth(.72, .86, p)).toFixed(1));
      sun.style.opacity = smooth(.76, .86, p);
    } else {
      // ---- 桌面：整屏视频 → 收缩到右上，山脊成 logo ----
      var e = easeInOut(clamp(p / .88, 0, 1));
      // 一开滚就让视频上沿退到导航下方：顶部始终干净，字色才能转黑
      var baseTop = lerp(0, finalT, e);
      var lift = Math.max(0, navH * smooth(.02, .16, p) - baseTop);
      screenEl.style.width  = lerp(W, finalW, e) + 'px';
      screenEl.style.height = (lerp(H, finalH, e) - lift) + 'px';
      screenEl.style.left   = lerp(0, finalL, e) + 'px';
      screenEl.style.top    = (baseTop + lift) + 'px';

      screenEl.style.setProperty('--symh', lerp(46, 100, smooth(.68, 1, p)).toFixed(2) + '%');
      screenEl.style.setProperty('--vidop', String(1 - smooth(.83, .88, p)));

      // 标题：视频让开左半区之后才显影
      titleEl.style.setProperty('--op', smooth(.56, .64, p));
      titleEl.style.setProperty('--ty', lerp(26, 0, smooth(.56, .72, p)) + 'px');
      copyEl.style.setProperty('--op2', smooth(.60, .70, p));
      copyEl.style.setProperty('--ty2', lerp(10, 0, smooth(.60, .74, p)) + 'px');
      copyEl.style.setProperty('--lowop', smooth(.68, .82, p));
      copyEl.style.setProperty('--cut', (100 - 100 * smooth(.68, .84, p)).toFixed(1) + '%');
      copyEl.style.setProperty('--lowop2', smooth(.70, .86, p));
      copyEl.style.setProperty('--lowty', lerp(24, 0, smooth(.70, .88, p)) + 'px');

      // 山脊线：全程墨色，随滚动一笔写出
      ridge.style.strokeDashoffset = LEN * (1 - smooth(.34, .8, p));
      ridge.setAttribute('stroke-width', lerp(24, 34, smooth(.78, .92, p)).toFixed(1));
      sun.style.opacity = smooth(.84, .92, p);
    }

    cue.style.setProperty('--cue', String(1 - smooth(0, .1, p)));
    document.body.classList.toggle('pinned', p > .92);

    var shouldPause = p > .9;
    if (shouldPause !== vidsPaused) {
      vidsPaused = shouldPause;
      if (shouldPause) vids.forEach(function (v) { v.pause(); });
      else playVid(vids[vi]);
    }
  }

  // 滚动距离 = 舞台高 - 粘性层实际高（不是 innerHeight），滚完即交棒
  function travel() {
    return Math.max(stage.offsetHeight - stickyEl.offsetHeight - stage.offsetTop, 1);
  }

  // 文案已接近一屏高时 sticky 会失灵：直接降级为落定版式。
  // 必须先摘掉 flat 再量，否则降级态本身更矮，会造成来回翻转。
  function fitMode() {
    var wasFlat = document.body.classList.contains('flat');
    document.body.classList.remove('flat');
    var h = stickyEl.offsetHeight;
    // Chrome 的地址栏 / 底部工具栏会把 innerHeight 压低约 100px；若只拿
    // innerHeight 比较，正常手机会被误判成「矮视口」，进而 display:none
    // 整个视频层——这正是移动端 Chrome 看不到视频的原因。用屏幕高度兜底，
    // 并给窄屏的竖向叙事留出余量；再加一点滞后避免地址栏收缩时反复翻转。
    var vh = Math.max(innerHeight, (screen.height || 0) * .9, 560);
    var slack = innerWidth < BP ? 140 : 8;
    var flat = h > vh + slack;
    if (wasFlat && h > vh + slack - 40) flat = true;
    document.body.classList.toggle('flat', flat);
    return flat;
  }

  function progress() {
    var range = travel();
    var y = window.scrollY - stage.offsetTop;
    document.body.classList.toggle('past', y > range - 2);
    return clamp(y / range, 0, 1);
  }

  var target = 0, cur = 0, raf = null;
  function tick() {
    cur = lerp(cur, target, .16);
    if (Math.abs(cur - target) < .0005) { cur = target; render(cur); raf = null; return; }
    render(cur);
    raf = requestAnimationFrame(tick);
  }
  function kick() {
    if (document.body.classList.contains('flat')) return;
    target = progress();
    if (!raf) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', function () {
    var n = innerWidth < BP;
    if (n !== narrowMode) {
      narrowMode = n;
      syncSources();
      setTimeout(function () { activate(vi); }, 60);
    }
    if (fitMode()) return;
    target = progress(); cur = target; render(cur);
  });

  // 字体加载完高度会变，重新判定一次降级
  window.addEventListener('load', function () {
    if (fitMode()) vids.forEach(function (v) { v.pause(); });
    else {
      target = cur = progress(); render(cur);
      if (vids[vi].paused) playVid(vids[vi]);
    }
  });

  if (fitMode()) { vids.forEach(function (v) { v.pause(); }); return; }

  // 调试定格：#static&p=0.45 / #p=1
  var m = location.hash.match(/p=([\d.]+)/);
  if (m) {
    var p = clamp(parseFloat(m[1]), 0, 1);
    if (location.hash.indexOf('static') > -1) document.body.classList.add('static');
    if (location.hash.indexOf('static') === -1) window.scrollTo(0, p * travel());
    cur = target = p;
    render(p);
  } else {
    cur = target = progress();
    render(cur);
  }

  // 四段山川：一段播完交叉淡入下一段，无限循环
  function activate(i) {
    vi = i;
    vids.forEach(function (v, k) { v.classList.toggle('on', k === i); });
    var v = vids[i];
    // syncSources() 已经 load()；这里再 load() 会打断刚发起的 play()，
    // 在 Chrome 上表现为「视频不动」，因此不再重复加载。
    try { v.currentTime = 0; } catch (err) {}
    playVid(v);
  }

  vids.forEach(function (v, i) {
    v.addEventListener('timeupdate', function () {
      if (i !== vi || vidsPaused) return;
      if (v.duration && v.currentTime > v.duration - 0.9) {
        activate((vi + 1) % vids.length);
      }
    });
  });

  activate(0);
  armGestureRetry();
  // 首屏若因自动播放策略被拒，等资源就绪后再补一次
  setTimeout(function () {
    if (!vidsPaused && !document.body.classList.contains('flat') && vids[vi].paused) playVid(vids[vi]);
  }, 1200);
})();
