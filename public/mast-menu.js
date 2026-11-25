/* HillToken · 移动端菜单 · 2026-11-25
 * 只在存在 #mast-toggle 时生效；桌面宽度下按钮不可见，脚本自动关闭。
 * 无依赖，全站引用。
 */
(function () {
  'use strict';

  var btn = document.getElementById('mast-toggle');
  var menu = document.getElementById('mast-menu');
  if (!btn || !menu) return;

  var open = false;
  var lastFocus = null;

  function apply(state) {
    open = state;
    document.body.classList.toggle('menu-open', state);
    btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    btn.setAttribute('aria-label', state ? '关闭导航菜单' : '打开导航菜单');
    menu.setAttribute('aria-hidden', state ? 'false' : 'true');
    if (state) {
      lastFocus = document.activeElement;
      var first = menu.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus({ preventScroll: true });
    }
  }

  btn.addEventListener('click', function () { apply(!open); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      apply(false);
    }
  });

  menu.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a) apply(false);
  });

  window.addEventListener('resize', function () {
    if (open && window.innerWidth > 900) apply(false);
  });
})();
