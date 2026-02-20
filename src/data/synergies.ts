import type { ComboBlend, SynergyConflict } from '../types';

export const SYNERGY_CONFLICTS: SynergyConflict[] = [
  // Conflicts — these tag pairs cannot appear together; re-roll if matched
  { tagA: 'cursed', tagB: 'blessed', type: 'conflict' },
  { tagA: 'cursed', tagB: 'divine', type: 'conflict' },
  { tagA: 'frozen', tagB: 'fire', type: 'conflict' },
  { tagA: 'cheap', tagB: 'legendary', type: 'conflict' },
  { tagA: 'mundane', tagB: 'cosmic', type: 'conflict' },

  // Synergies — these tag pairs grant bonus stats
  {
    tagA: 'golden',
    tagB: 'aussie',
    type: 'synergy',
    synergyBonus: { ATK: 5, LCK: 5, DEF: 3 },
  },
  {
    tagA: 'spooky',
    tagB: 'dark',
    type: 'synergy',
    synergyBonus: { WTF: 8, ATK: 3 },
  },
  {
    tagA: 'alive',
    tagB: 'smart',
    type: 'synergy',
    synergyBonus: { WTF: 6, SPD: 4, LCK: 3 },
  },
  {
    tagA: 'berserk',
    tagB: 'strong',
    type: 'synergy',
    synergyBonus: { ATK: 10, SPD: 3, DEF: -2 },
  },
  {
    tagA: 'blessed',
    tagB: 'divine',
    type: 'synergy',
    synergyBonus: { LCK: 12, DEF: 5, ATK: 5 },
  },
];

export const COMBO_BLENDS: ComboBlend[] = [
  {
    prefixTag: 'cursed',
    suffixTag: 'poison',
    fusedName: '☢ RADIOACTIVE',
    bonusStats: { ATK: 8, WTF: 12, LCK: -5 },
    description: 'Cursed toxins fused into something far worse. Handle with a 10-foot pole.',
  },
  {
    prefixTag: 'berserk',
    suffixTag: 'berserk',
    fusedName: "⚡ BERSERKER'S FURY",
    bonusStats: { ATK: 15, SPD: 8, DEF: -6 },
    description: 'Pure unhinged rage. Your enemies AND your teammates are concerned.',
  },
  {
    prefixTag: 'dark',
    suffixTag: 'cosmic',
    fusedName: '🌑 VOID-TOUCHED',
    bonusStats: { WTF: 18, ATK: 6, LCK: -4 },
    description: 'Whispers from between dimensions. It occasionally screams in binary.',
  },
  {
    prefixTag: 'alive',
    suffixTag: 'fire',
    fusedName: '🔥 PHOENIX-BORN',
    bonusStats: { ATK: 10, SPD: 6, DEF: 4, WTF: 5 },
    description: 'A living flame. It insists you call it by its preferred name.',
  },
  {
    prefixTag: 'golden',
    suffixTag: 'unusual',
    fusedName: '✨ MANN CO. PREMIUM',
    bonusStats: { ATK: 8, DEF: 8, LCK: 12, WTF: 6 },
    description: 'Comes with a certificate of authenticity (laminated, even).',
  },
  {
    prefixTag: 'tech',
    suffixTag: 'tech',
    fusedName: '🤖 SINGULARITY ENGINE',
    bonusStats: { WTF: 15, SPD: 10, ATK: 5 },
    description: 'It has achieved sentience and filed for a patent on itself.',
  },
  {
    prefixTag: 'spooky',
    suffixTag: 'cursed',
    fusedName: '👻 POLTERGEIST',
    bonusStats: { WTF: 14, ATK: 8, LCK: -6 },
    description: 'Haunted AND cursed. It rearranges your inventory when you are not looking.',
  },
  {
    prefixTag: 'cosmic',
    suffixTag: 'meta',
    fusedName: '🌌 FOURTH-DIMENSIONAL',
    bonusStats: { WTF: 22, LCK: 8, SPD: 4 },
    description: 'It exists in all timelines simultaneously. Very hard to insure.',
  },
];
