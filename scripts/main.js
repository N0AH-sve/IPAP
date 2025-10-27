// Menu burger toggle - DOIT être en premier pour éviter les erreurs
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navbarMenu = document.getElementById('navbarMenu');

  if (burger && navbarMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    });

    // Fermer le menu quand on clique sur un lien
    const navbarItems = navbarMenu.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
      item.addEventListener('click', () => {
        burger.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
      });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !navbarMenu.contains(e.target)) {
        burger.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
      }
    });
  }
});

// Gestion des histoires partagées
const stories = [
  `"J'ai voyagé en Asie pendant 6 mois et découvert une culture incroyable." - Alice`,
  `"J'ai ouvert mon restaurant après 10 ans de rêve. J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve.J'ai ouvert mon restaurant après 10 ans de rêve." - Karim`,
  `"J'ai appris à coder et trouvé un nouveau métier." - Sophie`
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
    
    const maxOffset = 6; // Pixels maximum de déplacement
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
