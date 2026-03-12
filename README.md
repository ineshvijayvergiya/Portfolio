# INESH.DEV — Cyberpunk RPG Developer Portfolio

A fully immersive **cyberpunk-themed developer portfolio** designed as a **playable RPG interface**.

Instead of a traditional portfolio website, this project transforms the developer experience into an **interactive game-like environment** featuring a boot sequence, skill trees, orbiting project planets, and a command-line AI terminal.

The goal is to showcase projects and skills through **gamified UI, cinematic animations, and immersive visual effects**.

---

# Live Experience

Enter the cyberpunk interface and explore the developer system.

Boot System → Explore Skill Tree → Discover Projects → Use Terminal

This portfolio behaves like a **developer operating system** where visitors can interact with different modules.

---

# Tech Stack

## Core

- React 18 — Component architecture
- Vite — Lightning-fast build tool
- TailwindCSS — Utility-first styling system

## Animation & Visual Effects

- Framer Motion — Scroll-based cinematic animations
- Three.js — 3D holographic visuals and orbital systems
- Custom Canvas Effects — Particle systems and neon overlays

## Typography

- JetBrains Mono — Terminal-style developer font
- Orbitron — Futuristic cyberpunk headings

---

# Key Features

## Boot System Interface

A cinematic startup sequence inspired by futuristic operating systems.

Features:

- Animated character loader
- Typewriter boot logs
- Color-coded system messages
- Animated loading progress bar
- Smooth transition into main interface

---

## Hero Section — Developer Profile

The landing module presents the developer identity through a **3D holographic interface**.

Includes:

- Three.js hologram orb
- Orbiting nodes and rings
- GitHub XP level system
- Animated developer statistics

Displayed stats include:

- Commits
- Projects
- Stars
- Followers
- Experience Level

Skill attributes are represented through animated XP bars.

---

## Project Planet System

Projects are visualized as **orbiting planets in a solar system**.

Each planet represents a project and includes:

- Unique orbit radius and speed
- Neon color themes
- Rotation animation
- Hover detection via raycasting
- Click interaction to open project details

Project modals display:

- Description
- Tech stack
- GitHub links
- XP reward system

---

## Interactive Skill Tree

Inspired by RPG skill progression systems.

Features:

- Node-based skill graph
- Animated connection lines
- Unlock progression animation
- Skill information panel
- XP bars and level indicators

Visitors can explore different development skills visually.

---

## Developer Inventory

A **game-style tool inventory system** representing technologies used by the developer.

Features:

- 16-slot grid inventory
- Category filtering
- Item rarity system

Rarity types:

- Legendary
- Epic
- Rare
- Uncommon

Each item includes hover glow effects and detailed descriptions.

---

## AI Terminal Console

An interactive **cyberpunk command-line interface**.

Users can execute commands to explore the portfolio.

Supported commands:

help  
projects  
skills  
email  
github  
linkedin  
hire  
status  
whoami  
clear

Features include:

- Typewriter output animation
- Arrow key command history
- Quick command buttons
- Blinking terminal cursor

---

# Visual Effects System

The portfolio includes multiple real-time effects to create a cyberpunk atmosphere.

Effects include:

- Custom glowing cursor with particle trail
- Dynamic particle field background
- CRT scanline overlay
- Perspective grid background
- HUD corner decorations
- Neon glow text
- Glitch animations
- Side HUD interface panels

---

# Project Structure

```
src
├── components
│   ├── BootScreen.jsx
│   ├── NavBar.jsx
│   ├── HeroSection.jsx
│   ├── ProjectPlanets.jsx
│   ├── SkillTree.jsx
│   ├── Inventory.jsx
│   └── Terminal.jsx
│
├── effects
│   ├── CursorGlow.jsx
│   ├── ParticleField.jsx
│   ├── ScanLines.jsx
│   └── HologramCanvas.jsx
│
├── hooks
│   ├── useMouseGlow.js
│   └── useScrollReveal.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation

Clone the repository:

```
git clone https://github.com/yourusername/inesh-dev.git
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Preview the production build:

```
npm run preview
```

---

# Customization Guide

To personalize the portfolio, update the following files:

- `HeroSection.jsx` → Developer info and stats  
- `ProjectPlanets.jsx` → Project data  
- `SkillTree.jsx` → Skills and progression tree  
- `Inventory.jsx` → Tools and technologies  
- `Terminal.jsx` → Custom terminal commands  
- `index.css` → Theme colors and animations  

---

# Performance Optimization

The project is optimized for smooth rendering and minimal performance overhead.

Optimizations include:

- Proper Three.js renderer disposal
- Cleanup of event listeners
- Particle rendering throttling
- `devicePixelRatio` limited to 2
- Intersection Observer animations triggered once
- Animation loops using `requestAnimationFrame`
- Localized state management to prevent unnecessary re-renders

---

# Future Improvements

Planned features include:

- AI chatbot assistant
- Dynamic GitHub project syncing
- Skill unlock achievements
- Interactive coding mini-games
- Advanced developer analytics dashboard

---

# Author

**Inesh**

Cyberpunk developer building immersive web experiences.