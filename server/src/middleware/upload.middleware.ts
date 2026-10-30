import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "resumes"
  );

if (
  !fs.existsSync(uploadDirectory)
) {
  fs.mkdirSync(
    uploadDirectory,
    {
      recursive: true,
    }
  );
}

const storage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      cb
    ) => {
      cb(
        null,
        uploadDirectory
      );
    },

    filename: (
      _req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        ).toLowerCase();

      const baseName =
        path
          .basename(
            file.originalname,
            extension
          )
          .replace(
            /[^a-zA-Z0-9-_]/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          )
          .slice(0, 80);

      const uniqueSuffix =
        `${Date.now()}-${Math.round(
          Math.random() * 1_000_000
        )}`;

      cb(
        null,
        `${baseName}-${uniqueSuffix}${extension}`
      );
    },
  });

const allowedMimeTypes =
  new Set([
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/msword",
  ]);

const allowedExtensions =
  new Set([
    ".pdf",
    ".doc",
    ".docx",
  ]);

const fileFilter:
  multer.Options["fileFilter"] =
  (
    _req,
    file,
    cb
  ) => {
    const extension =
      path
        .extname(
          file.originalname
        )
        .toLowerCase();

    const mimeTypeAllowed =
      allowedMimeTypes.has(
        file.mimetype
      );

    const extensionAllowed =
      allowedExtensions.has(
        extension
      );

    if (
      !mimeTypeAllowed ||
      !extensionAllowed
    ) {
      return cb(
        new Error(
          "Only PDF, DOC, and DOCX resume files are allowed."
        )
      );
    }

    return cb(
      null,
      true
    );
  };

export const upload =
  multer({
    storage,

    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024,

      files: 1,
    },
  });