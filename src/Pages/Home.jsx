import { useState, useEffect } from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectBook from '@/Components/Portfolio/ProjectBook';
import AnimatedSkillsLab from '@/Components/Portfolio/AnimatedSkillsLab';
import AnimatedExperience from '@/Components/Portfolio/AnimatedExperience';
import AboutMeBento from '@/Components/Portfolio/AboutMeBento';
import { 
    BookOpen, Briefcase, Wrench, Mail, FileDown, 
    Send, MapPin, Phone, ExternalLink, 
    Terminal, Glasses, List, CheckCircle2,
    Zap, Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Home({ about, projects = [], skills = {}, experiences = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // View mode for projects section: 'book' | 'table'
    const [projectViewMode, setProjectViewMode] = useState('book');

    // Contact form state
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [contactSent, setContactSent] = useState(false);

    // Dynamic rotating specialization badges
    const [roleIdx, setRoleIdx] = useState(0);
    const ROLES = [
        lang === 'id' ? 'Enterprise Backend Architect' : 'Enterprise Backend Architect',
        lang === 'id' ? 'Sistem Terdistribusi & REST API' : 'Distributed Systems & REST APIs',
        lang === 'id' ? 'AI / RAG Vector Pipeline Builder' : 'AI / RAG Vector Pipeline Builder',
        lang === 'id' ? 'High-Throughput Node.js & Laravel' : 'High-Throughput Node.js & Laravel'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setRoleIdx((prev) => (prev + 1) % ROLES.length);
        }, 3200);
        return () => clearInterval(timer);
    }, [ROLES.length]);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const mailtoUrl = `mailto:nanangaditya2001@gmail.com?subject=${encodeURIComponent(contactForm.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`)}`;
        window.location.href = mailtoUrl;
        setContactSent(true);
    };

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
                        {/* Left: Main Editorial Statement Sheet */}
                        <div className="lg:col-span-7 desk-sheet p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white/95 h-full">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200/80">
                                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                        <span>{lang === 'id' ? 'Surabaya, Indonesia • Siap untuk Backend Enterprise' : 'Surabaya, Indonesia • Available for Enterprise Backend'}</span>
                                    </div>
                                    
                                    {/* Animated dynamic specialization pill */}
                                    <div className="h-6 overflow-hidden flex items-center">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={roleIdx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300/80 shadow-2xs px-2 py-0.5 rounded flex items-center gap-1"
                                            >
                                                <Zap size={11} className="text-amber-600 fill-amber-500" />
                                                {ROLES[roleIdx]}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <h1 className="font-editorial-title text-6xl sm:text-7xl lg:text-8xl text-slate-900 leading-none tracking-tight">
                                    NANANG ADITYA
                                </h1>

                                <p className="font-editorial-serif text-2xl sm:text-3xl text-slate-800 leading-snug">
                                    {lang === 'id'
                                        ? 'Software Engineer yang berfokus pada arsitektur sistem enterprise, backend skala besar, dan infrastruktur data.'
                                        : 'Software Engineer specializing in enterprise backends, distributed data pipelines, and mission-critical systems.'}
                                </p>

                                <p className="text-base text-slate-600 leading-relaxed text-justify">
                                    {lang === 'id'
                                        ? 'Memiliki 3+ tahun pengalaman produksi membangun platform pemantauan konstruksi jalan tol nasional di PT Jasa Marga (Persero) Tbk, sistem digitalisasi dokumen di PT Adira Dinamika Multi Finance, serta NLP similarity engine. Berpengalaman di Express.js, Node.js, Laravel, Spring Boot, PostgreSQL, dan Docker.'
                                        : '3+ years production experience building national toll road construction monitoring systems at PT Jasa Marga, loan document digitization at Adira Finance, and academic NLP similarity engines. Proficient in Express.js, Node.js, Laravel, Spring Boot, PostgreSQL, and Docker.'}
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-3 pt-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => scrollTo('projects')}
                                        className="btn-primary shimmer-button shadow-md shadow-emerald-900/15"
                                    >
                                        <BookOpen size={17} />
                                        <span>{lang === 'id' ? 'Buka Buku Proyek 3D' : 'Open 3D Project Book'}</span>
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
                                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-5 text-sm text-slate-600">
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

                        {/* Right: Unified Developer Studio Card (Portrait + Credentials + Terminal Telemetry) */}
                        <motion.div
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="lg:col-span-5 desk-sheet p-6 sm:p-7 flex flex-col justify-between bg-white/95 space-y-4 hover:shadow-2xl transition-shadow h-full"
                        >
                            {/* Top Header of the Studio Card */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                    <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">
                                        ENGINEER DOSSIER &bull; ID #2001
                                    </span>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                                    ONLINE
                                </span>
                            </div>

                            {/* Identity Bar: Side-by-Side Portrait & Verified Credentials */}
                            <div className="flex items-center gap-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70">
                                {/* Transparent PNG portrait in compact, elegant framed badge */}
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                                    className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-lg bg-gradient-to-b from-emerald-50 to-emerald-100/50 flex items-end justify-center overflow-hidden border border-emerald-200/80 shadow-inner cursor-pointer"
                                >
                                    <img
                                        src="/images/profile.png"
                                        alt="Nanang Aditya Sutahar — Software Engineer"
                                        width="240"
                                        height="300"
                                        fetchPriority="high"
                                        className="max-h-full w-auto object-contain drop-shadow"
                                    />
                                </motion.div>

                                {/* Credentials Breakdown */}
                                <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-emerald-800 font-bold tracking-wider">
                                            Software Engineer
                                        </div>
                                        <div className="font-bold text-slate-900 text-sm truncate">
                                            NANANG ADITYA S.
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-[11px] text-slate-600 font-sans border-t border-slate-200/80 pt-1.5">
                                        <div className="flex items-baseline justify-between gap-1">
                                            <span className="text-slate-400 font-mono text-[10px]">ENTERPRISE:</span>
                                            <span className="text-slate-800 font-medium truncate text-right">PT Jasa Marga</span>
                                        </div>
                                        <div className="flex items-baseline justify-between gap-1">
                                            <span className="text-slate-400 font-mono text-[10px]">{lang === 'id' ? 'PENGALAMAN:' : 'EXPERIENCE:'}</span>
                                            <span className="text-emerald-700 font-semibold font-mono text-[10px]">{lang === 'id' ? '3+ Tahun' : '3+ Years'}</span>
                                        </div>
                                        <div className="flex items-baseline justify-between gap-1">
                                            <span className="text-slate-400 font-mono text-[10px]">{lang === 'id' ? 'PENDIDIKAN:' : 'EDUCATION:'}</span>
                                            <span className="text-slate-800 font-medium text-right text-[11px]">S1 Esa Unggul &bull; D3 PENS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integrated Dark Terminal Telemetry Window */}
                            <div className="flex-1 min-h-0 bg-slate-950 text-slate-100 font-mono text-xs rounded-xl p-4 flex flex-col justify-between border border-slate-800 shadow-lg space-y-2">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                        <Terminal size={12} className="text-emerald-400" /> zsh &mdash; nanang@workspace
                                    </span>
                                </div>

                                <div className="space-y-1.5 text-slate-300 text-[11px] sm:text-xs leading-relaxed py-1">
                                    <p className="text-emerald-400 font-semibold flex items-center gap-1">
                                        <span>$ neofetch --engineer</span>
                                        <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-1" />
                                    </p>
                                    <div className="grid grid-cols-1 gap-1 text-slate-300">
                                        <p><span className="text-emerald-400 font-bold">Stack:</span> Express.js &bull; Laravel &bull; Spring Boot</p>
                                        <p><span className="text-emerald-400 font-bold">Data:</span> PostgreSQL &bull; Prisma &bull; Redis &bull; MinIO</p>
                                        <p><span className="text-emerald-400 font-bold">AI/RAG:</span> Cosine Similarity (41.8ms Latency)</p>
                                        <p><span className="text-emerald-400 font-bold">DevOps:</span> Docker &bull; Linux &bull; Cloudflare Tunnel</p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1.5 text-slate-400">
                                        <Glasses size={13} className="text-emerald-400" /> Developer Desk Spec
                                    </span>
                                    <span className="text-emerald-400 font-semibold font-mono text-[10px] flex items-center gap-1">
                                        <Sparkles size={11} className="text-amber-400" /> 100% Production Verified
                                    </span>
                                </div>
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
                                    {lang === 'id' ? 'BUKU PROYEK 3D INTERAKTIF' : '3D INTERACTIVE PROJECT BOOK'}
                                </h2>
                                <p className="font-editorial-serif text-base sm:text-lg text-slate-600 mt-2 max-w-2xl italic">
                                    {lang === 'id'
                                        ? 'Terinspirasi oleh Paper by WeTransfer: pilih jurnal Moleskine di rak bawah untuk membuka lembaran spesifikasi sistem dan screenshot antarmuka.'
                                        : 'Paper by WeTransfer journal shelf: select a notebook to open two-page engineering lab sheets and live schematics.'}
                                </p>
                            </div>

                            {/* View Switcher: Book vs Table Archive */}
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
                                    <span>{lang === 'id' ? 'Buku 3D' : '3D Book'}</span>
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
                            /* Table Archive Mode */
                            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white mt-4">
                                <table className="w-full text-left text-sm text-slate-800">
                                    <thead className="bg-slate-50 text-xs font-mono uppercase text-slate-500 border-b border-slate-200">
                                        <tr>
                                            <th className="py-3.5 px-4 font-semibold">No</th>
                                            <th className="py-3.5 px-4 font-semibold">{lang === 'id' ? 'Proyek' : 'Project'}</th>
                                            <th className="py-3.5 px-4 font-semibold hidden sm:table-cell">Stack</th>
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
                                                <td className="py-3.5 px-4 hidden sm:table-cell">
                                                    <div className="flex flex-wrap gap-1">
                                                        {(p.tech_stack || []).slice(0, 3).map((t) => (
                                                            <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
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
                                                                className="text-emerald-700 hover:underline inline-flex items-center gap-1 text-xs font-semibold"
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
                                                                className="text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 text-xs ml-2"
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
                    <div className="desk-sheet p-6 sm:p-8 space-y-5 bg-white/95">
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
                   6. CONTACT & MESSAGE SECTION (#contact)
                   ══════════════════════════════════════════════════════════════ */}
                <section id="contact" className="container-max scroll-mt-20">
                    <div className="desk-sheet p-8 sm:p-12 space-y-8 bg-white/95">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                                <Mail size={14} className="text-emerald-700" />
                                <span>{lang === 'id' ? 'Jalur Komunikasi Langsung' : 'Direct Communication Channel'}</span>
                            </div>
                            <h2 className="font-editorial-title text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none">
                                {lang === 'id' ? 'HUBUNGI SAYA' : 'GET IN TOUCH'}
                            </h2>
                            <p className="font-editorial-serif text-base sm:text-lg text-slate-600 mt-2 italic">
                                {lang === 'id'
                                    ? 'Terbuka untuk diskusi arsitektur sistem, kolaborasi rekayasa backend, atau peluang karir.'
                                    : 'Open for system architecture inquiries, backend engineering collaborations, or opportunities.'}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-12 gap-8 items-start">
                            {/* Left Direct Coordinates */}
                            <div className="md:col-span-5 space-y-4">
                                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-sm">
                                    <div>
                                        <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                                            {lang === 'id' ? 'Email Langsung' : 'Direct Email'}
                                        </span>
                                        <a
                                            href="mailto:nanangaditya2001@gmail.com"
                                            className="text-base font-semibold text-slate-900 hover:text-emerald-700 flex items-center gap-2"
                                        >
                                            <Mail size={16} className="text-emerald-700" /> nanangaditya2001@gmail.com
                                        </a>
                                    </div>

                                    <div>
                                        <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                                            {lang === 'id' ? 'Telepon / WhatsApp' : 'Phone / WhatsApp'}
                                        </span>
                                        <a
                                            href="tel:+6285790663367"
                                            className="text-base font-semibold text-slate-900 hover:text-emerald-700 flex items-center gap-2"
                                        >
                                            <Phone size={16} className="text-emerald-700" /> +62 857-9066-3367
                                        </a>
                                    </div>

                                    <div>
                                        <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                                            {lang === 'id' ? 'Lokasi Kerja' : 'Work Location'}
                                        </span>
                                        <p className="text-base font-semibold text-slate-900 flex items-center gap-2">
                                            <MapPin size={16} className="text-emerald-700" /> Surabaya, East Java, Indonesia
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-slate-200 flex items-center gap-4">
                                        <a
                                            href="https://github.com/Nanang212"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-emerald-700 flex items-center gap-1.5 text-xs font-semibold"
                                        >
                                            <GithubIcon size={16} /> GitHub Profile
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/nanang-aditya/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-emerald-700 flex items-center gap-1.5 text-xs font-semibold"
                                        >
                                            <LinkedinIcon size={16} /> LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Message Form */}
                            <div className="md:col-span-7">
                                {contactSent ? (
                                    <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                                        <CheckCircle2 size={36} className="text-emerald-700 mx-auto" />
                                        <h3 className="font-editorial-title text-2xl text-emerald-950">
                                            {lang === 'id' ? 'Pesan Terkirim' : 'Message Dispatched'}
                                        </h3>
                                        <p className="text-xs text-emerald-800">
                                            {lang === 'id'
                                                ? 'Klien email Anda telah dibuka untuk mengirim pesan ini langsung ke nanangaditya2001@gmail.com.'
                                                : 'Your email client has been opened to send this note directly to nanangaditya2001@gmail.com.'}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-mono uppercase text-slate-500 font-semibold">
                                                    {lang === 'id' ? 'Nama Pengirim' : 'Your Name'}
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={contactForm.name}
                                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                    placeholder={lang === 'id' ? 'Nama Anda' : 'Your Name'}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-mono uppercase text-slate-500 font-semibold">
                                                    {lang === 'id' ? 'Alamat Email' : 'Email Address'}
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={contactForm.email}
                                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                    placeholder={lang === 'id' ? 'email@perusahaan.com' : 'email@company.com'}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-mono uppercase text-slate-500 font-semibold">
                                                {lang === 'id' ? 'Subjek / Topik' : 'Subject / Topic'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactForm.subject}
                                                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                                placeholder={lang === 'id' ? 'Diskusi Proyek / Kolaborasi' : 'Project Discussion / Collaboration'}
                                                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-mono uppercase text-slate-500 font-semibold">
                                                {lang === 'id' ? 'Isi Pesan' : 'Message Body'}
                                            </label>
                                            <textarea
                                                rows={4}
                                                required
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                placeholder={lang === 'id' ? 'Tuliskan pesan atau kebutuhan sistem Anda...' : 'Type your message or system requirements here...'}
                                                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 resize-none"
                                            />
                                        </div>

                                        <button type="submit" className="btn-primary w-full sm:w-auto">
                                            <Send size={15} />
                                            <span>{lang === 'id' ? 'Kirim Pesan Sekarang' : 'Send Message Now'}</span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </PortfolioLayout>
    );
}
