---
id: page_research
type: page
source_file: research/index.html
source_selector: main
route: /research/
content_hash: f69d55992bdaa883beea3cc42192a2e9b43b579bad4936085092910311ae057c
html_hash: 7360cc49314c6ffe8e6fe87513d878497f72eb5df47ee609a7e6aec3c2bca0f3
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to Portfolio

# Research and publications

Model evaluation, agent systems, applied statistics, and mathematics

## Current research questions

My current work asks how agent-assisted development can produce results that remain inspectable after the agent session ends.

- **Authority:** How should capabilities, permissions, execution context, approvals, and evidence be represented so an agent can act only within an explicit mandate?
- **Evaluation:** What evidence is sufficient to compare model or harness changes, and when should an evaluation refuse to produce a decision?
- **Verification:** How can a separate verifier recompute a result from durable artifacts instead of trusting the reporting path that produced it?
- **Development systems:** Which specifications, environment controls, and automated checks make agent-assisted work reproducible across tools and repositories?

## Public methods and implementations

- [Host Capability Substrate](https://github.com/jefahnierocks/host-capability-substrate): typed capability, authority, execution-context, and evidence contracts with generated JSON Schemas and CI checks.
- [Agentic-Coding Evaluation Lab methodology](https://github.com/verlyn13/eval-lab-methodology): fail-closed evaluation contracts and a synthetic `NOT_EVALUABLE` result recomputed by a separate verifier in the same program.
- [Agentic Architecture Audit](https://github.com/verlyn13/agentic-architecture-audit): a public specification and deterministic checks for testing whether agent-built systems conform to their declared architecture.

## Applied statistics publication

### Pediatric Walking Speed Normal Reference Values in a Local Population

Cadieux JM, Pyhala SL, **Johnson JV**

*Pediatric Physical Therapy*, 2023;35(3):314-320

[doi:10.1097/PEP.0000000000001015](https://doi.org/10.1097/PEP.0000000000001015)

**My role:** Led the statistical analysis (third author)

**Methods:** R (version 4.1.3), IBM SPSS

**Analysis:** 13×2×2 factorial ANOVA with Type III sum of squares, 1,593 participants ages 5-17

**Result:** Normal reference values for children ages 5-17 in one rural Alaska school district

Interdisciplinary collaboration applying statistical methods to clinical physical therapy research. Large dataset management (1,593 children) and rigorous factorial analysis examining main effects and two-way interactions for age, sex, and footwear.

## Pure mathematics

### Spectral Conditions for Composition Operators on Algebras of Functions

Johnson J, Tonev T

*Communications in Mathematics and Applications*, 2012;3(1)

Research on spectral preserving maps between function algebras. Extends results on composition operators in commutative Banach algebras. Co-authored with dissertation advisor.

### Ph.D. Dissertation (2013)

Peripherally-Multiplicative Spectral Preservers Between Function Algebras

University of Montana, Missoula, MT

Advisor: Dr. Thomas Tonev

Field: Commutative Banach Algebras, Functional Analysis

Established general sufficient conditions for maps between function algebras to be composition or weighted composition operators. Defined and characterized weakly peripherally-multiplicative and almost peripherally-multiplicative maps. Extended theory to function algebras without unit on locally compact Hausdorff spaces.

## Related study and teaching

Since 2023, I have held recurring theoretical-computer-science study sessions with a student collaborator, covering lambda calculus, formal languages, abstract algebra, and applied cryptography. This is independent study and mentoring, not a publication claim. My degrees, teaching record, and continuing education are listed in the [Resume](/cv.html) and [Experience](/experience/) pages.

Teaching & Leadership →

Full resume →
