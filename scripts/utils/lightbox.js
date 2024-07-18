let slideIndex = 0; // Index de la slide actuelle

// Fonction pour ouvrir la lightbox et afficher la slide spécifiée
function openLightbox() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "block";
    showSlides();
  } else {
    console.error("Modal element not found.");
  }
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "none";
    slideIndex = 0; // Réinitialisation de l'index de la slide
  } else {
    console.error("Modal element not found.");
  }
}

// Fonction pour naviguer entre les slides
function plusSlides(n) {
  slideIndex += n;
  showSlides();
}

// Fonction pour afficher la slide actuelle
function showSlides() {
  const modal = document.getElementById("myModal");
  const slides = document.querySelectorAll(".mySlides");
  if (modal && slides.length > 0) {
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    slides.forEach((slide) => {
      slide.style.display = "none";
    });
    slides[slideIndex].style.display = "block";
  } else {
    console.error("Modal or slides element not found.");
  }
}

// Ouvrir la lightbox au clic sur un média
document.addEventListener("DOMContentLoaded", function () {
  const mediaCards = document.querySelectorAll(".media-card");
  mediaCards.forEach((card, index) => {
    card.addEventListener("click", function () {
      slideIndex = index;
      openLightbox();
    });
  });
});
