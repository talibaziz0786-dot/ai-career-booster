import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getResumeHistory,
  getResumeHistoryById,
  deleteResumeSnapshot,
  deleteOldestResumeSnapshot,
  getResumeHistoryStorageInfo,
} from "../../services/resume-history.service";



import {
  useResumeStore,
} from "../../store/resume-store";

export default function ResumeHistory() {
  const {
    resumeList,
    setResumeList,
    loadResume,
    setAIResume,
  } = useResumeStore();

  const [
    storage,
    setStorage,
  ] = useState(
    getResumeHistoryStorageInfo()
  );

  const loadHistory =
    useCallback(() => {
      const history =
        getResumeHistory();

      setResumeList(
        history.map(
          (resume) => ({
            _id: resume._id,
            title: resume.title,
            version: resume.version,
            updatedAt:
              resume.updatedAt,
          })
        )
      );

      setStorage(
        getResumeHistoryStorageInfo()
      );
    }, [setResumeList]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  function handleOpenResume(
    id: string
  ) {
    const resume =
      getResumeHistoryById(id);

    if (!resume) {
      alert(
        "Resume version could not be found."
      );

      loadHistory();

      return;
    }

    /*
     * Restore the COMPLETE snapshot.
     */
    loadResume(
      resume.content
    );

    setAIResume(
      resume.content
    );
  }

  function handleDeleteResume(
    id: string
  ) {
    const resume =
      getResumeHistoryById(id);

    if (!resume) {
      loadHistory();
      return;
    }

    const confirmed =
      window.confirm(
        `Delete Version ${resume.version} permanently?\n\nThis saved resume snapshot will be removed from this device.`
      );

    if (!confirmed) {
      return;
    }

    const deleted =
      deleteResumeSnapshot(id);

    if (!deleted) {
      alert(
        "Resume version could not be deleted."
      );

      return;
    }

    loadHistory();
  }

  function handleDeleteOldest() {
    const oldest =
      getResumeHistory().at(-1);

    if (!oldest) {
      alert(
        "There are no resume versions to delete."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Storage is getting full.\n\nDelete the oldest Version ${oldest.version}?`
      );

    if (!confirmed) {
      return;
    }

    const deleted =
      deleteOldestResumeSnapshot();

    if (!deleted) {
      alert(
        "There are no resume versions to delete."
      );

      return;
    }

    loadHistory();

    alert(
      `Version ${deleted.version} was removed successfully.`
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        dark:border-white/10
        dark:bg-slate-900
      "
    >
      <div className="mb-5">
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Resume History
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Your saved resume versions are
          stored locally on this device.
        </p>

        <p
          className="
            mt-2
            text-xs
            text-slate-400
          "
        >
          {storage.versions} of{" "}
          {storage.maxVersions} versions
          {" • "}
          {storage.usagePercent}%
          local storage used
        </p>
      </div>

      {storage.usagePercent >= 80 && (
        <div
          className="
            mb-5
            rounded-xl
            border
            border-amber-300
            bg-amber-50
            p-4

            dark:border-amber-500/30
            dark:bg-amber-500/10
          "
        >
          <p
            className="
              font-semibold
              text-amber-800
              dark:text-amber-300
            "
          >
            Resume History storage
            is getting full.
          </p>

          <p
            className="
              mt-1
              text-sm
              text-amber-700
              dark:text-amber-400
            "
          >
            Delete an older version
            to make space for new
            resume snapshots.
          </p>

          {storage.versions > 0 && (
            <button
              type="button"
              onClick={
                handleDeleteOldest
              }
              className="
                mt-3
                rounded-lg
                bg-amber-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-amber-700
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500
                focus:ring-offset-2
              "
            >
              Delete Oldest Version
            </button>
          )}
        </div>
      )}

      <div className="space-y-3">
        {resumeList.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-300
              p-6
              text-center

              dark:border-white/10
            "
          >
            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              No saved resumes yet.
            </p>
          </div>
        )}

        {resumeList.map(
          (resume) => (
            <div
              key={resume._id}
              className="
                rounded-xl
                border
                border-slate-200
                p-4
                transition-all

                hover:border-blue-400
                hover:shadow-md

                dark:border-white/10
                dark:hover:border-blue-400/50
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    handleOpenResume(
                      resume._id
                    )
                  }
                  className="
                    min-w-0
                    flex-1
                    text-left
                  "
                >
                  <h3
                    className="
                      truncate
                      font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {resume.title ||
                      "AI Resume"}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Version{" "}
                    {resume.version}
                    {" • "}
                    {new Date(
                      resume.updatedAt
                    ).toLocaleString()}
                  </p>
                </button>

                <button
                  type="button"
                  aria-label={`Delete resume version ${resume.version}`}
                  onClick={() =>
                    handleDeleteResume(
                      resume._id
                    )
                  }
                  className="
                    shrink-0
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-red-600
                    transition

                    hover:bg-red-50

                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500

                    dark:text-red-400
                    dark:hover:bg-red-500/10
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}