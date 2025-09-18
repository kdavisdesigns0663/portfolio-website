// scripts.js — unified mobile menu + smooth scrolling
(function ($) {
  'use strict';

  console.log('Hello!');

  const $win     = $(window);
  const $doc     = $(document);
  const $header  = $('header');
  const $navWrap = $('#myNavtoggle');
  const $menu    = $navWrap.find('nav > ul');
  const $links   = $menu.find('li:not(:last-child)');

  const isMobile = () => window.matchMedia('(max-width: 639px)').matches;

  function openMenu() {
    if ($navWrap.hasClass('responsive')) return;
    $navWrap.addClass('responsive');
    $links.stop(true, true).hide().slideDown(220);
  }

  function closeMenu() {
    $links.stop(true, true).slideUp(180);
    $links.promise().done(function () {
      $navWrap.removeClass('responsive');
      $links.css('display', '');
    });
  }

  function menuToggle() {
    if (!isMobile()) return;
    $navWrap.hasClass('responsive') ? closeMenu() : openMenu();
  }

  window.menuToggle = menuToggle;

  $doc.on('click', 'a[href^="#"]', function (e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      const $target = $(href);
      if ($target.length) {
        e.preventDefault();
        const headerH  = $header.outerHeight() || 0;
        const targetY  = Math.max(0, $target.offset().top - headerH - 8);
        $('html, body').stop(true).animate({ scrollTop: targetY }, 500);
      }
    }
    if (isMobile() && $navWrap.hasClass('responsive')) {
      closeMenu();
    }
  });
  $win.on('resize', function () {
    if (!isMobile()) {
      $navWrap.removeClass('responsive');
      $links.stop(true, true).attr('style', '');
    }
  });

})(jQuery);

function isMobile() {
  return window.matchMedia("(max-width: 639px)").matches;
}

function menuToggle() {
  if (!isMobile()) return;
  var x = document.getElementById("myNavtoggle");
  if (x.className === "navtoggle") {
    x.className += " responsive";
  } else {
    x.className = "navtoggle";
  }
}
$(function () {
  $(document).on("click", "#myNavtoggle nav a:not(.icon)", function () {
    if (isMobile()) {
      document.getElementById("myNavtoggle").className = "navtoggle";
    }
  });
  $(document).on("click", 'a[href^="#"]', function (e) {
    var href = this.getAttribute("href");
    if (!href || href === "#") return;

    if (this.pathname !== location.pathname || this.hostname !== location.hostname) return;

    var headerH = $("header").outerHeight() || 0;
    var targetTop;

    if (href === "#top") {
      targetTop = 0;
    } else {
      var $t = $(href);
      if (!$t.length) return;
      targetTop = Math.max(0, $t.offset().top - headerH);
    }

    e.preventDefault();
    $("html, body").stop(true).animate({ scrollTop: targetTop }, 500);
  });
});
