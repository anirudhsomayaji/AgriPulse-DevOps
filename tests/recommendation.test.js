/**
 * Irrigation Recommendation Endpoint Tests
 */

const request = require('supertest');
const app = require('../src/app');

describe('Irrigation Recommendation Endpoints', () => {
  describe('POST /api/recommendations', () => {
    it('should return a valid recommendation with all required fields for valid input', async () => {
      const payload = {
        cropId: 1,
        soilMoisture: 25,
        temperature: 32
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();

      const data = response.body.data;
      expect(data.cropName).toBe('Rice');
      expect(data.soilMoisture).toBe(25);
      expect(data.temperature).toBe(32);
      expect(typeof data.irrigationStatus).toBe('string');
      expect(typeof data.recommendation).toBe('string');
      expect(typeof data.suggestedNextMonitoringInterval).toBe('string');

      // Specific check for critical status
      expect(data.irrigationStatus).toContain('Critical');
      expect(data.recommendation).toContain('Rice');
    });

    it('should return adequate status when soil moisture is within optimal range', async () => {
      const payload = {
        cropId: 2, // Wheat: optimal is 40-60%
        soilMoisture: 50,
        temperature: 20
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.data.irrigationStatus).toContain('Adequate');
      expect(response.body.data.cropName).toBe('Wheat');
    });

    it('should reject invalid soil moisture (> 100) with HTTP 400', async () => {
      const payload = {
        cropId: 1,
        soilMoisture: 150,
        temperature: 28
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some((err) => err.includes('soilMoisture'))).toBe(true);
    });

    it('should reject invalid negative soil moisture (< 0) with HTTP 400', async () => {
      const payload = {
        cropId: 1,
        soilMoisture: -10,
        temperature: 28
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((err) => err.includes('soilMoisture'))).toBe(true);
    });

    it('should reject an invalid/non-existent crop ID with HTTP 400', async () => {
      const payload = {
        cropId: 9999,
        soilMoisture: 35,
        temperature: 25
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((err) => err.includes('does not exist'))).toBe(true);
    });

    it('should reject non-integer crop ID with HTTP 400', async () => {
      const payload = {
        cropId: 'abc',
        soilMoisture: 35,
        temperature: 25
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((err) => err.includes('cropId'))).toBe(true);
    });

    it('should reject unreasonable temperature with HTTP 400', async () => {
      const payload = {
        cropId: 1,
        soilMoisture: 50,
        temperature: 95 // unrealistic atmospheric temperature
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors.some((err) => err.includes('temperature'))).toBe(true);
    });

    it('should reject missing required fields with HTTP 400', async () => {
      const payload = {
        // missing cropId, soilMoisture, temperature
      };

      const response = await request(app)
        .post('/api/recommendations')
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors.length).toBeGreaterThanOrEqual(3);
    });
  });
});
