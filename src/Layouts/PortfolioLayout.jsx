import { Link } from '@/Components/Link';
import { Head } from '@/Components/Head';
import { useTranslation } from 'react-i18next';
import NavBar from '@/Components/Portfolio/NavBar';
import Footer from '@/Components/Portfolio/Footer';
import { useEffect } from 'react';

export default function PortfolioLayout({ children, title = '' }) {
    const { t } = useTranslation();

    // Apply dark mode class on mount
    useEffect(() => {
        const saved = localStorage.getItem('portfolio_theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
                <NavBar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
