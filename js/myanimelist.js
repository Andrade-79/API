const API_URL = "https://api.jikan.moe/v4/top/anime?type=ona";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.data); // Cambiado a 'json.data' ya que así es como Jikan organiza los datos
            pagination(json.pagination); // Manejo de la paginación adaptado
        })
        .catch((error) => {
            console.error("Error consumiendo la API", error);
        });
}

async function fillData(results) {
    let cards = "";

    for (const anime of results) {
        // Crear el contenido de las tarjetas para cada anime
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text"><strong>Puntuación:</strong> ${anime.score || "N/A"}</p>
                        <p class="card-text"><strong>Episodios:</strong> ${anime.episodes || "N/A"}</p>
                        <a href="${anime.url}" class="btn btn-primary btn-sm mt-auto" target="_blank">
                            Más info
                        </a>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById("dataAlbum").innerHTML = cards; // Insertar las tarjetas en el HTML
}

function pagination(info) {
    const prevDisabled = info.has_previous_page ? "" : "disabled";
    const nextDisabled = info.has_next_page ? "" : "disabled";

    const html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link btn" onclick="getAlbum('${API_URL}&page=${info.current_page - 1}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link btn" onclick="getAlbum('${API_URL}&page=${info.current_page + 1}')">Next</a>
        </li>`;

    document.getElementById("pagination").innerHTML = html; // Insertar los botones de paginación
}

// Manejar búsqueda
document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        const searchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
        getAlbum(searchUrl); // Buscar animes por el término ingresado
    } else {
        alert("Por favor, ingresa un término para buscar.");
    }
});

// Inicializar la carga de datos
getAlbum(API_URL);
