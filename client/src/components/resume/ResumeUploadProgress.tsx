interface Props {

  progress: number;

  status: string;

}

export default function ResumeUploadProgress({

  progress,

  status,

}: Props) {

  return (

    <div className="mt-6">

      <div className="flex justify-between">

        <span>

          {status}

        </span>

        <span>

          {progress}%

        </span>

      </div>

      <div
        className="
        mt-3
        h-3
        overflow-hidden
        rounded-full
        bg-slate-200
        "
      >

        <div style={{
            width:
              `${progress}%`,
          }}
          className="
          h-full
          rounded-full
          bg-cyan-500
          transition-all
          duration-500
          "
        />

      </div>

    </div>

  );

}