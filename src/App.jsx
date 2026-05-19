import React, { useState, useEffect } from 'react';
import { 
  FaBriefcase, FaCode, FaLeaf, FaEnvelope, FaCalendarAlt, 
  FaClock, FaArrowLeft
} from "react-icons/fa";

// 🔹 IMPORTATION DU FICHIER JSON ET DU HUB D'ARTICLES
import portfolioData from './portfolioData.json';
import { postContents } from './posts';

const images = ["images/profile1.png", "images/profile2.png", "images/profile3.png"];
const typewriterWords = ["Engineer", "Analyst", "Steward", "Enthusiast"];

function App() {
  const [imgIdx, setImgIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("bi");
  
  // Contient l'objet de métadonnées de l'article actif + son contenu injecté
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setImgIdx(idx => (idx + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const currentWord = typewriterWords[wordIdx];
    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentWord.length) {
        setCurrentText(currentWord.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setCurrentText(currentWord.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (!isDeleting && charIdx === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setWordIdx((wordIdx + 1) % typewriterWords.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx]);

  // Fonction pour ouvrir un article en liant les métadonnées du JSON et son fichier de contenu
  const handleOpenArticle = (post) => {
    const content = postContents[post.id] || [];
    setActiveArticle({ ...post, content });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#1A2E26] selection:bg-[#059669] selection:text-white font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span onClick={() => setActiveArticle(null)} className="cursor-pointer font-black text-[#059669] text-lg uppercase tracking-tighter flex items-center gap-2">
            <FaLeaf /> Camille.L
          </span>
          <div className="flex gap-6 text-[10px] font-black text-[#64748B] uppercase tracking-widest">
            <a href="#skills" onClick={() => setActiveArticle(null)} className="hover:text-[#059669]">Skills</a>
            <a href="#blog" className="hover:text-[#059669]">Blog</a>
            <a href="#contact" className="hover:text-[#059669]">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-24 space-y-28">
        
        {!activeArticle ? (
          <>
            {/* HERO SECTION */}
            <section id="intro" className="flex flex-col items-center text-center space-y-8">
              <div className="relative w-56 h-[19rem] rounded-[3rem] overflow-hidden shadow-xl bg-slate-200">
                {images.map((src, i) => (
                  <img key={i} src={src} alt="Profile" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgIdx === i ? 'opacity-100' : 'opacity-0'}`} />
                ))}
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F172A]">{portfolioData.profile.name}</h1>
                <div className="h-8 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-mono font-bold text-[#64748B]">Data <span className="text-[#059669]">{currentText}</span>_</span>
                </div>
                <p className="text-[#475569] leading-relaxed text-lg font-medium max-w-md mx-auto">
                  {portfolioData.profile.description}
                </p>
              </div>
              <div className="flex gap-4 justify-center w-full max-w-xs">
                <a href="#contact" className="flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white w-full py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95">
                  <FaEnvelope /> Let's Connect
                </a>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Compétences</h2>
                <div className="h-1 flex-1 bg-[#E2E8F0] rounded-full"></div>
              </div>
              <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                {portfolioData.skillCategories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveSkillCat(cat.id)} className={`px-5 py-2.5 rounded-xl font-black text-xs border-2 transition-all ${activeSkillCat === cat.id ? 'bg-[#059669] border-[#059669] text-white' : 'bg-white border-[#E2E8F0] text-[#64748B]'}`}>{cat.label}</button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.skillCategories.find(c => c.id === activeSkillCat).skills.map(skill => (
                  <div key={skill} className="bg-white border-2 border-[#E2E8F0] p-4 rounded-xl flex items-center gap-3 shadow-sm">
                    <span className="text-[#059669] font-black">✓</span>
                    <span className="font-bold text-xs md:text-sm text-[#0F172A]">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {/* SECTION BLOG */}
        <section id="blog" className="space-y-8">
          {!activeArticle ? (
            <>
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Blog & Tutos</h2>
                <div className="h-1 flex-1 bg-[#E2E8F0] rounded-full"></div>
              </div>
              <div className="space-y-6">
                {portfolioData.blogPosts.map((post) => (
                  <article key={post.id} onClick={() => handleOpenArticle(post)} className="bg-white border-2 border-[#E2E8F0] p-6 rounded-[2rem] space-y-4 hover:border-[#059669] transition-all group cursor-pointer shadow-sm">
                    <div className="flex gap-4 text-[10px] font-black text-[#64748B] uppercase tracking-wider">
                      <span className="bg-slate-100 px-2 py-1 rounded text-[#059669]">{post.category}</span>
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                    </div>
                    <h3 className="font-black text-xl text-[#0F172A] group-hover:text-[#059669] transition-colors">{post.title}</h3>
                    <p className="text-[#475569] text-sm font-medium leading-relaxed">{post.summary}</p>
                    <div className="flex gap-2">
                      {post.tags.map(t => <span key={t} className="text-[9px] font-black text-slate-400">#{t}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            /* --- VUE ARTICLE SEUL --- */
            <div className="space-y-6 animate-in fade-in duration-300">
              <button onClick={() => setActiveArticle(null)} className="flex items-center gap-2 text-xs font-black uppercase text-[#64748B] hover:text-[#059669] transition-colors pb-4">
                <FaArrowLeft /> Retour aux articles
              </button>
              
              <div className="space-y-2">
                <span className="bg-[#E0F2FE] text-[#0369A1] font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">{activeArticle.category}</span>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#0F172A] leading-tight">{activeArticle.title}</h1>
                <div className="flex gap-4 text-xs font-bold text-[#94A3B8] pt-2">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FaClock /> {activeArticle.readTime}</span>
                </div>
              </div>

              {/* Rendu dynamique selon la police de l'article */}
              <div className={`space-y-6 text-[#334155] leading-relaxed text-base md:text-lg ${activeArticle.fontFamily}`}>
                {activeArticle.content.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <p key={index} className="font-medium">{block.text}</p>;
                  }
                  if (block.type === "heading") {
                    return <h2 key={index} className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] pt-4">{block.text}</h2>;
                  }
                  if (block.type === "image") {
                    return (
                      <div key={index} className="space-y-2 py-2">
                        <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white p-2 shadow-sm">
                          <img src={block.src} alt={block.alt} className="w-full h-auto object-cover rounded-xl" />
                        </div>
                        {block.caption && <p className="text-center text-xs font-bold text-[#94A3B8] italic">{block.caption}</p>}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              
              <button onClick={() => { setActiveArticle(null); window.scrollTo(0,0); }} className="flex items-center gap-2 text-xs font-black uppercase bg-white border-2 border-[#E2E8F0] px-5 py-3 rounded-xl hover:border-[#059669] transition-colors mt-8">
                <FaArrowLeft /> Fermer l'article
              </button>
            </div>
          )}
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="pt-12">
          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-10 text-white space-y-8 shadow-xl">
            <h2 className="text-3xl font-black tracking-tighter italic">Parlons de vos projets.</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center border-t border-white/10 pt-8 text-sm font-bold">
              <a href={`mailto:${portfolioData.profile.email}`} className="hover:text-[#059669] transition-colors underline underline-offset-4">{portfolioData.profile.email}</a>
              <div className="flex gap-4">
                <a href={portfolioData.profile.linkedin} className="text-slate-400 hover:text-white">LinkedIn</a>
                <a href={portfolioData.profile.github} className="text-slate-400 hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;