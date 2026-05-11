export const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta";
export const GEMINI_MODEL =
  process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

export function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("Missing GEMINI_API_KEY");
  return key;
}

export async function callGeminiJson(params: {
  system: string;
  user: string;
  maxOutputTokens?: number;
}): Promise<string> {
  const res = await fetch(
    `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${getGeminiApiKey()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: params.system }],
        },
        contents: [
          {
            parts: [{ text: params.user }],
          },
        ],
        generationConfig: {
          maxOutputTokens: params.maxOutputTokens ?? 4096,
          temperature: 0.7,
        },
      }),
    }
  );

  const json = (await res.json()) as Record<string, unknown>;

  if (!res.ok) {
    const msg =
      (json as { error?: { message?: string } })?.error?.message ||
      `Gemini error (${res.status})`;
    throw new Error(msg);
  }

  type Candidate = {
    content?: { parts?: { text?: string }[] };
  };

  const candidates = json.candidates as Candidate[] | undefined;
  const text = candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) throw new Error("Empty Gemini response");
  return text;
}

export function parseJsonLoose<T>(raw: string): T {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(cleaned) as T;
}
