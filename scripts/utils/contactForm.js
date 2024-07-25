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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

let userPrenom = document.getElementById("user_prenom");
let userNom = document.getElementById("user_nom");
let userEmail = document.getElementById("user_email");
let userMessage = document.getElementById("user_message");

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(
      `Merci de m'avoir contacté,
        ${userPrenom.value} ${userNom.value},
        Vous trouverez davantage de renseignements à votre adresse email :
        ${userEmail.value},
        Et je prendrais en compte chaque élément de votre message :
        ${userMessage.value}
        Passez une agréable journée !`
    );

    alert("Votre message a été envoyé !");
    window.location.href = `./index.html`;
  });
