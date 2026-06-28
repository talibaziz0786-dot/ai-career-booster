import { useEffect, useState } from "react";

import { api }
from "../lib/axios";

export default function InterviewHistoryPage() {

  const [sessions,
    setSessions] =
      useState([]);

  useEffect(() => {

    const fetchHistory =
      async () => {

        const response =
          await api.get(
            "/api/interview-session/my-history"
          );

        setSessions(
          response.data.sessions
        );
      };

    fetchHistory();

  }, []);

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1
        className="
        text-5xl
        font-black
        mb-10
      "
      >
        Interview History
      </h1>

      <div
        className="
        grid
        gap-6
      "
      >
        {sessions.map(
          (session: any) => (

            <div
              key={session._id}
              className="
              p-6
              rounded-3xl
              border
            "
            >

              <h2
                className="
                text-2xl
                font-bold
              "
              >
                {session.category}
              </h2>

              <p>
                Overall Score:
                {" "}
                {session.overallScore}
              </p>

              <p>
                Technical:
                {" "}
                {session.technicalScore}
              </p>

              <p>
                Communication:
                {" "}
                {session.communicationScore}
              </p>

              <p>
                Confidence:
                {" "}
                {session.confidenceScore}
              </p>

            </div>

          )
        )}
      </div>

    </div>

  );
}