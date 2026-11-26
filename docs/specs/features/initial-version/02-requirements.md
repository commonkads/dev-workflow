# Requirements — initial-version

## In scope

- Create `docs/specs/requirements.md` — overall package requirements (installation behaviour, docs shipped, publishing, non-functional constraints)
- Create `docs/specs/design.md` — package layout, postinstall mechanism, project root resolution, CLAUDE.md patching, publishing, versioning policy
- Update `CHANGELOG.md` — add Table of Contents, add `1.1.0` entry documenting the Phase 10/11 rework and disclaimer addition
- Create all feature phase docs under `docs/specs/features/initial-version/` (phases 01–07 + progress.md)

## Out of scope

- Changes to any doc file in `docs/` (top-level workflow docs)
- Changes to `scripts/postinstall.js`
- New npm dependencies
- CI workflow changes
- Version bump (the docs additions are patch-level and are not being published as a new version in this feature)
