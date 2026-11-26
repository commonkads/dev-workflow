# Brainstorm — initial-version

## Context

The dev-workflow package reached v1.1.0 through direct commits to `main` without a formal feature branch or documentation trail. The "initial-version" feature retroactively establishes the specs structure and applies the workflow to itself.

## Angles explored

**1. Retrospective documentation only**
Write `docs/specs/requirements.md`, `docs/specs/design.md`, and all phase docs. Update CHANGELOG with proper ToC and 1.1.0 entry. No code changes.

**2. Code + documentation**
Also add new functionality — a lockfile, CI workflow, or additional docs — alongside the retrospective docs.

**3. Workflow self-hosting only**
Skip the system specs and focus purely on creating `docs/specs/features/initial-version/` as a template example.

## Direction chosen

**Angle 1 (retrospective documentation only).** The package is functionally correct at 1.1.0. What's missing is a documentation trail that future features can build from. The first priority is to establish `docs/specs/requirements.md`, `docs/specs/design.md`, and a properly formatted CHANGELOG. Code changes belong in a future feature once the foundation is in place.
