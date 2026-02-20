import { RARITY_NAMES, RARITY_COLORS } from '../types';
import type { RarityTier } from '../types';

interface SettingsPanelProps {
  rarityTier: RarityTier;
  onRarityChange: (tier: RarityTier) => void;
  onGenerate: () => void;
  onBatchGenerate: () => void;
  synergiesEnabled: boolean;
  onToggleSynergies: () => void;
  pityCounter: number;
}

export default function SettingsPanel({
  rarityTier,
  onRarityChange,
  onGenerate,
  onBatchGenerate,
  synergiesEnabled,
  onToggleSynergies,
  pityCounter,
}: SettingsPanelProps) {
  const color = RARITY_COLORS[rarityTier];
  const name = RARITY_NAMES[rarityTier];
  const pityPercent = Math.min(pityCounter * 5, 100);

  return (
    <div className="panel-left">
      <div className="glass-panel">
        <div className="panel-title">Configuration</div>

        <div className="settings-section">
          <div className="settings-label">
            <span>Rarity Tier</span>
            <span
              className="rarity-badge"
              style={{
                color,
                background: `${color}18`,
                border: `1px solid ${color}40`,
              }}
            >
              {name}
            </span>
          </div>
          <input
            type="range"
            className="rarity-slider"
            min={1}
            max={5}
            step={1}
            value={rarityTier}
            onChange={(e) => onRarityChange(Number(e.target.value) as RarityTier)}
            style={{
              background: `linear-gradient(90deg, ${color}60 ${(rarityTier - 1) * 25}%, rgba(255,255,255,0.1) ${(rarityTier - 1) * 25}%)`,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 6,
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            <span>Common</span>
            <span>Legendary</span>
          </div>
        </div>

        <div className="settings-section">
          <div className="toggle-row">
            <span className="toggle-label">Affix Synergy Rules</span>
            <div
              className={`toggle ${synergiesEnabled ? 'active' : ''}`}
              onClick={onToggleSynergies}
            />
          </div>
          <div
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.25)',
              marginTop: 2,
            }}
          >
            Prevents conflicts, enables combos & synergy bonuses
          </div>
        </div>

        <div className="settings-section">
          <div className="pity-display">
            <div className="pity-text">
              <span>Pity Counter (Feedback Loop)</span>
              <span>{pityCounter} / 20</span>
            </div>
            <div className="pity-bar-bg">
              <div
                className="pity-bar-fill"
                style={{ width: `${pityPercent}%` }}
              />
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.2)',
                marginTop: 6,
              }}
            >
              +{pityCounter * 5}% bonus rare chance — resets on Rare+ drop
            </div>
          </div>
        </div>

        <div className="btn-group" style={{ marginTop: 'auto' }}>
          <button className="btn btn-primary" onClick={onGenerate}>
            Generate Item
          </button>
          <button className="btn btn-secondary" onClick={onBatchGenerate}>
            Batch Generate (10)
          </button>
        </div>
      </div>
    </div>
  );
}
