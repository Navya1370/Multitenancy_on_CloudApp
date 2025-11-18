// backend/models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true },
    projectId: { type: String, default: null },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
