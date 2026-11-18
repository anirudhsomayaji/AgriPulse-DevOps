/**
 * AgriPulse Predefined Crop Dataset
 * 
 * In-memory static dataset representing crop agronomic profiles.
 * Contains standard agronomic parameters and thresholds used for irrigation evaluations.
 */

const crops = [
  {
    id: 1,
    name: 'Rice',
    category: 'Cereal Grain',
    idealSoil: 'Clayey loam',
    waterRequirement: 'High (1200-1400 mm)',
    growthDurationDays: 120,
    description: 'A staple semi-aquatic cereal grain requiring high water retention and consistent moisture during vegetative stages.',
    optimalMoistureMin: 60,
    optimalMoistureMax: 85,
    optimalTempMin: 20,
    optimalTempMax: 35
  },
  {
    id: 2,
    name: 'Wheat',
    category: 'Cereal Grain',
    idealSoil: 'Loamy / Sandy loam',
    waterRequirement: 'Medium (450-650 mm)',
    growthDurationDays: 135,
    description: 'A major cool-season cereal grain that thrives in well-drained fertile loam soils with moderate watering intervals.',
    optimalMoistureMin: 40,
    optimalMoistureMax: 60,
    optimalTempMin: 12,
    optimalTempMax: 25
  },
  {
    id: 3,
    name: 'Maize',
    category: 'Cereal Grain',
    idealSoil: 'Well-drained loamy soil',
    waterRequirement: 'Medium (500-800 mm)',
    growthDurationDays: 105,
    description: 'A versatile warm-season crop sensitive to both waterlogging and severe moisture stress during tasseling and silking.',
    optimalMoistureMin: 45,
    optimalMoistureMax: 65,
    optimalTempMin: 18,
    optimalTempMax: 32
  },
  {
    id: 4,
    name: 'Tomato',
    category: 'Vegetable',
    idealSoil: 'Well-drained sandy loam',
    waterRequirement: 'Moderate (400-600 mm)',
    growthDurationDays: 90,
    description: 'A high-value vegetable crop that requires consistent moisture without water stagnation to avoid root rot and fruit splitting.',
    optimalMoistureMin: 40,
    optimalMoistureMax: 60,
    optimalTempMin: 18,
    optimalTempMax: 30
  },
  {
    id: 5,
    name: 'Sugarcane',
    category: 'Cash Crop',
    idealSoil: 'Deep rich loamy soil',
    waterRequirement: 'Very High (1500-2500 mm)',
    growthDurationDays: 360,
    description: 'A long-duration perennial tropical grass crop requiring sustained high soil hydration and generous irrigation throughout grand growth.',
    optimalMoistureMin: 50,
    optimalMoistureMax: 75,
    optimalTempMin: 20,
    optimalTempMax: 38
  }
];

module.exports = crops;
