import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

export default function Experience({ experiences = [] }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <PortfolioLayout title={t('experience.title')}>
            <div className="pt-28 sm:pt-36 pb-20">
                <div className="container-max max-w-4xl">
                    {/* Header */}
                    <div className="mb-14">
                        <h1 className="font-editorial-title text-5xl sm:text-7xl text-[var(--ink)] leading-none tracking-tight">
                            {t('experience.title')}
                        </h1>
                        <p className="font-editorial-serif text-lg sm:text-xl text-[var(--ink-muted)] mt-2 italic">
                            {lang === 'id'
                                ? 'Riwayat karir teknis dan sistem yang telah dikembangkan di industri.'
                                : 'Technical career timeline and systems engineered in production.'}
                        </p>
                    </div>

                    {/* Timeline Stack */}
                    <div className="space-y-12">
                        {experiences.map((exp) => (
                            <article
                                key={exp.id}
                                className="p-8 sm:p-12 bg-[var(--surface)] space-y-6"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4 pb-2">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            {exp.is_current && (
                                                <span className="px-2.5 py-0.5 bg-[var(--accent)] text-[var(--accent-contrast)] text-xs font-semibold">
                                                    Posisi Saat Ini
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="font-editorial-title text-3xl sm:text-4xl text-[var(--ink)] mt-2">
                                            {exp.company}
                                        </h2>
                                        <p className="text-base text-[var(--accent)] font-semibold mt-1">
                                            {exp.role}
                                        </p>
                                    </div>

                                    <div className="text-sm text-[var(--ink-faint)] flex items-center gap-1.5 self-start pt-1 font-medium">
                                        <Calendar size={15} />
                                        <span>
                                            {formatDate(exp.period_start)} &mdash; {exp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.period_end)}
                                        </span>
                                    </div>
                                </div>

                                {/* Projects Handled */}
                                {(exp.projects || []).length > 0 && (
                                    <div className="space-y-4 pt-2">
                                        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)]">
                                            Sistem &amp; Tanggung Jawab
                                        </p>
                                        <div className="space-y-4">
                                            {exp.projects.map((proj, pi) => (
                                                <div key={pi} className="p-5 bg-[var(--surface-subtle)] space-y-2">
                                                    <h3 className="font-sans font-semibold text-base text-[var(--ink)]">
                                                        {proj.name}
                                                    </h3>
                                                    <p className="font-editorial-serif text-base text-[var(--ink-muted)] leading-relaxed">
                                                        {lang === 'id' ? proj.description_id : proj.description_en}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stack */}
                                {(exp.tech_stack || []).length > 0 && (
                                    <div className="pt-2">
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {exp.tech_stack.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-3 py-1 bg-[var(--surface-subtle)] text-[var(--ink)] font-medium"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
