export default function WorkingIllustration({ className = '' }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-purple-600/20 blur-3xl scale-110 animate-pulse-slow" />

            {/* Rotating orbit ring */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/10 animate-spin-very-slow" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-indigo-400/10 animate-spin-very-slow-reverse" />

            {/* Floating code badge — top left */}
            <div className="absolute top-8 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10 animate-float z-10">
                <span className="text-blue-400 font-mono text-sm font-bold">&lt;/&gt;</span>
                <span className="text-slate-300 text-xs font-mono">code</span>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute top-12 right-2 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-sm shadow-lg shadow-purple-500/10 animate-float-delay z-10">
                <span className="text-purple-400 font-mono text-sm font-bold">{'{}'}</span>
                <span className="text-slate-300 text-xs font-mono">build</span>
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute bottom-16 left-2 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-green-500/30 backdrop-blur-sm shadow-lg shadow-green-500/10 animate-float z-10">
                <span className="text-green-400 text-sm">⚡</span>
                <span className="text-slate-300 text-xs font-mono">deploy</span>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute bottom-20 right-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 animate-float-delay z-10">
                <span className="text-cyan-400 text-sm">🚀</span>
                <span className="text-slate-300 text-xs font-mono">ship</span>
            </div>

            {/* Main image */}
            <div className="relative w-[320px] h-[320px] rounded-full overflow-hidden shadow-2xl shadow-blue-900/40 ring-2 ring-blue-500/20 z-10">
                <img
                    src="/images/developer-illustration.png"
                    alt="Developer working on laptop"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                {/* Inner glow overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom accent dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '200ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '400ms' }} />
            </div>
        </div>
    );
}
