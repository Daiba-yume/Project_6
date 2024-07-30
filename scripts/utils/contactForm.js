// Affiche la modal de contact
function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  const photographerNameElement = document.getElementById("photographer-name");
  if (photographerNameElement) {
    photographerNameElement.textContent = photographerName;
  }
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Gestionnaire de soumission du formulaire
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

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
        console.log(
          `Merci de m'avoir contacté,
          ${userPrenom.value} ${userNom.value},
          Vous trouverez davantage de renseignements à votre adresse email :
          ${userEmail.value},
          Et je prendrais en compte chaque élément de votre message :
          ${userMessage.value}
          Passez une agréable journée !`
        );

        // Redirection home
        window.location.href = `./index.html`;

        // Alerte de confirmation
        alert("Votre message a été envoyé avec succès !");
      } else {
        console.error(
          "Tous les éléments du formulaire ne sont pas disponibles."
        );
      }
    });
  } else {
    console.error("Le formulaire n'a pas été trouvé.");
  }
});
