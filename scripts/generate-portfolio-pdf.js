import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function toBase64(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return '';
    }
    const ext = path.extname(filePath).replace('.', '');
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/svg+xml';
    const data = fs.readFileSync(filePath).toString('base64');
    return `data:${mime};base64,${data}`;
}

const profileImg = toBase64('public/images/profile.png');
const faviconSvg = toBase64('public/favicon.svg');
const signflowDash = toBase64('public/storage/projects/02_documents_dashboard.png');
const signflowDetail = toBase64('public/storage/projects/03_document_detail.png');
const signflowMobile = toBase64('public/storage/projects/07_mobile_pwa_dashboard.png');
const wpMigrationHub = toBase64('public/storage/projects/wp-migration-hub.jpg');
const cloudpanelDash = toBase64('public/storage/projects/cloudpanel-sites-dashboard.png');
const simSemproKaprodi = toBase64('public/storage/projects/sim-sempro-dashboard-kaprodi.jpg');
const simSemproBimbingan = toBase64('public/storage/projects/sim-sempro-perjalanan-skripsi.jpg');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Nanang Aditya Sutahar — Engineering Dossier Portfolio</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #09261e;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    background: #0d3227;
    background-image: 
      radial-gradient(circle at 50% 10%, rgba(52, 211, 153, 0.12) 0%, transparent 60%),
      linear-gradient(rgba(52, 211, 153, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(52, 211, 153, 0.08) 1px, transparent 1px);
    background-size: 100% 100%, 20px 20px, 20px 20px;
    padding: 10mm 12mm 8mm 12mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Sheet Card Container */
  .sheet {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(226, 232, 240, 0.9);
    padding: 18px 22px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  /* Page Running Header */
  .running-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1.5px solid #e2e8f0;
    margin-bottom: 12px;
  }
  .running-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .running-brand img {
    width: 22px;
    height: 22px;
    border-radius: 5px;
  }
  .running-brand-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #0f172a;
  }
  .running-tagline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    color: #047857;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: 600;
  }
  .running-folio {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    color: #64748b;
    font-weight: 600;
  }

  /* Typography */
  .font-title {
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
  }
  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  /* Badges & Chips */
  .chip {
    display: inline-flex;
    align-items: center;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 7.5px;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
  }
  .chip-emerald {
    background: #ecfdf5;
    color: #065f46;
    border-color: #a7f3d0;
  }
  .chip-blue {
    background: #eff6ff;
    color: #1e40af;
    border-color: #bfdbfe;
  }

  /* Footer Dossier Note */
  .sheet-footer {
    padding-top: 8px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8px;
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Metrics Grid */
  .metric-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  .metric-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: #047857;
    line-height: 1;
    margin-bottom: 2px;
  }
  .metric-label {
    font-size: 8px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Project Box */
  .project-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 11px;
    margin-bottom: 10px;
    position: relative;
  }
  .project-box-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  .project-box-title {
    font-size: 11px;
    font-weight: 700;
    color: #0f172a;
  }
  .project-box-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    color: #047857;
    font-weight: 600;
  }
  .project-box-desc {
    font-size: 8.5px;
    color: #475569;
    line-height: 1.45;
    text-align: justify;
    margin-bottom: 6px;
  }

  /* Screenshot Grid */
  .screenshot-frame {
    background: #0f172a;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
  .screenshot-frame img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  /* Terminal Mockup */
  .terminal {
    background: #090d16;
    border-radius: 6px;
    padding: 8px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5px;
    color: #94a3b8;
    line-height: 1.4;
    border: 1px solid #1e293b;
    margin-top: 5px;
  }
  .terminal-green {
    color: #34d399;
  }
  .terminal-accent {
    color: #38bdf8;
  }
</style>
</head>
<body>

  <!-- ══════════════════════════════════════════════════════════════
       PAGE 1: COVER & EXECUTIVE DOSSIER
       ══════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="sheet">
      <!-- Top Running Header -->
      <div class="running-header">
        <div class="running-brand">
          <img src="${faviconSvg}" alt="NA Logo" />
          <span class="running-brand-text">NANANG ADITYA SUTAHAR</span>
          <span class="running-tagline">// ENGINEERING DOSSIER</span>
        </div>
        <span class="running-folio">VOLUME SPECIFICATION &bull; FOLIO #01</span>
      </div>

      <!-- Hero Header Section -->
      <div style="display: flex; gap: 20px; align-items: center; margin-top: 10px; margin-bottom: 14px;">
        <!-- Portrait Frame -->
        <div style="width: 135px; height: 165px; border-radius: 10px; background: linear-gradient(135deg, #09261e 0%, #154c3a 100%); border: 2px solid #34d399; overflow: hidden; position: relative; box-shadow: 0 10px 20px rgba(0,0,0,0.15); shrink-0;">
          <img src="${profileImg}" alt="Nanang Aditya" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" />
          <div style="position: absolute; bottom: 0; inset-x: 0; background: rgba(9, 38, 30, 0.85); backdrop-filter: blur(4px); padding: 3px 0; text-align: center; border-top: 1px solid rgba(52, 211, 153, 0.4);">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #34d399; font-weight: 700;">VERIFIED ENGINEER</span>
          </div>
        </div>

        <!-- Identity Block -->
        <div style="flex: 1;">
          <div style="display: inline-block; padding: 2px 8px; border-radius: 4px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 8px; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin-bottom: 6px;">
            ENTERPRISE BACKEND & FULL STACK ARCHITECT
          </div>
          <h1 class="font-title" style="font-size: 38px; color: #0f172a; margin-bottom: 4px;">NANANG ADITYA SUTAHAR</h1>
          <p style="font-size: 10px; color: #475569; line-height: 1.5; margin-bottom: 8px;">
            Software Engineer with <strong>3+ years of production experience</strong> building enterprise toll road monitoring architectures at <strong>PT Jasa Marga</strong>, core loan application maintenance & Kafka document digitization at <strong>Adira Finance</strong>, as well as production-ready freelance platforms and academic NLP engines.
          </p>

          <!-- Contact Bar -->
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #334155;">
            <div>📍 Surabaya, East Java, ID</div>
            <div>📱 +62 857-9066-3367</div>
            <div>✉️ nanangaditya2001@gmail.com</div>
            <div>🌐 <a href="https://fe-portfolio-nanang.vercel.app/" style="color: #047857; text-decoration: none; font-weight: 700;">fe-portfolio-nanang.vercel.app</a></div>
            <div>🔗 linkedin.com/in/nanang-aditya</div>
            <div>🐙 github.com/nanang-aditya</div>
          </div>
        </div>
      </div>

      <!-- 4 Core Engineering Metrics -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px;">
        <div class="metric-card">
          <div class="metric-value">3+ YRS</div>
          <div class="metric-label">Production Experience</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">19+</div>
          <div class="metric-label">Systems Deployed</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">41.8 MS</div>
          <div class="metric-label">Vector & NLP Latency</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">100%</div>
          <div class="metric-label">Automated Test Pass (78/78)</div>
        </div>
      </div>

      <!-- Core Architectural Expertise -->
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px;">
          <h2 class="font-title" style="font-size: 16px; color: #0f172a;">PRODUCTION ARCHITECTURE PILLARS</h2>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #047857; font-weight: 600;">ENTERPRISE BENCHMARK</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
            <div style="font-size: 9.5px; font-weight: 700; color: #0f172a; margin-bottom: 3px;">01. High-Concurrency Backend</div>
            <p style="font-size: 8px; color: #475569; line-height: 1.4;">
              Express.js, Node.js cluster, Laravel Modular Monolith & Spring Boot. High-throughput RESTful endpoints with sub-millisecond query caches.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
            <div style="font-size: 9.5px; font-weight: 700; color: #0f172a; margin-bottom: 3px;">02. AI RAG & Distributed Vault</div>
            <p style="font-size: 8px; color: #475569; line-height: 1.4;">
              Vector database ingestion, Server-Sent Events (SSE) streaming chat, and private S3-compatible document vaults on MinIO.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
            <div style="font-size: 9.5px; font-weight: 700; color: #0f172a; margin-bottom: 3px;">03. Zero-Downtime & Security</div>
            <p style="font-size: 8px; color: #475569; line-height: 1.4;">
              Linux Cloud VPS migrations, Nginx reverse proxy AI-bot mitigation (HTTP 403), strict RBAC guards & automated Docker CI/CD pipelines.
            </p>
          </div>
        </div>
      </div>

      <!-- Dossier Index Overview -->
      <div style="background: #0f172a; border-radius: 8px; padding: 12px 16px; color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #34d399; font-weight: 700; text-transform: uppercase;">ENGINEERING ARCHIVE SPREADS</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #94a3b8;">5-PAGE COMPREHENSIVE DOSSIER</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 8.5px;">
          <div>
            <div style="color: #38bdf8; font-weight: 700;">VOL 01. Enterprise Core</div>
            <div style="color: #94a3b8; font-size: 7.5px;">PT Jasa Marga & Adira Finance</div>
          </div>
          <div>
            <div style="color: #38bdf8; font-weight: 700;">VOL 02. Client Deployments</div>
            <div style="color: #94a3b8; font-size: 7.5px;">SignFlow PWA & Cloud VPS Migration</div>
          </div>
          <div>
            <div style="color: #38bdf8; font-weight: 700;">VOL 03. Academic & Lab Matrix</div>
            <div style="color: #94a3b8; font-size: 7.5px;">SIM SEMPRO NLP & Skills Verification</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>NANANG ADITYA SUTAHAR &bull; SOFTWARE ENGINEER DOSSIER</span>
        <span>PAGE 01 OF 05</span>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════
       PAGE 2: VOL 01 - ENTERPRISE CORE & TOLL ROAD SYSTEMS
       ══════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="sheet">
      <!-- Running Header -->
      <div class="running-header">
        <div class="running-brand">
          <img src="${faviconSvg}" alt="NA Logo" />
          <span class="running-brand-text">VOLUME 01 // ENTERPRISE TOLL ROAD CORE & CORE BANKING</span>
        </div>
        <span class="running-folio">PT JASA MARGA &bull; PT ADIRA FINANCE &bull; FOLIO #02</span>
      </div>

      <!-- Section Title -->
      <div style="margin-bottom: 8px;">
        <h2 class="font-title" style="font-size: 20px; color: #0f172a;">NATIONAL TOLL ROAD & CORE FINANCING INFRASTRUCTURE</h2>
        <p style="font-size: 9px; color: #64748b;">
          Mission-critical backend engineering, relational database schemas, AI vector integrations, and Kafka stream processing.
        </p>
      </div>

      <!-- Project 1: JM-RISE -->
      <div class="project-box">
        <div class="project-box-header">
          <span class="project-box-title">JM-RISE (Toll Road Construction Monitoring & AI Assistant) &mdash; PT Jasa Marga (Persero) Tbk</span>
          <span class="project-box-period">June 2025 &ndash; Present</span>
        </div>
        <p class="project-box-desc">
          JM-RISE is an enterprise platform monitoring physical and financial toll road construction milestones (Kurva S), legal chronologies, and technical project reports across Jasa Marga's toll road subsidiaries (APJT). Designed the relational database architecture and built high-performance REST APIs using Express.js, Prisma ORM, and PostgreSQL. Engineered an automated AI RAG ingestion engine that processes massive construction blueprints into external vector databases, real-time multi-turn chat sessions with Server-Sent Events (SSE), and MinIO S3 object storage. Resolved critical cross-application duplicate document overwriting issues through automated migration scripts, ensuring 100% data synchronization.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          <span class="chip chip-emerald">Express.js</span>
          <span class="chip chip-emerald">Node.js</span>
          <span class="chip chip-emerald">PostgreSQL</span>
          <span class="chip chip-emerald">Prisma ORM</span>
          <span class="chip">AI / RAG Integration</span>
          <span class="chip">Server-Sent Events</span>
          <span class="chip">MinIO S3</span>
          <span class="chip">Docker</span>
          <span class="chip">GitLab CI/CD</span>
          <span class="chip">Swagger</span>
        </div>
      </div>

      <!-- Project 2: AGGREGATOR OPERASI -->
      <div class="project-box">
        <div class="project-box-header">
          <span class="project-box-title">AGGREGATOR OPERASI (Centralized Master Data Management) &mdash; PT Jasa Marga (Persero) Tbk</span>
          <span class="project-box-period">November 2025 &ndash; Present</span>
        </div>
        <p class="project-box-desc">
          Designed and developed a centralized Master Data Management (MDM) service to unify, standardize, and distribute heterogeneous operational data (toll gates, clusters, routes, transaction reports) across Jasa Marga internal systems. Established a Single Source of Truth (SSOT) architecture, implemented high-performance RESTful APIs with Redis in-memory caching to accelerate frequent read queries, engineered flexible data mapping for legacy backward compatibility with zero downtime, and structured codebase using Repository and Service Layer patterns.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          <span class="chip chip-emerald">Express.js</span>
          <span class="chip chip-emerald">Redis (In-Memory Cache)</span>
          <span class="chip chip-emerald">PostgreSQL</span>
          <span class="chip">SSOT Architecture</span>
          <span class="chip">Repository Pattern</span>
          <span class="chip">Service Layer</span>
          <span class="chip">Docker</span>
          <span class="chip">Swagger</span>
        </div>
      </div>

      <!-- Project 3 & 4 Grid: Adira Finance & JM-ACT -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 8px;">
        <!-- Adira Document Digitization -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span style="font-size: 10px; font-weight: 700; color: #0f172a;">Document Digitization & Kafka</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #1e40af; font-weight: 600;">Adira Finance</span>
          </div>
          <p style="font-size: 8px; color: #475569; line-height: 1.4; margin-bottom: 5px;">
            Engineered automated loan paperwork generation using Spring Boot and Apache POI. Integrated Kafka consumers for asynchronous loan contract events, official tax e-stamp (e-meterai) and digital signature interfaces.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-blue">Spring Boot</span>
            <span class="chip chip-blue">Kafka</span>
            <span class="chip">Apache POI</span>
            <span class="chip">e-Meterai</span>
          </div>
        </div>

        <!-- Action Core Maintenance & Autofill -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span style="font-size: 10px; font-weight: 700; color: #0f172a;">Action Core & Customer Autofill</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #1e40af; font-weight: 600;">Adira Finance</span>
          </div>
          <p style="font-size: 8px; color: #475569; line-height: 1.4; margin-bottom: 5px;">
            Maintained Action core financing application for branches nationwide (99.9% uptime). Built customer autofill engine and Dukcapil/GR Dedup validation, cutting redundant branch queries.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-blue">Java 17</span>
            <span class="chip chip-blue">SQL Tuning</span>
            <span class="chip">Dukcapil API</span>
            <span class="chip">Docker</span>
          </div>
        </div>
      </div>

      <!-- Telemetry Live Verification -->
      <div class="terminal">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; border-bottom: 1px solid #1e293b; padding-bottom: 2px;">
          <span class="terminal-green">● telemetry://production-core &mdash; PT Jasa Marga & Adira</span>
          <span style="color: #64748b;">LATENCY: 1.2ms &bull; STATUS: VERIFIED</span>
        </div>
        <div>$ node server.js && redis-cli INFO stats</div>
        <div class="terminal-accent">> Express.js REST API Server listening on port 5000 [Prisma Transaction Manager: OK]</div>
        <div>> SSE (Server-Sent Events) live streaming chat: READY | Automated AI RAG ingestion pipeline: 41.8ms</div>
        <div class="terminal-green">> Redis SSOT cache: 94.6% hit ratio | 1,280 ops/sec | 0 cross-system discrepancies</div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>NANANG ADITYA SUTAHAR &bull; SOFTWARE ENGINEER DOSSIER</span>
        <span>PAGE 02 OF 05</span>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════
       PAGE 3: VOL 02 - FEATURED CLIENT & FREELANCE PLATFORMS
       ══════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="sheet">
      <!-- Running Header -->
      <div class="running-header">
        <div class="running-brand">
          <img src="${faviconSvg}" alt="NA Logo" />
          <span class="running-brand-text">VOLUME 02 // CLIENT SOLUTIONS & PRODUCTION DEPLOYMENTS</span>
        </div>
        <span class="running-folio">SIGNFLOW &bull; WORDPRESS CLOUD VPS MIGRATION &bull; FOLIO #03</span>
      </div>

      <!-- Title -->
      <div style="margin-bottom: 8px;">
        <h2 class="font-title" style="font-size: 20px; color: #0f172a;">PRODUCTION FREELANCE SYSTEMS & CLOUD INFRASTRUCTURE</h2>
        <p style="font-size: 9px; color: #64748b;">
          End-to-end client applications: Cryptographic digital signature platform and 26-domain zero-downtime Linux VPS optimization.
        </p>
      </div>

      <!-- Project 1: SIGNFLOW -->
      <div class="project-box" style="margin-bottom: 10px;">
        <div class="project-box-header">
          <span class="project-box-title">SIGNFLOW &mdash; Digital Signature & Document Verification Platform (Freelance)</span>
          <span class="project-box-period">October 2026</span>
        </div>
        <p class="project-box-desc">
          Developed a secure web-based digital signature and document validation platform to digitize enterprise document signing workflows. Engineered dynamic PDF manipulation and cryptographic hash verification to ensure document authenticity and tamper protection. Implemented sequential multi-level approval workflows, automated queue-driven email notifications, role-based access control (RBAC), and bulk user status management with Sonner toast notifications. Built as a responsive Progressive Web App (PWA) supporting offline access and mobile touch signature drawing.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
          <span class="chip chip-emerald">Laravel 12</span>
          <span class="chip chip-emerald">Inertia.js</span>
          <span class="chip chip-emerald">React (TypeScript)</span>
          <span class="chip">Tailwind CSS</span>
          <span class="chip">MinIO (S3)</span>
          <span class="chip">PWA</span>
          <span class="chip">PAdES / FPDI</span>
          <span class="chip">Mail Queue</span>
          <span class="chip">Sonner</span>
        </div>

        <!-- 3 Screenshots Grid for SignFlow -->
        <div style="display: grid; grid-template-columns: 1.2fr 1.2fr 0.8fr; gap: 8px;">
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 1: Documents Dashboard & Status Filters</div>
            <div class="screenshot-frame"><img src="${signflowDash}" alt="SignFlow Dashboard" /></div>
          </div>
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 2: Real-time Multi-level Approval Workflow</div>
            <div class="screenshot-frame"><img src="${signflowDetail}" alt="SignFlow Approval Detail" /></div>
          </div>
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 3: Mobile Touch PWA</div>
            <div class="screenshot-frame"><img src="${signflowMobile}" alt="SignFlow Mobile PWA" /></div>
          </div>
        </div>
      </div>

      <!-- Project 2: WORDPRESS CLOUD VPS MIGRATION -->
      <div class="project-box" style="margin-bottom: 0;">
        <div class="project-box-header">
          <span class="project-box-title">WORDPRESS MULTI-SITE CLOUD VPS MIGRATION & BOT HARDENING (Freelance)</span>
          <span class="project-box-period">October 2026</span>
        </div>
        <p class="project-box-desc">
          Planned and executed zero-downtime server migration for 26+ WordPress websites (including JatimDaily.com) from Hostinger Shared Hosting to a dedicated Linux Cloud VPS powered by CloudPanel (Nginx, PHP 8.3 FPM, MariaDB). Handled database export/import, rsync/SSH sync, custom DNS routing with local hosts bypass verification, and automated SSL/TLS provisioning. Mitigated CPU load spikes of 104+ caused by aggressive AI crawlers (Meta/Claude/Exa bots) via Nginx 403 blocking rules, PHP-FPM process pool tuning (pm.max_children), and Redis object caching.
        </p>

        <!-- Performance Benchmark Badges -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 8px;">
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 5px 8px; text-align: center;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 800; color: #047857;">104+ &rarr; &lt; 0.5</div>
            <div style="font-size: 7.5px; color: #065f46; font-weight: 600;">CPU Load Average Drop</div>
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 5px 8px; text-align: center;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 800; color: #1d4ed8;">+4.5 GB RAM</div>
            <div style="font-size: 7.5px; color: #1e40af; font-weight: 600;">Freed Available Memory</div>
          </div>
          <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 5px 8px; text-align: center;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 800; color: #7e22ce;">40s+ &rarr; 1-3s</div>
            <div style="font-size: 7.5px; color: #6b21a8; font-weight: 600;">Accelerated Page TTFB</div>
          </div>
        </div>

        <!-- 2 Screenshots Grid for Cloud Migration -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 8px;">
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 4: WP Migration Hub (CloudPanel Internal Engine)</div>
            <div class="screenshot-frame"><img src="${wpMigrationHub}" alt="WP Migration Hub" /></div>
          </div>
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 5: CloudPanel Sites Dashboard (26 Production Domains)</div>
            <div class="screenshot-frame"><img src="${cloudpanelDash}" alt="CloudPanel Sites" /></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>NANANG ADITYA SUTAHAR &bull; SOFTWARE ENGINEER DOSSIER</span>
        <span>PAGE 03 OF 05</span>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════
       PAGE 4: VOL 03 - ACADEMIC SYSTEMS & NLP RESEARCH
       ══════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="sheet">
      <!-- Running Header -->
      <div class="running-header">
        <div class="running-brand">
          <img src="${faviconSvg}" alt="NA Logo" />
          <span class="running-brand-text">VOLUME 03 // ACADEMIC SYSTEMS & RESEARCH CAPSTONE</span>
        </div>
        <span class="running-folio">SIM SEMPRO & TA &bull; NLP COSINE ENGINE &bull; FOLIO #04</span>
      </div>

      <!-- Title -->
      <div style="margin-bottom: 8px;">
        <h2 class="font-title" style="font-size: 20px; color: #0f172a;">SIM SEMPRO & TA (ACADEMIC PROPOSAL & THESIS MANAGEMENT)</h2>
        <p style="font-size: 9px; color: #64748b;">
          Modern Modular Monolith eliminating research duplication with automated NLP similarity scoring and real-time guidance audit trails.
        </p>
      </div>

      <!-- Project Specification -->
      <div class="project-box" style="margin-bottom: 10px;">
        <div class="project-box-header">
          <span class="project-box-title">Modular Monolith Architecture & NLP Duplication Prevention Engine</span>
          <span class="project-box-period">October 2026</span>
        </div>
        <p class="project-box-desc">
          SIM SEMPRO & TA is a web-based centralized academic management system designed to eliminate research duplication and streamline thesis submission workflows. Built using a modern Modular Monolith architecture integrating Laravel 11, Inertia.js, and React (TypeScript) with Tailwind CSS. Implemented an NLP-based text similarity engine using N-gram tokenization and Cosine Similarity to calculate title duplication against archived theses with an average computation latency of 41.8 ms. Developed a Topic-to-Lecturer matching mechanism that aligns student research keywords with lecturer expertise and guidance quotas. Built Role-Based Access Control (RBAC) across 4 actors (Student, Lecturer, Academic Admin, Head of Department) with strict server-side policy guards to prevent IDOR vulnerabilities. Features include structured 8-session guidance audit trails, Google Meet integration, private document storage, and executive monitoring dashboards. Fully validated with 78 automated Unit/Feature tests (100% pass), achieving a System Usability Scale (SUS) score of 87.08 (Grade A), and containerized using Docker Compose with Cloudflare Zero-Trust Tunnel for remote live access.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
          <span class="chip chip-emerald">Laravel 11</span>
          <span class="chip chip-emerald">Inertia.js</span>
          <span class="chip chip-emerald">React.js</span>
          <span class="chip chip-emerald">TypeScript</span>
          <span class="chip">NLP (N-gram & Cosine)</span>
          <span class="chip">PostgreSQL</span>
          <span class="chip">Docker</span>
          <span class="chip">Cloudflare Zero-Trust</span>
          <span class="chip">PHPUnit (78/78 Pass)</span>
          <span class="chip">SUS 87.08 (Grade A)</span>
        </div>

        <!-- 2 Screenshots Grid for SIM SEMPRO -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 1: Dashboard Kaprodi & Topic Distribution Analytics</div>
            <div class="screenshot-frame"><img src="${simSemproKaprodi}" alt="Dashboard Kaprodi" /></div>
          </div>
          <div>
            <div style="font-size: 7.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">Plate 2: Perjalanan Skripsi & 8-Session Guidance Audit Trail</div>
            <div class="screenshot-frame"><img src="${simSemproBimbingan}" alt="Perjalanan Skripsi" /></div>
          </div>
        </div>
      </div>

      <!-- Test Execution & Latency Telemetry -->
      <div class="terminal">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; border-bottom: 1px solid #1e293b; padding-bottom: 2px;">
          <span class="terminal-green">● php artisan test --filter=SimilarityEngineTest</span>
          <span style="color: #64748b;">TOTAL TESTS: 78 &bull; 100% PASSED</span>
        </div>
        <div>PASS Tests\\Feature\\ThesisCosineSimilarityTest (41.8 ms) &bull; Vector N-gram tokenization matched</div>
        <div>PASS Tests\\Unit\\TopicToLecturerMatchingTest (12.4 ms) &bull; Expertise keywords aligned with quota</div>
        <div class="terminal-green">> System Usability Scale (SUS) score: 87.08 (Grade A Excellent)</div>
        <div class="terminal-accent">> Containerized via Docker Compose & Cloudflare Zero-Trust Tunnel: REMOTE LIVE ACCESS READY</div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>NANANG ADITYA SUTAHAR &bull; SOFTWARE ENGINEER DOSSIER</span>
        <span>PAGE 04 OF 05</span>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════
       PAGE 5: TECHNICAL SKILLS LAB, EDUCATION & CREDENTIALS
       ══════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="sheet">
      <!-- Running Header -->
      <div class="running-header">
        <div class="running-brand">
          <img src="${faviconSvg}" alt="NA Logo" />
          <span class="running-brand-text">PRODUCTION SKILLS LAB, ACADEMIC DEGREES & CREDENTIALS</span>
        </div>
        <span class="running-folio">EDUCATION &bull; SKILLS MATRIX &bull; FOLIO #05</span>
      </div>

      <!-- Title -->
      <div style="margin-bottom: 8px;">
        <h2 class="font-title" style="font-size: 20px; color: #0f172a;">TECHNICAL SKILLS MATRIX & PRODUCTION TELEMETRY</h2>
        <p style="font-size: 9px; color: #64748b;">
          Comprehensive breakdown of programming languages, frameworks, storage, and DevOps tooling deployed in production.
        </p>
      </div>

      <!-- 6-Box Skills Matrix -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
        <!-- Backend -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #047857; margin-bottom: 4px; text-transform: uppercase;">BACKEND ARCHITECTURE</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-emerald">Express.js</span>
            <span class="chip chip-emerald">Node.js</span>
            <span class="chip chip-emerald">Laravel 11/12</span>
            <span class="chip chip-emerald">Spring Boot</span>
            <span class="chip">Prisma ORM</span>
            <span class="chip">Kafka</span>
            <span class="chip">Swagger</span>
            <span class="chip">REST APIs</span>
          </div>
        </div>

        <!-- Frontend -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #1e40af; margin-bottom: 4px; text-transform: uppercase;">FRONTEND & INTERFACES</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-blue">React.js</span>
            <span class="chip chip-blue">TypeScript</span>
            <span class="chip chip-blue">Inertia.js</span>
            <span class="chip chip-blue">Tailwind CSS</span>
            <span class="chip">PWA</span>
            <span class="chip">Sonner</span>
            <span class="chip">Ag-Grid</span>
            <span class="chip">HTML5/CSS3</span>
          </div>
        </div>

        <!-- DevOps & Cloud -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #0f172a; margin-bottom: 4px; text-transform: uppercase;">DEVOPS & SERVERS</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip">Docker Compose</span>
            <span class="chip">Linux (Ubuntu)</span>
            <span class="chip">Nginx Proxy</span>
            <span class="chip">CloudPanel</span>
            <span class="chip">GitLab CI/CD</span>
            <span class="chip">Jenkins</span>
            <span class="chip">Cloudflare Tunnel</span>
          </div>
        </div>

        <!-- Databases -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #0f172a; margin-bottom: 4px; text-transform: uppercase;">DATABASES & ENGINE</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-emerald">PostgreSQL</span>
            <span class="chip chip-emerald">MySQL</span>
            <span class="chip">MariaDB</span>
            <span class="chip">Relational ERD</span>
            <span class="chip">B-tree Indexing</span>
          </div>
        </div>

        <!-- Storage & Vault -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #0f172a; margin-bottom: 4px; text-transform: uppercase;">STORAGE & OBJECT VAULT</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip">MinIO (S3)</span>
            <span class="chip">AWS S3</span>
            <span class="chip">Presigned URLs</span>
            <span class="chip">PDF Generation</span>
          </div>
        </div>

        <!-- Cache & SSOT -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
          <div style="font-size: 9px; font-weight: 700; color: #0f172a; margin-bottom: 4px; text-transform: uppercase;">CACHE & MESSAGE BROKER</div>
          <div style="display: flex; flex-wrap: wrap; gap: 3px;">
            <span class="chip chip-emerald">Redis Caching</span>
            <span class="chip">SSOT Architecture</span>
            <span class="chip">Kafka Consumers</span>
            <span class="chip">Queue Workers</span>
          </div>
        </div>
      </div>

      <!-- Education & Academic Credentials -->
      <div style="margin-bottom: 12px;">
        <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 6px;">
          <h3 class="font-title" style="font-size: 15px; color: #0f172a;">EDUCATION & ACADEMIC BACKGROUND</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-size: 9.5px; font-weight: 700; color: #0f172a;">Universitas Esa Unggul</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #047857; font-weight: 600;">2024 &ndash; Present</span>
            </div>
            <div style="font-size: 8.5px; color: #475569;">
              Bachelor's Degree (S1) in Informatics Engineering &bull; <strong>GPA: 3.66 / 4.00</strong>
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-size: 9.5px; font-weight: 700; color: #0f172a;">Politeknik Elektronika Negeri Surabaya (PENS)</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #047857; font-weight: 600;">2020 &ndash; 2023</span>
            </div>
            <div style="font-size: 8.5px; color: #475569;">
              Associate's Degree (D3) in Informatics Engineering &bull; <strong>GPA: 3.69 / 4.00</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Organizations & Honors -->
      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 8px 12px; margin-bottom: 10px;">
        <div style="font-size: 8.5px; font-weight: 700; color: #065f46; margin-bottom: 2px;">ORGANIZATIONAL LEADERSHIP & AWARDS</div>
        <div style="font-size: 8px; color: #047857; display: flex; justify-content: space-between;">
          <span>&bull; <strong>Head of Home Affairs Department</strong>, HIMIT PENS (Himpunan Mahasiswa Teknik Informatika), 2022 &ndash; 2023</span>
          <span>&bull; <strong>1st Place Champion</strong>, PENSCOMP Futsal Championship, 2023</span>
        </div>
      </div>

      <!-- Call to Action Box -->
      <div style="background: #0f172a; border-radius: 8px; padding: 10px 14px; color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 10px; font-weight: 700; color: #ffffff;">AVAILABLE FOR SOFTWARE ENGINEER & BACKEND ROLES</div>
          <div style="font-size: 8px; color: #94a3b8;">Full-Time, Contract, or Technical Consultancy &bull; Surabaya / Jakarta / Remote</div>
        </div>
        <div style="text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 8px;">
          <div style="color: #34d399; font-weight: 700;">fe-portfolio-nanang.vercel.app</div>
          <div style="color: #cbd5e1;">nanangaditya2001@gmail.com &bull; +62 857-9066-3367</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>NANANG ADITYA SUTAHAR &bull; SOFTWARE ENGINEER DOSSIER</span>
        <span>PAGE 05 OF 05 &bull; END OF DOSSIER</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('src/docs/portfolio.html', html);
console.log('Successfully wrote src/docs/portfolio.html');

