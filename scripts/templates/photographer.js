// Function qui génère un template de photographe à partir des data

function photographerTemplate(data) {
  //Extraction des données du Picturegraphe à partir de data
  const { name, portrait, id, tagline, city, country, price } = data;

  //chemin de l'image du photoegraphe
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Création de l'élément lien qui contiendra l'image et le nom
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Lien vers la page de ${name}`);
    link.classList.add("focus-outline"); // Ajoutez une classe pour le style de focus

    // Création de l'élément, qui contient les info du Picturegraphe
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    // Création de l'élément Picture profil
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

  function getUserHeaderDom() {
    // Sélection de l'élément avec la classe ".Photograph-header"
    const headerPhotograph = document.querySelector(".photograph-header");

    // Création de la balise <section> pour la présentation
    const introSection = document.createElement("section");
    introSection.setAttribute("class", "photograph-intro");

    // Insertion de la balise <section> dans ".Photograph-header"
    headerPicturegraph.appendChild(introSection);

    // Création et insertion des balises pour Nom, Ville/Pays, Tag
    const introName = document.createElement("h2"); // Utilisation de <h2> pour le nom
    introName.textContent = `${name}`;
    introSection.appendChild(introName);

    const introCity = document.createElement("p"); // Utilisation de <p> pour Ville/Pays
    introCity.textContent = `${city}, ${country}`;
    introSection.appendChild(introCity);

    const introTagline = document.createElement("p"); // Utilisation de <p> pour le Tag
    introTagline.textContent = `${tagline}`;
    introSection.appendChild(introTagline);

    // Insertion de la balise <div> pour contenir la photo de profil
    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container");
    headerPicturegraph.appendChild(imgContainer);

    // Création et insertion de l'élément <img> pour la photo de profil
    const introPicture = document.createElement("img");
    introPicture.setAttribute("class", "picture-profil");
    introPicture.setAttribute("src", `${picture}`);
    introPicture.setAttribute("alt", `${name}`);
    imgContainer.appendChild(introPicture);

    // Retourne l'élément .Photograph-header modifié
    return headerPhotograph;
  }

  return { getUserCardDOM, getUserHeaderDom };
}
