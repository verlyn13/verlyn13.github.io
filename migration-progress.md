# Migration progress — design-system-in-code

Long-running harness state for the DTCG + Style Dictionary migration
(`~/Downloads/agentic-design-system-workflow.md`, adapted to this single-file vanilla-CSS site).
A fresh/compacted agent resumes by reading this file + `git log`. One commit per phase (local,
1Password-signed, **no push**).

## Decisions (locked)
- Pipeline: **DTCG 2025.10 `.tokens.json` + Style Dictionary v5** → committed `assets/tokens.generated.css`,
  `@import`ed by `jeffrey.css`; Vite bundles one deployed stylesheet.
- Scope: **full workflow**, adapted — token layer + conformance + spec + ADRs + Skills + harness.
- Token values authored as **verbatim `hsl()` strings** to guarantee **zero visual diff** (ADR-001).
- Theming: **light-only today**; structure allows multi-file mode sets later (ADR-004).
- §4 five-layer file-boundary model has no target in one CSS file → documented, not enforced (ADR-006).

## Phase 0 inventory (baseline)
`assets/jeffrey.css`: 2,097 lines · 24 `:root` tokens (+3 `.experience-page` locals) · 388 `var()` uses ·
**65 raw `hsl()` (26 distinct) above the token layer** · 2 `#000`.
Top clusters → new semantic tokens: `45 25% 96%`×10 (inset-warm) · `212 85% 45% / .35`×8 (ring) ·
`0 0% 100% / .75`×8 (surface) · `220 25% 96%`×4 (inset-cool) · `0 0% 100% / .9`×4 (surface-hover) ·
`0 0% 100%`×3 (on-accent) · `0 0% 100% / .65`×3 (surface-pill).

## Phase status
| Phase | What | Status |
|---|---|---|
| 0 | Harness + inventory | ✅ done |
| 1 | Author `tokens/{primitive,semantic}.tokens.json` | ✅ done |
| 2 | Style Dictionary build + wire (`@import`, drop `:root`) | ✅ done (commit 2e272fa) |
| 3 | Replace 64 raw `hsl()` + 2 print `#000` in `jeffrey.css` with tokens | ✅ done — 0 raw colors remain |
| 4 | Conformance gates live (no-raw-values, tokens-fresh) | ✅ done — wired to ci + pre-commit + deploy; bite-tested |
| 5 | `DESIGN_SPEC.md` + `layers.json` + AGENTS invariants | ✅ done |
| 6 | ADRs (0001–0006) + 3 Agent Skills + finalize | ✅ done — **migration complete** |

## Verification contract
- Zero visual diff: generated `:root` byte-identical to old block; preview at desktop/768/360 matches.
- `mise run ci` = lint + format-check + tokens-fresh + no-raw-values + build (all green).
- Conformance bites: a planted raw `hsl()` in `jeffrey.css` fails the gate.
