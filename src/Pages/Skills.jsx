import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import AnimatedSkillsLab from '@/Components/Portfolio/AnimatedSkillsLab';
import { Wrench } from 'lucide-react';

export default function Skills({ skills = {} }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <PortfolioLayout title={t('skills.title')}>
            <div className="pt-20 sm:pt-24 pb-16">
                <div className="container-max">
                    <div className="desk-sheet p-6 sm:p-8 space-y-5 bg-white/95">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                                    <Wrench size={13} className="text-emerald-700" />
                                    <span>Matriks Keahlian & Telemetri Arsitektur</span>
                                </div>
                                <h1 className="font-editorial-title text-3xl sm:text-5xl text-slate-900 leading-none tracking-tight">
                                    {t('skills.title')}
                                </h1>
                            </div>
                            <p className="font-editorial-serif text-sm text-slate-600 italic max-w-md sm:text-right">
                                {lang === 'id'
                                    ? 'Teknologi backend, database, dan DevOps yang terverifikasi di lingkungan produksi.'
                                    : 'Production-verified backend, database, and DevOps engineering stacks.'}
                            </p>
                        </div>

                        {/* Animated Interactive Skills Lab */}
                        <AnimatedSkillsLab skills={skills} />
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
