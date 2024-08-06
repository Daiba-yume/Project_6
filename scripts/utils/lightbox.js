"use strict";

let slideIndex = 0; // Index de la slide actuelle

// Fonction pour ouvrir la lightbox et afficher la slide spécifiée
function openLightbox(id) {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "block";
    setSlideIndex(id);
    showSlides();
    document.addEventListener("keydown", handleKeyDown);

    // Avoir le focus sur la vidéo si elle est présente
    const currentSlide = document.querySelector(
      ".mySlides:not([style*='display: none']) video"
    );
    if (currentSlide) {
      currentSlide.focus();
    }
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
    document.addEventListener("keydown", handleKeyDown);
  } else {
    console.error("Modal element not found.");
  }
}

// Fonction pour naviguer entre les slides
function plusSlides(n) {
  slideIndex += n;
  showSlides();
}

function setSlideIndex(id) {
  const listSlides = document.querySelectorAll(".media-card");
  let pos = 0;
  listSlides.forEach((element) => {
    if (element.dataset.id == id) {
      slideIndex = pos;
    }
    pos++;
  });

  //slideIndex = index;
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

    // Avoir le focus sur la vidéo si elle est présente dans la slide actuelle
    const currentSlide = slides[slideIndex].querySelector("video");
    if (currentSlide) {
      currentSlide.focus();
    }
  } else {
    console.error("Modal or slides element not found.");
  }
}

//  Fonction pour la navigation au clavier
function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    plusSlides(-1);
  } else if (event.key === "ArrowRight") {
    plusSlides(1);
  } else if (event.key === "Escape") {
    closeLightbox();
  } else {
    // Ajout de la gestion des touches pour les vidéos
    const currentSlide = document.querySelector(
      ".mySlides:not([style*='display: none']) video"
    );
    if (currentSlide) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (currentSlide.paused) {
          currentSlide.play();
        } else {
          currentSlide.pause();
        }
      }
      if (event.key === "m") {
        event.preventDefault();
        currentSlide.muted = !currentSlide.muted;
      }
    }
  }
}
// Ecouteur d'event pour la fermeture de la lightbox
document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  } else {
    console.error("Close button not found.");
  }
});
