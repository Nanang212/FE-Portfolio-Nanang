import { useState } from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import ProjectBook from '@/Components/Portfolio/ProjectBook';
import { ExternalLink, BookOpen, List } from 'lucide-react';
import { GithubIcon } from '@/Components/UI/SocialIcons';

export default function Projects({ projects = [] }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [viewMode, setViewMode] = useState('book'); // 'book' | 'table'

    return (
        <PortfolioLayout title={t('projects.title')}>
            <div className="pt-20 sm:pt-24 pb-12">
                <div className="container-max">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <h1 className="font-editorial-title text-4xl sm:text-6xl text-[var(--ink)] leading-none tracking-tight">
                                {t('projects.title')}
                            </h1>
                            <p className="font-editorial-serif text-base sm:text-lg text-[var(--ink-muted)] mt-1.5 italic max-w-xl">
                                {lang === 'id'
                                    ? 'Kumpulan proyek enterprise, jalan tol, dan backend yang dibangun dari 2022 hingga sekarang.'
                                    : 'A collection of enterprise, toll road, and backend systems built from 2022 to present.'}
                            </p>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1 bg-[var(--surface-subtle)] p-1 self-start md:self-end">
                            <button
                                onClick={() => setViewMode('book')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                                    viewMode === 'book'
                                        ? 'bg-[var(--surface)] text-[var(--ink)] font-bold'
                                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                                }`}
                                aria-label="Journal view"
                            >
                                <BookOpen size={16} />
                                <span>{lang === 'id' ? 'Mode Jurnal' : 'Journal Mode'}</span>
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                                    viewMode === 'table'
                                        ? 'bg-[var(--surface)] text-[var(--ink)] font-bold'
                                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                                }`}
                                aria-label="Table view"
                            >
                                <List size={16} />
                                <span>{lang === 'id' ? 'Daftar Arsip' : 'Archive List'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Content View */}
                    {projects.length === 0 ? (
                        <div className="text-center py-24 text-[var(--ink-muted)] text-base">
                            <p>{t('projects.empty')}</p>
                        </div>
                    ) : viewMode === 'book' ? (
                        <ProjectBook projects={projects} />
                    ) : (
                        /* Archive Table / Card View */
                        <div className="mt-4">
                            {/* Mobile View (< sm): Responsive Card List (No horizontal scroll, neatly arranged stack) */}
                            <div className="sm:hidden space-y-3">
                                {projects.map((p, idx) => (
                                    <div 
                                        key={p.id}
                                        className="bg-[var(--surface)] border border-slate-200/90 rounded-xl p-4 shadow-sm hover:border-emerald-500/40 transition-colors"
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
                            <div className="hidden sm:block overflow-x-auto bg-[var(--surface)] border border-slate-200 rounded-xl shadow-sm">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-[var(--surface-subtle)] text-[var(--ink-faint)] text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                                            <th className="py-4 px-5 w-14">#</th>
                                            <th className="py-4 px-5">{lang === 'id' ? 'Nama Proyek' : 'Project Title'}</th>
                                            <th className="py-4 px-5">{lang === 'id' ? 'Teknologi' : 'Tech Stack'}</th>
                                            <th className="py-4 px-5 hidden md:table-cell">{lang === 'id' ? 'Deskripsi Ringkas' : 'Description'}</th>
                                            <th className="py-4 px-5 text-right">{lang === 'id' ? 'Tautan' : 'Links'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-sans">
                                        {projects.map((p, idx) => (
                                            <tr key={p.id} className="hover:bg-[var(--surface-subtle)]/70 transition-colors">
                                                <td className="py-4 px-5 text-xs text-[var(--ink-faint)] font-semibold font-mono">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </td>
                                                <td className="py-4 px-5 font-medium text-[var(--ink)]">
                                                    {lang === 'id' ? p.title_id : p.title_en}
                                                </td>
                                                <td className="py-4 px-5">
                                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                                        {(p.tech_stack || []).map((t) => (
                                                            <span key={t} className="text-xs px-2 py-0.5 bg-[var(--surface-subtle)] text-[var(--ink-muted)] rounded-md border border-slate-200/60 font-mono">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 hidden md:table-cell text-sm font-editorial-serif text-[var(--ink-muted)] max-w-md line-clamp-2">
                                                    {lang === 'id' ? p.description_id : p.description_en}
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <div className="flex items-center justify-end gap-3">
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
            </div>
        </PortfolioLayout>
    );
}
