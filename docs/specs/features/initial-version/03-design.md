# Design — initial-version

## New files

| File | Purpose |
|------|---------|
| `docs/specs/requirements.md` | Overall package requirements |
| `docs/specs/design.md` | Package architecture and postinstall mechanism |
| `docs/specs/features/initial-version/01-brainstorm.md` | Brainstorm record |
| `docs/specs/features/initial-version/02-requirements.md` | In-scope / out-of-scope |
| `docs/specs/features/initial-version/03-design.md` | This file |
| `docs/specs/features/initial-version/04-tasks.md` | Task list |
| `docs/specs/features/initial-version/06-review.md` | Review findings |
| `docs/specs/features/initial-version/07-changes.md` | Change log |
| `docs/specs/features/initial-version/progress.md` | Implementation log |

## Modified files

| File | Change |
|------|--------|
| `CHANGELOG.md` | Add ToC section; add `1.1.0` entry summarising Phase 10/11 rework and disclaimer |

## Key decisions

- `docs/specs/` lives inside `docs/` and is included in the published package, but the postinstall script iterates only top-level files so it is never copied to consuming projects. No change to postinstall needed.
- The 1.1.0 CHANGELOG entry back-fills the date as the commit date for that version bump (`chore: bump version to 1.1.0`). The exact date was derived from git history.
- No version bump for this feature: the additions are internal docs with no user-visible behaviour change.
