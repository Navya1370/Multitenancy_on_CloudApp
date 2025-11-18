const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks for tenant
router.get("/:tenantId", async (req, res) => {
  try {
    const tasks = await Task.find({ tenantId: req.params.tenantId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE task
router.post("/:tenantId", async (req, res) => {
  try {
    const task = await Task.create({
      tenantId: req.params.tenantId,
      title: req.body.title,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
