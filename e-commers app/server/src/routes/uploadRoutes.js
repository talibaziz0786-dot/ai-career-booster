import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.array("images", 5),
  async (req, res) => {

    try {

      const uploadedImages = [];

      for (const file of req.files) {

        const result =
          await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
              folder: "ecommerce",
            }
          );

        uploadedImages.push(
          result.secure_url
        );
      }

      res.json({
        images: uploadedImages,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload Failed",
      });
    }
  }
);

export default router;