/**
 * High-fidelity SVG Preview Generator for BRANIFY Free Templates
 * Generates visual mockups representing the real layouts, tables, and document structures.
 */

export const generateTemplatePreviewSvg = (slug: string, title: string, category: string, format: string): string => {
  if (slug === 'modern-saas-landing-page') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#09090b" />
            <stop offset="100%" stop-color="#030712" />
          </linearGradient>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#3b82f6" />
          </linearGradient>
        </defs>
        <rect width="1200" height="675" fill="url(#bg)" />
        
        <!-- Top Nav -->
        <rect x="60" y="30" width="1080" height="50" rx="12" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
        <rect x="85" y="44" width="22" height="22" rx="6" fill="url(#brandGrad)" />
        <text x="118" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="16">SaaSify</text>
        <text x="500" y="60" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13">Features</text>
        <text x="580" y="60" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13">Pricing</text>
        <text x="650" y="60" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="13">FAQ</text>
        <rect x="1000" y="39" width="120" height="32" rx="8" fill="url(#brandGrad)" />
        <text x="1060" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle">Start Free Trial</text>

        <!-- Hero Pill -->
        <rect x="440" y="115" width="320" height="28" rx="14" fill="#1e3a8a" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1" />
        <text x="600" y="134" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="700" font-size="11" text-anchor="middle">🚀 Next-Gen Workflow Automation</text>

        <!-- Hero Heading -->
        <text x="600" y="185" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="36" text-anchor="middle">Automate workflows. Scale revenue.</text>
        <text x="600" y="215" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">The modular HTML5 + Tailwind landing page starter for high-growth tech startups.</text>

        <!-- Hero CTA Buttons -->
        <rect x="460" y="245" width="140" height="40" rx="10" fill="url(#brandGrad)" />
        <text x="530" y="270" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="13" text-anchor="middle">Get Started Free</text>
        <rect x="615" y="245" width="130" height="40" rx="10" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
        <text x="680" y="270" fill="#d1d5db" font-family="system-ui, sans-serif" font-weight="600" font-size="13" text-anchor="middle">Watch Demo</text>

        <!-- Dashboard Browser Mockup -->
        <rect x="150" y="320" width="900" height="320" rx="16" fill="#18181b" stroke="#3f3f46" stroke-width="1.5" />
        <!-- Browser Top Bar -->
        <rect x="150" y="320" width="900" height="36" rx="16" fill="#27272a" />
        <circle cx="175" cy="338" r="5" fill="#ef4444" />
        <circle cx="192" cy="338" r="5" fill="#f59e0b" />
        <circle cx="209" cy="338" r="5" fill="#10b981" />
        <rect x="350" y="328" width="500" height="20" rx="6" fill="#09090b" />
        <text x="600" y="342" fill="#71717a" font-family="monospace" font-size="10" text-anchor="middle">https://app.saasify.io/dashboard</text>

        <!-- Dashboard Widgets -->
        <g transform="translate(180, 380)">
          <rect x="0" y="0" width="260" height="180" rx="12" fill="#09090b" stroke="#27272a" />
          <text x="20" y="30" fill="#71717a" font-family="monospace" font-size="11">MONTHLY RECURRING REVENUE</text>
          <text x="20" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="24">$124,500</text>
          <text x="20" y="90" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="12">+24.8% vs last month</text>
          <path d="M 20 150 Q 80 110, 140 130 T 240 100" fill="none" stroke="#3b82f6" stroke-width="3" />
        </g>

        <g transform="translate(470, 380)">
          <rect x="0" y="0" width="260" height="180" rx="12" fill="#09090b" stroke="#27272a" />
          <text x="20" y="30" fill="#71717a" font-family="monospace" font-size="11">ACTIVE CUSTOMERS</text>
          <text x="20" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="24">1,420</text>
          <text x="20" y="90" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="700" font-size="12">+18 new today</text>
          <path d="M 20 145 Q 80 130, 140 120 T 240 95" fill="none" stroke="#6366f1" stroke-width="3" />
        </g>

        <g transform="translate(760, 380)">
          <rect x="0" y="0" width="260" height="180" rx="12" fill="#09090b" stroke="#27272a" />
          <text x="20" y="30" fill="#71717a" font-family="monospace" font-size="11">SYSTEM EFFICIENCY</text>
          <text x="20" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="24">99.98%</text>
          <text x="20" y="90" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="12">Optimal Health</text>
          <rect x="20" y="125" width="220" height="10" rx="5" fill="#27272a" />
          <rect x="20" y="125" width="215" height="10" rx="5" fill="#10b981" />
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'creative-developer-portfolio') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <!-- Header -->
        <rect x="80" y="40" width="1040" height="60" rx="14" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
        <rect x="105" y="55" width="30" height="30" rx="8" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1" />
        <text x="120" y="75" fill="#38bdf8" font-family="monospace" font-weight="900" font-size="14" text-anchor="middle">&gt;_</text>
        <text x="145" y="76" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="16">alex.dev</text>
        <text x="500" y="75" fill="#a1a1aa" font-family="monospace" font-size="12">ABOUT</text>
        <text x="600" y="75" fill="#a1a1aa" font-family="monospace" font-size="12">SKILLS</text>
        <text x="700" y="75" fill="#a1a1aa" font-family="monospace" font-size="12">PROJECTS</text>
        <text x="800" y="75" fill="#a1a1aa" font-family="monospace" font-size="12">EXPERIENCE</text>
        <rect x="980" y="52" width="115" height="36" rx="8" fill="#38bdf8" />
        <text x="1037" y="75" fill="#000000" font-family="system-ui, sans-serif" font-weight="800" font-size="12" text-anchor="middle">HIRE ME</text>

        <!-- Main Left Column -->
        <g transform="translate(80, 140)">
          <rect x="0" y="0" width="320" height="26" rx="6" fill="#0369a1" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1" />
          <circle cx="15" cy="13" r="4" fill="#10b981" />
          <text x="28" y="17" fill="#38bdf8" font-family="monospace" font-weight="700" font-size="11">AVAILABLE FOR CLIENT PROJECTS</text>
          
          <text x="0" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="38">Building scalable,</text>
          <text x="0" y="125" fill="#38bdf8" font-family="system-ui, sans-serif" font-weight="900" font-size="38">high-perf web apps.</text>

          <text x="0" y="170" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="14">Senior Full-Stack Architect with 7+ years craft</text>
          <text x="0" y="195" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="14">React, TypeScript, Node.js and distributed cloud systems.</text>

          <!-- Skills Badges -->
          <g transform="translate(0, 230)">
            <rect x="0" y="0" width="85" height="28" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="42" y="18" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">React 18</text>
            <rect x="95" y="0" width="105" height="28" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="147" y="18" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">TypeScript</text>
            <rect x="210" y="0" width="95" height="28" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="257" y="18" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">PostgreSQL</text>
            <rect x="315" y="0" width="90" height="28" rx="6" fill="#18181b" stroke="#3f3f46" />
            <text x="360" y="18" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">Tailwind</text>
          </g>
        </g>

        <!-- Code Terminal Right Column -->
        <g transform="translate(680, 140)">
          <rect x="0" y="0" width="440" height="280" rx="16" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
          <rect x="0" y="0" width="440" height="34" rx="16" fill="#27272a" />
          <circle cx="20" cy="17" r="4.5" fill="#ef4444" />
          <circle cx="35" cy="17" r="4.5" fill="#f59e0b" />
          <circle cx="50" cy="17" r="4.5" fill="#10b981" />
          <text x="80" y="21" fill="#71717a" font-family="monospace" font-size="11">architect.ts</text>

          <text x="25" y="70" fill="#38bdf8" font-family="monospace" font-size="13">const developer = {</text>
          <text x="45" y="95" fill="#d1d5db" font-family="monospace" font-size="13">name: <tspan fill="#34d399">'Alex Rivera'</tspan>,</text>
          <text x="45" y="120" fill="#d1d5db" font-family="monospace" font-size="13">role: <tspan fill="#34d399">'Lead Full-Stack Architect'</tspan>,</text>
          <text x="45" y="145" fill="#d1d5db" font-family="monospace" font-size="13">stack: [<tspan fill="#fbbf24">'React'</tspan>, <tspan fill="#fbbf24">'TypeScript'</tspan>, <tspan fill="#fbbf24">'Supabase'</tspan>],</text>
          <text x="45" y="170" fill="#d1d5db" font-family="monospace" font-size="13">cleanCodeRate: <tspan fill="#c084fc">100</tspan>,</text>
          <text x="45" y="195" fill="#d1d5db" font-family="monospace" font-size="13">readyToShip: <tspan fill="#38bdf8">true</tspan></text>
          <text x="25" y="225" fill="#38bdf8" font-family="monospace" font-size="13">};</text>
        </g>

        <!-- Project Cards Row -->
        <g transform="translate(80, 460)">
          <rect x="0" y="0" width="500" height="175" rx="14" fill="#18181b" stroke="#27272a" />
          <text x="25" y="35" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="700">NEXT.JS • SUPABASE • TAILWIND</text>
          <text x="25" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="18">PulseMetrics — Real-Time SaaS Analytics</text>
          <text x="25" y="95" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">Event streaming telemetry engine processing 5M+ events/day.</text>
          <text x="25" y="140" fill="#38bdf8" font-family="monospace" font-size="12">Live Demo ↗   Source Code →</text>

          <rect x="540" y="0" width="500" height="175" rx="14" fill="#18181b" stroke="#27272a" />
          <text x="565" y="35" fill="#34d399" font-family="monospace" font-size="10" font-weight="700">NODE.JS • REDIS • WEBSOCKETS</text>
          <text x="565" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="18">HyperSync — Collaborative Whiteboard Canvas</text>
          <text x="565" y="95" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">Multi-user engine with sub-50ms synchronization latency.</text>
          <text x="565" y="140" fill="#34d399" font-family="monospace" font-size="12">Live Demo ↗   Source Code →</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'client-master-services-agreement' || slug === 'freelance-contract-template') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <!-- White/Ivory Document Page -->
        <rect x="250" y="30" width="700" height="615" rx="10" fill="#ffffff" stroke="#e4e4e7" stroke-width="2" />
        
        <!-- Document Header -->
        <rect x="290" y="60" width="160" height="6" fill="#18181b" />
        <text x="290" y="95" fill="#18181b" font-family="system-ui, sans-serif" font-weight="900" font-size="18">MASTER SERVICES AGREEMENT</text>
        <text x="290" y="115" fill="#71717a" font-family="system-ui, sans-serif" font-size="11">LEGAL CONTRACT &amp; STATEMENT OF WORK (SOW)</text>
        <line x1="290" y1="130" x2="910" y2="130" stroke="#e4e4e7" stroke-width="1.5" />

        <!-- Parties Box -->
        <rect x="290" y="145" width="620" height="65" rx="6" fill="#f4f4f5" />
        <text x="310" y="168" fill="#18181b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">PARTIES: <tspan font-weight="400" fill="#52525b">[SERVICE PROVIDER AGENCY]</tspan> and <tspan font-weight="400" fill="#52525b">[CLIENT NAME / ENTITY]</tspan></text>
        <text x="310" y="190" fill="#71717a" font-family="system-ui, sans-serif" font-size="10">EFFECTIVE DATE: March 15, 2026 • GOVERNING JURISDICTION: Mutual Commercial Law</text>

        <!-- Sections Mock -->
        <g transform="translate(290, 230)">
          <text x="0" y="15" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="12">1. SCOPE OF SERVICES &amp; DELIVERABLES</text>
          <rect x="0" y="25" width="600" height="4" rx="2" fill="#d4d4d8" />
          <rect x="0" y="35" width="540" height="4" rx="2" fill="#e4e4e7" />
          <rect x="0" y="45" width="580" height="4" rx="2" fill="#e4e4e7" />

          <text x="0" y="75" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="12">2. FEES, MILESTONES &amp; INVOICING (50% / 25% / 25%)</text>
          <rect x="0" y="85" width="590" height="4" rx="2" fill="#d4d4d8" />
          <rect x="0" y="95" width="510" height="4" rx="2" fill="#e4e4e7" />

          <text x="0" y="125" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="12">3. INTELLECTUAL PROPERTY &amp; SOURCE CODE ASSIGNMENT</text>
          <rect x="0" y="135" width="610" height="4" rx="2" fill="#d4d4d8" />
          <rect x="0" y="145" width="560" height="4" rx="2" fill="#e4e4e7" />

          <text x="0" y="175" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="12">4. CONFIDENTIALITY, NON-DISCLOSURE &amp; REVISION POLICY</text>
          <rect x="0" y="185" width="570" height="4" rx="2" fill="#d4d4d8" />
          <rect x="0" y="195" width="530" height="4" rx="2" fill="#e4e4e7" />

          <text x="0" y="225" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="12">5. SIGNATURES &amp; BINDING EXECUTION</text>
          <line x1="0" y1="270" x2="260" y2="270" stroke="#71717a" stroke-width="1.5" />
          <text x="0" y="290" fill="#71717a" font-family="system-ui, sans-serif" font-size="10">SERVICE PROVIDER SIGNATURE</text>

          <line x1="330" y1="270" x2="590" y2="270" stroke="#71717a" stroke-width="1.5" />
          <text x="330" y="290" fill="#71717a" font-family="system-ui, sans-serif" font-size="10">CLIENT AUTHORIZED SIGNATURE</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'client-discovery-project-brief') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <rect x="250" y="30" width="700" height="615" rx="10" fill="#ffffff" stroke="#e4e4e7" stroke-width="2" />
        
        <!-- Header -->
        <text x="290" y="80" fill="#18181b" font-family="system-ui, sans-serif" font-weight="900" font-size="18">CLIENT DISCOVERY &amp; PROJECT BRIEF</text>
        <text x="290" y="100" fill="#f97316" font-family="system-ui, sans-serif" font-weight="700" font-size="11">20-QUESTION STRATEGIC ONBOARDING QUESTIONNAIRE</text>
        <line x1="290" y1="115" x2="910" y2="115" stroke="#e4e4e7" stroke-width="1.5" />

        <g transform="translate(290, 135)">
          <!-- Section 1 -->
          <rect x="0" y="0" width="620" height="24" rx="4" fill="#fff7ed" />
          <text x="12" y="16" fill="#c2410c" font-family="system-ui, sans-serif" font-weight="800" font-size="11">SECTION 1: BUSINESS MODEL, COMPETITORS &amp; MISSION</text>
          <text x="12" y="45" fill="#18181b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">1.1 What is your primary value proposition and target audience?</text>
          <rect x="12" y="55" width="596" height="30" rx="4" fill="#f4f4f5" stroke="#e4e4e7" />

          <!-- Section 2 -->
          <rect x="0" y="105" width="620" height="24" rx="4" fill="#fff7ed" />
          <text x="12" y="121" fill="#c2410c" font-family="system-ui, sans-serif" font-weight="800" font-size="11">SECTION 2: CORE GOALS, KPIS &amp; SUCCESS METRICS</text>
          <text x="12" y="150" fill="#18181b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">2.1 What are your top 3 measurable business goals post-launch?</text>
          <rect x="12" y="160" width="596" height="30" rx="4" fill="#f4f4f5" stroke="#e4e4e7" />

          <!-- Section 3 -->
          <rect x="0" y="210" width="620" height="24" rx="4" fill="#fff7ed" />
          <text x="12" y="226" fill="#c2410c" font-family="system-ui, sans-serif" font-weight="800" font-size="11">SECTION 3: SCOPE, APIS, CMS &amp; TECH REQUIREMENTS</text>
          <text x="12" y="255" fill="#18181b" font-family="system-ui, sans-serif" font-weight="700" font-size="11">3.1 Select required integrations:</text>
          
          <rect x="12" y="270" width="12" height="12" rx="2" fill="#ea580c" />
          <text x="32" y="280" fill="#18181b" font-family="system-ui, sans-serif" font-size="10">Stripe Billing</text>
          
          <rect x="130" y="270" width="12" height="12" rx="2" fill="#ea580c" />
          <text x="150" y="280" fill="#18181b" font-family="system-ui, sans-serif" font-size="10">HubSpot CRM</text>
          
          <rect x="250" y="270" width="12" height="12" rx="2" fill="#ea580c" />
          <text x="270" y="280" fill="#18181b" font-family="system-ui, sans-serif" font-size="10">Google Analytics 4</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'ats-optimized-tech-resume' || slug === 'ats-tech-resume') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <rect x="280" y="30" width="640" height="615" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="2" />
        
        <g transform="translate(320, 60)">
          <!-- Name & Contact -->
          <text x="0" y="20" fill="#09090b" font-family="system-ui, sans-serif" font-weight="900" font-size="22">[YOUR FULL NAME]</text>
          <text x="0" y="40" fill="#52525b" font-family="system-ui, sans-serif" font-size="10">San Francisco, CA • (555) 019-2834 • developer@email.com • linkedin.com/in/profile</text>
          <line x1="0" y1="52" x2="560" y2="52" stroke="#18181b" stroke-width="1.5" />

          <!-- Summary -->
          <text x="0" y="72" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="11">PROFESSIONAL SUMMARY</text>
          <rect x="0" y="80" width="560" height="3" rx="1.5" fill="#e4e4e7" />
          <rect x="0" y="88" width="520" height="3" rx="1.5" fill="#e4e4e7" />

          <!-- Technical Skills -->
          <text x="0" y="115" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="11">TECHNICAL SKILLS</text>
          <text x="0" y="132" fill="#3f3f46" font-family="system-ui, sans-serif" font-size="9.5">• Languages: TypeScript, JavaScript (ES6+), Python, Go, SQL, HTML5, CSS3</text>
          <text x="0" y="147" fill="#3f3f46" font-family="system-ui, sans-serif" font-size="9.5">• Frameworks: React, Next.js, Node.js, Express, Tailwind CSS, Redux, PostgreSQL</text>

          <!-- Experience -->
          <text x="0" y="180" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="11">PROFESSIONAL WORK EXPERIENCE</text>
          <text x="0" y="198" fill="#09090b" font-family="system-ui, sans-serif" font-weight="700" font-size="10">SENIOR SOFTWARE ENGINEER | CloudScale Tech — 2023–Present</text>
          <text x="12" y="215" fill="#52525b" font-family="system-ui, sans-serif" font-size="9.5">• Architected Next.js microservices reducing API latency by 81% (450ms to 85ms).</text>
          <text x="12" y="230" fill="#52525b" font-family="system-ui, sans-serif" font-size="9.5">• Automated CI/CD pipelines via GitHub Actions cutting deployment cycle to 12 mins.</text>

          <text x="0" y="260" fill="#09090b" font-family="system-ui, sans-serif" font-weight="700" font-size="10">FULL-STACK DEVELOPER | Nexus Fintech — 2021–2023</text>
          <text x="12" y="277" fill="#52525b" font-family="system-ui, sans-serif" font-size="9.5">• Built Stripe checkout microservices processing $12M+ annual transaction volume.</text>
          <text x="12" y="292" fill="#52525b" font-family="system-ui, sans-serif" font-size="9.5">• Improved test coverage from 42% to 88% using Jest and Supertest.</text>

          <!-- Education -->
          <text x="0" y="325" fill="#18181b" font-family="system-ui, sans-serif" font-weight="800" font-size="11">EDUCATION &amp; CERTIFICATIONS</text>
          <text x="0" y="342" fill="#3f3f46" font-family="system-ui, sans-serif" font-size="9.5">B.S. in Computer Science • AWS Certified Solutions Architect (Associate)</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'seed-startup-pitch-deck' || slug === 'seed-pitch-deck') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <!-- 4 Pitch Slide Cards Grid -->
        <g transform="translate(100, 50)">
          <!-- Slide 1 -->
          <rect x="0" y="0" width="480" height="260" rx="14" fill="#18181b" stroke="#3b82f6" stroke-width="1.5" />
          <rect x="20" y="20" width="80" height="20" rx="4" fill="#1e3a8a" />
          <text x="60" y="34" fill="#60a5fa" font-family="monospace" font-weight="700" font-size="10" text-anchor="middle">SLIDE 01</text>
          <text x="20" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="20">PROBLEM &amp; MARKET PAIN</text>
          <text x="20" y="100" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• $45B wasted annually on manual workflow data entry.</text>
          <text x="20" y="125" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• Fragmentation across 6+ disconnected SaaS tools.</text>
          <rect x="20" y="160" width="440" height="70" rx="8" fill="#09090b" stroke="#27272a" />
          <text x="40" y="200" fill="#ef4444" font-family="system-ui, sans-serif" font-weight="800" font-size="16">85% of agencies report critical client churn</text>

          <!-- Slide 2 -->
          <rect x="520" y="0" width="480" height="260" rx="14" fill="#18181b" stroke="#10b981" stroke-width="1.5" />
          <rect x="540" y="20" width="80" height="20" rx="4" fill="#064e3b" />
          <text x="580" y="34" fill="#34d399" font-family="monospace" font-weight="700" font-size="10" text-anchor="middle">SLIDE 03</text>
          <text x="540" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="20">THE SOLUTION &amp; VALUE PROP</text>
          <text x="540" y="100" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• Unified automated orchestration engine.</text>
          <text x="540" y="125" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• Zero-latency webhooks with SOC2 compliance.</text>
          <rect x="540" y="160" width="440" height="70" rx="8" fill="#09090b" stroke="#27272a" />
          <text x="560" y="200" fill="#10b981" font-family="system-ui, sans-serif" font-weight="800" font-size="16">Save 15+ hrs/week per team member</text>

          <!-- Slide 3 -->
          <rect x="0" y="290" width="480" height="260" rx="14" fill="#18181b" stroke="#f59e0b" stroke-width="1.5" />
          <rect x="20" y="310" width="80" height="20" rx="4" fill="#78350f" />
          <text x="60" y="324" fill="#fcd34d" font-family="monospace" font-weight="700" font-size="10" text-anchor="middle">SLIDE 07</text>
          <text x="20" y="360" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="20">TRACTION &amp; REVENUE MOMENTUM</text>
          <text x="20" y="390" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• $124k MRR with 20% MoM compounded growth.</text>
          <rect x="20" y="420" width="440" height="100" rx="8" fill="#09090b" stroke="#27272a" />
          <text x="40" y="465" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="24">$1.48M ARR</text>
          <text x="40" y="490" fill="#10b981" font-family="system-ui, sans-serif" font-size="12">140% Net Revenue Retention (NRR)</text>

          <!-- Slide 4 -->
          <rect x="520" y="290" width="480" height="260" rx="14" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5" />
          <rect x="540" y="310" width="80" height="20" rx="4" fill="#4c1d95" />
          <text x="580" y="324" fill="#c4b5fd" font-family="monospace" font-weight="700" font-size="10" text-anchor="middle">SLIDE 13</text>
          <text x="540" y="360" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="20">THE ASK &amp; USE OF FUNDS</text>
          <text x="540" y="390" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">• Raising $2.5M Seed Round (18-24 Mo. Runway).</text>
          <rect x="540" y="420" width="440" height="100" rx="8" fill="#09090b" stroke="#27272a" />
          <text x="560" y="455" fill="#a78bfa" font-family="system-ui, sans-serif" font-weight="700" font-size="13">60% Engineering • 25% GTM &amp; Sales • 15% Ops</text>
          <text x="560" y="485" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12">Target: Scale from $124k to $500k MRR</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'startup-runway-cashflow-model' || slug === 'financial-model-spreadsheet') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <!-- Spreadsheet Container -->
        <rect x="80" y="40" width="1040" height="595" rx="14" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
        
        <!-- Spreadsheet Sheet Tab Bar -->
        <rect x="80" y="40" width="1040" height="40" rx="14" fill="#27272a" />
        <rect x="95" y="48" width="220" height="32" rx="6" fill="#18181b" />
        <text x="110" y="69" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="12">📊 12-Month Runway &amp; Burn Model</text>

        <!-- Column Headers -->
        <g transform="translate(80, 80)">
          <rect x="0" y="0" width="1040" height="32" fill="#09090b" />
          <text x="25" y="21" fill="#71717a" font-family="monospace" font-size="11">MONTH</text>
          <text x="150" y="21" fill="#71717a" font-family="monospace" font-size="11">STARTING CASH</text>
          <text x="320" y="21" fill="#71717a" font-family="monospace" font-size="11">TOTAL REVENUE</text>
          <text x="490" y="21" fill="#71717a" font-family="monospace" font-size="11">TOTAL EXPENSES</text>
          <text x="670" y="21" fill="#71717a" font-family="monospace" font-size="11">NET CASH FLOW</text>
          <text x="850" y="21" fill="#71717a" font-family="monospace" font-size="11">ENDING CASH</text>
          <line x1="0" y1="32" x2="1040" y2="32" stroke="#27272a" stroke-width="1" />
        </g>

        <!-- Spreadsheet Data Rows -->
        <g transform="translate(80, 112)">
          <!-- Row 1 -->
          <rect x="0" y="0" width="1040" height="38" fill="#18181b" />
          <text x="25" y="24" fill="#ffffff" font-family="monospace" font-size="12">Month 1</text>
          <text x="150" y="24" fill="#d1d5db" font-family="monospace" font-size="12">$250,000</text>
          <text x="320" y="24" fill="#34d399" font-family="monospace" font-size="12">$7,500</text>
          <text x="490" y="24" fill="#f87171" font-family="monospace" font-size="12">$21,000</text>
          <text x="670" y="24" fill="#f87171" font-family="monospace" font-size="12">-$13,500</text>
          <text x="850" y="24" fill="#60a5fa" font-family="monospace" font-weight="700" font-size="12">$236,500</text>
          <line x1="0" y1="38" x2="1040" y2="38" stroke="#27272a" />

          <!-- Row 2 -->
          <rect x="0" y="38" width="1040" height="38" fill="#121215" />
          <text x="25" y="62" fill="#ffffff" font-family="monospace" font-size="12">Month 2</text>
          <text x="150" y="62" fill="#d1d5db" font-family="monospace" font-size="12">$236,500</text>
          <text x="320" y="62" fill="#34d399" font-family="monospace" font-size="12">$9,500</text>
          <text x="490" y="62" fill="#f87171" font-family="monospace" font-size="12">$21,100</text>
          <text x="670" y="62" fill="#f87171" font-family="monospace" font-size="12">-$11,600</text>
          <text x="850" y="62" fill="#60a5fa" font-family="monospace" font-weight="700" font-size="12">$224,900</text>
          <line x1="0" y1="76" x2="1040" y2="76" stroke="#27272a" />

          <!-- Row 3 -->
          <rect x="0" y="76" width="1040" height="38" fill="#18181b" />
          <text x="25" y="100" fill="#ffffff" font-family="monospace" font-size="12">Month 3</text>
          <text x="150" y="100" fill="#d1d5db" font-family="monospace" font-size="12">$224,900</text>
          <text x="320" y="100" fill="#34d399" font-family="monospace" font-size="12">$10,500</text>
          <text x="490" y="100" fill="#f87171" font-family="monospace" font-size="12">$22,200</text>
          <text x="670" y="100" fill="#f87171" font-family="monospace" font-size="12">-$11,700</text>
          <text x="850" y="100" fill="#60a5fa" font-family="monospace" font-weight="700" font-size="12">$213,200</text>
          <line x1="0" y1="114" x2="1040" y2="114" stroke="#27272a" />

          <!-- Row 9 (Breakeven) -->
          <rect x="0" y="114" width="1040" height="38" fill="#064e3b" fill-opacity="0.2" />
          <text x="25" y="138" fill="#34d399" font-family="monospace" font-weight="700" font-size="12">Month 9 ★</text>
          <text x="150" y="138" fill="#d1d5db" font-family="monospace" font-size="12">$172,700</text>
          <text x="320" y="138" fill="#34d399" font-family="monospace" font-weight="700" font-size="12">$41,500</text>
          <text x="490" y="138" fill="#f87171" font-family="monospace" font-size="12">$37,150</text>
          <text x="670" y="138" fill="#34d399" font-family="monospace" font-weight="700" font-size="12">+$4,350 (Profitable)</text>
          <text x="850" y="138" fill="#34d399" font-family="monospace" font-weight="700" font-size="12">$177,050</text>
          <line x1="0" y1="152" x2="1040" y2="152" stroke="#27272a" />

          <!-- Row 12 -->
          <rect x="0" y="152" width="1040" height="38" fill="#18181b" />
          <text x="25" y="176" fill="#ffffff" font-family="monospace" font-size="12">Month 12</text>
          <text x="150" y="176" fill="#d1d5db" font-family="monospace" font-size="12">$197,050</text>
          <text x="320" y="176" fill="#34d399" font-family="monospace" font-size="12">$72,000</text>
          <text x="490" y="176" fill="#f87171" font-family="monospace" font-size="12">$49,800</text>
          <text x="670" y="176" fill="#34d399" font-family="monospace" font-size="12">+$22,200</text>
          <text x="850" y="176" fill="#34d399" font-family="monospace" font-weight="700" font-size="12">$219,250</text>
        </g>
      </svg>
    `)}`;
  }

  if (slug === 'social-media-content-calendar') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
        <rect width="1200" height="675" fill="#09090b" />
        
        <rect x="80" y="40" width="1040" height="595" rx="14" fill="#18181b" stroke="#27272a" stroke-width="1.5" />
        
        <!-- Header -->
        <rect x="80" y="40" width="1040" height="40" rx="14" fill="#27272a" />
        <text x="110" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="12">📅 Multi-Platform Content Publishing Matrix</text>

        <!-- Column Headers -->
        <g transform="translate(80, 80)">
          <rect x="0" y="0" width="1040" height="32" fill="#09090b" />
          <text x="25" y="21" fill="#71717a" font-family="monospace" font-size="11">DATE / DAY</text>
          <text x="150" y="21" fill="#71717a" font-family="monospace" font-size="11">PLATFORM</text>
          <text x="300" y="21" fill="#71717a" font-family="monospace" font-size="11">CONTENT PILLAR</text>
          <text x="500" y="21" fill="#71717a" font-family="monospace" font-size="11">HOOK / HEADLINE</text>
          <text x="880" y="21" fill="#71717a" font-family="monospace" font-size="11">STATUS</text>
          <line x1="0" y1="32" x2="1040" y2="32" stroke="#27272a" stroke-width="1" />
        </g>

        <!-- Calendar Rows -->
        <g transform="translate(80, 112)">
          <!-- Row 1: LinkedIn -->
          <rect x="0" y="0" width="1040" height="45" fill="#18181b" />
          <text x="25" y="27" fill="#ffffff" font-family="monospace" font-size="11">2026-03-02 (Mon)</text>
          <rect x="150" y="14" width="80" height="20" rx="4" fill="#0a66c2" />
          <text x="190" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">LinkedIn</text>
          <text x="300" y="27" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="11">Thought Leadership</text>
          <text x="500" y="27" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11">"Why engineering teams over-engineer early..."</text>
          <rect x="880" y="14" width="75" height="20" rx="4" fill="#064e3b" />
          <text x="917" y="28" fill="#34d399" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">Scheduled</text>
          <line x1="0" y1="45" x2="1040" y2="45" stroke="#27272a" />

          <!-- Row 2: Twitter / X -->
          <rect x="0" y="45" width="1040" height="45" fill="#121215" />
          <text x="25" y="72" fill="#ffffff" font-family="monospace" font-size="11">2026-03-03 (Tue)</text>
          <rect x="150" y="59" width="80" height="20" rx="4" fill="#000000" stroke="#3f3f46" />
          <text x="190" y="73" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">Twitter / X</text>
          <text x="300" y="72" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="11">UI/UX Design Tips</text>
          <text x="500" y="72" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11">"4 micro-interactions that make a SaaS feel 10x faster"</text>
          <rect x="880" y="59" width="75" height="20" rx="4" fill="#064e3b" />
          <text x="917" y="73" fill="#34d399" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">Scheduled</text>
          <line x1="0" y1="90" x2="1040" y2="90" stroke="#27272a" />

          <!-- Row 3: Instagram -->
          <rect x="0" y="90" width="1040" height="45" fill="#18181b" />
          <text x="25" y="117" fill="#ffffff" font-family="monospace" font-size="11">2026-03-04 (Wed)</text>
          <rect x="150" y="104" width="80" height="20" rx="4" fill="#e1306c" />
          <text x="190" y="118" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">Instagram</text>
          <text x="300" y="117" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="11">Agency Showcase</text>
          <text x="500" y="117" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11">"Transforming legacy enterprise brand in 14 days"</text>
          <rect x="880" y="104" width="75" height="20" rx="4" fill="#064e3b" />
          <text x="917" y="118" fill="#34d399" font-family="system-ui, sans-serif" font-weight="700" font-size="10" text-anchor="middle">Approved</text>
        </g>
      </svg>
    `)}`;
  }

  // Generic Elegant Visual Card for other templates
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#18181b" />
          <stop offset="100%" stop-color="#09090b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)" />
      
      <rect x="100" y="60" width="1000" height="555" rx="20" fill="#121215" stroke="#27272a" stroke-width="2" />
      
      <g transform="translate(160, 140)">
        <rect x="0" y="0" width="160" height="30" rx="15" fill="#f27d26" fill-opacity="0.15" stroke="#f27d26" stroke-width="1" />
        <text x="80" y="20" fill="#f27d26" font-family="monospace" font-weight="700" font-size="11" text-anchor="middle">${category.toUpperCase()}</text>
        
        <text x="0" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="36">${title}</text>
        
        <text x="0" y="130" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="16">100% Free Professional Asset • Format: ${format}</text>
        
        <rect x="0" y="180" width="880" height="1" fill="#27272a" />
        
        <text x="0" y="230" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="14">✓ High quality, thoroughly tested template structure</text>
        <text x="0" y="265" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="14">✓ Clean, well-commented and immediately editable</text>
        <text x="0" y="300" fill="#d1d5db" font-family="system-ui, sans-serif" font-size="14">✓ Zero paywall, zero subscription fees — 100% Free</text>
      </g>
    </svg>
  `)}`;
};
