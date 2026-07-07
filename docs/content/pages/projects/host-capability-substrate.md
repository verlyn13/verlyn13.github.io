---
id: page_host-capability-substrate
type: page
source_file: projects/host-capability-substrate.html
source_selector: main
route: /projects/host-capability-substrate.html
content_hash: 28b69e7824630b512aa8a34c9014ea58d9c182675c0e709f83d01a506e6ddddf
html_hash: 3a81fd4ba33d5f7b755cdec7798fde33e45469e5e3adb91c56372e85f4f4b37e
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Research Foundations

# Host Capability Substrate

Capability-Boundary Research Substrate

Research Foundation · Active

## Overview

host-capability-substrate is the workstation-level counterpart to the organizational framework. Where the Nash Group framework asks what the organization permits and owns, host-capability-substrate asks what the local machine can safely do, how capabilities are exposed, and how agents can reason about local state without treating the workstation as an unstructured pile of tools.

## Current Status

- **Status:** Active substrate design
- **Type:** Workstation-level capability kernel
- **Positioning:** Local machine capability model for agentic workflows

## Architecture

### Capability Model

- Four-ring capability architecture for separating foundational machine facts from higher-level workflows.
- Ring 0 schema landing work for base host facts and capability declarations.
- Capability inventory approach for shells, package managers, repo locations, secrets boundaries, and local services.
- Designed to support agent-safe automation without making every local tool globally available.

## Skills Demonstrated

- Systems modeling for local development environments.
- Schema-first design for machine capabilities.
- Security-conscious automation boundaries.
- Agent runtime planning across shells, repos, and local services.

## Why This Matters

Agentic tools are most useful when they can act, but most risky when their authority is implicit. host-capability-substrate is a way to describe local capabilities before they are used: what can be inspected, what can be modified, what requires operator approval, and what should remain outside the agent's reach. It is a practical bridge between "AI assistant has shell access" and a governable local automation environment.

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →

← Back to Evidence
