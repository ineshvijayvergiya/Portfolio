# Portfolio v4 Update — Integration Guide

## Files Delivered

| File | Type | Summary |
|------|------|---------|
| `NavBar.jsx` | Updated | Recruiter/Cyber toggle, mode banner, clean layout |
| `App.jsx` | Updated | GitHubRadar removed, isStandardMode state, conditional render |
| `StandardMode.jsx` | **NEW** | Clean recruiter resume: skills, projects, timeline, CTA |
| `Terminal.jsx` | Updated | Hire easter egg → animated sequence → mailto link |
| `ProjectPlanets.jsx` | Updated | Top 5 planets only + Warp Portal with hyperspace transition |
| `ProjectArchive.jsx` | **NEW** | Full-screen 42-project masonry archive with filters + search |

## Drop-in locations

```
src/
├── components/
│   ├── NavBar.jsx          ← Replace
│   ├── App.jsx             ← Replace
│   ├── StandardMode.jsx    ← NEW — add here
│   ├── Terminal.jsx        ← Replace
│   ├── ProjectPlanets.jsx  ← Replace
│   └── ProjectArchive.jsx  ← NEW — add here
```

GitHubRadar.jsx — **delete this file entirely** (no longer imported anywhere)

---

## Feature 1: GitHubRadar — Removed

The `GitHubRadar` component and all associated imports are fully removed from `App.jsx`.
No dangling state, no API calls, no imports.

---

## Feature 2: Recruiter Mode Toggle

The `NavBar` now accepts two props:
```jsx
<NavBar isStandardMode={isStandardMode} onModeToggle={toggleMode} />
```

The toggle in the navbar switches between:
- **CYBER** mode → Full immersive 3D experience (default)
- **RECRUITER** mode → Clean `StandardMode` resume layout

A green banner appears under the nav when recruiter mode is active.

The `App.jsx` manages `isStandardMode` state and conditionally renders either:
```jsx
{isStandardMode ? <StandardMode /> : <main>...full experience...</main>}
```

The `ProjectArchive` overlay works in **both** modes (it's a fixed overlay on top of everything).

---

## Feature 3: Hire Easter Egg

**Trigger patterns** (any of these will fire the easter egg):
- `hire`
- `hire me`
- `i want to hire you`
- `want to hire`
- `looking to hire`
- `interested in hiring`
- `can i hire`
- `hire you`

**What happens:**
1. A `HireSequence` component renders in the terminal output
2. It animates through 7 lines with staggered delays:
   - `> HIRE INTENT DETECTED.`
   - `> INITIATING SECURE COMMS...`
   - `> ENCRYPTING TRANSMISSION...`
   - `> ROUTING THROUGH NEURAL GRID...`
   - `> OPENING SECURE CHANNEL TO: ineshvijay.work@gmail.com`
   - `> SUBJECT: "Opportunity: Saw your awesome portfolio!"`
   - `> TRANSMISSION READY. LAUNCHING EMAIL CLIENT...`
3. After the final line, triggers:
   ```
   window.location.href = "mailto:ineshvijay.work@gmail.com?subject=Opportunity%3A%20Saw%20your%20awesome%20portfolio!"
   ```

The `hire` quick-button in the terminal footer is styled in **yellow** to hint at it being special.

---

## Feature 4: Deep Space Archive

### Warp Portal
`ProjectPlanets` now accepts:
```jsx
<ProjectPlanets onOpenArchive={() => setShowArchive(true)} />
```

The Warp Portal button sits below the 3D canvas. Clicking it:
1. Plays a full-screen hyperspace flash animation (radial gradient + speed lines)
2. Shows `WARPING... / ENTERING DEEP SPACE ARCHIVE` text
3. After 900ms, calls `onOpenArchive()` which sets `showArchive = true` in `App.jsx`

### Project Archive
A full-screen `position: fixed` overlay with:
- **42 real projects** across 5 categories
- **Filter tabs**: ALL / MERN / UI/UX / AI Tools / Full Stack / Experiments
- **Search**: real-time text search across name, description and tags
- **Sort**: Newest / Oldest / A→Z
- **Masonry grid**: `columns-1 sm:columns-2 lg:columns-3 xl:columns-4`
- **Entry animation**: cyan scan-line sweeps from top to bottom on open
- **Exit**: "← RETURN TO SYSTEM" button (top-right and bottom-center)

Cards use `motion.div` with `layout` prop for smooth reflow during filtering.

### To populate your real projects:
Replace the `ALL_PROJECTS` array in `ProjectArchive.jsx` with your actual 40+ projects. The schema is:
```js
{
  id: number,
  name: string,
  cat: 'MERN' | 'UI/UX' | 'AI Tools' | 'Full Stack' | 'Experiments',
  tags: string[],
  year: string,
  status: 'SHIPPED' | 'OPEN SOURCE' | 'EXPERIMENT',
  desc: string,
  color: string,   // neon hex
  size: 'sm' | 'md' | 'lg',  // affects visual weight (currently unused but ready)
}
```

---

## No extra dependencies needed

All features use only packages already in the project:
- `framer-motion` — mode transitions, archive animations, hire sequence
- `three` — planet system (unchanged)
- `react` — state management

No new `npm install` required.
