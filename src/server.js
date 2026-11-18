/**
 * AgriPulse HTTP Server Listener
 * 
 * Loads environment configurations and starts the HTTP server.
 * Binds to 0.0.0.0 for container compatibility (Docker & Kubernetes).
 * Displays clickable localhost development links and handles EADDRINUSE gracefully.
 */

require('dotenv').config();

const app = require('./app');

const PORT = parseInt(process.env.PORT, 10) || 5000;
const HOST = process.env.HOST || '0.0.0.0';

console.log('[AgriPulse API] Server starting...');

const server = app.listen(PORT, HOST, () => {
  console.log(`[AgriPulse API] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('[AgriPulse API] Server listening successfully.');
  console.log(`[AgriPulse API] Local: http://localhost:${PORT}`);
  console.log(`[AgriPulse API] Network: http://127.0.0.1:${PORT}`);
  console.log(`[AgriPulse API] Health: http://localhost:${PORT}/health`);
  console.log(`[AgriPulse API] Crops: http://localhost:${PORT}/api/crops`);
  console.log('[AgriPulse API] Ready for incoming requests.');
});

// Handle port conflicts and listener errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[AgriPulse API] [FATAL ERROR] Port ${PORT} is already in use by another process.`);
    console.error(`[AgriPulse API] [FATAL ERROR] Cannot start AgriPulse server on port ${PORT}.`);
    console.error(`[AgriPulse API] [RESOLUTION] Please stop the process occupying port ${PORT} or set a different PORT in .env.`);
    console.error(`[AgriPulse API] [DIAGNOSTIC] Windows: Check with 'netstat -ano | findstr :${PORT}'`);
    console.error(`[AgriPulse API] [DIAGNOSTIC] Linux/macOS: Check with 'lsof -i :${PORT}'\n`);
    process.exit(1);
  } else {
    console.error(`[AgriPulse API] [FATAL ERROR] Server error: ${err.message}`);
    process.exit(1);
  }
});

// Graceful shutdown handling for container and process managers
function handleShutdown(signal) {
  console.log(`\n[AgriPulse API] Received ${signal}. Initiating graceful shutdown...`);
  server.close(() => {
    console.log('[AgriPulse API] HTTP server closed cleanly. Process exiting.');
    process.exit(0);
  });

  // Force close after 5 seconds if connections remain open
  setTimeout(() => {
    console.error('[AgriPulse API] Forced shutdown after timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

module.exports = server;
