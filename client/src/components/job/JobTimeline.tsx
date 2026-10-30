import {
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import type {
  JobItem,
} from "../../types/job/job.types";

interface Props {
  timeline: JobItem["timeline"];
}

export default function JobTimeline({
  timeline,
}: Props) {
  if (!timeline.length) {
    return (
      <div
        className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        p-8
        text-center

        dark:border-slate-700
        "
      >
        <CalendarDays
          className="
          mx-auto
          mb-4
          text-slate-400
          "
          size={36}
        />

        <h3
          className="
          text-lg
          font-bold
          "
        >
          No Timeline Yet
        </h3>

        <p
          className="
          mt-2
          text-sm
          text-slate-500
          "
        >
          Timeline events will appear
          here as your application
          progresses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {timeline.map(
        (item, index) => (
          <div
            key={index}
            className="
            flex
            gap-4
            "
          >
            <div
              className="
              flex
              flex-col
              items-center
              "
            >
              <div
                className="
                rounded-full
                bg-cyan-500
                p-2
                text-white
                "
              >
                <CheckCircle2
                  size={16}
                />
              </div>

              {index !==
                timeline.length -
                  1 && (
                <div
                  className="
                  mt-1
                  h-full
                  w-px
                  bg-slate-300

                  dark:bg-slate-700
                  "
                />
              )}
            </div>

            <div
              className="
              flex-1
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4

              dark:border-slate-800
              dark:bg-slate-900
              "
            >
              <div
                className="
                flex
                items-center
                justify-between
                "
              >
                <h4
                  className="
                  font-semibold
                  "
                >
                  {item.title}
                </h4>

                <span
                  className="
                  text-xs
                  text-slate-500
                  "
                >
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              {item.description && (
                <p
                  className="
                  mt-2
                  text-sm
                  text-slate-500
                  "
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}