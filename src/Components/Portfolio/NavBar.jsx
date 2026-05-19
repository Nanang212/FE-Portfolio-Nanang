import { Link } from '@/Components/Link';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

export default function NavBar() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const url = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [brandAnimKey, setBrandAnimKey] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio_theme');
        setDark(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setBrandAnimKey(prev => prev + 1);
        setMenuOpen(false);
    }, [location.pathname]);

    const toggleDark = () => {
        const next = !dark;
        setDark(next);
        localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', next);
    };

    const toggleLang = () => {
        const next = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(next);
        localStorage.setItem('portfolio_lang', next);
    };

    const isActive = (path) => url === path || url.startsWith(path + '/');

    const links = [
        { href: '/', label: t('nav.home') },
        { href: '/about', label: t('nav.about') },
        { href: '/experience', label: t('nav.experience') },
        { href: '/projects', label: t('nav.projects') },
        { href: '/skills', label: t('nav.skills') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-slate-200 dark:border-slate-700 shadow-sm' : 'bg-transparent'}`}>
            <nav className="container-max flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <div key={brandAnimKey} className="brand-logo-intro w-8 h-8 rounded-lg overflow-hidden ring-1 ring-primary-200 dark:ring-primary-800 shrink-0">
                        <img
                            src="/images/brandIcon.png"
                            alt="Brand icon"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span>Nanang<span className="text-primary-600">.</span></span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={isActive(link.href) && link.href !== '/' ? 'nav-link-active' : url === '/' && link.href === '/' ? 'nav-link-active' : 'nav-link'}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <button onClick={toggleLang} className="btn-ghost text-xs font-bold tracking-wide" title={t('lang.switch')}>
                        <Globe size={16} />
                        {i18n.language === 'en' ? '🇮🇩' : '🇺🇸'}
                    </button>
                    <button onClick={toggleDark} className="btn-ghost" title={dark ? t('theme.light') : t('theme.dark')}>
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button className="md:hidden btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden glass border-t border-slate-200 dark:border-slate-700 px-4 pb-4 pt-2 animate-fade-in">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2.5 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
