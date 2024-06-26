const housesList = [
  {
    popupData: {
      imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      titleContent: "Elegantna Vila u Središtu Zagreba",
      descriptionContent:
        "Izvrsna vila smještena u živahnom centru Zagreba. Ovaj šarmantni dom ima prostrani vrt, moderne sadržaje i blizinu kulturnih znamenitosti.",
      linkValue: "#",
      surfaceArea: 76,
      price: 350000,
    },
    latlng: [45.81, 15.98],
    type: "house",
  },
  {
    popupData: {
      imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      titleContent: "Ugodna Kućica Blizu Zagrebačke Zelene Zone",
      descriptionContent:
        "Šarmantna kućica smještena blizu zelene zone Zagreba. Idealna za ljubitelje prirode, ova kuća nudi mirno okruženje s prekrasnim vrtom i lakim pristupom parkovima.",
      linkValue: "#",
      surfaceArea: 50,
      price: 220000,
    },
    latlng: [45.82, 15.92],
    type: "house",
  },
  {
    popupData: {
      imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      titleContent: "Luksuzni Obiteljski Dom u Zagrebačkom Predgrađu",
      descriptionContent:
        "Prekrasna obiteljska kuća smještena u mirnom predgrađu Zagreba. S velikom površinom, lijepo uređenim vrtom i vrhunskim sadržajima.",
      linkValue: "#",
      surfaceArea: 120,
      price: 450000,
    },
    latlng: [45.79, 16.05],
    type: "building",
  },
  {
    popupData: {
      imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
      titleContent: "Prostrana Moderan Stan u Središtu Zagreba",
      descriptionContent:
        "Elegantan stan smješten u srcu Zagreba. Ovaj moderan dom ima prostrane sobe, prekrasan pogled i blizinu kulturnih znamenitosti.",
      linkValue: "#",
      surfaceArea: 90,
      price: 320000,
    },
    latlng: [45.78, 15.94],
    type: "business",
  },
];

const zagrebLocation = {
  center: [45.81, 15.98],
  zoom: 11.25,
};

/*
  
  CODE
  
  */

const mapElement = document.getElementById("map");
const mapOptions = {
  ...zagrebLocation,
  setView: true,
  attributionControl: false,
  //   maxBounds: L.latLngBounds(L.latLng(51.105, 0.09), L.latLng(51.505, -0.09)),
};

// initialize the map on the "map" div with a given center and zoom
const map = L.map(mapElement, mapOptions);

// add an OpenStreetMap tile layer
const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

map.addLayer(tileLayer);

const renderMarkers = (housesList) => {
  housesList.forEach((house) => {
    const markerOptions = {
      icon: L.icon({
        iconUrl: `./images/${house.type}.png`,
        iconSize: [48, 72],
        iconAnchor: [24, 72],
        popupAnchor: [0, -72],
      }),
    };

    L.marker(house.latlng, markerOptions)
      .addTo(map)
      .bindPopup(createPopupHtml(house.popupData));
  });
};

renderMarkers(housesList);

// add a click event listener to the map
map.on("click", function (e) {
  console.log(e.latlng);
  console.log(map.getZoom());
});

// Form handling
const form = document.getElementById("filterHouses");

form.addEventListener("input", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  console.log(formData);

  const parsedFormData = {
    title: formData.get("title"),
    price: {
      min: parseInt(formData.get("priceMin")) || 0,
      max: parseInt(formData.get("priceMax")) || Infinity,
    },
    size: {
      min: parseInt(formData.get("sizeMin")) || 0,
      max: parseInt(formData.get("sizeMax")) || Infinity,
    },
    type: formData.get("type"),
  };
  console.log(parsedFormData);

  filteredHouses = housesList.filter((house) => {
    if (
      parsedFormData.title &&
      !house.popupData.titleContent.includes(parsedFormData.title)
    )
      return false;

    if (
      house.popupData.price < parsedFormData.price.min ||
      house.popupData.price > parsedFormData.price.max
    )
      return false;

    if (
      house.popupData.surfaceArea < parsedFormData.size.min ||
      house.popupData.surfaceArea > parsedFormData.size.max
    )
      return false;

    if (parsedFormData.type && house.type !== parsedFormData.type) return false;

    return true;
  });

  // Remove old markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  renderMarkers(filteredHouses);
});
