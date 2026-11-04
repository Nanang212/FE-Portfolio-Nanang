import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, ChevronRight, Layers, Building2 
} from 'lucide-react';

export default function AnimatedExperience({ experiences = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // Active selected company index (0..N-1)
    const [activeIdx, setActiveIdx] = useState(0);

    // Active subproject index within the active company
    const [activeSubProjectIdx, setActiveSubProjectIdx] = useState(0);

    const activeExp = experiences[activeIdx] || experiences[0];
    const subProjects = activeExp?.projects || [];
    const activeSubProject = subProjects[activeSubProjectIdx] || subProjects[0];

    // Helper to format date string
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    };

    // Helper for concise, readable subproject tab labels so they never overflow
    const getShortProjectName = (name) => {
        if (!name) return '';
        if (name.includes('Maintenance Core')) return 'Core Action (ADIRA)';
        if (name.includes('Digitalisasi Document')) return lang === 'id' ? 'Digitalisasi Dokumen' : 'Document Digitization';
        if (name.includes('Autofill Document')) return lang === 'id' ? 'Autofill Dokumen' : 'Autofill Documents';
        if (name.includes('(')) return name.split('(')[0].trim();
        return name;
    };

    // When company changes, reset subproject index to 0
    const handleSelectCompany = (idx) => {
        setActiveIdx(idx);
        setActiveSubProjectIdx(0);
    };

    return (
        <div className="w-full">
            {/* Split Interactive Console Layout (Compact Single-Screen Viewport) */}
            <div className="grid lg:grid-cols-12 gap-4 items-stretch">
                
                {/* ── LEFT PANE: Compact Company Stepper Timeline (4 cols) ── */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200">
                    <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-slate-200">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                            <Building2 size={12} className="text-emerald-700" />
                            <span>{lang === 'id' ? 'TIMELINE KARIR' : 'CAREER TIMELINE'}</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 font-semibold">{lang === 'id' ? '5 INSTANSI' : '5 ENTITIES'}</span>
                    </div>

                    {/* Company Stepper List */}
                    <div className="flex-1 space-y-1.5 overflow-y-auto pr-0.5 relative">
                        {experiences.map((exp, idx) => {
                            const isSelected = idx === activeIdx;
                            return (
                                <motion.button
                                    key={exp.id}
                                    onClick={() => handleSelectCompany(idx)}
                                    whileHover={{ x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full text-left py-2 px-2.5 rounded-lg transition-colors relative flex items-center justify-between gap-2 border overflow-hidden ${
                                        isSelected
                                            ? 'border-emerald-500 shadow-sm text-slate-900'
                                            : 'bg-white/70 hover:bg-white border-slate-200/80 text-slate-600'
                                    }`}
                                >
                                    {/* Fluid Sliding Background Pill */}
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeCompanyHighlight"
                                            className="absolute inset-0 bg-white ring-1 ring-emerald-500/30"
                                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                        />
                                    )}

                                    {/* Marker & Info */}
                                    <div className="flex items-center gap-2 min-w-0 relative z-10">
                                        <div className={`w-2 h-2 rounded-full shrink-0 transition-transform ${
                                            isSelected 
                                                ? 'bg-emerald-600 ring-2 ring-emerald-200 scale-110' 
                                                : exp.is_current 
                                                    ? 'bg-emerald-500 animate-pulse' 
                                                    : 'bg-slate-300'
                                        }`} />

                                        <div className="min-w-0">
                                            <h4 className={`text-xs font-bold truncate leading-tight ${
                                                isSelected ? 'text-slate-900' : 'text-slate-700'
                                            }`}>
                                                {exp.company}
                                            </h4>
                                            <p className="font-mono text-[10px] text-slate-400 truncate">
                                                {formatDate(exp.period_start)} &ndash; {exp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.period_end)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Current indicator or chevron */}
                                    <div className="relative z-10 shrink-0">
                                        {exp.is_current ? (
                                            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[8.5px] font-bold font-mono rounded flex items-center gap-1 shadow-2xs">
                                                <span className="w-1 h-1 rounded-full bg-emerald-600 animate-ping" />
                                                {lang === 'id' ? 'AKTIF' : 'LIVE'}
                                            </span>
                                        ) : (
                                            <ChevronRight size={13} className={`transition-transform ${
                                                isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-slate-300'
                                            }`} />
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* ── RIGHT PANE: Compact Active Enterprise Dossier (8 cols) ── */}
                <div className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeExp?.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="flex-1 flex flex-col justify-between space-y-3"
                        >
                            {/* Company Header Row */}
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-1.5">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                            {lang === 'id' ? 'REKOR #0' : 'RECORD #0'}{activeIdx + 1}
                                        </span>
                                        {activeExp.is_current && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                                {lang === 'id' ? 'Aktif Saat Ini' : 'Current Active Role'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                                        <Calendar size={11} className="text-emerald-700" />
                                        <span>
                                            {formatDate(activeExp.period_start)} &mdash; {activeExp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(activeExp.period_end)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
                                    <div>
                                        <h3 className="font-editorial-title text-2xl sm:text-3xl text-slate-900 leading-tight">
                                            {activeExp.company}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                                            {activeExp.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack Horizontal Chips */}
                            <div>
                                <div className="flex flex-wrap gap-1 text-[11px]">
                                    {(activeExp.tech_stack || []).map((t) => (
                                        <motion.span
                                            key={t}
                                            whileHover={{ y: -1.5, scale: 1.05 }}
                                            className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 transition-colors cursor-default text-slate-700 text-[10px] font-mono rounded border border-slate-200 shadow-2xs"
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Subprojects Interactive Navigator */}
                            {subProjects.length > 0 && (
                                <div className="bg-slate-50/90 rounded-lg p-3 sm:p-3.5 border border-slate-200 flex-1 flex flex-col justify-between space-y-2">
                                    {/* Subprojects Header */}
                                    <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                                        <div className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
                                            <Layers size={11} className="text-emerald-700" />
                                            <span>
                                                {lang === 'id' ? 'Proyek Dipertanggungjawabkan' : 'Key Deliverables'} ({subProjects.length})
                                            </span>
                                        </div>
                                        <span className="text-[9.5px] font-mono text-emerald-800 font-semibold hidden sm:inline">
                                            {lang === 'id' ? 'Klik untuk rincian sistem' : 'Click to inspect system'}
                                        </span>
                                    </div>

                                    {/* Multi-subproject tabs with auto-wrapping / auto-fill */}
                                    {subProjects.length > 1 && (
                                        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/50 rounded-lg">
                                            {subProjects.map((p, pIdx) => {
                                                const isSubActive = activeSubProjectIdx === pIdx;
                                                const shortLabel = getShortProjectName(p.name);
                                                return (
                                                    <motion.button
                                                        key={pIdx}
                                                        onClick={() => setActiveSubProjectIdx(pIdx)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`px-2.5 py-1 rounded text-[10.5px] font-mono font-semibold transition-colors relative ${
                                                            isSubActive
                                                                ? 'text-white shadow-xs'
                                                                : 'text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white border border-slate-200/60'
                                                        }`}
                                                    >
                                                        {isSubActive && (
                                                            <motion.div
                                                                layoutId="activeSubProjectPill"
                                                                className="absolute inset-0 bg-emerald-800 rounded shadow-xs"
                                                                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                                            />
                                                        )}
                                                        <span className="relative z-10 flex items-center gap-1.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-white' : 'bg-emerald-600'}`} />
                                                            <span>{shortLabel}</span>
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Active Subproject Content Card */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeSubProjectIdx}
                                            initial={{ opacity: 0, x: 4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -4 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-1 pt-0.5"
                                        >
                                            <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                                                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                                                    {activeSubProject?.name}
                                                </h4>
                                                {activeSubProject?.period && (
                                                    <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                                        {activeSubProject.period}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-editorial-serif text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify max-h-[110px] sm:max-h-[125px] overflow-y-auto pr-1.5 custom-scrollbar">
                                                {lang === 'id' ? activeSubProject?.description_id : activeSubProject?.description_en}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Ultra-slim Footer */}
                            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span>{lang === 'id' ? 'DOSSIER INDUSTRI TERVERIFIKASI' : 'VERIFIED INDUSTRIAL DOSSIER'}</span>
                                <span className="text-emerald-700 font-semibold">{lang === 'id' ? '100% TERVERIFIKASI PRODUKSI' : '100% PRODUCTION VERIFIED'}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
