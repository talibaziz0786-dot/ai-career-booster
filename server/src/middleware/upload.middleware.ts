import crypto from "crypto";
import multer from "multer";
import path from "path";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".txt",
];

function safeExtension(
  originalname: string
) {
  return path
    .extname(path.basename(originalname))
    .toLowerCase();
}

const storage = multer.diskStorage({
  destination: "uploads/",

  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${crypto
        .randomUUID()}${safeExtension(
        file.originalname
      )}`
    );
  },
});

export const upload = multer({
  storage,

  fileFilter(req, file, cb) {
    const ext = safeExtension(
      file.originalname
    );

    if (
      ALLOWED_EXTENSIONS.includes(ext)
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