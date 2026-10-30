import type {
  ResumeData,
  ResumeVersion,
} from "../store/resume-store";

const STORAGE_KEY =
  "careerboost-resume-history";

const MAX_HISTORY_VERSIONS = 10;

/*
 * Keep a controlled localStorage budget.
 *
 * We intentionally stay below the browser's
 * typical localStorage limit.
 */
const MAX_STORAGE_BYTES =
  3.5 * 1024 * 1024;

export interface LocalResumeVersion
  extends ResumeVersion {
  content: ResumeData;
  createdAt: string;
  updatedAt: string;
}

function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function calculateBytes(
  value: unknown
): number {
  return new Blob([
    JSON.stringify(value),
  ]).size;
}

function normalizeHistory(
  value: unknown
): LocalResumeVersion[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is LocalResumeVersion =>
      Boolean(
        item &&
        typeof item === "object" &&
        typeof item._id === "string" &&
        typeof item.title === "string" &&
        typeof item.version === "number" &&
        typeof item.updatedAt === "string" &&
        typeof item.createdAt === "string" &&
        item.content &&
        typeof item.content === "object"
      )
  );
}

function readHistory(): LocalResumeVersion[] {
  try {
    const raw =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return [];
    }

    return normalizeHistory(
      JSON.parse(raw)
    );
  } catch (error) {
    console.error(
      "Failed to read resume history:",
      error
    );

    return [];
  }
}

function writeHistory(
  history: LocalResumeVersion[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function getResumeHistory(): LocalResumeVersion[] {
  return readHistory();
}

export function getResumeHistoryById(
  id: string
): LocalResumeVersion | null {
  const history =
    readHistory();

  return (
    history.find(
      (resume) =>
        resume._id === id
    ) ?? null
  );
}

export function saveResumeSnapshot(
  data: ResumeData
): LocalResumeVersion {
  const existing =
    readHistory();

  const nextVersion =
    existing.length > 0
      ? Math.max(
          ...existing.map(
            (resume) =>
              resume.version
          )
        ) + 1
      : 1;

  const now =
    new Date().toISOString();

  /*
   * IMPORTANT:
   *
   * This is a COMPLETE resume snapshot.
   *
   * Personal information
   * Education
   * Experience
   * Projects
   * Skills
   * Photo
   * etc.
   *
   * Everything is restored exactly
   * when this version is opened.
   */
  const snapshot: LocalResumeVersion = {
    _id: generateId(),

    title:
      data.fullName?.trim()
        ? `${data.fullName.trim()} Resume`
        : "AI Resume",

    version: nextVersion,

    createdAt: now,

    updatedAt: now,

    content: {
      ...data,
    },
  };

  let updatedHistory = [
    snapshot,
    ...existing,
  ];

  /*
   * Keep maximum history versions.
   *
   * Do NOT silently delete old versions.
   */
  if (
    updatedHistory.length >
    MAX_HISTORY_VERSIONS
  ) {
    updatedHistory =
      updatedHistory.slice(
        0,
        MAX_HISTORY_VERSIONS
      );
  }

  const requiredBytes =
    calculateBytes(
      updatedHistory
    );

  if (
    requiredBytes >
    MAX_STORAGE_BYTES
  ) {
    throw new ResumeHistoryStorageError(
      "RESUME_HISTORY_STORAGE_LIMIT"
    );
  }

  try {
    writeHistory(
      updatedHistory
    );
  } catch (error) {
    console.error(
      "Failed to save resume history:",
      error
    );

    throw new ResumeHistoryStorageError(
      "RESUME_HISTORY_STORAGE_LIMIT"
    );
  }

  return snapshot;
}

export function deleteResumeSnapshot(
  id: string
): boolean {
  const history =
    readHistory();

  const updated =
    history.filter(
      (resume) =>
        resume._id !== id
    );

  if (
    updated.length ===
    history.length
  ) {
    return false;
  }

  writeHistory(updated);

  return true;
}

export function deleteOldestResumeSnapshot():
  LocalResumeVersion | null {
  const history =
    readHistory();

  if (history.length === 0) {
    return null;
  }

  /*
   * Newest version is index 0.
   * Oldest version is the last item.
   */
  const oldest =
    history[
      history.length - 1
    ];

  const updated =
    history.slice(0, -1);

  writeHistory(updated);

  return oldest;
}

export function clearResumeHistory(): void {
  localStorage.removeItem(
    STORAGE_KEY
  );
}

export function getResumeHistoryStorageInfo() {
  const history =
    readHistory();

  const bytes =
    calculateBytes(history);

  return {
    versions:
      history.length,

    maxVersions:
      MAX_HISTORY_VERSIONS,

    bytes,

    maxBytes:
      MAX_STORAGE_BYTES,

    usagePercent:
      Math.min(
        100,
        Math.round(
          (bytes /
            MAX_STORAGE_BYTES) *
            100
        )
      ),

    storageLimitReached:
      bytes >=
      MAX_STORAGE_BYTES,
  };
}

export class ResumeHistoryStorageError
  extends Error {
  code:
    | "RESUME_HISTORY_STORAGE_LIMIT";

  constructor(
    code:
      | "RESUME_HISTORY_STORAGE_LIMIT"
  ) {
    super(
      "Resume history storage limit reached."
    );

    this.name =
      "ResumeHistoryStorageError";

    this.code = code;
  }
}