<div align="center">

<img src="./public/openthena.svg" alt="OpenThena" width="96" height="96" />

# OpenThena

### The open-source, privacy-first AI assistant.

AI that answers **you**, not **about** you. OpenThena pairs a gorgeous streaming
chat experience with a hard guarantee: **your conversations are never stored on a
server.** No database. No accounts. No tracking.

[![License: MIT](https://img.shields.io/badge/License-MIT-38e1d6.svg)](./LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-04101f.svg)](https://nextjs.org)
[![Powered by Xiaomi MiMo](https://img.shields.io/badge/Brain-Xiaomi%20MiMo-3b82f6.svg)](https://platform.xiaomimimo.com)

[**Live site → openthena.com**](https://openthena.com) · [Docs](https://openthena.com/docs) · [X](https://x.com/openthena)

</div>

---

## ✨ Why OpenThena

- 🛡️ **Privacy by design** — stateless API, no server logs, history lives only in your browser.
- 🧩 **Open source** — MIT-licensed and fully auditable, end to end.
- 🔀 **LiteLLM-style gateway** — one OpenAI-format interface to any model; swap providers with one env var.
- 🧠 **Xiaomi MiMo brain** — fast, capable, multilingual reasoning out of the box.
- ⚡ **Real-time streaming** — token-by-token answers on the edge.
- 🚀 **Deploy anywhere** — one-click to Vercel, or self-host the whole stack.

## 🏗️ How it works

```
Browser (/chat)
   │  POST /api/chat  { messages, model }
   ▼
Edge route (stateless, no logging)
   │  getModel(id) → LiteLLM-style gateway
   ▼
Provider (Xiaomi MiMo · OpenAI-compatible)
   │  streamed tokens
   ▼
Browser  ◀── token stream ──  (history saved to localStorage)
```

The whole server is a **pure relay** — there is no code path that persists a
message. See [`src/lib/ai/gateway.ts`](./src/lib/ai/gateway.ts) and
[`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts).

## 🚀 Quickstart

> Requires **Node.js 18+** and a **Xiaomi MiMo API key** ([get one](https://platform.xiaomimimo.com)).

```bash
git clone https://github.com/yusmandediyogi-wq/openthena.git
cd openthena
npm install
cp .env.example .env.local   # then add your MIMO_API_KEY
npm run dev
```

Open <http://localhost:3000> and start chatting.

## ⚙️ Environment variables

| Variable           | Required | Default                          | Description                                   |
| ------------------ | -------- | -------------------------------- | --------------------------------------------- |
| `MIMO_API_KEY`     | ✅       | —                                | Your Xiaomi MiMo API key.                     |
| `MIMO_BASE_URL`    |          | `https://api.xiaomimimo.com/v1`  | OpenAI-compatible base URL.                   |
| `MIMO_MODEL`       |          | `mimo-v2.5-pro`                  | Default model id.                             |
| `LITELLM_BASE_URL` |          | —                                | Route all traffic through a LiteLLM proxy.    |
| `LITELLM_API_KEY`  |          | —                                | Master key for the LiteLLM proxy.             |
| `OPENTHENA_SYSTEM_PROMPT` |   | (built-in)                       | Override the assistant persona.               |

## ☁️ Deploy to Vercel

1. Push your fork to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables above.
4. Deploy — then attach `openthena.com` in the Domains tab.

Full guide: [Deploy to Vercel](https://openthena.com/docs/deploy-vercel).

## 🔐 Privacy model

- **No database** — conversations are never persisted server-side.
- **No accounts** — nothing to sign up for.
- **No tracking** — no analytics, fingerprinting, or ad cookies.
- **Local-only history** — stored in `localStorage` under `openthena.conversations.v1`.

Details: [Privacy model](https://openthena.com/docs/privacy).

## 🧱 Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Vercel AI SDK · Xiaomi MiMo · LiteLLM-style gateway.

## 🤝 Contributing

PRs welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md). Please keep the project
**privacy-first** — never add server-side storage or tracking.

## 📄 License

[MIT](./LICENSE) © OpenThena
