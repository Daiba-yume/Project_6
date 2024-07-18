export function mediaFactory(data) {
  // Déstructuration des données pour obtenir les propriétés nécessaires
  const { id, title, name, image, video, likes } = data;

  // Construction des chemins d'accès aux images et vidéos
  const imageSource = `./SamplePhotos/${name.split(" ")[0]}/${image}`;
  const videoSource = `./SamplePhotos/${name.split(" ")[0]}/${video}`;

  // Set pour suivre les médias likés
  const likedMedia = new Set();

  // Fonction pour créer et retourner un élément DOM pour la carte média
  function getMediaCardDOM() {
    // Création de la carte média
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media-card");
    mediaCard.setAttribute("data-media-id", id);

    // Création du conteneur de médi
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

    // Création des informations sur le média
    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    // Ajout du titre du média
    const mediaTitle = document.createElement("h3");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = title;
    mediaInfo.appendChild(mediaTitle);

    // LIKES

    // Création du conteneur de like
    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");

    // Création du bouton de like
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.setAttribute("aria-label", "Like");
    likeButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    likeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      handleLikeClick(id);
    });

    // Affichage du nombre de likes
    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    likeCount.textContent = likes;

    // Ajout du bouton et du compteur de like au conteneur de like
    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(likeButton);

    // Ajout du conteneur de like aux informations sur le média
    mediaInfo.appendChild(likeContainer);

    // Ajout du conteneur de média et des informations sur le média à la carte média
    mediaCard.appendChild(mediaContainer);
    mediaCard.appendChild(mediaInfo);

    return mediaCard;
  }

  // Fonction pour créer et retourner un élément DOM pour la lightbox
  function getMediaLightbox() {
    // Création du conteneur de slides
    const mySlides = document.createElement("div");
    mySlides.classList.add("mySlides");

    // Ajout de l'image à la lightbox si elle existe
    if (image) {
      const mediaImage = document.createElement("img");
      mediaImage.classList.add("media");
      mediaImage.setAttribute("src", imageSource);
      mediaImage.setAttribute("alt", `${title}`);
      mySlides.appendChild(mediaImage);
    }

    // Ajout de la vidéo à la lightbox si elle existe
    if (video) {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media");
      mediaVideo.setAttribute("src", videoSource);
      mediaVideo.setAttribute("type", "video/mp4");
      mediaVideo.controls = true;
      mediaVideo.setAttribute("alt", `${title}`);
      mySlides.appendChild(mediaVideo);
    }

    // Création du conteneur de légende
    const captionContainer = document.createElement("div");
    captionContainer.classList.add("caption-container");

    // Ajout de la légende
    const caption = document.createElement("p");
    caption.classList.add("caption");
    caption.textContent = title;
    captionContainer.appendChild(caption);

    // Ajout du conteneur de légende aux slides
    mySlides.appendChild(captionContainer);

    return mySlides;
  }

  // BUTTON LIKE

  // Fonction pour gérer le clic sur le bouton de like
  function handleLikeClick(mediaId) {
    // Vérification si le média est déjà liké
    if (likedMedia.has(mediaId)) {
      alert("Vous avez déjà liké ce média.");
      return;
    }

    // Ajout du média à l'ensemble des médias likés
    likedMedia.add(mediaId);

    // Sélection de l'élément DOM correspondant au média
    const mediaElement = document.querySelector(
      `.media-card[data-media-id="${mediaId}"]`
    );

    // Mise à jour du compteur de likes si l'élément existe
    if (mediaElement) {
      const likeCountElement = mediaElement.querySelector(".like-count");
      let likes = parseInt(likeCountElement.textContent);
      likes++;
      likeCountElement.textContent = likes;
      updateTotalLikes();
    }
  }

  return {
    getMediaCardDOM,
    getMediaLightbox,
    handleLikeClick,
    updateTotalLikes,
  };
}

// UPDATE LIKES AND TOTALLIKES
// Fonction pour mettre à jour le total des likes

export function updateTotalLikes() {
  console.log("Updating total likes...");
  const photographerLikes = document.querySelector(".photographer-likes");
  if (photographerLikes) {
    const totalLikes = calculateTotalLikes();
    console.log("Total likes:", totalLikes);
    photographerLikes.innerHTML = `<p>${totalLikes} <i class="fa-solid fa-heart"></i></p>`;
  }
}

// Fonction pour calculer le total des likes
function calculateTotalLikes() {
  const mediaLikesElements = document.querySelectorAll(".like-count");
  let totalLikes = 0;
  mediaLikesElements.forEach((element) => {
    totalLikes += parseInt(element.textContent);
  });
  return totalLikes;
}
