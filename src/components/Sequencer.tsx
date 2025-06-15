import React, { useState } from 'react';
import { Play, Square, Download, Grid } from 'lucide-react';

const Sequencer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState(Array(16).fill(false));

  const toggleStep = (index: number) => {
    const newPattern = [...pattern];
    newPattern[index] = !newPattern[index];
    setPattern(newPattern);
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-400 flex items-center gap-2">
          <Grid size={20} />
          SEQUENCER
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg transition-all ${
              isPlaying ? 'bg-red-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isPlaying ? <Square size={16} /> : <Play size={16} />}
          </button>
          <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-bold text-yellow-400 mb-2">🔔 COWBELL PATTERN</h3>
        <div className="grid grid-cols-8 gap-1">
          {pattern.map((active, index) => (
            <button
              key={index}
              onClick={() => toggleStep(index)}
              className={`h-8 rounded transition-all duration-200 border-2 ${
                active 
                  ? 'bg-yellow-500 border-yellow-400' 
                  : 'bg-gray-700 border-gray-600 hover:border-gray-500'
              }`}
            >
              <span className="text-xs font-bold">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 rounded transition-all text-sm font-medium">
          📝 Export MIDI
        </button>
        <button className="flex-1 p-2 bg-green-600 hover:bg-green-700 rounded transition-all text-sm font-medium">
          🎹 Piano Roll
        </button>
      </div>
    </div>
  );
};

export default Sequencer;