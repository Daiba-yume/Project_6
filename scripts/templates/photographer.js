// Function qui génère un template de photographe à partir des data
function photographerTemplate(data) {
  // Extraction des données du photographe à partir de data
  const { name, portrait, id, tagline, city, country, price } = data;

  // Chemin de l'image du photographe
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Création de l'élément lien qui contiendra l'image et le nom
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Lien vers la page de ${name}`);
    link.classList.add("focus-outline"); // Ajoutez une classe pour le style de focus

    // Création de l'élément, qui contient les infos du photographe
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    // Création de l'élément photo profil
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

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

    // Création de l'élément, affiche le prix
    const pPrice = document.createElement("p");
    pPrice.textContent = `${price}€/jour`;
    pPrice.classList.add("price");

    // Ajout des éléments créés à article
    article.appendChild(link);
    article.appendChild(pLocation);
    article.appendChild(pTagline);
    article.appendChild(pPrice);

    return article;
  }

  function getUserHeaderDom() {
    // Création de la balise <section> pour la présentation
    const headerPhotograph = document.createElement("div");
    headerPhotograph.setAttribute("class", "headerPhotograph");

    const details = document.createElement("div");
    details.setAttribute("class", "photograph-intro");
    headerPhotograph.appendChild(details);

    // Création et insertion des balises pour Nom, Ville/Pays, Tagline
    const introName = document.createElement("h1"); // Utilisation de <h2> pour le nom
    introName.textContent = `${name}`;
    details.appendChild(introName);

    const introCity = document.createElement("h2"); // Utilisation de <p> pour Ville/Pays
    introCity.textContent = `${city}, ${country}`;
    details.appendChild(introCity);

    const introTagline = document.createElement("p"); // Utilisation de <p> pour la Tagline
    introTagline.textContent = `${tagline}`;
    details.appendChild(introTagline);

    const buttonContact = document.createElement("button");
    buttonContact.classList.add("contact_button");
    buttonContact.setAttribute("onclick", `displayModal('${name}')`);
    buttonContact.textContent = "Contactez-moi";
    headerPhotograph.appendChild(buttonContact);

    // Insertion de la balise <div> pour contenir la photo de profil
    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container"); // Utilisation de la classe "img-container"
    headerPhotograph.appendChild(imgContainer);

    // Création et insertion de l'élément <img> pour la photo de profil
    const introPicture = document.createElement("img");
    introPicture.setAttribute("class", "picture-profile"); // Utilisation de la classe "picture-profile"
    introPicture.setAttribute("src", `${picture}`);
    introPicture.setAttribute("alt", `${name}`);
    imgContainer.appendChild(introPicture);

    // Retourne l'élément .photograph-header modifié
    return headerPhotograph;
  }

  return { getUserCardDOM, getUserHeaderDom };
}
