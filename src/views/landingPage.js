/**
 * AgriPulse HTML Dashboard Generator
 * 
 * Generates a self-contained, responsive, professional HTML landing page
 * for the root endpoint (GET /) with an agricultural technology theme.
 * Zero external font or image dependencies.
 */

const crops = require('../data/crops');

function renderLandingPage() {
  const cropCount = crops.length;
  const cropNames = crops.map((c) => c.name).join(', ');
  const environment = process.env.NODE_ENV || 'development';
  const port = process.env.PORT || 5000;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgriPulse – Smart Agriculture API</title>
  <style>
    :root {
      --primary-dark: #0f3822;
      --primary-base: #1b5e20;
      --primary-medium: #2e7d32;
      --primary-light: #4caf50;
      --accent-lime: #8bc34a;
      --accent-soft: #c8e6c9;
      --bg-page: #f4f8f4;
      --bg-surface: #ffffff;
      --text-main: #1c2826;
      --text-muted: #4a5d4e;
      --border-color: #d7e7d8;
      --code-bg: #1e281e;
      --shadow: 0 4px 14px rgba(15, 56, 34, 0.08);
      --radius: 12px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.6;
      padding: 0;
    }

    header {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-base) 100%);
      color: #ffffff;
      padding: 2.5rem 1.5rem;
      border-bottom: 4px solid var(--accent-lime);
    }

    .header-container {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .brand-icon {
      width: 48px;
      height: 48px;
      background-color: var(--accent-lime);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      fill: var(--primary-dark);
    }

    .brand-text h1 {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .brand-text p {
      font-size: 0.95rem;
      color: var(--accent-soft);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
    }

    .pulse-dot {
      width: 10px;
      height: 10px;
      background-color: #00e676;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(0, 230, 118, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 230, 118, 0);
      }
    }

    main {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }

    .intro-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
    }

    .intro-card h2 {
      color: var(--primary-dark);
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .intro-card p {
      color: var(--text-muted);
      font-size: 1.05rem;
      margin-bottom: 1.25rem;
    }

    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background-color: var(--primary-base);
      color: #ffffff;
    }

    .btn-primary:hover {
      background-color: var(--primary-dark);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background-color: var(--bg-surface);
      color: var(--primary-base);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
      background-color: var(--bg-page);
      border-color: var(--primary-light);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .metric-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.25rem;
      box-shadow: var(--shadow);
    }

    .metric-title {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .metric-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary-dark);
    }

    .metric-sub {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    .section-title {
      font-size: 1.35rem;
      color: var(--primary-dark);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .endpoints-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }

    .endpoint-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.25rem;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.6rem;
    }

    .method-tag {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }

    .method-get {
      background-color: #e8f5e9;
      color: var(--primary-base);
      border: 1px solid #c8e6c9;
    }

    .method-post {
      background-color: #e3f2fd;
      color: #1565c0;
      border: 1px solid #bbdefb;
    }

    .endpoint-path {
      font-family: Consolas, Monaco, "Courier New", monospace;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-dark);
    }

    .endpoint-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .endpoint-link {
      align-self: flex-start;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--primary-base);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
    }

    .endpoint-link:hover {
      text-decoration: underline;
    }

    .recommendation-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
    }

    .recommendation-panel h3 {
      color: var(--primary-dark);
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }

    .recommendation-panel p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }

    .rules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .rule-box {
      background-color: var(--bg-page);
      border-left: 4px solid var(--primary-base);
      padding: 0.75rem 1rem;
      border-radius: 0 8px 8px 0;
      font-size: 0.88rem;
    }

    .rule-box strong {
      display: block;
      color: var(--primary-dark);
      margin-bottom: 0.25rem;
    }

    .code-block {
      background: var(--code-bg);
      color: #e8f5e9;
      padding: 1.25rem;
      border-radius: 8px;
      font-family: Consolas, Monaco, "Courier New", monospace;
      font-size: 0.88rem;
      overflow-x: auto;
      line-height: 1.5;
    }

    footer {
      text-align: center;
      padding: 2rem 1.5rem;
      color: var(--text-muted);
      font-size: 0.88rem;
      border-top: 1px solid var(--border-color);
      background-color: var(--bg-surface);
    }
  </style>
</head>
<body>
  <header>
    <div class="header-container">
      <div class="brand">
        <div class="brand-icon">
          <!-- Leaf / Agriculture SVG Icon -->
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </div>
        <div class="brand-text">
          <h1>AgriPulse – Smart Agriculture API</h1>
          <p>Microservice for Crop Agronomics & Irrigation Advisories</p>
        </div>
      </div>
      <div class="status-badge">
        <span class="pulse-dot"></span>
        <span>API Status: Healthy (v1.0.0)</span>
      </div>
    </div>
  </header>

  <main>
    <section class="intro-card">
      <h2>Welcome to AgriPulse API</h2>
      <p>
        AgriPulse is a lightweight backend REST API developed for smart agriculture and automated irrigation scheduling.
        It provides access to predefined crop agronomic requirements and computes deterministic, rule-based irrigation
        recommendations from real-time soil moisture and ambient temperature measurements.
      </p>
      <div class="quick-actions">
        <a href="/api/crops" class="btn btn-primary">Browse Crop Catalog</a>
        <a href="/health" class="btn btn-secondary">Check Health Probe</a>
        <a href="/api/crops/1" class="btn btn-secondary">View Sample Crop (Rice)</a>
      </div>
    </section>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-title">Service Status</div>
        <div class="metric-value">Operational</div>
        <div class="metric-sub">Probe: HTTP 200 OK</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Registered Crops</div>
        <div class="metric-value">${cropCount} Crops</div>
        <div class="metric-sub">${cropNames}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Environment</div>
        <div class="metric-value">${environment}</div>
        <div class="metric-sub">Port: ${port} | Node.js ${process.version}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Architecture</div>
        <div class="metric-value">Decoupled REST</div>
        <div class="metric-sub">Express.js &bull; Stateless In-Memory</div>
      </div>
    </div>

    <h2 class="section-title">Available API Endpoints</h2>
    <div class="endpoints-grid">
      <div class="endpoint-card">
        <div>
          <div class="endpoint-header">
            <span class="method-tag method-get">GET</span>
            <span class="endpoint-path">/</span>
          </div>
          <p class="endpoint-desc">Visual HTML Dashboard and operational API overview for developers and evaluators.</p>
        </div>
        <a href="/" class="endpoint-link">Current Page &rarr;</a>
      </div>

      <div class="endpoint-card">
        <div>
          <div class="endpoint-header">
            <span class="method-tag method-get">GET</span>
            <span class="endpoint-path">/health</span>
          </div>
          <p class="endpoint-desc">Live JSON health status endpoint for Kubernetes liveness &amp; readiness probes.</p>
        </div>
        <a href="/health" class="endpoint-link">View JSON Response &rarr;</a>
      </div>

      <div class="endpoint-card">
        <div>
          <div class="endpoint-header">
            <span class="method-tag method-get">GET</span>
            <span class="endpoint-path">/api/crops</span>
          </div>
          <p class="endpoint-desc">Retrieves the complete agronomic catalog of crops, soils, and water requirements.</p>
        </div>
        <a href="/api/crops" class="endpoint-link">View Crops JSON &rarr;</a>
      </div>

      <div class="endpoint-card">
        <div>
          <div class="endpoint-header">
            <span class="method-tag method-get">GET</span>
            <span class="endpoint-path">/api/crops/:id</span>
          </div>
          <p class="endpoint-desc">Retrieves detailed agronomic profile for an individual crop by ID (1 to 5).</p>
        </div>
        <a href="/api/crops/1" class="endpoint-link">View Crop ID: 1 &rarr;</a>
      </div>

      <div class="endpoint-card">
        <div>
          <div class="endpoint-header">
            <span class="method-tag method-post">POST</span>
            <span class="endpoint-path">/api/recommendations</span>
          </div>
          <p class="endpoint-desc">Generates deterministic irrigation advisory based on cropId, soilMoisture, and temperature.</p>
        </div>
        <span class="endpoint-link" style="color: var(--text-muted);">Payload: JSON via POST</span>
      </div>
    </div>

    <section class="recommendation-panel">
      <h3>Irrigation Advisory Heuristic Logic</h3>
      <p>
        The recommendation engine evaluates telemetry inputs against crop-specific agronomic ranges:
      </p>

      <div class="rules-grid">
        <div class="rule-box" style="border-left-color: #d32f2f;">
          <strong>Critical Deficit (&lt; 30%)</strong>
          Immediate deep irrigation. Accelerated check (2-4 hrs) if temp &ge; 30&deg;C.
        </div>
        <div class="rule-box" style="border-left-color: #f57c00;">
          <strong>Irrigation Needed (&lt; Min)</strong>
          Moisture below threshold. Scheduled watering advised within 6-12 hrs.
        </div>
        <div class="rule-box" style="border-left-color: #388e3c;">
          <strong>Adequate Moisture (Optimal)</strong>
          Soil hydration optimal. Standard monitoring interval (12-24 hrs).
        </div>
        <div class="rule-box" style="border-left-color: #1976d2;">
          <strong>Surplus Moisture (&gt; Max)</strong>
          Excess moisture detected. Suspend irrigation and verify field drainage.
        </div>
      </div>

      <p><strong>Example cURL Request:</strong></p>
      <pre class="code-block">curl -X POST http://localhost:${port}/api/recommendations \\
  -H "Content-Type: application/json" \\
  -d '{"cropId": 1, "soilMoisture": 25, "temperature": 32}'</pre>
    </section>
  </main>

  <footer>
    <p>AgriPulse Smart Agriculture API &bull; Designed for College DevOps Coursework (Git, Jenkins, Ansible, Docker, Kubernetes)</p>
  </footer>
</body>
</html>`;
}

module.exports = {
  renderLandingPage
};
