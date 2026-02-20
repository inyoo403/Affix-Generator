import type {
  Affix,
  ComboBlend,
  GeneratedItem,
  RarityTier,
  SynergyConflict,
} from '../types';
import { PREFIXES } from '../data/prefixes';
import { SUFFIXES } from '../data/suffixes';
import { BASE_ITEMS } from '../data/baseItems';
import { COMBO_BLENDS, SYNERGY_CONFLICTS } from '../data/synergies';
import { weightedRandomSelect, calculateEffectiveRarity } from './weights';
import { calculateStats } from './stats';

let idCounter = 0;

function findConflict(prefix: Affix, suffix: Affix): SynergyConflict | undefined {
  const pTags = prefix.tags ?? [];
  const sTags = suffix.tags ?? [];

  for (const rule of SYNERGY_CONFLICTS) {
    if (rule.type !== 'conflict') continue;
    const pHas = pTags.includes(rule.tagA) || pTags.includes(rule.tagB);
    const sHas = sTags.includes(rule.tagA) || sTags.includes(rule.tagB);
    if (pHas && sHas) return rule;
  }
  return undefined;
}

function findSynergy(prefix: Affix, suffix: Affix): SynergyConflict | undefined {
  const pTags = prefix.tags ?? [];
  const sTags = suffix.tags ?? [];

  for (const rule of SYNERGY_CONFLICTS) {
    if (rule.type !== 'synergy') continue;
    const aInPrefix = pTags.includes(rule.tagA);
    const bInPrefix = pTags.includes(rule.tagB);
    const aInSuffix = sTags.includes(rule.tagA);
    const bInSuffix = sTags.includes(rule.tagB);
    if ((aInPrefix && bInSuffix) || (bInPrefix && aInSuffix)) return rule;
  }
  return undefined;
}

function findCombo(prefix: Affix, suffix: Affix): ComboBlend | undefined {
  const pTags = prefix.tags ?? [];
  const sTags = suffix.tags ?? [];

  for (const combo of COMBO_BLENDS) {
    const pHas = pTags.includes(combo.prefixTag);
    const sHas = sTags.includes(combo.suffixTag);
    if (pHas && sHas) return combo;

    const pHasS = pTags.includes(combo.suffixTag);
    const sHasP = sTags.includes(combo.prefixTag);
    if (pHasS && sHasP) return combo;
  }
  return undefined;
}

export interface GeneratorState {
  pityCounter: number;
}

export function generateItem(
  baseTier: RarityTier,
  state: GeneratorState,
  enableSynergies: boolean = true
): { item: GeneratedItem; newState: GeneratorState } {
  const effectiveRarity = calculateEffectiveRarity(baseTier, state.pityCounter);

  let prefix: Affix;
  let suffix: Affix;
  let attempts = 0;
  const maxAttempts = 20;

  do {
    prefix = weightedRandomSelect(PREFIXES, effectiveRarity);
    suffix = weightedRandomSelect(SUFFIXES, effectiveRarity);
    attempts++;
  } while (
    enableSynergies &&
    findConflict(prefix, suffix) !== undefined &&
    attempts < maxAttempts
  );

  const base = BASE_ITEMS[Math.floor(Math.random() * BASE_ITEMS.length)];

  const combo = enableSynergies ? findCombo(prefix, suffix) : undefined;
  const synergy = enableSynergies ? findSynergy(prefix, suffix) : undefined;

  const stats = calculateStats(base, prefix, suffix, effectiveRarity, combo, synergy);

  const fullName = combo
    ? `${combo.fusedName} ${base.name}`
    : `${prefix.name} ${base.name} ${suffix.name}`;

  const isRareOrAbove = effectiveRarity >= 3;
  const newPity = isRareOrAbove ? 0 : state.pityCounter + 1;

  const item: GeneratedItem = {
    id: `item-${++idCounter}-${Date.now()}`,
    prefix,
    suffix,
    base,
    rarity: effectiveRarity,
    stats,
    fullName,
    combo,
    synergy,
    timestamp: Date.now(),
  };

  return { item, newState: { pityCounter: newPity } };
}
