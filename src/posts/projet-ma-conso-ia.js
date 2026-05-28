export const maConsoIaContent = [
  { type: "heading", text: "Projet : Ma Conso IA - Mesurez l'empreinte de vos LLMs" },
  { type: "paragraph", text: "Par intérêt pour la BI Engagée et l'éthique de la donnée, j'ai développé un outil de sensibilisation interactif. Ce mini-site permet d'estimer l'empreinte carbone et hydrique de notre utilisation quotidienne des intelligences artificielles génératives (ChatGPT, Claude, Gemini). Le but est de dé-mystifier l'impact environnemental de notre utilisation des LLMs, et se rendre compte que l'impcat est beaucoup plus faible que le streaming vidéo ou la consommation de viande." },
  
  { type: "heading", text: "L'Approche \"Privacy-First\"" },
  { type: "paragraph", text: "La principale contrainte technique de ce projet était de garantir la confidentialité absolue des historiques de conversation des utilisateurs et sans aucun serveur backend. L'application a donc été pensée de manière totalement décentralisée." },
  
  { type: "heading", text: "Fonctionnalités & Technologies" },
  { type: "bullet-list", items: [
    "Traitement en mémoire vive : Utilisation de la librairie JSZip pour décompresser et analyser les archives volumineuses directement dans le navigateur.",
    "Pipeline ETL local : Extraction des fichiers JSON, transformation et calcul des métriques (estimation des tokens et décompte des images générées).",
    "Sensibilisation par équivalence : Traduction des grammes de CO₂ et de l'eau consommée en repères visuels compréhensibles (kilomètres en voiture, streaming vidéo).",
    "Design System : UI/UX inspirée des plateformes de service public (type 'Nos Gestes Climat') développée avec Tailwind CSS pour maximiser la lisibilité."
  ] },

  { type: "heading", text: "Aperçu du moteur d'analyse local" },
  { type: "paragraph", text: "Voici un extrait de la logique permettant d'inspecter l'archive zip à la volée pour séparer l'impact du texte de celui de la génération d'images :" },
  {
    type: "code", language: "javascript", code: `
// Lecture de l'archive fournie par l'utilisateur sans upload serveur
const zip = new JSZip();
const contents = await zip.loadAsync(file);

let totalTokens = 0;
let totalImages = 0;

// Parcours asynchrone des fichiers de l'archive
for (const [filename, zipEntry] of Object.entries(contents.files)) {
    if (zipEntry.dir) continue;

    // Détection et analyse des historiques JSON/Texte
    if (filename.match(/\\.(json|html|txt|csv)$/i)) {
        const text = await zipEntry.async("text");
        // Estimation métier : ~4 caractères = 1 token
        totalTokens += Math.floor(text.length / 4);
    }
    // Détection des médias générés (fort impact carbone)
    else if (filename.match(/\\.(png|jpe?g|webp|gif)$/i)) {
        totalImages += 1;
    }
}`
  },

  { type: "heading", text: "Essayez par vous-même" },
  { type: "paragraph", text: "Exportez vos données depuis les paramètres de votre IA favorite et venez calculer votre bilan :" },
  { 
    type: "link", 
    text: "↗ Lancer le simulateur Ta Conso IA", 
    url: "/ma-conso-ia/index.html" 
  }
];