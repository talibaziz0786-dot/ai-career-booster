import Resume, {
  type IResume,
} from "../../models/resume.model.js";

export async function createResume(
  userId: string,
  data: Partial<IResume>
) {
  return await Resume.create({
    ...(data as object),
    user: userId,
  });
}

export async function getUserResumes(
  userId: string
) {
  return await Resume.find({
    user: userId,
    isDeleted: false,
  }).sort({
    updatedAt: -1,
  });
}

export async function getResumeById(
  userId: string,
  resumeId: string
) {
  return await Resume.findById(resumeId).where({
    user: userId,
    isDeleted: false,
  });
}

export async function updateResume(
  userId: string,
  resumeId: string,
  data: Partial<IResume>
) {
  return await Resume.findByIdAndUpdate(
    resumeId,
    {
      ...(data as object),
    },
    {
      new: true,
    }
  ).where({
    user: userId,
    isDeleted: false,
  });
}

export async function deleteResume(
  userId: string,
  resumeId: string
) {
  return await Resume.findByIdAndUpdate(
    resumeId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  ).where({
    user: userId,
    isDeleted: false,
  });
}