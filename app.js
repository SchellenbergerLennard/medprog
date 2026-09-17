// ==========================================================================
// MEDPROG – Website-Steuerung (app.js)
// ==========================================================================

// 1. Zugriff auf die HTML-Elemente holen
const selectService = document.getElementById("select-service");
const selectIndicator = document.getElementById("select-indicator");
const selectLevel = document.getElementById("select-level");

const mapImage = document.getElementById("map-image");
const mapStatus = document.getElementById("map-status");
const mapMeta = document.getElementById("map-meta");

const metaTitle = document.getElementById("meta-title");
const metaDescription = document.getElementById("meta-description");
const metaSource = document.getElementById("meta-source");
const metaYear = document.getElementById("meta-year");

// 2. Die Hauptfunktion: Sucht die passende Karte und zeigt sie an
function zeigeAusgewaehlteKarte() {
  const gewaehlterService = selectService.value;
  const gewaehlterIndicator = selectIndicator.value;
  const gewaehltesLevel = selectLevel.value;

  // Suche in data.js nach einem passenden Eintrag
  const gefundeneKarte = MEDPROG_MAPS.find(function(karte) {
    return (
      karte.service === gewaehlterService &&
      karte.indicator === gewaehlterIndicator &&
      karte.level === gewaehltesLevel
    );
  });

  if (gefundeneKarte) {
    // FALL 1: Karte existiert in der Liste!
    mapImage.src = gefundeneKarte.file;
    mapImage.alt = gefundeneKarte.title;
    mapImage.style.display = "block";
    mapStatus.style.display = "none";

    // Metadaten unter der Karte befüllen
    metaTitle.textContent = gefundeneKarte.title;
    metaDescription.textContent = gefundeneKarte.description;
    metaSource.textContent = "Quelle: " + gefundeneKarte.source;
    metaYear.textContent = "Stand: " + gefundeneKarte.year;
    mapMeta.style.display = "block";

  } else {
    // FALL 2: Für diese Kombination gibt es noch keine Karte
    mapImage.style.display = "none";
    mapMeta.style.display = "none";
    mapStatus.style.display = "block";

    // Lesbare Begriffe für den Infokasten zusammenstellen
    const teile = [];
    if (gewaehlterService !== "none") {
      teile.push(selectService.options[selectService.selectedIndex].text);
    }
    if (gewaehlterIndicator !== "none") {
      teile.push(selectIndicator.options[selectIndicator.selectedIndex].text);
    }
    const levelText = selectLevel.options[selectLevel.selectedIndex].text;
    const filterZusammenfassung = teile.length > 0 ? teile.join(" × ") : "Nur Basiskarte";

    mapStatus.innerHTML = `
      <p class="status-title">Für diese Auswahl ist derzeit noch keine Karte verfügbar.</p>
      <p class="status-desc">
        Auswahl: <strong>${filterZusammenfassung}</strong> (${levelText})<br>
        Diese Auswertung wird möglicherweise zu einem späteren Zeitpunkt ergänzt.
      </p>
    `;
  }
}

// 3. Wenn der Nutzer ein Dropdown ändert, sofort Karte aktualisieren
selectService.addEventListener("change", zeigeAusgewaehlteKarte);
selectIndicator.addEventListener("change", zeigeAusgewaehlteKarte);
selectLevel.addEventListener("change", zeigeAusgewaehlteKarte);

// 4. Beim allerersten Laden der Seite einmal ausführen
zeigeAusgewaehlteKarte();


// ==========================================================================
// Vollbild-Funktion (Lightbox)
// ==========================================================================

const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

// 1. Klick auf die Karte öffnet das Vollbild
mapImage.addEventListener("click", function() {
  if (mapImage.src && mapImage.style.display !== "none") {
    modalImage.src = mapImage.src;
    imageModal.style.display = "flex";
  }
});

// 2. Klick auf das 'X' schließt das Vollbild
modalClose.addEventListener("click", function() {
  imageModal.style.display = "none";
});

// 3. Klick irgendwo auf den dunklen Hintergrund schließt ebenfalls
imageModal.addEventListener("click", function(event) {
  if (event.target !== modalImage) {
    imageModal.style.display = "none";
  }
});

// 4. ESC-Taste auf der Tastatur schließt das Bild
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    imageModal.style.display = "none";
  }
});
