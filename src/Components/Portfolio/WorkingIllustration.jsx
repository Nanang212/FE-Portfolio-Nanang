export default function WorkingIllustration({ className = '' }) {
    return (
        <div
            className={`relative flex items-center justify-center overflow-visible px-6 py-10 md:px-24 md:py-16 ${className}`}
        >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-purple-600/20 blur-3xl scale-110 animate-pulse-slow" />

            {/* Orbit rings */}
            <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full border border-blue-500/10 animate-spin-very-slow" />

            <div className="absolute w-[250px] h-[250px] md:w-[360px] md:h-[360px] rounded-full border border-indigo-400/10 animate-spin-very-slow-reverse" />

            {/* Top left badge */}
            <div className="absolute top-6 left-2 md:top-8 md:left-0 flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2 rounded-xl bg-slate-900/95 border border-blue-500/60 backdrop-blur-lg shadow-lg shadow-blue-500/30 animate-float z-20 whitespace-nowrap scale-90 md:scale-100">
                <span className="text-blue-300 font-mono text-sm md:text-lg font-bold">
                    &lt;/&gt;
                </span>

                <span className="text-slate-100 text-sm md:text-base font-mono">
                    code
                </span>
            </div>

            {/* Top right badge */}
            <div className="absolute top-10 right-2 md:top-12 md:right-0 flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2 rounded-xl bg-slate-900/95 border border-purple-500/60 backdrop-blur-lg shadow-lg shadow-purple-500/30 animate-float-delay z-20 whitespace-nowrap scale-90 md:scale-100">
                <span className="text-purple-300 font-mono text-sm md:text-lg font-bold">
                    {'{}'}
                </span>

                <span className="text-slate-100 text-sm md:text-base font-mono">
                    build
                </span>
            </div>

            {/* Bottom left badge */}
            <div className="absolute bottom-16 left-2 md:bottom-24 md:left-6 flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2 rounded-xl bg-slate-900/95 border border-green-500/60 backdrop-blur-lg shadow-lg shadow-green-500/30 animate-float z-20 whitespace-nowrap scale-90 md:scale-100">
                <span className="text-green-300 text-sm md:text-lg">⚡</span>

                <span className="text-slate-100 text-sm md:text-base font-mono">
                    deploy
                </span>
            </div>

            {/* Bottom right badge */}
            <div className="absolute bottom-20 right-2 md:bottom-28 md:right-6 flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/60 backdrop-blur-lg shadow-lg shadow-cyan-500/30 animate-float-delay z-20 whitespace-nowrap scale-90 md:scale-100">
                <span className="text-cyan-300 text-sm md:text-lg">🚀</span>

                <span className="text-slate-100 text-sm md:text-base font-mono">
                    ship
                </span>
            </div>

            {/* Main image */}
            <div className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-2xl shadow-blue-900/40 ring-2 ring-blue-500/20 z-10">
                <img
                    src="/images/developer-illustration.png"
                    alt="Developer working on laptop"
                    className="w-full h-full object-cover"
                    loading="eager"
                />

                {/* Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Accent dots */}
            <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />

                <span
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"
                    style={{ animationDelay: '200ms' }}
                />

                <span
                    className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"
                    style={{ animationDelay: '400ms' }}
                />
            </div>
        </div>
    );
}