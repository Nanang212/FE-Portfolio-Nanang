import { Head } from '@/Components/Head';
import NavBar from '@/Components/Portfolio/NavBar';
import Footer from '@/Components/Portfolio/Footer';
import PaintSplatterBackground from '@/Components/UI/PaintSplatterBackground';
import { useEffect } from 'react';

export default function PortfolioLayout({ children, title = '' }) {
    // Enforce clean Light Mode
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col relative text-[var(--ink)] overflow-x-hidden bg-[#ebf3ee]">
                {/* Artistic Organic Emerald Paint Splatter Canvas Background */}
                <PaintSplatterBackground />

                <NavBar />
                <main className="flex-1 relative z-10">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}

