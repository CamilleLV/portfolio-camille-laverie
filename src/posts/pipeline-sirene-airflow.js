export const pipelineSireneAirflowContent = [
  { type: "paragraph", text: "L'orchestration de pipelines de données volumineuses demande une infrastructure résiliente. Dans ce tutoriel, nous allons automatiser la récupération du dataset SIRENE." },
  { type: "image", src: "images/certif_columbia_IA.png", alt: "Aperçu pipeline", caption: "Schéma d'intégration des flux de données." },
  { type: "heading", text: "Pourquoi choisir Airflow et Docker ?" },
  { type: "paragraph", text: "Docker garantit l'isolement de nos scripts de nettoyage (Pandas/SQL), tandis qu'Airflow gère les alertes en cas d'échec et la reprise des tâches (retries)." }
];