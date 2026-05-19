import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { Building2, Calendar, ExternalLink } from 'lucide-react';

export default function Experience({ experiences }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    // Static fallback if DB is empty
    const data = (experiences && experiences.length > 0) ? experiences : [
        {
            id: 1,
            company: 'Jasa Marga',
            role: 'Fullstack Developer',
            period_start: '2022-01-01',
            is_current: true,
            tech_stack: ['Express.js', 'Docker', 'MinIO', 'Redis', 'GitLab CI/CD', 'MySQL'],
            projects: [
                {
                    name: 'JM-RISE',
                    description_en: 'Toll road construction monitoring system and project document management platform. Handles real-time progress tracking, document versioning, and multi-stakeholder reporting.',
                    description_id: 'Sistem monitoring konstruksi jalan tol dan manajemen dokumen proyek. Menangani pelacakan progres real-time, versioning dokumen, dan pelaporan multi-pemangku kepentingan.',
                },
                {
                    name: 'Aggregator Operasi',
                    description_en: 'Centralized master data aggregator serving multiple internal applications via unified API. Ensures data consistency across all operational systems.',
                    description_id: 'Aggregator master data terpusat yang melayani berbagai aplikasi internal via API terpadu. Memastikan konsistensi data di seluruh sistem operasional.',
                },
            ],
        },
    ];

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <PortfolioLayout title={t('experience.title')}>
            <div className="pt-16 section-padding">
                <div className="container-max">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-up">
                        <span className="badge-blue">{t('experience.subtitle')}</span>
                        <h1 className="section-title mt-4">{t('experience.title')}</h1>
                        <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"/>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"/>

                        <div className="space-y-10">
                            {data.map((exp, i) => (
                                <div key={exp.id} className="animate-fade-up md:pl-20 relative" style={{ animationDelay: `${i * 100}ms` }}>
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 top-6 w-5 h-5 bg-primary-600 rounded-full border-4 border-white dark:border-slate-900 shadow-sm hidden md:block"/>

                                    <div className="card p-6 md:p-8">
                                        {/* Company header */}
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Building2 size={18} className="text-primary-600"/>
                                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{exp.company}</span>
                                                    {exp.is_current && (
                                                        <span className="badge bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs">
                                                            ● {t('experience.current')}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-primary-600 dark:text-primary-400 font-semibold">{exp.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                                                <Calendar size={14}/>
                                                <span>{formatDate(exp.period_start)} — {exp.is_current ? (lang === 'id' ? 'Sekarang' : 'Present') : formatDate(exp.period_end)}</span>
                                            </div>
                                        </div>

                                        {/* Projects */}
                                        {(exp.projects || []).map((proj, j) => (
                                            <div key={j} className="mb-5 last:mb-0">
                                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"/>
                                                    {proj.name}
                                                </h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed pl-3.5">
                                                    {lang === 'id' ? proj.description_id : proj.description_en}
                                                </p>
                                            </div>
                                        ))}

                                        {/* Tech Stack */}
                                        {(exp.tech_stack || []).length > 0 && (
                                            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{t('experience.tech_stack')}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.tech_stack.map(tech => (
                                                        <span key={tech} className="badge-slate text-xs">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
