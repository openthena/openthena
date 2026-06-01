import {
  ShieldCheck,
  GitBranch,
  Network,
  BrainCircuit,
  Zap,
  Server,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "OpenThena",
  domain: "www.openthena.com",
  url: "https://www.openthena.com",
  tagline: "The open-source, privacy-first AI assistant.",
  description:
    "OpenThena is an open-source, privacy-first AI assistant. Powered by a LiteLLM-style gateway with the Xiaomi MiMo brain, it streams answers without storing your conversations on any server.",
  // Social — X only, per brand guidelines.
  x: "https://x.com/openthena",
  github: "https://github.com/yusmandediyogi-wq/openthena",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Privacy", href: "/#privacy" },
  { label: "Docs", href: "/docs" },
] as const;

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    description:
      "No accounts, no tracking, no server-side logs. Conversations live only in your browser and never touch a database.",
  },
  {
    icon: GitBranch,
    title: "Fully open source",
    description:
      "Every line is MIT-licensed and auditable. Fork it, self-host it, and verify exactly what runs on your data.",
  },
  {
    icon: Network,
    title: "LiteLLM-style gateway",
    description:
      "A unified, OpenAI-format gateway routes to any model. Swap providers with a single environment variable.",
  },
  {
    icon: BrainCircuit,
    title: "Xiaomi MiMo brain",
    description:
      "Reasoning powered by MiMo v2.5 — fast, capable, and multilingual — with room to plug in any model you trust.",
  },
  {
    icon: Zap,
    title: "Real-time streaming",
    description:
      "Answers stream token-by-token over the edge, so you read the response as it is being written.",
  },
  {
    icon: Server,
    title: "Deploy anywhere",
    description:
      "One-click to Vercel or self-host the whole stack. No vendor lock-in, no hidden telemetry.",
  },
];

export const STEPS = [
  {
    title: "Ask anything",
    description:
      "Type your prompt. Nothing is written to a server log — your message goes straight to the model gateway.",
  },
  {
    title: "The gateway routes it",
    description:
      "OpenThena's LiteLLM-style gateway forwards your request, in OpenAI format, to the Xiaomi MiMo brain on the edge.",
  },
  {
    title: "Stream & forget",
    description:
      "The answer streams back instantly and is stored only in your browser. Close the tab to wipe the slate clean.",
  },
];

export const FAQS = [
  {
    q: "Is OpenThena really private?",
    a: "Yes. There is no database and no authentication. Your conversations are kept in your browser's local storage only. The API route is stateless and writes no logs — it simply forwards your request to the model and streams the answer back.",
  },
  {
    q: "What model powers OpenThena?",
    a: "By default the brain is Xiaomi MiMo (mimo-v2.5-pro), accessed through an OpenAI-compatible endpoint. Because the gateway is provider-agnostic, you can point it at any model — including a self-hosted LiteLLM proxy — by changing one environment variable.",
  },
  {
    q: "What does \"LiteLLM-style gateway\" mean?",
    a: "LiteLLM provides a single, unified OpenAI-format interface to 100+ models. OpenThena embraces that philosophy: a thin gateway layer normalizes every provider behind one interface, so switching models never touches your UI code. You can also run the real LiteLLM proxy and route OpenThena through it.",
  },
  {
    q: "Can I self-host it?",
    a: "Absolutely. The project is MIT-licensed. Clone the repo, set your API key, and run it locally or deploy to Vercel in a single click. The docs include a full self-hosting guide, including an optional LiteLLM proxy setup.",
  },
  {
    q: "Do you use cookies or analytics?",
    a: "No third-party analytics, no advertising cookies, no fingerprinting. The only data stored is your chat history — and that lives exclusively on your device.",
  },
];

export const MODELS = [
  { id: "mimo-v2.5-pro", label: "MiMo v2.5 Pro", hint: "Flagship reasoning" },
  { id: "mimo-v2-pro", label: "MiMo v2 Pro", hint: "Balanced" },
  { id: "mimo-v2-flash", label: "MiMo v2 Flash", hint: "Fastest" },
] as const;

export type ModelId = (typeof MODELS)[number]["id"];
export const DEFAULT_MODEL: ModelId = "mimo-v2.5-pro";

export const PROMPT_SUGGESTIONS = [
  "Explain zero-knowledge proofs like I'm five.",
  "Write a Python function to debounce events.",
  "Draft a privacy-first cookie policy.",
  "Summarize the trade-offs of edge vs serverless.",
];
