// Function qui génère un template de photographe à partir des data

function photographerTemplate(data) {
  //Extraction des données du photographe à partir de data
  const { name, portrait, id, tagline, city, country, price } = data;

  //chemin de l'image du photographe
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Création de l'élément, qui contient les info du photographe
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    // Création de l'élément lien qui contiendra l'image et le nom
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Lien vers la page de ${name}`);

    // Création de l'élément,
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    // Création de l'élément, affiche le nom
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Ajout de l'image et du nom dans le lien
    link.appendChild(img);
    link.appendChild(h2);

    // Création de l'élément, affiche la tagline
    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;
    pTagline.classList.add("tagline"); // ajout class pour le style

    // Création de l'élément, affiche la ville
    const pLocation = document.createElement("p");
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add("location");

    // Création de l'élément,affiche le prix
    const pPrice = document.createElement("p");
    pPrice.textContent = `${price}€/jour`;
    pPrice.classList.add("price");

    // ajout des élément crées à article
    article.appendChild(link);
    article.appendChild(pLocation);
    article.appendChild(pTagline);
    article.appendChild(pPrice);

    return article;
  }

  function getUserHeaderDom() {}

  return { getUserCardDOM, getUserHeaderDom };
}
