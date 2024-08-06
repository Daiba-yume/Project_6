"use strict";

// Récupération des data du fichier JSON.

async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const photographers = await response.json();
  return photographers;
}

// Affichage du tableau des photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Initialisation du projet en récupérant les données des photographes
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
