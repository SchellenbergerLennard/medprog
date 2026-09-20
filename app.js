// ==========================================================================
// MEDPROG – Interaktive Steuerung & Dynamische Verfügbarkeits-Markierung
// ==========================================================================

// DOM-Elemente abrufen
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

// Vollbild-Elemente
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

// ==========================================================================
// 1. Automatische Markierung verfügbarer Optionen (Grüner Punkt ●)
// ==========================================================================

// Speichert die Original-Beschriftungen der Optionen beim ersten Laden
function initOptionLabels() {
  [selectService, selectIndicator, selectLevel].forEach(select => {
    Array.from(select.options).forEach(opt => {
      if (!opt.dataset.origText) {
        opt.dataset.origText = opt.text;
      }
    });
  });
}

// Markiert Optionen mit grünem Punkt & Fettschrift, wenn Karten existieren
function markiereOptionen(selectElement, gueltigeWerteSet) {
  Array.from(selectElement.options).forEach(opt => {
    const originalText = opt.dataset.origText || opt.text;
    const hatKarte = gueltigeWerteSet.has(opt.value);

    if (hatKarte) {
      opt.text = "● " + originalText;
      opt.style.fontWeight = "600";
      opt.style.color = "#047857"; // Signalgrün
    } else {
      opt.text = originalText;
      opt.style.fontWeight = "normal";
      opt.style.color = "#64748b"; // Dezent ausgegraut
    }
  });
}

// Berechnet dynamisch, welche Optionen zur aktuellen Auswahl passen
function updateAvailableHighlights() {
  const currentService = selectService.value;
  const currentIndicator = selectIndicator.value;

  // A) Versorgungsangebote: Alle markieren, die generell in der Datenbank sind
  const verfuegbareServices = new Set(MEDPROG_MAPS.map(m => m.service));
  markiereOptionen(selectService, verfuegbareServices);

  // B) Sozialindikatoren: Welche Indikatoren existieren für das gewählte Versorgungsangebot?
  const verfuegbareIndikatoren = new Set(
    MEDPROG_MAPS
      .filter(m => m.service === currentService)
      .map(m => m.indicator)
  );
  markiereOptionen(selectIndicator, verfuegbareIndikatoren);

  // C) Raumebenen: Welche Ebenen existieren für (Service + gewählter Indikator)?
  let matchingMaps = MEDPROG_MAPS.filter(
    m => m.service === currentService && m.indicator === currentIndicator
  );
  
  // Falls für die genaue Kombination noch nichts gewählt ist, alle Ebenen des Service anzeigen
  if (matchingMaps.length === 0) {
    matchingMaps = MEDPROG_MAPS.filter(m => m.service === currentService);
  }

  const verfuegbareLevels = new Set(matchingMaps.map(m => m.level));
  markiereOptionen(selectLevel, verfuegbareLevels);
}

// ==========================================================================
// 2. Kartenanzeige aktualisieren
// ==========================================================================

function updateMap() {
  const gewaehlterService = selectService.value;
  const gewaehlterIndicator = selectIndicator.value;
  const gewaehlterLevel = selectLevel.value;

  // Zuerst die grünen Punkte in den anderen Dropdowns aktualisieren
  updateAvailableHighlights();

  // In data.js nach der passenden Karte suchen
  const gefundeneKarte = MEDPROG_MAPS.find(karte => {
    return (
      karte.service === gewaehlterService &&
      karte.indicator === gewaehlterIndicator &&
      karte.level === gewaehlterLevel
    );
  });

  if (gefundeneKarte) {
    // FALL 1: Karte gefunden -> Bild & Metadaten anzeigen
    mapImage.src = gefundeneKarte.file;
    mapImage.alt = gefundeneKarte.title;
    mapImage.style.display = "block";
    mapStatus.style.display = "none";

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

    const teile = [];
    if (gewaehlterService !== "none") {
      teile.push(selectService.options[selectService.selectedIndex].text.replace(/^●\s*/, ""));
    }
    if (gewaehlterIndicator !== "none") {
      teile.push(selectIndicator.options[selectIndicator.selectedIndex].text.replace(/^●\s*/, ""));
    }
    const levelText = selectLevel.options[selectLevel.selectedIndex].text.replace(/^●\s*/, "");
    const filterZusammenfassung = teile.length > 0 ? teile.join(" × ") : "Nur Basiskarte";

    mapStatus.innerHTML = `
      <p class="status-title">Für diese Auswahl ist derzeit noch keine Karte verfügbar.</p>
      <p class="status-desc">
        Auswahl: <strong>${filterZusammenfassung}</strong> (${levelText})<br>
        Tipp: Wähle Optionen mit einem grünen Punkt (<strong>●</strong>) aus.
      </p>
    `;
  }
}

// ==========================================================================
// 3. Event-Listener & Lightbox
// ==========================================================================

selectService.addEventListener("change", updateMap);
selectIndicator.addEventListener("change", updateMap);
selectLevel.addEventListener("change", updateMap);

// Klick auf die Karte öffnet Vollbild
mapImage.addEventListener("click", function() {
  if (mapImage.src && mapImage.style.display !== "none") {
    modalImage.src = mapImage.src;
    imageModal.style.display = "flex";
  }
});

// Vollbild schließen (Kreuz, Hintergrund oder ESC)
if (modalClose) {
  modalClose.addEventListener("click", () => imageModal.style.display = "none");
}
if (imageModal) {
  imageModal.addEventListener("click", (e) => {
    if (e.target !== modalImage) imageModal.style.display = "none";
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imageModal) imageModal.style.display = "none";
});

// Initialisierung beim Laden der Seite
initOptionLabels();
updateMap();
