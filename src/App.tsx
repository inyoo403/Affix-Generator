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
        <span className="subtitle">Random Item</span>
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

    </div>
  );
}

export default App;
