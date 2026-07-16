import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",

  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  },
});

export const upload = multer({
  storage,

  fileFilter(req, file, cb) {
    const ext = path.extname(
      file.originalname
    );

    if (
      ext === ".pdf" ||
      ext === ".docx" ||
      ext === ".txt"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF DOCX TXT allowed."
        )
      );
    }
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});