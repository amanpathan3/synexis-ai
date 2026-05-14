const axios = require("axios");
const path = require("path");
const userModel = require("../models/User");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No file uploaded");

    const filePath = path.resolve(req.file.path); // 🔥 FIX

    const response = await axios.post(
      "http://127.0.0.1:8000/parse-resume",
      {
        file_path: filePath
      }
    );

    const skills = response.data.skills;
    
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: { skills: skills } },
      { new: true }
    );

    res.json(response.data.skills);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error processing resume");
  }
};