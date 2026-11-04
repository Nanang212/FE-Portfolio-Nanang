import { Link } from '@/Components/Link';
import { Head } from '@/Components/Head';
import { useTranslation } from 'react-i18next';
import NavBar from '@/Components/Portfolio/NavBar';
import Footer from '@/Components/Portfolio/Footer';
import { useEffect } from 'react';

export default function PortfolioLayout({ children, title = '' }) {
    const { t } = useTranslation();

    // Enforce clean Light Mode
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
                <NavBar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
