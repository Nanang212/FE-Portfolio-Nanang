import { motion } from 'framer-motion';

export default function PaintSplatterBackground() {
    return (
        <div 
            aria-hidden="true" 
            className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
        >
            {/* ── 1. ARTISAN SAGE-CANVAS BASE WITH ARCHITECTURAL GRID ── */}
            <div className="absolute inset-0 bg-[#ebf3ee]" />

            {/* Fine Studio Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #064e3b 1px, transparent 1px),
                        linear-gradient(to bottom, #064e3b 1px, transparent 1px)
                    `,
                    backgroundSize: '36px 36px'
                }}
            />

            {/* ── 2. VIBRANT HERO EMERALD PAINT SPILL (Top Ruler & Hero Area) ── */}
            {/* Massive organic paint spill stretching from top-center to top-left */}
            <motion.div
                animate={{
                    x: [0, 20, -15, 0],
                    y: [0, -15, 12, 0],
                    scale: [1, 1.04, 0.98, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-20 w-[680px] h-[540px] rounded-[58%_42%_65%_35%/48%_62%_38%_52%] bg-gradient-to-br from-emerald-500/45 via-teal-600/35 to-emerald-700/20 blur-[55px]"
            />

            {/* Top-Right Mint & Emerald Splash */}
            <motion.div
                animate={{
                    x: [0, -25, 15, 0],
                    y: [0, 20, -18, 0],
                    scale: [1, 0.96, 1.05, 1]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-24 -right-24 w-[620px] h-[500px] rounded-[45%_55%_40%_60%/60%_40%_55%_45%] bg-gradient-to-bl from-emerald-400/50 via-teal-500/40 to-cyan-600/20 blur-[55px]"
            />

            {/* ── 3. MID-CANVAS FLUID PAINT POURS (Left & Right Flanks) ── */}
            {/* Left flank rich jade paint pour */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -25, 20, 0],
                    rotate: [0, 6, -4, 0]
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-[32%] -left-36 w-[600px] h-[720px] rounded-[62%_38%_55%_45%/45%_65%_35%_55%] bg-gradient-to-tr from-emerald-600/45 via-teal-600/35 to-emerald-400/25 blur-[60px]"
            />

            {/* Right flank paint splash with warm studio accent */}
            <motion.div
                animate={{
                    x: [0, -25, 20, 0],
                    y: [0, 25, -20, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute top-[40%] -right-28 w-[560px] h-[640px] rounded-[52%_48%_60%_40%/55%_42%_58%_45%] bg-gradient-to-tl from-emerald-500/40 via-teal-400/30 to-amber-400/20 blur-[60px]"
            />

            {/* ── 4. LOWER DECK SAGE & FOREST GLOW (About Me & Contact) ── */}
            <motion.div
                animate={{
                    x: [0, 25, -25, 0],
                    y: [0, -20, 25, 0]
                }}
                transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                className="absolute bottom-10 -left-28 w-[640px] h-[640px] rounded-[48%_52%_62%_38%/42%_58%_42%_58%] bg-gradient-to-tr from-emerald-600/45 via-teal-500/35 to-emerald-300/25 blur-[65px]"
            />

            <motion.div
                animate={{
                    x: [0, -30, 20, 0],
                    y: [0, 25, -20, 0]
                }}
                transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                className="absolute bottom-0 -right-20 w-[600px] h-[580px] rounded-[55%_45%_45%_55%/50%_60%_40%_50%] bg-gradient-to-tl from-teal-600/45 via-emerald-500/35 to-emerald-400/20 blur-[65px]"
            />

            {/* ── 5. CRISP ARTISTIC SVG PAINT SPLATTERS & DROPLETS (Highly Visible) ── */}
            {/* Top Splatter Crown - Behind the Ruler */}
            <svg 
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[260px] opacity-75 overflow-visible"
                viewBox="0 0 850 260" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Organic fluid paint spill body */}
                <path 
                    d="M140 120 C 190 70, 270 95, 340 70 C 410 45, 480 90, 560 75 C 640 60, 710 115, 680 160 C 650 205, 570 175, 490 195 C 410 215, 330 170, 260 185 C 190 200, 100 165, 140 120 Z" 
                    fill="url(#topSpillGrad)" 
                    filter="url(#subtleGlow)"
                />
                
                {/* Crisp Splatter Dots / Flying Paint Droplets */}
                <circle cx="85" cy="110" r="8" fill="#059669" opacity="0.8" />
                <circle cx="65" cy="135" r="4.5" fill="#10b981" opacity="0.9" />
                <circle cx="110" cy="75" r="6" fill="#047857" opacity="0.85" />
                <circle cx="150" cy="45" r="3.5" fill="#10b981" opacity="0.75" />
                
                <circle cx="730" cy="95" r="9" fill="#059669" opacity="0.85" />
                <circle cx="765" cy="120" r="5" fill="#10b981" opacity="0.9" />
                <circle cx="715" cy="180" r="7" fill="#047857" opacity="0.8" />
                <circle cx="780" cy="155" r="4" fill="#059669" opacity="0.7" />
                <circle cx="670" cy="220" r="5.5" fill="#10b981" opacity="0.75" />
                
                {/* Micro paint spray droplets along bottom of splash */}
                <circle cx="390" cy="225" r="4" fill="#047857" opacity="0.8" />
                <circle cx="430" cy="235" r="2.5" fill="#10b981" opacity="0.9" />
                <circle cx="310" cy="210" r="3.5" fill="#059669" opacity="0.7" />

                <defs>
                    <linearGradient id="topSpillGrad" x1="120" y1="60" x2="700" y2="190" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
                        <stop offset="45%" stopColor="#059669" stopOpacity="0.45" />
                        <stop offset="80%" stopColor="#0d9488" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            {/* Left Margin Diagonal Paint Drip & Splatter */}
            <svg 
                className="absolute top-[35%] left-2 w-[240px] h-[360px] opacity-70 overflow-visible"
                viewBox="0 0 240 360" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M30 40 C 70 20, 120 50, 140 100 C 160 150, 120 190, 100 240 C 80 290, 40 320, 20 280 C 5 240, 10 180, 20 120 Z" 
                    fill="#059669" 
                    fillOpacity="0.35"
                />
                <circle cx="160" cy="80" r="6" fill="#10b981" opacity="0.8" />
                <circle cx="185" cy="110" r="3.5" fill="#047857" opacity="0.85" />
                <circle cx="140" cy="220" r="5" fill="#059669" opacity="0.75" />
                <circle cx="115" cy="310" r="4" fill="#10b981" opacity="0.8" />
            </svg>

            {/* Right Margin Paint Splash */}
            <svg 
                className="absolute top-[60%] right-2 w-[260px] h-[380px] opacity-70 overflow-visible"
                viewBox="0 0 260 380" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M200 50 C 150 30, 90 70, 80 130 C 70 190, 120 230, 130 290 C 140 340, 190 350, 220 310 C 250 270, 240 180, 230 110 Z" 
                    fill="#0d9488" 
                    fillOpacity="0.35"
                />
                <circle cx="65" cy="90" r="7" fill="#10b981" opacity="0.8" />
                <circle cx="45" cy="120" r="4" fill="#059669" opacity="0.85" />
                <circle cx="85" cy="240" r="5" fill="#047857" opacity="0.75" />
                <circle cx="110" cy="330" r="4.5" fill="#10b981" opacity="0.8" />
            </svg>
        </div>
    );
}
