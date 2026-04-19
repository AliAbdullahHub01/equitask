const express = require('express');
const router = express.Router();
const equityController = require('../controllers/equity.controller');

router.get('/leaderboard/:projectId', equityController.getLeaderboard);
router.post('/recalculate/:projectId', equityController.recalculateEquity);

module.exports = router;
