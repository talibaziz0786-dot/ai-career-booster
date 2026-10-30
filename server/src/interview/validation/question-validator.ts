import type {
  InterviewHistoryItem,
} from "../history/interview-history.types.js";

const STOP_WORDS = new Set([
  "what",
  "is",
  "are",
  "the",
  "a",
  "an",
  "of",
  "to",
  "can",
  "you",
  "please",
  "explain",
  "describe",
  "tell",
  "about",
  "how",
  "why",
  "when",
  "where",
  "define",
  "in",
  "for",
  "your",
  "kya",
  "kaise",
  "kyun",
  "hai",
  "hota",
  "hoti",
  "karoge",
  "karenge",
  "agar",
  "basic",
]);

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 0 &&
        !STOP_WORDS.has(word)
    );
}

function similarity(
  a: string[],
  b: string[]
): number {
  const setA = new Set(a);
  const setB = new Set(b);

  const intersection =
    [...setA].filter((word) =>
      setB.has(word)
    );

  const union = new Set([
    ...setA,
    ...setB,
  ]);

  if (union.size === 0) {
    return 0;
  }

  return (
    intersection.length /
    union.size
  );
}

export function isDuplicateQuestion(
  question: string,
  history: InterviewHistoryItem[],
  threshold = 0.55
): boolean {
  const normalizedQuestion =
    normalize(question);

  return history.some((item) => {
    const score = similarity(
      normalizedQuestion,
      normalize(item.question)
    );

    return score >= threshold;
  });
}