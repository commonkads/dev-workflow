# Progress — initial-version

## 2026-11-26

- Decision: `docs/specs/` placed inside `docs/` so it is included in the published package, but postinstall only iterates top-level files so it is never copied to consuming projects. No postinstall change needed.
- Decision: 1.1.0 CHANGELOG date set to 2026-11-25, matching the `chore: bump version to 1.1.0` commit date in git history.
- Decision: No version bump for this feature — all additions are internal documentation with no user-visible behaviour change.
