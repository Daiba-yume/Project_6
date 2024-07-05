// scripts/pages/photographer.js

async function getPhotographers() {
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

function getSelectedPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function filterPhotographerById() {
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
    const page = photographerModel.getUserHeaderDom();

    if (page) {
      const mainSection = document.getElementById("main");
      mainSection.appendChild(page);

      // Affichage des médias du photographe
      const mediaSection = document.createElement("div");
      mediaSection.classList.add("media-section");
      mainSection.appendChild(mediaSection);

      media
        .filter((item) => item.photographerId == selectedPhotographerId)
        .forEach((item) => {
          const mediaItem = mediaFactory(item);
          mediaSection.appendChild(mediaItem.getMediaCardDOM());
        });

      // Ajout du tarif journalier
      const priceContainer = document.createElement("div");
      priceContainer.classList.add("price-container");
      priceContainer.innerHTML = `<p>Tarif journalier: ${photographer.price}€/jour</p>`;
      mainSection.appendChild(priceContainer);
    } else {
      console.error("Failed to get header DOM.");
    }
  } catch (error) {
    console.error("Error filtering photographer:", error);
  }
}

filterPhotographerById();
