import { useState, useEffect } from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectBook from '@/Components/Portfolio/ProjectBook';
import AnimatedSkillsLab from '@/Components/Portfolio/AnimatedSkillsLab';
import AnimatedExperience from '@/Components/Portfolio/AnimatedExperience';
import AboutMeBento from '@/Components/Portfolio/AboutMeBento';
import ContactSection from '@/Components/Portfolio/ContactSection';
import { 
    BookOpen, Briefcase, Wrench, Mail, FileDown, 
    ExternalLink, List, Zap, Sparkles, Coffee, Headphones
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Home({ about, projects = [], skills = {}, experiences = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // View mode for projects section: 'book' | 'table'
    const [projectViewMode, setProjectViewMode] = useState('book');

    // Hero visual toggle: 'avatar' | 'photo'
    const [heroVisual, setHeroVisual] = useState('avatar');

    // Dynamic rotating specialization badges
    const [roleIdx, setRoleIdx] = useState(0);
    const ROLES = [
        lang === 'id' ? 'Enterprise Backend' : 'Enterprise Backend',
        lang === 'id' ? 'Sistem Terdistribusi' : 'Distributed Systems',
        lang === 'id' ? 'REST API & Database' : 'REST APIs & Databases',
        lang === 'id' ? 'Node.js & Laravel' : 'Node.js & Laravel'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setRoleIdx((prev) => (prev + 1) % ROLES.length);
        }, 3200);
        return () => clearInterval(timer);
    }, [ROLES.length]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -70;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const education = about?.education || [
        {
            degree_en: "Bachelor's Degree (S1) in Informatics Engineering",
            degree_id: "Sarjana (S1) Teknik Informatika",
            institution: "Universitas Esa Unggul",
            period: "2024 - Present",
            gpa: "3.66 / 4.00"
        },
        {
            degree_en: "Associate's Degree (D3) in Informatics Engineering",
            degree_id: "Diploma (D3) Teknik Informatika",
            institution: "Politeknik Elektronika Negeri Surabaya (EEPIS / PENS)",
            period: "2020 - 2023",
            gpa: "3.69 / 4.00"
        }
    ];

    return (
        <PortfolioLayout title="Nanang Aditya — Software Engineer">
            <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 space-y-16 sm:space-y-24">

                {/* ══════════════════════════════════════════════════════════════
                   1. HERO & WORKSPACE SETUP SECTION (#home)
                   ══════════════════════════════════════════════════════════════ */}
                <section id="home" className="container-max scroll-mt-20">
                    {/* Cutting Mat Metric Measurement Ruler along top */}
                    <div className="hidden sm:flex items-center justify-between text-[11px] font-mono text-emerald-800/50 pb-2 px-1 select-none border-b border-emerald-900/15 mb-4">
                        <span>| 00 CM</span>
                        <span>· · · · 10</span>
                        <span>· · · · 20</span>
                        <span>· · · · 30</span>
                        <span>· · · · 40</span>
                        <span>· · · · 50</span>
                        <span>· · · · 60</span>
                        <span>· · · · 70</span>
                        <span>· · · · 80</span>
                        <span>· · · · 90</span>
                        <span>| 100 CM [MAKER'S CUTTING MAT]</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                        {/* ── LEFT: CONVERSATIONAL & STYLISH EDITORIAL INTRO (7 COLS on desktop, Order 2 on mobile) ── */}
                        <div className="lg:col-span-7 order-2 lg:order-1 desk-sheet p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white/95 h-full relative overflow-hidden border border-emerald-200/80 shadow-xl">
                            {/* Ambient Subtle Studio Glow */}
                            <div className="absolute -top-14 -left-14 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

                            <div className="space-y-4 relative z-10">
                                {/* Top Live Badges - Strictly Side-by-Side (No wrapping or jumping) */}
                                <div className="flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
                                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-900 font-bold bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs shrink-0 whitespace-nowrap">
                                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                        <span>{lang === 'id' ? 'Surabaya, ID • Backend Engineer' : 'Surabaya, ID • Backend Engineer'}</span>
                                    </div>
                                    
                                    {/* Animated dynamic specialization pill - strictly beside */}
                                    <div className="h-6 overflow-hidden flex items-center shrink-0">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={roleIdx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="text-[11px] font-mono font-bold text-amber-950 bg-amber-100/90 border border-amber-300 shadow-2xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 whitespace-nowrap"
                                            >
                                                <Zap size={11} className="text-amber-600 fill-amber-500" />
                                                {ROLES[roleIdx]}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Creative Big Title with Warm Personality */}
                                <div className="space-y-2 pt-1">
                                    <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-800 font-bold flex items-center gap-2">
                                        <Sparkles size={14} className="text-amber-500" />
                                        <span>{lang === 'id' ? 'PORTOFOLIO // SALAM KENAL' : 'PORTFOLIO // WELCOME'}</span>
                                    </p>
                                    <h1 className="font-editorial-title text-6xl sm:text-7xl lg:text-8xl text-slate-900 leading-none tracking-tight">
                                        NANANG <span className="font-editorial-serif italic font-normal text-emerald-800">Aditya</span>
                                    </h1>
                                    <p className="font-editorial-serif text-xl sm:text-2xl text-slate-700 italic">
                                        {lang === 'id'
                                            ? 'Merancang arsitektur sistem enterprise, aktif berolahraga lari, dan menikmati alam terbuka.'
                                            : 'Designing enterprise systems, active runner, and exploring the outdoors.'}
                                    </p>
                                </div>

                                {/* Conversational, Relaxed Bio Narrative */}
                                <p className="font-editorial-serif text-base sm:text-lg text-slate-700 leading-relaxed text-justify">
                                    {lang === 'id'
                                        ? 'Halo! Saya Nanang. Sebagai Backend Engineer dengan 3+ tahun pengalaman di PT Jasa Marga dan Adira Finance, saya berfokus membangun RESTful API berkinerja tinggi, sistem terdistribusi, dan manajemen database relasional. Di luar baris kode, saya menyeimbangkan fokus lewat olahraga lari rutin, mendaki gunung di alam terbuka, atau menikmati secangkir Americano dingin bersama alunan lagu Jawa santuy.'
                                        : 'Hello! I am Nanang. As a Backend Engineer with 3+ years of production experience at PT Jasa Marga and Adira Finance, I specialize in high-throughput REST APIs, distributed systems, and robust database architectures. Beyond the code, I find balance through routine running, hiking mountain trails, or unwinding with an iced Americano and Jawa beats.'}
                                </p>
                            </div>

                            {/* CTAs & Social Links */}
                            <div className="space-y-4 pt-2 relative z-10">
                                <div className="flex flex-wrap items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollTo('projects')}
                                        className="btn-primary shimmer-button shadow-md shadow-emerald-900/15"
                                    >
                                        <BookOpen size={17} />
                                        <span>{lang === 'id' ? 'Buka Jurnal Proyek' : 'Explore Project Dossier'}</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => scrollTo('contact')}
                                        className="btn-secondary"
                                    >
                                        <span>{lang === 'id' ? 'Hubungi Saya' : 'Get In Touch'}</span>
                                    </motion.button>
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="/downloads/CV_Nanang_Aditya_Sutahar_ATS.pdf"
                                        className="btn-secondary flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="CV_Nanang_Aditya_Sutahar_ATS.pdf"
                                    >
                                        <FileDown size={16} />
                                        <span>{lang === 'id' ? 'Unduh CV ATS' : 'Download ATS CV'}</span>
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="/downloads/Portfolio_Nanang_Aditya_Sutahar.pdf"
                                        className="btn-secondary flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="Portfolio_Nanang_Aditya_Sutahar.pdf"
                                    >
                                        <FileDown size={16} />
                                        <span>{lang === 'id' ? 'Portofolio PDF' : 'Portfolio PDF'}</span>
                                    </motion.a>
                                </div>

                                {/* Direct Contact & Social Links */}
                                <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-5 text-sm text-slate-600">
                                    <a
                                        href="https://github.com/Nanang212"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-emerald-700 inline-flex items-center gap-1.5 font-medium transition-colors"
                                    >
                                        <GithubIcon size={16} /> GitHub
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/nanang-aditya/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-emerald-700 inline-flex items-center gap-1.5 font-medium transition-colors"
                                    >
                                        <LinkedinIcon size={16} /> LinkedIn
                                    </a>
                                    <a
                                        href="mailto:nanangaditya2001@gmail.com"
                                        className="hover:text-emerald-700 inline-flex items-center gap-1.5 font-medium transition-colors"
                                    >
                                        <Mail size={16} /> nanangaditya2001@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: CREATIVE CHARACTER STAGE & LANYARD PASS (5 COLS on desktop, Order 1 on mobile) ── */}
                        <motion.div
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="lg:col-span-5 order-1 lg:order-2 desk-sheet p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 space-y-4 hover:shadow-2xl transition-all h-full relative overflow-hidden border border-emerald-200/90"
                        >
                            {/* Ambient Studio Lighting Backdrop */}
                            <div className="absolute -top-16 -right-16 w-44 h-44 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

                            {/* Top Stage Header: Title & Interactive Visual Switcher */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 relative z-20">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                    <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">
                                        CREATIVE STUDIO &bull; ID #2001
                                    </span>
                                </div>
                                
                                {/* Visual Toggle: AI Illustration vs Real Photo */}
                                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px] font-mono">
                                    <button
                                        onClick={() => setHeroVisual('avatar')}
                                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                                            heroVisual === 'avatar' 
                                                ? 'bg-emerald-600 text-white shadow-xs' 
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        🎨 Karakter AI
                                    </button>
                                    <button
                                        onClick={() => setHeroVisual('photo')}
                                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                                            heroVisual === 'photo' 
                                                ? 'bg-emerald-600 text-white shadow-xs' 
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        📸 Foto Asli
                                    </button>
                                </div>
                            </div>

                            {/* Main Stage: Character Display with Floating Lanyard Pass & Stickers */}
                            <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-100/40 via-teal-50/30 to-white/90 border border-emerald-200/70 shadow-inner">
                                <AnimatePresence mode="wait">
                                    {heroVisual === 'avatar' ? (
                                        <motion.div
                                            key="avatar-visual"
                                            initial={{ opacity: 0, scale: 0.94, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.94, y: -10 }}
                                            transition={{ duration: 0.35 }}
                                            className="relative w-full h-full flex items-center justify-center p-2"
                                        >
                                            {/* Stylized Illustrated Character */}
                                            <motion.img
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                                src="/images/avatar-illustration.png"
                                                alt="Nanang Aditya - Illustrated Avatar"
                                                className="max-h-full max-w-full object-contain drop-shadow-2xl z-10"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="photo-visual"
                                            initial={{ opacity: 0, scale: 0.94, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.94, y: -10 }}
                                            transition={{ duration: 0.35 }}
                                            className="relative w-full h-full flex items-center justify-center p-3"
                                        >
                                            <img
                                                src="/images/personal/jogging.png"
                                                alt="Nanang Aditya - GBK Senayan Running"
                                                className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-xl z-10"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Playful Floating Lifestyle Stickers around Avatar (Cleanly placed away from face) */}
                                <motion.div
                                    animate={{ rotate: [-2, 1, -2] }}
                                    transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                                    className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-teal-100/95 border border-teal-300 text-teal-950 font-mono text-[10px] font-bold shadow-md flex items-center gap-1"
                                >
                                    <Headphones size={11} className="text-teal-700" />
                                    <span>Jawa Holic</span>
                                </motion.div>

                                <motion.div
                                    animate={{ rotate: [-3, -1, -3] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-full bg-emerald-100/95 border border-emerald-300 text-emerald-950 font-mono text-[10px] font-bold shadow-md flex items-center gap-1"
                                >
                                    <span>🏃‍♂️</span>
                                    <span>{lang === 'id' ? 'Olahraga Lari' : 'Active Runner'}</span>
                                </motion.div>

                                <motion.div
                                    animate={{ rotate: [3, 1, 3] }}
                                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                                    className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-amber-100/95 border border-amber-300 text-amber-950 font-mono text-[10px] font-bold shadow-md flex items-center gap-1"
                                >
                                    <Coffee size={11} className="text-amber-700" />
                                    <span>Americano Peach</span>
                                </motion.div>
                            </div>

                            {/* Clean Engineering Dossier Summary Pill (Replaced confusing terminal) */}
                            <div className="w-full bg-white/95 rounded-xl p-3 border border-emerald-200/90 font-mono text-xs flex items-center justify-between shadow-xs">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-300">
                                        <Briefcase size={14} className="text-emerald-800" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-900 text-xs truncate">
                                            PT Jasa Marga (Persero) Tbk
                                        </p>
                                        <p className="text-[10px] text-slate-500 truncate">
                                            Backend Developer &bull; 3+ {lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience'}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
                                    {lang === 'id' ? 'Terverifikasi' : 'Verified'}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════════
                   2. 3D PROJECT BOOK SECTION (#projects) - DIRECTLY ON HOME
                   ══════════════════════════════════════════════════════════════ */}
                <section id="projects" className="container-max scroll-mt-20">
                    <div className="desk-sheet p-6 sm:p-10 mb-8 bg-white/95">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                                    <BookOpen size={14} className="text-emerald-700" />
                                    <span>{lang === 'id' ? 'Laboratorium Rekayasa & Portofolio Sistem' : 'Engineering Lab & System Portfolio'}</span>
                                </div>
                                <h2 className="font-editorial-title text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none">
                                    {lang === 'id' ? 'JURNAL REKAYASA PROYEK' : 'ENGINEERING PROJECT DOSSIER'}
                                </h2>
                                <p className="font-editorial-serif text-base sm:text-lg text-slate-600 mt-2 max-w-2xl leading-relaxed">
                                    {lang === 'id'
                                        ? 'Dokumentasi terstruktur arsitektur sistem enterprise, pipeline transaksi, dan spesifikasi antarmuka platform yang telah dirilis ke tahap produksi.'
                                        : 'Curated technical dossiers of enterprise backend architectures, transaction pipelines, and production systems.'}
                                </p>
                            </div>

                            {/* View Switcher: Journal vs Table Archive */}
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start md:self-end shrink-0 border border-slate-200">
                                <button
                                    onClick={() => setProjectViewMode('book')}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                        projectViewMode === 'book'
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <BookOpen size={14} />
                                    <span>{lang === 'id' ? 'Mode Jurnal' : 'Journal Mode'}</span>
                                </button>
                                <button
                                    onClick={() => setProjectViewMode('table')}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                        projectViewMode === 'table'
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <List size={14} />
                                    <span>{lang === 'id' ? 'Daftar Arsip' : 'Table Archive'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Interactive Content */}
                        {projectViewMode === 'book' ? (
                            <ProjectBook projects={projects} />
                        ) : (
                            /* Table / Card Archive Mode */
                            <div className="mt-4">
                                {/* Mobile View (< sm): Responsive Card List (No horizontal scroll, neatly arranged stack) */}
                                <div className="sm:hidden space-y-3">
                                    {projects.map((p, idx) => (
                                        <div 
                                            key={p.id}
                                            className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm hover:border-emerald-500/40 transition-colors"
                                        >
                                            {/* Header: Number, Title, and Action Links */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2.5 min-w-0">
                                                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300/60 px-2 py-0.5 rounded shrink-0 mt-0.5">
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                                                        {lang === 'id' ? p.title_id : p.title_en}
                                                    </h4>
                                                </div>

                                                {/* Action Links */}
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    {p.demo_url && (
                                                        <a
                                                            href={p.demo_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                                                            title="Live Demo"
                                                        >
                                                            <span>Live</span>
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                    {p.github_url && (
                                                        <a
                                                            href={p.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1 rounded text-xs inline-flex items-center transition-colors"
                                                            title="Source Code"
                                                        >
                                                            <GithubIcon size={13} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            {(p.description_id || p.description_en) && (
                                                <p className="text-xs text-slate-600 font-editorial-serif leading-relaxed line-clamp-2 mt-2">
                                                    {lang === 'id' ? p.description_id : p.description_en}
                                                </p>
                                            )}

                                            {/* Tech Stack List - Arranged neatly */}
                                            {(p.tech_stack || []).length > 0 && (
                                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50/80 px-1.5 py-0.5 rounded">
                                                        STACK
                                                    </span>
                                                    {p.tech_stack.map((t) => (
                                                        <span 
                                                            key={t}
                                                            className="text-[11px] font-mono px-2 py-0.5 bg-slate-50 text-slate-700 rounded-md border border-slate-200/80"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop View (>= sm): Classic High-Density Table */}
                                <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                                    <table className="w-full text-left text-sm text-slate-800">
                                        <thead className="bg-slate-50 text-xs font-mono uppercase text-slate-500 border-b border-slate-200">
                                            <tr>
                                                <th className="py-3.5 px-4 font-semibold w-12">No</th>
                                                <th className="py-3.5 px-4 font-semibold">{lang === 'id' ? 'Proyek' : 'Project'}</th>
                                                <th className="py-3.5 px-4 font-semibold">{lang === 'id' ? 'Teknologi' : 'Tech Stack'}</th>
                                                <th className="py-3.5 px-4 font-semibold hidden md:table-cell">{lang === 'id' ? 'Deskripsi Rekayasa' : 'Engineering Description'}</th>
                                                <th className="py-3.5 px-4 font-semibold text-right">{lang === 'id' ? 'Tautan' : 'Links'}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-sans">
                                            {projects.map((p, idx) => (
                                                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </td>
                                                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                                                        {lang === 'id' ? p.title_id : p.title_en}
                                                    </td>
                                                    <td className="py-3.5 px-4">
                                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                                            {(p.tech_stack || []).map((t) => (
                                                                <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200/60 font-mono">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-4 hidden md:table-cell text-xs text-slate-600 max-w-sm line-clamp-2">
                                                        {lang === 'id' ? p.description_id : p.description_en}
                                                    </td>
                                                    <td className="py-3.5 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {p.demo_url && (
                                                                <a
                                                                    href={p.demo_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                                                                >
                                                                    <span>Live</span>
                                                                    <ExternalLink size={12} />
                                                                </a>
                                                            )}
                                                            {p.github_url && (
                                                                <a
                                                                    href={p.github_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 p-1 rounded inline-flex items-center transition-colors"
                                                                    title="Source Code"
                                                                >
                                                                    <GithubIcon size={14} />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════════
                   3. WORK EXPERIENCE SECTION (#experience) - ANIMATED TIMELINE
                   ══════════════════════════════════════════════════════════════ */}
                <section id="experience" className="container-max scroll-mt-20">
                    <div className="desk-sheet p-4 sm:p-6 space-y-4 bg-white/95">
                        <div className="border-b border-slate-200 pb-2.5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                                    <Briefcase size={15} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold leading-tight">
                                        {lang === 'id' ? 'Riwayat Karir Industri • Timeline Rekayasa' : 'Industrial Career Record • Engineering Timeline'}
                                    </div>
                                    <h2 className="font-editorial-title text-2xl sm:text-3xl text-slate-900 tracking-tight leading-none mt-0.5">
                                        {lang === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE'}
                                    </h2>
                                </div>
                            </div>
                            <p className="hidden md:block font-editorial-serif text-xs text-slate-500 italic max-w-sm text-right">
                                {lang === 'id'
                                    ? 'Sistem enterprise skala nasional di PT Jasa Marga & Adira Finance.'
                                    : 'Production systems engineered across national enterprise infrastructure.'}
                            </p>
                        </div>

                        {/* Interactive Animated Experience Console */}
                        <AnimatedExperience experiences={experiences} />
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════════
                   4. TECHNICAL SKILLS SECTION (#skills) - COMPACT STUDIO LAB
                   ══════════════════════════════════════════════════════════════ */}
                <section id="skills" className="container-max scroll-mt-20">
                    <div className="desk-sheet p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 bg-white/95">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                                    <Wrench size={13} className="text-emerald-700" />
                                    <span>{lang === 'id' ? 'Matriks Keahlian & Telemetri Arsitektur' : 'Skill Matrix & Architecture Telemetry'}</span>
                                </div>
                                <h2 className="font-editorial-title text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
                                    {lang === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS'}
                                </h2>
                            </div>
                            <p className="font-editorial-serif text-sm text-slate-600 italic max-w-md sm:text-right">
                                {lang === 'id'
                                    ? 'Teknologi backend, database, dan DevOps yang terverifikasi di lingkungan produksi.'
                                    : 'Production-verified backend, database, and DevOps engineering stacks.'}
                            </p>
                        </div>

                        {/* Interactive Animated Skills Lab in Compact 2-Column Split */}
                        <AnimatedSkillsLab skills={skills} />
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════════
                   5. UNIFIED ABOUT ME & CREDENTIALS SECTION (#about)
                   ══════════════════════════════════════════════════════════════ */}
                <section id="about" className="container-max scroll-mt-20">
                    <div className="desk-sheet p-6 sm:p-10 bg-white/95">
                        <AboutMeBento about={about} education={education} />
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════════
                   6. CONTACT & HIRE ME DOSSIER SECTION (#contact)
                   ══════════════════════════════════════════════════════════════ */}
                <ContactSection />

            </div>
        </PortfolioLayout>
    );
}
