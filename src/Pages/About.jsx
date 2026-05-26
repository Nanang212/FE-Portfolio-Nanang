import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { Code2, Server, Box, Layers, CheckCircle2, FileDown } from 'lucide-react';
import WorkingIllustration from '@/Components/Portfolio/WorkingIllustration';

const highlights = [
    { icon: <Code2 size={20}/>, en: '3+ Years Experience', id: '3+ Tahun Pengalaman' },
    { icon: <Server size={20}/>, en: 'Enterprise Systems', id: 'Sistem Enterprise' },
    { icon: <Box size={20}/>, en: 'Docker & DevOps', id: 'Docker & DevOps' },
    { icon: <Layers size={20}/>, en: 'Clean Architecture', id: 'Arsitektur Bersih' },
];

export default function About({ about }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const bio = about
        ? (lang === 'id' ? about.bio_id : about.bio_en)
        : (lang === 'id'
            ? 'Saya adalah Fullstack Developer yang spesialisasi dalam membangun aplikasi enterprise yang robust dan skalabel. Dengan keahlian mendalam di Laravel dan Node.js (Express), saya merancang sistem yang bersih, mudah dipelihara, dan siap produksi. Saya memiliki pengalaman membangun sistem monitoring konstruksi, manajemen dokumen proyek, dan platform data terpusat yang digunakan oleh berbagai aplikasi internal.'
            : 'I\'m a Fullstack Developer specializing in building robust, scalable enterprise applications. With deep expertise in Laravel and Node.js (Express), I design systems that are clean, maintainable, and production-ready. I have hands-on experience building construction monitoring systems, project document management, and centralized data platforms used by multiple internal applications.');

    const jobTitle = about
        ? (lang === 'id' ? about.job_title_id : about.job_title_en)
        : 'Fullstack Developer';

    return (
        <PortfolioLayout title={t('about.title')}>
            <div className="pt-16 section-padding">
                <div className="container-max">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-up">
                        <span className="badge-blue">{t('about.subtitle')}</span>
                        <h1 className="section-title mt-4">{t('about.title')}</h1>
                        <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"/>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Illustration */}
                        <div className="animate-fade-up animate-delay-100 order-2 lg:order-1">
                            <WorkingIllustration className="w-full max-w-md mx-auto"/>
                        </div>

                        {/* Content */}
                        <div className="animate-fade-up animate-delay-200 order-1 lg:order-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">{jobTitle}</h2>
                                <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed text-lg">{bio}</p>
                                {about?.resume_path && (
                                    <div className="mt-6">
                                        <a href={`/storage/${about?.resume_path}`} className="btn-secondary inline-flex items-center gap-2">
                                            <FileDown size={20} />
                                            {t('about.download_cv')}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Highlights grid */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {highlights.map((h, i) => (
                                    <div key={i} className="card p-4 flex items-center gap-3">
                                        <div className="text-primary-600 dark:text-primary-400 shrink-0">{h.icon}</div>
                                        <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                                            {lang === 'id' ? h.id : h.en}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Focus areas */}
                            <div className="mt-4">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Focus Areas</h3>
                                <ul className="space-y-2">
                                    {['Laravel Framework', 'Node.js (Express.js)', 'Docker & Containerization', 'MySQL / PostgreSQL', 'Redis & Queue Systems', 'MinIO / S3 Storage'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <CheckCircle2 size={16} className="text-primary-600 shrink-0"/>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
