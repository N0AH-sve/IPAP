document.addEventListener('DOMContentLoaded', () => {
  // Menu Burger
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = 'navMenu';
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // Carrousel Histoires
  if (typeof bulmaCarousel !== 'undefined') {
    bulmaCarousel.attach('#carousel-demo', {
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
    });
  }
});

