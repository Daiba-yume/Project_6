"use strict";

// Affiche la modal de contact
function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  const photographerNameElement = document.getElementById("photographer-name");
  if (photographerNameElement) {
    photographerNameElement.textContent = photographerName;
  }
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("tabindex", "-1");
  modal.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("tabindex");
}

// Gestionnaire de soumission du formulaire
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const closeButton = document.querySelector("img[alt='Fermer'");

  // Vérifie que tous les champs existent
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const userPrenom = document.getElementById("first-name");
      const userNom = document.getElementById("last-name");
      const userEmail = document.getElementById("email");
      const userMessage = document.getElementById("message");

      // Assurez-vous que tous les éléments existent
      if (userPrenom && userNom && userEmail && userMessage) {
        if (
          userPrenom.value.trim() === "" ||
          userNom.value.trim() === "" ||
          userEmail.value.trim() === "" ||
          userMessage.value.trim() === ""
        ) {
          alert(
            "Veuillez remplir tous les champs avant de soumettre le formulaire."
          );
        } else {
          console.log(
            `Merci de m'avoir contacté,
          ${userPrenom.value} ${userNom.value},
          Vous trouverez davantage de renseignements à votre adresse email :
          ${userEmail.value},
          Et je prendrais en compte chaque élément de votre message :
          ${userMessage.value}
          Passez une agréable journée !`
          );

          // Alerte de confirmation
          alert("Votre message a été envoyé avec succès !");
          form.reset();
          closeModal();
        }
      } else {
        console.error(
          "Tous les éléments du formulaire ne sont pas disponibles."
        );
      }
    });

    // Gérer la navigation au clavier
    const focusableElements = form.querySelectorAll("input, textarea, button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault();
        lastElement.focus();
      }
    });

    lastElement.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        firstElement.focus();
      }
    });

    // Ajouter un écouteur global pour fermer la modal avec Échap
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    // Vérifie que le bouton de fermeture existe
    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    } else {
      console.error("Le bouton de fermeture n'a pas été trouvé.");
    }
  } else {
    console.error("Le formulaire n'a pas été trouvé.");
  }
});
