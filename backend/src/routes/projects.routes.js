const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
// const { requireAuth } = require('../middleware/auth'); 
// Using mock auth for now so it's easy to test without Supabase login

router.post('/', projectsController.createProject);
router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getProjectById);
router.post('/:id/members', projectsController.addMember);

module.exports = router;
