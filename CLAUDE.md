# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@commonkads/dev-workflow` is a documentation-only npm package. It ships a set of shared workflow and guidance docs that are copied into consuming projects on `npm install`.

There is no build step, no TypeScript, and no test suite. The entire package is `docs/` and `scripts/`.

## What Lives Here

| Path | Purpose |
|------|---------|
| `docs/feature-workflow.md` | Phase gate process for feature development |
| `docs/coding-standards.md` | Non-negotiable code quality rules |
| `docs/developer-guidance-backend.md` | Command reference for Node/TypeScript projects |
| `docs/developer-guidance-frontend.md` | Command reference for React/Vite projects |
| `scripts/postinstall.js` | Copies docs and patches CLAUDE.md in consuming projects |

**The docs in this repo are the source.** The `<!-- do not edit directly -->` comment in those files refers to the copies in consuming projects, not to these originals. Edit here, not there.

## Making Changes

1. Edit the relevant file(s) in `docs/` or `scripts/`.
2. For behaviour changes (new phases, new postinstall logic): bump the **minor** version in `package.json`.
3. For fixes and wording tweaks: bump the **patch** version.
4. Commit and push to `main` — the publish workflow handles the rest.

## Publish Workflow

Pushing (or merging) to `main` triggers `.github/workflows/publish.yml`, which runs `npm publish` to the GitHub Package Registry (`https://npm.pkg.github.com`). The version published is whatever is in `package.json` at that commit. No manual tagging needed.

## Syntax Check (postinstall.js only)

```bash
node --check scripts/postinstall.js
```

No other quality gates apply to this repo.
