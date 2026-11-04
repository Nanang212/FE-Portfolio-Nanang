import React, { useState } from 'react';
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
                                aria-label="Book view"
                            >
                                <BookOpen size={16} />
                                <span>{lang === 'id' ? 'Buku 3D' : '3D Book'}</span>
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
                        /* Archive Table View */
                        <div className="overflow-x-auto bg-[var(--surface)] shadow-sm">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-[var(--surface-subtle)] text-[var(--ink-faint)] text-xs uppercase tracking-wider font-semibold">
                                        <th className="py-4 px-5 w-14">#</th>
                                        <th className="py-4 px-5">{lang === 'id' ? 'Nama Proyek' : 'Project Title'}</th>
                                        <th className="py-4 px-5 hidden sm:table-cell">Stack</th>
                                        <th className="py-4 px-5 hidden md:table-cell">{lang === 'id' ? 'Deskripsi Ringkas' : 'Description'}</th>
                                        <th className="py-4 px-5 text-right">Tautan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p, idx) => (
                                        <tr key={p.id} className="hover:bg-[var(--surface-subtle)]/70 transition-colors">
                                            <td className="py-4 px-5 text-xs text-[var(--ink-faint)] font-semibold">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="py-4 px-5 font-medium text-[var(--ink)]">
                                                {lang === 'id' ? p.title_id : p.title_en}
                                            </td>
                                            <td className="py-4 px-5 hidden sm:table-cell">
                                                <div className="flex flex-wrap gap-1">
                                                    {(p.tech_stack || []).slice(0, 3).map((t) => (
                                                        <span key={t} className="text-xs px-2 py-0.5 bg-[var(--surface-subtle)] text-[var(--ink-muted)]">
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
                                                            className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 text-sm font-medium"
                                                            title="Live Demo"
                                                        >
                                                            <span>Demo</span>
                                                            <ExternalLink size={13} />
                                                        </a>
                                                    )}
                                                    {p.github_url && (
                                                        <a
                                                            href={p.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[var(--ink-muted)] hover:text-[var(--ink)] inline-flex items-center gap-1 text-sm ml-2"
                                                            title="Source Code"
                                                        >
                                                            <GithubIcon size={15} />
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
            </div>
        </PortfolioLayout>
    );
}
