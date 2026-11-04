import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, SkipBack, SkipForward, Music, Headphones, 
    Coffee, Utensils, Sparkles, ChevronLeft, ChevronRight,
    Quote, Maximize2, X, Volume2, VolumeX, GraduationCap, 
    FileDown, Disc, Briefcase, Award,
    CheckCircle2
} from 'lucide-react';

export default function AboutMeBento({ about, education = [] }) {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // ── 0. VIEW MODE TAB: Defaults to 'chill' for relaxed, authentic first impression ──
    const [viewMode, setViewMode] = useState('chill');

    // Default education fallback if not provided
    const educationList = education.length > 0 ? education : [
        {
            degree_en: "Bachelor's Degree (S1) in Informatics Engineering",
            degree_id: "Sarjana (S1) Teknik Informatika",
            institution: "Universitas Esa Unggul",
            period: "2024 - Present",
            gpa: "3.66 / 4.00"
        },
        {
            degree_en: "Associate's Degree (D3) in Informatics Engineering",
            degree_id: "Diploma (D3) Teknik Informatika",
            institution: "Politeknik Elektronika Negeri Surabaya (EEPIS / PENS)",
            period: "2020 - 2023",
            gpa: "3.69 / 4.00"
        }
    ];

    // ── 1. ACTIVE PHOTO CAROUSEL & LIGHTBOX STATE ──
    const photos = [
        {
            src: '/images/personal/trail-run.jpg',
            title_id: 'Trail Run & Puncak Lumut',
            title_en: 'Trail Run & Lumut Peak',
            badge: '1699 MDPL',
            location: 'Puncak Lumut, Bogor',
            caption_id: 'Menembus jalur hutan berkabut dan medan menanjak.',
            caption_en: 'Conquering misty forest trails and steep elevation.'
        },
        {
            src: '/images/personal/jogging.png',
            title_id: 'Jogging Rutin (Pagi / Malam)',
            title_en: 'Routine Jogging (Morning & Night)',
            badge: 'Pace & Endurance',
            location: 'Surabaya City',
            caption_id: 'Menjaga stamina dengan lari santai pagi atau malam hari di jalanan Surabaya.',
            caption_en: 'Building stamina through morning or evening road runs across Surabaya.'
        },
        {
            src: '/images/personal/muaythai.png',
            title_id: 'Muay Thai Sparring',
            title_en: 'Muay Thai Sparring',
            badge: 'Discipline & Reflex',
            location: 'Camp Training',
            caption_id: 'Latihan pad work dan ketahanan fisik di sasana.',
            caption_en: 'Pad work session and physical conditioning.'
        },
        {
            src: '/images/personal/mancing.jpg',
            title_id: 'Memancing Santai',
            title_en: 'Weekend Angling',
            badge: 'Patience & Focus',
            location: 'Weekend Spot',
            caption_id: 'Menikmati ketenangan dan melatih kesabaran di akhir pekan.',
            caption_en: 'Finding quiet focus and unwinding by the waters.'
        },
        {
            src: '/images/personal/mendaki.jpg',
            title_id: 'Mendaki Gunung Gede',
            title_en: 'Mount Gede Trekking',
            badge: 'Gunung Gede',
            location: 'Taman Nasional Gede Pangrango',
            caption_id: 'Istirahat di jalur akar pohon rimbun pendakian Gunung Gede.',
            caption_en: 'Taking a breath along the mossy root trail of Mount Gede.'
        }
    ];

    const [activePhotoIdx, setActivePhotoIdx] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isHoveredPhoto, setIsHoveredPhoto] = useState(false);

    const nextPhoto = () => setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);

    // Chill, relaxed slow auto-cycle for photos (every 6.5s) when not hovered or in lightbox
    useEffect(() => {
        if (lightboxOpen || isHoveredPhoto) return;
        const interval = setInterval(() => {
            setActivePhotoIdx((prev) => (prev + 1) % photos.length);
        }, 6500);
        return () => clearInterval(interval);
    }, [lightboxOpen, isHoveredPhoto, photos.length]);

    // ── 2. REAL AUDIO PLAYER (JAWA HOLIC PLAYLIST) ──
    const playlist = [
        {
            title: 'Negoro Angin',
            artist: 'Denny Caknan',
            album: 'Single Hits',
            audioSrc: '/audio/negoro-angin.mp3',
            durationStr: '4:35'
        },
        {
            title: 'Laut Kidul',
            artist: 'Masdddho',
            album: 'Kisinan Series',
            audioSrc: '/audio/laut-kidul.mp3',
            durationStr: '4:20'
        },
        {
            title: 'Ropang',
            artist: 'Denny Caknan',
            album: 'Single 2024',
            audioSrc: '/audio/ropang.mp3',
            durationStr: '3:50'
        },
        {
            title: 'Nemen',
            artist: 'NDX A.K.A.',
            album: 'NDX A.K.A. Version',
            audioSrc: '/audio/nemen.mp3',
            durationStr: '4:45'
        }
    ];

    const [activeTrackIdx, setActiveTrackIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const activeTrack = playlist[activeTrackIdx];

    // Format seconds to mm:ss
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Play / Pause toggle with real HTML5 Audio
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    setIsPlaying(false);
                });
        }
    };

    // Switch track and auto-play
    const changeTrack = (newIndex) => {
        setActiveTrackIdx(newIndex);
        setCurrentTime(0);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        }, 50);
    };

    const nextTrack = () => changeTrack((activeTrackIdx + 1) % playlist.length);
    const prevTrack = () => changeTrack((activeTrackIdx - 1 + playlist.length) % playlist.length);

    // Seek on progress bar click
    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressFraction = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = progressFraction * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Toggle mute
    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // ── 3. QUOTES ROTATOR ──
    const quotes = [
        {
            id: 'quote-1',
            text: lang === 'id' 
                ? 'Jika kamu mau membeli sesuatu tanpa melihat harga, kamu harus bisa fokus bekerja tanpa melihat jam.' 
                : 'If you want to buy without looking at the price tag, you must learn to work without watching the clock.',
            author: 'Work Ethic'
        },
        {
            id: 'quote-2',
            text: lang === 'id'
                ? 'Jangan pernah takut gagal, tetaplah mencoba. Urusan gagal itu nomor tiga, karena nomor satu syahadat, nomor dua sholat.'
                : 'Never fear failure, keep trying. Failure is only third on the list—number one is faith, number two is prayer.',
            author: 'Life Principle'
        }
    ];

    const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

    // Slow auto quote rotator (every 9s)
    useEffect(() => {
        const quoteTimer = setInterval(() => {
            setActiveQuoteIdx((prev) => (prev + 1) % quotes.length);
        }, 9000);
        return () => clearInterval(quoteTimer);
    }, [quotes.length]);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="space-y-8">
            {/* Hidden HTML5 Audio Element for Real Playback */}
            <audio
                ref={audioRef}
                src={activeTrack.audioSrc}
                preload="metadata"
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                    }
                }}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        setDuration(audioRef.current.duration || 0);
                    }
                }}
                onEnded={nextTrack}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* ── CLEAN HEADER & DUAL MODE SELECTOR ── */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5 pb-2 border-b border-slate-200"
            >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{lang === 'id' ? 'Dossier & Sisi Otentik' : 'Dossier & Lifestyle'}</span>
                        </div>
                        <h2 className="font-editorial-title text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none">
                            {lang === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}
                        </h2>
                    </div>

                    <p className="font-editorial-serif text-sm sm:text-base text-slate-600 italic max-w-md sm:text-right">
                        {lang === 'id'
                            ? 'Pilih perspektif yang ingin Anda telusuri: rekayasa sistem enterprise atau cerita santai di luar terminal.'
                            : 'Select a perspective to explore: enterprise system engineering or chill stories beyond the terminal.'}
                    </p>
                </div>

                {/* Tactile Dual-Mode Selector Bar */}
                <div className="flex justify-center pt-2 pb-1">
                    <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner max-w-lg w-full">
                        <button
                            onClick={() => setViewMode('credentials')}
                            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 font-mono text-xs sm:text-sm ${
                                viewMode === 'credentials'
                                    ? 'bg-white text-slate-950 font-bold shadow-md border border-slate-200/80'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <Briefcase size={16} className={viewMode === 'credentials' ? 'text-emerald-700' : 'text-slate-400'} />
                            <span>{lang === 'id' ? 'Kredensial & Karir' : 'Credentials & Career'}</span>
                        </button>

                        <button
                            onClick={() => setViewMode('chill')}
                            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 font-mono text-xs sm:text-sm ${
                                viewMode === 'chill'
                                    ? 'bg-slate-950 text-white font-bold shadow-lg border border-slate-800'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <Headphones size={16} className={viewMode === 'chill' ? 'text-emerald-400' : 'text-slate-400'} />
                            <span>{lang === 'id' ? 'Santai & Musik' : 'Chill & Beats'}</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
               SECTION 1: PROFESSIONAL CORE & CREDENTIALS
               ══════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                {viewMode === 'credentials' && (
                    <motion.div
                        key="credentials-deck"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="grid lg:grid-cols-12 gap-6 items-stretch pt-2"
                    >
                        {/* 1. Profile Portrait & Action Card (4 cols) */}
                        <div className="lg:col-span-4 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 rounded-2xl p-6 border border-emerald-200/90 shadow-md relative overflow-hidden flex flex-col justify-between items-center text-center space-y-4">
                            {/* Ambient Top Glow */}
                            <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="w-36 sm:w-44 h-48 sm:h-56 flex items-end justify-center bg-gradient-to-b from-emerald-100/70 via-teal-50 to-white rounded-2xl pt-3 px-3 overflow-hidden border-2 border-emerald-300/80 shadow-md relative group"
                            >
                                <img
                                    src="/images/profile.png"
                                    alt="Nanang Aditya Sutahar"
                                    className="max-h-full w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500 text-slate-950 shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    <span>ONLINE</span>
                                </div>
                            </motion.div>

                            <div className="space-y-1.5 w-full">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                    Nanang Aditya Sutahar
                                </h3>
                                <p className="text-xs text-emerald-800 font-mono font-semibold">
                                    Software Engineer &bull; Backend & Distributed Systems
                                </p>
                                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-950 font-bold bg-gradient-to-r from-emerald-200/80 via-teal-100/80 to-emerald-200/80 px-3 py-1 rounded-full border border-emerald-400/60 shadow-2xs">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                    <span>PT Jasa Marga (Persero) Tbk</span>
                                </div>
                            </div>

                            {/* Download Action Buttons */}
                            <div className="w-full flex flex-col gap-2 pt-1 relative z-10">
                                <a
                                    href="/downloads/CV_Nanang_Aditya_Sutahar_ATS.pdf"
                                    className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="CV_Nanang_Aditya_Sutahar_ATS.pdf"
                                >
                                    <FileDown size={15} />
                                    <span>{lang === 'id' ? 'Unduh CV ATS Resmi (PDF)' : 'Download Official ATS CV (PDF)'}</span>
                                </a>
                                <a
                                    href="/downloads/Portfolio_Nanang_Aditya_Sutahar.pdf"
                                    className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-50/80 border border-emerald-400/80 shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="Portfolio_Nanang_Aditya_Sutahar.pdf"
                                >
                                    <FileDown size={15} className="text-emerald-700" />
                                    <span>{lang === 'id' ? 'Unduh Portofolio Lengkap (PDF)' : 'Download Full Portfolio (PDF)'}</span>
                                </a>
                            </div>
                        </div>

                        {/* 2. Professional Summary & Bio Narrative (5 cols) */}
                        <div className="lg:col-span-5 bg-gradient-to-b from-white via-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-200/90 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
                            {/* Ambient Subtle Accent */}
                            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

                            <div className="space-y-3">
                                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5 bg-emerald-100/70 px-2.5 py-0.5 rounded border border-emerald-300/50">
                                        <Briefcase size={12} className="text-emerald-700" />
                                        <span>{lang === 'id' ? 'RINGKASAN PROFESIONAL' : 'PROFESSIONAL SUMMARY'}</span>
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-700/80 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                                        ENGINEERING DOSSIER
                                    </span>
                                </div>

                                <p className="font-editorial-serif text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                                    {about ? (lang === 'id' ? about.bio_id : about.bio_en) : ''}
                                </p>
                            </div>

                            {/* Vibrant Colored Highlight Badges */}
                            <div className="pt-3 border-t border-emerald-100/80 flex flex-wrap gap-2 text-[11px] font-mono relative z-10">
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 font-semibold border border-emerald-300/80 shadow-2xs">
                                    <CheckCircle2 size={12} className="text-emerald-700" />
                                    <span>3+ Years Enterprise</span>
                                </span>
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-100/90 text-teal-900 font-semibold border border-teal-300/80 shadow-2xs">
                                    <CheckCircle2 size={12} className="text-teal-700" />
                                    <span>Distributed Systems</span>
                                </span>
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/90 text-amber-950 font-semibold border border-amber-300/80 shadow-2xs">
                                    <CheckCircle2 size={12} className="text-amber-700" />
                                    <span>AI Vector Ingestion</span>
                                </span>
                            </div>
                        </div>

                        {/* 3. Formal Education Cards (3 cols) */}
                        <div className="lg:col-span-3 bg-gradient-to-b from-white via-teal-50/30 to-slate-50 rounded-2xl p-6 border border-teal-200/90 shadow-md flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between pb-3 border-b border-teal-100">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 font-bold flex items-center gap-1.5 bg-teal-100/70 px-2.5 py-0.5 rounded border border-teal-300/50">
                                        <GraduationCap size={13} className="text-teal-700" />
                                        <span>{lang === 'id' ? 'PENDIDIKAN RESMI' : 'EDUCATION'}</span>
                                    </span>
                                    <Award size={15} className="text-amber-500" />
                                </div>

                                <div className="space-y-3">
                                    {educationList.map((edu, idx) => {
                                        const isS1 = idx === 0;
                                        return (
                                            <motion.div 
                                                key={idx}
                                                whileHover={{ y: -2, x: 2 }}
                                                transition={{ duration: 0.2 }}
                                                className={`p-3.5 rounded-xl border shadow-xs space-y-1.5 transition-all ${
                                                    isS1 
                                                        ? 'bg-gradient-to-r from-emerald-50/70 to-white border-emerald-200 border-l-4 border-l-emerald-600'
                                                        : 'bg-gradient-to-r from-teal-50/70 to-white border-teal-200 border-l-4 border-l-teal-600'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-1">
                                                    <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                                        {lang === 'id' ? edu.degree_id : edu.degree_en}
                                                    </h4>
                                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-2xs shrink-0 ${
                                                        isS1 
                                                            ? 'bg-emerald-600 text-white' 
                                                            : 'bg-teal-700 text-white'
                                                    }`}>
                                                        {lang === 'id' ? 'IPK' : 'GPA'} {edu.gpa}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-700 font-medium">
                                                    {edu.institution}
                                                </p>
                                                <p className="text-[10px] font-mono text-emerald-800/80 font-bold">
                                                    {edu.period}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Verified Accreditation Ribbon */}
                            <div className="text-[10px] font-mono text-emerald-900 font-semibold flex items-center justify-between p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-300/70 shadow-2xs">
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={12} className="text-emerald-700" />
                                    <span>ACADEMIC INTEGRITY</span>
                                </span>
                                <span className="text-emerald-800 font-bold uppercase tracking-wider">100% VERIFIED</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════
               SECTION 2: CHILL & BEATS (Authentic Lifestyle & Music)
               ══════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                {viewMode === 'chill' && (
                    <motion.div
                        key="chill-deck"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6 pt-2"
                    >

                        {/* ── 3-COLUMN LIFESTYLE BENTO GRID ── */}
                        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                            
                            {/* ── LEFT COLUMN: Hobbies & Comfort Food (4 cols) ── */}
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="lg:col-span-4 flex flex-col justify-between space-y-4"
                            >
                                {/* Hobbies Card with Slow Float Animation */}
                                <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3 flex-1 flex flex-col justify-between relative overflow-hidden">
                                    {/* Gentle slow background glow */}
                                    <motion.div 
                                        animate={{ 
                                            opacity: [0.15, 0.28, 0.15],
                                            scale: [1, 1.08, 1]
                                        }}
                                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                        className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
                                    />

                                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 relative z-10">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                                            <Sparkles size={12} className="text-amber-400" />
                                            <span>{lang === 'id' ? 'HOBI & AKTIVITAS' : 'HOBBIES & LIFESTYLE'}</span>
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-500">ACTIVE LIFE</span>
                                    </div>

                                    <div className="space-y-1.5 text-xs font-mono relative z-10">
                                        {[
                                            { icon: '⛰️', label_id: 'Trail Run & Mendaki Gunung', label_en: 'Trail Run & Mountain Trekking' },
                                            { icon: '🏃', label_id: 'Jogging Rutin (Pagi & Malam)', label_en: 'Morning & Night Jogging' },
                                            { icon: '🥊', label_id: 'Muay Thai & Sparring', label_en: 'Muay Thai & Conditioning' },
                                            { icon: '⚽', label_id: 'Futsal Rutin', label_en: 'Regular Futsal Matches' },
                                            { icon: '🎣', label_id: 'Memancing Akhir Pekan', label_en: 'Weekend Fishing & Angling' },
                                            { icon: '💻', label_id: 'Eksplorasi Teknologi Baru', label_en: 'Tech Exploration & Open Source' }
                                        ].map((hobby, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ x: 4, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 transition-colors"
                                            >
                                                <span className="text-base shrink-0">{hobby.icon}</span>
                                                <span className="text-slate-200 font-medium truncate">
                                                    {lang === 'id' ? hobby.label_id : hobby.label_en}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between relative z-10">
                                        <span>MIND & BODY SYNERGY</span>
                                        <span className="text-emerald-400 font-semibold">100% IN MOTION</span>
                                    </div>
                                </div>

                                {/* Comfort Food & Sips Card */}
                                <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                                            <Utensils size={12} className="text-amber-400" />
                                            <span>{lang === 'id' ? 'MAKANAN & MINUMAN FAVORIT' : 'COMFORT FOOD & SIPS'}</span>
                                        </span>
                                        <Coffee size={13} className="text-amber-300" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <motion.div 
                                            whileHover={{ y: -2 }}
                                            className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/50 space-y-1"
                                        >
                                            <div className="text-[10px] font-mono text-slate-400 uppercase">FOOD</div>
                                            <div className="font-bold text-slate-100">🍛 Nasi Goreng</div>
                                            <div className="font-bold text-slate-100">🍲 Rawon Surabaya</div>
                                        </motion.div>
                                        <motion.div 
                                            whileHover={{ y: -2 }}
                                            className="p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/50 space-y-1"
                                        >
                                            <div className="text-[10px] font-mono text-slate-400 uppercase">SIPS</div>
                                            <div className="font-bold text-emerald-300">☕ Americano Peach</div>
                                            <div className="font-bold text-amber-300">☕ Mont Blanc</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── CENTER COLUMN: Authentic Photo Polaroid Showcase & Story (4.5 cols) ── */}
                            <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-md flex flex-col justify-between space-y-4"
                            >
                                {/* Top: Photo Showcase with Ambient Blur & Zero-Crop Framing */}
                                <div 
                                    className="space-y-2.5"
                                    onMouseEnter={() => setIsHoveredPhoto(true)}
                                    onMouseLeave={() => setIsHoveredPhoto(false)}
                                >
                                    <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-100">
                                        <span className="text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span>{lang === 'id' ? 'DOKUMENTASI ASLI' : 'AUTHENTIC GLIMPSE'}</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setLightboxOpen(true)}
                                                className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                                                title={lang === 'id' ? 'Lihat Ukuran Penuh' : 'View Full Image'}
                                            >
                                                <Maximize2 size={12} />
                                                <span>{lang === 'id' ? 'Perbesar' : 'Zoom'}</span>
                                            </button>
                                            <span className="text-slate-400">
                                                0{activePhotoIdx + 1} / 0{photos.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Framed Polaroid Viewport: Portrait Proportion with Ambient Background */}
                                    <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner h-[380px] sm:h-[430px] flex items-center justify-center group">
                                        {/* Ambient blurred backdrop for aesthetic full-bleed fill */}
                                        <img
                                            src={photos[activePhotoIdx].src}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 select-none pointer-events-none transition-all duration-1000"
                                        />

                                        {/* Main photo: completely visible without cutting off face, body, or gear */}
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={photos[activePhotoIdx].src}
                                                src={photos[activePhotoIdx].src}
                                                alt={photos[activePhotoIdx].title_en}
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.04 }}
                                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                                onClick={() => setLightboxOpen(true)}
                                                className="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-2xl cursor-pointer transition-transform duration-500 group-hover:scale-[1.01]"
                                            />
                                        </AnimatePresence>

                                        {/* Bottom Gradient Overlay for Badge, Title & Caption */}
                                        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent pt-12 pb-3.5 px-4 flex flex-col justify-end pointer-events-none">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="inline-block px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-emerald-500 text-slate-950 shadow-sm">
                                                    {photos[activePhotoIdx].badge}
                                                </span>
                                                <span className="text-[10px] font-mono text-emerald-300/80">
                                                    {photos[activePhotoIdx].location}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
                                                {lang === 'id' ? photos[activePhotoIdx].title_id : photos[activePhotoIdx].title_en}
                                            </h4>
                                            <p className="text-slate-300 text-[11px] font-editorial-serif italic drop-shadow-sm">
                                                {lang === 'id' ? photos[activePhotoIdx].caption_id : photos[activePhotoIdx].caption_en}
                                            </p>
                                        </div>

                                        {/* Stepper Arrow Buttons */}
                                        <button
                                            onClick={prevPhoto}
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-lg opacity-80 hover:opacity-100"
                                            aria-label="Previous photo"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={nextPhoto}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-lg opacity-80 hover:opacity-100"
                                            aria-label="Next photo"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>

                                    {/* Thumbnail dots */}
                                    <div className="flex items-center justify-center gap-1.5 pt-1">
                                        {photos.map((_, pIdx) => (
                                            <button
                                                key={pIdx}
                                                onClick={() => setActivePhotoIdx(pIdx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    activePhotoIdx === pIdx ? 'w-6 bg-emerald-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                                aria-label={`Go to slide ${pIdx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Middle: Rotating Life Quote in Elegant Pill */}
                                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200/80 space-y-1.5">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 font-bold uppercase">
                                        <span className="flex items-center gap-1">
                                            <Quote size={11} className="text-emerald-700" />
                                            <span>{quotes[activeQuoteIdx].author}</span>
                                        </span>
                                        <button
                                            onClick={() => setActiveQuoteIdx((prev) => (prev + 1) % quotes.length)}
                                            className="text-[9.5px] hover:underline cursor-pointer text-emerald-900 font-semibold"
                                        >
                                            {lang === 'id' ? 'Ganti Quote ↻' : 'Next Quote ↻'}
                                        </button>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={quotes[activeQuoteIdx].id}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.3 }}
                                            className="font-editorial-serif italic text-xs sm:text-[13px] text-slate-800 leading-snug"
                                        >
                                            &ldquo;{quotes[activeQuoteIdx].text}&rdquo;
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* Bottom: Authentic Personal Story Narrative */}
                                <p className="font-editorial-serif text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                                    {lang === 'id'
                                        ? 'Bagi saya, arsitektur sistem backend dan olahraga ketahanan fisik memiliki filosofi yang sama: konsistensi, daya tahan, dan ketenangan menghadapi tekanan. Saat tidak sedang mengoptimasi query database atau pipeline server, saya me-recharge energi dengan menaklukkan tanjakan trail run di alam terbuka, menyalurkan fokus lewat Muay Thai, atau menikmati kesabaran hening saat memancing.'
                                        : 'To me, distributed backend engineering and endurance athletics share the exact same philosophy: consistency, resilience, and calm focus under pressure. When not optimizing database queries or server pipelines, I recharge by conquering mountain trail runs, channeling focus through Muay Thai, or practicing patient stillness while weekend fishing.'}
                                </p>
                            </motion.div>

                            {/* ── RIGHT COLUMN: Spotify Playlist & Real Interactive Audio Player (3.5 cols) ── */}
                            <motion.div 
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="lg:col-span-3 bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
                            >
                                {/* Gentle slow background glow */}
                                <motion.div 
                                    animate={{ 
                                        opacity: [0.15, 0.3, 0.15],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                                    className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
                                />

                                {/* Header: Jawa Holic Playlist */}
                                <div className="space-y-2 relative z-10">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                                            <Headphones size={13} className="text-emerald-400" />
                                            <span>ON REPEAT &bull; JAWA HOLIC</span>
                                        </span>
                                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                                    </div>

                                    {/* Track List */}
                                    <div className="space-y-1">
                                        {playlist.map((track, tIdx) => {
                                            const isCurrent = activeTrackIdx === tIdx;
                                            return (
                                                <motion.button
                                                    key={track.title}
                                                    onClick={() => changeTrack(tIdx)}
                                                    whileHover={{ x: 2 }}
                                                    className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between gap-2 ${
                                                        isCurrent
                                                            ? 'bg-emerald-950/80 text-white border border-emerald-600/50 shadow-sm'
                                                            : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                                            isCurrent ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                                        }`}>
                                                            {isCurrent && isPlaying ? (
                                                                <span className="flex items-end gap-0.5 h-3">
                                                                    <span className="w-0.5 h-full bg-slate-950 animate-pulse" />
                                                                    <span className="w-0.5 h-2/3 bg-slate-950 animate-bounce" />
                                                                    <span className="w-0.5 h-full bg-slate-950 animate-pulse" />
                                                                </span>
                                                            ) : (
                                                                <Music size={11} />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className={`text-xs font-bold truncate leading-tight ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                                                                {track.title}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500 truncate font-mono">
                                                                {track.artist}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[9.5px] font-mono text-slate-500 shrink-0">
                                                        {track.durationStr}
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Integrated Now Playing Player with Vinyl Disc Spin Animation */}
                                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-3 relative z-10 shadow-lg">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                        <span className="text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                                            {isPlaying ? 'PLAYING NOW' : 'PLAYER READY'}
                                        </span>
                                        <button 
                                            onClick={toggleMute}
                                            className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
                                            title={isMuted ? 'Unmute' : 'Mute'}
                                        >
                                            {isMuted ? <VolumeX size={13} className="text-rose-400" /> : <Volume2 size={13} />}
                                        </button>
                                    </div>

                                    {/* Song Details + Chill Vinyl Disc */}
                                    <div className="flex items-center gap-3">
                                        {/* Spinning Vinyl Record (Slow Chill Rotation) */}
                                        <motion.div
                                            animate={{ rotate: isPlaying ? 360 : 0 }}
                                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                            className="w-11 h-11 rounded-full bg-slate-950 border-2 border-slate-700/80 flex items-center justify-center shrink-0 shadow-lg relative"
                                        >
                                            <Disc size={28} className="text-slate-600" />
                                            <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <div className="w-1 h-1 rounded-full bg-slate-950" />
                                            </div>
                                        </motion.div>

                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-sm text-slate-100 truncate">
                                                {activeTrack.title}
                                            </h4>
                                            <p className="text-xs text-emerald-400 font-mono truncate">
                                                {activeTrack.artist} &mdash; <span className="text-slate-400">{activeTrack.album}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Smooth Ocean Wave Equalizer Bars */}
                                    <div className="h-6 flex items-end justify-between gap-1 px-1 py-0.5 bg-slate-950/60 rounded border border-slate-800/80">
                                        {[20, 50, 85, 60, 35, 95, 70, 45, 90, 40, 75, 55, 90, 65, 30, 80].map((h, i) => {
                                            const dynamicHeight = isPlaying 
                                                ? Math.max(18, (h * ((i % 3) + 1) + (currentTime * 12)) % 100) 
                                                : 18;
                                            return (
                                                <span
                                                    key={i}
                                                    style={{
                                                        height: `${dynamicHeight}%`,
                                                        transition: 'height 0.3s ease-out'
                                                    }}
                                                    className={`w-1 rounded-full ${isPlaying ? 'bg-emerald-400' : 'bg-slate-700'}`}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Interactive Clickable Progress Bar */}
                                    <div className="space-y-1">
                                        <div 
                                            onClick={handleSeek}
                                            className="w-full h-2 bg-slate-800 hover:bg-slate-700 rounded-full overflow-hidden cursor-pointer relative group/bar transition-colors"
                                        >
                                            <div 
                                                className="h-full bg-emerald-400 rounded-full transition-all duration-150" 
                                                style={{ width: `${progressPercentage}%` }} 
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{duration > 0 ? formatTime(duration) : activeTrack.durationStr}</span>
                                        </div>
                                    </div>

                                    {/* Player Controls */}
                                    <div className="flex items-center justify-center gap-3 pt-1">
                                        <button
                                            onClick={prevTrack}
                                            className="text-slate-400 hover:text-white transition-colors p-1"
                                            aria-label="Previous track"
                                        >
                                            <SkipBack size={16} />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all shadow-md active:scale-95"
                                            aria-label={isPlaying ? 'Pause' : 'Play'}
                                        >
                                            {isPlaying ? (
                                                <Pause size={16} fill="currentColor" />
                                            ) : (
                                                <Play size={16} fill="currentColor" className="ml-0.5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={nextTrack}
                                            className="text-slate-400 hover:text-white transition-colors p-1"
                                            aria-label="Next track"
                                        >
                                            <SkipForward size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── FULLSCREEN LIGHTBOX MODAL ── */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                                aria-label="Close lightbox"
                            >
                                <X size={18} />
                            </button>

                            {/* Image container */}
                            <div className="relative w-full flex items-center justify-center p-4">
                                <img
                                    src={photos[activePhotoIdx].src}
                                    alt={photos[activePhotoIdx].title_en}
                                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                                />

                                {/* Modal Arrow Nav */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevPhoto();
                                    }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-lg"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextPhoto();
                                    }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-lg"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </div>

                            {/* Caption Footer */}
                            <div className="w-full bg-slate-950/80 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs">
                                <div>
                                    <span className="text-emerald-400 font-mono font-bold uppercase mr-2">
                                        {photos[activePhotoIdx].badge}
                                    </span>
                                    <span className="text-white font-semibold">
                                        {lang === 'id' ? photos[activePhotoIdx].title_id : photos[activePhotoIdx].title_en}
                                    </span>
                                </div>
                                <span className="text-slate-400 font-mono text-[11px]">
                                    0{activePhotoIdx + 1} of 0{photos.length}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
