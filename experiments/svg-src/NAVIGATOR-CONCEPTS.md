# Navigator Design Concepts

## The Goal
A 2026-forward navigator that:
- Shows the journey at a glance
- Lets visitors jump to any point in your story
- Feels modern, professional, direct
- Works as both overview and navigation
- Reinforces the "convergence" narrative for AI engineering

---

## Option A: Floating Context Bar

A compact, sticky bar that appears after scrolling past the hero braid.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [WI] [MN] [CA] [ZA] [MT] [EG] [●AK]          ≡ Jump to section... │
└─────────────────────────────────────────────────────────────────────┘
```

- Era chips, current one highlighted
- Dropdown for quick navigation
- Minimal footprint, always accessible
- The full braid only shows at top

**Pros:** Clean, modern, doesn't take space
**Cons:** Loses the visual weaving metaphor when minimized

---

## Option B: Side Rail Navigator

Vertical navigator on the left edge, always visible.

```
│ 1992  ○  Wisconsin
│       │
│ 1998  ○  Duluth
│       │
│ 2001  ○  California
│       │
│ 2005  ●━━ Peace Corps
│       │
│ 2008  ○  Montana PhD
│       │
│ 2015  ○  Cairo
│       │
│ 2017  ●  Alaska ←── YOU ARE HERE
│       ╲
│ now    ◉  Convergence
```

- Vertical timeline, current section pulsing
- Click to jump anywhere
- Shows the "where you are" persistently
- On mobile: becomes a bottom sheet or hamburger

**Pros:** Always visible, clear "you are here"
**Cons:** Takes horizontal space, linear (loses braid metaphor)

---

## Option C: Scrubber with Preview

Horizontal scrubber like a video timeline. Hover shows preview.

```
┌─────────────────────────────────────────────────────────────────────┐
│  ════════════════════●══════════════════════════════════════════    │
│  '92        '01     '07        '14        '17            now        │
└─────────────────────────────────────────────────────────────────────┘
                       ↓
              ┌─────────────────┐
              │ 🇿🇦 Peace Corps  │
              │ 2005-2007       │
              │ Service begins  │
              └─────────────────┘
```

- Drag or click to scrub through time
- Hover shows contextual preview
- Very direct, video-editor feel
- Could show three parallel tracks (the braid abstracted)

**Pros:** Familiar interaction pattern, modern
**Cons:** Loses visual richness of braid

---

## Option D: The Braid as Hero (Current + Enhanced)

Keep the visual braid, but make it more interactive:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ═══════════════════════════════════════════════════════════════    │ Analytical
│       ·    ·    ·    ·    ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌    ══════════════     │ Technical
│       │    │    │    │         │            │         │             │ Experiential
│                                                                     │
│   WI    MN    CA    ZA       MT           EG        AK              │
│                                              ↑                      │
│                                         [CURRENT]                   │
└─────────────────────────────────────────────────────────────────────┘
```

Enhancements:
- Subtle animation: strands gently pulse where you're reading
- Click anywhere → smooth scroll to that section
- Hover reveals a mini-card that fades in beside the cursor
- "Current" indicator pulses subtly
- Optional: sticky mini-version appears on scroll

**Pros:** Keeps the visual metaphor, tells the story
**Cons:** Requires horizontal space

---

## Option E: Command Palette / Quick Jump

Modern "⌘K" style navigator. Press `/` or click search icon.

```
┌────────────────────────────────────────┐
│  ⌘  Jump to...                         │
├────────────────────────────────────────┤
│  → Current: Alaska (2017-present)      │
│  → Cairo (2015-2017)                   │
│  → Montana PhD (2008-2015)             │
│  → Peace Corps (2005-2007)             │
│  → California (2001-2005)              │
│  → Projects                            │
│  → Research                            │
│  → CV                                  │
└────────────────────────────────────────┘
```

- Keyboard-first, developer-friendly
- Works site-wide, not just this page
- Can search by keyword, era, skill
- Very 2026, very "I know my tools"

**Pros:** Power-user vibe, site-wide navigation
**Cons:** Hidden by default, not visual

---

## Option F: Hybrid - Braid Hero + Sticky Chips

Best of both worlds:

**At top of page:**
Full braid visualization (current implementation)

**After scrolling past it:**
Compact sticky bar with era chips + current indicator

```
After scroll:
┌─────────────────────────────────────────────────────────────────────┐
│  ≋≋≋  WI · MN · CA · ZA · MT · EG · [AK]                           │
└─────────────────────────────────────────────────────────────────────┘
         ↑ mini braid icon            ↑ current highlighted
```

- Full visual impact at top
- Persistent navigation when reading
- Click chip → jumps back up + scrolls to section
- The `≋≋≋` icon could be a tiny SVG of the braid

**Pros:** Full story + persistent nav
**Cons:** Two UI elements to maintain

---

## Option G: Full-Page Entry Experience

The braid IS the entry point. Landing on /experience/ shows:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        JEFFREY JOHNSON                              │
│                                                                     │
│     ══════════════════════════════════════════════════════════      │
│         [interactive braid - hover to explore]                      │
│     ══════════════════════════════════════════════════════════      │
│                                                                     │
│     "Three threads. Thirty years. One convergence."                 │
│                                                                     │
│                     [Enter the story ↓]                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Scrolling down reveals the detailed sections.
Or clicking an era takes you directly there.

**Pros:** Dramatic, memorable, tells story upfront
**Cons:** Extra friction to content

---

## Recommendation for 2026 AI Engineering Focus

**Option F (Hybrid)** or **Option D (Enhanced Braid)** with these additions:

1. **Convergence callout**: Where the threads meet (Alaska), show a brief "This is why I'm here" statement

2. **Quick stats on hover**: Not just narrative, but proof points
   - "17 years teaching"
   - "Production apps shipped"
   - "PhD Mathematics"

3. **Navigation targets beyond this page**:
   - Click Alaska → jump to section OR show card with links to Projects, Research
   - The navigator becomes site-wide wayfinding

4. **Keyboard shortcuts**: `j`/`k` to move between eras, `enter` to expand

5. **Future-facing language**: Not "Previous Positions" but "Foundation" or "The Path"

---

## Next Steps

Which direction resonates? I can implement:
- A: Floating bar
- B: Side rail
- C: Scrubber
- D: Enhanced braid (current + improvements)
- E: Command palette
- F: Hybrid (recommended)
- G: Full-page entry

Or a combination of elements from multiple options.
