export const GROK_BASE_URL = "https://api.x.ai/v1";
export const GROK_MODEL = process.env.GROK_MODEL?.trim() || "grok-4.3";

export function getXaiApiKey() {
  const key = process.env.XAI_API_KEY?.trim();
  if (!key) throw new Error("Missing XAI_API_KEY");
  return key;
}

export async function callGrokJson(params: {
  system: string;
  user: string;
  maxOutputTokens?: number;
}): Promise<string> {
  const res = await fetch(`${GROK_BASE_URL}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getXaiApiKey()}`,
    },
    body: JSON.stringify({
      model: GROK_MODEL,
      store: false,
      max_output_tokens: params.maxOutputTokens ?? 4096,
      input: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
    }),
  });

  const json = (await res.json()) as unknown;
  const errMsg = pickErrorMessage(json);
  if (!res.ok) {
    throw new Error(errMsg || `xAI error (${res.status})`);
  }

  const output = readArray((json as Record<string, unknown>)?.output);
  const message = output.find(
    (o) => isRecord(o) && o.type === "message"
  ) as Record<string, unknown> | undefined;
  const content = readArray(message?.content);
  const text = content
    .filter(
      (c) =>
        isRecord(c) &&
        c.type === "output_text" &&
        typeof c.text === "string"
    )
    .map((c) => (c as Record<string, unknown>).text as string)
    .join("")
    .trim();

  if (!text) throw new Error("Empty Grok response");
  return text;
}

export function parseJsonLoose<T>(raw: string): T {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(cleaned) as T;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function readArray(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

function pickErrorMessage(json: unknown): string | null {
  if (!isRecord(json)) return null;
  const err = json.error;
  if (typeof err === "string") return err;
  if (isRecord(err) && typeof err.message === "string") return err.message;
  return null;
}

