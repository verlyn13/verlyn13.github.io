---
id: page_home
type: page
source_file: index.html
source_selector: main
route: /
content_hash: 0e7602efedf0e599e9d8f68130a767a9348cbb3f1f7894a51cfd844fc94e3490
html_hash: d2e90a8b2b8decd8fbd02626fe4dd50eaa9b88dbeda370b327df8b313e659531
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Building foundations for reliable, specification-driven agentic development

I build the foundations that let agents contribute reliable, specification-conforming work: typed contracts, bounded authority, reproducible tool and runtime environments, deterministic gates, and evidence-preserving handbacks.

I test those foundations by using them to build complex applications, data pipelines, evaluation systems, and infrastructure. Agent tools are instruments inside the system; quality comes from the contracts, environments, gates, and verification around their work.

I am also a Ph.D. mathematician (University of Montana, 2013). I led the statistical analysis for a 2023 study in *Pediatric Physical Therapy* that produced walking-speed reference values from 1,593 children in a rural Alaska school district. The full citation and methods are on the [research page](/research/).

The projects below show the foundation first, then the systems used to test it. Each one states its evidence and maturity boundary next to its claim.

Homer, Alaska

Foundation evidence [Host Capability Substrate: typed capabilities and evidence](#host-capability-substrate) [Governance architecture: bounded authority and handbacks](#governance-substrate)

Current résumé ↓

AI/ATS version ↓

Full resume →

GitHub →

LinkedIn →

Email →

## Resume and skills

Current resume formats and a skills summary for research-engineering roles in model evaluation, agent systems, and evaluation infrastructure.

### Resume formats

- Rendered resume Full human-readable page with evidence links and print styling. [Open resume→](/cv.html)
- Markdown resume Current research-engineer version for application packets and direct review. Copy [Download↓](/content/resume.md)
- AI/ATS Markdown Scanner-ready plain Markdown for portals and automated screeners. Copy [Download↓](/content/resume-ai-scanner.md)

### Skills snapshot

- **Specifications and verification** Typed contracts, JSON Schema, executable specifications, deterministic fitness and conformance gates, independent verification, provenance, and evidence-preserving handbacks.
- **Agent systems and bounded authority** Capability models, scoped authorization, agent mandates, repository-local authority, sandboxing, egress policy, OPA/Rego, OpenTofu, and policy-as-code.
- **Reproducible environments and platform** Human and agent shell modes, mise, direnv, tool and runtime resolution, Cloudflare Zero Trust, Hetzner, Proxmox, Docker, GitHub Actions, and self-hosted runners.
- **Systems, data, and native** Python, TypeScript, Kotlin, C/C++, Bash, PostgreSQL, Redis, Android, USB/UVC, and JNI/NDK.
- **Evaluation, mathematics, and statistics** Model and harness evaluation, evidence contracts, functional analysis, commutative Banach algebras, Wilson intervals, bootstrap confidence intervals, paired sign tests, and applied statistics.

## Foundation and control substrate

The work begins with the conditions under which agent contributions can be trusted: explicit contracts, bounded authority, reproducible execution contexts, and evidence that survives handoff.

### Host Capability Substrate

Typed capability, authority, and evidence contracts for host-level work.

**What is this?** A public substrate that models host facts, capabilities, policy decisions, evidence, approvals, leases, audits, and authorization as typed objects instead of implicit shell access.

**What is it for?** It makes the conditions for agent action inspectable: what may be observed, what may be changed, which execution context applies, what evidence is required, and what still needs human approval.

**How is it used?** Zod types compile to portable JSON Schemas; scoped grants bound authority; layered imports preserve the direction of control; and a composed verification gate checks policy, secrets, boundaries, and schema drift.

**Why does it matter?** Reliable agent-assisted development requires more than giving a tool shell access. The substrate makes authority and evidence explicit enough to validate, refuse, and audit.

**Evidence and status:** Public implementation with 46 Zod entity schemas, 67 generated JSON Schemas, about 500 tests, a 19-invariant charter, and a composed CI gate. It demonstrates the typed model and enforced source boundaries, not universal host-level runtime enforcement.

Examine the public implementation →

### Governance and agent-control architecture

Federated authority and evidence-preserving delegation across repositories and runtimes.

**What is this?** An anonymized architecture that separates human decision rights, agent mandates, capability and credential reach, infrastructure enforcement, runtime admission, and repository-local authority.

**What is it for?** It provides a common contract for agents, tools, shells, services, and CI without pretending that access to a capability is permission to use it.

**How is it used?** Human intent becomes schemas, policy checks, approval boundaries, deterministic gates, and structured handbacks. Managed execution environments make tool and runtime context observable while privileged or judgment-heavy work returns to the responsible human.

**Why does it matter?** Quality depends on the whole development environment: authority, execution context, specifications, validation, and evidence must agree before work can count as complete.

**Evidence and status:** Selected policy-as-code, infrastructure, validation, and scheduled drift controls operate today. Identity and runtime-admission layers have tested contracts and prototypes but are not organization-wide live enforcement. This is a principally single-operator case study, not an enterprise-adoption claim.

Review the anonymized case study →

### Independent verification

- **Agentic Architecture Audit** A public method for checking whether agent-built systems conform to their own specifications. **Demonstrates:** evidence-first discovery, machine-readable contracts, deterministic drift checks, and conversion of findings into fitness functions. **Evidence and status:** 2,075-line `audit-spec`, 12 JSON schemas, 10 deterministic checks, and a 27-case negative self-test; broader adoption remains unclaimed. [Inspect the public project →](https://github.com/verlyn13/agentic-architecture-audit)

### Proving grounds

- **Agentic-Coding Evaluation Lab** A specialized proving ground for model-change evidence and fail-closed reporting. **Evidence and status:** public tested framework behavior and an independently recomputed synthetic `NOT_EVALUABLE` result; no real-model performance or promotion claim. [Explore the methodology and evidence →](https://github.com/verlyn13/eval-lab-methodology)
- **Budget Triage** A private financial evidence workbench built under cross-tool specifications, authority manifests, pre-write hooks, and a 34-gate validation chain. **Evidence and status:** exact and provenance-aware application behavior plus an incomplete 6 passing / 9 pending synthetic known-answer result. A validated public source candidate intended for employer exploration is in final operator review; no public source link or production, financial-outcome, or certification claim yet. [Review the proving ground →](/projects/budget-triage.html)
- **ScopeCam** A private Android/Kotlin/C++ application that tests the method against native code, USB hardware, concurrency, release boundaries, and physical-device evidence. **Evidence and status:** signed client alpha delivered; no public source link, broad release, arbitrary-device compatibility, or production-readiness claim. [Review the engineering case study →](/projects/scopecam.html)
- **Dicee** A live family multiplayer game for mobile browsers, built as a complete public system. **Demonstrates:** Rust-to-WebAssembly delivery, realtime state through Cloudflare Durable Objects and WebSockets, SvelteKit, persistence, and end-to-end deployment. **Evidence and status:** public source and a [live deployment](https://dicee.games/); traffic, performance, bundle-size, and current test-count claims remain withheld. [Review the delivered system →](/projects/dicee.html)

[Explore the full body of work →](/projects/)

## Academic and publication context

Tenured associate professor of mathematics with 17+ years teaching mathematics and statistics. Ph.D. in Mathematics, University of Montana, 2013; statistical lead for the 2023 *Pediatric Physical Therapy* study; a 2012 pure-mathematics publication. That background supports the specification, systems, and verification work above.

Teaching & Leadership →

Publications & Research →

Full resume →
