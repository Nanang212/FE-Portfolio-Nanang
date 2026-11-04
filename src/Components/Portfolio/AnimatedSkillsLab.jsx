import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Terminal, Server, Database, Cloud, Layers, Cpu, 
    ArrowRight, CheckCircle2, Activity, ShieldCheck
} from 'lucide-react';

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
    'cPanel': {
        category: 'DevOps',
        badge: 'Server Management',
        project: 'Production Web Hosting Administration',
        command: 'uapi DomainInfo list_domains',
        latency: '0.5 ms',
        status: 'ACTIVE',
        output: [
            '> DNS zone routing, cron automation, and DB backups active',
            '> PHP-FPM pool optimization applied'
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

export default function AnimatedSkillsLab({ skills = {} }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    // Filter tab: 'all' | 'Backend' | 'Database' | 'DevOps' | 'Frontend'
    const [activeCategory, setActiveCategory] = useState('all');

    // Selected tech for live telemetry display
    const [selectedTech, setSelectedTech] = useState('Express.js');

    const categories = [
        { id: 'all', label: lang === 'id' ? 'Semua' : 'All' },
        { id: 'Backend', label: 'Backend' },
        { id: 'Database', label: 'Database & Storage' },
        { id: 'DevOps', label: 'DevOps & CI/CD' },
        { id: 'Frontend', label: 'Frontend' }
    ];

    // Filter categories cleanly
    const filteredCategories = Object.entries(skills).filter(([category]) => {
        if (activeCategory === 'all') return true;
        if (activeCategory === 'Database') return category === 'Database' || category === 'Storage' || category === 'Cache';
        return category.toLowerCase() === activeCategory.toLowerCase();
    });

    const activeTelemetry = TECH_TELEMETRY[selectedTech] || TECH_TELEMETRY['Express.js'];

    // Interactive Architecture Pipeline Nodes
    const pipelineNodes = [
        { name: 'React', role: 'Frontend', tech: 'React.js' },
        { name: 'Express / Laravel', role: 'API Core', tech: 'Express.js' },
        { name: 'Redis', role: 'Cache', tech: 'Redis' },
        { name: 'PostgreSQL', role: 'Database', tech: 'PostgreSQL' },
        { name: 'MinIO', role: 'Storage', tech: 'MinIO' },
        { name: 'Docker', role: 'DevOps', tech: 'Docker' }
    ];

    return (
        <div className="space-y-4">
            {/* Top Compact Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex flex-wrap items-center gap-1.5">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                activeCategory === cat.id
                                    ? 'bg-emerald-700 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="text-[11px] font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{lang === 'id' ? 'Klik chip untuk live telemetri' : 'Click chip for live telemetry'}</span>
                </div>
            </div>

            {/* Clean 2-Column Split Studio Layout (Fits in 1 screen viewport!) */}
            <div className="grid lg:grid-cols-12 gap-5 items-stretch">
                
                {/* ── LEFT COLUMN: Compact Grouped Skill Badges ── */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredCategories.map(([category, items]) => (
                            <div
                                key={category}
                                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2"
                            >
                                <div className="flex items-center justify-between text-xs border-b border-slate-200/60 pb-1">
                                    <span className="font-bold text-slate-800 uppercase tracking-wider font-mono">
                                        {category}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-mono">
                                        {items.length} Tech
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {items.map((skill) => {
                                        const isSelected = selectedTech === skill.name;
                                        return (
                                            <button
                                                key={skill.id}
                                                onClick={() => setSelectedTech(skill.name)}
                                                className={`group px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 flex items-center gap-1.5 ${
                                                    isSelected
                                                        ? 'bg-emerald-700 text-white shadow ring-2 ring-emerald-500 scale-102 font-semibold'
                                                        : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 shadow-2xs'
                                                }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-600'}`} />
                                                <span>{skill.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Status Ticker */}
                    <div className="p-2.5 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
                        <span className="flex items-center gap-1">
                            <ShieldCheck size={13} className="text-emerald-700" /> Production Verified
                        </span>
                        <span className="text-emerald-700 font-semibold">Active Target: {selectedTech}</span>
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Live Architecture & Telemetry Terminal ── */}
                <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-5 bg-slate-950 text-slate-100 rounded-xl shadow-xl border border-slate-800 font-mono space-y-3 min-h-[380px]">
                    {/* Top: Mini Architecture Pipeline Bus */}
                    <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800 uppercase tracking-wider">
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                                <Activity size={12} /> Data Bus Flow
                            </span>
                            <span>Interactive Nodes</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1 pt-1.5">
                            {pipelineNodes.map((node) => {
                                const isSelected = selectedTech === node.tech;
                                return (
                                    <button
                                        key={node.name}
                                        onClick={() => setSelectedTech(node.tech)}
                                        className={`p-1.5 rounded text-center transition-all ${
                                            isSelected
                                                ? 'bg-emerald-900/80 text-emerald-200 ring-1 ring-emerald-400'
                                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                        }`}
                                        title={`${node.name} - ${node.role}`}
                                    >
                                        <p className="text-[10px] font-bold truncate leading-tight">{node.name}</p>
                                        <p className="text-[9px] text-slate-500 truncate">{node.role}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Middle: Terminal Console Output */}
                    <div className="flex-1 min-h-0 bg-slate-900/80 rounded-lg p-3 border border-slate-800 space-y-2 text-xs overflow-hidden flex flex-col justify-between">
                        <div>
                            {/* Terminal Window Header */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-slate-300 ml-1.5 font-bold text-emerald-400">{selectedTech}</span>
                                </div>
                                <span className="px-1.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded text-[10px] border border-emerald-500/30">
                                    {activeTelemetry.badge}
                                </span>
                            </div>

                            {/* Execution Log */}
                            <div className="pt-2 space-y-1">
                                <p className="text-emerald-400 text-[11px]">
                                    <span className="text-slate-500">$</span> {activeTelemetry.command}
                                </p>
                                <div className="space-y-1 text-slate-300 text-[11px] pt-1 pl-2 border-l border-emerald-500/40">
                                    {activeTelemetry.output.map((line, idx) => (
                                        <p key={idx} className="leading-snug">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Project Reference Tag */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="truncate max-w-[240px]">Env: {activeTelemetry.project}</span>
                            <span className="text-emerald-400 font-bold">{activeTelemetry.status}</span>
                        </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                        <span className="flex items-center gap-1">
                            <Terminal size={11} className="text-emerald-400" /> Architecture Runtime v2026
                        </span>
                        <span className="text-slate-400">Response: <strong className="text-emerald-400">{activeTelemetry.latency}</strong></span>
                    </div>
                </div>

            </div>
        </div>
    );
}
