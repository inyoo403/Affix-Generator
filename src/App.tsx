import { useState, useCallback } from 'react';
import './App.css';
import type { GeneratedItem, RarityTier } from './types';
import { generateItem } from './engine/generator';
import type { GeneratorState } from './engine/generator';
import SettingsPanel from './components/SettingsPanel';
import ItemDisplay from './components/ItemDisplay';

function App() {
  const [rarityTier, setRarityTier] = useState<RarityTier>(1);
  const [synergiesEnabled, setSynergiesEnabled] = useState(true);
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GeneratedItem | null>(null);
  const [generatorState, setGeneratorState] = useState<GeneratorState>({
    pityCounter: 0,
  });
  const [showReflection, setShowReflection] = useState(false);

  const handleGenerate = useCallback(() => {
    const { item, newState } = generateItem(
      rarityTier,
      generatorState,
      synergiesEnabled
    );
    setGeneratorState(newState);
    setItems((prev) => [item, ...prev]);
    setSelectedItem(item);
  }, [rarityTier, generatorState, synergiesEnabled]);

  const handleBatchGenerate = useCallback(() => {
    let currentState = generatorState;
    const newItems: GeneratedItem[] = [];

    for (let i = 0; i < 10; i++) {
      const { item, newState } = generateItem(
        rarityTier,
        currentState,
        synergiesEnabled
      );
      currentState = newState;
      newItems.push(item);
    }

    setGeneratorState(currentState);
    setItems((prev) => [...newItems, ...prev]);
    setSelectedItem(newItems[0]);
  }, [rarityTier, generatorState, synergiesEnabled]);

  return (
    <div className="app">
      <div className="app-header">
        <h1>AFFIX GENERATOR</h1>
        <span className="subtitle">TF2-Style Random Item Factory</span>
      </div>

      <div className="main-layout">
        <SettingsPanel
          rarityTier={rarityTier}
          onRarityChange={setRarityTier}
          onGenerate={handleGenerate}
          onBatchGenerate={handleBatchGenerate}
          synergiesEnabled={synergiesEnabled}
          onToggleSynergies={() => setSynergiesEnabled((p) => !p)}
          pityCounter={generatorState.pityCounter}
        />
        <ItemDisplay
          items={items}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />
      </div>

      <div className="reflection-bar">
        <div
          className="reflection-toggle"
          onClick={() => setShowReflection((p) => !p)}
        >
          {showReflection ? '▾ Hide Reflection' : '▸ Show Reflection'}
        </div>
        {showReflection && (
          <div className="reflection-content">
            <strong>Reflection:</strong> Building this TF2-style affix generator
            revealed how much the "feel" of randomness depends on weight tuning
            rather than pure RNG. The biggest surprise was how often the pity
            counter (Challenge A) triggered meaningful upgrades — even a +5% per
            miss stacks fast, making the feedback loop genuinely noticeable after
            3-4 common rolls. The synergy conflict system (Challenge B) required
            a re-roll loop that occasionally hit the max-attempt cap with narrow
            pools, which taught me to always set a fallback. Combo blending
            (Challenge C) was the most fun — merging tag-matched affixes into a
            fused name like "RADIOACTIVE" felt rewarding and gave items a
            distinct personality. If I were to expand this, I'd add a visual
            particle effect per rarity tier, persist the inventory to local
            storage, and let users "sell" items to influence future drops.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
