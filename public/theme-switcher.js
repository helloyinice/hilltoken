/* HillToken 圆环调色盘组件 · 交互逻辑 · 2026-11-23
 * 用法：放进 public/，在 BaseLayout <head> 以 defer 引入 theme-switcher.js
 * 自动在右上角挂载圆环调色盘；悬停扇区即时预览，点击确认并存 localStorage('hilltoken:colourway')；
 * 移出圆环 / 关闭面板 / Esc 均回到已确认配色；同步 <meta name="theme-color">。
 * 每个扇区由外到内三层弧带分别表示 信号色 / 墨 / 纸。
 * 暴露 window.HillTokenTheme = { set(key), reset(), themes }。无外部依赖。
 */
(function () {
  'use strict';
  var KEY = 'hilltoken:colourway';
  var NS = 'http://www.w3.org/2000/svg';
  var THEMES = [
    { key:'base',   name:'暖纸 · 朱红', en:'Original', paper:'#f5f2ea', chips:['#f5f2ea','#141414','#ff4b18'] },
    { key:'indigo', name:'靛青 · 冷纸', en:'Indigo', paper:'#eef2f6', chips:['#eef2f6','#152232','#1d5fa8'], flag:'推荐' },
    { key:'pine',   name:'松烟 · 苔绿', en:'Pine', paper:'#f0f2ea', chips:['#f0f2ea','#1c2a20','#2f6b4a'] },
    { key:'ochre',  name:'赭石 · 岩黄', en:'Ochre', paper:'#f5efe2', chips:['#f5efe2','#2b2419','#a9602a'] },
    { key:'plum',   name:'藕荷 · 棠紫', en:'Plum', paper:'#f2eef5', chips:['#f2eef5','#251c2e','#74448c'] },
    { key:'night',  name:'夜航 · 反相', en:'Midnight', paper:'#121821', chips:['#121821','#eef1ec','#e9b968'] }
  ];
  var root = document.documentElement;

  var wrap = document.createElement('div');
  wrap.className = 'ts-root';
  wrap.innerHTML =
    '<button class="ts-btn" type="button" aria-label="选择网站配色" aria-expanded="false" aria-controls="ts-panel" title="选择网站配色">' +
      '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M12 3a9 9 0 0 0 0 18h1.6a1.9 1.9 0 0 0 0-3.8H12a1.4 1.4 0 0 1 0-2.8h5A4 4 0 0 0 21 10.4C21 6.3 17 3 12 3Z"/>' +
        '<circle cx="7.4" cy="11.4" r="1.15" style="fill:var(--signal)" stroke="none"/>' +
        '<circle cx="9.4" cy="7.7" r="1.15" style="fill:var(--ink-2)" stroke="none"/>' +
        '<circle cx="13.6" cy="7.2" r="1.15" style="fill:var(--ink-3)" stroke="none"/>' +
        '<circle cx="17.2" cy="10.2" r="1.15" style="fill:var(--signal-text)" stroke="none"/>' +
      '</svg>' +
    '</button>' +
    '<div class="ts-panel" id="ts-panel" role="group" aria-label="配色选择" aria-hidden="true">' +
      '<div class="ts-head"><strong>网站配色</strong><span>Colourway</span></div>' +
      '<div class="ts-wheel"><svg viewBox="0 0 200 200"></svg>' +
        '<div class="ts-core"><b></b><em></em><i></i></div>' +
      '</div>' +
      '<div class="ts-foot"><span>悬停预览 · 点击确认</span><button class="ts-reset" type="button">恢复原状</button></div>' +
    '</div>';
  document.body.appendChild(wrap);

  var btn = wrap.querySelector('.ts-btn');
  var panel = wrap.querySelector('.ts-panel');
  var wheel = wrap.querySelector('.ts-wheel');
  var svg = wheel.querySelector('svg');
  var core = wrap.querySelector('.ts-core');
  var reset = wrap.querySelector('.ts-reset');
  var slices = [];

  function pt(r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
  }
  function fmt(p) { return p[0].toFixed(2) + ' ' + p[1].toFixed(2); }
  function band(rOuter, rInner, a0, a1) {
    var A = pt(rOuter, a0), B = pt(rOuter, a1), C = pt(rInner, a1), D = pt(rInner, a0);
    var large = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + fmt(A) + ' A' + rOuter + ' ' + rOuter + ' 0 ' + large + ' 1 ' + fmt(B) +
           ' L' + fmt(C) + ' A' + rInner + ' ' + rInner + ' 0 ' + large + ' 0 ' + fmt(D) + ' Z';
  }

  THEMES.forEach(function (t, i) {
    var a0 = i * 60 + 1.5, a1 = i * 60 + 58.5;
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'ts-slice');
    g.setAttribute('data-key', t.key);
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', t.name + '，' + t.en + (t.flag ? '（推荐）' : ''));
    g.setAttribute('aria-pressed', 'false');
    [[92, 76, t.chips[2]], [74, 58, t.chips[1]], [56, 42, t.chips[0]]].forEach(function (b) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', band(b[0], b[1], a0, a1));
      p.setAttribute('fill', b[2]);
      g.appendChild(p);
    });
    var mp = pt(97, (a0 + a1) / 2);
    var m = document.createElementNS(NS, 'circle');
    m.setAttribute('cx', mp[0].toFixed(2));
    m.setAttribute('cy', mp[1].toFixed(2));
    m.setAttribute('r', '3.2');
    m.setAttribute('class', 'ts-mark');
    g.appendChild(m);
    svg.appendChild(g);
    slices.push(g);
  });

  var confirmed = 'base';
  var preview = null;

  function find(key) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].key === key) return THEMES[i];
    return null;
  }
  function syncMeta(paper) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', paper);
  }
  function paint() {
    var key = preview || confirmed;
    var t = find(key) || THEMES[0];
    root.dataset.theme = key;
    syncMeta(t.paper);
    core.querySelector('b').textContent = t.name;
    core.querySelector('em').textContent = t.en;
    core.querySelector('i').textContent = preview ? '预览中' : '已选中';
    slices.forEach(function (g) {
      g.classList.toggle('is-preview', g.dataset.key === preview);
      g.classList.toggle('is-confirmed', g.dataset.key === confirmed);
      g.setAttribute('aria-pressed', g.dataset.key === confirmed ? 'true' : 'false');
    });
    btn.title = '网站配色：' + t.name + (preview ? '（预览中）' : '') + ' · 点击更换';
    btn.setAttribute('aria-label', '选择网站配色，当前为' + t.name);
  }
  function setPreview(key) { if (preview === key) return; preview = key; paint(); }
  function clearPreview() { if (preview !== null) { preview = null; paint(); } }
  function confirm(key) {
    if (!find(key)) return;
    confirmed = key;
    preview = null;
    try { localStorage.setItem(KEY, key); } catch (e) {}
    paint();
  }
  function resetAll() {
    confirmed = 'base';
    preview = null;
    try { localStorage.removeItem(KEY); } catch (e) {}
    paint();
  }
  function open() {
    wrap.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
  }
  function close() {
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    clearPreview();
  }

  slices.forEach(function (g) {
    var key = g.dataset.key;
    g.addEventListener('pointerenter', function () { setPreview(key); });
    g.addEventListener('focus', function () { setPreview(key); });
    g.addEventListener('click', function () { confirm(key); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); confirm(key); }
    });
  });
  wheel.addEventListener('pointerleave', clearPreview);
  wheel.addEventListener('focusout', function (e) {
    if (!wheel.contains(e.relatedTarget)) clearPreview();
  });
  btn.addEventListener('click', function () {
    wrap.classList.contains('open') ? close() : open();
  });
  reset.addEventListener('click', function () { resetAll(); close(); btn.focus(); });
  document.addEventListener('pointerdown', function (e) {
    if (wrap.classList.contains('open') && !wrap.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wrap.classList.contains('open')) { close(); btn.focus(); }
  });

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  confirmed = find(saved) ? saved : 'base';
  preview = null;
  paint();

  window.HillTokenTheme = {
    set: function (k) { confirm(k); },
    reset: resetAll,
    themes: THEMES.map(function (t) { return t.key; })
  };
})();
