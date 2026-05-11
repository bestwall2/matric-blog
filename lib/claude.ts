import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-20250514";

export function getAnthropicClient() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("Missing ANTHROPIC_API_KEY");
  return new Anthropic({ apiKey: key });
}

export async function callClaudeJson(params: {
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<string> {
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: params.maxTokens ?? 8192,
    system: params.system,
    messages: [{ role: "user", content: params.user }],
  });
  const block = response.content[0];
  if (!block || block.type !== "text") {
    throw new Error("Unexpected Claude response shape");
  }
  return block.text.trim();
}

export function parseJsonLoose<T>(raw: string): T {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(cleaned) as T;
}
