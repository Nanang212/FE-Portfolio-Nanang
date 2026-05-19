import PortfolioLayout from '@/Layouts/PortfolioLayout';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Code2, X, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const staticProjects = [
    {
        id: 1,
        title_en: 'Digitalisasi Document', title_id: 'Digitalisasi Dokumen',
        description_en: 'A project to move manual submission documents into digital format, integrating with tax services for e-stamps and a digital signature UI.',
        description_id: 'Proyek memindahkan dokumen pengajuan manual ke format digital, integrasi perpajakan untuk e-meterai, dan UI tanda tangan digital.',
        tech_stack: ['ZK', 'Java 17', 'SQL', 'Docker', 'Kafka'],
        image_paths: [], demo_url: null,
    },
];

// Image gallery inside modal
function ImageGallery({ images }) {
    const [current, setCurrent] = useState(0);
    if (!images || images.length === 0) return null;

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
    const next = () => setCurrent(i => (i + 1) % images.length);

    return (
        <div className="relative w-full bg-slate-100 dark:bg-slate-800">
            {/* Main image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={images[current]}
                    alt={`Image ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Nav arrows */}
                {images.length > 1 && (
                    <>
                        <button onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                            <ChevronLeft size={16}/>
                        </button>
                        <button onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                            <ChevronRight size={16}/>
                        </button>
                        {/* Counter */}
                        <span className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                            {current + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-1.5 p-2 overflow-x-auto">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setCurrent(i)}
                            className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === current ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                            <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover"/>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Project detail modal
function ProjectModal({ project, lang, onClose }) {
    if (!project) return null;
    const title = lang === 'id' ? project.title_id : project.title_en;
    const description = lang === 'id' ? project.description_id : project.description_en;

    // Collect all images: image_paths[] first, fallback to legacy image_path
    const images = (() => {
        const paths = project.image_paths ?? [];
        if (paths.length > 0) return paths.map(p => `/storage/${p}`);
        if (project.image_path) return [`/storage/${project.image_path}`];
        return [];
    })();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
            <div
                className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-up max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Gallery or placeholder header */}
                {images.length > 0 ? (
                    <ImageGallery images={images}/>
                ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-primary-600/20 to-indigo-600/20 flex items-center justify-center shrink-0">
                        <Code2 size={48} className="text-primary-400 opacity-40"/>
                    </div>
                )}

                {/* Close button */}
                <button onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shadow transition-colors z-10">
                    <X size={16}/>
                </button>

                {/* Content (scrollable) */}
                <div className="p-6 space-y-4 overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {description}
                    </p>

                    {(project.tech_stack || []).length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</p>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tech_stack.map(tag => (
                                    <span key={tag} className="badge-blue text-xs">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                                <LinkIcon size={14}/> GitHub
                            </a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                                <ExternalLink size={14}/> Live Demo
                            </a>
                        )}
                        {!project.github_url && !project.demo_url && (
                            <span className="text-xs text-slate-400 italic">No external links available</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Projects({ projects }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const data = (projects && projects.length > 0) ? projects : staticProjects;
    const [selected, setSelected] = useState(null);

    const getCoverImage = (project) => {
        const paths = project.image_paths ?? [];
        if (paths.length > 0) return `/storage/${paths[0]}`;
        if (project.image_path) return `/storage/${project.image_path}`;
        return null;
    };

    return (
        <PortfolioLayout title={t('projects.title')}>
            <div className="pt-16 section-padding">
                <div className="container-max">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fade-up">
                        <span className="badge-blue">{t('projects.subtitle')}</span>
                        <h1 className="section-title mt-4">{t('projects.title')}</h1>
                        <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"/>
                    </div>

                    {data.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <Code2 size={48} className="mx-auto mb-4 opacity-30"/>
                            <p>{t('projects.empty')}</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((project, i) => {
                                const title = lang === 'id' ? project.title_id : project.title_en;
                                const desc  = lang === 'id' ? project.description_id : project.description_en;
                                const cover = getCoverImage(project);
                                const imageCount = (project.image_paths ?? []).length || (project.image_path ? 1 : 0);

                                return (
                                    <article key={project.id}
                                        className="card flex flex-col group hover:-translate-y-1 animate-fade-up overflow-hidden cursor-pointer"
                                        style={{ animationDelay: `${i * 60}ms` }}
                                        onClick={() => setSelected(project)}>

                                        {/* Cover image or gradient */}
                                        {cover ? (
                                            <div className="w-full h-40 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 relative">
                                                <img src={cover} alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                                {imageCount > 1 && (
                                                    <span className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        🖼 {imageCount} photos
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full h-28 bg-gradient-to-br from-primary-600/10 via-blue-500/5 to-indigo-600/10 flex items-center justify-center shrink-0">
                                                <Code2 size={32} className="text-primary-400 opacity-40 group-hover:opacity-60 transition-opacity"/>
                                            </div>
                                        )}

                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <h2 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                                                    {title}
                                                </h2>
                                                {project.demo_url && (
                                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-primary-600 transition-colors shrink-0"
                                                        onClick={e => e.stopPropagation()}>
                                                        <ExternalLink size={16}/>
                                                    </a>
                                                )}
                                            </div>

                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                                                {desc}
                                            </p>

                                            <div className="space-y-2">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(project.tech_stack || []).slice(0, 4).map(tag => (
                                                        <span key={tag} className="badge-blue text-xs">{tag}</span>
                                                    ))}
                                                    {(project.tech_stack || []).length > 4 && (
                                                        <span className="badge-slate text-xs">+{project.tech_stack.length - 4}</span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-primary-500 dark:text-primary-400 font-medium">
                                                    Click to read more →
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <ProjectModal project={selected} lang={lang} onClose={() => setSelected(null)}/>
        </PortfolioLayout>
    );
}
