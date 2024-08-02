"use strict";

import { mediaFactory, updateTotalLikes } from "../templates/media.js";

window.filteredMedia = []; // Définir filteredMedia globalement

/**
 * Récupère les données des photographes depuis un fichier JSON.
 * Les données des photographes.
 */
export async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.photographers)) {
      throw new Error("Expected an array of photographers.");
    }
    return data;
  } catch (error) {
    console.error("Error fetching or parsing photographers:", error);
    return [];
  }
}

/**
 * Récupère l'ID du photographe sélectionné à partir de l'URL.
 */
export function getSelectedPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/**
 * Filtre les photographes par ID et affiche les informations du photographe et ses médias.
 */
export async function filterPhotographerById() {
  try {
    const { photographers, media } = await getPhotographers();
    const selectedPhotographerId = getSelectedPhotographerIdFromURL();
    const photographer = photographers.find(
      (element) => element.id == selectedPhotographerId
    );

    if (!photographer) {
      console.error("Photographer not found.");
      return;
    }

    const photographerModel = photographerTemplate(photographer);
    const headerPhotographer = photographerModel.getUserHeaderDom();
    document
      .querySelector(".photograph-header")
      .appendChild(headerPhotographer);

    window.filteredMedia = media
      .filter((item) => item.photographerId == selectedPhotographerId)
      .map((item) => ({ ...item, name: photographer.name }));

    displayPhotographerWorks(window.filteredMedia);

    document.querySelector(
      ".price-container"
    ).innerHTML = `<p>${photographer.price}€/jour</p>`;
    updateTotalLikes();
  } catch (error) {
    console.error("Error filtering photographer:", error);
  }
}

// Trie les médias par popularité (nombre de likes)
export function sortByPopularity(media) {
  return media.sort((a, b) => b.likes - a.likes);
}

// Trie les médias par date
export function sortByDate(media) {
  return media.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Trie les médias par titre
export function sortByTitle(media) {
  return media.sort((a, b) => a.title.localeCompare(b.title));
}

// Affiche les médias du photographe
export function displayPhotographerWorks(media) {
  const photographMedias = document.querySelector(".photograph-medias");
  const modalSlides = document.querySelector(".modalSlides");

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
