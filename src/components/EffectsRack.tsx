import React, { useState } from 'react';
import { audioEngine } from '../lib/audioEngine';
import AppleKnob from './AppleKnob';
import { Zap, Waves, Settings, Shuffle, ArrowUpDown, Flame, Radio } from 'lucide-react';

export const EffectsRack: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState<'saturation' | 'reverb' | 'eq' | 'chopper'>('saturation');

  // Saturation params
  const [drive, setDrive] = useState(0.55);
  const [harmonics, setHarmonics] = useState(0.7);
  const [mix, setMix] = useState(0.85);

  // Reverb params
  const [roomSize, setRoomSize] = useState(0.45);
  const [decay, setDecay] = useState(1.8);
  const [wetMix, setWetMix] = useState(0.3);

  // EQ params
  const [lowGain, setLowGain] = useState(4.5); // dB boost for 808
  const [midGain, setMidGain] = useState(0.0);
  const [highGain, setHighGain] = useState(2.0);

  // Chopper / Gate params
  const [stutterSpeed, setStutterSpeed] = useState(16);
  const [gateDepth, setGateDepth] = useState(0.8);

  const effects = [
    { id: 'saturation', name: 'OVERDRIVE', icon: Zap, color: '#FF3B30' },
    { id: 'reverb', name: 'SPACE', icon: Waves, color: '#00F59B' },
    { id: 'eq', name: 'EQ 3-BAND', icon: Settings, color: '#FFD000' },
    { id: 'chopper', name: 'CHOPPER', icon: Shuffle, color: '#AF52DE' },
  ] as const;

  return (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20">
      {/* Header & Effect Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#FF3B30]" />
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
            DSP Master Effects Rack
          </h2>
        </div>

        {/* Apple Segmented Effect Selector */}
        <div className="flex p-1 bg-black/40 rounded-xl border border-white/10 backdrop-blur-md self-start sm:self-auto">
          {effects.map((fx) => {
            const Icon = fx.icon;
            const isSelected = activeEffect === fx.id;
            return (
              <button
                key={fx.id}
                onClick={() => setActiveEffect(fx.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-white/15 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  borderBottom: isSelected ? `2px solid ${fx.color}` : '2px solid transparent',
                }}
              >
                <Icon size={12} style={{ color: isSelected ? fx.color : undefined }} />
                <span>{fx.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rack Bay */}
      <div className="rounded-2xl bg-black/40 border border-white/5 p-4 backdrop-blur-md min-h-[160px] flex flex-col justify-center">
        {activeEffect === 'saturation' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-red-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Flame size={14} />
                Brazilian Mandelão Tube Distortion
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Oversampled 4x</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <AppleKnob
                label="Drive"
                value={drive}
                min={0}
                max={1}
                step={0.02}
                defaultValue={0.55}
                color="#FF3B30"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={(val) => {
                  setDrive(val);
                  audioEngine.setDrive(val);
                }}
              />
              <AppleKnob
                label="Harmonics"
                value={harmonics}
                min={0}
                max={1}
                step={0.02}
                defaultValue={0.7}
                color="#FF9500"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={setHarmonics}
              />
              <AppleKnob
                label="Wet / Dry"
                value={mix}
                min={0}
                max={1}
                step={0.02}
                defaultValue={0.85}
                color="#00F59B"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={setMix}
              />
            </div>
          </div>
        )}

        {activeEffect === 'reverb' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Waves size={14} />
                Stereo Phonk Cathedral Reverb
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Convolution Engine</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <AppleKnob
                label="Room Size"
                value={roomSize}
                min={0.1}
                max={1.0}
                step={0.05}
                defaultValue={0.45}
                color="#00F59B"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={setRoomSize}
              />
              <AppleKnob
                label="Decay Time"
                value={decay}
                min={0.5}
                max={5.0}
                step={0.1}
                defaultValue={1.8}
                unit="s"
                color="#00C7BE"
                formatDisplay={(v) => `${v.toFixed(1)}s`}
                onChange={setDecay}
              />
              <AppleKnob
                label="Mix"
                value={wetMix}
                min={0}
                max={1}
                step={0.02}
                defaultValue={0.3}
                color="#FFD000"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={setWetMix}
              />
            </div>
          </div>
        )}

        {activeEffect === 'eq' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Settings size={14} />
                Master Parametric 3-Band Equalizer
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Low-Shelf / Mid / High</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <AppleKnob
                label="Sub Bass (60Hz)"
                value={lowGain}
                min={-12}
                max={12}
                step={0.5}
                defaultValue={4.5}
                unit="dB"
                color="#FF3B30"
                formatDisplay={(v) => `${v > 0 ? '+' : ''}${v}dB`}
                onChange={setLowGain}
              />
              <AppleKnob
                label="Mid Body (1kHz)"
                value={midGain}
                min={-12}
                max={12}
                step={0.5}
                defaultValue={0}
                unit="dB"
                color="#FFD000"
                formatDisplay={(v) => `${v > 0 ? '+' : ''}${v}dB`}
                onChange={setMidGain}
              />
              <AppleKnob
                label="Highs (10kHz)"
                value={highGain}
                min={-12}
                max={12}
                step={0.5}
                defaultValue={2.0}
                unit="dB"
                color="#00F59B"
                formatDisplay={(v) => `${v > 0 ? '+' : ''}${v}dB`}
                onChange={(val) => {
                  setHighGain(val);
                  audioEngine.setFilterCutoff(val > 0 ? 18000 : 10000);
                }}
              />
            </div>
          </div>
        )}

        {activeEffect === 'chopper' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Shuffle size={14} />
                Memphis Stutter & Sidechain Gate
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Sync to Host BPM</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AppleKnob
                label="Gate Rate"
                value={stutterSpeed}
                min={4}
                max={32}
                step={4}
                defaultValue={16}
                color="#AF52DE"
                formatDisplay={(v) => `1/${v}`}
                onChange={setStutterSpeed}
              />
              <AppleKnob
                label="Depth"
                value={gateDepth}
                min={0}
                max={1}
                step={0.05}
                defaultValue={0.8}
                color="#FF2D55"
                formatDisplay={(v) => `${Math.round(v * 100)}%`}
                onChange={setGateDepth}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EffectsRack;