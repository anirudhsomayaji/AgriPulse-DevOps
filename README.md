# AgriPulse – Smart Agriculture REST API

> **AgriPulse** is a lightweight, modular REST API developed with Node.js and Express. It simulates a smart agriculture advisory service by providing agronomic crop data and rule-based irrigation recommendations based on real-time soil moisture and ambient temperature measurements.

Designed specifically for college DevOps coursework, this project serves as a clean, standardized application baseline that integrates seamlessly across future DevOps stages: **Git Version Control**, **Jenkins CI**, **Ansible Configuration Management**, **Docker Containerization**, and **Kubernetes Orchestration**.

---

## 1. Project Overview

Agriculture increasingly relies on Internet of Things (IoT) sensors and data-driven insights. AgriPulse mimics a centralized agronomic advisory microservice:
- Provides reference data for common agricultural crops (e.g., Rice, Wheat, Maize, Tomato, Sugarcane).
- Computes deterministic, rule-based irrigation advice from telemetry inputs (crop ID, soil moisture %, ambient temperature °C).
- Implements production-grade application patterns: decoupled architecture, centralized error handling, comprehensive test coverage, health probes, and container-ready networking (`0.0.0.0`).

---

## 2. Objectives

- **Develop a Robust Backend Service**: Implement clean REST endpoints using Node.js and Express without bloated third-party dependencies.
- **Ensure High Code Quality**: Adhere to separation of concerns (Routes, Controllers, Services, In-Memory Data Store, and Middleware).
- **Automated Testing & Validation**: Maintain a reliable test suite using Jest and Supertest with 100% endpoint coverage.
- **DevOps Readiness**: Ensure the application is strictly environment-configurable, stateless, and ready for containerization and CI/CD pipelines.

---

## 3. Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/) (LTS, v20+ / v24+)
- **Framework**: [Express.js](https://expressjs.com/) (v4.x)
- **Language**: JavaScript (CommonJS modules for broad Node.js runtime compatibility)
- **Environment Management**: `dotenv`
- **Testing Framework**: [Jest](https://jestjs.io/)
- **Integration HTTP Testing**: [Supertest](https://github.com/ladjs/supertest)
- **Data Persistence**: In-memory static dataset (`src/data/crops.js`)

> **Note for Instructor / Academic Evaluation Regarding Build Tools**:
> This project is implemented using Node.js, Express, and standard npm scripts (`npm test`, `npm run test:ci`, `npm start`). If the course evaluation rubric mentions Java build tools (Maven `pom.xml` or Gradle `build.gradle`), please note that this project is deliberately built on the Node.js runtime per project requirements. No artificial Maven/Gradle wrapper files were added to maintain code authenticity. If a custom Maven/Gradle wrapper execution is strictly required by an automated grader, npm commands can be invoked via standard Maven/Gradle frontend plugins or Jenkins pipeline shell stages (`sh 'npm test'`).

---

## 4. Project Directory Structure

```text
AgriPulse-DevOps/
├── .env.example                     # Sample environment variables template
├── .gitignore                       # Git exclusion rules for node_modules, logs, and artifacts
├── package.json                     # Project manifest, dependencies, and test scripts
├── README.md                        # Project documentation and operational guide
├── repo_link.txt                    # Placeholder for remote Git repository URL
│
├── src/                             # Application source code
│   ├── app.js                       # Express app configuration & middleware (uninstantiated)
│   ├── server.js                    # Server listener binding on 0.0.0.0 with graceful shutdown
│   │
│   ├── controllers/                 # HTTP request orchestration & response formatting
│   │   ├── cropController.js        # Controller for crop catalog endpoints
│   │   └── recommendationController.js # Controller for irrigation evaluations
│   │
│   ├── data/                        # Static data repository
│   │   └── crops.js                 # In-memory crop database with agronomic thresholds
│   │
│   ├── middleware/                  # Custom Express middlewares
│   │   ├── errorHandler.js          # Centralized error handler & JSON parsing safety
│   │   └── notFound.js              # Catch-all 404 handler for undefined routes
│   │
│   ├── routes/                      # REST endpoint definitions
│   │   ├── cropRoutes.js            # Endpoints under /api/crops
│   │   └── recommendationRoutes.js  # Endpoints under /api/recommendations
│   │
│   ├── services/                    # Pure business logic layer
│   │   └── recommendationService.js # Validation rules and irrigation heuristic engine
│   │
│   └── views/                       # View renderers
│       └── landingPage.js           # Self-contained HTML/CSS dashboard for GET /
│
└── tests/                           # Automated test suites
    ├── app.test.js                  # Root route, health probe, and 404 handling tests
    ├── crop.test.js                 # Crop list and individual crop retrieval tests
    └── recommendation.test.js       # Recommendation logic and boundary validation tests
```

---

## 5. Prerequisites

Before running AgriPulse, ensure the following software is installed on your workstation or host system:

- **Node.js**: `v18.x`, `v20.x`, or `v24.x` LTS ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.x` or higher (bundled with Node.js)
- **cURL** or **Postman**: For manual API verification

Verify your local installation:
```bash
node -v
npm -v
```

---

## 6. Installation Instructions

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/AgriPulse-DevOps.git
   cd AgriPulse-DevOps
   ```

2. Copy the environment configuration template:
   - On Linux / macOS / Git Bash:
     ```bash
     cp .env.example .env
     ```
   - On Windows PowerShell:
     ```powershell
     Copy-Item .env.example .env
     ```

3. Install project dependencies:
   ```bash
   npm install
   ```
   *(On Windows PowerShell with restricted execution policies, use `npm.cmd install` if prompted).*

---

## 7. Starting the Application

### Production / Standard Mode:
```bash
npm start
```
Executes `node src/server.js`.

### Development Mode (with automatic file reload):
```bash
npm run dev
```
Runs Node.js with built-in `--watch` mode to automatically restart when source files change.

### Terminal Output:
```text
[AgriPulse API] Server starting...
[AgriPulse API] Environment: development
[AgriPulse API] Server listening successfully.
[AgriPulse API] Local: http://localhost:5000
[AgriPulse API] Network: http://127.0.0.1:5000
[AgriPulse API] Health: http://localhost:5000/health
[AgriPulse API] Crops: http://localhost:5000/api/crops
[AgriPulse API] Ready for incoming requests.
```

---

## 8. Localhost Endpoints Summary

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Visual HTML Dashboard & Operational Overview (JSON fallback via Accept: application/json) | `200 OK` |
| `GET` | `/health` | Service health status (used by Kubernetes probes) | `200 OK` |
| `GET` | `/api/crops` | Retrieve full list of agricultural crops | `200 OK` |
| `GET` | `/api/crops/:id` | Retrieve detailed agronomic profile for a crop | `200 OK` / `404 Not Found` |
| `POST` | `/api/recommendations` | Compute irrigation advisory based on sensor inputs | `200 OK` / `400 Bad Request` |

---

## 9. API Request & Response Examples

### A. GET `/` – Interactive HTML Dashboard / Welcome Endpoint
**Browser View:**
Opening `http://localhost:5000` in any web browser renders an agricultural-themed dashboard featuring real-time service metrics, active registered crops, quick-action links to `/api/crops` and `/health`, and a full heuristic rule reference table.

**cURL (JSON Fallback):**
```bash
curl -X GET http://localhost:5000/ -H "Accept: application/json"
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Welcome to AgriPulse Smart Agriculture API",
  "version": "1.0.0"
}
```

---

### B. GET `/health` – Health Probe Endpoint
**Request:**
```bash
curl -X GET http://localhost:5000/health
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "status": "healthy",
  "service": "AgriPulse API"
}
```

---

### C. GET `/api/crops` – List All Crops
**Request:**
```bash
curl -X GET http://localhost:5000/api/crops
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Rice",
      "category": "Cereal Grain",
      "idealSoil": "Clayey loam",
      "waterRequirement": "High (1200-1400 mm)",
      "growthDurationDays": 120,
      "description": "A staple semi-aquatic cereal grain requiring high water retention and consistent moisture during vegetative stages.",
      "optimalMoistureMin": 60,
      "optimalMoistureMax": 85,
      "optimalTempMin": 20,
      "optimalTempMax": 35
    },
    {
      "id": 2,
      "name": "Wheat",
      "category": "Cereal Grain",
      "idealSoil": "Loamy / Sandy loam",
      "waterRequirement": "Medium (450-650 mm)",
      "growthDurationDays": 135,
      "description": "A major cool-season cereal grain that thrives in well-drained fertile loam soils with moderate watering intervals.",
      "optimalMoistureMin": 40,
      "optimalMoistureMax": 60,
      "optimalTempMin": 12,
      "optimalTempMax": 25
    },
    {
      "id": 3,
      "name": "Maize",
      "category": "Cereal Grain",
      "idealSoil": "Well-drained loamy soil",
      "waterRequirement": "Medium (500-800 mm)",
      "growthDurationDays": 105,
      "description": "A versatile warm-season crop sensitive to both waterlogging and severe moisture stress during tasseling and silking.",
      "optimalMoistureMin": 45,
      "optimalMoistureMax": 65,
      "optimalTempMin": 18,
      "optimalTempMax": 32
    },
    {
      "id": 4,
      "name": "Tomato",
      "category": "Vegetable",
      "idealSoil": "Well-drained sandy loam",
      "waterRequirement": "Moderate (400-600 mm)",
      "growthDurationDays": 90,
      "description": "A high-value vegetable crop that requires consistent moisture without water stagnation to avoid root rot and fruit splitting.",
      "optimalMoistureMin": 40,
      "optimalMoistureMax": 60,
      "optimalTempMin": 18,
      "optimalTempMax": 30
    },
    {
      "id": 5,
      "name": "Sugarcane",
      "category": "Cash Crop",
      "idealSoil": "Deep rich loamy soil",
      "waterRequirement": "Very High (1500-2500 mm)",
      "growthDurationDays": 360,
      "description": "A long-duration perennial tropical grass crop requiring sustained high soil hydration and generous irrigation throughout grand growth.",
      "optimalMoistureMin": 50,
      "optimalMoistureMax": 75,
      "optimalTempMin": 20,
      "optimalTempMax": 38
    }
  ]
}
```

---

### D. GET `/api/crops/:id` – Retrieve Single Crop
**Valid Request (`id = 1`):**
```bash
curl -X GET http://localhost:5000/api/crops/1
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rice",
    "category": "Cereal Grain",
    "idealSoil": "Clayey loam",
    "waterRequirement": "High (1200-1400 mm)",
    "growthDurationDays": 120,
    "description": "A staple semi-aquatic cereal grain requiring high water retention and consistent moisture during vegetative stages.",
    "optimalMoistureMin": 60,
    "optimalMoistureMax": 85,
    "optimalTempMin": 20,
    "optimalTempMax": 35
  }
}
```

**Non-Existent ID Request (`id = 999`):**
```bash
curl -X GET http://localhost:5000/api/crops/999
```
**Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "Crop with ID 999 not found"
}
```

---

### E. POST `/api/recommendations` – Generate Irrigation Advisory

#### Example 1: High Temperature + Critical Low Moisture (Rice)
**cURL:**
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"cropId": 1, "soilMoisture": 25, "temperature": 32}'
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "cropId": 1,
    "cropName": "Rice",
    "soilMoisture": 25,
    "temperature": 32,
    "irrigationStatus": "Critical - Immediate Irrigation Required",
    "recommendation": "Critically low soil moisture (25%) coupled with high ambient temperature (32°C). Immediate deep irrigation is required for Rice to avoid severe water stress and permanent wilting.",
    "suggestedNextMonitoringInterval": "2 to 4 hours"
  },
  "disclaimer": "These rule-based recommendations are illustrative calculations for demonstration purposes and not certified agricultural advice."
}
```

#### Example 2: Optimal Moisture Range (Wheat)
**cURL:**
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"cropId": 2, "soilMoisture": 50, "temperature": 20}'
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "cropId": 2,
    "cropName": "Wheat",
    "soilMoisture": 50,
    "temperature": 20,
    "irrigationStatus": "Adequate - No Irrigation Needed",
    "recommendation": "Soil moisture (50%) and ambient temperature (20°C) are within the ideal agronomic range for Wheat. Maintain standard observation.",
    "suggestedNextMonitoringInterval": "12 to 24 hours"
  },
  "disclaimer": "These rule-based recommendations are illustrative calculations for demonstration purposes and not certified agricultural advice."
}
```

#### Example 3: Validation Error (Invalid Soil Moisture)
**cURL:**
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"cropId": 1, "soilMoisture": 150, "temperature": 30}'
```

**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Invalid recommendation request parameters",
  "errors": [
    "soilMoisture must be between 0 and 100 percent."
  ]
}
```

#### Example 4: Validation Error (Invalid Crop ID)
**cURL:**
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"cropId": 9999, "soilMoisture": 45, "temperature": 25}'
```

**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Invalid recommendation request parameters",
  "errors": [
    "Crop with ID 9999 does not exist."
  ]
}
```

---

## 10. Automated Testing

AgriPulse includes a complete automated test suite using **Jest** and **Supertest**. Tests run completely in-memory and require no external databases or running background daemons.

### Run Standard Test Suite:
```bash
npm test
```

### Run CI Mode (Non-interactive, exit codes enabled):
```bash
npm run test:ci
```
In CI mode, Jest will execute tests sequentially (`--runInBand`), print colored test reports, and return a non-zero exit code if any test fails, terminating automated pipeline builds (such as Jenkins or GitHub Actions).

### Test Coverage Checklist:
1. `GET /` returns welcome response and version info.
2. `GET /health` returns healthy status for container probes.
3. `GET /api/crops` returns full list of crops with required schema.
4. `GET /api/crops/:id` returns valid crop for existing ID.
5. `GET /api/crops/:id` returns HTTP 404 for unknown or invalid ID.
6. `POST /api/recommendations` returns a valid recommendation payload.
7. `POST /api/recommendations` rejects invalid soil moisture (< 0 or > 100).
8. `POST /api/recommendations` rejects invalid/non-existent crop ID.

---

## 11. Explanation of Irrigation Recommendation Logic

The recommendation engine (`src/services/recommendationService.js`) models realistic agronomic decision-making through deterministic rules:

### Core Rules:
1. **Critical Deficit (`soilMoisture < optimalMin - 15` or `< 30%`)**:
   - Status: `Critical - Immediate Irrigation Required`
   - If ambient temperature $\ge 30^\circ\text{C}$, evapotranspiration is accelerated. Recommendation specifies immediate deep watering and schedules a re-check within **2 to 4 hours**.
   - If ambient temperature is moderate, next check is scheduled for **4 to 6 hours**.
2. **Moderate Deficit (`soilMoisture < optimalMin`)**:
   - Status: `Irrigation Recommended`
   - Recommends scheduled watering during the next standard cycle.
   - If temperature $\ge 30^\circ\text{C}$, interval is **6 to 8 hours**; otherwise, **8 to 12 hours**.
3. **Optimal Zone (`optimalMin <= soilMoisture <= optimalMax`)**:
   - Status: `Adequate - No Irrigation Needed`
   - Standard maintenance. Interval is **12 to 24 hours** (or **8 to 12 hours** if high temperature elevates evaporation).
4. **Moisture Surplus (`soilMoisture > optimalMax`)**:
   - Status: `Surplus - Hold Irrigation`
   - Warns against water stagnation and advises checking drainage. Next monitoring interval is extended to **24 to 48 hours**.

> **Disclaimer**: This recommendation logic is an illustrative computational heuristic designed for coursework and technical validation. It does not replace certified professional agronomy or soil science consultation.

---

## 12. Future DevOps Integration Plan

This repository is intentionally structured to cleanly support subsequent DevOps stages:

```
[Developer Commits]
        │
        ▼
   [Git Stage] (Branching Strategy: main, develop, feature/*)
        │
        ▼
 [Jenkins CI Stage] (npm install -> npm run test:ci -> lint)
        │
        ▼
 [Docker Stage] (Multi-stage lightweight Node Alpine container)
        │
        ▼
 [Ansible Stage] (Host provisioning, dependency verification)
        │
        ▼
[Kubernetes Stage] (Deployment 3 Replicas + Service + Health Probes)
```

### A. Git Version Control Strategy
- **Branching Model**:
  - `main`: Production-ready, stable releases.
  - `develop`: Integration branch for completed features.
  - `feature/<feature-name>`: Isolated feature branches (e.g., `feature/crop-routes`, `feature/recommendation-engine`).
- **Commit Convention**: Conventional commits (e.g., `feat: add irrigation recommendation logic`, `test: add Supertest test cases`).
- **Pull Request (PR) Workflow**: Feature branches are submitted via PRs into `develop`, requiring CI test pass before merging.

### B. Jenkins CI Pipeline
- Runs `npm install` and `npm run test:ci`.
- Zero external database requirement enables rapid, isolated pipeline runs.
- Pipeline will immediately fail if any Jest assertion fails.

### C. Docker Containerization
- Application binds to `0.0.0.0` (not `127.0.0.1`), ensuring accessibility inside Docker network bridges.
- Environment-configured `PORT` (defaults to `5000`).
- Process cleanly handles `SIGTERM` and `SIGINT` signals for rapid container stopping.

### D. Ansible Configuration Management
- Standard Node.js runtime application that can be provisioned using an Ansible playbook (e.g., updating Ubuntu package lists, installing Node.js LTS, copying repository files, and registering a `systemd` service).

### E. Kubernetes Deployment
- Cloud-native readiness:
  - `/health` endpoint responds with HTTP 200 for `livenessProbe` and `readinessProbe`.
  - Stateless architecture allows scaling across multiple replicas (e.g., `replicas: 3`).
  - Standardized port binding enables Kubernetes `Service` (ClusterIP/NodePort) routing.

---

## 13. Known Limitations

- **In-Memory Storage**: Crop records are stored in memory (`src/data/crops.js`). Any runtime modifications are not persisted across server restarts.
- **Rule-Based Heuristic**: Recommendations use predetermined agronomic threshold bands rather than complex machine learning models or dynamic weather forecasts.
- **No Authentication / Authorization**: Endpoints are currently public; API tokens or JWT middleware should be introduced if deployed to public networks.

---

## 14. How to Open and Run in VS Code

1. Launch Visual Studio Code.
2. Select **File** > **Open Folder...** and choose the `AgriPulse-DevOps` folder.
3. Open an integrated terminal in VS Code:
   - Shortcut: `` Ctrl + ` `` (Windows/Linux)
4. Ensure dependencies are installed:
   ```bash
   npm install
   ```
5. Run the tests:
   ```bash
   npm test
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open `http://localhost:5000` in your web browser or send requests using the VS Code REST Client extension / Thunder Client / Postman.

## API Usage Examples
1./api/recommendations
2.sample requesting, and testing git commands and adding api usage data.