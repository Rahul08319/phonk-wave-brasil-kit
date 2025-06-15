import React, { useState } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

const DrumMachine: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const drumPads = [
    { name: 'Cowbell', color: 'bg-yellow-600' },
    { name: 'Kick', color: 'bg-red-600' },
    { name: 'Snare', color: 'bg-green-600' },
    { name: 'Clap', color: 'bg-purple-600' },
    { name: 'Hi-Hat', color: 'bg-green-600' },
    { name: 'Crash', color: 'bg-yellow-600' },
    { name: '808', color: 'bg-red-600' },
    { name: 'Perc', color: 'bg-purple-600' },
  ];

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-400">🥁 DRUM MACHINE</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg transition-all ${
              isPlaying ? 'bg-red-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isPlaying ? <Square size={16} /> : <Play size={16} />}
          </button>
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {drumPads.map((pad, index) => (
          <button
            key={index}
            className={`h-16 rounded-lg border-2 transition-all duration-200 hover:scale-105 font-bold text-sm ${pad.color} border-gray-400`}
          >
            {pad.name}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-sm font-bold text-red-400 mb-3">🔊 808 SYNTH ENGINE</h3>
        <div className="flex gap-4 justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full mb-2"></div>
            <span className="text-xs text-red-400">Pitch</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-full mb-2"></div>
            <span className="text-xs text-yellow-400">Glide</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full mb-2"></div>
            <span className="text-xs text-purple-400">Distortion</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;