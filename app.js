// ==========================================================================
// MEDPROG – Steuerung, Overlays & Multi-Layer Export
// ==========================================================================

const selectService = document.getElementById("select-service");
const selectIndicator = document.getElementById("select-indicator");
const selectLevel = document.getElementById("select-level");

const layerLevel = document.getElementById("layer-level");
const layerIndicator = document.getElementById("layer-indicator");
const layerService = document.getElementById("layer-service");

const mapStatus = document.getElementById("map-status");
const mapMeta = document.getElementById("map-meta");

const metaTitle = document.getElementById("meta-title");
const metaDescription = document.getElementById("meta-description");
const metaSource = document.getElementById("meta-source");
const metaYear = document.getElementById("meta-year");

// Overlay Elemente
const overlayLegend = document.getElementById("overlay-legend");
const legendIndicatorImg = document.getElementById("legend-indicator-img");
const legendServiceImg = document.getElementById("legend-service-img");

const overlayScaleWrapper = document.getElementById("overlay-scale-wrapper");
const overlayNorthWrapper = document.getElementById("overlay-north-wrapper");

// Toggles & Export
const toggleLegend = document.getElementById("toggle-legend");
const toggleScale = document.getElementById("toggle-scale");
const toggleNorth = document.getElementById("toggle-north");
const exportBtn = document.getElementById("export-btn");

// Lightbox
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

function updateMap() {
  const serviceKey = selectService.value;
  const indicatorKey = selectIndicator.value;
  const levelKey = selectLevel.value;

  let activeLayersCount = 0;
  let titles = [];
  let sources = [];
  let hasActiveLegendContent = false;

  // 1. Raumebene
  if (levelKey !== "none" && LEVEL_MAPS[levelKey]) {
    layerLevel.src = LEVEL_MAPS[levelKey].file;
    layerLevel.style.display = "block";
    titles.push(LEVEL_MAPS[levelKey].title);
    sources.push(LEVEL_MAPS[levelKey].source);
    activeLayersCount++;
  } else {
    layerLevel.style.display = "none";
    layerLevel.src = "";
  }

  // 2. Sozialindikator + Legende
  if (indicatorKey !== "none" && INDICATOR_MAPS[indicatorKey]) {
    layerIndicator.src = INDICATOR_MAPS[indicatorKey].file;
    layerIndicator.style.display = "block";
    titles.push(INDICATOR_MAPS[indicatorKey].title);
    sources.push(INDICATOR_MAPS[indicatorKey].source);
    activeLayersCount++;

    if (INDICATOR_MAPS[indicatorKey].legend) {
      legendIndicatorImg.src = INDICATOR_MAPS[indicatorKey].legend;
      legendIndicatorImg.style.display = "block";
      hasActiveLegendContent = true;
    } else {
      legendIndicatorImg.style.display = "none";
    }
  } else {
    layerIndicator.style.display = "none";
    layerIndicator.src = "";
    legendIndicatorImg.style.display = "none";
  }

  // 3. Versorgungsangebot + Legende
  if (serviceKey !== "none" && SERVICE_MAPS[serviceKey]) {
    layerService.src = SERVICE_MAPS[serviceKey].file;
    layerService.style.display = "block";
    titles.push(SERVICE_MAPS[serviceKey].title);
    sources.push(SERVICE_MAPS[serviceKey].source);
    activeLayersCount++;

    if (SERVICE_MAPS[serviceKey].legend) {
      legendServiceImg.src = SERVICE_MAPS[serviceKey].legend;
      legendServiceImg.style.display = "block";
      hasActiveLegendContent = true;
    } else {
      legendServiceImg.style.display = "none";
    }
  } else {
    layerService.style.display = "none";
    layerService.src = "";
    legendServiceImg.style.display = "none";
  }

  // Sichtbarkeit der Legende (abhängig von Inhalt UND Checkbox)
  if (hasActiveLegendContent && toggleLegend.checked) {
    overlayLegend.style.display = "block";
  } else {
    overlayLegend.style.display = "none";
  }

  // Sichtbarkeit Maßstab & Nordpfeil über Checkboxen steuern
  overlayScaleWrapper.style.display = toggleScale.checked ? "flex" : "none";
  overlayNorthWrapper.style.display = toggleNorth.checked ? "flex" : "none";

  // UI Metadaten aktualisieren
  if (activeLayersCount > 0) {
    mapStatus.style.display = "none";
    metaTitle.textContent = titles.join(" + ");
    metaDescription.textContent = "Kombinierte Darstellung aus ausgewählten transparenten Kartenebenen.";
    metaSource.textContent = "Quellen: " + [...new Set(sources)].join(" | ");
    metaYear.textContent = "Stand: 2026";
    mapMeta.style.display = "block";
  } else {
    mapStatus.style.display = "block";
    mapMeta.style.display = "none";
  }
}

// Event-Listener für Dropdowns und Checkboxes
[selectService, selectIndicator, selectLevel].forEach(el => el.addEventListener("change", updateMap));
[toggleLegend, toggleScale, toggleNorth].forEach(el => el.addEventListener("change", updateMap));

// ==========================================================================
// EXPORT-FUNKTION: Zeichnet Karte + aktive Elemente unten rechts aufs Canvas
// ==========================================================================
if (exportBtn) {
  exportBtn.addEventListener("click", function() {
    const activeLayers = [];
    if (layerLevel.style.display !== "none" && layerLevel.src) activeLayers.push(layerLevel);
    if (layerIndicator.style.display !== "none" && layerIndicator.src) activeLayers.push(layerIndicator);
    if (layerService.style.display !== "none" && layerService.src) activeLayers.push(layerService);

    if (activeLayers.length === 0) {
      alert("Bitte wählen Sie zuerst mindestens eine Kartenebene aus!");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = activeLayers[0].naturalWidth || 1200;
    const height = activeLayers[0].naturalHeight || 800;
    canvas.width = width;
    canvas.height = height;

    // Zu ladende Bilder sammeln (Map-Layer + aktive Overlays)
    const imagesToLoad = [];

    // 1. Map-Layer hinzufügen
    activeLayers.forEach(layer => {
      imagesToLoad.push({ type: 'layer', src: layer.src });
    });

    // 2. Overlays (Maßstab, Nordpfeil, Legendenbilder) prüfen und hinzufügen
    const exportScale = toggleScale.checked && overlayScaleWrapper.style.display !== "none";
    const exportNorth = toggleNorth.checked && overlayNorthWrapper.style.display !== "none";
    const exportLeg = toggleLegend.checked && overlayLegend.style.display !== "none";

    let indLegSrc = exportLeg && legendIndicatorImg.style.display !== "none" ? legendIndicatorImg.src : null;
    let srvLegSrc = exportLeg && legendServiceImg.style.display !== "none" ? legendServiceImg.src : null;

    if (indLegSrc) imagesToLoad.push({ type: 'indLeg', src: indLegSrc });
    if (srvLegSrc) imagesToLoad.push({ type: 'srvLeg', src: srvLegSrc });
    if (exportScale) imagesToLoad.push({ type: 'scale', src: document.getElementById("scale-img").src });
    if (exportNorth) imagesToLoad.push({ type: 'north', src: document.getElementById("north-img").src });

    let loadedCount = 0;
    const loadedImages = {};

    imagesToLoad.forEach(item => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedCount++;
        if (!loadedImages[item.type]) loadedImages[item.type] = [];
        loadedImages[item.type].push(img);

        if (loadedCount === imagesToLoad.length) {
          // A) Kartenebenen zeichnen (von unten nach oben)
          if (loadedImages['layer']) {
            loadedImages['layer'].forEach(lImg => ctx.drawImage(lImg, 0, 0, width, height));
          }

          // Relative Positionierung für unten rechts (Skaliert an Bildauflösung)
          const margin = Math.round(width * 0.02); // 2% Rand
          let currentRight = margin;
          let currentBottom = margin;

          // B) Untere Zeile zeichnen (Nordpfeil & Maßstab)
          let bottomRowItems = [];
          if (loadedImages['north']) bottomRowItems.push({ img: loadedImages['north'][0], type: 'north' });
          if (loadedImages['scale']) bottomRowItems.push({ img: loadedImages['scale'][0], type: 'scale' });

          let bottomRowHeight = 0;
          bottomRowItems.forEach(el => {
            const scaleFactor = width / 1200; // Skalierungsfaktor basierend auf Standardbreite
            el.drawW = el.type === 'north' ? 55 * scaleFactor : 130 * scaleFactor;
            el.drawH = el.type === 'north' ? 70 * scaleFactor : 35 * scaleFactor;
            if (el.drawH > bottomRowHeight) bottomRowHeight = el.drawH;
          });

          // Nordpfeil und Maßstab von rechts nach links zeichnen
          let xPos = width - margin;
          let yPosBottomRow = height - margin;

          bottomRowItems.forEach(el => {
            xPos -= el.drawW;
            ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
            ctx.fillRect(xPos - 6, yPosBottomRow - el.drawH - 6, el.drawW + 12, el.drawH + 12);
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.strokeRect(xPos - 6, yPosBottomRow - el.drawH - 6, el.drawW + 12, el.drawH + 12);
            ctx.drawImage(el.img, xPos, yPosBottomRow - el.drawH, el.drawW, el.drawH);
            xPos -= 10; // Abstand zwischen den Elementen
          });

          if (bottomRowItems.length > 0) {
            currentBottom += bottomRowHeight + margin + 10;
          }

          // C) Legende zeichnen (sitzt direkt oberhalb der unteren Zeile)
          let legendImgs = [];
          if (loadedImages['indLeg']) legendImgs.push(loadedImages['indLeg'][0]);
          if (loadedImages['srvLeg']) legendImgs.push(loadedImages['srvLeg'][0]);

          if (legendImgs.length > 0) {
            const scaleFactor = width / 1200;
            const legW = Math.round(220 * scaleFactor);
            
            // Gesamthöhe der Legendenbilder berechnen
            let totalLegH = 30 * scaleFactor; // für den Titel
            legendImgs.forEach(lImg => {
              totalLegH += (lImg.naturalHeight / lImg.naturalWidth) * legW + 10;
            });

            let legX = width - margin - legW;
            let legY = height - currentBottom - totalLegH;

            // Hintergrundkasten für die Legende zeichnen
            ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
            ctx.fillRect(legX - 8, legY - 8, legW + 16, totalLegH + 16);
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.strokeRect(legX - 8, legY - 8, legW + 16, totalLegH + 16);

            // Legendentitel
            ctx.fillStyle = "#64748b";
            ctx.font = `bold ${Math.round(12 * scaleFactor)}px sans-serif`;
            ctx.fillText("LEGENDE", legX, legY + 12 * scaleFactor);

            // Strich unter Titel
            ctx.strokeStyle = "#e2e8f0";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(legX, legY + 18 * scaleFactor);
            ctx.lineTo(legX + legW, legY + 18 * scaleFactor);
            ctx.stroke();

            // Einzelne Legenden-Grafiken einzeichnen
            let cursorY = legY + 26 * scaleFactor;
            legendImgs.forEach(lImg => {
              let drawH = (lImg.naturalHeight / lImg.naturalWidth) * legW;
              ctx.drawImage(lImg, legX, cursorY, legW, drawH);
              cursorY += drawH + 10;
            });
          }

          // D) Download auslösen
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "medprog-kombikarte-komplett.png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      img.src = item.src;
    });
  });
}

// Lightbox Funktion bei Klick auf Karte
[layerLevel, layerIndicator, layerService].forEach(layer => {
  layer.addEventListener("click", function() {
    if (this.src && this.style.display !== "none") {
      modalImage.src = this.src;
      imageModal.style.display = "flex";
    }
  });
});

if (modalClose) modalClose.addEventListener("click", () => imageModal.style.display = "none");
if (imageModal) {
  imageModal.addEventListener("click", (e) => {
    if (e.target !== modalImage) imageModal.style.display = "none";
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imageModal) imageModal.style.display = "none";
});

// Init beim Start
updateMap();
