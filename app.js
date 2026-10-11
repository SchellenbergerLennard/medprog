// ==========================================================================
// MEDPROG – Dynamische Layer-Steuerung & Export
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

const exportBtn = document.getElementById("export-btn");

// Vollbild-Elemente
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

  // 1. Raumebenen-Layer steuern
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

  // 2. Sozialindikator-Layer steuern
  if (indicatorKey !== "none" && INDICATOR_MAPS[indicatorKey]) {
    layerIndicator.src = INDICATOR_MAPS[indicatorKey].file;
    layerIndicator.style.display = "block";
    titles.push(INDICATOR_MAPS[indicatorKey].title);
    sources.push(INDICATOR_MAPS[indicatorKey].source);
    activeLayersCount++;
  } else {
    layerIndicator.style.display = "none";
    layerIndicator.src = "";
  }

  // 3. Versorgungsangebot-Layer steuern
  if (serviceKey !== "none" && SERVICE_MAPS[serviceKey]) {
    layerService.src = SERVICE_MAPS[serviceKey].file;
    layerService.style.display = "block";
    titles.push(SERVICE_MAPS[serviceKey].title);
    sources.push(SERVICE_MAPS[serviceKey].source);
    activeLayersCount++;
  } else {
    layerService.style.display = "none";
    layerService.src = "";
  }

  // UI umschalten (Status vs. Metadaten & Export-Button)
  if (activeLayersCount > 0) {
    mapStatus.style.display = "none";
    metaTitle.textContent = titles.join(" + ");
    metaDescription.textContent = "Kombinierte Darstellung aus ausgewählten transparenten Kartenebenen.";
    metaSource.textContent = "Quellen: " + [...new Set(sources)].join(" | ");
    metaYear.textContent = "Stand: 2026";
    mapMeta.style.display = "block";

    // Export-Button aktivieren
    if (exportBtn) {
      exportBtn.disabled = false;
      exportBtn.style.opacity = "1";
      exportBtn.style.cursor = "pointer";
    }
  } else {
    mapStatus.style.display = "block";
    mapMeta.style.display = "none";

    // Export-Button deaktivieren
    if (exportBtn) {
      exportBtn.disabled = true;
      exportBtn.style.opacity = "0.5";
      exportBtn.style.cursor = "not-allowed";
    }
  }
}

// Event-Listener an Dropdowns binden
selectService.addEventListener("change", updateMap);
selectIndicator.addEventListener("change", updateMap);
selectLevel.addEventListener("change", updateMap);

// ==========================================================================
// Export-Funktion (Zusammenführen der aktiven Layer auf ein Canvas)
// ==========================================================================
if (exportBtn) {
  exportBtn.addEventListener("click", function() {
    const activeLayers = [];
    if (layerLevel.style.display !== "none" && layerLevel.src) activeLayers.push(layerLevel);
    if (layerIndicator.style.display !== "none" && layerIndicator.src) activeLayers.push(layerIndicator);
    if (layerService.style.display !== "none" && layerService.src) activeLayers.push(layerService);

    if (activeLayers.length === 0) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = activeLayers[0].naturalWidth || 1200;
    const height = activeLayers[0].naturalHeight || 800;
    canvas.width = width;
    canvas.height = height;

    let loadedCount = 0;
    const imageObjects = [];

    activeLayers.forEach((layer, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      imageObjects[index] = img;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === activeLayers.length) {
          imageObjects.forEach(imgObj => {
            ctx.drawImage(imgObj, 0, 0, width, height);
          });

          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "medprog-kombikarte.png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      img.src = layer.src;
    });
  });
}

// Klick auf aktive Layer öffnet die Vollbild-Ansicht (Lightbox)
[layerLevel, layerIndicator, layerService].forEach(layer => {
  layer.addEventListener("click", function() {
    if (this.src && this.style.display !== "none") {
      modalImage.src = this.src;
      imageModal.style.display = "flex";
    }
  });
});

// Vollbild schließen
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

// Initialer Aufruf beim Laden
updateMap();
