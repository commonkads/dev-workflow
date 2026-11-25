#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function findProjectRoot(startDir) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(startDir, 'package.json'), 'utf8'));
    if (Array.isArray(pkg.workspaces) && pkg.workspaces.length > 0) return startDir;
  } catch {}
  let dir = path.dirname(startDir);
  while (dir !== path.dirname(dir)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
      if (Array.isArray(pkg.workspaces) && pkg.workspaces.length > 0) return dir;
    } catch {}
    dir = path.dirname(dir);
  }
  return startDir;
}

const projectRoot = findProjectRoot(process.env.INIT_CWD || process.cwd());

// Skip when running npm install inside the package repo itself
try {
  const projectPkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  if (projectPkg.name === '@commonkads/dev-workflow') process.exit(0);
} catch {
  // no package.json — proceed anyway
}

const srcDir = path.join(__dirname, '..', 'docs');
const destDir = path.join(projectRoot, 'docs');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const file of fs.readdirSync(srcDir)) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  console.log(`  ✔ docs/${file} written`);
}

// Copy skill files to .claude/skills/ so /feature is available as a slash command
const skillsSrcDir = path.join(__dirname, '..', 'skills');
const skillsDestDir = path.join(projectRoot, '.claude', 'skills');

if (fs.existsSync(skillsSrcDir)) {
  if (!fs.existsSync(skillsDestDir)) {
    fs.mkdirSync(skillsDestDir, { recursive: true });
  }
  for (const file of fs.readdirSync(skillsSrcDir)) {
    fs.copyFileSync(path.join(skillsSrcDir, file), path.join(skillsDestDir, file));
    console.log(`  ✔ .claude/skills/${file} written`);
  }
}

// Copy agent definition files to .claude/agents/
const agentsSrcDir = path.join(__dirname, '..', 'agents');
const agentsDestDir = path.join(projectRoot, '.claude', 'agents');

if (fs.existsSync(agentsSrcDir)) {
  if (!fs.existsSync(agentsDestDir)) {
    fs.mkdirSync(agentsDestDir, { recursive: true });
  }
  for (const file of fs.readdirSync(agentsSrcDir)) {
    fs.copyFileSync(path.join(agentsSrcDir, file), path.join(agentsDestDir, file));
    console.log(`  ✔ .claude/agents/${file} written`);
  }
}

// Detect whether the project has frontend dependencies
function isFrontendProject() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    const deps = Object.keys({
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    });
    const frontendMarkers = ['react', 'vue', 'svelte', 'next', 'nuxt', 'angular', '@angular/core', 'solid-js'];
    return deps.some(d => frontendMarkers.includes(d));
  } catch {
    return false;
  }
}

// Sections to add, keyed by filename; each has a header string used to detect
// whether the section is already present and the markdown to append.
const DOC_SECTIONS = [
  {
    file: 'coding-standards.md',
    always: true,
    header: 'docs/coding-standards.md',
    markdown: `
## Coding Standards

**Read [\`docs/coding-standards.md\`](docs/coding-standards.md) before writing or editing any code.** It contains non-negotiable rules covering imports, architecture boundaries, and quality gates that apply to every change.
`,
  },
  {
    file: 'developer-guidance-backend.md',
    always: true,
    frontend: false,
    header: 'docs/developer-guidance-backend.md',
    markdown: `
## Developer Guidance

**Read [\`docs/developer-guidance-backend.md\`](docs/developer-guidance-backend.md) before running any commands.** It contains the full command reference, TypeScript conventions, when to run each command, and common pitfalls.
`,
  },
  {
    file: 'developer-guidance-frontend.md',
    always: false,
    frontendOnly: true,
    header: 'docs/developer-guidance-frontend.md',
    markdown: `
## Developer Guidance (Frontend)

**Read [\`docs/developer-guidance-frontend.md\`](docs/developer-guidance-frontend.md) before writing or editing frontend code.** It contains component conventions, state management patterns, and UI testing guidance.
`,
  },
  {
    file: 'ci-guidance.md',
    always: true,
    header: 'docs/ci-guidance.md',
    markdown: `
## CI Guidance

**Read [\`docs/ci-guidance.md\`](docs/ci-guidance.md) before writing or modifying any GitHub Actions workflow.** It defines the required Node.js version, action pinning policy, and workflow structure standards.
`,
  },
  {
    file: 'feature-workflow.md',
    always: true,
    header: 'docs/feature-workflow.md',
    markdown: `
## Feature Workflow

**Read [\`docs/feature-workflow.md\`](docs/feature-workflow.md) before starting any non-trivial feature or change.** It defines the phase gate process that must be followed. Skipping or merging phases without explicit user sign-off is not permitted.
`,
  },
  {
    file: 'feature-workflow.md',
    always: true,
    header: 'Starting a Feature',
    markdown: `
## Starting a Feature

When the user describes a new feature or asks you to start one, **immediately read \`docs/feature-workflow.md\` in full before writing any code, creating any files, or making any design decisions.** Then begin Phase 0 — Pre-flight exactly as the doc describes. Never advance to the next phase without explicit user sign-off. Never skip or merge phases.

If a \`/feature\` skill is available, the user may invoke it with \`/feature <name>\` to start the workflow interactively.
`,
  },
];

const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');
const frontend = isFrontendProject();

// Determine which sections are relevant for this project
const relevant = DOC_SECTIONS.filter(s => {
  if (!fs.existsSync(path.join(destDir, s.file))) return false;
  if (s.frontendOnly && !frontend) return false;
  return true;
});

let claudeContent = fs.existsSync(claudeMdPath)
  ? fs.readFileSync(claudeMdPath, 'utf8')
  : '# CLAUDE.md\n\nThis file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.\n';

let appended = 0;
for (const section of relevant) {
  if (!claudeContent.includes(section.header)) {
    claudeContent = claudeContent.trimEnd() + '\n' + section.markdown;
    appended++;
    console.log(`  ✔ CLAUDE.md — added section for ${section.file}`);
  }
}

if (appended > 0) {
  fs.writeFileSync(claudeMdPath, claudeContent);
} else {
  console.log(`  ✔ CLAUDE.md — already up to date`);
}
