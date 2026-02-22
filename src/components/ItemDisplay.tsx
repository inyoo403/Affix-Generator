import type { GeneratedItem } from '../types';
import { RARITY_NAMES, RARITY_COLORS } from '../types';
import type { RarityTier } from '../types';

interface ItemDisplayProps {
  items: GeneratedItem[];
  selectedItem: GeneratedItem | null;
  onSelectItem: (item: GeneratedItem) => void;
}

const STAT_COLORS: Record<string, string> = {
  ATK: '#ff6b6b',
  DEF: '#51cf66',
  SPD: '#339af0',
  LCK: '#ffd43b',
  CHS: '#cc5de8',
};

const MAX_STAT = 80;

export default function ItemDisplay({
  items,
  selectedItem,
  onSelectItem,
}: ItemDisplayProps) {
  if (!selectedItem) {
    return (
      <div className="panel-right">
        <div className="glass-panel">
          <div className="panel-title">Generated Items</div>
          <div className="empty-state">
            <div className="empty-icon">🎲</div>
            <div className="empty-text">Generate an item to get started</div>
          </div>
        </div>
      </div>
    );
  }

  const item = selectedItem;
  const color = RARITY_COLORS[item.rarity];
  const rarityName = RARITY_NAMES[item.rarity];
  const isLegendary = item.rarity === 5;

  return (
    <div className="panel-right">
      <div className="glass-panel">
        <div className="panel-title">Generated Items</div>
        <div className="item-display">
          <div
            className="hero-card"
            key={item.id}
            style={{ borderColor: `${color}30` }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 30% 0%, ${color}12 0%, transparent 60%)`,
                borderRadius: 'var(--radius)',
                pointerEvents: 'none',
              }}
            />
            <div className="hero-card-header">
              <div className="hero-emoji">{item.base.emoji}</div>
              <div className="hero-info">
                <div
                  className={`hero-name ${isLegendary ? 'legendary-shimmer' : ''}`}
                  style={!isLegendary ? { color } : undefined}
                >
                  {item.fullName}
                </div>
                <span
                  className="hero-rarity"
                  style={{
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}35`,
                  }}
                >
                  {rarityName}
                </span>
                <div className="affix-details">
                  <span className="affix-chip">⬆ {item.prefix.name}</span>
                  <span className="affix-chip">⬇ {item.suffix.name}</span>
                </div>
              </div>
            </div>

            {item.combo && (
              <div className="hero-combo-badge">
                <div className="hero-combo-title">
                  COMBO: {item.combo.fusedName}
                </div>
                {item.combo.description}
              </div>
            )}

            {item.synergy && item.synergy.type === 'synergy' && (
              <div className="hero-synergy-badge">
                ✦ Synergy Active — bonus stats applied
              </div>
            )}

            <div className="stats-grid" style={{ marginTop: 16 }}>
              {(Object.keys(item.stats) as (keyof typeof item.stats)[]).map(
                (key) => {
                  const val = item.stats[key];
                  const pct = Math.min((val / MAX_STAT) * 100, 100);
                  return (
                    <div className="stat-row" key={key}>
                      <span className="stat-label">{key}</span>
                      <div className="stat-bar-bg">
                        <div
                          className="stat-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${STAT_COLORS[key]}90, ${STAT_COLORS[key]})`,
                          }}
                        />
                      </div>
                      <span className="stat-value">{val}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="history-section">
            <div className="history-header">
              History ({items.length} items)
            </div>
            <div className="history-list">
              {items.map((h) => {
                const hColor = RARITY_COLORS[h.rarity as RarityTier];
                return (
                  <div
                    key={h.id}
                    className={`history-item ${h.id === item.id ? 'selected' : ''}`}
                    onClick={() => onSelectItem(h)}
                  >
                    <span className="history-emoji">{h.base.emoji}</span>
                    <div className="history-info">
                      <div className="history-name" style={{ color: hColor }}>
                        {h.fullName}
                      </div>
                    </div>
                    <div
                      className="history-rarity-dot"
                      style={{ background: hColor }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
