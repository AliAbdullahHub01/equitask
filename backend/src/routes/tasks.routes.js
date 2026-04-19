const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');

// Complete a task and trigger equity distribution
router.post('/:taskId/complete', tasksController.completeTask);

// Create a new task
router.post('/', tasksController.createTask);

// Get all tasks for a project
router.get('/project/:projectId', tasksController.getTasksByProject);

module.exports = router;
