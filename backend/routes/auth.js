const Tenant = require("../models/Tenant");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email } = req.body;

    const exists = await Tenant.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const tenant = await Tenant.create({ name, email });

    res.json({ message: "Registered successfully", tenant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: tenant._id, email: tenant.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      tenant,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTenants = async (_, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
