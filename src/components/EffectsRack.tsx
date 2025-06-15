import React, { useState } from 'react';
import { Zap, Waves, Settings, Shuffle, ArrowUpDown } from 'lucide-react';

const EffectsRack: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState('saturation');

  const effects = [
    { id: 'saturation', name: 'SATURATION', icon: Zap },
    { id: 'reverb', name: 'REVERB', icon: Waves },
    { id: 'eq', name: 'EQ', icon: Settings },
    { id: 'chopper', name: 'CHOPPER', icon: Shuffle },
    { id: 'pitch', name: 'PITCH SHIFT', icon: ArrowUpDown },
  ];

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-400">⚡ EFFECTS RACK</h2>
        <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
          {effects.map((effect) => {
            const Icon = effect.icon;
            return (
              <button
                key={effect.id}
                onClick={() => setActiveEffect(effect.id)}
                className={`px-2 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${
                  activeEffect === effect.id 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={12} />
                {effect.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[200px]">
        {activeEffect === 'saturation' && (
          <div>
            <h3 className="text-sm font-bold text-red-400 mb-3">🔥 SATURATION</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full mb-2"></div>
                <span className="text-xs text-red-400">Drive</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-full mb-2"></div>
                <span className="text-xs text-yellow-400">Bias</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full mb-2"></div>
                <span className="text-xs text-green-400">Mix</span>
              </div>
            </div>
          </div>
        )}

        {activeEffect === 'reverb' && (
          <div>
            <h3 className="text-sm font-bold text-green-400 mb-3">🌊 REVERB & DELAY</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full mb-2"></div>
                <span className="text-xs text-green-400">Size</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-full mb-2"></div>
                <span className="text-xs text-yellow-400">Decay</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full mb-2"></div>
                <span className="text-xs text-purple-400">Delay</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full mb-2"></div>
                <span className="text-xs text-red-400">Feedback</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EffectsRack;