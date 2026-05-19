import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-10">
            <div className="container-max px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-primary-200 dark:ring-primary-800 shrink-0">
                            <img
                                src="/images/brandIcon.png"
                                alt="Brand icon"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        Nanang<span className="text-primary-600">.</span>
                    </div>

                    {/* Links */}
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t('footer.built_with')} · © {year} {t('footer.rights')}
                    </p>

                    {/* Social */}
                    <div className="flex items-center gap-3">
                        <a href="https://github.com/Nanang212" target="_blank" rel="noopener noreferrer"
                            className="btn-ghost p-2" aria-label="GitHub">
                            <GithubIcon size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/nanang-aditya/" target="_blank" rel="noopener noreferrer"
                            className="btn-ghost p-2" aria-label="LinkedIn">
                                <LinkedinIcon size={18}/>
                        </a>
                        <a href="mailto:nanangaditya2001@gmail.com"
                            className="btn-ghost p-2" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
