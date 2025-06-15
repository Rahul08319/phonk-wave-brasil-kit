import React, { useState } from 'react';
import { Save, Download, Upload, Star } from 'lucide-react';

const PresetManager: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('Rio Rider');

  const presets = [
    { name: 'Rio Rider', category: 'Brazilian' },
    { name: 'Funk do Morro', category: 'Brazilian' },
    { name: 'Slowed N Distorted', category: 'Memphis' },
    { name: 'Memphis Jungle', category: 'Memphis' },
    { name: 'Trap Phonk BR', category: 'Hybrid' },
    { name: 'Vintage Cowbell', category: 'Classic' },
  ];

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-400">💾 PRESETS</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all">
            <Save size={16} />
          </button>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
            <Download size={16} />
          </button>
          <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all">
            <Upload size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => setSelectedPreset(preset.name)}
            className={`p-3 rounded-lg transition-all text-left ${
              selectedPreset === preset.name
                ? 'bg-yellow-600 text-black'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{preset.name}</div>
                <div className="text-xs opacity-70">{preset.category}</div>
              </div>
              <Star size={12} className="text-yellow-400" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-700 rounded-lg">
        <div className="text-sm font-medium mb-2">🎯 Quick Load</div>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded text-xs transition-all">
            🇧🇷 BR Classics
          </button>
          <button className="p-2 bg-red-600 hover:bg-red-700 rounded text-xs transition-all">
            🏙️ Memphis Vibes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresetManager;