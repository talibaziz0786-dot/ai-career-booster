import { useState } from "react";
import { api } from "../lib/axios";
import { useCareerProfileStore } from "../store/career-profile.store";

export function useResumeUpload() {

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [status, setStatus] =
    useState("");

    const { setProfile } =
  useCareerProfileStore();

  const uploadResume =
    async (
      file: File
    ) => {

      try {

        setLoading(true);

        setProgress(5);

        setStatus(
          "Uploading Resume..."
        );

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const response =
          await api.post(
            "/api/resume-upload",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },

              onUploadProgress:
                (event) => {

                  if (!event.total)
                    return;

                  const percent =
                    Math.round(
                      (event.loaded *
                        40) /
                        event.total
                    );

                  setProgress(
                    percent
                  );

                },
            }
          );


        setStatus(
          "Extracting Resume..."
        );

        setProgress(55);

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              700
            )
        );

        setStatus(
          "Analyzing Resume..."
        );

        setProgress(80);

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              800
            )
        );

       setProgress(100);

setStatus(
  "Completed"
);

/*
--------------------------------
Career Profile Store Update
--------------------------------
*/

const profile =
  response.data.profile ??
  response.data.analysis ??
  response.data.result ??
  null;

if (profile) {

  setProfile(profile);

}

return response.data;

      } finally {

        setLoading(false);

      }

    };

  return {

    loading,

    progress,

    status,

    uploadResume,

  };

}