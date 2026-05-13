const axios = require("axios");
const path = require("path");

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

    res.json(response.data);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error processing resume");
  }
};