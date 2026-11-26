# Requirements — @commonkads/dev-workflow

## Purpose

`@commonkads/dev-workflow` is a documentation-only npm package that ships a shared set of workflow and guidance docs to every CommonKADS project that installs it. Its job is to keep developer guidance consistent across the family without requiring each project to maintain its own copies.

## Functional Requirements

### Installation behaviour

1. Running `npm install` in a consuming project copies all files from `docs/` into the project's `docs/` directory, overwriting any existing copies.
2. Running `npm install` copies skill files from `skills/` into `.claude/skills/` in the project root.
3. Running `npm install` copies agent definition files from `agents/` into `.claude/agents/` in the project root.
4. Running `npm install` patches `CLAUDE.md` in the project root: each doc section is appended once, keyed by a unique header string, so re-running install never duplicates sections.
5. Frontend guidance (`developer-guidance-frontend.md`) is only added to `CLAUDE.md` for projects that declare a frontend dependency (`react`, `vue`, `svelte`, `next`, `nuxt`, `angular`, `solid-js`).
6. Running `npm install` inside the package repo itself is a no-op (detected by `package.json` name `@commonkads/dev-workflow`).

### Docs shipped

| File | Purpose |
|------|---------|
| `docs/feature-workflow.md` | 11-phase gate process for feature development |
| `docs/coding-standards.md` | Non-negotiable code quality and architecture rules |
| `docs/developer-guidance-backend.md` | Command reference for Node/TypeScript projects |
| `docs/developer-guidance-frontend.md` | Command reference for React/Vite projects |
| `docs/ci-guidance.md` | GitHub Actions workflow standards |

### Publishing

1. Pushing or merging to `main` triggers the publish workflow automatically.
2. The version published is whatever is in `package.json` at that commit.
3. The package is published to the GitHub Package Registry (`https://npm.pkg.github.com`) as `@commonkads/dev-workflow`.

## Non-functional Requirements

- No runtime dependencies — the postinstall script uses only Node.js built-ins (`fs`, `path`).
- The package is published as public (`publishConfig.access: "public"`).
- The postinstall script must be valid CommonJS (required by older `npm install` environments that do not support ESM scripts).
