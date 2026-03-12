# INESH.DEV — Cyberpunk RPG Portfolio v2.0

A fully immersive cyberpunk developer portfolio built as a playable RPG-style interface.

## Stack

- **React 18** + **Vite** — Fast dev server, HMR
- **TailwindCSS** — Utility styling + custom cyber theme
- **Framer Motion** — Cinematic scroll animations, transitions
- **Three.js** — 3D hologram, orbiting planet system
- **JetBrains Mono** + **Orbitron** — Fonts

---

## Project Structure

```
src/
├── components/
│   ├── BootScreen.jsx      # Animated OS boot sequence
│   ├── NavBar.jsx          # Floating HUD navigation
│   ├── HeroSection.jsx     # Developer profile + XP system
│   ├── ProjectPlanets.jsx  # Three.js orbiting project planets
│   ├── SkillTree.jsx       # Interactive RPG skill tree
│   ├── Inventory.jsx       # Game-style tool inventory grid
│   └── Terminal.jsx        # AI cyberpunk command console
├── effects/
│   ├── CursorGlow.jsx      # Custom cursor + particle trail
│   ├── ParticleField.jsx   # Animated background particles
│   ├── ScanLines.jsx       # CRT scanline overlay
│   └── HologramCanvas.jsx  # Three.js hologram orb
├── hooks/
│   ├── useMouseGlow.js     # Mouse position tracking
│   └── useScrollReveal.js  # Intersection observer hook
├── App.jsx                 # Root orchestrator
├── main.jsx                # Entry point
└── index.css               # Global styles + keyframes
```

---

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Features

### Boot Screen
- Animated character loader with frame cycling
- Horizontal speed lines
- Typewriter-style system boot log with color-coded output
- Animated progress bar with shimmer
- Smooth exit transition into main interface

### Hero Section (3D)
- Three.js holographic orb with orbiting rings and nodes
- GitHub XP level system with animated fill bar
- Animated stat counters (commits, projects, stars, followers)
- Staggered XP bars for skill attributes

### Project Planet System
- Three.js solar system with 3 orbiting planets
- Each planet: neon color, slow rotation, unique orbit radius/speed
- Raycaster-based hover detection + click to open modal
- Project modal with tech stack, stats, XP reward
- Planet legend + card grid below canvas

### Interactive Skill Tree
- SVG connection lines between skill nodes
- Animated unlock sequence on load
- Animated dashed lines with dash-flow animation
- Click any node for detailed skill info panel
- XP bars, level display, unlock tree

### Developer Inventory
- 16-item grid with category filtering
- Rarity system (Legendary / Epic / Rare / Uncommon)
- Per-item color theming + hover glow
- Click for detailed item info panel

### AI Terminal
- Full command console with typed output animation
- 9 commands: help, projects, skills, email, github, linkedin, hire, status, whoami, clear
- Arrow key command history navigation
- Quick-execute buttons
- Blinking cursor

### Visual Effects
- Custom cursor with lagged ring + particle trail
- Animated particle field with connection lines
- CRT scanline overlay + moving scan beam
- Perspective grid background
- HUD corner brackets on all panels
- Neon glow text effects
- Glitch text animation on hero name
- Side HUD decorations

---

## Customization

Edit these files to personalize:

- `src/components/HeroSection.jsx` — Change name, role, stats
- `src/components/ProjectPlanets.jsx` — Update `PROJECTS` array
- `src/components/SkillTree.jsx` — Update `SKILLS` array
- `src/components/Inventory.jsx` — Update `TOOLS` array
- `src/components/Terminal.jsx` — Update `COMMANDS` object
- `src/index.css` — CSS variables for color theme

---

## Performance Notes

- Three.js renderers are properly disposed on unmount
- Event listeners cleaned up in all useEffect returns
- Particle connection lines rendered every other frame
- `devicePixelRatio` capped at 2
- Framer Motion uses `whileInView` with `once: true` to avoid re-triggers
- No unnecessary re-renders (state kept local, refs for animation loops)
