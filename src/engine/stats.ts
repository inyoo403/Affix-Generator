import type { Affix, BaseItem, ComboBlend, RarityTier, Stats, SynergyConflict } from '../types';

const RARITY_MULTIPLIER: Record<RarityTier, number> = {
  1: 1.0,
  2: 1.3,
  3: 1.6,
  4: 2.0,
  5: 2.8,
};

function jitter(value: number): number {
  return value + Math.floor(Math.random() * 3) - 1;
}

export function calculateStats(
  base: BaseItem,
  prefix: Affix,
  suffix: Affix,
  rarity: RarityTier,
  combo?: ComboBlend,
  synergy?: SynergyConflict
): Stats {
  const mult = RARITY_MULTIPLIER[rarity];
  const keys: (keyof Stats)[] = ['ATK', 'DEF', 'SPD', 'LCK', 'CHS'];

  const stats: Stats = { ATK: 0, DEF: 0, SPD: 0, LCK: 0, CHS: 0 };

  for (const k of keys) {
    const baseVal = base.baseStats[k];
    const prefixVal = prefix.statBias[k] ?? 0;
    const suffixVal = suffix.statBias[k] ?? 0;
    const comboVal = combo?.bonusStats[k] ?? 0;
    const synergyVal = synergy?.synergyBonus?.[k] ?? 0;

    const raw = baseVal + (prefixVal + suffixVal) * mult + comboVal + synergyVal;
    stats[k] = Math.max(0, Math.round(jitter(raw)));
  }

  return stats;
}
