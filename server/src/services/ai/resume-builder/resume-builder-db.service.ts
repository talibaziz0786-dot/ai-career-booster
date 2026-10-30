import ResumeBuilder from "../../../models/resume-builder.model.js";

export async function saveResumeVersion(
  userId: string,
  content: unknown,
  language: string
) {
  if (!userId?.trim()) {
    throw new Error(
      "User ID is required to save resume."
    );
  }

  if (
    content === null ||
    content === undefined
  ) {
    throw new Error(
      "Resume content is required."
    );
  }

  const normalizedLanguage =
    language?.trim().toLowerCase() ||
    "english";

  const latest =
    await ResumeBuilder.findOne({
      user: userId,
    })
      .sort({
        version: -1,
      })
      .select("version")
      .lean();

  const version =
    latest?.version
      ? latest.version + 1
      : 1;

  const resume =
    await ResumeBuilder.create({
      user: userId,
      version,
      title: `AI Resume v${version}`,
      language: normalizedLanguage,
      content,
    });

  return resume;
}

export async function getResumeVersions(
  userId: string
) {
  return ResumeBuilder.find({
    user: userId,
  }).sort({
    version: -1,
    createdAt: -1,
  });
}

export async function getResumeVersion(
  userId: string,
  version: number
) {
  return ResumeBuilder.findOne({
    user: userId,
    version,
  });
}