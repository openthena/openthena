import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";

/**
 * OpenThena's LiteLLM-style gateway.
 *
 * A single, OpenAI-format interface to every model OpenThena can talk to.
 * Providers are described declaratively in the registry below, so swapping
 * the "brain" is a one-line change (or a single environment variable).
 *
 * Resolution order for credentials/endpoint:
 *   1. If LITELLM_BASE_URL is set, route ALL traffic through that proxy
 *      (run the real LiteLLM proxy and OpenThena becomes a thin client).
 *   2. Otherwise, talk to the provider directly using its own base URL + key.
 */

type ProviderConfig = {
  /** OpenAI-compatible base URL for the provider. */
  baseURL: string;
  /** Name of the env var holding the provider's API key. */
  apiKeyEnv: string;
};

const PROVIDERS = {
  mimo: {
    baseURL: process.env.MIMO_BASE_URL ?? "https://api.xiaomimimo.com/v1",
    apiKeyEnv: "MIMO_API_KEY",
  },
} satisfies Record<string, ProviderConfig>;

type ProviderId = keyof typeof PROVIDERS;

/** Registry of model id -> provider + upstream model name. */
const MODEL_REGISTRY: Record<string, { provider: ProviderId; model: string }> =
  {
    "mimo-v2.5-pro": { provider: "mimo", model: "mimo-v2.5-pro" },
    "mimo-v2-pro": { provider: "mimo", model: "mimo-v2-pro" },
    "mimo-v2-flash": { provider: "mimo", model: "mimo-v2-flash" },
  };

export const DEFAULT_MODEL_ID = process.env.MIMO_MODEL ?? "mimo-v2.5-pro";

/** Whether an optional LiteLLM proxy should intercept all traffic. */
function litellmProxy(): { baseURL: string; apiKey: string } | null {
  const baseURL = process.env.LITELLM_BASE_URL;
  if (!baseURL) return null;
  return { baseURL, apiKey: process.env.LITELLM_API_KEY ?? "" };
}

/**
 * Resolve a friendly model id into a configured AI-SDK language model.
 * Throws a clear error if the requested model or its key is missing.
 */
export function getModel(id: string): LanguageModelV1 {
  const entry = MODEL_REGISTRY[id] ?? MODEL_REGISTRY[DEFAULT_MODEL_ID];
  if (!entry) {
    throw new Error(`Unknown model "${id}" and no default is configured.`);
  }

  const proxy = litellmProxy();
  const provider = PROVIDERS[entry.provider];

  const baseURL = proxy?.baseURL ?? provider.baseURL;
  const apiKey = proxy?.apiKey ?? process.env[provider.apiKeyEnv] ?? "";

  if (!apiKey) {
    throw new Error(
      `Missing API key. Set ${provider.apiKeyEnv} (or LITELLM_API_KEY) in your environment.`,
    );
  }

  const client = createOpenAI({
    baseURL,
    apiKey,
    // The MiMo / LiteLLM endpoints are strict OpenAI-compatible chat APIs.
    compatibility: "compatible",
    name: "openthena-gateway",
  });

  return client(entry.model);
}

/** Returns true when a usable upstream key/proxy is configured. */
export function isConfigured(): boolean {
  if (process.env.LITELLM_BASE_URL) return true;
  return Object.values(PROVIDERS).some((p) => Boolean(process.env[p.apiKeyEnv]));
}

export const DEFAULT_SYSTEM_PROMPT =
  process.env.OPENTHENA_SYSTEM_PROMPT ??
  `You are OpenThena, an open-source, privacy-first AI assistant.
You are helpful, precise, and friendly. Format answers in Markdown, and use fenced code blocks with language hints for any code.
You never store user data; if asked about privacy, remind users their chats stay only on their device.

About the OpenThena project:
- OpenThena is an open-source, privacy-first AI assistant. Conversations are never stored on a server — history lives only in the user's browser. It is powered by a LiteLLM-style gateway with the Xiaomi MiMo model and is MIT-licensed.
- Website: https://www.openthena.com · X: https://x.com/openthena

About the $OPENTHENA token:
- Ticker: $OPENTHENA
- Network: Base (an Ethereum Layer 2)
- Contract address: 0x6b12484f34e34910eac27478f321b6c7bf0b5ba3
- It was launched via @bankrbot (https://x.com/bankrbot) on X.
- The token's utility / use case will be announced later. If asked what it does, say the use case is to be announced and point users to the official X account (@openthena) for updates.
- When discussing the token, share the verified details above accurately. Do not invent a price, market cap, supply, roadmap, or use case that has not been officially announced. This is general information, not financial advice — remind users to do their own research and to verify the contract address from official channels.`;

