const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    // ✅ 1. Check token in cookies (AUTO LOGIN)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ 2. Check token in Authorization header (POSTMAN / API)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = { protect };