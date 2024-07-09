function mediaFactory(data) {
  // Extraction des données
  const { title, name, image, video, likes } = data;
  const imageSource = `./SamplePhotos/${name.split(" ")[0]}/${image}`;
  const videoSource = `./SamplePhotos/${name.split(" ")[0]}/${video}`;
  console.log(name.split(" ")[0]);
  // Crée et retourne un élément de carte média
  function getMediaCardDOM() {
    // Création de la carte média
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media-card");

    // Création du conteneur de média
    const mediaContainer = document.createElement("a");
    mediaContainer.classList.add("media-container");
    mediaContainer.setAttribute("href", "#");

    // Ajout de l'image si elle existe
    if (image) {
      const mediaImage = document.createElement("img");
      mediaImage.classList.add("media");
      mediaImage.setAttribute("src", imageSource);
      mediaImage.setAttribute("alt", title);
      // Ajout d'un événement de clic pour l'image
      mediaImage.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const mediaModal = getMediaModalDOM(image);
        toggleCarroussel(mediaModal);
      });
      mediaImage.setAttribute("alt", `${title}`);
      mediaContainer.appendChild(mediaImage);
    }

    // Ajout de la vidéo si elle existe
    if (video) {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media");
      mediaVideo.setAttribute("src", videoSource);
      mediaVideo.setAttribute("type", "video/mp4");
      mediaVideo.controls = true;
      mediaVideo.setAttribute("alt", title);
      // Ajout d'un événement de clic pour la vidéo
      mediaVideo.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const mediaModal = getMediaModalDOM(video);
        toggleCarroussel(mediaModal);
      });
      mediaVideo.setAttribute("alt", `${title}`);
      mediaContainer.appendChild(mediaVideo);
    }

    // Ajout d'un texte visible ou d'un attribut aria-label au lien
    const mediaLinkText = document.createElement("span");
    mediaLinkText.classList.add("sr-only");
    mediaLinkText.textContent = `Voir le média: ${title}`;
    mediaContainer.appendChild(mediaLinkText);
    mediaContainer.setAttribute("aria-label", `Voir le média: ${title}`);

    // Création des informations sur le média
    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    // Ajout du titre du média
    const mediaTitle = document.createElement("h3");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = title;
    mediaInfo.appendChild(mediaTitle);

    // Ajout du nombre de likes
    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("likes");
    mediaLikes.textContent = likes;
    mediaInfo.appendChild(mediaLikes);

    // Ajout du conteneur et des informations à la carte média
    mediaCard.appendChild(mediaContainer);
    mediaCard.appendChild(mediaInfo);

    return mediaCard;
  }

  return { getMediaCardDOM };
}
