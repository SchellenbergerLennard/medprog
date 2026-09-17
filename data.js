// ==========================================================================
// MEDPROG – Karten-Konfiguration
// ==========================================================================

const MEDPROG_MAPS = [
  // Hausarzt
  {
    service: "hausarzt",
    indicator: "none",
    level: "none",
    file: "maps/hausarzt_none_none.png",
    title: "Hausärztliche Versorgung",
    description: "Fußläufige Erreichbarkeit von Hausärzten in Gelsenkirchen.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },
  {
    service: "hausarzt",
    indicator: "sgb-ii-quote",
    level: "regebezirke",
    file: "maps/hausarzt_sgb-ii-quote_regebezirke.png",
    title: "sss",
    description: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    source: "sss",
    year: "2026"
  },

  // Kinderarzt
  {
    service: "kinderarzt",
    indicator: "u18",
    level: "stadtteile",
    file: "maps/kinderarzt_u18_stadtteile.png",
    title: "Kinderärztliche Versorgung und Anteil unter 18 Jahren",
    description: "Versorgungsgrad und Erreichbarkeiten von Pädiatern bei kleinräumiger Betrachtung der Minderjährigenquote.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },

  // Psychotherapie
  {
    service: "psychotherapie",
    indicator: "none",
    level: "regebezirke",
    file: "maps/psychotherapie_none_none.png",
    title: "Psychotherapeutische Versorgung in Gelsenkirchen",
    description: "Räumliche Standorte und Verteilung der niedergelassenen Psychotherapeutinnen und Psychotherapeuten.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },
  
  // Raumdaten
  {
    service: "none",
    indicator: "none",
    level: "stadtgebiet",
    file: "maps/none_none_stadtgebiet.png",
    title: "Stadtgebiet Gelsenkirchen (Gesamtansicht)",
    description: "Kartografische Übersicht des gesamten Stadtgebiets von Gelsenkirchen im regionalen Kontext.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "stadtbezirke",
    file: "maps/none_none_stadtbezirke.png",
    title: "Stadtbezirke Gelsenkirchen",
    description: "Räumliche Abgrenzung der fünf Gelsenkirchener Stadtbezirke (Nord, Mitte, West, Ost und Süd).",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "stadtteile",
    file: "maps/none_none_stadtteile.png",
    title: "Stadtteile Gelsenkirchen (Kleinräumige Gliederung)",
    description: "Übersichtskarte der administrativen Grenzen aller Stadtteile im Stadtgebiet.",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },
  {
    service: "none",
    indicator: "none",
    level: "regebezirke",
    file: "maps/none_none_regebezirke.png",
    title: "Regierungsbezirke (Regionale Einordnung)",
    description: "sss",
    source: "MEDPROG | Eigene Darstellung auf Basis von Daten der KVWL und der Stadt Gelsenkrichen",
    year: "2026"
  },

];
