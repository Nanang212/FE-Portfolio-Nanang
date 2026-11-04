import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, BookOpen, Layers, X, ArrowRight, Code2 } from 'lucide-react';
import { GithubIcon } from '@/Components/UI/SocialIcons';

export default function ProjectBook({ projects = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // Group projects into 3 curated engineering journals/volumes (Paper by WeTransfer style)
    const volumes = [
        {
            id: 'toll-road',
            title_en: 'Toll Road & Enterprise Core',
            title_id: 'Sistem Jalan Tol & Enterprise Core',
            subtitle_en: 'JM-RISE, Aggregator Operasi, JM-ACT, JIMMS',
            subtitle_id: 'JM-RISE, Aggregator Operasi, JM-ACT, JIMMS',
            accentColor: '#0f766e',
            spineColor: '#064e3b',
            coverBg: 'bg-[#0f766e]',
            textColor: 'text-white',
            projects: projects.filter(p => [13, 15, 14, 12].includes(p.id))
        },
        {
            id: 'banking',
            title_en: 'Core Banking & Digitization',
            title_id: 'Pembiayaan & Digitalisasi Dokumen',
            subtitle_en: 'Action Core, Digitalisasi Dokumen, Autofill, Dukcapil, Connect BCA',
            subtitle_id: 'Action Core, Digitalisasi Dokumen, Autofill, Dukcapil, Connect BCA',
            accentColor: '#1d4ed8',
            spineColor: '#1e3a8a',
            coverBg: 'bg-[#1e40af]',
            textColor: 'text-white',
            projects: projects.filter(p => [1, 4, 5, 16].includes(p.id) || p.slug?.includes('autofill') || p.slug?.includes('action'))
        },
        {
            id: 'platforms',
            title_en: 'Client Solutions & Engineering Labs',
            title_id: 'Solusi Klien & Lab Rekayasa',
            subtitle_en: 'Freelance Systems, Academic Capstones & Full-Stack Projects',
            subtitle_id: 'Sistem Freelance, Skripsi Akademik & Aplikasi Full-Stack',
            accentColor: '#475569',
            spineColor: '#0f172a',
            coverBg: 'bg-[#334155]',
            textColor: 'text-white',
            projects: [
                ...projects.filter(p => [19, 18, 17].includes(p.id) || p.slug?.includes('signflow') || p.slug?.includes('wordpress') || p.slug?.includes('sim-sempro')),
                ...projects.filter(p => [2, 6, 7, 8, 9, 10, 11].includes(p.id))
            ]
        }
    ];

    // Selected volume index on the shelf: 0, 1, 2
    const [selectedVolIdx, setSelectedVolIdx] = useState(0);
    // Is a notebook currently opened into two-page spread?
    const [isOpen, setIsOpen] = useState(false);
    // Active project index inside the opened volume (0..N-1)
    const [activeProjectIdx, setActiveProjectIdx] = useState(0);
    // Active plate/image index on the right page
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    // Expandable tech stack tags toggle
    const [showAllTech, setShowAllTech] = useState(false);
    // Page fanning animation on initial open
    const [isFlippingOpen, setIsFlippingOpen] = useState(false);

    const activeVolume = volumes[selectedVolIdx] || volumes[0];
    const currentProject = activeVolume.projects[activeProjectIdx] || activeVolume.projects[0];

    // Generate realistic flipping leaves from last project down to first folio
    const flippingLeaves = (activeVolume.projects || []).length > 1
        ? activeVolume.projects.slice(1).reverse().map((p, idx, arr) => ({
            folioNum: activeVolume.projects.indexOf(p) + 1,
            title: lang === 'id' ? p.title_id : p.title_en,
            index: idx,
            total: arr.length
        }))
        : [];

    const nextProject = () => {
        setActiveImageIdx(0);
        setShowAllTech(false);
        if (activeProjectIdx < activeVolume.projects.length - 1) {
            setActiveProjectIdx((prev) => prev + 1);
        } else if (selectedVolIdx < volumes.length - 1) {
            // Jump to next volume
            setSelectedVolIdx((prev) => prev + 1);
            setActiveProjectIdx(0);
        }
    };

    const prevProject = () => {
        setActiveImageIdx(0);
        setShowAllTech(false);
        if (activeProjectIdx > 0) {
            setActiveProjectIdx((prev) => prev - 1);
        } else if (selectedVolIdx > 0) {
            // Jump to previous volume last item
            setSelectedVolIdx((prev) => prev - 1);
            setActiveProjectIdx(volumes[selectedVolIdx - 1].projects.length - 1);
        }
    };

    const openVolume = (volIdx = null, projIdx = 0) => {
        if (volIdx !== null) setSelectedVolIdx(volIdx);
        setActiveProjectIdx(projIdx);
        setActiveImageIdx(0);
        setShowAllTech(false);
        setIsFlippingOpen(true);
        setIsOpen(true);
        setTimeout(() => {
            setIsFlippingOpen(false);
        }, 1850);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (isOpen) {
                if (e.key === 'ArrowRight') nextProject();
                if (e.key === 'ArrowLeft') prevProject();
                if (e.key === 'Escape') setIsOpen(false);
            } else {
                if (e.key === 'ArrowRight') setSelectedVolIdx((prev) => (prev + 1) % volumes.length);
                if (e.key === 'ArrowLeft') setSelectedVolIdx((prev) => (prev - 1 + volumes.length) % volumes.length);
                if (e.key === 'Enter') openVolume(selectedVolIdx, 0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedVolIdx, activeProjectIdx]);

    const getImages = (project) => {
        if (!project) return [];
        const paths = project.image_paths ?? [];
        if (paths.length > 0) return paths.map((p) => `/storage/${p}`);
        if (project.image_path) return [`/storage/${project.image_path}`];
        return [];
    };

    const currentImages = getImages(currentProject);

    return (
        <div className="w-full">
            {/* ════════════════════════════════════════════════════════════════
                STATE 1: THE SHELF / RACK OF NOTEBOOKS (Paper by WeTransfer style)
                ════════════════════════════════════════════════════════════════ */}
            {!isOpen ? (
                <div className="py-8 sm:py-12">
                    {/* Active Journal Title Indicator */}
                    <div className="text-center mb-8 sm:mb-12 space-y-2">
                        <h2 className="font-editorial-title text-4xl sm:text-5xl text-slate-900 tracking-tight">
                            {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                        </h2>
                        <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <span>{activeVolume.projects.length} {lang === 'id' ? 'Proyek Tersimpan' : 'Documented Projects'}</span>
                            <span>&bull;</span>
                            <span className="text-teal-700 font-semibold cursor-pointer hover:underline" onClick={() => openVolume(selectedVolIdx, 0)}>
                                {lang === 'id' ? 'Buka Lembaran Jurnal →' : 'Open Dossier Sheets →'}
                            </span>
                        </p>
                    </div>

                    {/* Horizontal Notebooks Shelf */}
                    <div className="flex items-center justify-center gap-6 sm:gap-10 py-6 overflow-x-auto px-4">
                        {volumes.map((vol, vIdx) => {
                            const isSelected = vIdx === selectedVolIdx;
                            const firstProject = vol.projects[0];
                            const previewImage = firstProject ? getImages(firstProject)[0] : null;

                            return (
                                <div
                                    key={vol.id}
                                    onClick={() => {
                                        if (isSelected) {
                                            openVolume(vIdx, 0);
                                        } else {
                                            setSelectedVolIdx(vIdx);
                                        }
                                    }}
                                    className={`group cursor-pointer flex flex-col items-center transition-all duration-300 transform shrink-0 select-none ${
                                        isSelected
                                            ? 'scale-105 -translate-y-3'
                                            : 'opacity-75 hover:opacity-100 hover:scale-100 scale-95'
                                    }`}
                                    style={{ width: '260px', smWidth: '300px' }}
                                >
                                    {/* Physical Notebook Body */}
                                    <div
                                        className={`relative w-64 sm:w-72 h-84 sm:h-96 rounded-r-2xl rounded-l-md overflow-hidden flex transition-all duration-300 ${vol.coverBg} text-white`}
                                    >
                                        {/* 1. Left Spine Fabric Tape */}
                                        <div
                                            className="w-8 sm:w-10 h-full shrink-0 relative flex flex-col justify-between py-6 items-center"
                                            style={{ backgroundColor: vol.spineColor }}
                                        >
                                            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
                                            <div className="text-sm text-white/80 font-medium -rotate-90 whitespace-nowrap">
                                                Volume {vIdx + 1}
                                            </div>
                                            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
                                        </div>

                                        {/* 2. White Paper Edge Stack */}
                                        <div className="w-3 h-full bg-slate-100 shrink-0" />

                                        {/* 3. Cover Artwork / Project Plate Preview */}
                                        <div className="flex-1 p-5 flex flex-col justify-between text-white relative">
                                            {/* Top label */}
                                            <div className="flex items-center justify-between text-sm text-white/80">
                                                <span>Bagian {vIdx + 1}</span>
                                                <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-sm font-medium">
                                                    {vol.projects.length} Lembar
                                                </span>
                                            </div>

                                            {/* Preview Thumbnail Artwork */}
                                            <div className="my-auto py-2">
                                                {previewImage ? (
                                                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black/30 group-hover:scale-105 transition-transform duration-300">
                                                        <img
                                                            src={previewImage}
                                                            alt={vol.title_en}
                                                            className="w-full h-full object-cover object-top"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-full aspect-[4/3] rounded-lg bg-white/10 flex flex-col items-center justify-center p-3 text-center">
                                                        <Code2 size={32} className="text-white/70 mb-2" />
                                                        <span className="text-sm text-white/90">Arsitektur Rekayasa</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom Cover Title */}
                                            <div>
                                                <h3 className="font-editorial-title text-2xl sm:text-3xl tracking-tight leading-tight">
                                                    {lang === 'id' ? vol.title_id : vol.title_en}
                                                </h3>
                                                <p className="text-sm text-white/70 line-clamp-1 mt-1 font-editorial-serif italic">
                                                    {lang === 'id' ? vol.subtitle_id : vol.subtitle_en}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action button below active book */}
                                    {isSelected && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openVolume(vIdx, 0);
                                            }}
                                            className="mt-6 btn-primary flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <BookOpen size={16} />
                                            <span>{lang === 'id' ? 'Buka Jurnal Proyek' : 'Open Project Dossier'}</span>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Shelf Pagination Dots / Switcher */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        {volumes.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedVolIdx(i)}
                                className={`h-2.5 rounded-full transition-all ${
                                    i === selectedVolIdx ? 'w-8 bg-teal-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                                }`}
                                aria-label={`Select volume ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                /* ════════════════════════════════════════════════════════════════
                   STATE 2: OPENED JOURNAL SPREAD (Paper by WeTransfer Open Mode)
                   ════════════════════════════════════════════════════════════════ */
                <div className="py-2 sm:py-4">
                    {/* Top Control Bar: Back to Shelf & Page Scrubber */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="btn-secondary !py-1.5 !px-3 text-xs font-medium flex items-center gap-1.5"
                            >
                                <X size={14} />
                                <span>{lang === 'id' ? 'Tutup & Kembali ke Rak Jurnal' : 'Close & Return to Shelf'}</span>
                            </button>
                            <button
                                onClick={() => {
                                    setIsFlippingOpen(true);
                                    setTimeout(() => setIsFlippingOpen(false), 1850);
                                }}
                                className="btn-secondary !py-1.5 !px-3 text-xs font-medium flex items-center gap-1.5 text-teal-800 hover:text-teal-950"
                                title={lang === 'id' ? 'Putar Ulang Animasi Membuka Lembaran' : 'Replay Book Opening Animation'}
                            >
                                <BookOpen size={14} className="text-teal-600" />
                                <span className="hidden sm:inline">{lang === 'id' ? 'Buka Ulang Jurnal' : 'Replay Dossier Flip'}</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                                {lang === 'id' ? 'Lembar' : 'Sheet'} {activeProjectIdx + 1} / {activeVolume.projects.length}
                            </span>
                            <button
                                onClick={prevProject}
                                disabled={activeProjectIdx === 0 && selectedVolIdx === 0}
                                className="btn-secondary !p-1.5 disabled:opacity-30"
                                aria-label="Previous sheet"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={nextProject}
                                disabled={activeProjectIdx === activeVolume.projects.length - 1 && selectedVolIdx === volumes.length - 1}
                                className="btn-secondary !p-1.5 disabled:opacity-30"
                                aria-label="Next sheet"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Opened Two-Page Spread (Desktop fits viewport cleanly, mobile flows comfortably with breathing room) */}
                    <div 
                        className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl open-spread-shadow flex flex-col md:flex-row border border-slate-200 h-auto md:h-[580px] lg:h-[610px] md:max-h-[calc(100vh-190px)]"
                        style={{ perspective: '2000px' }}
                    >
                        
                        {/* ── 3D Fanning Page Flip Sequence on Initial Open (Flipping from last folio to page 1) ── */}
                        <AnimatePresence>
                            {isFlippingOpen && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="absolute inset-0 z-50 pointer-events-none"
                                    style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}
                                >
                                    {/* Desktop & Tablet: 3D Paper Leaves Flipping from Last Folio down to Page 1 */}
                                    <div className="hidden md:block absolute inset-0 [transform-style:preserve-3d]">
                                        {/* Outer Cover Leaf that swings open first with realistic weight */}
                                        <motion.div
                                            initial={{ rotateY: 0, translateZ: 0 }}
                                            animate={{ 
                                                rotateY: [0, -45, -90, -145, -180],
                                                translateZ: [0, 35, 60, 30, 0]
                                            }}
                                            transition={{ 
                                                duration: 0.85, 
                                                times: [0, 0.25, 0.5, 0.75, 1],
                                                ease: "easeInOut" 
                                            }}
                                            style={{
                                                left: '50%',
                                                width: '50%',
                                                top: 0,
                                                bottom: 0,
                                                position: 'absolute',
                                                transformOrigin: 'left center',
                                                transformStyle: 'preserve-3d',
                                                zIndex: 40
                                            }}
                                        >
                                            {/* Front Face: Book Cover */}
                                            <div 
                                                className={`absolute inset-0 ${activeVolume.coverBg} rounded-r-2xl border-l border-slate-900 shadow-2xl p-8 flex flex-col justify-between text-white [backface-visibility:hidden]`}
                                            >
                                                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/70">
                                                    <BookOpen size={14} />
                                                    <span>ENGINEERING DOSSIER // OPENING</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-black/25 rounded border border-white/20">
                                                        {activeVolume.projects.length} Documented Projects
                                                    </span>
                                                    <h3 className="font-editorial-title text-3xl text-white">
                                                        {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                                                    </h3>
                                                </div>
                                                <div className="text-xs text-white/50 font-mono flex items-center justify-between border-t border-white/20 pt-2">
                                                    <span>TURNING SHEETS...</span>
                                                    <span>FOLIO #01</span>
                                                </div>
                                            </div>

                                            {/* Back Face: Inside Cover Leaf */}
                                            <div 
                                                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                                className="absolute inset-0 bg-[#e8e4dc] rounded-l-2xl border-r border-slate-400 p-8 flex flex-col justify-between shadow-2xl"
                                            >
                                                <div className="text-xs font-mono text-slate-500">COVER VERSO</div>
                                                <div className="text-center font-editorial-serif italic text-slate-600 text-sm">
                                                    {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                                                </div>
                                                <div className="text-[10px] font-mono text-slate-400 text-right">NANANG ADITYA ARCHIVE</div>
                                            </div>
                                        </motion.div>

                                        {/* Flipping Leaves: Turning sequentially from last project down to Folio #01 with authentic 3D curvature */}
                                        {flippingLeaves.map((leaf, i) => {
                                            const delay = 0.22 + i * 0.3;
                                            return (
                                                <motion.div
                                                    key={leaf.folioNum}
                                                    initial={{ 
                                                        rotateY: 0, 
                                                        translateZ: 0,
                                                        rotateZ: 0 
                                                    }}
                                                    animate={{ 
                                                        rotateY: [0, -45, -90, -145, -180],
                                                        translateZ: [0, 45, 85, 45, 0],
                                                        rotateZ: [0, -2, -3.5, -1.5, 0],
                                                        zIndex: [35 - i, 60, 60, 20 + i, 20 + i]
                                                    }}
                                                    transition={{ 
                                                        duration: 0.9, 
                                                        delay, 
                                                        times: [0, 0.25, 0.5, 0.75, 1],
                                                        ease: "easeInOut" 
                                                    }}
                                                    style={{
                                                        left: '50%',
                                                        width: '50%',
                                                        top: 0,
                                                        bottom: 0,
                                                        position: 'absolute',
                                                        transformOrigin: 'left center',
                                                        transformStyle: 'preserve-3d'
                                                    }}
                                                >
                                                    {/* Front Face: Sheet on right side before turning */}
                                                    <div 
                                                        className="absolute inset-0 bg-[#faf8f4] bg-grid-paper rounded-r-xl border-l border-slate-300 shadow-2xl p-6 flex flex-col justify-between [backface-visibility:hidden] select-none overflow-hidden"
                                                    >
                                                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-200 pb-2">
                                                            <span className="font-semibold text-slate-600">
                                                                {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                                                            </span>
                                                            <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                                                FOLIO #{String(leaf.folioNum).padStart(2, '0')}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-2 py-4">
                                                            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded">
                                                                ARCHIVE SPECIFICATION
                                                            </span>
                                                            <h4 className="font-editorial-title text-xl text-slate-900 line-clamp-2">
                                                                {leaf.title}
                                                            </h4>
                                                            <div className="space-y-1.5 pt-2">
                                                                <div className="h-1.5 w-full bg-slate-200 rounded" />
                                                                <div className="h-1.5 w-4/5 bg-slate-200 rounded" />
                                                                <div className="h-1.5 w-2/3 bg-slate-200 rounded" />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-200">
                                                            <span className="text-teal-700 font-semibold">
                                                                MEMBUKA LEMBARAN...
                                                            </span>
                                                            <span>HALAMAN {leaf.folioNum}</span>
                                                        </div>
                                                        
                                                        {/* Dynamic Spine Crease Lighting Effect */}
                                                        <motion.div 
                                                            animate={{ opacity: [0, 0.35, 0.6, 0.1, 0] }}
                                                            transition={{ duration: 0.9, delay, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }}
                                                            className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none rounded-r-xl" 
                                                        />
                                                    </div>

                                                    {/* Back Face: Sheet resting on the left side after turning */}
                                                    <div 
                                                        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                                        className="absolute inset-0 bg-[#f4f1ea] rounded-l-xl border-r border-slate-300 shadow-2xl p-6 flex flex-col justify-between select-none overflow-hidden"
                                                    >
                                                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-200 pb-2">
                                                            <span className="font-bold text-teal-800">
                                                                FOLIO #{String(leaf.folioNum).padStart(2, '0')} (VERSO)
                                                            </span>
                                                            <span>SYSTEM SCHEMATIC</span>
                                                        </div>
                                                        <div className="space-y-2 py-4 opacity-70">
                                                            <div className="h-2 w-3/4 bg-slate-300 rounded" />
                                                            <div className="h-2 w-1/2 bg-slate-300 rounded" />
                                                            <div className="h-2 w-2/3 bg-slate-300 rounded" />
                                                        </div>
                                                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-200">
                                                            <span>RECORD VERIFIED</span>
                                                            <span>PAGE {leaf.folioNum}</span>
                                                        </div>

                                                        {/* Dynamic Spine Crease Landing Lighting Effect */}
                                                        <motion.div 
                                                            animate={{ opacity: [0, 0.1, 0.6, 0.35, 0] }}
                                                            transition={{ duration: 0.9, delay, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }}
                                                            className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/10 to-transparent pointer-events-none rounded-l-xl" 
                                                        />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Mobile Screens (< md:): Cascading Smooth Sheet Flip Wave */}
                                    <div className="md:hidden absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                                        <div className="relative w-full max-w-xs h-72">
                                            {flippingLeaves.map((leaf, idx) => (
                                                <motion.div
                                                    key={leaf.folioNum}
                                                    initial={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                                                    animate={{ 
                                                        y: [0, -25, -65],
                                                        opacity: [1, 1, 0],
                                                        rotateX: [0, -20, -55],
                                                        scale: [1, 1.02, 0.95]
                                                    }}
                                                    transition={{ 
                                                        duration: 0.75, 
                                                        delay: 0.18 + idx * 0.28, 
                                                        times: [0, 0.4, 1],
                                                        ease: [0.22, 1, 0.36, 1] 
                                                    }}
                                                    className="absolute inset-0 bg-[#faf8f4] border border-slate-300 rounded-xl p-5 shadow-2xl flex flex-col justify-between"
                                                    style={{ zIndex: 30 - idx }}
                                                >
                                                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-200 pb-2">
                                                        <span className="text-teal-800 font-bold">FOLIO #{String(leaf.folioNum).padStart(2, '0')}</span>
                                                        <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded">MEMBUKA...</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{leaf.title}</h4>
                                                        <div className="space-y-1 mt-2">
                                                            <div className="h-1.5 w-full bg-slate-200 rounded" />
                                                            <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="text-[11px] font-mono text-slate-400 border-t border-slate-200 pt-2 flex items-center justify-between">
                                                        <span>{lang === 'id' ? 'Menuju Halaman 1' : 'To Page 1'}</span>
                                                        <span>#{leaf.folioNum}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {/* Destination Page 1 underneath */}
                                            <div className="absolute inset-0 bg-white border border-teal-500 rounded-xl p-5 shadow-xl flex flex-col justify-between z-0">
                                                <div className="flex items-center justify-between text-xs font-mono text-teal-800 border-b border-slate-200 pb-2 font-bold">
                                                    <span>FOLIO #01</span>
                                                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">READY</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 text-sm">
                                                        {lang === 'id' ? currentProject?.title_id : currentProject?.title_en}
                                                    </h4>
                                                </div>
                                                <div className="text-[11px] font-mono text-teal-700 border-t border-slate-200 pt-2 flex items-center justify-between font-bold">
                                                    <span>{lang === 'id' ? 'Lembar Pertama Terbuka' : 'First Sheet Open'}</span>
                                                    <span>#01</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Center Spine Crease */}
                        <div className="hidden md:block absolute inset-y-0 left-1/2 w-[1px] bg-slate-300 -translate-x-1/2 z-30" />
                        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-full w-12 book-spine-gutter-left z-20 pointer-events-none" />
                        <div className="hidden md:block absolute inset-y-0 left-1/2 w-12 book-spine-gutter-right z-20 pointer-events-none" />

                        {/* ── LEFT PAGE: Engineering Specification ── */}
                        <div className="w-full md:w-1/2 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-grid-paper border-b md:border-b-0 md:border-r border-slate-200 overflow-hidden md:rounded-l-2xl">
                            {/* Running Header */}
                            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                                <span className="font-semibold text-teal-800">
                                    {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                                </span>
                                <span>FOLIO #{String(activeProjectIdx + 1).padStart(2, '0')}</span>
                            </div>

                            {/* Main Project Content with Animated Page Turn */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProjectIdx}
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    className="flex-1 min-h-0 flex flex-col justify-center py-2 space-y-2.5 overflow-hidden"
                                >
                                    <div>
                                        <h3 className="font-editorial-title text-2xl sm:text-3xl text-slate-900 leading-tight tracking-tight">
                                            {(() => {
                                                const raw = lang === 'id' ? currentProject.title_id : currentProject.title_en;
                                                return raw.includes('(') ? raw.split('(')[0].trim() : raw;
                                            })()}
                                        </h3>
                                        {(() => {
                                            const raw = lang === 'id' ? currentProject.title_id : currentProject.title_en;
                                            if (raw.includes('(')) {
                                                const sub = raw.split('(')[1].replace(')', '').trim();
                                                return (
                                                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                                                        {sub}
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>

                                    {/* Scrollable Description Panel (Roomy and comfortable to read on mobile) */}
                                    <div className="overflow-y-auto min-h-[90px] md:max-h-[210px] pr-2 custom-scrollbar">
                                        <p className="font-editorial-serif text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                                            {lang === 'id' ? currentProject.description_id : currentProject.description_en}
                                        </p>
                                    </div>

                                    {/* Tech Stack Badges with Expandable '+... More' Pill */}
                                    <div className="pt-2">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold font-mono">
                                                Engineering Stack
                                            </p>
                                            {(currentProject.tech_stack || []).length > 5 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAllTech(prev => !prev)}
                                                    className="text-[11px] font-mono font-semibold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
                                                >
                                                    {showAllTech 
                                                        ? (lang === 'id' ? '− Sembunyikan' : '− Collapse')
                                                        : `+${(currentProject.tech_stack || []).length - 5} ${lang === 'id' ? 'Lainnya' : 'More'}`}
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 text-xs">
                                            {((currentProject.tech_stack || []).slice(0, showAllTech ? undefined : 5)).map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200 text-[11px] font-mono"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {!showAllTech && (currentProject.tech_stack || []).length > 5 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAllTech(true)}
                                                    className="px-2 py-0.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded border border-teal-200 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                                                >
                                                    +{(currentProject.tech_stack || []).length - 5}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Action Links & Sheet Navigation */}
                            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={prevProject}
                                        disabled={activeProjectIdx === 0 && selectedVolIdx === 0}
                                        className="text-teal-700 font-semibold hover:underline flex items-center gap-1 disabled:opacity-30 disabled:no-underline text-xs"
                                        aria-label="Lembar Sebelumnya"
                                    >
                                        <ChevronLeft size={14} />
                                        <span>{lang === 'id' ? 'Sebelumnya' : 'Prev'}</span>
                                    </button>

                                    <button
                                        onClick={nextProject}
                                        disabled={activeProjectIdx === activeVolume.projects.length - 1 && selectedVolIdx === volumes.length - 1}
                                        className="md:hidden text-teal-700 font-semibold hover:underline flex items-center gap-1 disabled:opacity-30 disabled:no-underline text-xs"
                                        aria-label="Lembar Berikutnya"
                                    >
                                        <span>{lang === 'id' ? 'Berikutnya' : 'Next'}</span>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    {currentProject.demo_url && (
                                        <a
                                            href={currentProject.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary !py-1 !px-2.5 text-xs flex items-center gap-1.5"
                                        >
                                            <ExternalLink size={12} />
                                            <span>Live Platform</span>
                                        </a>
                                    )}
                                    {currentProject.github_url && (
                                        <a
                                            href={currentProject.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary !py-1 !px-2.5 text-xs flex items-center gap-1.5"
                                        >
                                            <GithubIcon size={13} />
                                            <span>Source Code</span>
                                        </a>
                                    )}
                                </div>

                                <span className="text-xs font-mono text-slate-400">
                                    {activeProjectIdx + 1} / {activeVolume.projects.length}
                                </span>
                            </div>
                        </div>

                        {/* ── RIGHT PAGE: UI Screenshot / System Schematics ── */}
                        <div className="w-full md:w-1/2 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-white overflow-hidden md:rounded-r-2xl">
                            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                                <span className="font-semibold uppercase tracking-wider">SYSTEM INTERFACE PLATE</span>
                                <span>{currentImages.length > 0 ? `${activeImageIdx + 1} / ${currentImages.length}` : 'SCHEMATIC'}</span>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeProjectIdx}-${activeImageIdx}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    className="flex-1 min-h-0 flex flex-col justify-center py-2 overflow-hidden"
                                >
                                    {currentImages.length > 0 ? (
                                        <div className="h-full flex flex-col justify-between gap-2 overflow-hidden">
                                            {/* Main Screenshot Frame */}
                                            <div className="flex-1 min-h-0 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center p-2">
                                                <img
                                                    src={currentImages[activeImageIdx]}
                                                    alt={currentProject.title_en}
                                                    className="max-h-full max-w-full object-contain rounded"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Thumbnails if multiple images exist */}
                                            {currentImages.length > 1 && (
                                                <div className="h-12 flex items-center gap-2 overflow-x-auto py-1 shrink-0">
                                                    {currentImages.map((img, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setActiveImageIdx(idx)}
                                                            className={`relative w-14 h-9 shrink-0 rounded overflow-hidden transition-all ${
                                                                idx === activeImageIdx
                                                                    ? 'ring-2 ring-teal-600'
                                                                    : 'opacity-50 hover:opacity-100'
                                                            }`}
                                                            aria-label={`View image ${idx + 1}`}
                                                        >
                                                            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-slate-50 rounded-lg border border-slate-200 p-6 flex flex-col justify-center items-center text-center space-y-3">
                                            <Layers size={36} className="text-teal-700 opacity-80" />
                                            <p className="text-sm uppercase tracking-wider font-semibold text-slate-800">
                                                Backend Core Architecture
                                            </p>
                                            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                                                {lang === 'id'
                                                    ? 'Sistem enterprise berbasis microservice API, relasi skema database PostgreSQL/MySQL, dan queue pipeline.'
                                                    : 'Enterprise backend system powered by API endpoints, normalized database schemas, and queue services.'}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation to next & previous sheet (Both available on mobile and desktop) */}
                            <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                                <button
                                    onClick={prevProject}
                                    disabled={activeProjectIdx === 0 && selectedVolIdx === 0}
                                    className="text-teal-700 font-semibold hover:underline flex items-center gap-1 disabled:opacity-30 disabled:no-underline"
                                    aria-label="Lembar Sebelumnya"
                                >
                                    <ChevronLeft size={14} />
                                    <span>{lang === 'id' ? 'Lembar Sebelumnya' : 'Previous Sheet'}</span>
                                </button>

                                <span className="hidden sm:inline font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                                    NANANG ADITYA &bull; DOSSIER
                                </span>

                                <button
                                    onClick={nextProject}
                                    disabled={activeProjectIdx === activeVolume.projects.length - 1 && selectedVolIdx === volumes.length - 1}
                                    className="text-teal-700 font-semibold hover:underline flex items-center gap-1 disabled:opacity-30 disabled:no-underline"
                                    aria-label="Lembar Berikutnya"
                                >
                                    <span>{lang === 'id' ? 'Lembar Berikutnya' : 'Next Sheet'}</span>
                                    <ArrowRight size={13} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Single Centered Active Sheet Indicator */}
                    <div className="flex items-center justify-center mt-5">
                        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm rounded-full py-2 px-5">
                            <button
                                onClick={prevProject}
                                disabled={activeProjectIdx === 0 && selectedVolIdx === 0}
                                className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                title={lang === 'id' ? 'Lembar Sebelumnya' : 'Previous Sheet'}
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="text-center px-3">
                                <div className="text-[11px] font-mono uppercase tracking-wider text-teal-800 font-semibold">
                                    {lang === 'id' ? 'LEMBAR' : 'SHEET'} {activeProjectIdx + 1} / {activeVolume.projects.length}
                                </div>
                                <div className="text-sm font-semibold text-slate-900 max-w-[280px] sm:max-w-md truncate">
                                    {lang === 'id'
                                        ? (currentProject.title_id?.includes('(') ? currentProject.title_id.split('(')[0].trim() : currentProject.title_id)
                                        : (currentProject.title_en?.includes('(') ? currentProject.title_en.split('(')[0].trim() : currentProject.title_en)}
                                </div>
                            </div>

                            <button
                                onClick={nextProject}
                                disabled={activeProjectIdx === activeVolume.projects.length - 1 && selectedVolIdx === volumes.length - 1}
                                className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                title={lang === 'id' ? 'Lembar Berikutnya' : 'Next Sheet'}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
