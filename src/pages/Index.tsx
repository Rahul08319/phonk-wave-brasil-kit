
import React from 'react';
import DrumMachine from '../components/DrumMachine';
import MelodyEngine from '../components/MelodyEngine';
import EffectsRack from '../components/EffectsRack';
import Sequencer from '../components/Sequencer';
import PresetManager from '../components/PresetManager';

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-900">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
          🇧🇷 PhonkWave BR 🔥
        </h1>
        <p className="text-gray-400 text-lg">
          Brazilian Phonk Production Suite • Cowbells • 808s • Memphis Vibes
        </p>
        <div className="flex justify-center gap-4 mt-3 text-sm">
          <span className="px-3 py-1 bg-green-600 rounded-full text-white">🎛️ VST Plugin</span>
          <span className="px-3 py-1 bg-yellow-600 rounded-full text-white">🎵 FL Studio Ready</span>
          <span className="px-3 py-1 bg-red-600 rounded-full text-white">🔥 Brazilian Phonk</span>
        </div>
      </header>

      {/* Main Plugin Interface */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <DrumMachine />
            <PresetManager />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <MelodyEngine />
            <Sequencer />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <EffectsRack />
            
            {/* Master Section */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <h2 className="text-lg font-bold text-green-400 mb-4">🎚️ MASTER</h2>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-32 bg-gray-900 rounded-lg relative mb-2">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-yellow-500 rounded-lg transition-all"
                      style={{ height: '60%' }}
                    />
                  </div>
                  <span className="text-xs text-green-400 font-medium">MASTER</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-32 bg-gray-900 rounded-lg relative mb-2">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-500 to-yellow-500 rounded-lg transition-all"
                      style={{ height: '40%' }}
                    />
                  </div>
                  <span className="text-xs text-red-400 font-medium">LIMITING</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 p-2 bg-green-600 hover:bg-green-700 rounded transition-all text-sm font-medium text-white">
                  💾 Export WAV
                </button>
                <button className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 rounded transition-all text-sm font-medium text-white">
                  🎵 Export MIDI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>PhonkWave BR • Inspired by Brazilian Funk, Memphis Rap & Phonk Culture</p>
        <p className="mt-1">🔥 Cowbell-heavy beats • Distorted 808s • Vintage Memphis samples 🔥</p>
      </footer>
    </div>
  );
};

export default Index;
