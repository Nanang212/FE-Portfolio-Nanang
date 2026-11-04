import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, BookOpen, Briefcase, User, Wrench, Mail, Home as HomeIcon } from 'lucide-react';

export default function NavBar() {
    const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const links = [
        { id: 'home', label: t('nav.home'), icon: HomeIcon },
        { id: 'projects', label: t('nav.projects'), icon: BookOpen },
        { id: 'experience', label: t('nav.experience'), icon: Briefcase },
        { id: 'skills', label: t('nav.skills'), icon: Wrench },
        { id: 'about', label: t('nav.about'), icon: User },
        { id: 'contact', label: t('nav.contact'), icon: Mail },
    ];

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            // Determine active section based on scroll offset
            const scrollPos = window.scrollY + 140;
            const sectionIds = ['contact', 'about', 'skills', 'experience', 'projects', 'home'];
            
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -72;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const toggleLang = () => {
        const next = i18n.language === 'en' ? 'id' : 'en';
        i18n.changeLanguage(next);
        localStorage.setItem('portfolio_lang', next);
    };

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#124032]/95 backdrop-blur-md shadow-md border-b border-emerald-500/20 py-2.5'
                    : 'bg-[#154c3a]/80 backdrop-blur-sm border-b border-white/10 py-3.5'
            }`}
        >
            <nav className="container-max flex items-center justify-between">
                {/* Brand / Logo */}
                <a
                    href="#home"
                    onClick={(e) => scrollTo(e, 'home')}
                    className="flex items-center gap-3 text-white hover:text-emerald-300 transition-colors group"
                >
                    <img 
                        src="/favicon.svg" 
                        alt="Nanang Aditya" 
                        className="w-8 h-8 rounded-lg shadow-sm border border-emerald-400/30 group-hover:border-emerald-400/70 transition-all shrink-0" 
                    />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-editorial-title text-2xl sm:text-3xl tracking-tight leading-none">
                            NANANG ADITYA
                        </span>
                        <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-emerald-200/80 font-mono">
                            // Software Engineer
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {links.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => scrollTo(e, link.id)}
                                className={`px-3.5 py-1.5 rounded-md transition-all duration-150 ${
                                    isActive
                                        ? 'bg-emerald-600/60 text-white font-semibold shadow-inner border border-emerald-400/30'
                                        : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLang}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                        title={t('lang.switch')}
                        aria-label="Switch Language"
                    >
                        <Globe size={14} className="text-emerald-300" />
                        <span>{i18n.language === 'en' ? 'ID' : 'EN'}</span>
                    </button>

                    <button
                        className="md:hidden p-1.5 text-white hover:bg-white/10 rounded"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {menuOpen && (
                <div className="md:hidden bg-[#10382c] border-b border-emerald-500/30 px-4 py-4 space-y-1.5 animate-fadeIn">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => scrollTo(e, link.id)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                    isActive
                                        ? 'bg-emerald-600/80 text-white font-bold'
                                        : 'text-emerald-100 hover:bg-white/10'
                                }`}
                            >
                                <Icon size={16} className={isActive ? 'text-white' : 'text-emerald-300'} />
                                <span>{link.label}</span>
                            </a>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
