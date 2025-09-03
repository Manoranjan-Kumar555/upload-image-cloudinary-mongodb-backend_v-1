const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validateSignup, validateLogin } = require("../validations/validateUser");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

exports.signup = async (req, res) => {
  try {
    const error = validateSignup(req.body);
    if (error) return res.status(400).json({ message: error });

    const { name, email, mobile, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, mobile, password });

    res.status(201).json({
      message: "✅ User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    res.json({
      message: "✅ Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
