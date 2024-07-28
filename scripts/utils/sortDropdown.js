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
    if (!isOpen) {
      const allOptions = document.querySelectorAll(".sort-option");
      allOptions.forEach((element) => {
        if (
          element.textContent ==
          document.getElementById("selectedOption").textContent
        ) {
          element.style.display = "none";
        } else {
          element.style.display = "block";
        }
      });
    }
    sortIcon.classList.toggle("fa-angle-down", isOpen);
    sortIcon.classList.toggle("fa-angle-up", !isOpen);
  });

  sortOptions.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const sortValue = event.target.getAttribute("data-value");
      sortOptions.style.display = "none";
      sortIcon.classList.add("fa-angle-down");
      sortIcon.classList.remove("fa-angle-up");
      sortMedia(sortValue);
      document.getElementById("selectedOption").textContent =
        event.target.textContent;
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
