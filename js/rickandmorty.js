const API_ALBUM = "https://rickandmortyapi.com/api/character";

// Objeto de traducción para el estado
const statusTranslations = {
    Alive: "Vivo",
    Dead: "Muerto",
    unknown: "Desconocido"
};

// Objeto de traducción para la especie
const speciesTranslations = {
    Human: "Humano",
    Alien: "Alienígena",
    Robot: "Robot",
    unknown: "Desconocido",
    "Mythological Creature": "Criatura Mitológica",
    Cronenberg: "Cronenberg",
    Animal: "Animal",
};

// Función para obtener los datos de la API
function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results); // Rellenar los datos
            pagination(json.info);  // Manejar la paginación
        })
        .catch((error) => {
            console.error("Error consumiendo la API", error);
        });
}

// Función para rellenar las tarjetas con los datos
function fillData(results) {
    let cards = "";

    results.forEach((character) => {
        // Traducir el estado y la especie
        const translatedStatus = statusTranslations[character.status] || character.status;
        const translatedSpecies = speciesTranslations[character.species] || character.species;

        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${character.image}" class="card-img-top" alt="img-personaje">
                    <div class="card-body">
                        <h2 class="card-title">${character.name}</h2>
                        <h5 class="card-title">Estado: ${translatedStatus}</h5>
                        <h5 class="card-title">Especie: ${translatedSpecies}</h5>
                    </div>
                </div>
            </div>`;
    });

    document.getElementById("dataAlbum").innerHTML = cards;
}

// Función para manejar la paginación
function pagination(info) {
    let prevDisabled = !info.prev ? "disabled" : "";
    let nextDisabled = !info.next ? "disabled" : "";

    const html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${info.prev}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${info.next}')">Next</a>
        </li>`;

    document.getElementById("pagination").innerHTML = html;
}

// Inicializar la carga
getAlbum(API_ALBUM);
