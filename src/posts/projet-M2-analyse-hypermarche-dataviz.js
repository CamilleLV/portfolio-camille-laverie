export const projetM2AnalyseHypermarcheDatavizContent = [
  { 
    type: "paragraph", 
    text: "Dans le cadre de mon Master 2 Business Intelligence & Analytics, cette étude de cas retrace l'intégralité de la démarche décisionnelle (BI) appliquée au modèle HYPERMARCHE : depuis l'alimentation brute jusqu'au déploiement de tableaux de bord avancés sous Power BI." 
  },
  { type: "image", src: "images/projet_M2_DataViz_Screen_Acceuil.png", alt: "Capture d'écran de la page d'acceuil du rapport PBI final", caption: "Figure 1 : Capture d'écran de la page d'acceuil du rapport PBI final" },
  { 
    type: "heading", 
    text: "1. Préparation des données & Web Scraping" 
  },
  { 
    type: "paragraph", 
    text: "Une attention particulière a été portée à la qualité de la dimension Temporelle. En plus de la création d'une table Calendrier dynamique en DAX, le modèle intègre une récupération automatisée (Web Scraping d'une page publique) des jours fériés français. Cela permet d'isoler l'impact des jours chômés sur les pics de ventes de l'hypermarché." 
  },
  { 
    type: "heading", 
    text: "2. Modélisation en Étoile (Star Schema)" 
  },
  { 
    type: "paragraph", 
    text: "Le cœur du système repose sur un schéma en étoile optimisé pour les performances du moteur VertiPaq. La table de faits centrale (Ventes) est connectée aux dimensions clés : Clients, Géographie, Produits, Gestionnaires et Calendrier, évitant ainsi les relations ambiguës ou les flous de granularité." 
  },
  { 
    type: "heading", 
    text: "3. Datavisualisation & Analytics Avancé" 
  },
  { 
    type: "paragraph", 
    text: "Le rapport final est découpé en plusieurs pages d'analyse stratégique : Synthèse des indicateurs financiers (Marges, Profits, Évolutions), performance des Points de vente, analyse des remises accordées et segmentation Produits. Un module de Machine Learning (Clustering natif) a été implémenté pour classer les clients en 3 groupes distincts basés sur le ratio Quantités / Profits, appuyé par des visualisations en boîte à moustaches (Boxplot) pour l'analyse des dispersions." 
  },
  { 
    type: "heading", 
    text: "Accéder aux ressources du projet" 
  },
  { 
    type: "paragraph", 
    text: "Le code complet des mesures DAX, la structure du modèle décisionnel ainsi que le fichier de rapport (.pbix) sont disponibles sur mon dépôt GitHub." 
  },
  { 
  type: "link", 
  text: "Voir le dépôt GitHub du projet", 
  url: "https://github.com/CamilleLV/LYON2_Analyse_Et_Datavisualisation" 
  }
];