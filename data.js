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
  }
  // Weitere Karten kannst du später einfach nach diesem Muster hier unten anfügen!
];