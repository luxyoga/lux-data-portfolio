'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub, FaGoodreads, FaEnvelope } from "react-icons/fa";
import WebsitePreview from './components/WebsitePreview';

const menuItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("about");

  // Section refs
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);

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
          <p className="text-lg sm:text-xl text-white mb-4 whitespace-nowrap">Data Engineering & Business Analysis</p>
          <p className="text-m text-[#94A3B8] mb-6">I transform complex data into actionable insights that drive business decisions and strategic growth.</p>
          <div className="flex gap-4 text-2xl text-[#94A3B8]">
            <a href="https://www.linkedin.com/in/luxyoga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.instagram.com/lux.dataflow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
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
            <h2 className="text-xl font-medium text-white mb-8 whitespace-nowrap">Data Engineering & Business Analysis</h2>
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
              <a href="https://www.instagram.com/lux.dataflow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaInstagram /></a>
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
              Data professional with 6+ years in Financial Analysis & Accounting and 5 years across Project Management, UX, and Web Development. I bridge business and technology to deliver analytics, automation, and end-to-end data solutions. Proficient in SQL, Python, BI (Power BI/Tableau), and ETL/orchestration; hands-on with PySpark, Airflow, Docker, Streamlit, and DuckDB. I translate messy, real-world data into decisions that improve margin, forecasting accuracy, and operational efficiency.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                In my spare time - I'm usually painting miniatures, playing TCGs, or reading.
              </p>
            </section>
          
          {/* Projects Section */}
          <section id="projects" ref={projectsRef} className="mb-16">
            <h2 className="sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">PROJECTS</h2>
            <div className="space-y-0">
              <div className="-mb-4">
              
              {/* Project Entry 1 - Footwear Sales Dashboard */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://public.tableau.com/app/profile/lux.yogasegaran/viz/FootwearSalesDashboard_17628641426450/SalesDashboard" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/dashboard_preview.png" 
                        fallbackGradient="from-[#3B82F6] to-[#8B5CF6]"
                        alt="Footwear Sales Dashboard preview"
                        objectFit="cover"
                      />
                    </a>
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <a href="https://public.tableau.com/app/profile/lux.yogasegaran/viz/FootwearSalesDashboard_17628641426450/SalesDashboard" target="_blank" rel="noopener noreferrer" className="group-hover:text-[#5DE7D4] transition-colors duration-300">
                        <h3 className="text-l font-semibold">
                          Footwear Sales Dashboard
                        </h3>
                      </a>
                      <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-[#94A3B8] text-sm mb-4">
                    Interactive Tableau dashboard analyzing 10 years of footwear sales across Europe, the UK, and North America. Tracks year-over-year performance, profit trends, and product category insights using cleaned SQL and CSV data sources.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Tableau</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">MySQL</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Python</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Pandas</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Cleaning</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Visualization</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">KPI Dashboards</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Modeling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://github.com/luxyoga/footwear-sales-dashboard" 
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

              {/* Project Entry 2 - Global Layoffs Data Analysis */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://github.com/luxyoga/mysql-Global-Layoffs-Data-Analysis" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/global_layoffs4.png" 
                        fallbackGradient="from-[#EC4899] to-[#F59E0B]"
                        alt="Project preview"
                        objectFit="cover"
                      />
                    </a>
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <a href="https://github.com/luxyoga/mysql-Global-Layoffs-Data-Analysis" target="_blank" rel="noopener noreferrer" className="group-hover:text-[#5DE7D4] transition-colors duration-300">
                        <h3 className="text-l font-semibold">
                          Global Layoffs Data Analysis
                        </h3>
                      </a>
                      <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-[#94A3B8] text-sm mb-4">
                    An end-to-end SQL project analyzing global layoffs between 2020–2023 to identify trends across industries, companies, and regions. Built entirely in MySQL Workbench, the project focuses on real-world data cleaning and exploratory data analysis (EDA).
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">MySQL</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">SQL Workbench</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Cleaning</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Exploratory Data Analysis</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Analysis</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Power BI</span>
                      <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Tableau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://github.com/luxyoga/mysql-Global-Layoffs-Data-Analysis" 
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

              {/* Project Entry 3 - Copenhagen Biking Analysis */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://copenhagen-bike-pipeline.streamlit.app/" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/cphscreenshot3.jpg" 
                        fallbackGradient="from-[#10B981] to-[#3B82F6]"
                        alt="Copenhagen Biking Analysis Dashboard preview"
                        objectFit="cover"
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

              {/* Project Entry 4 - VGC Pokémon Usage Stats Dashboard */}
              <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {/* Preview Window */}
                  <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-6">
                    <a href="https://vgcpokemonstats.streamlit.app/" target="_blank" rel="noopener noreferrer">
                      <WebsitePreview 
                        imagePath="/dashboardscreenshot1.png" 
                        fallbackGradient="from-[#5DE7D4] to-[#8B5CF6]"
                        alt="VGC Pokémon Usage Stats Dashboard preview"
                        objectFit="cover"
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

              {/* Experience Entry 1 - BDP Quadrangle */}
              <a href="https://www.bdp.com/ca" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">02/2020 — 11/2023</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Senior Project Accountant
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          BDP Quadrangle
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Led comprehensive project finance data management across residential and commercial portfolios, developing KPI dashboards for cost, revenue, WIP, and variance tracking that improved budget accuracy to ≤5%.<br /><br />
                      Streamlined operations by automating monthly reporting workflows using Excel, SQL, and Python, reducing cycle time by 25%.<br /><br />
                      Collaborated closely with project managers on burn rate forecasting, margin analysis, and cash flow projections, implementing early warning systems for at-risk projects that enhanced overall profitability by 15%.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Project Finance</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">KPI Dashboards</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Excel</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">SQL</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Python</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Budgeting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Forecasting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Data Analysis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 2 - Arcadis */}
              <a href="https://www.arcadis.com/en" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">01/2018 — 02/2020</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Financial Analyst
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Arcadis
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Developed comprehensive revenue and billing reports with interactive dashboards for executive leadership, significantly enhancing visibility into contract modifications and accounts receivable status.<br /><br />
                      Performed detailed variance analysis and scenario modeling to support strategic pricing decisions and optimize staffing allocations across multiple projects.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Financial Reporting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Dashboards</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Revenue Analysis</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Billing</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Variance Analysis</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Scenario Modeling</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Contract Management</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Pricing Strategy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 3 - Holt Renfrew */}
              <a href="https://www.holtrenfrew.com" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">03/2016 — 01/2018</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          Project Accountant
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1">
                          Holt Renfrew
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Managed capital expenditure tracking for major retail expansion initiatives, creating comprehensive reporting packages that aligned construction and merchandising teams on project progress and budget adherence.<br /><br />
                      Enhanced operational efficiency by improving ERP workflows and establishing data quality standards across all cost centers.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Capex Tracking</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Project Management</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Retail Operations</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Reporting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">ERP Systems</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Workflow Improvement</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Financial Data Quality</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Cost Management</span>
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
