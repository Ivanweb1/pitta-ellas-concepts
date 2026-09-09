(function () {
  'use strict';

  var trigger = document.querySelector('.menu-button');
  var menu = document.querySelector('.mobile-menu');
  if (trigger && menu) {
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
  }

  document.querySelectorAll('.language button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.language button').forEach(function (item) {
        var active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var activeSlide = 0;

  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(function () {
      slides[activeSlide].classList.remove('is-active');
      slides[activeSlide].setAttribute('aria-hidden', 'true');

      activeSlide = (activeSlide + 1) % slides.length;
      slides[activeSlide].classList.add('is-active');
      slides[activeSlide].setAttribute('aria-hidden', 'false');
    }, 6000);
  }
}());
