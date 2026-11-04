import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Activity, ShieldCheck, Zap, 
    Server, Layout, Database, Cpu, CheckCircle2
} from 'lucide-react';

// Domain profiles with descriptions and key production highlights
const DOMAIN_PROFILES = {
    Backend: {
        id: 'Backend',
        label: 'Backend',
        title: 'Backend Architecture & High-Concurrency APIs',
        badge: 'Enterprise Core',
        icon: Server,
        color: 'emerald',
        defaultTech: 'Express.js',
        technologies: ['Express.js', 'Node.js', 'Laravel', 'Spring Boot', 'Prisma ORM', 'Kafka', 'Swagger', 'PHP'],
        description: {
            id: 'Merancang arsitektur backend skala enterprise, REST API performa tinggi, Server-Sent Events (SSE) multi-turn streaming, dan antrean pesan terdistribusi (Kafka). Terbukti memproses data transaksi konstruksi jalan tol nasional di PT Jasa Marga dan digitalisasi dokumen di Adira Finance.',
            en: 'Engineered mission-critical enterprise backends, high-throughput REST APIs, SSE real-time streaming, and distributed message queues (Kafka). Production-tested across national toll road systems at PT Jasa Marga and loan document digitization at Adira Finance.'
        },
        highlights: [
            { label: 'API Latency', value: '1.2 ms Avg' },
            { label: 'Event Throughput', value: '450 ev/s (Kafka)' },
            { label: 'Automated Tests', value: '100% Pass (78/78)' }
        ]
    },
    Frontend: {
        id: 'Frontend',
        label: 'Frontend',
        title: 'Frontend Engineering & Client Applications',
        badge: 'Interactive UI & PWA',
        icon: Layout,
        color: 'teal',
        defaultTech: 'React.js',
        technologies: ['React.js', 'TypeScript', 'TailwindCSS', 'Inertia.js'],
        description: {
            id: 'Membangun antarmuka web modern yang responsif, Progressive Web App (PWA) dengan offline capability, modul penandatanganan dokumen digital kanvas ramah sentuhan, serta integrasi seamless Laravel + React via Inertia.js dengan type safety ketat.',
            en: 'Building responsive modern interfaces, offline-ready Progressive Web Apps (PWA), touch-friendly canvas digital signature drawing, and seamless Laravel + React SPA integrations via Inertia.js with strict TypeScript type safety.'
        },
        highlights: [
            { label: 'Build Time', value: '0.6s (Vite)' },
            { label: 'Type Safety', value: 'Strict TypeScript' },
            { label: 'Usability (SUS)', value: '87.08 (Grade A)' }
        ]
    },
    Database: {
        id: 'Database',
        label: 'Database & Storage',
        title: 'Database, Cache & Cloud Object Storage',
        badge: 'Relational & Object Tier',
        icon: Database,
        color: 'cyan',
        defaultTech: 'PostgreSQL',
        technologies: ['PostgreSQL', 'MySQL', 'MariaDB', 'Redis', 'MinIO', 'AWS S3'],
        description: {
            id: 'Normalisasi skema relasional, optimasi query B-Tree index, in-memory caching Redis sebagai Single Source of Truth (SSOT), serta penyimpanan berkas cetak biru & kontrak terenkripsi menggunakan cluster MinIO S3.',
            en: 'Relational schema normalization, B-Tree index query optimization, Redis in-memory caching as Single Source of Truth (SSOT), and encrypted document vault storage using private MinIO S3 cluster.'
        },
        highlights: [
            { label: 'Query Execution', value: '1.14 ms (B-Tree)' },
            { label: 'Cache Hit Ratio', value: '94.6% (Redis)' },
            { label: 'Object Storage', value: 'MinIO S3 Cluster' }
        ]
    },
    DevOps: {
        id: 'DevOps',
        label: 'DevOps & CI/CD',
        title: 'DevOps, CI/CD & Linux Infrastructure',
        badge: 'Container & Zero-Trust',
        icon: Cpu,
        color: 'emerald',
        defaultTech: 'Docker',
        technologies: ['Docker', 'GitLab CI/CD', 'Linux', 'Nginx', 'CloudPanel'],
        description: {
            id: 'Orkestrasi kontainer Docker Compose multi-service, automated pipeline CI/CD GitLab 4 tahap, mitigasi bot Nginx (HTTP 403), serta administrasi Dedicated Cloud VPS 26+ domain berbasis Linux Ubuntu dan CloudPanel.',
            en: 'Multi-service container orchestration with Docker Compose, automated GitLab 4-stage CI/CD pipelines, Nginx reverse proxy bot mitigation (HTTP 403), and dedicated Linux Cloud VPS administration across 26+ production domains.'
        },
        highlights: [
            { label: 'Production Uptime', value: '99.9% Verified' },
            { label: 'CI/CD Pipeline', value: 'Automated 4-Stage' },
            { label: 'Server Load Drop', value: '104+ down to <0.5' }
        ]
    }
};

// Production proof and telemetry details for each technology
const TECH_TELEMETRY = {
    'Express.js': {
        category: 'Backend',
        badge: 'Enterprise Core',
        project: 'JM-RISE @ PT Jasa Marga (Persero) Tbk',
        command: 'node src/server.js',
        latency: '1.2 ms',
        status: 'ONLINE',
        output: [
            '> Express.js REST API Server listening on port 5000',
            '> Prisma ORM connected to PostgreSQL transaction pool',
            '> SSE (Server-Sent Events) multi-turn chat stream: READY',
            '> Automated AI RAG ingestion pipeline: 41.8ms vector latency'
        ]
    },
    'Node.js': {
        category: 'Backend',
        badge: 'Runtime Engine',
        project: 'Jasa Marga Internal Systems',
        command: 'node -v && pm2 status',
        latency: '0.12 ms',
        status: 'STABLE',
        output: [
            '> Node.js v20.x LTS (V8 Engine) - Cluster Mode (4 Workers)',
            '> Memory usage: 84MB heap used / 128MB total allocation',
            '> Event loop lag: 0.12ms (Optimal high-throughput API response)'
        ]
    },
    'Laravel': {
        category: 'Backend',
        badge: 'Modular Monolith',
        project: 'SIM SEMPRO & TA & JM-ACT',
        command: 'php artisan test --filter=SimilarityEngineTest',
        latency: '41.8 ms',
        status: '100% PASS',
        output: [
            '> PASS Tests\\Feature\\ThesisCosineSimilarityTest (41.8 ms)',
            '> PASS Tests\\Unit\\TopicToLecturerMatchingTest (12.4 ms)',
            '> 78 automated Unit/Feature tests (100% pass)',
            '> System Usability Scale (SUS) Score: 87.08 (Grade A)'
        ]
    },
    'Spring Boot': {
        category: 'Backend',
        badge: 'Core Banking',
        project: 'Action Core & Digitalisasi Dokumen @ Adira Finance',
        command: 'java -jar target/document-digitization.jar',
        latency: '2.1 s init',
        status: 'ONLINE',
        output: [
            '> Spring Boot 3.x initialized in 2.148s (JVM production)',
            '> Apache POI automated PDF/DOCX generation & e-stamp worker',
            '> Apache Kafka consumer group: [loan-document-events] connected'
        ]
    },
    'PHP': {
        category: 'Backend',
        badge: 'Production Backend',
        project: 'CloudPanel Migration & Multi-Site CMS',
        command: 'php -m | grep -E "(pdo|redis|opcache)"',
        latency: '0.4 ms',
        status: 'READY',
        output: [
            '> OPcache JIT compilation enabled (99.8% cache hit rate)',
            '> PDO PostgreSQL / MySQL drivers loaded',
            '> WP-CLI remote syndication automated via Bash script'
        ]
    },
    'PostgreSQL': {
        category: 'Database',
        badge: 'Primary Relational DB',
        project: 'JM-RISE Toll Road Construction Milestones',
        command: "psql -U postgres -d jm_rise -c 'EXPLAIN ANALYZE ...'",
        latency: '1.14 ms',
        status: 'SYNCED',
        output: [
            '> Relational schema normalization & B-tree indexes applied',
            '> Planning Time: 0.082 ms | Execution Time: 1.140 ms',
            '> Cross-application duplicate ID reconciliation: 100% synchronized'
        ]
    },
    'MySQL': {
        category: 'Database',
        badge: 'Relational DB',
        project: 'PreiBalap, Supermarket POS & Academic Projects',
        command: 'mysqladmin -u root status',
        latency: '0.8 ms',
        status: 'ONLINE',
        output: [
            '> Uptime: 2,492,100 sec | Threads: 14 | Queries: 1.8M+',
            '> Slow queries: 0 | InnoDB Buffer Pool: 85% hit ratio'
        ]
    },
    'Redis': {
        category: 'Cache',
        badge: 'In-Memory Cache & MDM',
        project: 'Aggregator Operasi @ PT Jasa Marga (Persero) Tbk',
        command: 'redis-cli INFO stats',
        latency: '0.3 ms',
        status: 'HOT',
        output: [
            '> instantaneous_ops_per_sec: 1,280 ops/sec',
            '> keyspace_hits: 94.6% (sub-millisecond frequent read query acceleration)',
            '> Single Source of Truth (SSOT) data distribution cache active'
        ]
    },
    'Docker': {
        category: 'DevOps',
        badge: 'Containerization',
        project: 'Containerized Stacks & Cloudflare Zero-Trust',
        command: 'docker compose ps',
        latency: 'N/A',
        status: 'HEALTHY',
        output: [
            '> [backend-api]        Up (healthy)  port 5000->5000/tcp',
            '> [postgres-cluster]   Up (healthy)  port 5432->5432/tcp',
            '> [minio-s3-service]   Up (healthy)  port 9000->9000/tcp',
            '> [cloudflared-tunnel] Up (running)  secure remote live access'
        ]
    },
    'GitLab CI/CD': {
        category: 'DevOps',
        badge: 'Automated Pipeline',
        project: 'PT Jasa Marga Internal Repositories',
        command: 'gitlab-runner exec docker test-and-deploy',
        latency: '2m 04s',
        status: 'PASSED',
        output: [
            '> Stage 1: Lint & Code Style Check ...... PASSED',
            '> Stage 2: Automated Unit/Feature Tests .. PASSED [78/78]',
            '> Stage 3: Docker Container Build ........ PASSED',
            '> Stage 4: Deploy to Staging Cluster ..... SUCCESS'
        ]
    },
    'Nginx': {
        category: 'DevOps',
        badge: 'Reverse Proxy & Security',
        project: 'WordPress CloudPanel VPS Migration & Bot Mitigation',
        command: 'nginx -t && grep -c "403" /var/log/nginx/bot_block.log',
        latency: '0.18 ms',
        status: 'PROTECTED',
        output: [
            '> nginx: configuration file syntax is ok (HTTP/2, Brotli, SSL)',
            '> AI Bot Mitigation: Blocked aggressive Meta/Claude/Exa bots (HTTP 403)',
            '> PHP-FPM worker pool tuned (pm.max_children) + Redis object caching',
            '> Server load dropped: 104+ -> < 0.5 | RAM freed: +4.5 GB | TTFB: 1-3s'
        ]
    },
    'MinIO': {
        category: 'Storage',
        badge: 'S3-Compatible Storage',
        project: 'JM-RISE Toll Road Document Vault',
        command: 'mc admin info myminio',
        latency: '3.2 ms',
        status: 'ONLINE',
        output: [
            '> MinIO S3 Object Storage: ONLINE (4 Drives cluster)',
            '> Presigned URL upload generator active',
            '> Private access control for APJT construction blueprints'
        ]
    },
    'AWS S3': {
        category: 'Storage',
        badge: 'Cloud Storage',
        project: 'Cloud Asset Archival',
        command: 'aws s3 ls s3://production-enterprise-vault',
        latency: '14 ms',
        status: 'READY',
        output: [
            '> Tiered lifecycle management & AES-256 encryption',
            '> CDN CloudFront origin synchronization active'
        ]
    },
    'React.js': {
        category: 'Frontend',
        badge: 'Modern UI Engine',
        project: 'SIM SEMPRO & TA & Interactive Systems',
        command: 'npm run build',
        latency: '0.6 s build',
        status: 'COMPILED',
        output: [
            '> vite v8.0: transformed 1,791 modules in 0.6s',
            '> Component modularity with React Hooks & StrictMode',
            '> Responsive UI with Tailwind CSS utility architecture'
        ]
    },
    'Inertia.js': {
        category: 'Frontend',
        badge: 'Modern SPA Bridge',
        project: 'SIM SEMPRO & TA Academic Portal',
        command: 'inertia --version',
        latency: '0.1 ms',
        status: 'READY',
        output: [
            '> Zero-API Single Page Application architecture',
            '> Seamless state sharing between Laravel 11 and React',
            '> Client-side routing with instant transitions'
        ]
    },
    'TailwindCSS': {
        category: 'Frontend',
        badge: 'Design System',
        project: 'Responsive Design & Design Systems',
        command: 'npx tailwindcss --minify',
        latency: '0.2 s',
        status: 'JIT ACTIVE',
        output: [
            '> CSS footprint optimized: JIT compilation tree-shaken',
            '> Custom typography, layout tokens & breakpoints applied'
        ]
    },
    'Prisma ORM': {
        category: 'Backend',
        badge: 'Type-Safe ORM',
        project: 'JM-RISE @ PT Jasa Marga (Persero) Tbk',
        command: 'npx prisma db pull && npx prisma migrate status',
        latency: '0.8 ms',
        status: 'SYNCED',
        output: [
            '> Prisma Client initialized with PostgreSQL connection pool',
            '> Database schema up to date: 100% migrations applied',
            '> Type-safe queries for APJT toll road construction progress'
        ]
    },
    'Kafka': {
        category: 'Backend',
        badge: 'Distributed Messaging',
        project: 'Action Core Banking @ PT Adira Finance',
        command: 'kafka-consumer-groups.sh --describe --group loan-document-group',
        latency: '1.4 ms',
        status: 'CONSUMING',
        output: [
            '> Consumer group: [loan-document-group] active on 3 partitions',
            '> Event throughput: 450 events/sec | Consumer lag: 0',
            '> Automated e-signature & e-stamp asynchronous dispatch'
        ]
    },
    'Swagger': {
        category: 'Backend',
        badge: 'API Documentation & Contract',
        project: 'Aggregator Operasi & JM-RISE @ PT Jasa Marga',
        command: 'swagger-cli validate docs/openapi.yaml',
        latency: '0.12 s',
        status: 'VALID',
        output: [
            '> OpenAPI 3.0 specification successfully validated',
            '> Master Data Management (MDM) endpoints documented',
            '> Interactive API sandbox active for internal consumer systems'
        ]
    },
    'TypeScript': {
        category: 'Frontend',
        badge: 'Typed Language',
        project: 'SIM SEMPRO & TA Academic Management',
        command: 'tsc --noEmit',
        latency: '0.38 s',
        status: '0 ERRORS',
        output: [
            '> Compiling React 18 + Inertia.js TypeScript components',
            '> Strict type checking enabled for thesis guidance workflows',
            '> Found 0 type errors across all modules'
        ]
    },
    'MariaDB': {
        category: 'Database',
        badge: 'Relational DB',
        project: 'WordPress CloudPanel Multi-Site VPS',
        command: 'mariadb-admin ping && mariadb -e "STATUS"',
        latency: '0.3 ms',
        status: 'ONLINE',
        output: [
            '> MariaDB 10.11 LTS server is alive',
            '> 26+ WordPress databases active with InnoDB buffer pool',
            '> Zero replication delay & optimized read queries'
        ]
    },
    'Linux': {
        category: 'DevOps',
        badge: 'Operating System & Shell',
        project: 'Dedicated Linux Cloud VPS & Enterprise Servers',
        command: 'uname -a && uptime',
        latency: '0.01 ms',
        status: 'RUNNING',
        output: [
            '> Linux vps-cloudpanel 6.8.0-45-generic x86_64 GNU/Linux',
            '> Load average: 0.18, 0.22, 0.25 (optimized down from 104+)',
            '> Automated Bash & SSH remote synchronization active'
        ]
    },
    'CloudPanel': {
        category: 'DevOps',
        badge: 'Cloud Server Manager',
        project: 'WordPress 26+ Multi-Site Cloud VPS',
        command: 'clpctl site:list',
        latency: '0.04 s',
        status: 'ACTIVE',
        output: [
            '> CloudPanel CLI connected (Nginx, PHP 8.3-FPM, MariaDB)',
            '> 26 domain vhosts configured with Let\'s Encrypt SSL',
            '> Integrated Redis object cache & PHP process manager'
        ]
    }
};

export default function AnimatedSkillsLab() {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    // Active domain category: 'Backend' | 'Frontend' | 'Database' | 'DevOps'
    const [activeDomain, setActiveDomain] = useState('Backend');

    const domainKeys = ['Backend', 'Frontend', 'Database', 'DevOps'];
    const currentDomain = DOMAIN_PROFILES[activeDomain];

    // Selected tech within current domain
    const [selectedTech, setSelectedTech] = useState(currentDomain.defaultTech);

    const handleSelectDomain = (domainKey) => {
        setActiveDomain(domainKey);
        setSelectedTech(DOMAIN_PROFILES[domainKey].defaultTech);
    };

    const activeTelemetry = TECH_TELEMETRY[selectedTech] || TECH_TELEMETRY[currentDomain.defaultTech];

    return (
        <div className="space-y-4">
            {/* ── 1. TOP DOMAIN SELECTOR: 4 Primary Categories (Backend, Frontend, Database & Storage, DevOps & CI/CD) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 pb-3">
                {domainKeys.map((key) => {
                    const domain = DOMAIN_PROFILES[key];
                    const Icon = domain.icon;
                    const isActive = activeDomain === key;
                    return (
                        <motion.button
                            key={key}
                            onClick={() => handleSelectDomain(key)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex items-center gap-2.5 ${
                                isActive
                                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200/90 hover:border-slate-300'
                            }`}
                        >
                            {/* Fluid Sliding Active Pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeDomainHighlight"
                                    className="absolute inset-0 bg-emerald-800"
                                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                />
                            )}

                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10 ${
                                isActive 
                                    ? 'bg-white/15 text-emerald-200' 
                                    : 'bg-white text-slate-600 border border-slate-200'
                            }`}>
                                <Icon size={16} />
                            </div>

                            <div className="min-w-0 relative z-10">
                                <h4 className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                                    {domain.label}
                                </h4>
                                <p className={`text-[10px] font-mono truncate ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                                    {domain.badge}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* ── 2. SUB-TECHNOLOGY TABS WITH ANIMATED CONTINUOUS RUNNING LIGHT LINE ── */}
            <div className="relative overflow-hidden p-1.5 bg-gradient-to-r from-slate-50 via-emerald-50/50 to-slate-50 rounded-xl border border-emerald-200/90 shadow-2xs">
                
                {/* ── Animated Continuous Running Light Stream (Garis Lampu Menyala Berjalan di Bawah) ── */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-emerald-200/50 overflow-hidden pointer-events-none">
                    {/* Glowing traveling laser beam (bergerak memanjang mulus tanpa henti) */}
                    <motion.div
                        className="w-48 sm:w-72 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981,0_0_4px_#34d399]"
                        animate={{ x: ['-100%', '800%'] }}
                        transition={{ repeat: Infinity, duration: 3.6, ease: "linear" }}
                    />
                </div>

                {/* Top Subtle Counter-Pulse Shimmer Line */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-emerald-200/40 overflow-hidden pointer-events-none">
                    <motion.div
                        className="w-40 h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_8px_#14b8a6]"
                        animate={{ x: ['800%', '-100%'] }}
                        transition={{ repeat: Infinity, duration: 4.8, ease: "linear" }}
                    />
                </div>

                <div className="relative z-10 p-1 sm:p-1.5 space-y-2">
                    {/* Header Bar: Label & Production Status Badge */}
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 px-0.5 sm:px-1">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase text-emerald-900 bg-emerald-100/90 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-300/80 shrink-0 flex items-center gap-1.5 shadow-2xs">
                                <Activity size={11} className="text-emerald-700 animate-pulse" />
                                <span>{lang === 'id' ? 'Pilih Teknologi' : 'Select Tech'}:</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 hidden md:inline">
                                ({currentDomain.technologies.length} {lang === 'id' ? 'stack terdaftar' : 'registered stacks'})
                            </span>
                        </div>

                        {/* Production Verified Status Badge with Pulsing Live Node */}
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10px] font-mono text-emerald-900 font-bold bg-emerald-100/90 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-300/80 shrink-0 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                            <ShieldCheck size={12} className="text-emerald-700" />
                            <span>{lang === 'id' ? 'Produksi Terverifikasi' : 'Production Verified'}</span>
                        </div>
                    </div>

                    {/* Technology Pills: flex-wrap layout so all stack options are 100% visible without any horizontal scrolling */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 px-0.5 sm:px-1 pt-0.5">
                        {currentDomain.technologies.map((tech) => {
                            const isTechActive = selectedTech === tech;
                            return (
                                <motion.button
                                    key={tech}
                                    onClick={() => setSelectedTech(tech)}
                                    whileHover={{ scale: 1.04, y: -1 }}
                                    whileTap={{ scale: 0.96 }}
                                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10.5px] sm:text-[11px] font-mono font-semibold transition-all relative group cursor-pointer ${
                                        isTechActive
                                            ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/20 border border-emerald-600 ring-2 ring-emerald-500/30'
                                            : 'bg-white/95 text-slate-700 hover:text-emerald-950 hover:bg-emerald-50/80 border border-slate-200/90 hover:border-emerald-300 shadow-2xs'
                                    }`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                                            isTechActive 
                                                ? 'bg-emerald-200 shadow-[0_0_6px_#6ee7b7] animate-pulse' 
                                                : 'bg-emerald-600 group-hover:scale-125'
                                        }`} />
                                        <span>{tech}</span>
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── 3. SPLIT 2-COLUMN DISPLAY: Explanation & Capabilities (Left) + Live Telemetry Terminal (Right) ── */}
            <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch min-w-0">
                
                {/* ── LEFT COLUMN: Domain Explanation & Architecture Capabilities ── */}
                <div className="lg:col-span-6 bg-slate-50/90 rounded-xl p-3.5 sm:p-5 border border-slate-200 flex flex-col justify-between space-y-3.5 sm:space-y-4 shadow-2xs min-w-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDomain}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-3 min-w-0"
                        >
                            {/* Domain Title & Badge */}
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-slate-200">
                                    <span className="text-[9.5px] sm:text-[10px] font-mono uppercase font-bold text-emerald-800 tracking-wider">
                                        {lang === 'id' ? 'PROFIL DOMAIN' : 'DOMAIN PROFILE'} &bull; 0{domainKeys.indexOf(activeDomain) + 1}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                                        {currentDomain.badge}
                                    </span>
                                </div>
                                <h3 className="font-editorial-title text-xl sm:text-2xl lg:text-3xl text-slate-900 mt-1 leading-tight break-words">
                                    {currentDomain.title}
                                </h3>
                            </div>

                            {/* Detailed Explanation */}
                            <p className="font-editorial-serif text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed text-justify">
                                {lang === 'id' ? currentDomain.description.id : currentDomain.description.en}
                            </p>

                            {/* Key Capability Highlights */}
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                                {currentDomain.highlights.map((h, i) => (
                                    <div key={i} className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 text-center shadow-2xs min-w-0 overflow-hidden">
                                        <div className="text-[7.5px] xs:text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase truncate">
                                            {h.label}
                                        </div>
                                        <div className="text-[10.5px] xs:text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                                            {h.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Active Selected Tech Info Card */}
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-1 text-xs font-mono">
                        <span className="text-slate-500 flex items-center gap-1.5 text-[11px] sm:text-xs truncate">
                            <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                            <span>{lang === 'id' ? 'Inspeksi' : 'Inspecting'}: <strong className="text-slate-900 font-bold">{selectedTech}</strong></span>
                        </span>
                        <span className="text-emerald-800 font-bold text-[10px] sm:text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                            {activeTelemetry.badge}
                        </span>
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Live Telemetry Terminal Console ── */}
                <div className="lg:col-span-6 flex flex-col justify-between p-3.5 sm:p-5 bg-slate-950 text-slate-100 rounded-xl shadow-xl border border-slate-800 font-mono space-y-3 min-h-[300px] sm:min-h-[360px] min-w-0 overflow-hidden">
                    {/* Terminal Window Header */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800 text-[10px] sm:text-[11px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="text-slate-300 ml-1 font-bold text-emerald-400 flex items-center gap-1 truncate max-w-[170px] xs:max-w-none">
                                <Terminal size={12} className="shrink-0" />
                                <span className="truncate">telemetry &mdash; {selectedTech}</span>
                            </span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded text-[9.5px] sm:text-[10px] border border-emerald-500/30 font-semibold shrink-0">
                            {activeTelemetry.status}
                        </span>
                    </div>

                    {/* Terminal Log Execution Body */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTech}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.16 }}
                            className="flex-1 bg-slate-900/80 rounded-lg p-2.5 sm:p-3 border border-slate-800 space-y-2 text-xs flex flex-col justify-between min-w-0 overflow-hidden"
                        >
                            <div className="min-w-0">
                                <p className="text-emerald-400 text-[10.5px] sm:text-[11px] flex items-center gap-1 font-semibold truncate">
                                    <span className="text-slate-500">$</span>
                                    <span className="truncate">{activeTelemetry.command}</span>
                                    <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-0.5 shrink-0" />
                                </p>
                                
                                <div className="space-y-1.5 text-slate-300 text-[10px] sm:text-[11px] pt-2 pl-2 border-l border-emerald-500/40">
                                    {activeTelemetry.output.map((line, idx) => (
                                        <p key={idx} className="leading-snug break-words">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Production Proof Environment */}
                            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1 text-[9.5px] sm:text-[10px] text-slate-400">
                                <span className="truncate max-w-[200px] xs:max-w-[280px]">{lang === 'id' ? 'Bukti' : 'Proof'}: {activeTelemetry.project}</span>
                                <span className="text-emerald-400 font-bold shrink-0">{activeTelemetry.latency}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Bottom Terminal Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] sm:text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                        <span className="flex items-center gap-1">
                            <Zap size={11} className="text-amber-400 fill-amber-400 shrink-0" />
                            <span className="truncate">{lang === 'id' ? 'Telemetri Arsitektur' : 'Architecture Telemetry'}</span>
                        </span>
                        <span>{lang === 'id' ? 'Respons' : 'Response'}: <strong className="text-emerald-400">{activeTelemetry.latency}</strong></span>
                    </div>
                </div>

            </div>
        </div>
    );
}
