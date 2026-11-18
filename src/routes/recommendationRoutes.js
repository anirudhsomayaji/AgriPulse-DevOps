/**
 * Recommendation Routes
 * 
 * Defines REST endpoints for irrigation recommendation evaluations.
 */

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// POST /api/recommendations - Generate rule-based irrigation recommendation
router.post('/', recommendationController.getRecommendation);

module.exports = router;
