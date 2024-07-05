const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Create a new project
router.post('/', auth, async (req, res) => {
  try {
    const newProject = new Project({
      name: req.body.name,
      user: req.user.id,
    });
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all projects for a user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
