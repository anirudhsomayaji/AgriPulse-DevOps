/**
 * AgriPulse Recommendation Service
 * 
 * Provides rule-based irrigation evaluation logic based on crop agronomic profiles,
 * current soil moisture percentage, and ambient temperature readings.
 * 
 * NOTE: These rule-based calculations are simplified illustrative models developed
 * for demonstration and educational purposes; they do not constitute professional
 * agronomic or commercial farming advice.
 */

const crops = require('../data/crops');

/**
 * Validates input parameters for irrigation recommendation.
 * @param {Object} input - Request body containing cropId, soilMoisture, temperature.
 * @returns {Object} { isValid: boolean, errors: string[], crop?: Object }
 */
function validateRecommendationInput(input) {
  const errors = [];
  const { cropId, soilMoisture, temperature } = input;

  // Validate cropId
  if (cropId === undefined || cropId === null) {
    errors.push('cropId is required.');
  } else if (!Number.isInteger(cropId) || cropId <= 0) {
    errors.push('cropId must be a positive integer.');
  }

  const crop = cropId ? crops.find((c) => c.id === cropId) : null;
  if (cropId && Number.isInteger(cropId) && !crop) {
    errors.push(`Crop with ID ${cropId} does not exist.`);
  }

  // Validate soilMoisture
  if (soilMoisture === undefined || soilMoisture === null) {
    errors.push('soilMoisture is required.');
  } else if (typeof soilMoisture !== 'number' || isNaN(soilMoisture)) {
    errors.push('soilMoisture must be a valid number.');
  } else if (soilMoisture < 0 || soilMoisture > 100) {
    errors.push('soilMoisture must be between 0 and 100 percent.');
  }

  // Validate temperature
  if (temperature === undefined || temperature === null) {
    errors.push('temperature is required.');
  } else if (typeof temperature !== 'number' || isNaN(temperature)) {
    errors.push('temperature must be a valid number.');
  } else if (temperature < -10 || temperature > 60) {
    errors.push('temperature must be within a realistic operating range (-10°C to 60°C).');
  }

  return {
    isValid: errors.length === 0,
    errors,
    crop
  };
}

/**
 * Evaluates irrigation status and generates recommendations.
 * @param {Object} crop - Crop agronomic profile.
 * @param {number} soilMoisture - Measured soil moisture percentage (0-100).
 * @param {number} temperature - Measured ambient temperature in Celsius.
 * @returns {Object} Recommendation result.
 */
function generateRecommendation(crop, soilMoisture, temperature) {
  const { name, optimalMoistureMin, optimalMoistureMax } = crop;
  const isHighTemp = temperature >= 30;
  const isColdTemp = temperature < 12;

  let irrigationStatus = '';
  let recommendation = '';
  let suggestedNextMonitoringInterval = '';

  // Severely dry condition (well below optimal)
  if (soilMoisture < optimalMoistureMin - 15 || soilMoisture < 30) {
    irrigationStatus = 'Critical - Immediate Irrigation Required';
    if (isHighTemp) {
      recommendation = `Critically low soil moisture (${soilMoisture}%) coupled with high ambient temperature (${temperature}°C). Immediate deep irrigation is required for ${name} to avoid severe water stress and permanent wilting.`;
      suggestedNextMonitoringInterval = '2 to 4 hours';
    } else {
      recommendation = `Critically low soil moisture (${soilMoisture}%). Immediate irrigation is required for ${name} to replenish the root zone.`;
      suggestedNextMonitoringInterval = '4 to 6 hours';
    }
  }
  // Moderately low moisture (below optimal minimum)
  else if (soilMoisture < optimalMoistureMin) {
    irrigationStatus = 'Irrigation Recommended';
    if (isHighTemp) {
      recommendation = `Soil moisture (${soilMoisture}%) is below optimal (${optimalMoistureMin}-${optimalMoistureMax}%). High temperature (${temperature}°C) will accelerate evapotranspiration; scheduled irrigation is recommended within the next cycle.`;
      suggestedNextMonitoringInterval = '6 to 8 hours';
    } else {
      recommendation = `Soil moisture (${soilMoisture}%) is slightly below optimal range for ${name}. Light to moderate irrigation is advised to restore moisture.`;
      suggestedNextMonitoringInterval = '8 to 12 hours';
    }
  }
  // Optimal moisture range
  else if (soilMoisture <= optimalMoistureMax) {
    irrigationStatus = 'Adequate - No Irrigation Needed';
    if (isHighTemp) {
      recommendation = `Soil moisture (${soilMoisture}%) is currently optimal for ${name}, but monitor closely as high temperature (${temperature}°C) increases water depletion rate.`;
      suggestedNextMonitoringInterval = '8 to 12 hours';
    } else if (isColdTemp) {
      recommendation = `Soil moisture (${soilMoisture}%) is optimal for ${name}. Low temperature (${temperature}°C) slows evaporation; retain current moisture.`;
      suggestedNextMonitoringInterval = '18 to 24 hours';
    } else {
      recommendation = `Soil moisture (${soilMoisture}%) and ambient temperature (${temperature}°C) are within the ideal agronomic range for ${name}. Maintain standard observation.`;
      suggestedNextMonitoringInterval = '12 to 24 hours';
    }
  }
  // Surplus / excessive moisture
  else {
    irrigationStatus = 'Surplus - Hold Irrigation';
    recommendation = `Soil moisture (${soilMoisture}%) exceeds the optimal threshold (${optimalMoistureMax}%) for ${name}. Suspend irrigation immediately and verify drainage channels to prevent root asphyxiation.`;
    suggestedNextMonitoringInterval = '24 to 48 hours';
  }

  return {
    cropName: name,
    soilMoisture,
    temperature,
    irrigationStatus,
    recommendation,
    suggestedNextMonitoringInterval
  };
}

module.exports = {
  validateRecommendationInput,
  generateRecommendation
};
