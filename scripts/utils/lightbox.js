let slideIndex = 0; // Index de la slide actuelle

// Fonction pour ouvrir la lightbox et afficher la slide spécifiée
function openLightbox(id) {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "block";
    setSlideIndex(id);
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
  } else {
    console.error("Modal or slides element not found.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  } else {
    console.error("Close button not found.");
  }
});
