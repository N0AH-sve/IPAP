document.addEventListener('DOMContentLoaded', () => {

  /* ============ Menu mobile ============ */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============ Barre de progression du scroll ============ */
  const progressBar = document.getElementById('scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ============ Bouton retour en haut ============ */
  const backToTop = document.getElementById('back-to-top');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    } else {
      backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ Scrollspy : lien de nav actif ============ */
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isMatch);
    });
  };

  if (sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => spyObserver.observe(section));
  }

  /* ============ Révélation au scroll ============ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ============ Carrousel Histoires (vanilla) ============ */
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const carouselRoot = document.getElementById('testimonial-carousel');

  if (track && dotsWrap) {
    const slides = Array.from(track.children);
    let current = 0;
    let autoplayId = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Aller au témoignage ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

    function startAutoplay() {
      autoplayId = setInterval(next, 6000);
    }
    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (carouselRoot) {
      carouselRoot.addEventListener('mouseenter', stopAutoplay);
      carouselRoot.addEventListener('mouseleave', startAutoplay);
      carouselRoot.addEventListener('focusin', stopAutoplay);
      carouselRoot.addEventListener('focusout', startAutoplay);

      // Support tactile (swipe)
      let touchStartX = 0;
      carouselRoot.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      carouselRoot.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 40) {
          if (delta < 0) next(); else prev();
          restartAutoplay();
        }
      }, { passive: true });
    }

    render();
    startAutoplay();
  }

  /* ============ Ajustement : chaque section tient dans un écran ============ */
  const vpSections = Array.from(document.querySelectorAll('.vp-section'));

  if (vpSections.length) {
    // Une enveloppe par section : seul le contenu dans le flux est mis à
    // l'échelle (les flèches en position absolue restent à leur place).
    vpSections.forEach((section) => {
      const flow = Array.from(section.children).filter(
        (el) => getComputedStyle(el).position !== 'absolute'
      );
      if (!flow.length) return;
      const inner = document.createElement('div');
      inner.className = 'vp-inner';
      section.insertBefore(inner, flow[0]);
      flow.forEach((el) => inner.appendChild(el));
    });

    document.body.classList.add('fit-ready');

    const fitSection = (section) => {
      const inner = section.querySelector(':scope > .vp-inner');
      if (!inner) return;

      const cs = getComputedStyle(section);
      // 1px de marge : les hauteurs mesurées sont arrondies au pixel.
      const avail = section.clientHeight
        - parseFloat(cs.paddingTop)
        - parseFloat(cs.paddingBottom)
        - 1;
      const baseWidth = section.clientWidth
        - parseFloat(cs.paddingLeft)
        - parseFloat(cs.paddingRight);
      if (avail <= 0 || baseWidth <= 0) return;

      const reset = () => {
        inner.style.width = '';
        inner.style.transform = 'none';
        section.removeAttribute('data-fit-scale');
      };

      // Hauteur rendue pour une échelle donnée. On élargit l'enveloppe de
      // 1/échelle avant de la réduire : la largeur visible reste celle de
      // la section, le texte se réenroule, et l'échelle nécessaire reste
      // la plus généreuse possible.
      const renderedHeight = (scale) => {
        inner.style.width = (baseWidth / scale) + 'px';
        return inner.scrollHeight * scale;
      };

      inner.style.transform = 'none';

      if (renderedHeight(1) <= avail) {
        reset();
        return;
      }

      // La hauteur rendue croît avec l'échelle : dichotomie sur la plus
      // grande échelle qui tient encore.
      let lo = 0.2;
      let hi = 1;
      for (let i = 0; i < 7; i += 1) {
        const mid = (lo + hi) / 2;
        if (renderedHeight(mid) <= avail) lo = mid;
        else hi = mid;
      }

      // Passe de sécurité : à largeur figée, réduire l'échelle réduit
      // strictement la hauteur rendue. Le résultat tient donc toujours.
      inner.style.width = (baseWidth / lo) + 'px';
      const natural = inner.scrollHeight;
      const scale = natural ? Math.min(lo, avail / natural) : lo;

      inner.style.transform = 'scale(' + scale + ')';
      section.setAttribute('data-fit-scale', scale.toFixed(3));
    };

    const fitAll = () => vpSections.forEach(fitSection);

    // Débounce par timer plutôt que requestAnimationFrame : les frames ne
    // sont pas planifiées quand l'onglet est en arrière-plan.
    let fitTimer = null;
    const scheduleFit = () => {
      if (fitTimer) clearTimeout(fitTimer);
      fitTimer = setTimeout(() => {
        fitTimer = null;
        fitAll();
      }, 60);
    };

    fitAll();

    // Les images en lazy-load et les polices web changent la hauteur
    // naturelle après le premier calcul : on remesure à chaque arrivée.
    document.querySelectorAll('.vp-section img').forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', scheduleFit, { once: true });
        img.addEventListener('error', scheduleFit, { once: true });
      }
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleFit);
    }
    window.addEventListener('load', scheduleFit);
    window.addEventListener('resize', scheduleFit);
    window.addEventListener('orientationchange', scheduleFit);
  }

});
