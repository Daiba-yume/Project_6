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
    mediaCard.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox();
    });

    // Création du conteneur de média
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");

    // Ajout de l'image si elle existe
    if (image) {
      const mediaImage = document.createElement("img");
      mediaImage.classList.add("media");
      mediaImage.setAttribute("src", imageSource);

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

  function getMediaLightbox() {
    const mySlides = document.createElement("div");
    mySlides.classList.add("mySlides");

    // Ajout de l'image si elle existe
    if (image) {
      const mediaImage = document.createElement("img");
      mediaImage.classList.add("media");
      mediaImage.setAttribute("src", imageSource);

      mediaImage.setAttribute("alt", `${title}`);
      mySlides.appendChild(mediaImage);
    }

    // Ajout de la vidéo si elle existe
    if (video) {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media");
      mediaVideo.setAttribute("src", videoSource);
      mediaVideo.setAttribute("type", "video/mp4");
      mediaVideo.controls = true;

      mediaVideo.setAttribute("alt", `${title}`);
      mySlides.appendChild(mediaVideo);
    }

    const captionContainer = document.createElement("div");
    captionContainer.classList.add("caption-container");

    const caption = document.createElement("p");
    caption.classList.add("caption");

    caption.textContent = title;
    captionContainer.appendChild(caption);
    mySlides.appendChild(captionContainer);

    return mySlides;
  }

  return { getMediaCardDOM, getMediaLightbox };
}
