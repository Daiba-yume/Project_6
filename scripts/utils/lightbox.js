var slideIndex = 0;

// Open the Modal
function openLightbox() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "block";

    modal.setAttribute("data-current-slide", slideIndex);
    showSlides(slideIndex);
    updateMediaName();
  } else {
    console.error("Modal element not found.");
  }
}

// Close the Modal
function closeLightbox() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "none";
    slideIndex = 0; // reinitialisation lors du close
  } else {
    console.error("Modal element not found.");
  }
}

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  openLightbox(n);
}

function showSlides() {
  const modal = document.getElementById("myModal");
  const slides = document.querySelectorAll(".mySlides");
  if (modal && slides.length > 0) {
    const currentSlideIndex =
      parseInt(modal.getAttribute("data-current-slide")) || 0;

    // Vérifie et ajuste l'index si nécessaire
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }

    // Cache toutes les slides
    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // Affiche la slide actuelle
    slides[slideIndex].style.display = "block";

    // Met à jour le nom du média actuellement affiché
    updateMediaName();

    // Met à jour l'attribut data-current-slide dans le modal
    modal.setAttribute("data-current-slide", slideIndex);
  } else {
    console.error("Modal or slides element not found.");
  }
}

function updateMediaName() {
  const slides = document.querySelectorAll(".mySlides");
  if (slideIndex >= 1 && slideIndex <= slides.length) {
    const mediaName = slides[slideIndex - 1].getAttribute("data-media-name");
    const mediaNameElement = document.querySelector(".media-name");
    if (mediaNameElement) {
      mediaNameElement.textContent = mediaName;
    }
  }
}
