const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  dbURI: { type: String, default: "" },
});

module.exports = mongoose.model("Tenant", tenantSchema);
