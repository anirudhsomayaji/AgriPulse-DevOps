/**
 * Recommendation Controller
 * 
 * Handles incoming irrigation evaluation requests, validates payload parameters,
 * and delegates logic to recommendationService.
 */

const {
  validateRecommendationInput,
  generateRecommendation
} = require('../services/recommendationService');

/**
 * POST /api/recommendations
 * Generates an irrigation recommendation based on cropId, soilMoisture, and temperature.
 */
function getRecommendation(req, res) {
  const validation = validateRecommendationInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'Invalid recommendation request parameters',
      errors: validation.errors
    });
  }

  const { crop } = validation;
  const { soilMoisture, temperature } = req.body;

  const result = generateRecommendation(crop, soilMoisture, temperature);

  return res.status(200).json({
    success: true,
    data: {
      cropId: crop.id,
      cropName: result.cropName,
      soilMoisture: result.soilMoisture,
      temperature: result.temperature,
      irrigationStatus: result.irrigationStatus,
      recommendation: result.recommendation,
      suggestedNextMonitoringInterval: result.suggestedNextMonitoringInterval
    },
    disclaimer: 'These rule-based recommendations are illustrative calculations for demonstration purposes and not certified agricultural advice.'
  });
}

module.exports = {
  getRecommendation
};
