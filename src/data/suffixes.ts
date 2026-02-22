import type { Affix } from '../types';

export const SUFFIXES: Affix[] = [
  // --- Common-leaning ---
  {
    name: 'of Mild Inconvenience',
    weights: [50, 30, 10, 3, 1],
    statBias: { CHS: 2, ATK: 1 },
    tags: ['mundane'],
  },
  {
    name: 'of Questionable Origin',
    weights: [45, 28, 14, 5, 2],
    statBias: { CHS: 3, LCK: -1 },
    tags: ['shady'],
  },
  {
    name: 'of Tuesday',
    weights: [48, 32, 10, 3, 1],
    statBias: { LCK: 1 },
    tags: ['mundane'],
  },
  {
    name: 'from the Lost & Found',
    weights: [42, 30, 14, 6, 2],
    statBias: { DEF: 2, CHS: 2 },
    tags: ['cheap'],
  },
  {
    name: 'of Excessive Paperwork',
    weights: [40, 32, 15, 6, 2],
    statBias: { SPD: -3, DEF: 3 },
    tags: ['mundane', 'legal'],
  },
  {
    name: "of Someone Else's Problem",
    weights: [44, 28, 14, 6, 2],
    statBias: { LCK: 3, CHS: 2 },
    tags: ['mundane'],
  },

  // --- Uncommon-leaning ---
  {
    name: 'of Unreasonable Confidence',
    weights: [10, 40, 28, 12, 5],
    statBias: { ATK: 5, DEF: -2 },
    tags: ['berserk'],
  },
  {
    name: 'of Passive Aggression',
    weights: [8, 35, 30, 15, 6],
    statBias: { ATK: 4, CHS: 4 },
    tags: ['social'],
  },
  {
    name: 'of Accidental Genius',
    weights: [5, 30, 35, 18, 8],
    statBias: { LCK: 6, CHS: 4 },
    tags: ['smart'],
  },
  {
    name: 'of Dubious Legality',
    weights: [8, 32, 30, 16, 8],
    statBias: { ATK: 5, LCK: -2, CHS: 3 },
    tags: ['shady', 'legal'],
  },
  {
    name: 'of Uncomfortable Eye Contact',
    weights: [6, 30, 32, 18, 8],
    statBias: { CHS: 7, DEF: 3 },
    tags: ['social'],
  },

  // --- Rare-leaning ---
  {
    name: 'of the Eternal Intern',
    weights: [2, 10, 40, 28, 12],
    statBias: { SPD: 6, ATK: 3, LCK: -2 },
    tags: ['mundane', 'fast'],
  },
  {
    name: 'of Toxic Fumes',
    weights: [2, 8, 38, 30, 14],
    statBias: { ATK: 6, CHS: 5, DEF: -2 },
    tags: ['poison'],
  },
  {
    name: 'of Spontaneous Combustion',
    weights: [3, 10, 35, 30, 15],
    statBias: { ATK: 8, CHS: 6, DEF: -4 },
    tags: ['fire'],
  },
  {
    name: 'of Infinite Recursion',
    weights: [1, 8, 36, 30, 16],
    statBias: { CHS: 10, SPD: -3 },
    tags: ['tech', 'cosmic'],
  },

  // --- Epic-leaning ---
  {
    name: 'of Raw Power',
    weights: [1, 3, 12, 42, 25],
    statBias: { ATK: 12, SPD: 4, DEF: -3 },
    tags: ['berserk', 'strong'],
  },
  {
    name: 'of Existential Dread',
    weights: [1, 2, 10, 40, 28],
    statBias: { CHS: 12, DEF: 6, LCK: -4 },
    tags: ['dark', 'cosmic'],
  },
  {
    name: 'of Absolute Zero',
    weights: [1, 3, 8, 40, 28],
    statBias: { DEF: 10, SPD: -6, ATK: 6 },
    tags: ['frozen'],
  },
  {
    name: 'of the Mann Co. CEO',
    weights: [1, 4, 10, 38, 30],
    statBias: { LCK: 10, ATK: 6, DEF: 4 },
    tags: ['aussie', 'legendary'],
  },

  // --- Legendary-leaning ---
  {
    name: 'of Eternal Damnation',
    weights: [0, 1, 5, 18, 50],
    statBias: { ATK: 18, CHS: 14, LCK: -8 },
    tags: ['cursed', 'dark'],
  },
  {
    name: 'of the Fourth Wall',
    weights: [0, 1, 3, 15, 55],
    statBias: { CHS: 25, LCK: 10 },
    tags: ['cosmic', 'meta'],
  },
  {
    name: 'of Hale-Tier Muscles',
    weights: [0, 1, 4, 14, 52],
    statBias: { ATK: 20, DEF: 12, SPD: 6 },
    tags: ['aussie', 'strong'],
  },
  {
    name: 'of Divine Crit Rate',
    weights: [0, 0, 3, 14, 55],
    statBias: { LCK: 22, ATK: 12 },
    tags: ['blessed', 'divine'],
  },
  {
    name: 'of Unusual Effects',
    weights: [0, 1, 5, 16, 48],
    statBias: { CHS: 20, LCK: 10, ATK: 8 },
    tags: ['unusual'],
  },
];
