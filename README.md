# @commonkads/dev-workflow

> **Disclaimer:** This project is an independent open-source software implementation inspired by the CommonKADS knowledge engineering methodology (Schreiber et al.). It is not affiliated with or endorsed by the original methodology authors or any third-party trademark holders.

Shared workflow and developer guidance docs for Claude Code projects in the CommonKADS family. Installing this package copies a set of markdown docs into your project and patches `CLAUDE.md` so Claude knows to read them.

## What gets installed

| File | Description |
|------|-------------|
| [`docs/feature-workflow.md`](docs/feature-workflow.md) | 11-phase gate process for feature development |
| [`docs/coding-standards.md`](docs/coding-standards.md) | Non-negotiable code quality and architecture rules |
| [`docs/developer-guidance-backend.md`](docs/developer-guidance-backend.md) | Command reference for Node/TypeScript projects |
| [`docs/developer-guidance-frontend.md`](docs/developer-guidance-frontend.md) | Command reference for React/Vite projects |

A `.claude/agents/feature.md` skill file is also installed, enabling the `/feature <name>` slash command in Claude Code. Invoking it starts Phase 0 of the workflow interactively.

`CLAUDE.md` in your project root is also updated: any missing sections pointing to the installed docs are appended automatically, including a standing instruction that tells Claude to read the workflow and begin Phase 0 whenever a new feature is described. Frontend guidance is only added for projects that have React, Vue, Next, Svelte, or similar in their dependencies.

## Installation

The package is published to the GitHub Package Registry. Add this to your project's `.npmrc`:

```
@commonkads:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install --save-dev @commonkads/dev-workflow
```

Re-run `npm install` at any time to pull in updated docs.

## Updating docs in your project

The installed docs are plain markdown files in your `docs/` directory. They are overwritten on each `npm install`, so edit this package — not the copies — if you want permanent changes.

## Publishing a new version

1. Edit the source docs or `scripts/postinstall.js`.
2. Bump the version in `package.json` (minor for new behaviour, patch for fixes).
3. Commit and push to `main` — the publish workflow triggers automatically.
