import React, { useState, useEffect } from 'react';
import { audioEngine, TRACK_CONFIGS } from '../lib/audioEngine';
import AppleKnob from './AppleKnob';
import { Play, RotateCcw, Volume2, Sparkles } from 'lucide-react';

interface DrumMachineProps {
  onPadTrigger?: (index: number) => void;
}

export const DrumMachine: React.FC<DrumMachineProps> = ({ onPadTrigger }) => {
  const [activePad, setActivePad] = useState<number | null>(null);
  const [subPitch, setSubPitch] = useState(42);
  const [subGlide, setSubGlide] = useState(0.12);
  const [subDrive, setSubDrive] = useState(0.65);
  const [subDecay, setSubDecay] = useState(0.85);

  const handlePadPress = (index: number) => {
    setActivePad(index);
    audioEngine.triggerPad(index);
    if (onPadTrigger) onPadTrigger(index);
    setTimeout(() => setActivePad(null), 140);
  };

  // Keyboard shortcut listener for pads 1-8
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 8) {
        e.preventDefault();
        handlePadPress(keyNum - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handle808Test = () => {
    audioEngine.play808(subPitch, subGlide);
    setActivePad(1);
    setTimeout(() => setActivePad(null), 200);
  };

  return (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00F59B]" />
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
            Drum Machine & MPC Pads
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-mono">
          <span>Keys [1-8]</span>
        </div>
      </div>

      {/* 8-Pad MPC Matrix */}
      <div className="grid grid-cols-4 gap-2.5 mb-6">
        {TRACK_CONFIGS.map((pad, index) => {
          const isActive = activePad === index;
          return (
            <button
              key={pad.id}
              onClick={() => handlePadPress(index)}
              className="relative group h-20 rounded-2xl border transition-all duration-150 flex flex-col items-center justify-between p-2 select-none active:scale-95 overflow-hidden"
              style={{
                backgroundColor: isActive ? `${pad.color}25` : 'rgba(255, 255, 255, 0.03)',
                borderColor: isActive ? pad.color : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isActive
                  ? `0 0 24px ${pad.glow}, inset 0 1px 2px rgba(255,255,255,0.4)`
                  : '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                transform: isActive ? 'translateY(1px) scale(0.97)' : 'translateY(0)',
              }}
            >
              {/* Specular highlight */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl" />

              {/* Pad Number / Key shortcut badge */}
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-zinc-400 group-hover:text-white transition-colors">
                  #{index + 1}
                </span>
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: isActive ? pad.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? `0 0 8px ${pad.color}` : 'none',
                  }}
                />
              </div>

              {/* Pad Name */}
              <span
                className="text-xs font-bold tracking-tight text-center transition-colors drop-shadow"
                style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.85)' }}
              >
                {pad.name}
              </span>

              {/* Category pill */}
              <span className="text-[9px] font-medium text-zinc-400 truncate max-w-full">
                {pad.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* 808 Synth Sub-Engine Hardware Strip */}
      <div className="rounded-2xl bg-black/40 border border-white/5 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-red-400" />
            <h3 className="text-xs font-bold tracking-wider uppercase text-red-400 font-mono">
              Mandelão 808 Sub Synth
            </h3>
          </div>
          <button
            onClick={handle808Test}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-[11px] font-medium text-red-300 transition-all active:scale-95"
          >
            <Volume2 size={12} />
            <span>Test 808</span>
          </button>
        </div>

        {/* 4 Apple Rotary Knobs */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <AppleKnob
            label="Root Freq"
            value={subPitch}
            min={30}
            max={75}
            step={1}
            defaultValue={42}
            unit="Hz"
            color="#FF3B30"
            formatDisplay={(v) => `${Math.round(v)}Hz`}
            onChange={(val) => {
              setSubPitch(val);
              audioEngine.play808(val, subGlide);
            }}
          />
          <AppleKnob
            label="Glide"
            value={subGlide}
            min={0.02}
            max={0.35}
            step={0.01}
            defaultValue={0.12}
            unit="s"
            color="#FFD000"
            formatDisplay={(v) => `${Math.round(v * 1000)}ms`}
            onChange={(val) => {
              setSubGlide(val);
              audioEngine.setSubGlide(val);
            }}
          />
          <AppleKnob
            label="Overdrive"
            value={subDrive}
            min={0}
            max={1}
            step={0.02}
            defaultValue={0.65}
            color="#FF9500"
            formatDisplay={(v) => `${Math.round(v * 100)}%`}
            onChange={(val) => {
              setSubDrive(val);
              audioEngine.setDrive(val);
            }}
          />
          <AppleKnob
            label="Sub Decay"
            value={subDecay}
            min={0.3}
            max={1.5}
            step={0.05}
            defaultValue={0.85}
            unit="s"
            color="#AF52DE"
            formatDisplay={(v) => `${v.toFixed(2)}s`}
            onChange={setSubDecay}
          />
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;