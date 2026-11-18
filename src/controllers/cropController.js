/**
 * Crop Controller
 * 
 * Handles HTTP requests for crop catalog endpoints.
 */

const crops = require('../data/crops');

/**
 * GET /api/crops
 * Retrieve all registered crops.
 */
function getAllCrops(req, res) {
  res.status(200).json({
    success: true,
    count: crops.length,
    data: crops
  });
}

/**
 * GET /api/crops/:id
 * Retrieve details for a single crop by ID.
 */
function getCropById(req, res) {
  const cropId = parseInt(req.params.id, 10);

  if (isNaN(cropId)) {
    return res.status(404).json({
      success: false,
      message: `Invalid crop ID: ${req.params.id}`
    });
  }

  const crop = crops.find((c) => c.id === cropId);

  if (!crop) {
    return res.status(404).json({
      success: false,
      message: `Crop with ID ${cropId} not found`
    });
  }

  return res.status(200).json({
    success: true,
    data: crop
  });
}

module.exports = {
  getAllCrops,
  getCropById
};
