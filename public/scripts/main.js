// Menu burger toggle - DOIT être en premier pour éviter les erreurs
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navbarMenu = document.getElementById('navbarMenu');
  const closeBtn = document.getElementById('closeMenu');

  if (burger && navbarMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
      document.body.style.overflow = navbarMenu.classList.contains('is-active') ? 'hidden' : '';
    });

    // Bouton de fermeture
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        burger.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    }

    // Fermer le menu quand on clique sur un lien
    const navbarItems = navbarMenu.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
      item.addEventListener('click', () => {
        burger.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !navbarMenu.contains(e.target)) {
        burger.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  }
});


// Gestion des histoires partagées
const stories = [
  `Après mon divorce, je me suis retrouvée à la tête d’un patrimoine et de revenus conséquents, mais dans un moment de grande fragilité personnelle. Je ne savais pas comment gérer ni quels choix faire. Grâce à l’écoute et à l’accompagnement d'Nathalie Mouillet, j’ai appris à comprendre mon patrimoine, à ajuster mon train de vie et à envisager l’avenir sereinement.
  Aujourd’hui, je sais que mes bases sont solides pour construire ma sécurité sur le long terme.
   <br><span class="author">Sylvie, 55 ans</span>`,
  
  `Depuis plusieurs années, Alexandra Santerre m’accompagne dans la gestion de mon patrimoine. Mais, peu à peu, son rôle a dépassé le cadre strictement financier : n’ayant ni enfants ni famille proche, j’ai trouvé un véritable soutien, aussi bien pour mes choix patrimoniaux que pour des aspects concrets de mon cadre de vie. C’est une présence de confiance sur laquelle je peux m’appuyer au quotidien.
   <br><span class="author">Honorine, 82 ans</span>`,
  
  `Nous voulions préparer l’avenir, mais sans savoir par où commencer. Nathalie Mouillet nous a aidés à rédiger un mandat de protection future entièrement adapté à notre situation et à organiser notre patrimoine. Des outils simples ont été mis en place pour que nos mandataires puissent prendre le relais le moment venu. Aujourd’hui, nous sommes rassurés : tout a été pensé pour que nos volontés soient respectées.
   <br><span class="author">Jean-Paul et Martine</span>`
];

let index = 0;
const storyElement = document.getElementById("story");

function showStory(i) {
  storyElement.innerHTML = `<p>${stories[i]}</p>`;
}

function prevStory() {
  index = (index - 1 + stories.length) % stories.length;
  showStory(index);
}

function nextStory() {
  index = (index + 1) % stories.length;
  showStory(index);
}

// Gestion des popups pour la section enjeux
document.addEventListener('DOMContentLoaded', function() {
  const points = document.querySelectorAll('.point[data-index]');
  const popups = document.querySelectorAll('.popup-card');
  
  let activePopup = null;
  
  points.forEach(point => {
    point.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      const popup = document.getElementById(`popup-${index}`);
      
      // Désactiver l'ancien popup actif
      if (activePopup && activePopup !== popup) {
        activePopup.classList.remove('active');
      }
      
      // Toggle le popup actuel
      if (popup.classList.contains('active')) {
        popup.classList.remove('active');
        activePopup = null;
      } else {
        popup.classList.add('active');
        activePopup = popup;
      }
    });
  });
  
  // Fermer le popup en cliquant en dehors
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.point') && !e.target.closest('.popup-card')) {
      if (activePopup) {
        activePopup.classList.remove('active');
        activePopup = null;
      }
    }
  });
});


// Animation fluide des points de la timeline
document.addEventListener('DOMContentLoaded', function() {
  const points = document.querySelectorAll('.timeline-container .point');
  
  points.forEach((point, index) => {
    // Récupérer les positions initiales depuis le CSS
    const rect = point.getBoundingClientRect();
    const container = point.parentElement.getBoundingClientRect();
    
    // Extraire le left en % depuis le CSS
    const computedStyle = window.getComputedStyle(point);
    const leftPercent = computedStyle.left;
    const topPx = parseFloat(computedStyle.top);
    
    // Stocker les positions de base
    point.dataset.baseLeft = leftPercent;
    point.dataset.baseTop = topPx;
    
    // Paramètres d'animation
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    
    const maxOffset = 30; // Pixels maximum de déplacement
    const smoothness = 0.05; // Plus petit = plus lisse (0.01 à 0.1)
    
    // Générer de nouvelles cibles aléatoires
    function generateNewTarget() {
      targetOffsetX = (Math.random() - 0.5) * maxOffset * 2;
      targetOffsetY = (Math.random() - 0.5) * maxOffset * 2;
      
      // Programmer la prochaine cible
      setTimeout(generateNewTarget, 2000 + Math.random() * 3000);
    }
    
    // Animation frame par frame
    function animate() {
      // Interpolation douce vers la cible
      currentOffsetX += (targetOffsetX - currentOffsetX) * smoothness;
      currentOffsetY += (targetOffsetY - currentOffsetY) * smoothness;
      
      // Appliquer le transform sans toucher au translate de centrage
      point.style.transform = `translate(-50%, -50%) translate(${currentOffsetX}px, ${currentOffsetY}px)`;
      
      requestAnimationFrame(animate);
    }
    
    // Démarrer avec un délai aléatoire pour chaque point
    setTimeout(() => {
      generateNewTarget();
      animate();
    }, Math.random() * 1000);
  });
});








     let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;
        let autoPlayInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                indicators[i].classList.remove('active');
            });

            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            } else if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            
            showSlide(currentSlide);
            resetAutoPlay();
        }

        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoPlay();
        }

        function autoPlay() {
            changeSlide(1);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(autoPlay, 12000);
        }

        // Start autoplay
        autoPlayInterval = setInterval(autoPlay, 12000);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                changeSlide(1);
            }
            if (touchEndX > touchStartX + 50) {
                changeSlide(-1);
            }
        }


//fermer menu

const closeBtn = document.getElementById('closeMenu');

closeBtn.addEventListener('click', function() {
  burger.classList.remove('is-active');
  menu.classList.remove('is-active');
  document.body.style.overflow = '';
});