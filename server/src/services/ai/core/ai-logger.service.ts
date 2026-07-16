export interface AILogEntry {

  module: string;

  provider: string;

  success: boolean;

  latency: number;

  retries: number;

  timestamp: string;

  error?: string;

}

const logs: AILogEntry[] = [];

export function logAIRequest(
  entry: AILogEntry
) {

  logs.unshift(entry);

  if (logs.length > 500) {

    logs.pop();

  }

}

export function getAILogs() {

  return logs;

}

export function clearAILogs() {

  logs.length = 0;

}