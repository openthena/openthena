import type { ReactNode } from "react";
import Link from "next/link";
import { CodeBlock, Callout } from "./DocsKit";
import { SITE } from "@/lib/constants";

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  body: ReactNode;
};

export type DocGroup = {
  title: string;
  pages: { slug: string; title: string }[];
};

/** Sidebar grouping. The first entry ("") is the docs index. */
export const DOC_GROUPS: DocGroup[] = [
  {
    title: "Getting started",
    pages: [
      { slug: "", title: "Introduction" },
      { slug: "quickstart", title: "Quickstart" },
    ],
  },
  {
    title: "Concepts",
    pages: [
      { slug: "architecture", title: "Architecture" },
      { slug: "providers", title: "Models & providers" },
      { slug: "privacy", title: "Privacy model" },
    ],
  },
  {
    title: "Guides",
    pages: [
      { slug: "self-hosting", title: "Self-hosting" },
      { slug: "deploy-vercel", title: "Deploy to Vercel" },
      { slug: "api-reference", title: "API reference" },
    ],
  },
  {
    title: "More",
    pages: [
      { slug: "faq", title: "FAQ" },
      { slug: "contributing", title: "Contributing" },
    ],
  },
];

const DocLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link href={`/docs/${to}`} className="text-brand underline underline-offset-2 hover:text-aurora-cyan">
    {children}
  </Link>
);

export const DOC_PAGES: Record<string, DocPage> = {
  "": {
    slug: "",
    title: "Introduction",
    description: "What OpenThena is and why it exists.",
    body: (
      <>
        <p>
          <strong>OpenThena</strong> is an open-source, privacy-first AI
          assistant. It pairs a beautiful streaming chat experience with a
          simple promise: <strong>your conversations are never stored on a
          server.</strong> There is no database, no account system, and no
          telemetry. Everything you type stays in your browser.
        </p>
        <p>
          Under the hood, OpenThena uses a <strong>LiteLLM-style gateway</strong>{" "}
          — a single, OpenAI-format interface to any model — with the{" "}
          <strong>Xiaomi MiMo</strong> model as its default brain. Because the
          gateway is provider-agnostic, you can swap the model with a single
          environment variable, or route everything through a real{" "}
          <DocLink to="self-hosting">LiteLLM proxy</DocLink>.
        </p>
        <h2>Highlights</h2>
        <ul>
          <li><strong>Zero-storage</strong> — stateless API, local-only history.</li>
          <li><strong>Open source</strong> — MIT licensed, fully auditable.</li>
          <li><strong>Streaming</strong> — token-by-token responses on the edge.</li>
          <li><strong>Portable</strong> — one-click deploy to Vercel or self-host.</li>
        </ul>
        <Callout tone="privacy">
          <strong>Privacy by architecture, not policy.</strong> OpenThena
          can&apos;t leak your chat history because it never has it. Read more in
          the <DocLink to="privacy">Privacy model</DocLink>.
        </Callout>
        <p>
          Ready to try it? Head to the{" "}
          <DocLink to="quickstart">Quickstart</DocLink>.
        </p>
      </>
    ),
  },

  quickstart: {
    slug: "quickstart",
    title: "Quickstart",
    description: "Run OpenThena locally in under five minutes.",
    body: (
      <>
        <p>
          You need <strong>Node.js 18+</strong> and a{" "}
          <strong>Xiaomi MiMo API key</strong> (grab one at{" "}
          <a href="https://platform.xiaomimimo.com" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">platform.xiaomimimo.com</a>).
        </p>
        <h2>1. Clone &amp; install</h2>
        <CodeBlock lang="bash">{`git clone ${SITE.github}.git
cd openthena
npm install`}</CodeBlock>
        <h2>2. Configure your key</h2>
        <p>Copy the example env file and add your MiMo key:</p>
        <CodeBlock lang="bash">{`cp .env.example .env.local`}</CodeBlock>
        <CodeBlock lang="bash">{`MIMO_API_KEY=your-xiaomi-mimo-api-key
MIMO_BASE_URL=https://api.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro`}</CodeBlock>
        <h2>3. Run it</h2>
        <CodeBlock lang="bash">{`npm run dev`}</CodeBlock>
        <p>
          Open <code>http://localhost:3000</code>, click{" "}
          <strong>Start chatting</strong>, and you&apos;re live.
        </p>
        <Callout tone="info">
          Nothing is configured server-side beyond your API key. The chat UI,
          history, and model selection all run in your browser.
        </Callout>
      </>
    ),
  },

  architecture: {
    slug: "architecture",
    title: "Architecture",
    description: "How requests flow through the gateway.",
    body: (
      <>
        <p>OpenThena is intentionally small. The request path is:</p>
        <CodeBlock lang="text">{`Browser (/chat)
   │  POST /api/chat  { messages, model }
   ▼
Edge route (stateless, no logging)
   │  getModel(id) → LiteLLM-style gateway
   ▼
Provider (Xiaomi MiMo  ·  OpenAI-compatible)
   │  streamed tokens
   ▼
Browser  ◀── token stream ──  (history saved to localStorage)`}</CodeBlock>
        <h2>The gateway</h2>
        <p>
          <code>src/lib/ai/gateway.ts</code> is the heart of the system. It
          holds a registry mapping friendly model ids to a provider and an
          upstream model name. <code>getModel(id)</code> returns a configured
          AI-SDK model. If <code>LITELLM_BASE_URL</code> is set, every request is
          routed through that proxy instead of the provider directly.
        </p>
        <CodeBlock lang="typescript">{`const MODEL_REGISTRY = {
  "mimo-v2.5-pro": { provider: "mimo", model: "mimo-v2.5-pro" },
  "mimo-v2-pro":   { provider: "mimo", model: "mimo-v2-pro" },
  "mimo-v2-flash": { provider: "mimo", model: "mimo-v2-flash" },
};`}</CodeBlock>
        <h2>The edge route</h2>
        <p>
          <code>src/app/api/chat/route.ts</code> runs on the edge. It validates
          the payload, calls <code>streamText()</code>, and returns a streamed
          response with <code>Cache-Control: no-store</code>. It writes
          <strong> nothing</strong> to any store.
        </p>
        <Callout tone="privacy">
          The server is a pure relay. There is no place in the code that
          persists a message.
        </Callout>
      </>
    ),
  },

  providers: {
    slug: "providers",
    title: "Models & providers",
    description: "Swap the brain with a single environment variable.",
    body: (
      <>
        <p>
          OpenThena speaks the OpenAI chat format, so any OpenAI-compatible
          endpoint works. The default brain is{" "}
          <strong>Xiaomi MiMo</strong>.
        </p>
        <h2>Default: Xiaomi MiMo</h2>
        <CodeBlock lang="bash">{`MIMO_API_KEY=...
MIMO_BASE_URL=https://api.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro`}</CodeBlock>
        <p>Available models in the UI selector:</p>
        <ul>
          <li><code>mimo-v2.5-pro</code> — flagship reasoning (default)</li>
          <li><code>mimo-v2-pro</code> — balanced</li>
          <li><code>mimo-v2-flash</code> — fastest</li>
        </ul>
        <h2>Adding another provider</h2>
        <p>
          Add an entry to <code>PROVIDERS</code> and <code>MODEL_REGISTRY</code>{" "}
          in <code>gateway.ts</code>. Because everything is OpenAI-format, no UI
          code changes.
        </p>
        <Callout tone="info">
          Want to centralize many providers, keys, budgets and rate limits? Put
          a real LiteLLM proxy in front of OpenThena — see{" "}
          <DocLink to="self-hosting">Self-hosting</DocLink>.
        </Callout>
      </>
    ),
  },

  privacy: {
    slug: "privacy",
    title: "Privacy model",
    description: "Why OpenThena can't leak what it never stores.",
    body: (
      <>
        <p>
          OpenThena&apos;s privacy is structural. These guarantees come from how
          the app is built, not from a promise in a policy document.
        </p>
        <h2>What we never do</h2>
        <ul>
          <li>No database — conversations are never persisted server-side.</li>
          <li>No accounts — there is nothing to sign up for.</li>
          <li>No server logs of message content.</li>
          <li>No analytics, fingerprinting, or advertising cookies.</li>
        </ul>
        <h2>Where your data lives</h2>
        <p>
          Your chat history is saved in your browser&apos;s{" "}
          <code>localStorage</code> under the key{" "}
          <code>openthena.conversations.v1</code>. It never leaves your device.
          Clearing a conversation — or your browser data — erases it
          permanently.
        </p>
        <Callout tone="privacy">
          <strong>The only network call</strong> with your message is the
          streaming request to the model provider you configured. OpenThena adds
          no logging in between.
        </Callout>
        <h2>A note on providers</h2>
        <p>
          Your prompts are sent to the upstream model (e.g. Xiaomi MiMo) to
          generate a response. Their data handling is governed by their terms.
          For maximum control, route through a self-hosted{" "}
          <DocLink to="self-hosting">LiteLLM proxy</DocLink> or a local model.
        </p>
      </>
    ),
  },

  "self-hosting": {
    slug: "self-hosting",
    title: "Self-hosting",
    description: "Run OpenThena — and optionally a LiteLLM proxy — yourself.",
    body: (
      <>
        <p>
          OpenThena is a standard Next.js app. Build it and run it anywhere Node
          runs.
        </p>
        <CodeBlock lang="bash">{`npm install
npm run build
npm run start   # serves on http://localhost:3000`}</CodeBlock>
        <h2>Optional: a real LiteLLM proxy</h2>
        <p>
          To centralize keys, budgets, and many providers, run the LiteLLM proxy
          and point OpenThena at it. A minimal{" "}
          <code>litellm.config.yaml</code> ships in the repo:
        </p>
        <CodeBlock lang="yaml">{`model_list:
  - model_name: mimo-v2.5-pro
    litellm_params:
      model: openai/mimo-v2.5-pro
      api_base: https://api.xiaomimimo.com/v1
      api_key: os.environ/MIMO_API_KEY`}</CodeBlock>
        <CodeBlock lang="bash">{`pip install "litellm[proxy]"
litellm --config litellm.config.yaml   # serves on :4000`}</CodeBlock>
        <p>Then tell OpenThena to use it:</p>
        <CodeBlock lang="bash">{`LITELLM_BASE_URL=http://localhost:4000/v1
LITELLM_API_KEY=sk-your-litellm-master-key`}</CodeBlock>
        <Callout tone="info">
          When <code>LITELLM_BASE_URL</code> is set, all model traffic flows
          through your proxy — OpenThena becomes a thin client.
        </Callout>
      </>
    ),
  },

  "deploy-vercel": {
    slug: "deploy-vercel",
    title: "Deploy to Vercel",
    description: "Ship OpenThena to production in minutes.",
    body: (
      <>
        <p>OpenThena is built for Vercel&apos;s edge runtime.</p>
        <h2>Steps</h2>
        <ul>
          <li>Push your fork to GitHub.</li>
          <li>Import the repo at <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">vercel.com/new</a>.</li>
          <li>Add the environment variables below.</li>
          <li>Deploy.</li>
        </ul>
        <h2>Environment variables</h2>
        <CodeBlock lang="bash">{`MIMO_API_KEY=your-xiaomi-mimo-api-key
MIMO_BASE_URL=https://api.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro`}</CodeBlock>
        <Callout tone="warn">
          Never commit real keys. Set them as Vercel Environment Variables (or
          GitHub Secrets) only.
        </Callout>
        <h2>Custom domain</h2>
        <p>
          Add <code>openthena.com</code> in your Vercel project&apos;s Domains
          tab and follow the DNS instructions Vercel provides (an A record to{" "}
          <code>76.76.21.21</code> or a CNAME to{" "}
          <code>cname.vercel-dns.com</code>).
        </p>
      </>
    ),
  },

  "api-reference": {
    slug: "api-reference",
    title: "API reference",
    description: "The single endpoint that powers the chat.",
    body: (
      <>
        <h2>POST /api/chat</h2>
        <p>Streams an assistant response for a list of messages.</p>
        <h2>Request body</h2>
        <CodeBlock lang="json">{`{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "model": "mimo-v2.5-pro"
}`}</CodeBlock>
        <ul>
          <li><code>messages</code> — required, non-empty array (max 50).</li>
          <li><code>model</code> — optional, defaults to <code>MIMO_MODEL</code>.</li>
        </ul>
        <h2>Response</h2>
        <p>
          A streamed response using the AI SDK data-stream protocol, with{" "}
          <code>Cache-Control: no-store</code>. Consume it with the AI SDK&apos;s{" "}
          <code>useChat</code> on the client.
        </p>
        <h2>Errors</h2>
        <ul>
          <li><code>400</code> — invalid body.</li>
          <li><code>413</code> — conversation too long.</li>
          <li><code>503</code> — no API key / proxy configured.</li>
          <li><code>502</code> — upstream gateway error.</li>
        </ul>
        <Callout tone="privacy">
          The endpoint is stateless and writes no logs. Each request is handled
          in isolation.
        </Callout>
      </>
    ),
  },

  faq: {
    slug: "faq",
    title: "FAQ",
    description: "Common questions about OpenThena.",
    body: (
      <>
        <h2>Is it really private?</h2>
        <p>
          Yes. No database, no accounts, no server logs. History lives only in
          your browser. See the <DocLink to="privacy">Privacy model</DocLink>.
        </p>
        <h2>Which model does it use?</h2>
        <p>
          Xiaomi MiMo (<code>mimo-v2.5-pro</code>) by default, swappable via env.
          See <DocLink to="providers">Models &amp; providers</DocLink>.
        </p>
        <h2>Can I use my own model?</h2>
        <p>
          Any OpenAI-compatible endpoint works, including a self-hosted LiteLLM
          proxy or a local model.
        </p>
        <h2>Does it cost anything?</h2>
        <p>
          OpenThena itself is free and MIT-licensed. You pay only for whatever
          model provider you point it at.
        </p>
      </>
    ),
  },

  contributing: {
    slug: "contributing",
    title: "Contributing",
    description: "Help make private AI the default.",
    body: (
      <>
        <p>
          Contributions are welcome — bug reports, features, docs, and design
          all help.
        </p>
        <h2>Workflow</h2>
        <ul>
          <li>Fork the repo and create a feature branch.</li>
          <li>Run <code>npm run dev</code> and make your change.</li>
          <li>Ensure <code>npm run lint</code> and <code>npm run build</code> pass.</li>
          <li>Open a pull request describing the change.</li>
        </ul>
        <h2>Principles</h2>
        <ul>
          <li><strong>Privacy first</strong> — never add server-side storage or tracking.</li>
          <li><strong>Stay small</strong> — favor clarity over cleverness.</li>
          <li><strong>Open by default</strong> — document what you build.</li>
        </ul>
        <Callout tone="info">
          Found a security issue? Please report it privately — see{" "}
          <code>SECURITY.md</code> in the repo.
        </Callout>
      </>
    ),
  },
};

export const DOC_SLUGS = Object.keys(DOC_PAGES).filter((s) => s !== "");
