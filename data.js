// ==========================================================================
// MEDPROG – Karten-Konfiguration
// Enthält alle 16 verfügbaren QGIS-Karten
// ==========================================================================

const MEDPROG_MAPS = [
  // --- HAUSARZT ---
  {
    service: "hausarzt",
    indicator: "none",
    level: "none",
    file: "maps/hausarzt_none_none.png",
    title: "Hausärztliche Versorgung",
    description: "Fußläufige Erreichbarkeit von Hausärzten in Gelsenkirchen.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkirchen",
    year: "2026"
  },
  {
    service: "hausarzt",
    indicator: "deprivation",
    level: "stadtteile",
    file: "maps/hausarzt_deprivation_stadtteile.png",
    title: "Hausärztliche Versorgung und Deprivation",
    description: "Hausarztstandorte überlagert mit dem Deprivationsindex auf Stadtteilebene.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkirchen",
    year: "2026"
  },
  {
    service: "hausarzt",
    indicator: "sgb-ii-quote",
    level: "regebezirke",
    file: "maps/hausarzt_sgb-ii-quote_regebezirke.png",
    title: "Hausärztliche Versorgung und SGB-II-Quote",
    description: "Hausärztliche Versorgung im Verhältnis zur SGB-II-Quote im Regierungsbezirk.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und IT.NRW",
    year: "2026"
  },
  {
    service: "hausarzt",
    indicator: "anteil-hochaltrige",
    level: "regebezirke",
    file: "maps/hausarzt_anteil_hochaltrige_regebezirk.png",
    title: "Hausärztliche Versorgung und Anteil Hochaltrige",
    description: "Versorgungssituation älterer Bevölkerungsgruppen im Regierungsbezirk.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und IT.NRW",
    year: "2026"
  },

  // --- KINDERARZT ---
  {
    service: "kinderarzt",
    indicator: "u18",
    level: "stadtteile",
    file: "maps/kinderarzt_u18_stadtteile.png",
    title: "Kinderärztliche Versorgung und Anteil unter 18 Jahren",
    description: "Versorgungsgrad und Erreichbarkeiten von Pädiatern bei kleinräumiger Betrachtung der Minderjährigenquote.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkirchen",
    year: "2026"
  },

  // --- PSYCHOTHERAPIE ---
  {
    service: "psychotherapie",
    indicator: "none",
    level: "none",
    file: "maps/psychotherapie_none_none.png",
    title: "Psychotherapeutische Versorgung in Gelsenkirchen",
    description: "Räumliche Standorte und Verteilung der niedergelassenen Psychotherapeutinnen und Psychotherapeuten.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkirchen",
    year: "2026"
  },

  // --- RETTUNGSDIENST ---
  {
    service: "rettungsdienst",
    indicator: "none",
    level: "none",
    file: "maps/rettungsdienst_none_none.png",
    title: "Rettungsdienstliche Versorgung in Gelsenkirchen",
    description: "Standorte und Erreichbarkeiten der Rettungsdienste in Gelsenkirchen.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der Stadt Gelsenkirchen",
    year: "2026"
  },

  // --- REINE RAUMKARTEN (BASISKARTEN) ---
  {
    service: "none",
    indicator: "none",
    level: "stadtgebiet",
    file: "maps/none_none_stadtgebiet.png",
    title: "Stadtgebiet Gelsenkirchen (Gesamtansicht)",
    description: "Kartografische Übersicht des gesamten Stadtgebiets von Gelsenkirchen im regionalen Kontext.",
    source: "Stadt Gelsenkirchen / MEDPROG",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "stadtbezirke",
    file: "maps/none_none_stadtbezirke.png",
    title: "Stadtbezirke Gelsenkirchen",
    description: "Räumliche Abgrenzung der fünf Gelsenkirchener Stadtbezirke (Nord, Mitte, West, Ost und Süd).",
    source: "Stadt Gelsenkirchen / MEDPROG",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "stadtteile",
    file: "maps/none_none_stadtteile.png",
    title: "Stadtteile Gelsenkirchen (Kleinräumige Gliederung)",
    description: "Übersichtskarte der administrativen Grenzen aller Stadtteile im Stadtgebiet.",
    source: "Stadt Gelsenkirchen / MEDPROG",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "wohngebiete",
    file: "maps/none_none_wohngebiete.png",
    title: "Wohngebiete Gelsenkirchen",
    description: "Kleinräumige Abgrenzung der Wohnquartiere im Stadtgebiet.",
    source: "Stadt Gelsenkirchen / MEDPROG",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "regebezirke",
    file: "maps/none_none_regebezirke.png",
    title: "Regierungsbezirke (Regionale Einordnung)",
    description: "Übergeordnete Raumgliederung der Regierungsbezirke in Nordrhein-Westfalen.",
    source: "Geobasis NRW / MEDPROG",
    year: "2026"
  },

  // --- REINE SOZIAL- & INDIKATORKARTEN ---
  {
    service: "none",
    indicator: "arbeitslosigkeit",
    level: "regebezirke",
    file: "maps/none_arbeitslosigkeit_regebezirke.png",
    title: "Arbeitslosenanteil im Regierungsbezirk",
    description: "Regionale Verteilung der Arbeitslosigkeit auf Ebene der Regierungsbezirke.",
    source: "IT.NRW / Bundesagentur für Arbeit",
    year: "2026"
  },
  {
    service: "none",
    indicator: "sgb-ii-quote",
    level: "regebezirke",
    file: "maps/none_sgb-ii-quote_regebezirke.png",
    title: "SGB-II-Quote im Regierungsbezirk",
    description: "Räumliche Verteilung der SGB-II-Quote im überregionalen Vergleich.",
    source: "IT.NRW / Bundesagentur für Arbeit",
    year: "2026"
  },
  {
    service: "none",
    indicator: "anteil-hochaltrige",
    level: "regebezirke",
    file: "maps/none_anteil-hochaltrige_regebezirke.png",
    title: "Bevölkerungsanteil Hochaltrige im Regierungsbezirk",
    description: "Demografische Verteilung hochaltriger Einwohnerinnen und Einwohner.",
    source: "IT.NRW / MEDPROG",
    year: "2026"
  },
  {
    service: "none",
    indicator: "deprivation",
    level: "wohngebiete",
    file: "maps/none-deprivation-wohngebiete.png",
    title: "Deprivationsindex nach Wohngebieten",
    description: "Kleinräumiger Deprivationsindex auf Ebene der Wohnquartiere in Gelsenkirchen.",
    source: "MEDPROG | Eigene Berechnung",
    year: "2026"
  }
];
