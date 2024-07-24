import {
  sortByPopularity,
  sortByDate,
  sortByTitle,
} from "../pages/photographer.js";
import { displayPhotographerWorks } from "../pages/photographer.js";

document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("sort-button");
  const sortOptions = document.getElementById("sort-options");
  const sortIcon = sortButton.querySelector("i");

  sortButton.addEventListener("click", function () {
    const isOpen = sortOptions.style.display === "block";
    sortOptions.style.display = isOpen ? "none" : "block";
    sortIcon.classList.toggle("fa-angle-down", isOpen);
    sortIcon.classList.toggle("fa-angle-up", !isOpen);
  });

  document.addEventListener("click", function (event) {
    if (
      !sortButton.contains(event.target) &&
      !sortOptions.contains(event.target)
    ) {
      sortOptions.style.display = "none";
      sortIcon.classList.add("fa-angle-down");
      sortIcon.classList.remove("fa-angle-up");
    }
  });

  sortOptions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const sortValue = event.target.getAttribute("data-value");
      sortOptions.style.display = "none";
      sortIcon.classList.add("fa-angle-down");
      sortIcon.classList.remove("fa-angle-up");
      sortMedia(sortValue);
    }
  });

  function sortMedia(sortValue) {
    let sortedMedia;
    switch (sortValue) {
      case "popularity":
        sortedMedia = sortByPopularity(window.filteredMedia);
        break;
      case "date":
        sortedMedia = sortByDate(window.filteredMedia);
        break;
      case "title":
        sortedMedia = sortByTitle(window.filteredMedia);
        break;
      default:
        sortedMedia = window.filteredMedia;
    }
    displayPhotographerWorks(sortedMedia);
  }
});
