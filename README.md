# Affix Generator

A random item generator built with **React**, **TypeScript**, and **Vite**. Items are composed of a random prefix, a base item, and a suffix — each influenced by a weighted rarity system, pity mechanics, synergy rules, and combo blending.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
  - [Rarity System](#rarity-system)
  - [Weighted Selection](#weighted-selection)
  - [Pity Counter](#pity-counter)
  - [Synergies and Conflicts](#synergies-and-conflicts)
  - [Combo Blending](#combo-blending)
  - [Stat Calculation](#stat-calculation)
- [Usage](#usage)
- [Reflection](#reflection)
- [Tech Stack](#tech-stack)

## Features

- **Weighted rarity tiers** — 5 tiers from Common to Legendary, each affecting which affixes appear
- **Pity counter** — increases your chance of getting a rare item after a streak of common drops
- **Synergies & conflicts** — certain tag combinations grant bonus stats or are forbidden from appearing together
- **Combo blending** — matching tag pairs fuse into a unique item name (e.g., "RADIOACTIVE", "PHOENIX-BORN")
- **Batch generation** — generate 10 items at once
- **Item history** — browse previously generated items and inspect their stats
- **Glassmorphism UI** — modern frosted-glass aesthetic with color-coded rarity

## Project Structure

```
Affix-Generator/
├── index.html                 # HTML entry point
├── package.json               # Dependencies and npm scripts
├── tsconfig.json              # TypeScript compiler options
├── vite.config.ts             # Vite bundler configuration
└── src/
    ├── main.tsx               # React DOM root
    ├── App.tsx                # Top-level component (state + layout)
    ├── App.css                # Global styles
    ├── types.ts               # Shared TypeScript interfaces
    ├── components/
    │   ├── ItemDisplay.tsx     # Shows the selected item card + history list
    │   └── SettingsPanel.tsx   # Rarity slider, synergy toggle, generate buttons
    ├── engine/
    │   ├── generator.ts       # Core generation logic (pick affixes, resolve rules)
    │   ├── stats.ts           # Final stat calculation
    │   └── weights.ts         # Weighted random selection + pity boost
    └── data/
        ├── baseItems.ts       # 14 base items (Frying Pan, Duck, etc.)
        ├── prefixes.ts        # 24 prefix affixes with per-tier weights
        ├── suffixes.ts        # 24 suffix affixes with per-tier weights
        └── synergies.ts       # Combo blend recipes + synergy/conflict rules
```

## Prerequisites

- **Node.js** v18 or higher — [download here](https://nodejs.org/)
- **npm** (bundled with Node.js)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/inho/Affix-Generator.git
cd Affix-Generator
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

4. **Build for production** (optional)

```bash
npm run build
```

This compiles TypeScript and bundles everything into the `dist/` folder. You can preview the production build with:

```bash
npm run preview
```

## How It Works

### Rarity System

Every generated item is assigned one of five rarity tiers:

| Tier | Name      | Color  | Stat Multiplier |
|------|-----------|--------|-----------------|
| 1    | Common    | Gray   | 1.0x            |
| 2    | Uncommon  | Green  | 1.3x            |
| 3    | Rare      | Blue   | 1.6x            |
| 4    | Epic      | Purple | 2.0x            |
| 5    | Legendary | Orange | 2.8x            |

Higher tiers produce stronger items because affix stat biases are multiplied by the tier's multiplier.

### Weighted Selection

Each affix has a `weights` array of five numbers — one weight per rarity tier. When generating at tier 3, for example, only the third weight value matters. Affixes with a higher weight at that tier are more likely to be selected.

```
"Slightly Used"  → weights: [50, 30, 10, 3, 1]   // common-leaning
"Australium"     → weights: [1,  2, 10, 38, 30]   // epic-leaning
"Omniscient"     → weights: [0,  1,  5, 18, 50]   // legendary-leaning
```

The selection algorithm sums all weights for the current tier, rolls a random number in that range, and walks the list until the roll is exhausted.

### Pity Counter

The pity counter prevents long streaks of low-rarity drops:

- Starts at **0**
- **Increments by 1** every time you get a Common or Uncommon item
- Each point adds **+5% chance** that the next item's rarity is boosted above the base tier
- At 20 stacks, there is a **100% chance** of a rarity upgrade
- **Resets to 0** whenever you receive a Rare or higher item

### Synergies and Conflicts

Tags are short labels attached to affixes (e.g., `cursed`, `golden`, `fire`). Two types of rules govern tag interactions:

**Conflicts** — If the selected prefix and suffix share a conflicting tag pair, the generator re-rolls (up to 20 attempts). Examples:

- `cursed` + `blessed` (contradictory themes)
- `frozen` + `fire` (opposing elements)

**Synergies** — If the prefix and suffix share a synergistic tag pair, the item receives bonus stats. Examples:

- `golden` + `aussie` → +5 ATK, +5 LCK, +3 DEF
- `berserk` + `strong` → +10 ATK, +3 SPD, -2 DEF

### Combo Blending

When prefix and suffix tags match a specific recipe, the item gets a special fused name instead of the normal "Prefix + Base + Suffix" format:

| Prefix Tag | Suffix Tag | Fused Name             |
|------------|------------|------------------------|
| `cursed`   | `poison`   | RADIOACTIVE            |
| `berserk`  | `berserk`  | BERSERKER'S FURY       |
| `dark`     | `cosmic`   | VOID-TOUCHED           |
| `alive`    | `fire`     | PHOENIX-BORN           |
| `golden`   | `unusual`  | MANN CO. PREMIUM       |
| `tech`     | `tech`     | SINGULARITY ENGINE     |
| `spooky`   | `cursed`   | POLTERGEIST            |
| `cosmic`   | `meta`     | FOURTH-DIMENSIONAL     |

Combo items also receive bonus stats on top of the normal calculation.

### Stat Calculation

Each item has five stats: **ATK**, **DEF**, **SPD**, **LCK**, and **CHS**. The final value for each stat is computed as:

```
finalStat = baseStat + (prefixBias + suffixBias) * rarityMultiplier + comboBonus + synergyBonus + jitter
```

- `baseStat` — from the base item (e.g., Frying Pan has 8 ATK)
- `prefixBias` / `suffixBias` — stat modifiers from the selected affixes
- `rarityMultiplier` — scales with rarity tier (1.0x to 2.8x)
- `comboBonus` — flat bonus if a combo blend is active
- `synergyBonus` — flat bonus if a synergy rule matches
- `jitter` — small random offset (-1 to +1) for variety

All stats are floored at 0 (no negatives).

## Usage

1. **Set the rarity tier** — use the slider to choose a base tier (1 through 5). Higher tiers skew the affix pool toward rarer, stronger options.

2. **Toggle synergies** — turn "Affix Synergy Rules" on or off. When enabled, the generator enforces conflict re-rolls, applies synergy bonuses, and checks for combo blends.

3. **Generate items** — click **Generate Item** for a single item, or **Batch Generate (10)** to create ten items at once.

4. **Inspect items** — the main card displays the selected item with its full name, rarity badge, emoji, and animated stat bars. The pity counter is shown in the settings panel.

5. **Browse history** — previously generated items appear in a scrollable list. Click any item to view its details.

## Reflection

Building this affix generator revealed how much the "feel" of randomness depends on weight tuning rather than pure RNG. The pity counter adds +5% upgrade chance per miss, but in practice it rarely stacks high because a 10% natural variance roll can bump the rarity to Rare or above, which resets the counter before it accumulates. This means the pity system acts more as a safety net for extreme cold streaks rather than a consistently noticeable mechanic. The synergy conflict system required a re-roll loop that occasionally hit the max attempt cap with narrow pools, which taught me to always set a fallback. Combo blending was the most fun part. Merging tag matched affixes into a fused name like "RADIOACTIVE" felt rewarding and gave items a distinct personality.
