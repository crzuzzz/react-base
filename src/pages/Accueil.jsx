import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHistory, AiOutlineUserAdd } from "react-icons/ai";
import { FiSearch, FiClock, FiInfo } from "react-icons/fi";
import "./Accueil.css";

const featureItems = [
  {
    Icon: AiOutlineUserAdd,
    title: "Enregistrement",
    description: "Créer rapidement une fiche visiteur.",
    route: "/enregistrement",
  },
  {
    Icon: FiSearch,
    title: "Recherche intelligente",
    description: "Recherche par nom ou CIN.",
    route: "/recherche",
  },
  {
    Icon: FiClock,
    title: "Entrée / Sortie",
    description: "Gestion des horaires.",
    route: "/entree-sortie",
  },
  {
    Icon: AiOutlineHistory,
    title: "Historique",
    description: "Consulter toutes les visites.",
    route: "/historique",
  },
];

export default function Accueil() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="accueil">
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#hero" className="brand">
            <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
          </a>

          <nav className="nav-links">
            <a href="#hero">Accueil</a>
            <a href="#features">Fonctionnalités</a>
            <a href="#about">À propos</a>
          </nav>

          <div className="nav-actions">
            <a href="#hero" className="button button-primary">Déconnexion</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section animate-on-scroll" id="hero">
          <div className="hero-card section-card">
            <div className="hero-copy">
              <div className="content-block">
                <span className="eyebrow">Solution sécurisée pour banque</span>
                <h1>Gestion Sécurisée des Visiteurs</h1>
                <p>Solution moderne permettant de contrôler les accès, suivre les visites et renforcer la sécurité des locaux.</p>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-graphic-card">
              <div className="hero-graphic-shape shape-1"></div>
              <div className="hero-graphic-shape shape-2"></div>
              <div className="hero-illustration">
                <svg viewBox="0 0 720 560" aria-hidden="true">
                  <defs>
                    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.98" />
                      <stop offset="100%" stopColor="#f8f0f0" stopOpacity="0.88" />
                    </linearGradient>
                  </defs>
                  <rect x="44" y="136" width="248" height="314" rx="28" fill="#fff" stroke="#E5E5E5" strokeWidth="4" />
                  <rect x="116" y="166" width="92" height="24" rx="12" fill="#F28C28" />
                  <rect x="116" y="208" width="148" height="18" rx="9" fill="#E5E5E5" />
                  <rect x="116" y="238" width="108" height="18" rx="9" fill="#E5E5E5" />
                  <rect x="116" y="268" width="84" height="18" rx="9" fill="#E5E5E5" />
                  <rect x="336" y="92" width="312" height="384" rx="34" fill="#fff" stroke="#E5E5E5" strokeWidth="4" />
                  <rect x="376" y="132" width="92" height="28" rx="14" fill="#F28C28" />
                  <rect x="376" y="180" width="188" height="22" rx="11" fill="#E5E5E5" />
                  <rect x="376" y="220" width="248" height="22" rx="11" fill="#E5E5E5" />
                  <path d="M116 470 H584" stroke="#E5E5E5" strokeWidth="16" strokeLinecap="round" />
                  <circle cx="230" cy="420" r="38" fill="#FBBF24" opacity="0.16" />
                  <circle cx="440" cy="430" r="46" fill="#D97706" opacity="0.18" />
                  <path d="M232 396 c-16 -28 -50 -28 -66 0" stroke="#222" strokeWidth="10" strokeLinecap="round" fill="none" />
                  <circle cx="322" cy="318" r="54" fill="#222" opacity="0.08" />
                  <circle cx="344" cy="130" r="22" fill="#F28C28" />
                  <circle cx="176" cy="214" r="18" fill="#D97706" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="section features animate-on-scroll" id="features">
          <div className="section-card">
            <div className="section-intro">
              <div className="content-block">
                <span className="section-label">Nos fonctionnalités</span>
                <h2>Une solution complète pour chaque visite</h2>
                <p>Découvrez les modules qui sécurisent les accès, simplifient les enregistrements et facilitent le pilotage de la circulation des visiteurs.</p>
              </div>
            </div>
            <div className="feature-grid">
              {featureItems.map(({ Icon, title, description, route }, index) => (
              <article key={index} className="feature-card" onClick={() => navigate(route)}>
                <div className="feature-icon">
                  <Icon />
                </div>
                <div className="feature-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="section about animate-on-scroll" id="about">
          <div className="section-card">
            <div className="about-grid">
              <div className="about-copy">
                <div className="section-card about-copy-box">
                  <div className="content-block">
                    <span className="section-label">À propos de l'application</span>
                    <h2>Gestion sécurisée des visiteurs pour la banque</h2>
                    <p>Cette application a été développée pour faciliter la gestion des visiteurs au sein d'un établissement bancaire. Elle permet d'assurer un suivi sécurisé des entrées et sorties, d'améliorer l'organisation de l'accueil et de renforcer la sécurité grâce à une gestion centralisée des visiteurs.</p>
                  </div>
                </div>
              </div>
              <div className="about-visual">
                <div className="about-icon">
                  <FiInfo />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
}
