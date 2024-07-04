// Prend l'ID utilisé dans la search bar :
const params = new URLSearchParams(window.location.search);
const selectedArtist = params.get("id");
// Définition globale : photographer + photographerMedia
let photographer;
let photographerMedia = [];

// Photographes sélectionnés depuis le .JSON :
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const photographers = await response.json();
  return photographers;
}

// Filtre le photographe avec l'ID récupéré :
function filterPhotographerById(photographers) {
  // Reprend globale "photographer" pour match "photographers" avec ID sélectionné PUIS index[0] car 1 seul artiste.
  photographer = photographers.filter(
    (element) => element.id == selectedArtist
  )[0];
  // On envoie les données filtrées au Factory
  const photographerModel = photographerFactory(photographer);
  // Ces données passent ensuite vers la fonction getUserHeaderDOM()
  const page = photographerModel.getUserHeaderDOM();
  // Avant d'être assemblées vers la balise <main>
  const mainSection = document.getElementById("main");
  mainSection.appendChild(page);
}
