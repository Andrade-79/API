const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=60&offset=60";

// Diccionario para traducir los tipos al español
const typeTranslations = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"
};

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results); // Rellenar las tarjetas con la información básica
            pagination(json);      // Manejar la paginación
        })
        .catch((error) => {
            console.error("Error consumiendo la API", error);
        });
}

async function fillData(results) {
    let cards = "";

    for (const pokemon of results) {
        // Llamar a la API para obtener detalles adicionales del Pokémon
        try {
            const response = await fetch(pokemon.url);
            const details = await response.json();

            // Extraer los tipos y traducirlos
            const types = details.types
                .map((typeInfo) => typeTranslations[typeInfo.type.name]) // Traducir cada tipo
                .join(", "); // Unir los nombres con comas

            // Crear el contenido de las tarjetas
            cards += `
                <div class="col">
                    <div class="card h-100" style="width: 12rem;">
                        <img src="${details.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                        <div class="card-body">
                            <h2 class="card-title text-capitalize">${pokemon.name}</h2>
                            <h5 class="card-text">No. Especie: ${details.id}</h5>
                            <h5 class="card-text">Tipos: ${types}</h5>
                        </div>
                    </div>
                </div>`;
        } catch (error) {
            console.error("Error obteniendo detalles del Pokémon", error);
        }
    }

    document.getElementById("dataAlbum").innerHTML = cards; // Insertar las tarjetas en el HTML
}

function pagination(info) {
    const prevDisabled = info.previous ? "" : "disabled";
    const nextDisabled = info.next ? "" : "disabled";

    const html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link btn" onclick="getAlbum('${info.previous}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link btn" onclick="getAlbum('${info.next}')">Next</a>
        </li>`;

    document.getElementById("pagination").innerHTML = html; // Insertar los botones de paginación
}

// Inicializar la carga de datos
getAlbum(API_URL);
