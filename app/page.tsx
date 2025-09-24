'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub, FaGoodreads, FaEnvelope } from "react-icons/fa";
import WebsitePreview from './components/WebsitePreview';

const menuItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("about");

  // Section refs
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sectionRefs = [
      { id: "about", ref: aboutRef },
      { id: "projects", ref: projectsRef },
      { id: "experience", ref: experienceRef },
      { id: "blog", ref: blogRef },
    ];
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.1,
      }
    );
    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const handleMenuClick = (id: string) => {
    setActive(id);
    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* Glow Effect */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(80, 120, 255, 0.10), transparent 80%)`,
          transition: "background 0.1s",
        }}
      />
      
      {/* Mobile Header */}
      <header className="lg:hidden block w-full bg-[#0F172A]">
        <div className="px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">Lux Yoga</h1>
          <p className="text-lg sm:text-xl text-white mb-4 whitespace-nowrap">Data Analytics Engineering</p>
          <p className="text-m text-[#94A3B8] mb-6">I transform complex data into actionable insights that drive business decisions and strategic growth.</p>
          <div className="flex gap-4 text-2xl text-[#94A3B8]">
            <a href="https://www.linkedin.com/in/luxyoga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.instagram.com/lux.productdesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://github.com/luxyoga" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.goodreads.com/user/show/192467159-lux-yogasegaran" target="_blank" rel="noopener noreferrer" aria-label="Goodreads"><FaGoodreads /></a>
            <a href="mailto:luxman.yoga@gmail.com" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[40vw] max-w-[700px] px-32 z-10 backdrop-blur-md bg-transparent">
          <div className="flex flex-col h-full ml-4" style={{ paddingTop: '6rem' }}>
            <h1 className="text-5xl font-bold mb-2">Lux Yoga</h1>
            <h2 className="text-xl font-medium text-white mb-8 whitespace-nowrap">Data Analytics Engineering</h2>
            <p className="mb-14 text-m text-[#94A3B8]">I transform complex data into actionable insights that drive business decisions and strategic growth.</p>
            <nav className="flex flex-col gap-8 mt-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="flex items-center group focus:outline-none"
                >
                  <span
                    className={
                      active === item.id
                        ? "h-0.5 w-12 mr-6 bg-white rounded transition-all duration-300"
                        : "h-0.5 w-6 mr-6 bg-white/40 rounded transition-all duration-300"
                    }
                  ></span>
                  <span
                    className={
                      `text-xs tracking-wide uppercase transition-all duration-300 ` +
                      (active === item.id
                        ? "font-bold text-white"
                        : "font-medium text-white/60")
                    }
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
            
            {/* Social Links */}
            <div className="flex gap-4 text-xl text-[#94A3B8] mt-12">
              <a href="https://www.linkedin.com/in/luxyoga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaLinkedin /></a>
              <a href="https://www.instagram.com/lux.productdesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaInstagram /></a>
              <a href="https://github.com/luxyoga" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaGithub /></a>
              <a href="https://www.goodreads.com/user/show/192467159-lux-yogasegaran" target="_blank" rel="noopener noreferrer" aria-label="Goodreads" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaGoodreads /></a>
              <a href="mailto:luxman.yoga@gmail.com" aria-label="Email" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaEnvelope /></a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 z-10 relative pt-0 lg:pt-0 lg:ml-[50vw]" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
          <div className="lg:pl-8 lg:pr-8 pt-4 lg:pt-24">
            <section id="about" ref={aboutRef} className="mb-16">
              <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">ABOUT</h2>
              <p className="text-m text-[#94A3B8] mb-4">
              I'm a data & analytics professional with a foundation in Economics and Accounting, bringing 7+ years of experience in project management and strategic thinking to the data field. I specialize in ETL processes, data cleaning, and data visualization using Python, SQL, and Tableau/Power BI. I excel at translating complex datasets into clear insights that drive strategic decisions.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                I combine analytical rigor with business acumen to deliver data-driven solutions that solve real business problems. My approach includes data mining, exploratory data analysis (EDA), and creating interactive dashboards using tools like Power BI, Tableau and Streamlit. I'm proficient in A/B testing, and database management systems including PostgreSQL and MySQL. My project management background enables me to lead data initiatives from requirements gathering through deployment and monitoring.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                In my spare time - I'm usually painting miniatures, playing TCGs, or reading.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                Now based in Copenhagen, originally from Toronto.
                <br></br>Native English speaker, currently learning Danish.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                Tak for besøget!
              </p>
            </section>
          
          {/* Projects Section */}
          <section id="projects" ref={projectsRef} className="mb-16">
            <h2 className="sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">PROJECTS</h2>
            <div className="space-y-0">
              <div className="-mb-4">
              
              {/* Project Entry 1 - Copenhagen Biking Analysis */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://copenhagen-bike-pipeline.streamlit.app/" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/copenhagen-biking-analysis.png" 
                        fallbackGradient="from-[#10B981] to-[#3B82F6]"
                        alt="Copenhagen Biking Analysis Dashboard preview"
                      />
                    </a>
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <a href="https://copenhagen-bike-pipeline.streamlit.app/" target="_blank" rel="noopener noreferrer" className="group-hover:text-[#5DE7D4] transition-colors duration-300">
                        <h3 className="text-l font-semibold">
                          Copenhagen Biking Analysis
                        </h3>
                      </a>
                      <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-[#94A3B8] text-sm mb-4">
                    An end-to-end data engineering pipeline analyzing cycling traffic in Copenhagen and its relationship with weather conditions. Built with Apache Airflow for orchestration, PySpark for distributed ETL processing, and Streamlit for interactive dashboards. Processes 10 years of real Copenhagen cycling data (2005-2014) from Kaggle and weather data from Open-Meteo API to reveal seasonal patterns and weather correlations.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Apache Airflow</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">PySpark</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Pandas</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">PostgreSQL</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Streamlit</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Docker</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">ETL Pipelines</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Visualization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://github.com/luxyoga/copenhagen-bike-pipeline" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[#94A3B8] hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-2 font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View GitHub Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Entry 2 - VGC Pokémon Usage Stats Dashboard */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://vgcpokemonstats.streamlit.app/" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/dashboardscreenshot1.png" 
                        fallbackGradient="from-[#5DE7D4] to-[#8B5CF6]"
                        alt="VGC Pokémon Usage Stats Dashboard preview"
                      />
                    </a>
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <a href="https://vgcpokemonstats.streamlit.app/" target="_blank" rel="noopener noreferrer" className="group-hover:text-[#5DE7D4] transition-colors duration-300">
                        <h3 className="text-l font-semibold">
                          VGC Pokémon Usage Stats Dashboard
                        </h3>
                      </a>
                      <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-[#94A3B8] text-sm mb-4">
                    An automated data engineering project that ingests competitive Pokémon VGC usage data from Smogon/Showdown, processes it into a queryable DuckDB database, and serves an interactive dashboard with Streamlit. Features ETL pipelines, automated monthly ingestion via GitHub Actions, and comprehensive analytics of metagame trends.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Python</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Pandas</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">ETL Pipelines</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">DuckDB</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">SQL</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Streamlit</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">GitHub Actions</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Visualization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://github.com/luxyoga/vgcpokemonstats" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[#94A3B8] hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-2 font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View GitHub Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </section>

          {/* Resume Link */}
          <section className="mb-16">
            <a 
              href="/resume.html" 
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-m font-semibold text-[#94A3B8] hover:text-[#5DE7D4] transition-colors duration-300"
            >
              View Full Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            </a>
          </section>

          <section id="experience" ref={experienceRef} className="mb-16">
            <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">EXPERIENCE</h2>
            <div className="space-y-0">
              <div className="-mb-4">

              {/* Experience Entry 1 - Krown */}
              <a href="https://www.krownapp.com/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">2025 — PRESENT</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          UX/UI Designer (Freelance)
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Krown
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Redesigned user experience for innovative location-based dating application, focusing on simplicity and minimal-click interactions to facilitate authentic romantic connections. Collaborated with development team to iterate on MVP designs based on real user feedback and research-backed design principles. Created design systems and visual interfaces that prioritize accessibility and user engagement.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Figma</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Mobile Design</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Design Systems</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">User Research</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Prototyping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 2 */}
              <a href="https://www.ascendfs.com/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">2023 — 2025</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Project Manager
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Ascend Fundraising Solutions
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-m text-[#94A3B8] lg:-mt-2 mb-2">Web Developer</p>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Lead web development projects from conception to delivery while managing cross-functional teams and timelines. Build accessible, SEO-optimized solutions and coordinate with designers and product managers to ensure research findings drive development priorities. Analyze user data to inform project scope and measure success metrics.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">JavaScript</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">React</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">WordPress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & SCSS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 2 */}
              <a href="https://tankww.com/en/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:pt-1">2022 — 2023</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          UX Designer
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1">
                          Tank Worldwide
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <div className="text-sm text-[#94A3B8] mb-2">
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Develop user-centered healthcare digital products within complex regulatory frameworks for major pharmaceutical clients. Collaborate across disciplines to deliver FDA and Health Canada compliant solutions while maintaining optimal user experiences. Contribute innovative feature concepts through structured ideation and data-driven design processes.                  </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Figma</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">UserTesting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Adobe XD</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">UXCam</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Axure RP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 3 */}
              <a href="https://luxdesign.studio/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">2017 — PRESENT</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Freelance Web Designer, Web Developer
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Lux Design
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                        Build custom digital solutions across WordPress, Elementor, Shopify, and fully custom platforms based on client requirements and project scope. Conduct user research, usability testing, and competitive analysis to guide platform selection and design decisions. Provide ongoing support through feature development and technical support.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">WordPress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Elementor</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & CSS</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Javascript</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">jQuery</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">React</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                </div>
          </a>
        </div>
          </div>
          </section>

          {/* Blog Section */}
          <section id="blog" ref={blogRef} className="mb-16">
            <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">BLOG</h2>
            <div className="space-y-0">
              <div className="-mb-4">
              
              {/* Blog Post 1 */}
              <a href="https://luxdesign.studio/topbooks/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Blog Preview */}
                    <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                      <WebsitePreview 
                        imagePath="/blog1.png" 
                        fallbackGradient="from-[#8B5CF6] to-[#EC4899]"
                        alt="Top 5 Books Every UX Designer and Web Developer Should Read"
                      />
                    </div>
                    
                    {/* Blog Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                        Top 5 Books Every UX Designer and Web Developer Should Read
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      A curated list of must-read books that helped shape my journey as a UX designer and front-end developer. From design thinking to coding best practices, these picks offer practical insights, inspiration, and foundational knowledge for anyone building digital products. 
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                        <span>July 20, 2024</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Blog Post 2 */}
              <a href="https://luxdesign.studio/top-5-ux-mistakes/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Blog Preview */}
                    <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                      <WebsitePreview 
                        imagePath="/top5blog.png" 
                        fallbackGradient="from-[#10B981] to-[#3B82F6]"
                        alt="Top 5 Common UX Mistakes and How to Fix Them"
                      />
                    </div>
                    
                    {/* Blog Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                        Top 5 Common UX Mistakes and How to Fix Them
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      A quick, practical guide to the most common UX design pitfalls — from neglecting user research to overcomplicating interfaces. This post outlines real-world mistakes and how to fix them, helping designers build more intuitive, user-focused products.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                        <span>August 25, 2024</span>
                        <span>•</span>
                        <span>4 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}
