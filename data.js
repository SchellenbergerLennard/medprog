// ==========================================================================
// MEDPROG – Karten-Konfiguration
// Hier werden alle tatsächlich vorhandenen Karten eingetragen.
// ==========================================================================

const MEDPROG_MAPS = [
  {
    service: "hausarzt",
    indicator: "arbeitslosigkeit",
    level: "stadtteile",
    file: "maps/hausarzt_arbeitslosigkeit_stadtteile.png",
    title: "Hausärztliche Versorgung und Arbeitslosigkeit",
    description: "Räumliche Verteilung der Hausarztsitze im Verhältnis zur SGB-II-Quote in den Stadtteilen von Gelsenkirchen.",
    source: "MEDPROG / Eigene Darstellung auf Basis von KVWL- und Kommunaldaten",
    year: "2026"
  },
  {
    service: "kinderarzt",
    indicator: "u18",
    level: "stadtteile",
    file: "maps/kinderarzt_u18_stadtteile.png",
    title: "Kinderärztliche Versorgung und Anteil unter 18 Jahren",
    description: "Versorgungsgrad und Erreichbarkeiten von Pädiatern bei kleinräumiger Betrachtung der Minderjährigenquote.",
    source: "MEDPROG / Eigene Darstellung",
    year: "2026"
  },
  {
    service: "psychotherapie",
    indicator: "none",
    level: "regebezirke", // oder "stadtbezirke", je nachdem was deine Karte zeigt
    file: "maps/psychotherapie_none_regebezirke.png",
    title: "Psychotherapeutische Versorgung in Gelsenkirchen",
    description: "Räumliche Standorte und Verteilung der niedergelassenen Psychotherapeutinnen und Psychotherapeuten.",
    source: "MEDPROG / KVWL",
    year: "2026"
  },
  
  // ==========================================
  // Reine Raum- und Basiskarten (ohne Fachdaten)
  // ==========================================
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
    level: "regebezirke",
    file: "maps/none_none_regebezirke.png",
    title: "Regierungsbezirke (Regionale Einordnung)",
    description: "sss",
    source: "sss",
    year: "2026"
  },
  {
  service: "hausarzt",
  indicator: "sgb-ii-quote",
  level: "regebetirke",
  file: "maps/hausarzt_sgb-ii-quote_regebezirke.png",
  title: "sss",
  description: "sss",
  source: "sss",
  year: "2026"
},
  // Weitere Karten kannst du später einfach nach diesem Muster hier unten anfügen!
];
