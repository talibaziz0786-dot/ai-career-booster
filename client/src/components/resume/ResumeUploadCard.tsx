import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

import ResumeUploadProgress from "./ResumeUploadProgress";
import { useResumeUpload } from "../../hooks/useResumeUpload";

export default function ResumeUploadCard() {
  const {
    loading,
    progress,
    status,
    uploadResume,
  } = useResumeUpload();

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 1,

    accept: {
      "application/pdf": [".pdf"],

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],

      "text/plain": [".txt"],
    },

    onDrop: async (files) => {
      if (files.length) {
        await uploadResume(files[0]);
      }
    },
  });

  return (
    <div {...getRootProps()}>

      <input {...getInputProps()} />

      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
        cursor-pointer
        rounded-3xl
        border-2
        border-dashed
        border-cyan-400
        bg-white
        p-12
        text-center
        shadow-xl
        dark:bg-slate-900
        "
      >
        <div className="text-6xl">
          📄
        </div>

        <h2 className="mt-6 text-3xl font-bold">
          Upload Resume
        </h2>

        <p className="mt-3 text-slate-500">
          Drag & Drop PDF, DOCX or TXT
        </p>

        {loading && (
          <ResumeUploadProgress
            progress={progress}
            status={status}
          />
        )}
      </motion.div>

    </div>
  );
}