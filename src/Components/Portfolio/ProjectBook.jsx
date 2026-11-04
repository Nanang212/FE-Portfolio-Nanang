import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, ChevronLeft, ChevronRight, BookOpen, Layers, X, ArrowRight, Code2 } from 'lucide-react';
import { GithubIcon } from '@/Components/UI/SocialIcons';

export default function ProjectBook({ projects = [] }) {
    const { t, i18n } = useTranslation();
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

    const activeVolume = volumes[selectedVolIdx] || volumes[0];
    const currentProject = activeVolume.projects[activeProjectIdx] || activeVolume.projects[0];

    useEffect(() => {
        setActiveImageIdx(0);
    }, [activeProjectIdx, selectedVolIdx]);

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
                if (e.key === 'Enter') setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedVolIdx, activeProjectIdx]);

    const nextProject = () => {
        if (activeProjectIdx < activeVolume.projects.length - 1) {
            setActiveProjectIdx((prev) => prev + 1);
        } else if (selectedVolIdx < volumes.length - 1) {
            // Jump to next volume
            setSelectedVolIdx((prev) => prev + 1);
            setActiveProjectIdx(0);
        }
    };

    const prevProject = () => {
        if (activeProjectIdx > 0) {
            setActiveProjectIdx((prev) => prev - 1);
        } else if (selectedVolIdx > 0) {
            // Jump to previous volume last item
            setSelectedVolIdx((prev) => prev - 1);
            setActiveProjectIdx(volumes[selectedVolIdx - 1].projects.length - 1);
        }
    };

    const openVolume = (volIdx, projIdx = 0) => {
        setSelectedVolIdx(volIdx);
        setActiveProjectIdx(projIdx);
        setIsOpen(true);
    };

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
                            <span className="text-teal-700 font-semibold cursor-pointer hover:underline" onClick={() => setIsOpen(true)}>
                                {lang === 'id' ? 'Buka Lembaran Buku →' : 'Open Sheets →'}
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
                                            setIsOpen(true);
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
                                                setIsOpen(true);
                                            }}
                                            className="mt-6 btn-primary flex items-center gap-2 text-sm font-semibold"
                                        >
                                            <BookOpen size={16} />
                                            <span>{lang === 'id' ? 'Buka Jurnal Ini' : 'Open This Journal'}</span>
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
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn-secondary !py-1.5 !px-3 text-xs font-medium flex items-center gap-1.5"
                        >
                            <X size={14} />
                            <span>{lang === 'id' ? 'Tutup & Kembali ke Rak Jurnal' : 'Close & Return to Shelf'}</span>
                        </button>

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

                    {/* Opened Two-Page Spread (Constrained to fit viewport cleanly without whole-page scroll) */}
                    <div className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl open-spread-shadow flex flex-col md:flex-row overflow-hidden border border-slate-200 md:h-[580px] lg:h-[610px] max-h-[calc(100vh-190px)]">
                        
                        {/* Center Spine Crease */}
                        <div className="hidden md:block absolute inset-y-0 left-1/2 w-[1px] bg-slate-300 -translate-x-1/2 z-30" />
                        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-full w-12 book-spine-gutter-left z-20 pointer-events-none" />
                        <div className="hidden md:block absolute inset-y-0 left-1/2 w-12 book-spine-gutter-right z-20 pointer-events-none" />

                        {/* ── LEFT PAGE: Engineering Specification ── */}
                        <div className="w-full md:w-1/2 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-grid-paper border-b md:border-b-0 md:border-r border-slate-200 overflow-hidden">
                            {/* Running Header */}
                            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                                <span className="font-semibold text-teal-800">
                                    {lang === 'id' ? activeVolume.title_id : activeVolume.title_en}
                                </span>
                                <span>FOLIO #{String(activeProjectIdx + 1).padStart(2, '0')}</span>
                            </div>

                            {/* Main Project Content */}
                            <div className="flex-1 min-h-0 flex flex-col justify-center py-2 space-y-2.5 overflow-hidden">
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

                                {/* Scrollable Description Panel */}
                                <div className="overflow-y-auto max-h-[170px] sm:max-h-[210px] pr-2 custom-scrollbar">
                                    <p className="font-editorial-serif text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                                        {lang === 'id' ? currentProject.description_id : currentProject.description_en}
                                    </p>
                                </div>

                                {/* Tech Stack Badges */}
                                <div className="pt-1">
                                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                                        Engineering Stack
                                    </p>
                                    <div className="flex flex-wrap gap-1 text-xs">
                                        {(currentProject.tech_stack || []).map((t) => (
                                            <span
                                                key={t}
                                                className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Links & Sheet Navigation */}
                            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                                <button
                                    onClick={prevProject}
                                    disabled={activeProjectIdx === 0 && selectedVolIdx === 0}
                                    className="text-teal-700 font-semibold hover:underline flex items-center gap-1 disabled:opacity-30 disabled:no-underline text-xs"
                                    aria-label="Lembar Sebelumnya"
                                >
                                    <ChevronLeft size={14} />
                                    <span>{lang === 'id' ? 'Lembar Sebelumnya' : 'Previous Sheet'}</span>
                                </button>

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
                        <div className="w-full md:w-1/2 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-white overflow-hidden">
                            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                                <span className="font-semibold uppercase tracking-wider">SYSTEM INTERFACE PLATE</span>
                                <span>{currentImages.length > 0 ? `${activeImageIdx + 1} / ${currentImages.length}` : 'SCHEMATIC'}</span>
                            </div>

                            <div className="flex-1 min-h-0 flex flex-col justify-center py-2 overflow-hidden">
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
                            </div>

                            {/* Navigation to next sheet */}
                            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
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
