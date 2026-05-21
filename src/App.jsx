import React, { useState, useEffect } from 'react';
import {
  FaBriefcase, FaCode, FaLeaf, FaEnvelope, FaCalendarAlt,
  FaClock, FaArrowLeft, FaExternalLinkAlt
} from "react-icons/fa";

// 🔹 IMPORTATION DU FICHIER JSON ET DU HUB D'ARTICLES
import portfolioData from './portfolioData.json';
import { postContents } from './posts';

const images = ["images/profile1.png", "images/profile2.png", "images/profile3.png"];
const typewriterWords = ["Engineer", "Enthusiast"];

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

  // Fonction pour charger dynamiquement le contenu d'un article au clic
  const handleOpenArticle = (post) => {
    const content = postContents[post.id] || [];
    setActiveArticle({ ...post, content });
    window.scrollTo(0, 0); // Remonte en haut de page
  };

  return (
    // FOND VIVANT EN DÉGRADÉ LUMINEUX
    <div className="min-h-screen bg-gradient-to-tr from-[#E6F4EA] via-[#F4FBF7] to-[#F8FAFC] text-[#11221B] selection:bg-[#059669] selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* BARRE DE NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-2xl border-b border-[#D1FAE5]">
        <div className="max-w-4xl mx-auto px-8 h-20 flex items-center justify-between">
          <span 
            onClick={() => setActiveArticle(null)} 
            className="cursor-pointer font-black text-[#059669] text-2xl uppercase tracking-tighter flex items-center gap-2.5"
          >
            <FaLeaf size={22} /> Camille.L
          </span>
          <div className="flex gap-8 text-xs md:text-sm font-black text-[#475569] uppercase tracking-widest">
            <a href="#skills" onClick={() => setActiveArticle(null)} className="hover:text-[#059669] transition-colors">Skills</a>
            <a href="#blog" className="hover:text-[#059669] transition-colors">Blog</a>
            <a href="#contact" className="hover:text-[#059669] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-8 pt-36 pb-32 space-y-36 md:space-y-44">
        
        {!activeArticle ? (
          <>
            {/* HERO SECTION */}
            <section id="intro" className="flex flex-col items-center text-center space-y-10">
              <div className="relative w-64 h-[22rem] md:w-72 md:h-[25rem] rounded-[3.5rem] overflow-hidden shadow-2xl bg-emerald-50 border-4 border-white">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Profile"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgIdx === i ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-tight">
                  {portfolioData.profile.name}
                </h1>
                <div className="h-10 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-mono font-bold text-[#475569]">
                    Data <span className="text-[#059669]">{currentText}</span>_
                  </span>
                </div>
                <p className="text-[#334155] leading-relaxed text-xl font-semibold max-w-xl mx-auto px-2">
                  {portfolioData.profile.description}
                </p>
              </div>

              <div className="flex gap-5 justify-center w-full max-w-md pt-2">
                <a 
                  href="#contact" 
                  className="flex items-center justify-center gap-3 bg-[#059669] hover:bg-[#047857] text-white w-full py-5 rounded-2xl font-black text-base transition-all shadow-xl shadow-emerald-700/10 active:scale-95"
                >
                  <FaEnvelope size={18} /> Let's Connect
                </a>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="space-y-10">
              <div className="flex items-center gap-5">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Compétences</h2>
                <div className="h-1.5 flex-1 bg-[#D1FAE5] rounded-full"></div>
              </div>
              
              {/* 💅 LE FAMEUX SLIDER AVEC LA CLASSE custom-scrollbar */}
              <div className="flex overflow-x-auto gap-3 pb-6 custom-scrollbar snap-x">
                {portfolioData.skillCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSkillCat(cat.id)}
                    className={`px-6 py-4 rounded-xl font-black text-sm border-2 transition-all shrink-0 snap-start active:scale-95 duration-200 ${
                      activeSkillCat === cat.id 
                        ? 'bg-[#059669] border-[#059669] text-white shadow-lg shadow-emerald-900/10' 
                        : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#059669]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.skillCategories.find(c => c.id === activeSkillCat).skills.map(skill => {
                  const isExpert = skill.level === "Expert";
                  const isNotion = skill.level === "Notions";

                  return (
                    <div 
                      key={skill.name} 
                      className={`bg-white border-2 p-5 rounded-2xl flex items-center justify-between transition-all shadow-md hover:shadow-lg ${
                        isExpert ? "border-[#059669] bg-emerald-50/5" : isNotion ? "border-slate-100/70 opacity-60" : "border-[#E2E8F0]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-black text-base ${isExpert ? "text-[#059669]" : isNotion ? "text-slate-300" : "text-[#059669]/70"}`}>✓</span>
                        <span className={`font-black text-sm md:text-base ${isNotion ? "text-slate-500 font-semibold" : "text-[#0F172A]"}`}>{skill.name}</span>
                      </div>
                      <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded ${
                        isExpert ? "bg-[#059669] text-white" : isNotion ? "bg-slate-100 text-slate-400" : "bg-slate-100 text-slate-600"
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : null}

        {/* BLOG SECTION */}
        <section id="blog" className="space-y-10">
          {!activeArticle ? (
            <>
              <div className="flex items-center gap-5">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Blog & Tutos</h2>
                <div className="h-1.5 flex-1 bg-[#D1FAE5] rounded-full"></div>
              </div>

              <div className="space-y-8">
                {portfolioData.blogPosts.map((post) => (
                  <article 
                    key={post.id} 
                    onClick={() => handleOpenArticle(post)}
                    className="bg-white border-2 border-[#E2E8F0] p-7 md:p-8 rounded-[2.5rem] space-y-5 hover:border-[#059669] transition-all group cursor-pointer shadow-md hover:shadow-xl"
                  >
                    <div className="flex gap-4 text-xs font-black text-[#64748B] uppercase tracking-wider">
                      <span className="bg-emerald-50 text-[#059669] px-2.5 py-1 rounded">{post.category}</span>
                      <span className="flex items-center gap-1.5"><FaCalendarAlt /> {post.date}</span>
                    </div>
                    <h3 className="font-black text-2xl text-[#0F172A] group-hover:text-[#059669] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-[#475569] text-base md:text-lg font-medium leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map(t => (
                        <span key={t} className="text-[10px] font-black text-[#64748B] uppercase bg-slate-100 px-2.5 py-1 rounded">#{t}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-8 bg-white p-6 md:p-10 rounded-[2.5rem] border-2 border-[#E2E8F0] shadow-xl animate-in fade-in duration-300">
              <button 
                onClick={() => setActiveArticle(null)} 
                className="flex items-center gap-2 text-sm font-black uppercase text-[#64748B] hover:text-[#059669] transition-colors pb-2"
              >
                <FaArrowLeft /> Retour aux articles
              </button>
              
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <span className="bg-[#E0F2FE] text-[#0369A1] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-[#0F172A] leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="flex gap-4 text-sm font-bold text-[#94A3B8] pt-1">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><FaClock /> {activeArticle.readTime}</span>
                </div>
              </div>

              <div className={`space-y-8 text-[#1E293B] leading-relaxed text-lg md:text-xl ${activeArticle.fontFamily}`}>
                {activeArticle.content.map((block, index) => {
                  
                  if (block.type === "paragraph") {
                    return <p key={index} className="font-medium text-[#334155]">{block.text}</p>;
                  }
                  
                  if (block.type === "heading") {
                    return <h2 key={index} className="text-2xl md:text-3xl font-black tracking-tight text-[#0F172A] pt-4 italic">{block.text}</h2>;
                  }
                  
                  if (block.type === "image") {
                    return (
                      <div key={index} className="space-y-3 py-2">
                        <div className="rounded-[2rem] overflow-hidden border border-[#E2E8F0] bg-white p-3 shadow-md">
                          <img src={block.src} alt={block.alt} className="w-full h-auto object-cover rounded-2xl" />
                        </div>
                        {block.caption && <p className="text-center text-sm font-bold text-[#94A3B8] italic">{block.caption}</p>}
                      </div>
                    );
                  }

                  if (block.type === "code") {
                    return (
                      <div key={index} className="relative my-6 rounded-2xl overflow-hidden border border-[#1E293B] bg-[#0F172A] p-6 font-mono text-xs md:text-sm text-slate-200 shadow-xl">
                        <div className="absolute top-0 right-0 bg-[#1E293B] text-[#94A3B8] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                          {block.language || "code"}
                        </div>
                        <pre className="overflow-x-auto whitespace-pre custom-scrollbar">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    );
                  }

                  if (block.type === "bullet-list") {
                    return (
                      <ul key={index} className="list-none space-y-3.5 pl-2 my-4">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-base md:text-lg font-medium text-[#334155]">
                            <span className="text-[#059669] font-black mt-1">➔</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <div key={index} className="border-l-4 border-[#059669] bg-[#F0FDF4]/70 p-6 rounded-r-2xl italic my-5 text-base md:text-lg font-semibold text-[#1A2E26]">
                        "{block.text}"
                      </div>
                    );
                  }

                  if (block.type === "link") {
                    return (
                      <div key={index} className="py-2 flex justify-center sm:justify-start">
                        <a 
                          href={block.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-3 bg-white border-2 border-[#E2E8F0] hover:border-[#059669] text-[#0F172A] hover:text-[#059669] px-7 py-4 rounded-xl font-black text-base transition-all shadow-md active:scale-95 group"
                        >
                          <span>{block.text}</span>
                          <span className="text-[#64748B] group-hover:text-[#059669] font-normal">↗</span>
                        </a>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              <button 
                onClick={() => { setActiveArticle(null); window.scrollTo(0, 0); }} 
                className="flex items-center gap-2 text-sm font-black uppercase bg-[#0F172A] text-white px-6 py-4 rounded-xl hover:bg-[#059669] transition-colors mt-8 shadow-md"
              >
                <FaArrowLeft /> Fermer l'article
              </button>
            </div>
          )}
        </section>

        {/* 🌟 SECTION CONTACT AVEC TES MODIFICATIONS MANUELLES */}
        <section id="contact" className="pt-12">
          <div className="bg-[#0F172A] rounded-[3.5rem] p-10 md:p-14 text-white space-y-10 shadow-2xl relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-snug">
              À la recherche d'une mission orientée Data en CDI sur Lyon, ou d'un V.I.E, n'hésitez pas à me contacter !
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-t border-white/10 pt-10 text-base md:text-lg font-bold">
              <a 
                href={`mailto:${portfolioData.profile.email}`} 
                className="hover:text-[#059669] transition-colors underline underline-offset-4 decoration-[#059669] decoration-2"
              >
                {portfolioData.profile.email}
              </a>
              <div className="flex gap-6">
                <a href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                <a href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-16 text-xs text-[#94A3B8] font-black uppercase tracking-[0.3em] border-t border-[#D1FAE5]">
        © 2026 — Camille Laverie
      </footer>
      
      {/* 💅 STYLISATION DE LA SCROLLBAR : Fond transparent, Ovale vert */}
      <style>{`
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #059669 transparent; 
        }
        
        /* Chrome, Edge, Safari */
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #059669; 
          border-radius: 20px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #047857; 
        }
      `}</style>
    </div>
  );
}

export default App;