import { mediaFactory, updateTotalLikes } from "../templates/media.js";

async function getPhotographers() {
  try {
    // Récupère les données depuis le fichier JSON des photographes
    const response = await fetch("./data/photographers.json");

    // Vérifie si la réponse est correcte
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse les données JSON
    const data = await response.json();

    // Vérifie que les données contiennent bien un tableau de photographes
    if (!Array.isArray(data.photographers)) {
      throw new Error("Expected an array of photographers.");
    }

    // Retourne les données
    return data;
  } catch (error) {
    // Log l'erreur en cas de problème lors de la récupération ou du parsing des données
    console.error("Error fetching or parsing photographers:", error);
    return [];
  }
}

function getSelectedPhotographerIdFromURL() {
  // Extrait les paramètres de l'URL
  const params = new URLSearchParams(window.location.search);

  // Retourne l'ID du photographe sélectionné
  return params.get("id");
}

async function filterPhotographerById() {
  try {
    // Données des photographes et des médias
    const { photographers, media } = await getPhotographers();

    // Récupération l'ID du photographe sélectionné depuis l'URL
    const selectedPhotographerId = getSelectedPhotographerIdFromURL();

    // Trouve le photographe correspondant à l'ID sélectionné
    const photographer = photographers.find(
      (element) => element.id == selectedPhotographerId
    );

    // Vérifie si le photographe a été trouvé
    if (!photographer) {
      console.error("Photographer not found.");
      return;
    }

    // Crée le modèle du photographe
    const photographerModel = photographerTemplate(photographer);

    // Génère l'en-tête de la page du photographe
    const headerPhotographer = photographerModel.getUserHeaderDom();
    document
      .querySelector(".photograph-header")
      .appendChild(headerPhotographer);

    // Filtre les médias du photographe et les affiche
    let filteredMedia = media
      .filter((item) => item.photographerId == selectedPhotographerId)
      .map((item) => ({ ...item, name: photographer.name }));

    displayPhotographerWorks(filteredMedia);

    // Ajoute un écouteur d'événement pour trier les médias
    document
      .querySelector("#sort-options")
      .addEventListener("change", function () {
        const sortValue = this.value;
        let sortedMedia;
        switch (sortValue) {
          case "popularity":
            sortedMedia = sortByPopularity(filteredMedia);
            break;
          case "date":
            sortedMedia = sortByDate(filteredMedia);
            break;
          case "title":
            sortedMedia = sortByTitle(filteredMedia);
            break;
          default:
            sortedMedia = filteredMedia;
        }
        displayPhotographerWorks(sortedMedia);
      });

    // Affiche le tarif journalier du photographe
    console.log("Photographer price:", photographer.price);
    document.querySelector(
      ".price-container"
    ).innerHTML = `<p>${photographer.price}€/jour</p>`;

    // Affiche le total des likes
    updateTotalLikes();
  } catch (error) {
    console.error("Error filtering photographer:", error);
  }
}

// Trie les médias par popularité (nombre de likes)
function sortByPopularity(media) {
  return media.sort((a, b) => b.likes - a.likes);
}

// Trie les médias par date
function sortByDate(media) {
  return media.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Trie les médias par titre
function sortByTitle(media) {
  return media.sort((a, b) => a.title.localeCompare(b.title));
}

// Affiche les médias du photographe
function displayPhotographerWorks(media) {
  const photographMedias = document.querySelector(".photograph-medias");
  const modalSlides = document.querySelector(".modalSlides");

  // Vérifiez que les éléments existent avant de les manipuler
  if (!photographMedias || !modalSlides) {
    console.error("Photograph medias or modal slides container not found.");
    return;
  }

  photographMedias.innerHTML = "";
  modalSlides.innerHTML = "";

  media.forEach((item) => {
    const mediaItem = mediaFactory(item);
    photographMedias.appendChild(mediaItem.getMediaCardDOM());

    const lightboxItem = mediaItem.getMediaLightbox();
    lightboxItem.classList.add("mySlides");
    modalSlides.appendChild(lightboxItem);

    console.log("create contenu modale");
  });

  updateTotalLikes();
}

// Exécute la fonction pour filtrer le photographe par ID
filterPhotographerById();
