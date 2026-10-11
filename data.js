// ==========================================================================
// MEDPROG – Modulare Karten-Ebenen (Transparente Layer)
// ==========================================================================

// 1. RÄUMLICHE EBENEN & GRENZEN (Unterste Schicht)
const LEVEL_MAPS = {
  "stadtgebiet": {
    file: "maps/level_stadtgebiet.png",
    title: "Stadtgebiet Gelsenkirchen",
    description: "Gesamtansicht des Stadtgebiets.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  },
  "stadtbezirke": {
    file: "maps/level_stadtbezirke.png",
    title: "Stadtbezirke Gelsenkirchen",
    description: "Abgrenzung der fünf Stadtbezirke.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  },
  "stadtteile": {
    file: "maps/level_stadtteile.png",
    title: "Stadtteile Gelsenkirchen",
    description: "Kleinräumige Gliederung nach Stadtteilen.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  },
  "wohngebiete": {
    file: "maps/level_wohngebiete.png",
    title: "Wohngebiete Gelsenkirchen",
    description: "Abgrenzung der Wohnquartiere.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  },
  "regebezirke": {
    file: "maps/level_regebezirke.png",
    title: "Regierungsbezirke",
    description: "Regionale Einordnung.",
    source: "Geobasis NRW",
    year: "2026"
  }
};

// 2. SOZIALINDIKATOREN (Mittlere transparente Schicht)
const INDICATOR_MAPS = {
  "deprivation": {
    file: "maps/ind_deprivation.png",
    title: "Deprivationsindex",
    description: "Kleinräumiger Deprivationsindex.",
    source: "MEDPROG",
    year: "2026"
  },
  "arbeitslosigkeit": {
    file: "maps/ind_arbeitslosigkeit.png",
    title: "Arbeitslosenanteil",
    description: "Verteilung der Arbeitslosigkeit.",
    source: "Bundesagentur für Arbeit",
    year: "2026"
  },
  "sgb-ii-quote": {
    file: "maps/ind_sgb-ii-quote.png",
    title: "SGB-II-Quote",
    description: "Räumliche Verteilung der SGB-II-Quote.",
    source: "IT.NRW",
    year: "2026"
  },
  "anteil-hochaltrige": {
    file: "maps/ind_anteil-hochaltrige.png",
    title: "Bevölkerungsanteil Hochaltrige",
    description: "Demografische Verteilung der Hochaltrigen.",
    source: "IT.NRW / MEDPROG",
    year: "2026"
  },
  "u18": {
    file: "maps/ind_u18.png",
    title: "Anteil unter 18 Jahren",
    description: "Minderjährigenquote nach Quartieren.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  }
  // Weitere Indikatoren kannst du hier jederzeit nach demselben Schema ergänzen
};

// 3. VERSORGUNGSANGEBOTE / STANDORTE (Oberste Schicht)
const SERVICE_MAPS = {
  "hausarzt": {
    file: "maps/serv_hausarzt.png",
    title: "Hausärztliche Versorgung",
    description: "Standorte von Hausärzten.",
    source: "KVWL",
    year: "2026"
  },
  "kinderarzt": {
    file: "maps/serv_kinderarzt.png",
    title: "Kinderärztliche Versorgung",
    description: "Standorte von Kinderärzten.",
    source: "KVWL",
    year: "2026"
  },
  "psychotherapie": {
    file: "maps/serv_psychotherapie.png",
    title: "Psychotherapeutische Versorgung",
    description: "Standorte niedergelassener Psychotherapeuten.",
    source: "KVWL",
    year: "2026"
  },
  "rettungsdienst": {
    file: "maps/serv_rettungsdienst.png",
    title: "Rettungsdienstliche Versorgung",
    description: "Standorte des Rettungsdienstes.",
    source: "Stadt Gelsenkirchen",
    year: "2026"
  }
};
