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
    // Obtient les données des photographes et des médias
    const { photographers, media } = await getPhotographers();

    // Récupère l'ID du photographe sélectionné depuis l'URL
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
    const page = photographerModel.getUserHeaderDom();

    // Vérifie si l'en-tête a été générée correctement
    if (page) {
      const mainSection = document.getElementById("main");

      // Ajoute l'en-tête à la section principale de la page
      mainSection.appendChild(page);

      // Crée une section pour les médias du photographe
      const mediaSection = document.createElement("div");
      mediaSection.classList.add("media-section");

      // Ajoute la section des médias à la section principale
      mainSection.appendChild(mediaSection);

      // Filtre les médias par ID du photographe et les ajoute à la section des médias
      media
        .filter((item) => item.photographerId == selectedPhotographerId)
        .forEach((item) => {
          const mediaItem = mediaFactory(item);
          mediaSection.appendChild(mediaItem.getMediaCardDOM());
        });

      // Crée un conteneur pour afficher le tarif journalier du photographe
      const priceContainer = document.createElement("div");
      priceContainer.classList.add("price-container");
      priceContainer.innerHTML = `<p>Tarif journalier: ${photographer.price}€/jour</p>`;

      // Ajoute le conteneur de tarif journalier à la section principale
      mainSection.appendChild(priceContainer);
    } else {
      // Log une erreur si l'en-tête n'a pas pu être générée
      console.error("Failed to get header DOM.");
    }
  } catch (error) {
    // Log l'erreur en cas de problème lors du filtrage du photographe
    console.error("Error filtering photographer:", error);
  }
}

// Exécute la fonction pour filtrer le photographe par ID
filterPhotographerById();
