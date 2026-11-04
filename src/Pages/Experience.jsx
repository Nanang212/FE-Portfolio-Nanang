import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import AnimatedExperience from '@/Components/Portfolio/AnimatedExperience';
import { Briefcase } from 'lucide-react';

export default function Experience({ experiences = [] }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <PortfolioLayout title={t('experience.title')}>
            <div className="pt-20 sm:pt-24 pb-20">
                <div className="container-max">
                    <div className="desk-sheet p-6 sm:p-10 space-y-6 bg-white/95">
                        {/* Header */}
                        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                                    <Briefcase size={14} className="text-emerald-700" />
                                    <span>Riwayat Karir Industri &bull; Engineering Timeline</span>
                                </div>
                                <h1 className="font-editorial-title text-4xl sm:text-6xl text-slate-900 leading-none tracking-tight">
                                    {t('experience.title')}
                                </h1>
                            </div>
                            <p className="font-editorial-serif text-sm sm:text-base text-slate-600 italic max-w-md sm:text-right">
                                {lang === 'id'
                                    ? 'Sistem enterprise berskala nasional yang dikembangkan dan dipertahankan dalam lingkungan produksi.'
                                    : 'Production systems engineered and maintained across enterprise environments.'}
                            </p>
                        </div>

                        {/* Interactive Animated Experience Component */}
                        <AnimatedExperience experiences={experiences} />
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
