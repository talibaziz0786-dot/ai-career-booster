export async function getDashboardData(userId: string) {
  // Abhi temporary data.
  // Agle commits me MongoDB aggregation se replace karenge.

  return {
    analytics: {
      resumeCount: 0,
      applications: 0,
      interviews: 0,
      atsAverage: 0,
    },

    resumeGrowth: [],

    ats: {
      score: 0,
      status: "No Resume",
      matchedKeywords: 0,
      missingKeywords: 0,
    },

    profile: {
      completion: 0,
    },

    subscription: {
      plan: "Free",
      daysLeft: 0,
    },

    usage: {
      resumeToday: 0,
      interviewToday: 0,
      atsToday: 0,
    },

    jobTracker: {
      saved: 0,
      applied: 0,
      interviews: 0,
    },

    activity: [],

    career: {
      careerScore: 0,
      hiringProbability: 0,
      recruiterReadiness: 0,
    },

    aiInsight: {
      title: "Welcome",
      message:
        "Start using CareerBoost AI to generate insights.",
    },
  };
}