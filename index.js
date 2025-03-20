document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loadButton").addEventListener("click", function () {
    const eventsURL = "https://api.pexels.com/v1/search?query=mountain";
    const apiKey = "mfTUaYtuC6RHXORMQRQ1SByAaCKkexh6uxfPg83KflTMLGBeS8YgxIEa";

    // Effettua la chiamata API
    fetch(eventsURL, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella risposta dall'API");
        }
      })
      .then((data) => {
        console.log("Dati restituiti dall'API:", data);

        const rowContainer = document.getElementById("rowImages"); // Selezioniamo il contenitore corretto
        rowContainer.innerHTML = ""; // Resetta il contenitore prima di aggiungere nuove immagini

        // Itera attraverso ogni immagine
        data.photos.forEach((photo) => {
          const col = document.createElement("div");
          col.className = "col-md-4";
          col.innerHTML = `
              <div class="card mb-4 shadow-sm">
                <img
                  src="${photo.src.medium}" 
                  class="bd-placeholder-img card-img-top" 
                  alt="${photo.photographer}" 
                />
                <div class="card-body">
                  <h5 class="card-title">${photo.photographer}</h5>
                  <p class="card-text">
                    Photo by ${photo.photographer} on Pexels.
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <a href="${photo.url}" target="_blank" class="btn btn-sm btn-primary">View on Pexels</a>
                  </div>
                </div>
              </div>`;
          rowContainer.appendChild(col); // Aggiungi la card al contenitore
        });
      })
      .catch((error) => {
        console.error("Errore nel caricamento delle immagini:", error);
      });
  });
});
