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

  document.querySelectorAll('.product-card__link[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var track = document.querySelector('.hero__track');
  var previous = document.querySelector('.slider-arrow--prev');
  var next = document.querySelector('.slider-arrow--next');
  var activeSlide = 0;
  var autoplay;

  function showSlide(index) {
    slides[activeSlide].classList.remove('is-active');
    slides[activeSlide].setAttribute('aria-hidden', 'true');
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = 'translate3d(-' + (activeSlide * 100) + '%, 0, 0)';
    slides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === activeSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
  }

  function startAutoplay() {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(function () {
      showSlide(activeSlide + 1);
    }, 6000);
  }

  if (slides.length > 1 && track) {
    if (previous) {
      previous.addEventListener('click', function () {
        showSlide(activeSlide - 1);
        startAutoplay();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        showSlide(activeSlide + 1);
        startAutoplay();
      });
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAutoplay();
    } else {
      slides[activeSlide].classList.add('is-active');
    }
  }
}());
