import React, { useState } from 'react';
import { Disc, Waves, Upload } from 'lucide-react';

const MelodyEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fm');

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-400">🎹 MELODY ENGINE</h2>
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('fm')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              activeTab === 'fm' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            FM SYNTH
          </button>
          <button
            onClick={() => setActiveTab('vinyl')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              activeTab === 'vinyl' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            VINYL
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              activeTab === 'samples' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            SAMPLES
          </button>
        </div>
      </div>

      {activeTab === 'fm' && (
        <div>
          <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
            <Waves size={16} />
            FM SYNTH MODULE
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full mb-2"></div>
              <span className="text-xs text-green-400">Carrier</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full mb-2"></div>
              <span className="text-xs text-yellow-400">Modulator</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full mb-2"></div>
              <span className="text-xs text-purple-400">Ratio</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full mb-2"></div>
              <span className="text-xs text-red-400">Depth</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vinyl' && (
        <div>
          <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center gap-2">
            <Disc size={16} />
            VINYL EMULATOR
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full mb-2"></div>
              <span className="text-xs text-yellow-400">Crackle</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full mb-2"></div>
              <span className="text-xs text-purple-400">Wobble</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full mb-2"></div>
              <span className="text-xs text-red-400">Wear</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'samples' && (
        <div>
          <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
            <Upload size={16} />
            SAMPLE LOADER
          </h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mb-4">
            <Upload size={32} className="mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-400">Drop samples here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelodyEngine;