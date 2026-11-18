/**
 * Crop Catalog Endpoint Tests
 */

const request = require('supertest');
const app = require('../src/app');

describe('Crop Catalog Endpoints', () => {
  describe('GET /api/crops', () => {
    it('should return a list of crops with HTTP 200', async () => {
      const response = await request(app).get('/api/crops');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThanOrEqual(5);

      // Verify required crops are present
      const cropNames = response.body.data.map((c) => c.name);
      expect(cropNames).toContain('Rice');
      expect(cropNames).toContain('Wheat');
      expect(cropNames).toContain('Maize');
      expect(cropNames).toContain('Tomato');
      expect(cropNames).toContain('Sugarcane');

      // Verify required fields on each crop
      response.body.data.forEach((crop) => {
        expect(crop).toHaveProperty('id');
        expect(crop).toHaveProperty('name');
        expect(crop).toHaveProperty('category');
        expect(crop).toHaveProperty('idealSoil');
        expect(crop).toHaveProperty('waterRequirement');
        expect(crop).toHaveProperty('growthDurationDays');
        expect(crop).toHaveProperty('description');
      });
    });
  });

  describe('GET /api/crops/:id', () => {
    it('should return crop details for a valid crop ID with HTTP 200', async () => {
      const response = await request(app).get('/api/crops/1');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.name).toBe('Rice');
      expect(response.body.data.category).toBe('Cereal Grain');
      expect(response.body.data.growthDurationDays).toBe(120);
    });

    it('should return HTTP 404 for an unknown crop ID', async () => {
      const response = await request(app).get('/api/crops/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Crop with ID 999 not found');
    });

    it('should return HTTP 404 for an invalid non-numeric crop ID', async () => {
      const response = await request(app).get('/api/crops/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid crop ID');
    });
  });
});
