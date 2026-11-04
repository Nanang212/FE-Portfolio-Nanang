import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Footer() {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-20 bg-[#0d3024] text-emerald-100/90 py-12 sm:py-14 mt-6 sm:mt-8 border-t border-emerald-500/30 shadow-2xl">
            <div className="container-max">
                <div className="grid md:grid-cols-12 gap-8 items-start">
                    {/* Left: Message / Imprint */}
                    <div className="md:col-span-7 space-y-3">
                        <h4 className="font-editorial-title text-3xl sm:text-4xl text-white leading-none tracking-tight">
                            NANANG ADITYA
                        </h4>
                        <p className="font-editorial-serif text-base text-emerald-100/80 max-w-lg leading-relaxed">
                            {lang === 'id' 
                                ? 'Software Engineer yang berfokus pada arsitektur sistem enterprise, backend skala besar, dan infrastruktur data di Indonesia.' 
                                : 'Software Engineer specializing in enterprise backends, distributed data pipelines, and mission-critical systems in Indonesia.'}
                        </p>
                        <p className="text-xs text-emerald-300/60 font-mono pt-1">
                            Engineered on Maker's Cutting Mat &bull; Laravel &bull; Node.js &bull; Spring Boot &bull; PostgreSQL &bull; Docker
                        </p>
                    </div>

                    {/* Right: Direct Dispatch / Contacts */}
                    <div className="md:col-span-5 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300 font-mono">
                            {lang === 'id' ? 'Kontak Langsung' : 'Direct Dispatch'}
                        </p>

                        <div className="space-y-2.5 text-sm">
                            <div>
                                <a
                                    href="mailto:nanangaditya2001@gmail.com"
                                    className="text-emerald-100 hover:text-white hover:underline inline-flex items-center gap-2 font-medium"
                                >
                                    <Mail size={15} className="text-emerald-400" />
                                    <span>nanangaditya2001@gmail.com</span>
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://www.linkedin.com/in/nanang-aditya/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-100 hover:text-white hover:underline inline-flex items-center gap-2 font-medium"
                                >
                                    <LinkedinIcon size={15} className="text-emerald-400" />
                                    <span>linkedin.com/in/nanang-aditya</span>
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://github.com/Nanang212"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-100 hover:text-white hover:underline inline-flex items-center gap-2 font-medium"
                                >
                                    <GithubIcon size={15} className="text-emerald-400" />
                                    <span>github.com/Nanang212</span>
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-emerald-500/20 text-xs text-emerald-400/60 font-mono">
                            &copy; {year} Nanang Aditya Sutahar. All systems operational.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
