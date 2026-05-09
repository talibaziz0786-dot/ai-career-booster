import cloudinary from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    res.json({
      url: "https://via.placeholder.com/300",
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};