/**
 * Crop Routes
 * 
 * Defines REST endpoints for crop catalog queries.
 */

const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

// GET /api/crops - List all crops
router.get('/', cropController.getAllCrops);

// GET /api/crops/:id - Retrieve specific crop details by ID
router.get('/:id', cropController.getCropById);

module.exports = router;
