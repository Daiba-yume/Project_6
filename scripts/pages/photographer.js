// Prend l'ID utilisé dans la search bar :
const params = new URLSearchParams(window.location.search);
const selectedPhotographer = params.get("id");

let photographer;

// Photographes sélectionnés depuis les datas:
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const photographers = await response.json();
  return photographers;
}

// Filtre le photographe avec l'ID récupéré :
function filterPhotographerById(photographers) {
  // Reprend globale "photographer" pour match "photographers" avec ID sélectionné PUIS index[0] car 1 seul artiste.
  photographer = photographers.filter(
    (element) => element.id == selectedPhotographer
  )[0];
  // On envoie les données filtrées au Factory
  const photographerModel = photographerTemplate(photographer);
  // Ces données passent ensuite vers la fonction getUserHeaderDOM()
  const page = photographerModel.getUserHeaderDOM();
  // Avant d'être assemblées vers la balise <main>
  const mainSection = document.getElementById("main");
  mainSection.appendChild(page);
}
