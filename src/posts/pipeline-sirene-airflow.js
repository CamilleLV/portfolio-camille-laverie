export const pipelineSireneAirflowContent = [
  { type: "heading", text: "Projet Data Quality & Gouvernance - Données SIRENE" },
  { type: "paragraph", text: "Ce projet a été réalisé dans le cadre de notre cursus académique. Il vise à mettre en œuvre une architecture Data Engineering complète pour l'ingestion, le nettoyage, la validation et le monitoring de la qualité des données (Data Quality) du répertoire SIRENE (INSEE)." },

  { type: "heading", text: "Auteurs" },
  { type: "paragraph", text: "Projet réalisé par :" },
  { type: "bullet-list", items: ["Camille LAVERIE", "Charlène BROUTIER"] },

  { type: "heading", text: "Structure du Projet" },
  { type: "paragraph", text: "Voici l'organisation détaillée des fichiers et dossiers du repository :" },
  {
    type: "code", language: "markdown", code: `
.
├── .env                                    # Variables d'environnement
├── .gitignore                              # Fichiers ignorés par Git
├── docker-compose.yaml                     # Configuration principale de la stack Docker
├── Dockerfile                              # Image Docker personnalisée
├── requirements.txt                        # Dépendances Python
├── Etude-de-Cas...Donnees.pdf              # Sujet du projet
├── INSTALLATION_ET_PRISE_EN_MAIN.pdf       # Guide d'installation rapide
├── README.md                               # Documentation (Ce fichier)
│
├── Rapports/                               # Rapports détaillés par phase
│   ├── 1_Choix_Du_Dataset.pdf
│   ├── 2_Exploration_Avec_Jupyter.pdf
│   ├── 3_Les_Pilliers_De_La_Data_Quality.pdf
│   ├── 4_Validation_Avec_Great_Expectations.pdf
│   ├── 5_Dataviz_Des_KPI_De_Data_Quality_Avec_Superset.pdf
│   ├── 6_Gouvernance_Avec_OpenMetadata.pdf
│   └── 7_Orchestration_Et_Automatisation_Avec_Airflow.pdf
│
├── dags/                                   # Orchestration Airflow
│   └── data_quality_pipeline.py            # DAG principal (Ingest -> Clean -> Validate)
│
├── dashboards_superset/                    # Exports des Dashboards
│   └── dashboard_export_20260204.zip       # Backup de la configuration Superset
│
├── data/                                   # Données
│   ├── create_sample.py                    # Script de génération d'échantillon
│   ├── StockEtablissement_utf8_100000.csv  # Échantillon de travail (Source)
│   └── StockEtablissement_utf8_sample.csv
│
├── init_db/                                # Initialisation Base de Données
│   └── init.sql                            # Scripts SQL de création des users/DBs
│
├── notebooks/                              # Analyse et Explorations
│   ├── Data_Quality_Profiling.ipynb        # Audit automatique (YData Profiling)
│   ├── exploration_manuelle.ipynb          # Analyse métier approfondie
│   ├── dq_metrics.ipynb                    # Génération des métriques pour le monitoring
│   ├── Great_Expectations.ipynb            # Tests de validation GX
│   ├── rapport_exploration_sirene.html     # Rapport HTML généré
│   └── validation_results.json             # Résultats bruts de validation
│
└── scripts/                                # Scripts ETL appelés par Airflow
    ├── ingest_data.py                      # Ingestion (Raw)
    ├── clean_data.py                       # Nettoyage et Standardisation
    └── validate_data.py                    # Validation Qualité (Great Expectations)`
  },

  { type: "heading", text: "Architecture Technique" },
  { type: "paragraph", text: "Le projet repose sur une architecture conteneurisée via Docker, orchestrant les services suivants :" },
  { type: "bullet-list", items: [
    "Ingestion & ETL : Scripts Python (Pandas) pour le traitement des CSV.", 
    "Orchestration : Apache Airflow (Port 8090) pour planifier les tâches.",
    "Data Warehouse : PostgreSQL (Port 5432) pour le stockage (Schemas raw et cleaned).",
    "Data Quality : Great Expectations pour la validation des règles métier.",
    "Monitoring & BI : Apache Superset (Port 8088) pour les dashboards de qualité."
  ] },

  { 
  type: "link", 
  text: "Voir le dépôt GitHub du projet", 
  url: "https://github.com/CamilleLV/LYON2_Data_Quality" 
  }
  ];