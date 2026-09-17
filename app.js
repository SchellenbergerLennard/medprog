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

    // Freundlicher Hinweistext mit den gewählten Begriffen
    const serviceText = selectService.options[selectService.selectedIndex].text;
    const indicatorText = selectIndicator.options[selectIndicator.selectedIndex].text;
    const levelText = selectLevel.options[selectLevel.selectedIndex].text;

    mapStatus.innerHTML = `
      <p class="status-title">Für diese Auswahl ist derzeit noch keine Karte verfügbar.</p>
      <p class="status-desc">
        Kombination: <strong>${serviceText}</strong> × <strong>${indicatorText}</strong> (${levelText})<br>
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