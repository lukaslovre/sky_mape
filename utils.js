function createPopupHtml({
  imgUrl,
  titleContent,
  descriptionContent,
  linkValue,
  price,
  surfaceArea,
}) {
  const img = document.createElement("img");
  img.src = imgUrl;

  const title = document.createElement("h3");
  title.textContent = titleContent;

  const description = document.createElement("p");
  description.textContent = descriptionContent;

  const priceElement = document.createElement("p");
  priceElement.classList.add("price");
  priceElement.textContent = `€ ${price}. Površina: ${surfaceArea} m2.`;

  const link = document.createElement("a");
  link.href = linkValue;
  link.textContent = "More info >";

  const container = document.createElement("div");
  container.classList.add("poput-content-personal-container");

  container.appendChild(img);
  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(priceElement);
  container.appendChild(link);

  return container;
}
