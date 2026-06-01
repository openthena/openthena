# Contributing to OpenThena

Thanks for helping make private AI the default! Contributions of all kinds are
welcome — bug reports, features, docs, and design.

## Development setup

```bash
git clone https://github.com/yusmandediyogi-wq/openthena.git
cd openthena
npm install
cp .env.example .env.local   # add your MIMO_API_KEY
npm run dev
```

## Workflow

1. Fork the repo and create a feature branch from `main`.
2. Make your change with clear, focused commits.
3. Make sure both checks pass:
   ```bash
   npm run lint
   npm run build
   ```
4. Open a pull request describing **what** changed and **why**.

## Project principles

- **Privacy first.** Never introduce server-side storage of conversations,
  analytics, fingerprinting, or third-party tracking.
- **Stay small.** Favor clarity and a tiny dependency footprint over cleverness.
- **Open by default.** Document new behavior in `/docs`.
- **Provider-agnostic.** Keep model access behind the gateway
  (`src/lib/ai/gateway.ts`) so swapping providers never touches UI code.

## Code style

- TypeScript, functional React components, Tailwind for styling.
- Match the surrounding code's naming and structure.
- Keep components in `src/components/<area>/`.

## Reporting bugs

Open an issue with reproduction steps, expected vs. actual behavior, and your
environment. For **security** issues, see [SECURITY.md](./SECURITY.md) — please
do **not** open a public issue.
