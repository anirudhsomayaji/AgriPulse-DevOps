/**
 * AgriPulse Express Application
 * 
 * Configures middleware, root landing page and health routes, and API resource routers.
 * Exports the uninstantiated app instance for automated testing and server binding.
 */

const express = require('express');
const cropRoutes = require('./routes/cropRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { renderLandingPage } = require('./views/landingPage');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Root endpoint: Returns interactive HTML landing page by default; JSON if explicitly requested
app.get('/', (req, res) => {
  const acceptsHtml = req.accepts('html');
  const acceptsJson = req.accepts('json');

  // If client explicitly requests application/json and not html, provide JSON
  if (!acceptsHtml && acceptsJson) {
    return res.status(200).json({
      success: true,
      message: 'Welcome to AgriPulse Smart Agriculture API',
      version: '1.0.0'
    });
  }

  // Otherwise render the full agricultural dashboard HTML page
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(renderLandingPage());
});

// Health check probe endpoint (used for Kubernetes liveness & readiness probes)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    service: 'AgriPulse API'
  });
});

// Register API resource routes
app.use('/api/crops', cropRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Catch-all 404 handler for undefined routes
app.use(notFound);

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
