# Tasks — initial-version

## Task list

1. **Create `docs/specs/requirements.md`**
   - File: `docs/specs/requirements.md` (new)
   - Content: package purpose, functional requirements (installation behaviour, docs shipped, publishing), non-functional requirements
   - No verification command needed (documentation only)

2. **Create `docs/specs/design.md`**
   - File: `docs/specs/design.md` (new)
   - Content: package layout tree, postinstall mechanism (project root resolution, doc copying, skill/agent copying, CLAUDE.md patching), publishing workflow, versioning policy
   - No verification command needed

3. **Update `CHANGELOG.md`**
   - File: `CHANGELOG.md` (modify)
   - Add a `## Table of Contents` section at the top linking to both version entries
   - Add `## [1.1.0] — YYYY-MM-DD` entry with bullets describing Phase 10/11 rework and disclaimer addition
   - Retain existing `1.0.0` entry unchanged
   - Date for 1.1.0 to match the `chore: bump version to 1.1.0` commit date in git history

4. **Write all feature phase docs**
   - Files: `docs/specs/features/initial-version/01-brainstorm.md` through `07-changes.md` + `progress.md`
   - All written in a single pass once tasks 1–3 are complete
