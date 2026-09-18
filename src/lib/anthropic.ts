import Anthropic from "@anthropic-ai/sdk";

export const DEFAULT_ANTHROPIC_MODEL = "claude-sonnet-5";

export function getConfiguredModel() {
  return process.env.ANTHROPIC_MODEL ?? DEFAULT_ANTHROPIC_MODEL;
}

export function resolveModelId(model?: string) {
  const configured = model ?? getConfiguredModel();
  if (process.env.OPENROUTER_API_KEY && !configured.includes("/")) {
    return `anthropic/${configured}`;
  }
  return configured;
}

export function getAnthropic() {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const apiKey = openRouterKey ?? anthropicKey;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY (or ANTHROPIC_API_KEY) is not configured.");
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://www.bhytesoftware.com";

  return new Anthropic({
    apiKey,
    ...(openRouterKey
      ? {
          baseURL: "https://openrouter.ai/api",
          defaultHeaders: {
            "HTTP-Referer": origin,
            "X-Title": "Bhyte Invoice Dashboard",
          },
        }
      : {}),
    timeout: 30_000,
    maxRetries: 1,
  });
}
