const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects for tenant
router.get("/:tenantId", async (req, res) => {
  try {
    const projects = await Project.find({ tenantId: req.params.tenantId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE project
router.post("/:tenantId", async (req, res) => {
  try {
    const project = await Project.create({
      tenantId: req.params.tenantId,
      title: req.body.title,
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
