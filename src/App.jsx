import React, { useState, useEffect } from 'react';
import { 
  FaDatabase, FaChartPie, FaBrain, FaUsers, FaGraduationCap, FaBriefcase, 
  FaCode, FaLeaf, FaEnvelope, FaTrophy, FaAward, FaSearchPlus, FaTimes
} from "react-icons/fa";

// --- DONNÉES ---
const images = ["images/profile1.png", "images/profile2.png", "images/profile3.png"];
const typewriterWords = ["Engineer", "Analyst", "Steward", "Enthusiast"];

const certifications = [
  {
    title: "Learning AI Through Visualization",
    org: "Columbia+",
    image: "images/certif_columbia_IA.png",
    skills: ["Machine Learning", "LLMs"]
  },
  {
    title: "TOEIC (800/990)",
    org: "ETS",
    image: "images/TOEIC.png",
    skills: ["English", "Professional"]
  },
  {
    title: "EuroGames Academy Program",
    org: "EuroGames Lyon 2025",
    image: "images/EuroGames_Lyon2025.png",
    skills: ["Inclusivity", "Management"]
  }
];

const skillCategories = [
  { id: "bi", label: "BI & Analysis", skills: ["Power BI", "Dataiku", "Tableau", "DAX", "ETL"] },
  { id: "eng", label: "Data Engineering", skills: ["SQL", "NoSQL", "Snowflake", "Modeling", "HiveQL"] },
  { id: "ds", label: "Data Science", skills: ["Python", "Machine Learning", "NLP", "Pipelines", "KNIME"] }
];

const experience = [
  {
    title: "Data Manager Assistant",
    company: "Cyclable",
    period: "Aug 2023 — Today",
    desc: "Audit et nettoyage de bases de données, automatisation de process (API, MAKE), support ERP CeGid.",
    tags: ["Excel", "Python", "SQL", "API", "Make"]
  }
];

function App() {
  const [imgIdx, setImgIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("bi");
  const [selectedCert, setSelectedCert] = useState(null);

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
      
      {/* LIGHTBOX POUR LES CERTIFICATIONS */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10" onClick={() => setSelectedCert(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl hover:text-[#059669] transition-colors"><FaTimes /></button>
          <img src={selectedCert.image} alt={selectedCert.title} className="max-w-full max-h-full rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300" />
        </div>
      )}

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-black flex items-center gap-2 text-[#059669] text-lg uppercase tracking-tighter"><FaLeaf /> Camille.L</span>
          <div className="flex gap-4 md:gap-6 text-[9px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest">
            <a href="#skills" className="hover:text-[#059669]">Skills</a>
            <a href="#certifs" className="hover:text-[#059669]">Certifs</a>
            <a href="#exp" className="hover:text-[#059669]">Exp</a>
            <a href="#contact" className="hover:text-[#059669]">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-24 pb-24 space-y-24 md:space-y-32">
        
        {/* HERO SECTION */}
        <section id="intro" className="flex flex-col items-center text-center space-y-10">
          <div className="relative w-60 h-[21rem] rounded-[3rem] overflow-hidden shadow-xl bg-slate-200">
            {images.map((src, i) => (
              <img key={i} src={src} alt="Profile" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgIdx === i ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-[#0F172A]">Salut ! Je suis <span className="text-[#059669]">Camille Laverie</span></h1>
            <div className="h-10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-mono font-bold text-[#64748B]">Data <span className="text-[#059669]">{currentText}</span><span className="animate-pulse ml-2 text-[#059669]">_</span></span>
            </div>
            <p className="text-[#475569] leading-relaxed text-lg md:text-xl font-medium max-w-lg mx-auto">Data Enjoyer, 3 years Data Manager Assistant at Cyclable! Seeking V.I.E Opportunities.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
            <a href="resume.pdf" download className="flex items-center justify-center gap-2 bg-[#059669] text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 flex-1"><FaBriefcase /> Download CV</a>
            <a href="#contact" className="flex items-center justify-center gap-2 bg-white border-2 border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 flex-1"><FaEnvelope /> Contact</a>
          </div>
        </section>

        {/* SECTION SKILLS */}
        <section id="skills" className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Skills</h2>
            <div className="h-1 flex-1 bg-[#E2E8F0] rounded-full"></div>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {skillCategories.map(cat => (
              <button key={cat.id} onClick={() => setActiveSkillCat(cat.id)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black whitespace-nowrap transition-all text-xs border-2 ${activeSkillCat === cat.id ? 'bg-[#059669] border-[#059669] text-white' : 'bg-white border-[#E2E8F0] text-[#64748B]'}`}>{cat.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skillCategories.find(c => c.id === activeSkillCat).skills.map(skill => (
              <div key={skill} className="bg-white border-2 border-[#E2E8F0] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center hover:border-[#059669] transition-all group">
                <span className="font-black text-xs uppercase tracking-wider text-[#0F172A]">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CERTIFICATIONS */}
        <section id="certifs" className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Certifications</h2>
            <div className="h-1 flex-1 bg-[#E2E8F0] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-white border-2 border-[#E2E8F0] p-4 rounded-[2.5rem] flex flex-col gap-4 hover:border-[#059669] transition-all group cursor-pointer" onClick={() => setSelectedCert(cert)}>
                <div className="relative aspect-[33/25] overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FaSearchPlus className="text-white text-2xl" />
                  </div>
                </div>
                <div className="px-2 space-y-1">
                  <h3 className="font-black text-sm text-[#0F172A] leading-tight">{cert.title}</h3>
                  <p className="text-[#059669] font-bold text-[10px] uppercase tracking-widest">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION EXPERIENCE */}
        <section id="exp" className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-[#0F172A]">/ Experience</h2>
            <div className="h-1 flex-1 bg-[#E2E8F0] rounded-full"></div>
          </div>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="bg-white border-2 border-[#E2E8F0] p-8 rounded-[3rem] space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-black text-xl text-[#0F172A]">{exp.title}</h3>
                    <p className="text-[#059669] font-bold text-xs uppercase tracking-widest">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-black text-[#94A3B8] bg-slate-50 px-3 py-1 rounded-full uppercase italic">{exp.period}</span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed font-medium">{exp.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map(t => <span key={t} className="bg-emerald-50 text-[9px] font-black px-3 py-1.5 rounded-full text-[#059669] uppercase tracking-tighter">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="pb-12">
          <div className="bg-[#0F172A] rounded-[3.5rem] p-10 md:p-14 text-white space-y-12 shadow-2xl relative overflow-hidden">
            <h2 className="text-5xl font-black tracking-tighter italic leading-none">Parlons de <br/> vos données.</h2>
            <div className="flex flex-col lg:flex-row gap-10 items-start justify-between border-t border-white/10 pt-12">
              <a href={`mailto:camille.laverie@gmail.com`} className="text-xl md:text-2xl font-black hover:text-[#059669] transition-all flex items-center gap-4 break-all underline decoration-[#059669] underline-offset-8 decoration-4"><FaEnvelope /> camille.laverie@gmail.com</a>
              <div className="flex gap-6 self-end lg:self-center">
                <a href="https://linkedin.com/in/camillelaverie" className="p-5 bg-white/5 rounded-3xl hover:bg-[#059669] transition-all active:scale-90"><FaBriefcase className="text-2xl" /></a>
                <a href="https://github.com/CamilleLV" className="p-5 bg-white/5 rounded-3xl hover:bg-[#059669] transition-all active:scale-90"><FaCode className="text-2xl" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-20 text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.4em] border-t border-[#E2E8F0]">© 2026 — Camille Laverie — Carbon Optimized</footer>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}

export default App;