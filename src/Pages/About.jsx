import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { FileDown, GraduationCap, Award, BookOpen } from 'lucide-react';

export default function About({ about }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const bio = about
        ? (lang === 'id' ? about.bio_id : about.bio_en)
        : (lang === 'id'
            ? 'Saya adalah Fullstack & Backend Engineer yang spesialisasi dalam membangun aplikasi enterprise yang robust dan skalabel, sistem pemantauan jalan tol, serta arsitektur data terdistribusi.'
            : 'I am a Fullstack & Backend Engineer specializing in scalable enterprise applications, toll road monitoring systems, and distributed data architectures.');

    const jobTitle = about
        ? (lang === 'id' ? about.job_title_id : about.job_title_en)
        : 'Backend & Enterprise Systems Engineer';

    const highlights = [
        { en: '3+ Years Production Experience', id: '3+ Tahun Pengalaman Produksi' },
        { en: 'Toll Road & Enterprise Systems', id: 'Sistem Jalan Tol Nasional (Jasa Marga)' },
        { en: 'AI/RAG Pipelines & SSE Streams', id: 'AI/RAG Pipeline & Streaming SSE' },
        { en: 'Relational Schema Optimization', id: 'Optimasi Skema & Query Relasional' },
    ];

    const education = about?.education || [
        {
            degree_en: "Bachelor's Degree (S1) in Informatics Engineering",
            degree_id: 'Sarjana (S1) Teknik Informatika',
            institution: 'Universitas Esa Unggul',
            period: '2024 - Present',
            gpa: '3.66 / 4.00'
        },
        {
            degree_en: "Associate's Degree (D3) in Informatics Engineering",
            degree_id: 'Diploma (D3) Teknik Informatika',
            institution: 'Politeknik Elektronika Negeri Surabaya (EEPIS / PENS)',
            period: '2020 - 2023',
            gpa: '3.69 / 4.00'
        }
    ];

    const focusAreas = [
        'Express.js & Node.js Engine',
        'PostgreSQL & Prisma ORM',
        'AI / RAG Vector Ingestion',
        'Laravel Framework (PHP)',
        'Docker & Containerized DevOps',
        'Spring Boot (Java 17 & Java 7)',
        'Redis Caching & Queue Systems',
        'MinIO S3 Object Storage',
        'GitLab CI/CD & Swagger API',
        'Kafka Message Pipelines'
    ];

    return (
        <PortfolioLayout title={t('about.title')}>
            <div className="pt-28 sm:pt-36 pb-20">
                <div className="container-max max-w-4xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="font-editorial-title text-5xl sm:text-7xl text-[var(--ink)] leading-none tracking-tight">
                            {t('about.title')}
                        </h1>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-faint)] mt-2">
                            {about?.full_name || 'Nanang Aditya Sutahar'} &bull; {jobTitle}
                        </p>
                    </div>

                    {/* Editorial Content */}
                    <div className="space-y-10">
                        {/* Summary Letter with Portrait */}
                        <div className="p-8 sm:p-12 bg-[var(--surface)]">
                            <div className="grid md:grid-cols-12 gap-8 items-start">
                                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                                    <div className="w-36 sm:w-44 h-48 sm:h-56 flex items-end justify-center bg-[var(--surface-subtle)] rounded-xl pt-4 px-2 overflow-hidden">
                                        <img
                                            src="/images/profile.png"
                                            alt="Nanang Aditya Sutahar"
                                            className="max-h-full w-auto object-contain drop-shadow-sm"
                                        />
                                    </div>
                                    <div className="text-sm text-[var(--ink-muted)] space-y-1">
                                        <div className="text-[var(--ink)] font-semibold">Nanang Aditya Sutahar</div>
                                        <div>Software Engineer | Backend & Full Stack</div>
                                        <div className="text-[var(--ink-faint)]">PT Jasa Marga (Persero) Tbk</div>
                                    </div>
                                </div>
                                <div className="md:col-span-8 space-y-6">
                                    <h2 className="font-editorial-title text-3xl sm:text-4xl text-[var(--ink)]">
                                        {lang === 'id' ? 'RINGKASAN PROFESIONAL' : 'PROFESSIONAL SUMMARY'}
                                    </h2>

                                    <p className="font-editorial-serif text-lg sm:text-xl text-[var(--ink)] leading-relaxed text-justify">
                                        {bio}
                                    </p>

                                    {about?.resume_path && (
                                        <div className="pt-2">
                                            <a
                                                href={`/storage/${about.resume_path}`}
                                                className="btn-primary"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FileDown size={17} />
                                                <span>{t('about.download_cv')}</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Education Credentials */}
                        <div className="p-8 sm:p-10 bg-[var(--surface)] space-y-5">
                            <h2 className="font-editorial-title text-2xl sm:text-3xl text-[var(--ink)] flex items-center gap-2">
                                <GraduationCap size={24} className="text-[var(--accent)]" />
                                <span>{lang === 'id' ? 'KUALIFIKASI PENDIDIKAN' : 'EDUCATIONAL QUALIFICATIONS'}</span>
                            </h2>

                            <div className="space-y-4">
                                {education.map((edu, idx) => (
                                    <div key={idx} className="p-5 bg-[var(--surface-subtle)] space-y-1.5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="font-semibold text-base text-[var(--ink)]">
                                                {lang === 'id' ? edu.degree_id : edu.degree_en}
                                            </h3>
                                            <span className="text-xs font-semibold px-2.5 py-0.5 bg-[var(--surface)] text-[var(--accent)]">
                                                IPK: {edu.gpa}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[var(--ink-muted)]">
                                            {edu.institution}
                                        </p>
                                        <p className="text-xs text-[var(--ink-faint)]">
                                            {edu.period}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Highlights Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="p-6 bg-[var(--surface-subtle)] flex items-start gap-4"
                                >
                                    <span className="text-sm text-[var(--accent)] font-bold">
                                        0{i + 1}
                                    </span>
                                    <span className="text-sm font-medium text-[var(--ink)]">
                                        {lang === 'id' ? h.id : h.en}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Focus Areas List */}
                        <div className="p-8 sm:p-10 bg-[var(--surface)] space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-faint)] pb-2">
                                Domain Utama &amp; Perkakas Produksi
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                {focusAreas.map((area) => (
                                    <div key={area} className="flex items-center gap-3 py-1 text-[var(--ink)]">
                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
                                        <span>{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
