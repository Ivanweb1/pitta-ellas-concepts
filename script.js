(function () {
  'use strict';

  var trigger = document.querySelector('.menu-button');
  var menu = document.querySelector('.mobile-menu');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', function () {
    var open = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.classList.toggle('is-open', open);
  });

  menu.addEventListener('click', function (event) {
    if (event.target.tagName !== 'A') return;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Открыть меню');
    menu.classList.remove('is-open');
  });

  document.querySelectorAll('.language button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.language button').forEach(function (item) {
        var active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });
}());
