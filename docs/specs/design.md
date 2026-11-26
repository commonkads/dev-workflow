# Design — @commonkads/dev-workflow

## Package Layout

```
dev-workflow/
  agents/
    Explore.md              # Explore agent definition (copied to .claude/agents/)
  docs/
    ci-guidance.md          # Shipped to consuming projects
    coding-standards.md
    developer-guidance-backend.md
    developer-guidance-frontend.md
    feature-workflow.md
    specs/                  # This design doc and feature docs (NOT shipped)
  scripts/
    postinstall.js          # npm postinstall hook
  skills/
    feature.md              # /feature slash command skill (copied to .claude/skills/)
  CHANGELOG.md
  CLAUDE.md
  package.json
  README.md
```

The `files` field in `package.json` controls what is published to the registry: `agents/`, `docs/`, `scripts/`, and `skills/`. The `docs/specs/` subdirectory is included in the published package but is not copied to consuming projects — only the top-level files in `docs/` are iterated by the postinstall script.

## Postinstall Mechanism

`scripts/postinstall.js` runs automatically after every `npm install` via the `postinstall` npm lifecycle hook. It is a CommonJS script with no external dependencies.

### Project root resolution

The script resolves the consuming project's root by walking up from `process.env.INIT_CWD` (set by npm to the directory where `npm install` was invoked). It stops at the first ancestor that has a `package.json` with a `workspaces` field, which catches monorepo roots. If no workspace root is found it falls back to `INIT_CWD` itself, which handles standalone projects.

### Doc copying

Iterates every file in `docs/` (top-level only, not recursive) and copies it into `<projectRoot>/docs/`, creating the directory if needed. Files are overwritten unconditionally, so the consuming project always has the latest version after each `npm install`.

### Skill and agent copying

Same pattern for `skills/` → `.claude/skills/` and `agents/` → `.claude/agents/`.

### CLAUDE.md patching

The script maintains a list of sections (`DOC_SECTIONS`) — each has a unique `header` string and a markdown block to append. It reads `CLAUDE.md` (or creates it from a minimal template) and appends only the sections whose `header` is not already present in the file. This makes the patch idempotent: running `npm install` a second time does not duplicate sections.

Frontend-only sections (like `developer-guidance-frontend.md`) are skipped unless `isFrontendProject()` returns `true`, which checks for frontend framework markers in the project's `dependencies`, `devDependencies`, and `peerDependencies`.

## Publishing

A GitHub Actions workflow (`.github/workflows/publish.yml`) triggers on every push to `main`. It runs `npm publish` with the GitHub Package Registry. The version published equals the version in `package.json` at that commit — no tagging or manual step is needed.

## Versioning

Semantic versioning applies:
- **minor** bump for new behaviour (new doc files, new CLAUDE.md sections, postinstall logic changes)
- **patch** bump for wording fixes, clarifications, or reordering within existing docs
