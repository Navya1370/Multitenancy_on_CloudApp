// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// AUTH + TENANTS (your existing)
app.post("/api/register", require("./routes/auth").register);
app.post("/api/login", require("./routes/auth").login);
app.get("/api/tenants", require("./routes/auth").getTenants);

// MAIN 2 ROUTE GROUPS (projects & tasks)
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
