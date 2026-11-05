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
            src: '/images/personal/office-work.jpg',
            title_id: 'Keseharian Rekayasa di Kantor',
            title_en: 'Engineering On Duty at the Office',
            badge: 'Software Engineer',
            location: 'Head Office, Jakarta',
            objectPos: 'object-top',
            caption_id: 'Fokus merancang arsitektur backend, diskusi sistem, dan pengembangan platform enterprise.',
            caption_en: 'Architecting scalable backend services and developing enterprise production platforms.'
        },
        {
            src: '/images/personal/futsal.jpg',
            title_id: 'Futsal Rutin Mingguan',
            title_en: 'Weekly Futsal Match',
            badge: 'Teamwork & Agility',
            location: 'Kuningan, Jakarta',
            objectPos: 'object-center',
            caption_id: 'Menjaga kelincahan, kerja sama tim, dan stamina di lapangan futsal Kuningan, Jakarta.',
            caption_en: 'Sharpening agility, teamwork, and match conditioning on the futsal court in Kuningan, Jakarta.'
        },
        {
            src: '/images/personal/trail-run.jpg',
            title_id: 'Trail Run & Eksplorasi Alam',
            title_en: 'Trail Run & Nature Trekking',
            badge: 'Trail Run',
            location: 'Bogor',
            objectPos: 'object-top',
            caption_id: 'Menembus jalur hutan berkabut dan medan menanjak di alam terbuka.',
            caption_en: 'Conquering misty forest trails and steep elevation in nature.'
        },
        {
            src: '/images/personal/jogging.png',
            title_id: 'Olahraga Lari & Jogging',
            title_en: 'Routine Running & Jogging',
            badge: 'Pace & Endurance',
            location: 'GBK Senayan, Jakarta',
            objectPos: 'object-top',
            caption_id: 'Menjaga kebugaran dan stamina fisik dengan olahraga lari rutin.',
            caption_en: 'Building stamina and endurance through routine running.'
        },
        {
            src: '/images/personal/muaythai.png',
            title_id: 'Muay Thai Sparring',
            title_en: 'Muay Thai Sparring',
            badge: 'Discipline & Reflex',
            location: 'Camp Training',
            objectPos: 'object-top',
            caption_id: 'Latihan pad work dan ketahanan fisik di sasana.',
            caption_en: 'Pad work session and physical conditioning.'
        },
        {
            src: '/images/personal/mancing.jpg',
            title_id: 'Memancing Santai',
            title_en: 'Weekend Angling',
            badge: 'Patience & Focus',
            location: 'Weekend Spot',
            objectPos: 'object-top',
            caption_id: 'Menikmati ketenangan dan melatih kesabaran di akhir pekan.',
            caption_en: 'Finding quiet focus and unwinding by the waters.'
        },
        {
            src: '/images/personal/mendaki.jpg',
            title_id: 'Mendaki Gunung & Trekking',
            title_en: 'Mountain Hiking & Trekking',
            badge: 'Mountain Trail',
            location: 'Gunung Gede, Jawa Barat',
            objectPos: 'object-top',
            caption_id: 'Istirahat sejenak di jalur akar pepohonan saat mendaki gunung.',
            caption_en: 'Taking a breath along the forest root trails while mountain hiking.'
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

                {/* Tactile Dual-Mode Selector Bar with Fluid Spring Slider */}
                <div className="flex justify-center pt-2 pb-1">
                    <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 shadow-inner max-w-lg w-full relative">
                        <button
                            onClick={() => setViewMode('credentials')}
                            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-xs sm:text-sm relative z-10 transition-colors duration-200 ${
                                viewMode === 'credentials'
                                    ? 'text-white font-bold'
                                    : 'text-slate-600 hover:text-slate-900 font-medium'
                            }`}
                        >
                            {viewMode === 'credentials' && (
                                <motion.div
                                    layoutId="activeAboutTab"
                                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                    className="absolute inset-0 bg-emerald-800 rounded-xl shadow-md -z-10"
                                />
                            )}
                            <Briefcase size={15} className={viewMode === 'credentials' ? 'text-white' : 'text-slate-500'} />
                            <span>{lang === 'id' ? 'Kredensial & Karir' : 'Credentials & Career'}</span>
                        </button>

                        <button
                            onClick={() => setViewMode('chill')}
                            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-xs sm:text-sm relative z-10 transition-colors duration-200 ${
                                viewMode === 'chill'
                                    ? 'text-white font-bold'
                                    : 'text-slate-600 hover:text-slate-900 font-medium'
                            }`}
                        >
                            {viewMode === 'chill' && (
                                <motion.div
                                    layoutId="activeAboutTab"
                                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                    className="absolute inset-0 bg-emerald-800 rounded-xl shadow-md -z-10"
                                />
                            )}
                            <Headphones size={15} className={viewMode === 'chill' ? 'text-emerald-200' : 'text-slate-500'} />
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
                                    <span>REST API & Database</span>
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

                        {/* ── 3-COLUMN LIFESTYLE BENTO GRID (Viewport Compact & Organic Sage Palette) ── */}
                        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
                            
                            {/* ── LEFT COLUMN: Hobbies & Comfort Food (4 cols on desktop, Order 2 on mobile) ── */}
                            <motion.div 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-4 order-2 lg:order-1 bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden"
                            >
                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                                            <Sparkles size={12} className="text-amber-500" />
                                            <span>{lang === 'id' ? 'HOBI & AKTIVITAS' : 'HOBBIES & LIFESTYLE'}</span>
                                        </span>
                                        <span className="text-[9.5px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                                            ACTIVE LIFE
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-xs font-mono">
                                        {[
                                            { 
                                                icon: '⛰️', 
                                                label_id: 'Mendaki Gunung & Trail Run', 
                                                label_en: 'Mountain Trekking & Trail Run',
                                                hoverWiggle: { scale: 1.3, rotate: -12, y: -2 }
                                            },
                                            { 
                                                icon: '🏃', 
                                                label_id: 'Olahraga Lari / Jogging', 
                                                label_en: 'Routine Jogging & Running',
                                                hoverWiggle: { scale: 1.3, x: [0, 3, -2, 2, 0], transition: { repeat: Infinity, duration: 0.5 } }
                                            },
                                            { 
                                                icon: '🥊', 
                                                label_id: 'Muay Thai & Conditioning', 
                                                label_en: 'Muay Thai & Conditioning',
                                                hoverWiggle: { scale: 1.3, x: [0, 4, -1, 3, 0], transition: { repeat: Infinity, duration: 0.4 } }
                                            },
                                            { 
                                                icon: '⚽', 
                                                label_id: 'Futsal Rutin', 
                                                label_en: 'Regular Futsal Matches',
                                                hoverWiggle: { rotate: 360, transition: { duration: 0.8, ease: "linear", repeat: Infinity } }
                                            },
                                            { 
                                                icon: '🎣', 
                                                label_id: 'Memancing Santai Akhir Pekan', 
                                                label_en: 'Weekend Angling & Stillness',
                                                hoverWiggle: { rotate: [-8, 8, -8], y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.85, ease: "easeInOut" } }
                                            }
                                        ].map((hobby, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ x: 4, scale: 1.01 }}
                                                transition={{ duration: 0.15 }}
                                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-100/90 border border-emerald-200/60 hover:border-emerald-300 text-slate-800 transition-all cursor-pointer shadow-2xs group"
                                            >
                                                <motion.span 
                                                    className="text-sm shrink-0 inline-block origin-center"
                                                    whileHover={hobby.hoverWiggle}
                                                >
                                                    {hobby.icon}
                                                </motion.span>
                                                <span className="text-[11.5px] font-medium truncate group-hover:text-emerald-950 transition-colors">
                                                    {lang === 'id' ? hobby.label_id : hobby.label_en}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Compact Comfort Food & Sips */}
                                <div className="pt-2.5 border-t border-emerald-100/90 space-y-1.5 relative z-10">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-900 font-bold">
                                        <span className="flex items-center gap-1">
                                            <Utensils size={11} className="text-amber-600" />
                                            <span>{lang === 'id' ? 'MAKANAN & MINUMAN FAVORIT' : 'COMFORT FOOD & SIPS'}</span>
                                        </span>
                                        <Coffee size={12} className="text-amber-600" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                                        <motion.div 
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            className="p-2 rounded-lg bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/70 text-slate-800 space-y-0.5 transition-all cursor-default shadow-2xs"
                                        >
                                            <span className="text-[9px] font-mono text-amber-900 font-bold uppercase tracking-wider block">FOOD</span>
                                            <span className="font-semibold text-[11px] block truncate">🍛 Nasi Goreng</span>
                                            <span className="font-semibold text-[11px] block truncate">🍲 Rawon Surabaya</span>
                                        </motion.div>
                                        <motion.div 
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            className="p-2 rounded-lg bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/70 text-slate-800 space-y-0.5 transition-all cursor-default shadow-2xs"
                                        >
                                            <span className="text-[9px] font-mono text-emerald-900 font-bold uppercase tracking-wider block">SIPS</span>
                                            <span className="font-semibold text-emerald-900 text-[11px] block truncate">☕ Americano Peach</span>
                                            <span className="font-semibold text-amber-900 text-[11px] block truncate">☕ Mont Blanc</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── CENTER COLUMN: Authentic Photo Polaroid Showcase & Story (5 cols on desktop, Order 1 on mobile) ── */}
                            <motion.div 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-5 order-1 lg:order-2 bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-sm flex flex-col justify-between space-y-3"
                            >
                                {/* Top: Photo Showcase with Ambient Blur & Compact Height */}
                                <div 
                                    className="space-y-2"
                                    onMouseEnter={() => setIsHoveredPhoto(true)}
                                    onMouseLeave={() => setIsHoveredPhoto(false)}
                                >
                                    <div className="flex items-center justify-between text-xs font-mono pb-1.5 border-b border-emerald-100">
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
                                            <span className="text-slate-400 text-[11px]">
                                                0{activePhotoIdx + 1} / 0{photos.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tall Portrait Framed Viewport (panjang ke bawah agar foto vertikal tampil utuh tanpa terpotong) */}
                                    <div className="relative rounded-xl overflow-hidden bg-emerald-950 border border-emerald-800/60 shadow-inner h-80 sm:h-[390px] flex items-center justify-center p-2 group">
                                        {/* Ambient blurred backdrop */}
                                        <img
                                            src={photos[activePhotoIdx].src}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 select-none pointer-events-none transition-all duration-700"
                                        />

                                        {/* Main photo: object-contain utuh dari atas sampai bawah, tidak ada subjek terpotong */}
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={photos[activePhotoIdx].src}
                                                src={photos[activePhotoIdx].src}
                                                alt={photos[activePhotoIdx].title_en}
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.04 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                onClick={() => setLightboxOpen(true)}
                                                className="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-2xl cursor-pointer transition-transform duration-500 group-hover:scale-[1.01]"
                                            />
                                        </AnimatePresence>

                                        {/* Stepper Arrow Buttons */}
                                        <button
                                            onClick={prevPhoto}
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-md opacity-80 hover:opacity-100 active:scale-95"
                                            aria-label="Previous photo"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={nextPhoto}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-md opacity-80 hover:opacity-100 active:scale-95"
                                            aria-label="Next photo"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>

                                    {/* Thumbnail dots */}
                                    <div className="flex items-center justify-center gap-1.5 pt-0.5">
                                        {photos.map((_, pIdx) => (
                                            <button
                                                key={pIdx}
                                                onClick={() => setActivePhotoIdx(pIdx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    activePhotoIdx === pIdx ? 'w-5 bg-emerald-700' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                                aria-label={`Go to slide ${pIdx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Photo Metadata & Caption Card (Di luar foto agar tidak menutupi visual apapun) */}
                                    <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80 space-y-1">
                                        <div className="flex items-center justify-between text-[10px] font-mono">
                                            <span className="px-2 py-0.5 rounded font-bold bg-emerald-700 text-white shadow-2xs">
                                                {photos[activePhotoIdx].badge}
                                            </span>
                                            <span className="text-emerald-800 font-semibold flex items-center gap-1">
                                                <span>📍</span>
                                                <span>{photos[activePhotoIdx].location}</span>
                                            </span>
                                        </div>
                                        <h4 className="text-slate-900 font-bold text-xs sm:text-sm leading-tight pt-0.5">
                                            {lang === 'id' ? photos[activePhotoIdx].title_id : photos[activePhotoIdx].title_en}
                                        </h4>
                                        <p className="text-slate-600 text-[11px] font-editorial-serif italic leading-snug">
                                            {lang === 'id' ? photos[activePhotoIdx].caption_id : photos[activePhotoIdx].caption_en}
                                        </p>
                                    </div>
                                </div>

                                {/* Middle: Rotating Life Quote */}
                                <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80 space-y-1">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 font-bold uppercase">
                                        <span className="flex items-center gap-1">
                                            <Quote size={10} className="text-emerald-700" />
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
                                            initial={{ opacity: 0, y: 3 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -3 }}
                                            transition={{ duration: 0.25 }}
                                            className="font-editorial-serif italic text-xs text-slate-800 leading-snug"
                                        >
                                            &ldquo;{quotes[activeQuoteIdx].text}&rdquo;
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* Bottom: Authentic Personal Story Narrative */}
                                <p className="font-editorial-serif text-xs text-slate-700 leading-relaxed text-justify">
                                    {lang === 'id'
                                        ? 'Bagi saya, arsitektur sistem backend dan olahraga ketahanan fisik memiliki filosofi yang sama: konsistensi, daya tahan, dan ketenangan menghadapi tekanan. Saat jeda coding, saya me-recharge energi lewat trail run di alam bebas, futsal rutin di Kuningan, jogging di GBK, Muay Thai, mendaki gunung, hingga ketenangan memancing di akhir pekan.'
                                        : 'To me, distributed backend engineering and endurance athletics share the exact same philosophy: consistency, resilience, and calm focus under pressure. When not optimizing servers, I recharge through mountain trail runs, routine futsal in Kuningan, jogging at GBK, Muay Thai, alpine trekking, and weekend angling.'}
                                </p>
                            </motion.div>

                            {/* ── RIGHT COLUMN: Spotify Playlist & Real Interactive Audio Player (3 cols on desktop, Order 3 on mobile) ── */}
                            <motion.div 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="lg:col-span-3 order-3 lg:order-3 bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden"
                            >
                                {/* Header: Jawa Holic Playlist */}
                                <div className="space-y-2.5 relative z-10">
                                    <div className="flex items-center justify-between pb-2 border-b border-emerald-100/90 text-xs font-mono">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <Headphones size={13} className="text-emerald-700 shrink-0" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-900 truncate whitespace-nowrap">
                                                PLAYLIST &bull; JAWA HOLIC
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <span className="text-[9px] font-mono text-emerald-800 font-semibold bg-emerald-100/90 px-1.5 py-0.5 rounded whitespace-nowrap">
                                                {playlist.length} Tracks
                                            </span>
                                            <span className={`w-2 h-2 rounded-full shrink-0 ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
                                        </div>
                                    </div>

                                    {/* Tactile Track List */}
                                    <div className="space-y-1.5">
                                        {playlist.map((track, tIdx) => {
                                            const isCurrent = activeTrackIdx === tIdx;
                                            return (
                                                <motion.button
                                                    key={track.title}
                                                    onClick={() => changeTrack(tIdx)}
                                                    whileHover={{ x: 3, scale: 1.01 }}
                                                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 ${
                                                        isCurrent
                                                            ? 'bg-emerald-100/95 text-emerald-950 border border-emerald-300 shadow-2xs font-semibold'
                                                            : 'hover:bg-emerald-50/80 text-slate-700 hover:text-slate-900 border border-transparent'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform ${
                                                            isCurrent ? 'bg-emerald-700 text-white shadow-sm scale-105' : 'bg-slate-200/80 text-slate-600'
                                                        }`}>
                                                            {isCurrent && isPlaying ? (
                                                                <span className="flex items-end gap-0.5 h-3">
                                                                    <span className="w-0.5 h-full bg-white animate-pulse" />
                                                                    <span className="w-0.5 h-2/3 bg-white animate-bounce" />
                                                                    <span className="w-0.5 h-full bg-white animate-pulse" />
                                                                </span>
                                                            ) : (
                                                                <Music size={12} />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className={`text-xs font-bold truncate leading-tight ${isCurrent ? 'text-emerald-950' : 'text-slate-900'}`}>
                                                                {track.title}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500 truncate font-mono mt-0.5">
                                                                {track.artist}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        {isCurrent && (
                                                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-700 text-white">
                                                                {isPlaying ? 'PLAY' : 'PAUSE'}
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] font-mono text-slate-500">
                                                            {track.durationStr}
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Integrated Hi-Fi Player Console */}
                                <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 text-white rounded-2xl p-4 border border-emerald-800/70 space-y-3 relative z-10 shadow-lg">
                                    {/* Console Header Bar */}
                                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300 pb-1 border-b border-emerald-900/60">
                                        <span className="font-bold uppercase flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                                            <span>{isPlaying ? 'NOW PLAYING' : 'PLAYER READY'}</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-emerald-400/90 font-mono px-1.5 py-0.5 rounded bg-emerald-900/40 border border-emerald-800/50">
                                                HQ AUDIO
                                            </span>
                                            <button 
                                                onClick={toggleMute}
                                                className="text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-slate-800"
                                                title={isMuted ? 'Unmute' : 'Mute'}
                                                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                                            >
                                                {isMuted ? <VolumeX size={13} className="text-rose-400" /> : <Volume2 size={13} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Center Stage: Rotating Vinyl Record + Track Info */}
                                    <div className="flex items-center gap-3 py-0.5">
                                        <div className="relative shrink-0">
                                            {/* Ambient Sound Aura */}
                                            {isPlaying && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.75, 0.35] }}
                                                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                                                    className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 blur-md pointer-events-none"
                                                />
                                            )}
                                            <motion.div
                                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-slate-950 border-2 border-slate-700/80 flex items-center justify-center shrink-0 shadow-xl relative z-10"
                                            >
                                                {/* Vinyl Grooves effect */}
                                                <div className="absolute inset-1 rounded-full border border-slate-800 pointer-events-none" />
                                                <div className="absolute inset-2 rounded-full border border-slate-800/80 pointer-events-none" />
                                                <Disc size={26} className={isPlaying ? "text-emerald-300" : "text-slate-500"} />
                                                {/* Center Record Label */}
                                                <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shadow-inner">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="min-w-0 flex-1 space-y-0.5">
                                            <h4 className="font-bold text-sm text-white truncate leading-tight">
                                                {activeTrack.title}
                                            </h4>
                                            <p className="text-xs text-emerald-400 font-mono truncate">
                                                {activeTrack.artist}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-editorial-serif italic truncate">
                                                {activeTrack.album || 'Single Hits'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Retro Hi-Fi Sound Equalizer */}
                                    <div className="h-5 flex items-end justify-between gap-0.5 px-2 py-0.5 bg-slate-950/80 rounded-lg border border-slate-800/90">
                                        {[25, 55, 85, 45, 95, 70, 40, 90, 50, 80, 60, 95, 35, 75, 50, 85, 65, 40].map((h, i) => {
                                            const dynamicHeight = isPlaying 
                                                ? Math.max(15, (h * ((i % 3) + 1) + (currentTime * 14)) % 100) 
                                                : 15;
                                            return (
                                                <span
                                                    key={i}
                                                    style={{
                                                        height: `${dynamicHeight}%`,
                                                        transition: 'height 0.2s ease-out'
                                                    }}
                                                    className={`w-1 rounded-full ${isPlaying ? 'bg-gradient-to-t from-emerald-500 to-teal-300' : 'bg-slate-700/60'}`}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Interactive Progress Bar */}
                                    <div className="space-y-1">
                                        <div 
                                            onClick={handleSeek}
                                            className="w-full h-2 bg-slate-800/90 hover:bg-slate-700/90 rounded-full overflow-hidden cursor-pointer relative transition-all"
                                        >
                                            <div 
                                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-150" 
                                                style={{ width: `${progressPercentage}%` }} 
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-400">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{duration > 0 ? formatTime(duration) : activeTrack.durationStr}</span>
                                        </div>
                                    </div>

                                    {/* Big Tactile Transport Controls */}
                                    <div className="flex items-center justify-center gap-3 pt-0.5">
                                        <button
                                            onClick={prevTrack}
                                            className="w-8 h-8 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                                            aria-label="Previous track"
                                        >
                                            <SkipBack size={16} />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all shadow-md active:scale-95 hover:shadow-emerald-500/25 hover:shadow-lg"
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
                                            className="w-8 h-8 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
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
