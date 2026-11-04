import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, ChevronRight, ChevronLeft, Layers, Building2,
    Briefcase, FolderOpen, X, Sparkles, RotateCcw, CheckCircle2
} from 'lucide-react';

export default function AnimatedExperience({ experiences = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // View Mode: 'orbit' (Interactive Folders) | 'timeline' (Classic Two-Pane Stepper)
    const [viewMode, setViewMode] = useState('orbit');

    // Orbit state: whether the main central folder is unpacked into orbiting company folders
    const [isUnpacked, setIsUnpacked] = useState(false);

    // Active inspected folder modal / dossier: null | index (0..4)
    const [selectedFolderIdx, setSelectedFolderIdx] = useState(null);

    // Subproject index inside the inspected folder
    const [activeSubProjectIdx, setActiveSubProjectIdx] = useState(0);

    // Timeline view active index
    const [timelineActiveIdx, setTimelineActiveIdx] = useState(0);

    const openFolder = (idx) => {
        setSelectedFolderIdx(idx);
        setActiveSubProjectIdx(0);
    };

    const nextFolder = () => {
        setSelectedFolderIdx((prev) => (prev < experiences.length - 1 ? prev + 1 : 0));
        setActiveSubProjectIdx(0);
    };

    const prevFolder = () => {
        setSelectedFolderIdx((prev) => (prev > 0 ? prev - 1 : experiences.length - 1));
        setActiveSubProjectIdx(0);
    };

    // Close inspected dossier on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedFolderIdx(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Helper to format date string
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    };

    // Helper for concise, readable subproject tab labels
    const getShortProjectName = (name) => {
        if (!name) return '';
        if (name.includes('Maintenance Core')) return 'Core Action (ADIRA)';
        if (name.includes('Digitalisasi Document')) return lang === 'id' ? 'Digitalisasi Dokumen' : 'Document Digitization';
        if (name.includes('Autofill Document')) return lang === 'id' ? 'Autofill Dokumen' : 'Autofill Documents';
        if (name.includes('(')) return name.split('(')[0].trim();
        return name;
    };

    // 5 Themed Company Dossiers matching the user's design palette
    const folderThemes = [
        {
            // PT Jasa Marga
            bg: 'bg-emerald-600',
            border: 'border-emerald-700/80',
            tabBg: 'bg-emerald-700',
            glow: 'rgba(16, 185, 129, 0.25)',
            textAccent: 'text-emerald-800',
            chipBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            desktopX: 0,
            desktopY: -235,
            rotation: -2,
            stickers: [
                { label: '🛣️ TOL ROAD', bg: 'bg-emerald-900 text-white' },
                { label: '🤖 AI RAG', bg: 'bg-white text-emerald-900 border border-emerald-300' },
                { label: 'POSTGRES', bg: 'bg-emerald-100 text-emerald-800' }
            ]
        },
        {
            // PT Adira Finance
            bg: 'bg-slate-700',
            border: 'border-slate-800',
            tabBg: 'bg-slate-800',
            glow: 'rgba(51, 65, 85, 0.25)',
            textAccent: 'text-slate-800',
            chipBg: 'bg-slate-100 text-slate-800 border-slate-200',
            desktopX: 275,
            desktopY: -75,
            rotation: 3,
            stickers: [
                { label: '🏦 ACTION CORE', bg: 'bg-slate-900 text-white' },
                { label: '☕ JAVA 17', bg: 'bg-amber-100 text-amber-900 border border-amber-200' },
                { label: '📨 KAFKA', bg: 'bg-white text-slate-900' }
            ]
        },
        {
            // PT Mitra Integrasi Informatika
            bg: 'bg-indigo-600',
            border: 'border-indigo-700',
            tabBg: 'bg-indigo-700',
            glow: 'rgba(99, 102, 241, 0.25)',
            textAccent: 'text-indigo-800',
            chipBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
            desktopX: 185,
            desktopY: 210,
            rotation: -3,
            stickers: [
                { label: '🌱 SPRING BOOT', bg: 'bg-indigo-900 text-white' },
                { label: '📊 BPMN/ERD', bg: 'bg-white text-indigo-900 border border-indigo-200' },
                { label: 'SQL', bg: 'bg-indigo-100 text-indigo-800' }
            ]
        },
        {
            // Lavin Technologies
            bg: 'bg-amber-600',
            border: 'border-amber-700',
            tabBg: 'bg-amber-700',
            glow: 'rgba(217, 119, 6, 0.25)',
            textAccent: 'text-amber-800',
            chipBg: 'bg-amber-50 text-amber-800 border-amber-200',
            desktopX: -185,
            desktopY: 210,
            rotation: 2.5,
            stickers: [
                { label: '🛒 POS CASHIER', bg: 'bg-amber-900 text-white' },
                { label: 'LARAVEL', bg: 'bg-white text-amber-900 border border-amber-200' },
                { label: 'AG-GRID', bg: 'bg-amber-100 text-amber-800' }
            ]
        },
        {
            // PT Unicam Digital Studio
            bg: 'bg-teal-600',
            border: 'border-teal-700',
            tabBg: 'bg-teal-700',
            glow: 'rgba(13, 148, 136, 0.25)',
            textAccent: 'text-teal-800',
            chipBg: 'bg-teal-50 text-teal-800 border-teal-200',
            desktopX: -275,
            desktopY: -75,
            rotation: -2.5,
            stickers: [
                { label: '🎓 KONSEL WEB', bg: 'bg-teal-900 text-white' },
                { label: 'DATATABLES', bg: 'bg-white text-teal-900 border border-teal-200' },
                { label: 'RBAC AUTH', bg: 'bg-teal-100 text-teal-800' }
            ]
        }
    ];

    const currentInspectExp = selectedFolderIdx !== null ? experiences[selectedFolderIdx] : null;
    const currentInspectTheme = selectedFolderIdx !== null ? folderThemes[selectedFolderIdx] : null;
    const currentSubProjects = currentInspectExp?.projects || [];
    const currentActiveSubProject = currentSubProjects[activeSubProjectIdx] || currentSubProjects[0];

    return (
        <div className="w-full">
            {/* Top Toolbar: Switcher between Folder Orbit & Classic Timeline */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider">
                        {lang === 'id' ? 'NAVIGASI PENGALAMAN' : 'EXPERIENCE VIEWER'}
                    </span>
                    <span>&bull;</span>
                    <span>{experiences.length} {lang === 'id' ? 'Entitas Industri' : 'Industrial Entities'}</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setViewMode('orbit')}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                            viewMode === 'orbit'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilan Folder Orbit"
                    >
                        <FolderOpen size={13} className="text-emerald-700" />
                        <span>{lang === 'id' ? 'Folder Orbit' : 'Folder Orbit'}</span>
                    </button>
                    <button
                        onClick={() => setViewMode('timeline')}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                            viewMode === 'timeline'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilan Timeline Klasik"
                    >
                        <Building2 size={13} className="text-slate-600" />
                        <span>{lang === 'id' ? 'Timeline' : 'Timeline'}</span>
                    </button>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                VIEW 1: INTERACTIVE FOLDER ORBIT (Pop-out constellation)
                ════════════════════════════════════════════════════════════════ */}
            {viewMode === 'orbit' && (
                <div className="relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[660px] bg-grid-paper rounded-2xl border border-slate-200/90 shadow-inner flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
                    
                    {/* Atmospheric Subtle Orbital Guideline Ring (Visible when unpacked on desktop) */}
                    {isUnpacked && (
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="hidden md:block absolute w-[550px] h-[550px] rounded-full border border-dashed border-emerald-400/40 pointer-events-none z-0 animate-pulse"
                            style={{ boxShadow: '0 0 70px rgba(16, 185, 129, 0.08)' }}
                        />
                    )}

                    {/* ── DESKTOP & TABLET CONSTELLATION ORBIT (md: and above) ── */}
                    <div className="hidden md:block relative w-full h-[600px] lg:h-[620px]">
                        {/* Central Master Folder Button */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setIsUnpacked(!isUnpacked)}
                                className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
                                aria-label="Buka Arsip Karir"
                            >
                                {/* Outer Folder Tab */}
                                <div className="w-24 h-5 bg-[#0b2920] rounded-t-lg border-t border-l border-r border-emerald-500/40 ml-4 flex items-center justify-center">
                                    <span className="text-[9px] font-mono text-emerald-300 tracking-widest font-bold">
                                        MASTER
                                    </span>
                                </div>

                                {/* Main Folder Body */}
                                <div className="w-52 h-34 bg-[#10382c] rounded-2xl rounded-tl-none border-2 border-emerald-500/50 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden text-left transition-all group-hover:border-emerald-400 group-hover:shadow-emerald-950/40">
                                    {/* Peeking Tabs inside the master folder */}
                                    <div className="absolute top-1.5 inset-x-3 flex justify-between gap-1 opacity-75">
                                        <div className="w-8 h-2 bg-emerald-400 rounded-t-xs" />
                                        <div className="w-8 h-2 bg-slate-400 rounded-t-xs" />
                                        <div className="w-8 h-2 bg-indigo-400 rounded-t-xs" />
                                        <div className="w-8 h-2 bg-amber-400 rounded-t-xs" />
                                        <div className="w-8 h-2 bg-teal-400 rounded-t-xs" />
                                    </div>

                                    {/* Folder Header */}
                                    <div className="pt-2 flex items-center justify-between text-white/70">
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider">
                                            <Briefcase size={13} className="text-emerald-400" />
                                            <span>CAREER ARCHIVE</span>
                                        </div>
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                    </div>

                                    {/* Center Title */}
                                    <div className="space-y-0.5">
                                        <h3 className="font-editorial-title text-xl text-white tracking-tight leading-none">
                                            {lang === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE'}
                                        </h3>
                                        <p className="font-mono text-[10px] text-emerald-200/80">
                                            {experiences.length} {lang === 'id' ? 'Entitas Industri' : 'Industry Entities'}
                                        </p>
                                    </div>

                                    {/* Bottom Status / Action Prompt */}
                                    <div className="pt-2 border-t border-emerald-600/40 flex items-center justify-between text-[10px] font-mono font-bold">
                                        <span className="text-emerald-300 group-hover:text-white flex items-center gap-1 transition-colors">
                                            {isUnpacked ? (
                                                <>
                                                    <RotateCcw size={11} />
                                                    <span>{lang === 'id' ? 'Tutup Orbit' : 'Collapse Orbit'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={11} className="text-amber-300" />
                                                    <span>{lang === 'id' ? 'Buka Folder Karir' : 'Unpack Folders'}</span>
                                                </>
                                            )}
                                        </span>
                                        <span className="bg-emerald-500/20 text-emerald-200 px-1.5 py-0.2 rounded text-[9px]">
                                            {isUnpacked ? 'ACTIVE' : 'CLICK ME'}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        {/* Orbiting Company Folders (Pop out smoothly around the central master folder with generous clearance) */}
                        {experiences.map((exp, idx) => {
                            const theme = folderThemes[idx] || folderThemes[0];
                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
                                    animate={
                                        isUnpacked
                                            ? {
                                                  x: theme.desktopX,
                                                  y: theme.desktopY,
                                                  opacity: 1,
                                                  scale: 1,
                                                  rotate: theme.rotation
                                              }
                                            : {
                                                  x: 0,
                                                  y: 0,
                                                  opacity: 0,
                                                  scale: 0.2,
                                                  rotate: 0
                                              }
                                    }
                                    transition={{
                                        type: 'spring',
                                        stiffness: 220,
                                        damping: 20,
                                        delay: isUnpacked ? idx * 0.06 : 0
                                    }}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        position: 'absolute',
                                        marginLeft: '-88px', // half of folder width (176px / 2)
                                        marginTop: '-64px',  // half of folder height (128px / 2)
                                        zIndex: isUnpacked ? 25 : 10,
                                        pointerEvents: isUnpacked ? 'auto' : 'none'
                                    }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.08, rotate: 0 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => openFolder(idx)}
                                        className="group flex flex-col items-start focus:outline-none cursor-pointer"
                                        aria-label={`Buka Folder ${exp.company}`}
                                    >
                                        {/* Peeking Collages / Stickers behind the folder flap */}
                                        <div className="w-full flex items-end justify-between px-3 -mb-1.5 z-0">
                                            {/* Folder Tab */}
                                            <div className={`w-16 h-4.5 ${theme.tabBg} rounded-t-lg border-t border-l border-r border-black/20 flex items-center justify-center shadow-xs`}>
                                                <span className="text-[8.5px] font-mono text-white/90 font-bold uppercase tracking-wider">
                                                    #{idx + 1}
                                                </span>
                                            </div>

                                            {/* Cute peeking stickers */}
                                            <div className="flex items-center gap-1">
                                                {theme.stickers.map((stk, sIdx) => (
                                                    <span
                                                        key={sIdx}
                                                        className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded shadow-xs transform -translate-y-1 ${stk.bg} transition-transform group-hover:-translate-y-2.5`}
                                                    >
                                                        {stk.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Folder Front Body */}
                                        <div className={`w-44 h-30 ${theme.bg} rounded-2xl rounded-tl-none border-2 ${theme.border} shadow-xl p-3 flex flex-col justify-between text-left text-white relative overflow-hidden transition-all group-hover:shadow-2xl`}>
                                            {/* Subtle paper grid texture */}
                                            <div className="absolute inset-0 bg-white/5 opacity-40 pointer-events-none" />

                                            {/* Active Live Pulse if current */}
                                            {exp.is_current && (
                                                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/25 px-1.5 py-0.5 rounded text-[8.5px] font-mono text-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span>AKTIF</span>
                                                </div>
                                            )}

                                            <div>
                                                <h4 className="font-editorial-title text-base sm:text-lg text-white leading-tight line-clamp-1 pr-6">
                                                    {exp.company}
                                                </h4>
                                                <p className="text-[11px] font-sans font-semibold text-white/85 line-clamp-1 mt-0.5">
                                                    {exp.role}
                                                </p>
                                            </div>

                                            {/* Bottom Info & Click Prompt */}
                                            <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-[9.5px] font-mono text-white/80">
                                                <span>{formatDate(exp.period_start)}</span>
                                                <span className="text-white font-bold group-hover:underline flex items-center gap-0.5">
                                                    <span>Buka</span>
                                                    <ChevronRight size={10} />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── MOBILE VIEW (< md:): Seamless Unpacking into a Staggered Folder Deck ── */}
                    <div className="md:hidden w-full flex flex-col items-center space-y-4 py-2">
                        {/* Central Master Folder Button for Mobile */}
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setIsUnpacked(!isUnpacked)}
                            className="w-full max-w-xs group relative flex flex-col items-center focus:outline-none cursor-pointer"
                        >
                            <div className="w-24 h-4.5 bg-[#0b2920] rounded-t-lg border-t border-l border-r border-emerald-500/40 ml-4 flex items-center justify-center">
                                <span className="text-[9px] font-mono text-emerald-300 font-bold tracking-widest">MASTER</span>
                            </div>
                            <div className="w-full h-32 bg-[#10382c] rounded-2xl rounded-tl-none border-2 border-emerald-500/50 shadow-xl p-3.5 flex flex-col justify-between text-white text-left">
                                <div className="flex items-center justify-between text-xs text-white/70">
                                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                                        <Briefcase size={12} className="text-emerald-400" />
                                        <span>CAREER ARCHIVE</span>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                </div>
                                <div>
                                    <h3 className="font-editorial-title text-xl text-white leading-tight">
                                        {lang === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE'}
                                    </h3>
                                    <p className="text-xs text-emerald-200/80 font-mono mt-0.5">
                                        {experiences.length} {lang === 'id' ? 'Folder Industri Terverifikasi' : 'Verified Industry Folders'}
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-emerald-600/40 flex items-center justify-between text-xs font-mono font-bold text-emerald-300">
                                    <span className="flex items-center gap-1">
                                        {isUnpacked ? (
                                            <>
                                                <RotateCcw size={12} />
                                                <span>{lang === 'id' ? 'Tutup Folder' : 'Collapse Folders'}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={12} className="text-amber-300" />
                                                <span>{lang === 'id' ? 'Buka 5 Folder Karir ↓' : 'Unpack 5 Folders ↓'}</span>
                                            </>
                                        )}
                                    </span>
                                    <span className="bg-emerald-500/20 text-emerald-200 px-1.5 py-0.5 rounded text-[9px]">
                                        {isUnpacked ? 'BUKA' : 'KETUK'}
                                    </span>
                                </div>
                            </div>
                        </motion.button>

                        {/* Unpacked Mobile Folder List with Rich Stickers & Tech Stack */}
                        <AnimatePresence>
                            {isUnpacked && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full space-y-3.5 pt-2"
                                >
                                    <p className="text-center font-mono text-[11px] text-emerald-800 font-bold uppercase tracking-wider">
                                        {lang === 'id' ? 'Sentuh Folder untuk Melihat Spesifikasi Rekayasa' : 'Tap Folder to Inspect System Dossier'}
                                    </p>

                                    {experiences.map((exp, idx) => {
                                        const theme = folderThemes[idx] || folderThemes[0];
                                        return (
                                            <motion.button
                                                key={exp.id}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => openFolder(idx)}
                                                className="w-full text-left focus:outline-none block"
                                            >
                                                {/* Mobile Folder Tab & Cute Peeking Stickers */}
                                                <div className="flex items-end justify-between px-3 -mb-1">
                                                    <div className={`w-16 h-4.5 ${theme.tabBg} rounded-t-lg flex items-center justify-center text-[9px] font-mono text-white font-bold border-t border-l border-r border-black/20`}>
                                                        #{idx + 1}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {theme.stickers.map((stk, sIdx) => (
                                                            <span key={sIdx} className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded shadow-xs ${stk.bg}`}>
                                                                {stk.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Mobile Folder Body */}
                                                <div className={`w-full ${theme.bg} rounded-2xl rounded-tl-none p-4 border-2 ${theme.border} text-white shadow-lg space-y-2.5 relative overflow-hidden`}>
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h4 className="font-editorial-title text-lg leading-tight text-white">
                                                                {exp.company}
                                                            </h4>
                                                            <p className="text-xs text-white/90 font-semibold mt-0.5">
                                                                {exp.role}
                                                            </p>
                                                        </div>
                                                        {exp.is_current && (
                                                            <span className="shrink-0 text-[8.5px] font-mono bg-black/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                                <span>AKTIF</span>
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Key Tech Stack Preview on Mobile Folder */}
                                                    <div className="flex flex-wrap gap-1 pt-1">
                                                        {(exp.tech_stack || []).slice(0, 4).map(t => (
                                                            <span key={t} className="px-1.5 py-0.2 bg-black/20 text-white/90 font-mono text-[9px] rounded border border-white/10">
                                                                {t}
                                                            </span>
                                                        ))}
                                                        {(exp.tech_stack || []).length > 4 && (
                                                            <span className="px-1.5 py-0.2 bg-white/20 text-white font-mono text-[9px] rounded font-bold">
                                                                +{(exp.tech_stack || []).length - 4}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Bottom Navigation Prompt */}
                                                    <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-mono text-white/80">
                                                        <span>{formatDate(exp.period_start)} &ndash; {exp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.period_end)}</span>
                                                        <span className="font-bold underline flex items-center gap-0.5 text-white">
                                                            <span>{lang === 'id' ? 'Buka Dossier' : 'Inspect'}</span>
                                                            <ChevronRight size={12} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 2: CLASSIC TIMELINE VIEW (Quick Stepper Scanner)
                ════════════════════════════════════════════════════════════════ */}
            {viewMode === 'timeline' && (
                <div className="grid lg:grid-cols-12 gap-4 items-stretch">
                    {/* Left Pane: Stepper List */}
                    <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200">
                        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-200">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                                <Building2 size={12} className="text-emerald-700" />
                                <span>{lang === 'id' ? 'TIMELINE KARIR' : 'CAREER TIMELINE'}</span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 font-semibold">{experiences.length} ENTITIES</span>
                        </div>
                        <div className="flex-1 space-y-1.5 overflow-y-auto pr-0.5 relative">
                            {experiences.map((exp, idx) => {
                                const isSelected = idx === timelineActiveIdx;
                                return (
                                    <button
                                        key={exp.id}
                                        onClick={() => {
                                            setTimelineActiveIdx(idx);
                                            setActiveSubProjectIdx(0);
                                        }}
                                        className={`w-full text-left py-2 px-2.5 rounded-lg transition-colors relative flex items-center justify-between gap-2 border overflow-hidden ${
                                            isSelected
                                                ? 'border-emerald-500 bg-white shadow-sm text-slate-900 font-bold'
                                                : 'bg-white/70 hover:bg-white border-slate-200/80 text-slate-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                                                isSelected ? 'bg-emerald-600' : 'bg-slate-300'
                                            }`} />
                                            <div className="min-w-0">
                                                <h4 className="text-xs truncate">{exp.company}</h4>
                                                <p className="font-mono text-[10px] text-slate-400 truncate font-normal">
                                                    {formatDate(exp.period_start)} &ndash; {exp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.period_end)}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={13} className={isSelected ? 'text-emerald-700' : 'text-slate-300'} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Pane: Timeline Details */}
                    <div className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                        {(() => {
                            const exp = experiences[timelineActiveIdx] || experiences[0];
                            const subs = exp?.projects || [];
                            const activeSub = subs[activeSubProjectIdx] || subs[0];
                            return (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <h3 className="font-editorial-title text-2xl text-slate-900">{exp.company}</h3>
                                        <span className="font-mono text-xs text-slate-500">{formatDate(exp.period_start)} &ndash; {exp.is_current ? 'Sekarang' : formatDate(exp.period_end)}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-emerald-800">{exp.role}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {(exp.tech_stack || []).map(t => (
                                            <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] rounded border border-slate-200">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    {subs.length > 0 && (
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                                            <div className="flex flex-wrap gap-1 pb-1">
                                                {subs.map((p, pIdx) => (
                                                    <button
                                                        key={pIdx}
                                                        onClick={() => setActiveSubProjectIdx(pIdx)}
                                                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                                                            pIdx === activeSubProjectIdx ? 'bg-emerald-800 text-white' : 'bg-white border text-slate-600'
                                                        }`}
                                                    >
                                                        {getShortProjectName(p.name)}
                                                    </button>
                                                ))}
                                            </div>
                                            <h4 className="font-bold text-xs text-slate-900">{activeSub?.name}</h4>
                                            <p className="font-editorial-serif text-xs text-slate-600 leading-relaxed text-justify">
                                                {lang === 'id' ? activeSub?.description_id : activeSub?.description_en}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                POPUP / MODAL INSPECTOR: DETAILED COMPANY DOSSIER
                ════════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {selectedFolderIdx !== null && currentInspectExp && (
                    <div 
                        onClick={() => setSelectedFolderIdx(null)}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-6 sm:pb-8 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 15 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[calc(100vh-120px)] my-auto"
                        >
                            {/* Modal Header Folder Bar with Company Color Accent */}
                            <div className={`${currentInspectTheme.bg} p-4 sm:p-5 text-white flex items-start justify-between gap-3 relative shrink-0`}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/25 text-white">
                                            FOLDER #{selectedFolderIdx + 1} OF {experiences.length}
                                        </span>
                                        {currentInspectExp.is_current && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-400 text-emerald-950 flex items-center gap-1 shadow-xs">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-pulse" />
                                                {lang === 'id' ? 'Aktif Saat Ini' : 'Current Active Role'}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-editorial-title text-2xl sm:text-3xl text-white leading-tight">
                                        {currentInspectExp.company}
                                    </h3>
                                    <p className="text-sm font-sans text-white/90 font-medium">
                                        {currentInspectExp.role}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedFolderIdx(null)}
                                    className="p-1.5 bg-black/20 hover:bg-black/35 rounded-full text-white transition-colors"
                                    aria-label="Tutup Dossier"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Content Body */}
                            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
                                {/* Period & Verification Badge */}
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                                    <div className="flex items-center gap-1.5 font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                                        <Calendar size={13} className="text-emerald-700" />
                                        <span>
                                            {formatDate(currentInspectExp.period_start)} &mdash; {currentInspectExp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(currentInspectExp.period_end)}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex items-center gap-1">
                                        <CheckCircle2 size={12} className="text-emerald-700" />
                                        <span>{lang === 'id' ? 'Terverifikasi Produksi' : 'Production Verified'}</span>
                                    </span>
                                </div>

                                {/* Tech Stack Chips */}
                                <div>
                                    <p className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                                        ENGINEERING STACK
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 text-xs">
                                        {(currentInspectExp.tech_stack || []).map((t) => (
                                            <span
                                                key={t}
                                                className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200/80 font-mono text-[11px]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Subprojects & Key Deliverables */}
                                {currentSubProjects.length > 0 && (
                                    <div className="bg-slate-50/90 rounded-xl p-3.5 sm:p-4 border border-slate-200 space-y-2.5">
                                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                                            <div className="text-[10.5px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                                                <Layers size={13} className="text-emerald-700" />
                                                <span>
                                                    {lang === 'id' ? 'Tanggung Jawab & Proyek Inti' : 'Key Engineering Deliverables'} ({currentSubProjects.length})
                                                </span>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-emerald-800 font-semibold">
                                                {lang === 'id' ? 'Pilih tab untuk rincian' : 'Select tab to inspect'}
                                            </span>
                                        </div>

                                        {/* Multi-project Tabs */}
                                        {currentSubProjects.length > 1 && (
                                            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg">
                                                {currentSubProjects.map((p, pIdx) => {
                                                    const isSubActive = activeSubProjectIdx === pIdx;
                                                    const shortLabel = getShortProjectName(p.name);
                                                    return (
                                                        <button
                                                            key={pIdx}
                                                            onClick={() => setActiveSubProjectIdx(pIdx)}
                                                            className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                                                                isSubActive
                                                                    ? 'bg-emerald-800 text-white shadow-xs'
                                                                    : 'text-slate-600 hover:text-slate-900 bg-white/70 hover:bg-white border border-slate-200/60'
                                                            }`}
                                                        >
                                                            {shortLabel}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Subproject Details */}
                                        <div className="space-y-1.5 pt-1">
                                            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                                                <h4 className="font-bold text-sm text-slate-900">
                                                    {currentActiveSubProject?.name}
                                                </h4>
                                                {currentActiveSubProject?.period && (
                                                    <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                                        {currentActiveSubProject.period}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-editorial-serif text-sm text-slate-700 leading-relaxed text-justify">
                                                {lang === 'id' ? currentActiveSubProject?.description_id : currentActiveSubProject?.description_en}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer Controls: Prev Folder / Next Folder / Close */}
                            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
                                <button
                                    onClick={prevFolder}
                                    className="btn-secondary !py-1 !px-2.5 text-xs flex items-center gap-1"
                                >
                                    <ChevronLeft size={13} />
                                    <span>{lang === 'id' ? 'Folder Sebelumnya' : 'Prev Folder'}</span>
                                </button>

                                <button
                                    onClick={() => setSelectedFolderIdx(null)}
                                    className="text-slate-500 hover:text-slate-800 font-mono text-[11px] underline"
                                >
                                    {lang === 'id' ? 'Tutup Dossier' : 'Close Dossier'}
                                </button>

                                <button
                                    onClick={nextFolder}
                                    className="btn-secondary !py-1 !px-2.5 text-xs flex items-center gap-1"
                                >
                                    <span>{lang === 'id' ? 'Folder Berikutnya' : 'Next Folder'}</span>
                                    <ChevronRight size={13} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
