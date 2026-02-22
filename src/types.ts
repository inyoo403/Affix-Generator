export type RarityTier = 1 | 2 | 3 | 4 | 5;

export const RARITY_NAMES: Record<RarityTier, string> = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Epic',
  5: 'Legendary',
};

export const RARITY_COLORS: Record<RarityTier, string> = {
  1: '#9e9e9e',
  2: '#4caf50',
  3: '#2196f3',
  4: '#9c27b0',
  5: '#ff9800',
};

export interface Affix {
  name: string;
  weights: [number, number, number, number, number]; // weight per rarity tier 1-5
  statBias: Partial<Stats>;
  tags?: string[];
}

export interface BaseItem {
  name: string;
  emoji: string;
  baseStats: Stats;
  category: 'weapon' | 'hat' | 'food' | 'tool' | 'misc';
}

export interface Stats {
  ATK: number;
  DEF: number;
  SPD: number;
  LCK: number;
  CHS: number;
}

export interface ComboBlend {
  prefixTag: string;
  suffixTag: string;
  fusedName: string;
  bonusStats: Partial<Stats>;
  description: string;
}

export interface SynergyConflict {
  tagA: string;
  tagB: string;
  type: 'conflict' | 'synergy';
  synergyBonus?: Partial<Stats>;
}

export interface GeneratedItem {
  id: string;
  prefix: Affix;
  suffix: Affix;
  base: BaseItem;
  rarity: RarityTier;
  stats: Stats;
  fullName: string;
  combo?: ComboBlend;
  synergy?: SynergyConflict;
  timestamp: number;
}
