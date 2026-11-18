/**
 * Application Core & Health Endpoint Tests
 * 
 * Verifies root landing page (HTML dashboard), content negotiation (JSON fallback),
 * health probe, and 404 handler.
 */

const request = require('supertest');
const app = require('../src/app');

describe('AgriPulse Core Endpoints', () => {
  describe('GET /', () => {
    it('should return HTTP 200 with HTML landing page containing the AgriPulse title', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.text).toContain('AgriPulse – Smart Agriculture API');
      expect(response.text).toContain('Microservice for Crop Agronomics & Irrigation Advisories');
      expect(response.text).toContain('/api/crops');
      expect(response.text).toContain('/health');
    });

    it('should return JSON when client explicitly specifies Accept: application/json', async () => {
      const response = await request(app)
        .get('/')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toEqual({
        success: true,
        message: 'Welcome to AgriPulse Smart Agriculture API',
        version: '1.0.0'
      });
    });
  });

  describe('GET /health', () => {
    it('should return healthy status for Kubernetes liveness/readiness probes with HTTP 200', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toEqual({
        success: true,
        status: 'healthy',
        service: 'AgriPulse API'
      });
    });
  });

  describe('Undefined Routes Handler (404)', () => {
    it('should return HTTP 404 with a meaningful JSON response for unknown endpoints', async () => {
      const response = await request(app).get('/unknown-endpoint');

      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Resource not found');
      expect(response.body.message).toContain('/unknown-endpoint');
    });
  });
});
