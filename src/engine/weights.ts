import type { Affix, RarityTier } from '../types';

export function weightedRandomSelect(pool: Affix[], tier: RarityTier): Affix {
  const tierIndex = tier - 1;
  const totalWeight = pool.reduce((sum, a) => sum + a.weights[tierIndex], 0);
  let roll = Math.random() * totalWeight;

  for (const affix of pool) {
    roll -= affix.weights[tierIndex];
    if (roll <= 0) return affix;
  }

  return pool[pool.length - 1];
}

export function calculateEffectiveRarity(
  baseTier: RarityTier,
  pityCounter: number
): RarityTier {
  const pityBoost = pityCounter * 0.05;
  const roll = Math.random();

  if (roll < pityBoost) {
    const boosted = Math.min(5, baseTier + 1 + Math.floor(pityCounter / 5)) as RarityTier;
    return boosted;
  }

  const variance = Math.random();
  if (variance < 0.1 && baseTier < 5) return (baseTier + 1) as RarityTier;
  if (variance > 0.95 && baseTier > 1) return (baseTier - 1) as RarityTier;

  return baseTier;
}
