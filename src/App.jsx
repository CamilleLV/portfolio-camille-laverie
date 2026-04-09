import React, { useState, useEffect } from 'react';
/* Importation via React-Icons (plus robuste pour le build) */
import { FaLinkedin, FaGithub, FaFileDownload, FaEnvelope, FaLeaf } from 'react-icons/fa';
import { SiPowerbi, SiPython, SiSnowflake, SiSqlite } from 'react-icons/si';

// --- CONFIGURATION ---
const images = [
  "/images/photo1.jpg", 
  "/images/photo2.jpg",
  "/images/photo3.jpg"
];

const typewriterWords = ["Engineer", "Enthusiast"];

const skillCategories = [
  { id: "bi", label: "BI & Analysis", icon: <SiPowerbi />, skills: ["Power BI", "Dataiku", "Tableau", "DAX", "ETL"] },
  { id: "eng", label: "Data Engineering", icon: <SiSqlite />, skills: ["SQL", "MongoDB", "Snowflake", "Modeling"] },
  { id: "ds", label: "Data Science", icon: <SiPython />, skills: ["Python", "Machine Learning", "NLP", "Pipelines"] }
];

const data = {
  profile: {
    name: "Camille Laverie",
    role: "Data Professional",
    description: "Data Enjoyer, 3 years Data Manager Assistant at Cyclable! Seeking V.I.E Opportunities.",
    email: "camille.laverie@exemple.com",
    linkedin: "https://linkedin.com/in/camillelaverie",
    github: "https://github.com/CamilleLV"
  }
};

function App() {
  const [imgIdx, setImgIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("bi");

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

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#1A2E26] selection:bg-[#059669] selection:text-white font-sans overflow-x-hidden">
      
      {/* HEADER ZOOMÉ */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-8 h-24 flex items-center justify-between">
          <span className="font-black flex items-center gap-3 text-[#059669] text-2xl uppercase tracking-tighter">
            <FaLeaf size={28} /> Camille.L
          </span>
          <div className="flex gap-10 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">
            <a href="#skills" className="hover:text-[#059669] transition-all">Skills</a>
            <a href="#contact" className="hover:text-[#059669] transition-all">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-8 pt-40 pb-32 space-y-48">
        
        {/* HERO SECTION */}
        <section id="intro" className="flex flex-col items-center text-center space-y-14">
          
          {/* PHOTO PORTRAIT SANS BORD BLANC */}
          <div className="relative w-72 h-[26rem] md:w-96 md:h-[34rem] rounded-[4rem] overflow-hidden shadow-2xl bg-slate-200">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Profile"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgIdx === i ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#0F172A]">
              Salut ! <br/> Je suis <span className="text-[#059669]">{data.profile.name}</span>
            </h1>
            
            <div className="h-12 flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-mono font-bold text-[#64748B]">
                Data <span className="text-[#059669]">{currentText}</span>
                <span className="animate-pulse ml-2 text-[#059669]">_</span>
              </span>
            </div>

            <p className="text-[#475569] leading-relaxed text-2xl font-medium max-w-xl mx-auto">
              {data.profile.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full px-4">
            <button className="flex items-center justify-center gap-4 bg-[#059669] hover:bg-[#047857] text-white px-12 py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-emerald-200 active:scale-95 flex-1 md:flex-none">
              <FaFileDownload size={24} /> Mon CV
            </button>
            <a href="#contact" className="flex items-center justify-center gap-4 bg-white border-4 border-[#E2E8F0] hover:border-[#059669] text-[#0F172A] px-12 py-6 rounded-[2rem] font-black text-xl transition-all active:scale-95 flex-1 md:flex-none">
              <FaEnvelope size={24} /> Contact
            </a>
          </div>
        </section>

        {/* SECTION SKILLS */}
        <section id="skills" className="space-y-16">
          <div className="flex items-center gap-8">
            <h2 className="text-5xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Skills</h2>
            <div className="h-2 flex-1 bg-[#E2E8F0] rounded-full"></div>
          </div>

          <div className="flex overflow-x-auto gap-5 pb-6 no-scrollbar">
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveSkillCat(cat.id)}
                className={`flex items-center gap-4 px-8 py-4 rounded-3xl font-black whitespace-nowrap transition-all text-lg border-4
                  ${activeSkillCat === cat.id 
                    ? 'bg-[#059669] border-[#059669] text-white shadow-xl shadow-emerald-100' 
                    : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#059669]'}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {skillCategories.find(c => c.id === activeSkillCat).skills.map(skill => (
              <div key={skill} className="bg-white border-4 border-[#E2E8F0] p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-[#059669] transition-all group shadow-sm">
                <div className="text-4xl text-[#059669] mb-6 group-hover:scale-110 transition-transform">
                  {skillCategories.find(c => c.id === activeSkillCat).icon}
                </div>
                <span className="font-black text-lg uppercase tracking-wider text-[#0F172A]">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="pb-16">
          <div className="bg-[#0F172A] rounded-[4rem] p-16 text-white space-y-14 shadow-3xl relative overflow-hidden">
            <div className="space-y-6">
              <h2 className="text-6xl font-black tracking-tighter italic leading-none">Parlons <br/> de vos données.</h2>
              <p className="text-emerald-400 text-2xl font-bold uppercase tracking-widest">Basé à Lyon — Mobile</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between border-t border-white/10 pt-12">
              <a href={`mailto:${data.profile.email}`} className="text-3xl font-black hover:text-[#059669] transition-all flex items-center gap-5">
                <FaEnvelope size={36} className="text-[#059669]" /> {data.profile.email}
              </a>
              <div className="flex gap-8">
                <a href={data.profile.linkedin} className="p-7 bg-white/5 rounded-[2.5rem] hover:bg-[#059669] transition-all shadow-lg active:scale-90">
                  <FaLinkedin size={36} />
                </a>
                <a href={data.profile.github} className="p-7 bg-white/5 rounded-[2.5rem] hover:bg-[#059669] transition-all shadow-lg active:scale-90">
                  <FaGithub size={36} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center py-24 text-xs text-[#94A3B8] font-black uppercase tracking-[0.4em] border-t border-[#E2E8F0]">
        © 2026 — Camille Laverie — Carbon Optimized
      </footer>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}

export default App;