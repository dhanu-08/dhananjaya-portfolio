import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState("");
  const heroRef = useRef(null);

  // Live IST Clock for Bengaluru
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for Fragment scroll-reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".fragment-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Copy email handler
  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = "dhananjaya.meher@ibsindia.org";
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const projectsData = [
    {
      id: "01",
      category: "FINANCE",
      filterCategory: "finance",
      title: "Financial Management & CAPM Analysis",
      description:
        "Comprehensive stock return and Capital Asset Pricing Model (CAPM) valuation project. Analyzed historical market returns, variance-covariance matrices, correlation, beta coefficients, and risk-return trade-offs to assess portfolio sensitivity.",
      metric: "Beta & Covariance Modeling · Portfolio Risk Optimization",
      tags: ["MS Excel", "CAPM Model", "Stock Returns", "Beta Valuation"],
    },
    {
      id: "02",
      category: "DATA",
      filterCategory: "data",
      title: "Data Science & Business Insights",
      description:
        "Excel-based exploratory data analysis focused on parsing multi-variable business data. Built analytical dashboards to extract customer distribution trends, profitability patterns, and strategic commercial insights.",
      metric: "Data Visualization · Trend Forecasting & Variance Analysis",
      tags: ["Excel Analytics", "Pivot Dashboards", "Statistical Analysis"],
    },
    {
      id: "03",
      category: "DATABASE",
      filterCategory: "data",
      title: "SQL Relational Database Optimization",
      description:
        "Designed structured relational schemas and executed complex SQL queries—including multi-table JOINs, subqueries, group aggregates, and indexing—to extract actionable transactional and operational business intelligence.",
      metric: "Relational Schemas · Multi-table Aggregations · Indexing",
      tags: ["SQL", "Relational Database", "Data Extraction", "Querying"],
    },
    {
      id: "04",
      category: "STRATEGY",
      filterCategory: "strategy",
      title: "Consumer Behavior & Market Strategy",
      description:
        "Academic research project investigating consumer decision journeys, competitive positioning, and market penetration models within evolving commercial service sectors.",
      metric: "Consumer Segmentation · Competitive Positioning Framework",
      tags: ["Market Research", "Consumer Behavior", "Business Strategy"],
    },
  ];

  const filteredProjects =
    activeProjectFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.filterCategory === activeProjectFilter);

  return (
    <div className="site-wrapper">
      {/* ================= FLOATING PILL NAVBAR ================= */}
      <header className="navbar-container">
        <nav className="navbar-pill">
          <a href="#home" className="nav-brand">
            <span className="brand-diamond"></span>
            <span>DM</span>
          </a>

          <div className="nav-center-menu">
            <a href="#about" className="nav-link">About</a>
            <a href="#journey" className="nav-link">Journey</a>
            <a href="#skills" className="nav-link">Capabilities</a>
            <a href="#projects" className="nav-link">Work</a>
            <a href="#certifications" className="nav-link">Credentials</a>
            <a href="#resume" className="nav-link">Resume</a>
          </div>

          <div className="nav-right-actions">
            <div className="nav-status-chip">
              <span className="pulse-dot"></span>
              <span>Available for BFSI Roles</span>
            </div>

            <a href="#contact" className="nav-cta-btn">
              <span>Let's Talk</span>
              <span>→</span>
            </a>

            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#journey" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Journey</a>
            <a href="#skills" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
            <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Work</a>
            <a href="#certifications" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Credentials</a>
            <a href="#resume" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resume</a>
            <a href="#contact" className="nav-cta-btn" onClick={() => setMobileMenuOpen(false)} style={{ justifyContent: "center", width: "100%" }}>
              <span>Let's Talk →</span>
            </a>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION (CLEAN FRAGMENT EDITORIAL + 3D) ================= */}
      <main id="home">
        <section className="hero-wrapper" ref={heroRef}>
          {/* Spline 3D Viewer matching Fragment Studio */}
          <div className="hero-3d-bg">
            <spline-viewer
              loading="eager"
              url="https://prod.spline.design/jm2f-1D-xUTZN6UB/scene.splinecode"
            ></spline-viewer>
          </div>

          <div className="hero-vignette"></div>
          <div className="hero-ambient-glow"></div>

          <div className="hero-content">
            <div className="meta-index-tag fragment-reveal">
              [ 01 / PORTFOLIO · DHANANJAYA MEHER ]
            </div>

            <h1 className="hero-headline fragment-reveal stagger-1">
              MBA in Finance. <br />
              <span>Rigorous analysis. Strategic execution.</span>
            </h1>

            <p className="hero-subtext fragment-reveal stagger-2">
              Pursuing MBA in Finance at IBS Business School Bengaluru. 
              Bridging corporate finance, valuation modeling, and BFSI operations 
              to drive institutional value.
            </p>

            <div className="hero-button-row fragment-reveal stagger-3">
              <a href="#projects" className="btn-fragment-primary">
                <span>Explore Selected Work</span>
                <span>→</span>
              </a>

              <a href="#resume" className="btn-fragment-secondary">
                <span>View Verified Resume</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= STATS / METRICS EDITORIAL STRIP ================= */}
        <section className="stats-section">
          <div className="stats-editorial-strip fragment-reveal">
            <div className="stat-col">
              <div className="stat-value">04+</div>
              <div className="stat-label">Core Analytical Projects</div>
            </div>
            <div className="stat-col">
              <div className="stat-value">04</div>
              <div className="stat-label">Industry Certifications</div>
            </div>
            <div className="stat-col">
              <div className="stat-value">83%</div>
              <div className="stat-label">Grade A Distinction</div>
            </div>
            <div className="stat-col">
              <div className="stat-value">100%</div>
              <div className="stat-label">Quantitative Rigor</div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION: EDITORIAL LAYOUT ================= */}
        <section id="about" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 01 / BACKGROUND & PHILOSOPHY ]</span>
            <h2 className="section-title">Rooted in science. Focused on finance.</h2>
            <p className="section-desc">
              How systematic analytical thinking translates into disciplined capital management and banking operations.
            </p>
          </div>

          <div className="about-editorial-grid fragment-reveal stagger-1">
            <div className="about-profile-card">
              <div className="profile-img-wrapper">
                <img
                  src="./profile.png"
                  alt="Dhananjaya Meher"
                  className="profile-img"
                />
                <div className="profile-status-badge">
                  <span className="pulse-dot"></span>
                  <span>Verified Profile</span>
                </div>
              </div>

              <div className="profile-info-footer">
                <h4>Dhananjaya Meher</h4>
                <p>MBA Finance · IBS Bengaluru</p>
                <div className="profile-location-chip">
                  <span>📍 Bengaluru, India</span>
                </div>
              </div>
            </div>

            <div className="about-narrative-col">
              <h3 className="about-headline-lead">
                From Scientific Method to Capital Markets
              </h3>
              <p className="about-body-p">
                My academic journey began with a rigorous B.Sc. in Chemistry (Honours) from Rajendra University, Balangir. Laboratory science trained me in disciplined observation, quantitative hypothesis testing, and error minimization.
              </p>
              <p className="about-body-p">
                Today, I channel that exact analytical discipline into my MBA in Finance at IBS Business School, Bengaluru. Rather than viewing finance as abstract equations, I approach valuation, stock returns, and credit risk as systematic puzzles that require structured quantitative models.
              </p>
              <p className="about-body-p">
                My goal is clear: to contribute meaningfully across the BFSI ecosystem, commercial banking, equity research, and corporate financial management.
              </p>

              <div className="about-pillars-stream">
                <div className="about-pillar-item">
                  <span className="pillar-index">01</span>
                  <div>
                    <h4>Valuation & Return Modeling</h4>
                    <p>CAPM calculations, beta analysis, covariance, and investment assessment for equity instruments.</p>
                  </div>
                </div>

                <div className="about-pillar-item">
                  <span className="pillar-index">02</span>
                  <div>
                    <h4>BFSI Ecosystem & Compliance</h4>
                    <p>Understanding regulatory oversight, KYC/AML compliance safeguards, retail and commercial banking operations.</p>
                  </div>
                </div>

                <div className="about-pillar-item">
                  <span className="pillar-index">03</span>
                  <div>
                    <h4>Excel & SQL Decision Tooling</h4>
                    <p>Constructing financial spreadsheets, pivot reporting, relational SQL database queries, and executive dashboards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY / EDUCATION: CLEAN TIMELINE STREAM ================= */}
        <section id="journey" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 02 / ACADEMIC PROGRESSION ]</span>
            <h2 className="section-title">Education & Milestones</h2>
            <p className="section-desc">
              The continuous pursuit of academic excellence that shaped my quantitative foundation.
            </p>
          </div>

          <div className="journey-stream fragment-reveal stagger-1">
            <div className="journey-stream-row">
              <div className="journey-year-tag">2026 – 2028</div>
              <div className="journey-content">
                <h3>MBA – Finance</h3>
                <h4>IBS Business School, Bengaluru</h4>
                <p>
                  Postgraduate program emphasizing corporate finance, investment analysis, BFSI services, capital markets, and data-driven financial decision-making.
                </p>
              </div>
              <div>
                <span className="journey-status-pill">● CURRENTLY PURSUING</span>
              </div>
            </div>

            <div className="journey-stream-row">
              <div className="journey-year-tag">UNDERGRADUATE</div>
              <div className="journey-content">
                <h3>B.Sc. Chemistry (Honours)</h3>
                <h4>Rajendra University, Balangir</h4>
                <p>
                  Undergraduate degree cultivating deep analytical reasoning, laboratory precision, scientific data analysis, and mathematical problem-solving.
                </p>
              </div>
              <div>
                <span className="journey-status-pill" style={{ color: "var(--text-platinum)", borderColor: "var(--border-hairline)", background: "rgba(255,255,255,0.04)" }}>COMPLETED</span>
              </div>
            </div>

            <div className="journey-stream-row">
              <div className="journey-year-tag">SENIOR SECONDARY</div>
              <div className="journey-content">
                <h3>Class XII (Senior Secondary)</h3>
                <h4>Central Board of Secondary Education (CBSE)</h4>
                <p>
                  Focused on physics, chemistry, mathematics, and analytical sciences establishing a solid academic baseline.
                </p>
              </div>
              <div>
                <span className="journey-status-pill" style={{ color: "var(--text-platinum)", borderColor: "var(--border-hairline)", background: "rgba(255,255,255,0.04)" }}>COMPLETED</span>
              </div>
            </div>

            <div className="journey-stream-row">
              <div className="journey-year-tag">SECONDARY</div>
              <div className="journey-content">
                <h3>Class X (Secondary Education)</h3>
                <h4>Indian Certificate of Secondary Education (ICSE)</h4>
                <p>
                  Comprehensive foundational curriculum emphasizing academic rigor, language proficiency, and quantitative reasoning.
                </p>
              </div>
              <div>
                <span className="journey-status-pill" style={{ color: "var(--text-platinum)", borderColor: "var(--border-hairline)", background: "rgba(255,255,255,0.04)" }}>COMPLETED</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SKILLS: FRAGMENT NUMBERED CAPABILITY ROWS ================= */}
        <section id="skills" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 03 / WHAT I DO ]</span>
            <h2 className="section-title">Core Capabilities & Technical Arsenal</h2>
            <p className="section-desc">
              Structured domains of expertise built through coursework, practical modeling, and industry certifications.
            </p>
          </div>

          <div className="skills-rows-list fragment-reveal stagger-1">
            <div className="skill-row-item">
              <span className="skill-row-num">01</span>
              <div className="skill-row-left">
                <h3>Financial Analysis</h3>
                <span className="skill-row-category">VALUATION & MARKETS</span>
              </div>
              <div className="skill-row-right">
                <p>
                  Execution of financial management techniques, Capital Asset Pricing Model (CAPM), beta regression, stock return covariance, and investment risk assessment.
                </p>
                <div className="skill-chips-row">
                  <span className="skill-chip">Financial Management</span>
                  <span className="skill-chip">CAPM</span>
                  <span className="skill-chip">Beta Analysis</span>
                  <span className="skill-chip">Stock Valuation</span>
                  <span className="skill-chip">Risk Assessment</span>
                </div>
              </div>
            </div>

            <div className="skill-row-item">
              <span className="skill-row-num">02</span>
              <div className="skill-row-left">
                <h3>Excel & Data Analytics</h3>
                <span className="skill-row-category">QUANTITATIVE DATA</span>
              </div>
              <div className="skill-row-right">
                <p>
                  End-to-end spreadsheet modeling, complex nested formulas, pivot tables, summary aggregations, and business intelligence dashboards.
                </p>
                <div className="skill-chips-row">
                  <span className="skill-chip">Advanced MS Excel</span>
                  <span className="skill-chip">Pivot Tables</span>
                  <span className="skill-chip">Dashboards</span>
                  <span className="skill-chip">Statistical Analysis</span>
                  <span className="skill-chip">SQL</span>
                </div>
              </div>
            </div>

            <div className="skill-row-item">
              <span className="skill-row-num">03</span>
              <div className="skill-row-left">
                <h3>Banking Knowledge</h3>
                <span className="skill-row-category">REGULATORY & OPERATIONS</span>
              </div>
              <div className="skill-row-right">
                <p>
                  Understanding core banking operations, customer due diligence, Anti-Money Laundering (AML) standards, KYC compliance, and credit service flows.
                </p>
                <div className="skill-chips-row">
                  <span className="skill-chip">KYC Procedures</span>
                  <span className="skill-chip">AML Compliance</span>
                  <span className="skill-chip">Core Banking</span>
                  <span className="skill-chip">Retail Operations</span>
                  <span className="skill-chip">Customer Due Diligence</span>
                </div>
              </div>
            </div>

            <div className="skill-row-item">
              <span className="skill-row-num">04</span>
              <div className="skill-row-left">
                <h3>Productivity Tools</h3>
                <span className="skill-row-category">BUSINESS SOFTWARE</span>
              </div>
              <div className="skill-row-right">
                <p>
                  Enterprise software operations for corporate communication, accounting bookkeeping, and executive stakeholder reporting.
                </p>
                <div className="skill-chips-row">
                  <span className="skill-chip">Tally ERP</span>
                  <span className="skill-chip">PowerPoint Presentation</span>
                  <span className="skill-chip">MS Word</span>
                  <span className="skill-chip">Executive Reporting</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS: EDITORIAL CASE STUDY CARDS (WHERE CARDS SHINE!) ================= */}
        <section id="projects" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 04 / RECENT WORK ]</span>
            <h2 className="section-title">Selected Analytical Case Studies</h2>
            <p className="section-desc">
              Practical academic projects delivering quantitative modeling, data queries, and strategic business evaluations.
            </p>
          </div>

          <div className="projects-filter-bar fragment-reveal">
            <button
              className={`filter-pill ${activeProjectFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("all")}
            >
              All Work
            </button>
            <button
              className={`filter-pill ${activeProjectFilter === "finance" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("finance")}
            >
              Finance & Valuation
            </button>
            <button
              className={`filter-pill ${activeProjectFilter === "data" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("data")}
            >
              Data & SQL
            </button>
            <button
              className={`filter-pill ${activeProjectFilter === "strategy" ? "active" : ""}`}
              onClick={() => setActiveProjectFilter("strategy")}
            >
              Strategy
            </button>
          </div>

          <div className="projects-editorial-grid fragment-reveal stagger-1">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-case-card">
                <div>
                  <div className="project-card-meta">
                    <span className="project-category-badge">{project.category}</span>
                    <span className="project-index-num">[{project.id}]</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-metrics-box">
                    <span>⚡ {project.metric}</span>
                  </div>
                </div>

                <div className="project-footer-row">
                  <div className="project-tags-mini">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag-item">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="project-arrow-link">↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATIONS & CREDENTIALS ================= */}
        <section id="certifications" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 05 / VERIFIED CREDENTIALS ]</span>
            <h2 className="section-title">Accreditations & Industry Certifications</h2>
            <p className="section-desc">
              Formal qualifications validated by recognized financial and regulatory bodies.
            </p>
          </div>

          <div className="certifications-cards-grid fragment-reveal stagger-1">
            <div className="cert-card">
              <div>
                <div className="cert-top-row">
                  <span className="cert-number">01</span>
                  <span className="cert-date-chip">DEC 2025</span>
                </div>
                <h3>BFSI Certification</h3>
                <div className="cert-issuer">Physics Wallah</div>
              </div>
              <div className="cert-badge-bottom">
                <span>✓ Banking & Financial Services</span>
              </div>
            </div>

            <div className="cert-card">
              <div>
                <div className="cert-top-row">
                  <span className="cert-number">02</span>
                  <span className="cert-date-chip">JUN 2026</span>
                </div>
                <h3>NISM – SEBI Investor Awareness</h3>
                <div className="cert-issuer">National Institute of Securities Markets (NISM)</div>
              </div>
              <div className="cert-badge-bottom">
                <span>✓ Securities & Investment Markets</span>
              </div>
            </div>

            <div className="cert-card">
              <div>
                <div className="cert-top-row">
                  <span className="cert-number">03</span>
                  <span className="cert-date-chip">COMPLETED</span>
                </div>
                <h3>Bloomberg Financial Fundamentals</h3>
                <div className="cert-issuer">Bloomberg Professional Education</div>
              </div>
              <div className="cert-badge-bottom">
                <span>✓ Market Concepts & Indicators</span>
              </div>
            </div>

            <div className="cert-card">
              <div>
                <div className="cert-top-row">
                  <span className="cert-number">04</span>
                  <span className="cert-date-chip">JAN 2026</span>
                </div>
                <h3>Data Entry Operator Certification</h3>
                <div className="cert-issuer">EduBridge / Nirmaan Organization</div>
              </div>
              <div className="cert-badge-bottom">
                <span>✓ Grade A · 83% Distinction</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RESUME DOCUMENTATION STRIP ================= */}
        <section id="resume" className="section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 06 / CURRICULUM VITAE ]</span>
            <h2 className="section-title">Verified Documentation</h2>
            <p className="section-desc">
              Download complete academic transcripts, credentials, and detailed career summaries.
            </p>
          </div>

          <div className="resume-strip-wrapper fragment-reveal stagger-1">
            <div className="resume-strip-info">
              <h3>Official Curriculum Vitae</h3>
              <p>
                Available in both ATS-compliant format for corporate recruiters and an Executive format featuring full verified credentials.
              </p>
            </div>

            <div className="resume-strip-actions">
              <a
                href="./resume-no-photo.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-fragment-primary"
              >
                <span>ATS Resume (PDF)</span>
                <span>↗</span>
              </a>

              <a
                href="./resume-with-photo.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-fragment-secondary"
              >
                <span>Executive Resume</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= CONTACT & EDITORIAL STATEMENT FOOTER ================= */}
        <section id="contact" className="contact-section-wrapper">
          <div className="fragment-reveal">
            <span className="section-meta-tag">[ 07 / COLLABORATION ]</span>
            <h2 className="contact-statement-headline">
              Ready to create financial impact. <br />
              <span>Let’s build something enduring.</span>
            </h2>
            <p className="contact-subtext">
              Open to discussions regarding MBA summer internships, banking roles, corporate finance analyst positions, and academic collaborations.
            </p>

            <div className="contact-actions-row">
              <a
                href="mailto:dhananjaya.meher@ibsindia.org"
                className="btn-contact-action primary"
              >
                <span>Send Email</span>
                <span>↗</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="btn-contact-action secondary"
              >
                <span>{copiedEmail ? "✓ Copied Address!" : "Copy Address"}</span>
              </button>

              <a
                href="https://www.linkedin.com/in/dhananjaya-meher"
                target="_blank"
                rel="noreferrer"
                className="btn-contact-action secondary"
              >
                <span>LinkedIn Profile ↗</span>
              </a>

              <div className="nav-status-chip" style={{ marginLeft: "auto" }}>
                <span className="pulse-dot"></span>
                <span>Bengaluru · {currentTime || "IST"}</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-brand-mark">
              <span className="brand-diamond"></span>
              <span>DHANANJAYA MEHER</span>
            </div>

            <div>
              © {new Date().getFullYear()} · MBA Finance · IBS Business School Bengaluru
            </div>

            <a href="#home" className="back-to-top-btn">
              <span>Back to top</span>
              <span>↑</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
