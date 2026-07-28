export type TokenUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
};

export type ConversationUsage = TokenUsage & {
  totalTokens: number;
  costUsd: number;
  model: string;
};

const MODEL_PRICING_USD_PER_MTOK = {
  "claude-sonnet-5": { input: 3, output: 15, cacheWrite: 3.75, cacheRead: 0.3 },
  "claude-sonnet-4-20250514": { input: 3, output: 15, cacheWrite: 3.75, cacheRead: 0.3 },
  "claude-3-5-sonnet-20241022": { input: 3, output: 15, cacheWrite: 3.75, cacheRead: 0.3 },
} as const;

function pricingForModel(model: string) {
  const envInput = Number(process.env.ANTHROPIC_INPUT_PRICE_PER_MTOK);
  const envOutput = Number(process.env.ANTHROPIC_OUTPUT_PRICE_PER_MTOK);
  if (Number.isFinite(envInput) && Number.isFinite(envOutput) && envInput >= 0 && envOutput >= 0) {
    return {
      input: envInput,
      output: envOutput,
      cacheWrite: envInput,
      cacheRead: envInput * 0.1,
    };
  }

  const known = MODEL_PRICING_USD_PER_MTOK[model as keyof typeof MODEL_PRICING_USD_PER_MTOK];
  return known ?? { input: 3, output: 15, cacheWrite: 3.75, cacheRead: 0.3 };
}

export function emptyUsage(model: string): ConversationUsage {
  return {
    inputTokens: 0,
    outputTokens: 0,
    cacheCreationInputTokens: 0,
    cacheReadInputTokens: 0,
    totalTokens: 0,
    costUsd: 0,
    model,
  };
}

export function mergeUsage(current: ConversationUsage | null | undefined, delta: TokenUsage, model: string): ConversationUsage {
  const base = current ?? emptyUsage(model);
  const merged: TokenUsage = {
    inputTokens: base.inputTokens + delta.inputTokens,
    outputTokens: base.outputTokens + delta.outputTokens,
    cacheCreationInputTokens: base.cacheCreationInputTokens + delta.cacheCreationInputTokens,
    cacheReadInputTokens: base.cacheReadInputTokens + delta.cacheReadInputTokens,
  };

  return finalizeUsage(merged, model);
}

export function finalizeUsage(usage: TokenUsage, model: string): ConversationUsage {
  const pricing = pricingForModel(model);
  const costUsd =
    (usage.inputTokens / 1_000_000) * pricing.input
    + (usage.outputTokens / 1_000_000) * pricing.output
    + (usage.cacheCreationInputTokens / 1_000_000) * pricing.cacheWrite
    + (usage.cacheReadInputTokens / 1_000_000) * pricing.cacheRead;

  return {
    ...usage,
    totalTokens: usage.inputTokens + usage.outputTokens + usage.cacheCreationInputTokens + usage.cacheReadInputTokens,
    costUsd: Math.round(costUsd * 1_000_000) / 1_000_000,
    model,
  };
}

export function formatUsageCost(costUsd: number) {
  if (costUsd >= 0.01) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(costUsd);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(costUsd);
}

export function formatTokenCount(tokens: number) {
  return new Intl.NumberFormat("en-US").format(tokens);
}
