// scripts/templates/media.js

function mediaFactory(data) {
  const { title, image, video, likes } = data;
  const imageSource = `./Sample Photos${image}`;
  const videoSource = `./Sample Photos${video}`;

  function getMediaCardDOM() {
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media-card");

    const mediaContainer = document.createElement("a");
    mediaContainer.classList.add("media-container");
    mediaContainer.setAttribute("href", "#");

    if (image) {
      const mediaImage = document.createElement("img");
      mediaImage.classList.add("media");
      mediaImage.setAttribute("src", imageSource);
      mediaImage.setAttribute("alt", title);
      mediaImage.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const mediaModal = getMediaModalDOM(image);
        toggleCarroussel(mediaModal);
      });
      mediaContainer.appendChild(mediaImage);
    }

    if (video) {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media");
      mediaVideo.setAttribute("src", videoSource);
      mediaVideo.setAttribute("type", "video/mp4");
      mediaVideo.controls = true;
      mediaVideo.setAttribute("alt", title);
      mediaVideo.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const mediaModal = getMediaModalDOM(video);
        toggleCarroussel(mediaModal);
      });
      mediaContainer.appendChild(mediaVideo);
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const mediaTitle = document.createElement("h3");
    mediaTitle.textContent = title;
    mediaInfo.appendChild(mediaTitle);

    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("likes");
    mediaLikes.textContent = likes;
    mediaInfo.appendChild(mediaLikes);

    mediaCard.appendChild(mediaContainer);
    mediaCard.appendChild(mediaInfo);

    return mediaCard;
  }

  return { getMediaCardDOM };
}
