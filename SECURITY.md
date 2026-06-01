# Security Policy

## Reporting a vulnerability

We take security and privacy seriously. If you discover a vulnerability, please
report it **privately** — do not open a public issue or pull request.

- Reach out via a direct message on [X (@openthena)](https://x.com/openthena), or
- Email the maintainers if a contact address is published in the repository.

Please include:

- A description of the issue and its impact.
- Steps to reproduce (proof-of-concept if possible).
- Any suggested remediation.

We will acknowledge your report as quickly as we can and keep you updated on the
fix. Responsible disclosure is appreciated — please give us reasonable time to
address the issue before any public disclosure.

## Scope highlights

Because OpenThena is **stateless and stores no conversations server-side**, the
most valuable reports typically involve:

- Anything that could cause user data (prompts/history) to be logged, persisted,
  or leaked server-side.
- API-key exposure or injection in the gateway / chat route.
- XSS via rendered Markdown in chat messages.

Thank you for helping keep OpenThena private and safe.
