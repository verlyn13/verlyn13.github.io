# Research statement

Jeffrey V. Johnson, Ph.D. · jeffrey@jvjohnson.dev · Homer, Alaska

## From function algebras to agent boundaries

My research began in pure mathematics. My dissertation established general sufficient
conditions for maps between function algebras to be composition or weighted composition
operators, characterizing weakly and almost peripherally-multiplicative maps and extending
the theory to algebras without unit on locally compact Hausdorff spaces. The habit that
work instilled — finding the minimal conditions under which a structure is preserved — is
the same habit I now bring to software systems.

The question I work on today is a systems analogue of that same instinct: **what is the
minimal, verifiable boundary within which an automated agent can be allowed to act?**

## Current agenda: governance for multi-agent systems

As automated agents take on real work, the hard problem is no longer capability but
*containment*: who sets policy, who executes it, who audits the result, and how any of it
is kept legible to the agents inside the system. My current research works out a governance
substrate that separates these roles — policy, execution, and audit — so that an agent
provably stays inside known bounds, with policy expressed as code and every action carrying
an audit trail.

I treat this as an engineering-of-guarantees problem rather than a modeling problem. The
through-line from my mathematical training is direct: formal methods and a preserver's eye
for invariants become policy verification — statements about what the system will *never*
do, checked rather than hoped for.

## How I work it out

I build real systems as research vehicles, because agentic-lifecycle mistakes only show up
under real load:

- **Budget Triage** exercises the governance substrate end to end — policy-as-code, audit
  trails, and role separation on automated financial workflows.
- **MAAT** is an early distributed multi-agent orchestration experiment: tension-based
  mediation, policy enforcement, and observability across gRPC services and MCP servers.
- **The host-capability substrate** defines what a workstation can safely expose to an
  agent, so local state is reasoned about rather than treated as an unstructured tool pile.
- **The Nash Group** treats organizational structure — repository boundaries, account
  structures, agent instructions — as durable system components.

## Direction

I am looking for research-engineering work where mathematical rigor meets agentic-systems
engineering: making the behavior of automated systems bounded, auditable, and legible. The
long-term goal is a principled account of agent governance that is precise enough to verify
and practical enough to deploy.
