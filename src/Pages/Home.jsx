import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { Link } from '@/Components/Link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail, ChevronDown, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/Components/UI/SocialIcons';
import WorkingIllustration from '@/Components/Portfolio/WorkingIllustration';

export default function Home({ about, projects, skills }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <PortfolioLayout title="Home">
            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
                {/* Background gradient blob */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl"/>
                    <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl"/>
                </div>

                <div className="container-max section-padding w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text */}
                        <div className="animate-fade-up">
                            <span className="badge-blue mb-4 inline-flex">
                                👋 {t('hero.greeting')} Nanang
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mt-3">
                                {t('hero.name')}
                            </h1>
                            <p className="text-gradient text-2xl sm:text-3xl font-bold mt-2">
                                {t('hero.role')}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mt-5 text-lg leading-relaxed max-w-lg">
                                {t('hero.tagline')}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-8">
                                <Link href="/projects" className="btn-primary">
                                    {t('hero.cta_primary')}
                                    <ArrowRight size={18}/>
                                </Link>
                                <Link href="/contact" className="btn-secondary">
                                    {t('hero.cta_secondary')}
                                </Link>
                                {about?.resume_path && (
                                    <a href={`/storage/${about?.resume_path}`} className="btn-secondary flex items-center gap-2">
                                        <FileDown size={18}/>
                                        Unduh CV
                                    </a>
                                )}
                            </div>

                            {/* Social row */}
                            <div className="flex items-center gap-4 mt-8">
                                <a href="https://github.com/Nanang212" target="_blank" rel="noopener noreferrer"
                                    className="btn-ghost p-2" aria-label="GitHub">
                                    <GithubIcon size={20}/>
                                </a>
                                <a href="https://www.linkedin.com/in/nanang-aditya/" target="_blank" rel="noopener noreferrer"
                                    className="btn-ghost p-2" aria-label="LinkedIn">
                                    <LinkedinIcon size={20}/>
                                </a>
                                <a href="mailto:nanangaditya2001@gmail.com" className="btn-ghost p-2" aria-label="Email">
                                    <Mail size={20}/>
                                </a>
                            </div>
                        </div>

                        {/* Illustration */}
                        <div className="animate-fade-up animate-delay-200 flex justify-center">
                            <WorkingIllustration className="w-full max-w-md drop-shadow-xl"/>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce hidden md:flex flex-col items-center gap-1 text-xs">
                        <span>scroll</span>
                        <ChevronDown size={16}/>
                    </div>
                </div>
            </section>

            {/* ── Featured Projects ────────────────────────────────── */}
            {projects && projects.length > 0 && (
                <section className="section-padding bg-slate-50 dark:bg-slate-800/40">
                    <div className="container-max">
                        <div className="text-center mb-12 animate-fade-up">
                            <h2 className="section-title">{t('projects.title')}</h2>
                            <p className="section-subtitle">{t('projects.subtitle')}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((p, i) => (
                                <div key={p.id} className="card p-6 flex flex-col gap-4 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                                        {lang === 'id' ? p.title_id : p.title_en}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm flex-1 leading-relaxed line-clamp-3">
                                        {lang === 'id' ? p.description_id : p.description_en}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(p.tech_stack || []).slice(0, 4).map(t => (
                                            <span key={t} className="badge-blue text-xs">{t}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 pt-1">
                                        {p.github_url && (
                                            <a href={p.github_url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                                                <GithubIcon size={14}/> {t('projects.view_code')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/projects" className="btn-secondary">
                                {t('projects.view_all')} <ArrowRight size={16}/>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Quick Skills ─────────────────────────────────────── */}
            {skills && Object.keys(skills).length > 0 && (
                <section className="section-padding">
                    <div className="container-max">
                        <div className="text-center mb-10 animate-fade-up">
                            <h2 className="section-title">{t('skills.title')}</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 animate-fade-up animate-delay-200">
                            {Object.values(skills).flat().slice(0, 12).map((skill, i) => {
                                // deterministic pseudo-random values based on index
                                const offsetX = `${((i % 5) - 2) * 12}px`; // -24..+24 spread
                                const rot = `${((i * 37) % 11) - 5}deg`; // -5..+5 deg
                                const delay = `${i * 90}ms`;
                                const floatDur = `${3 + (i % 4) * 0.6}s`;
                                const floatDelay = `${200 + (i % 6) * 120}ms`;
                                return (
                                    <span
                                        key={skill.id}
                                        className="badge-slate px-4 py-2 text-sm font-medium tech-pill"
                                        style={{
                                            '--tech-delay': delay,
                                            '--tech-offset': offsetX,
                                            '--tech-rot': rot,
                                            '--tech-float-duration': floatDur,
                                            '--tech-float-delay': floatDelay,
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </PortfolioLayout>
    );
}
