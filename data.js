// ==========================================================================
// MEDPROG – Modulare Karten-Ebenen (Transparente Layer ohne Präfixe)
// ==========================================================================

// ==========================================================================
// MEDPROG – Modulare Karten-Ebenen & Legenden-Verknüpfung
// ==========================================================================

const LEVEL_MAPS = {
  "stadtgebiet": { file: "maps/stadtgebiet.png", title: "Stadtgebiet Gelsenkirchen", description: "Gesamtansicht des Stadtgebiets.", source: "Stadt Gelsenkirchen", year: "2026" },
  "stadtbezirke": { file: "maps/stadtbezirke.png", title: "Stadtbezirke Gelsenkirchen", description: "Abgrenzung der fünf Stadtbezirke.", source: "Stadt Gelsenkirchen", year: "2026" },
  "stadtteile": { file: "maps/stadtteile.png", title: "Stadtteile Gelsenkirchen", description: "Kleinräumige Gliederung nach Stadtteilen.", source: "Stadt Gelsenkirchen", year: "2026" },
  "wohngebiete": { file: "maps/wohngebiete.png", title: "Wohngebiete Gelsenkirchen", description: "Abgrenzung der Wohnquartiere.", source: "Stadt Gelsenkirchen", year: "2026" },
  "regebezirke": { file: "maps/regebezirke.png", title: "Regierungsbezirke", description: "Regionale Einordnung.", source: "Geobasis NRW", year: "2026" }
};

const INDICATOR_MAPS = {
  "deprivation": { file: "maps/deprivation.png", legend: "legends/deprivation.png", title: "Deprivationsindex", description: "Kleinräumiger Deprivationsindex.", source: "MEDPROG", year: "2026" },
  "arbeitslosigkeit": { file: "maps/arbeitslosigkeit.png", legend: "legends/arbeitslosigkeit.png", title: "Arbeitslosenanteil", description: "Verteilung der Arbeitslosigkeit.", source: "Bundesagentur für Arbeit", year: "2026" },
  "bev-verteilung": { file: "maps/bev-verteilung.png", legend: "legends/bev-verteilung.png", title: "Bevölkerungsverteilung", description: "Räumliche Verteilung der Bevölkerung.", source: "Stadt Gelsenkirchen", year: "2026" },
  "bev-dichte-m2": { file: "maps/bev-dichte-m2.png", legend: "legends/bev-dichte-m2.png", title: "Bevölkerungsdichte pro m²", description: "Dichte der Bevölkerung pro Quadratmeter.", source: "Stadt Gelsenkirchen", year: "2026" },
  "siedlungsdichte": { file: "maps/siedlungsdichte.png", legend: "legends/siedlungsdichte.png", title: "Siedlungsdichte", description: "Verteilung der Siedlungsdichte.", source: "Stadt Gelsenkirchen", year: "2026" },
  "bev-mig": { file: "maps/bev-mig.png", legend: "legends/bev-mig.png", title: "Bevölkerungsverteilung mit Migrationshintergrund", description: "Verteilung der Bevölkerung mit Migrationshintergrund.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-mig": { file: "maps/anteil-mig.png", legend: "legends/anteil-mig.png", title: "Anteil BEV mit Migrationshintergrund", description: "Prozentualer Anteil der Bevölkerung mit Migrationshintergrund.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-u18-mig": { file: "maps/anteil-u18-mig.png", legend: "legends/anteil-u18-mig.png", title: "Anteil BEV unter 18 Jahre mit Migrationshintergrund", description: "Minderjährigenanteil mit Migrationshintergrund.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-geborene-mig": { file: "maps/anteil-geborene-mig.png", legend: "legends/anteil-geborene-mig.png", title: "Anteil Lebendgeborene mit Migrationshintergrund", description: "Anteil neugeborener Kinder mit Migrationshintergrund.", source: "Stadt Gelsenkirchen", year: "2026" },
  "zuwanderung-ausland": { file: "maps/zuwanderung-ausland.png", legend: "legends/zuwanderung-ausland.png", title: "Zuwanderung aus dem Ausland", description: "Räumliche Verteilung der Zuwanderung aus dem Ausland.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-u6": { file: "maps/anteil-u6.png", legend: "legends/anteil-u6.png", title: "Bevölkerungsanteil unter 6 Jahre", description: "Anteil der unter 6-jährigen Kinder.", source: "Stadt Gelsenkirchen", year: "2026" },
  "u18": { file: "maps/u18.png", legend: "legends/u18.png", title: "Bevölkerungsanteil unter 18 Jahre", description: "Minderjährigenquote nach Quartieren.", source: "Stadt Gelsenkirchen", year: "2026" },
  "jugendquotient": { file: "maps/jugendquotient.png", legend: "legends/jugendquotient.png", title: "Jugendquotient", description: "Verhältnis der Jugend zur erwerbsfähigen Bevölkerung.", source: "Stadt Gelsenkirchen", year: "2026" },
  "u65": { file: "maps/u65.png", legend: "legends/u65.png", title: "Bevölkerungsanteil 65 Jahre und älter", description: "Anteil der älteren Bevölkerung ab 65 Jahren.", source: "Stadt Gelsenkirchen", year: "2026" },
  "altenquotient": { file: "maps/altenquotient.png", legend: "legends/altenquotient.png", title: "Altenquotient", description: "Verhältnis älterer Menschen zur erwerbsfähigen Bevölkerung.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-hochaltrige": { file: "maps/anteil-hochaltrige.png", legend: "legends/anteil-hochaltrige.png", title: "Bevölkerungsanteil Hochaltrige", description: "Demografische Verteilung der Hochaltrigen.", source: "IT.NRW / MEDPROG", year: "2026" },
  "familienanteil-hh": { file: "maps/familienanteil-hh.png", legend: "legends/familienanteil-hh.png", title: "Familienanteil an allen Haushalten", description: "Anteil von Familienhaushalten.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-kinderreiche-fam": { file: "maps/anteil-kinderreiche-fam.png", legend: "legends/anteil-kinderreiche-fam.png", title: "Anteil kinderreicher Familien an allen Haushalten", description: "Verteilung kinderreicher Familienhaushalte.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-single-hh": { file: "maps/anteil-single-hh.png", legend: "legends/anteil-single-hh.png", title: "Anteil Singlehaushalte", description: "Räumliche Verteilung von Einpersonenhaushalten.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-hochaltrige-single-80plus": { file: "maps/anteil-hochaltrige-single-80plus.png", legend: "legends/anteil-hochaltrige-single-80plus.png", title: "Anteil hochaltrige Singlehaushalte (über 80 Jahre)", description: "Singlehaushalte mit Bezugsperson über 80 Jahre.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-hochaltrige-single": { file: "maps/anteil-hochaltrige-single.png", legend: "legends/anteil-hochaltrige-single.png", title: "Anteil hochaltrige Singlehaushalte", description: "Verteilung hochaltriger Singles an allen Singlehaushalten.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-ae-hh": { file: "maps/anteil-ae-hh.png", legend: "legends/anteil-ae-hh.png", title: "Anteil Alleinerziehender an allen Familien-Haushalten", description: "Verteilung von Alleinerziehenden.", source: "Stadt Gelsenkirchen", year: "2026" },
  "bev-entw-3j": { file: "maps/bev-entw-3j.png", legend: "legends/bev-entw-3j.png", title: "Bevölkerungsentwicklung in den vergangenen 3 Jahren", description: "Kurzfristige demografische Dynamik.", source: "Stadt Gelsenkirchen", year: "2026" },
  "bev-entw-10j": { file: "maps/bev-entw-10j.png", legend: "legends/bev-entw-10j.png", title: "Bevölkerungsentwicklung in den vergangenen 10 Jahren", description: "Langfristige demografische Dynamik.", source: "Stadt Gelsenkirchen", year: "2026" },
  "anteil-svb": { file: "maps/anteil-svb.png", legend: "legends/anteil-svb.png", title: "Anteil sozialversicherungspflichtig Beschäftigte", description: "Beschäftigtenquote nach Wohnort.", source: "Bundesagentur für Arbeit", year: "2026" },
  "sgb-ii-quote": { file: "maps/sgb-ii-quote.png", legend: "legends/sgb-ii-quote.png", title: "SGB-II-Quote", description: "Räumliche Verteilung der SGB-II-Quote.", source: "IT.NRW", year: "2026" }
};

const SERVICE_MAPS = {
  "hausarzt": { file: "maps/hausarzt.png", legend: "legends/hausarzt.png", title: "Hausärztliche Versorgung", description: "Standorte von Hausärzten.", source: "KVWL", year: "2026" },
  "kinderarzt": { file: "maps/kinderarzt.png", legend: "legends/kinderarzt.png", title: "Kinderärztliche Versorgung", description: "Standorte von Kinderärzten.", source: "KVWL", year: "2026" },
  "psychotherapie": { file: "maps/psychotherapie.png", legend: "legends/psychotherapie.png", title: "Psychotherapeutische Versorgung", description: "Standorte niedergelassener Psychotherapeuten.", source: "KVWL", year: "2026" },
  "rettungsdienst": { file: "maps/rettungsdienst.png", legend: "legends/rettungsdienst.png", title: "Rettungsdienstliche Versorgung", description: "Standorte des Rettungsdienstes.", source: "Stadt Gelsenkirchen", year: "2026" }
};
