const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// 🍪 Send Token as Cookie
const sendToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // 👉 make true in production (HTTPS)
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, domain} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      domain,
      email,
      password: hashed
    });

    const token = generateToken(user._id);

    // ✅ Save token in cookie
    sendToken(res, token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      domain: user.domain
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user._id);

    // ✅ Save token in cookie
    sendToken(res, token);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skills: user.skills,
      domain: user.domain
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGOUT (IMPORTANT)
exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({ message: "Logged out successfully" });
};

// ✅ GET CURRENT USER
exports.getMe = async (req, res) => {

  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};