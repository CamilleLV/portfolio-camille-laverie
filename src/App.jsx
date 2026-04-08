import React from 'react';
import { 
  Github as GithubIcon, 
  Linkedin as LinkedinIcon, 
  FileText as FileIcon, 
  Mail as MailIcon, 
  Database as DbIcon, 
  Code as CodeIcon, 
  GraduationCap as GradIcon, 
  Trophy as TrophyIcon, 
  ExternalLink as LinkIcon, 
  ChevronDown as ArrowIcon, 
  Leaf as LeafIcon 
} from 'lucide-react';

const data = {
  profile: {
    name: "Camille Laverie",
    role: "Data Engineer",
    description: "Conception de pipelines de données robustes et architectures cloud éco-responsables.",
    email: "ton.email@exemple.com",
    linkedin: "https://linkedin.com/in/tonprofil",
    github: "https://github.com/CamilleLV"
  },
  projects: [
    {
      title: "Optimisation Pipeline ETL",
      tags: ["Python", "Airflow", "PostgreSQL"],
      description: "Réduction de 40% du temps de traitement des données via une refonte de l'orchestration.",
      github: "https://github.com/CamilleLV/projet1",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Eco-Data Monitor",
      tags: ["Spark", "AWS", "Green IT"],
      description: "Dashboard de monitoring de l'empreinte carbone des clusters de calcul en temps réel.",
      github: "https://github.com/CamilleLV/projet2",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400"
    }
  ]
};

function App() {
  return (
    <div className="min-h-screen bg-dash-bg text-dash-text-main selection:bg-dash-accent selection:text-white">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-dash-card/80 backdrop-blur-md border-b border-dash-border">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold flex items-center gap-2 text-dash-accent">
            <LeafIcon size={18} /> CL.
          </span>
          <div className="flex gap-6 text-sm font-medium text-dash-text-muted uppercase tracking-widest">
            <a href="#projets" className="hover:text-dash-accent transition-colors">Projets</a>
            <a href="#contact" className="hover:text-dash-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-24 pb-20 space-y-24">
        
        {/* SECTION INTRO */}
        <section id="intro" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-dash-text-main">
              {data.profile.name}
            </h1>
            <p className="text-xl text-dash-accent font-medium">
              {data.profile.role}
            </p>
          </div>
          <p className="text-dash-text-muted leading-relaxed text-lg">
            {data.profile.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 bg-dash-accent hover:bg-dash-accent-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-dash-accent/20">
              <FileIcon size={20} /> CV.pdf
            </button>
            <a href="#contact" className="flex items-center gap-2 bg-dash-card border border-dash-border hover:border-dash-accent text-dash-text-main px-6 py-3 rounded-xl font-bold transition-all">
              <MailIcon size={20} /> Contact
            </a>
          </div>
        </section>

        {/* SECTION PROJETS */}
        <section id="projets" className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold italic tracking-tight">/ Projets</h2>
            <div className="h-px flex-1 bg-dash-border"></div>
          </div>

          <div className="space-y-12">
            {data.projects.map((project, index) => (
              <div key={index} className="group relative bg-dash-card border border-dash-border rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    {project.github && (
                      <a href={project.github} className="text-dash-text-muted hover:text-dash-accent transition-colors">
                        <GithubIcon size={22} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-dash-bg border border-dash-border px-2 py-1 rounded text-dash-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-dash-text-muted text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="pb-20">
          <div className="bg-dash-accent rounded-3xl p-8 text-white space-y-6">
            <h2 className="text-3xl font-bold">On collabore ?</h2>
            <p className="opacity-90">
              Actuellement à la recherche d'opportunités en Data Engineering orientées impact environnemental.
            </p>
            <div className="flex flex-col gap-4 pt-4">
              <a href={`mailto:${data.profile.email}`} className="flex items-center gap-3 font-mono text-sm underline underline-offset-4">
                <MailIcon size={18} /> {data.profile.email}
              </a>
              <div className="flex gap-4">
                <a href={data.profile.linkedin} className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition">
                  <LinkedinIcon size={20} />
                </a>
                <a href={data.profile.github} className="bg-white/20 p-3 rounded-full hover:bg-white/40 transition">
                  <GithubIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center py-10 text-xs text-dash-text-muted font-mono uppercase tracking-widest border-t border-dash-border">
        © 2026 — Built with React & Green Logic
      </footer>
    </div>
  );
}

export default App;