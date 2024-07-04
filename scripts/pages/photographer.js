// Récupère les données des photographes
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Vérifie que les photographes sont bien un tableau dans data.photographers
    if (!Array.isArray(data.photographers)) {
      throw new Error("Expected an array of photographers.");
    }

    return data.photographers;
  } catch (error) {
    console.error("Error fetching or parsing photographers:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

// Filtrer le photographe par ID et afficher le header
async function filterPhotographerById() {
  try {
    const photographers = await getPhotographers();

    const selectedPhotographerId = getSelectedPhotographerIdFromURL();
    const photographer = photographers.find(
      (element) => element.id == selectedPhotographerId
    );

    if (!photographer) {
      console.error("Photographer not found.");
      return;
    }

    const photographerModel = photographerTemplate(photographer);
    const page = photographerModel.getUserHeaderDom();

    if (page) {
      const mainSection = document.getElementById("main");
      mainSection.appendChild(page);
    } else {
      console.error("Failed to get header DOM.");
    }
  } catch (error) {
    console.error("Error filtering photographer:", error);
  }
}

// Fonction utilitaire pour récupérer l'ID du photographe depuis l'URL
function getSelectedPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Appel de la fonction pour filtrer et afficher le photographe
filterPhotographerById();
