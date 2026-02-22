import type { Affix } from '../types';

export const PREFIXES: Affix[] = [
  // --- Common-leaning (high weight at low tiers) ---
  {
    name: 'Slightly Used',
    weights: [50, 30, 10, 3, 1],
    statBias: { ATK: 1, DEF: 1 },
    tags: ['mundane'],
  },
  {
    name: 'Bootleg',
    weights: [45, 28, 12, 4, 1],
    statBias: { ATK: 2, CHS: 3 },
    tags: ['cheap'],
  },
  {
    name: 'Duct-Taped',
    weights: [48, 32, 10, 3, 1],
    statBias: { DEF: 3, SPD: -1 },
    tags: ['mundane'],
  },
  {
    name: 'Suspiciously Moist',
    weights: [40, 30, 15, 5, 2],
    statBias: { CHS: 5, LCK: -1 },
    tags: ['gross'],
  },
  {
    name: 'Budget',
    weights: [50, 25, 10, 3, 1],
    statBias: { ATK: -1, DEF: -1, LCK: 2 },
    tags: ['cheap'],
  },
  {
    name: "Grandma's Vintage",
    weights: [35, 30, 18, 8, 3],
    statBias: { DEF: 4, CHS: 2 },
    tags: ['old'],
  },

  // --- Uncommon-leaning ---
  {
    name: 'Questionably Legal',
    weights: [10, 40, 28, 12, 5],
    statBias: { ATK: 4, LCK: -2 },
    tags: ['shady'],
  },
  {
    name: 'Mildly Cursed',
    weights: [8, 35, 30, 15, 6],
    statBias: { ATK: 5, LCK: -3, CHS: 3 },
    tags: ['cursed'],
  },
  {
    name: 'Sentient',
    weights: [5, 30, 35, 18, 8],
    statBias: { CHS: 8, SPD: 2 },
    tags: ['alive'],
  },
  {
    name: 'Diplomatically Immune',
    weights: [5, 32, 30, 18, 8],
    statBias: { DEF: 6, LCK: 3 },
    tags: ['legal'],
  },
  {
    name: 'Screaming',
    weights: [8, 28, 32, 18, 8],
    statBias: { ATK: 7, CHS: 5, SPD: -2 },
    tags: ['loud', 'berserk'],
  },

  // --- Rare-leaning ---
  {
    name: 'Self-Aware',
    weights: [2, 10, 40, 28, 12],
    statBias: { CHS: 10, SPD: 3, LCK: 2 },
    tags: ['alive', 'smart'],
  },
  {
    name: 'Over-Engineered',
    weights: [2, 8, 38, 30, 14],
    statBias: { ATK: 6, DEF: 6, SPD: -4 },
    tags: ['tech'],
  },
  {
    name: 'Slightly Haunted',
    weights: [3, 12, 35, 28, 15],
    statBias: { CHS: 7, ATK: 3, LCK: -2 },
    tags: ['spooky'],
  },
  {
    name: 'Forbidden',
    weights: [1, 8, 35, 32, 16],
    statBias: { ATK: 8, CHS: 6, DEF: -3 },
    tags: ['cursed', 'dark'],
  },

  // --- Epic-leaning ---
  {
    name: 'Ungodly',
    weights: [1, 3, 12, 42, 25],
    statBias: { ATK: 12, CHS: 8, LCK: -5 },
    tags: ['cursed', 'dark'],
  },
  {
    name: 'Australium',
    weights: [1, 2, 10, 38, 30],
    statBias: { ATK: 10, DEF: 5, LCK: 8 },
    tags: ['golden', 'aussie'],
  },
  {
    name: 'Eldritch',
    weights: [1, 3, 8, 40, 28],
    statBias: { CHS: 15, ATK: 8, SPD: -3 },
    tags: ['dark', 'cosmic'],
  },
  {
    name: 'Weaponized',
    weights: [1, 4, 12, 38, 28],
    statBias: { ATK: 14, SPD: 4, DEF: -4 },
    tags: ['berserk'],
  },

  // --- Legendary-leaning ---
  {
    name: 'Omniscient',
    weights: [0, 1, 5, 18, 50],
    statBias: { CHS: 20, LCK: 10, SPD: 5 },
    tags: ['cosmic', 'smart'],
  },
  {
    name: "Saxton Hale's Personal",
    weights: [0, 1, 3, 15, 55],
    statBias: { ATK: 20, DEF: 10, SPD: 8 },
    tags: ['legendary', 'aussie'],
  },
  {
    name: 'Reality-Bending',
    weights: [0, 1, 4, 12, 52],
    statBias: { CHS: 25, LCK: 12, ATK: 8 },
    tags: ['cosmic'],
  },
  {
    name: 'Blessed by Gaben',
    weights: [0, 0, 3, 14, 55],
    statBias: { LCK: 20, ATK: 10, DEF: 10, SPD: 5 },
    tags: ['blessed', 'divine'],
  },
  {
    name: 'Unusual',
    weights: [0, 1, 5, 16, 48],
    statBias: { CHS: 18, ATK: 12, LCK: 8 },
    tags: ['unusual', 'golden'],
  },
];
