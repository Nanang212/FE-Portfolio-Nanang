import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Send, Mail, MapPin, Copy, Check, Sparkles, 
    ArrowUpRight, CheckCircle2, Clock, 
    Database, Cpu, Layers, ChevronRight
} from 'lucide-react';
import { LinkedinIcon } from '@/Components/UI/SocialIcons';

export default function ContactSection({ isStandalonePage = false }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    // Message dispatch form state
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const emailAddress = 'nanangaditya2001@gmail.com';

    // 3 Core Impact & Framework Highlights (Social Proof / Credibility)
    const capabilityHighlights = [
        {
            icon: Database,
            badge: 'ENTERPRISE CORE',
            title: lang === 'id' ? 'Enterprise Backend & Distributed Systems' : 'Enterprise Backend & Distributed Systems',
            summary: lang === 'id'
                ? 'Arsitektur REST API high-throughput, optimasi transaksi PostgreSQL/SQL, dan manajemen antrian asynchronous.'
                : 'High-throughput REST APIs, PostgreSQL transaction optimization, and asynchronous message queuing.',
            track: 'PT Jasa Marga & PT Adira Finance',
            tech: ['Node.js', 'Express', 'Java 17', 'PostgreSQL', 'Redis']
        },
        {
            icon: Cpu,
            badge: 'AI & VECTOR',
            title: lang === 'id' ? 'AI Ingestion & Real-Time RAG Pipeline' : 'AI Ingestion & Real-Time RAG Pipeline',
            summary: lang === 'id'
                ? 'Integrasi LLM, database vektor, multi-turn streaming via SSE, dan parsing dokumen otomatis.'
                : 'LLM integration, vector database, multi-turn SSE streaming, and automated document parsing.',
            track: 'JM-RISE (Jasa Marga Toll Road)',
            tech: ['AI/RAG', 'Vector DB', 'SSE Stream', 'MinIO S3', 'Prisma']
        },
        {
            icon: Layers,
            badge: 'FULL STACK',
            title: lang === 'id' ? 'Full Stack Web & High-Density Dashboards' : 'Full Stack Web & High-Density Dashboards',
            summary: lang === 'id'
                ? 'Sistem web reaktif dari backend andal hingga UI data bisnis densitas tinggi (tabel & analitik).'
                : 'End-to-end web apps from scalable backend APIs to reactive high-density business dashboards.',
            track: 'Lavin Technologies & Kemendag RI',
            tech: ['React', 'Tailwind', 'Laravel', 'DataTables', 'MySQL']
        }
    ];

    // Direct Hire Mailto Handler: Opens email immediately with pre-filled professional proposal template
    const handleDirectHire = () => {
        const subject = lang === 'id' 
            ? '[Tawaran Kerja] Peluang Kolaborasi / Rekrutmen - Nanang Aditya' 
            : '[Hiring Opportunity] Collaboration / Engineering Role - Nanang Aditya';
        
        const body = lang === 'id'
            ? `Halo Nanang,\n\nKami tertarik dengan rekam jejak rekayasa dan kapabilitas teknis Anda. Kami ingin menawarkan peluang kerja sama / posisi:\n\n• Nama Perusahaan / Klien: \n• Judul Peran / Posisi: Backend Developer / Full Stack Engineer\n• Tipe Kerjasama: Full-time / Kontrak / Remote / Hybrid\n• Ruang Lingkup Kebutuhan: \n• Rencana Mulai / Timeline: \n\nBisakah kita menjadwalkan sesi perkenalan dan diskusi lebih lanjut?\n\nSalam,\n[Nama Anda / HR Team]`
            : `Hi Nanang,\n\nWe are impressed by your enterprise engineering track record and technical capabilities. We would like to discuss an opportunity / position with you:\n\n• Company / Organization: \n• Role / Title: Backend Developer / Full Stack Engineer\n• Engagement Type: Full-time / Contract / Remote / Hybrid\n• Scope / Requirements: \n• Expected Timeline: \n\nCould we arrange a short call to discuss further?\n\nBest regards,\n[Your Name / Team]`;

        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    };

    // Quick tag filler for the message form
    const handleQuickTopic = (topic, subjectPrefix) => {
        setForm((prev) => ({
            ...prev,
            subject: subjectPrefix,
            message: prev.message || `Halo Nanang, saya ingin berdiskusi mengenai ${topic}...`
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry - Nanang Aditya')}&body=${encodeURIComponent(`Pengirim: ${form.name} (${form.email})\n\n${form.message}`)}`;
        window.location.href = mailtoUrl;
        setSent(true);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    return (
        <section id="contact" className={`container-max scroll-mt-20 ${isStandalonePage ? 'pt-24 sm:pt-32 pb-24' : 'pt-4 pb-12'}`}>
            <div className="desk-sheet p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 bg-white/95 border border-emerald-200/80 shadow-xl">
                
                {/* Top Section Header */}
                <div className="border-b border-slate-200 pb-4 sm:pb-6">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-2.5">
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-emerald-900/10 text-emerald-900 border border-emerald-900/20 px-2.5 py-1 rounded font-bold">
                            TALENT ACQUISITION // DOSSIER #06
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-300/60 rounded-full text-emerald-800 text-[11px] font-mono">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                            <span className="font-semibold">
                                {lang === 'id' ? 'TERSEDIA UNTUK PELUANG BARU' : 'OPEN TO OPPORTUNITIES'}
                            </span>
                        </div>
                    </div>

                    <h2 className="font-editorial-title text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
                        {lang === 'id' ? 'KOLABORASI & REKRUTMEN' : 'COLLABORATION & HIRING'}
                    </h2>
                    <p className="font-editorial-serif text-sm sm:text-base lg:text-lg text-slate-600 mt-1.5 italic max-w-2xl leading-relaxed">
                        {lang === 'id'
                            ? 'Siap memperkuat arsitektur backend, sistem AI pipeline, maupun sistem web enterprise berkinerja tinggi.'
                            : 'Ready to engineer mission-critical backend systems, AI pipeline solutions, and high-performance enterprise applications.'}
                    </p>
                </div>

                {/* 2-Column Responsive Layout */}
                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
                    
                    {/* LEFT COLUMN: HIRE ME NOW & CREDIBILITY HIGHLIGHTS (7 cols) */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0">
                        <div className="p-5 sm:p-7 bg-slate-50/80 border border-slate-200/90 rounded-2xl shadow-xs relative overflow-hidden">
                            
                            {/* Card Pitch Header */}
                            <div className="mb-5 pb-4 border-b border-[var(--border-subtle)]">
                                <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                                    <Sparkles size={15} className="shrink-0" />
                                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                                        {lang === 'id' ? 'BUTUH SOFTWARE / BACKEND ENGINEER?' : 'LOOKING FOR AN ENGINEER?'}
                                    </span>
                                </div>
                                <h3 className="font-editorial-title text-2xl sm:text-3xl text-[var(--ink)] leading-none mt-1">
                                    {lang === 'id' ? 'REKRUT NANANG ADITYA' : 'HIRE NANANG ADITYA'}
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
                                    {lang === 'id'
                                        ? 'Backend & Full Stack Developer dengan rekam jejak terverifikasi di enterprise nasional (PT Jasa Marga & PT Adira Finance). Spesialis dalam membangun API scalable, optimasi database, dan sistem AI terintegrasi.'
                                        : 'Backend & Full Stack Developer with verified enterprise experience at national institutions (PT Jasa Marga & PT Adira Finance). Specializing in scalable APIs, database performance tuning, and intelligent AI pipelines.'}
                                </p>
                            </div>

                            {/* 3 Core Capability & Framework Bars (Clean, Non-selectable, Pure Proof) */}
                            <div className="space-y-2.5 mb-5 sm:mb-6">
                                {capabilityHighlights.map((cap, idx) => {
                                    const IconComp = cap.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3.5 bg-[var(--surface-subtle)] border border-[var(--border-subtle)] rounded-xl transition-all hover:border-emerald-600/40 hover:bg-white"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg bg-emerald-950/10 text-emerald-900 shrink-0 mt-0.5">
                                                    <IconComp size={16} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                                        <h4 className="font-semibold text-xs sm:text-sm text-[var(--ink)] leading-snug">
                                                            {cap.title}
                                                        </h4>
                                                        <span className="font-mono text-[8.5px] px-1.5 py-0.2 rounded uppercase font-bold bg-white border border-emerald-950/10 text-emerald-800">
                                                            {cap.badge}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] sm:text-xs text-[var(--ink-muted)] leading-relaxed mb-2">
                                                        {cap.summary}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <span className="text-[9.5px] font-mono text-emerald-800 font-bold flex items-center gap-1 mr-1">
                                                            <CheckCircle2 size={11} className="shrink-0" /> {cap.track}
                                                        </span>
                                                        <span className="text-[10px] text-slate-300 font-mono hidden sm:inline">|</span>
                                                        {cap.tech.map((tItem) => (
                                                            <span
                                                                key={tItem}
                                                                className="font-mono text-[9px] px-1.5 py-0.2 bg-white border border-slate-200 text-slate-700 rounded font-medium"
                                                            >
                                                                {tItem}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Direct Action: Big HIRE ME NOW CTA */}
                            <button
                                onClick={handleDirectHire}
                                className="w-full py-3.5 sm:py-4 px-5 bg-emerald-800 hover:bg-emerald-900 text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <Mail size={16} className="text-emerald-300 group-hover:scale-110 transition-transform shrink-0" />
                                <span>{lang === 'id' ? 'HIRE ME NOW (BUKA DRAF EMAIL)' : 'HIRE ME NOW (OPEN EMAIL DRAFT)'}</span>
                                <ArrowUpRight size={16} className="text-emerald-300 shrink-0" />
                            </button>
                            <p className="text-[10.5px] text-center text-[var(--ink-faint)] font-mono mt-2">
                                {lang === 'id' 
                                    ? 'Klik untuk langsung membuka draf penawaran kerja siap kirim ke nanangaditya2001@gmail.com'
                                    : 'Click to launch your email client with a pre-filled proposal draft'}
                            </p>

                        </div>

                        {/* Direct Coordinates & Quick Copy Card */}
                        <div className="p-4 sm:p-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            <div className="space-y-0.5 min-w-0">
                                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-faint)] block">
                                    {lang === 'id' ? 'EMAIL RESMI' : 'DIRECT EMAIL'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-emerald-800 shrink-0" />
                                    <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--ink)] truncate">
                                        {emailAddress}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyEmail}
                                    className="flex-1 sm:flex-initial px-3 py-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-600/40 text-[var(--ink)] font-mono text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                                    title="Salin Email ke Clipboard"
                                >
                                    {copiedEmail ? (
                                        <>
                                            <Check size={13} className="text-emerald-600" />
                                            <span className="text-emerald-700">Tersalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} className="text-slate-600" />
                                            <span>Salin Email</span>
                                        </>
                                    )}
                                </button>

                                <a
                                    href="https://www.linkedin.com/in/nanang-aditya/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-initial px-3 py-2 bg-emerald-900/10 hover:bg-emerald-900/15 border border-emerald-900/20 text-emerald-900 font-mono text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5"
                                >
                                    <LinkedinIcon size={13} />
                                    <span>LinkedIn</span>
                                    <ArrowUpRight size={11} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DIRECT MESSAGE DISPATCH FORM (5 cols) */}
                    <div className="lg:col-span-5 space-y-4 min-w-0">
                        <div className="p-5 sm:p-7 bg-slate-50/80 border border-slate-200/90 rounded-2xl shadow-xs">
                            
                            <div className="mb-4 sm:mb-5 pb-3 border-b border-slate-200">
                                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                                    INQUIRY FORM // CHANNEL #01
                                </span>
                                <h3 className="font-editorial-title text-xl sm:text-2xl text-[var(--ink)] mt-0.5">
                                    {lang === 'id' ? 'KIRIM PESAN BEBAS' : 'SEND DIRECT MESSAGE'}
                                </h3>
                                <p className="text-[11px] sm:text-xs text-[var(--ink-muted)] font-mono mt-0.5">
                                    {lang === 'id'
                                        ? 'Punya pertanyaan teknis, diskusi arsitektur, atau sapaan santai?'
                                        : 'Have a technical question or casual inquiry? Dispatch a direct note:'}
                                </p>
                            </div>

                            {sent && (
                                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-mono text-emerald-800 flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                                    <span>{t('contact.success')}</span>
                                </div>
                            )}

                            {/* Quick Subject Pills */}
                            <div className="mb-4">
                                <label className="block text-[9.5px] uppercase tracking-wider font-mono font-bold text-[var(--ink-faint)] mb-1.5">
                                    {lang === 'id' ? 'PILIH TOPIK CEPAT' : 'QUICK TOPIC'}
                                </label>
                                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                    {[
                                        { label: 'Tanya Pengalaman', sub: 'Tanya Rekam Jejak Enterprise Nanang' },
                                        { label: 'Tawaran Proyek', sub: 'Diskusi Penawaran Proyek Baru' },
                                        { label: 'Diskusi Arsitektur', sub: 'Diskusi Teknis Backend & RAG' },
                                        { label: 'Sapaan Santai', sub: 'Halo dari Rekan Developer' },
                                    ].map((tItem) => (
                                        <button
                                            key={tItem.label}
                                            type="button"
                                            onClick={() => handleQuickTopic(tItem.label, tItem.sub)}
                                            className="px-2.5 py-1 text-[10.5px] sm:text-[11px] font-mono bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 hover:border-emerald-600/40 rounded text-[var(--ink)] transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                        >
                                            <span>{tItem.label}</span>
                                            <ChevronRight size={10} className="text-slate-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                                <div className="space-y-1">
                                    <label className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-[var(--ink-faint)]">
                                        {t('contact.name')} *
                                    </label>
                                    <input
                                        required
                                        className="input rounded-lg text-xs bg-white"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="cth. John Doe / HR PT X"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-[var(--ink-faint)]">
                                        {t('contact.email')} *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="input rounded-lg text-xs bg-white"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="email@perusahaan.com"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-[var(--ink-faint)]">
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        className="input rounded-lg text-xs font-mono bg-white"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="cth. Diskusi Teknis / Peluang Kerja"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[11px] uppercase tracking-wider font-mono font-semibold text-[var(--ink-faint)]">
                                        {t('contact.message')} *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="input resize-none rounded-lg text-xs bg-white"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tuliskan pesan atau kebutuhan Anda..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full py-2.5 sm:py-3 rounded-lg font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>{t('contact.send')}</span>
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>

                        {/* Location & Timezone info card */}
                        <div className="p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--ink-muted)]">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-emerald-700 shrink-0" />
                                <span className="text-[11px] sm:text-xs">Jakarta, Indonesia (WIB / UTC+7)</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-800 font-semibold text-[11px] sm:text-xs">
                                <Clock size={12} className="shrink-0" />
                                <span>Fast Response</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}