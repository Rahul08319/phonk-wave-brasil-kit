import React, { useState } from 'react';
import { audioEngine } from '../lib/audioEngine';
import AppleKnob from './AppleKnob';
import { Disc, Waves, Upload, Music, Sparkles } from 'lucide-react';

export const MelodyEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cowbell' | 'vinyl' | 'samples'>('cowbell');
  const [cowbellPitch, setCowbellPitch] = useState(1.0);
  const [cowbellDecay, setCowbellDecay] = useState(0.35);
  const [fmRatio, setFmRatio] = useState(1.48);
  const [toneFilter, setToneFilter] = useState(12000);

  // Vinyl emulator state
  const [vinylLevel, setVinylLevel] = useState(0.08);
  const [wowFlutter, setWowFlutter] = useState(0.25);
  const [warmth, setWarmth] = useState(0.6);

  // Active key press feedback
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // 8-Note Melodic Scale for Phonk Cowbell Melodies
  const COWBELL_NOTES = [
    { note: 'C4', label: 'C', mult: 0.75, key: 'A' },
    { note: 'D4', label: 'D', mult: 0.84, key: 'S' },
    { note: 'Eb4', label: 'D#', mult: 0.89, key: 'E', black: true },
    { note: 'F4', label: 'F', mult: 1.0, key: 'F' },
    { note: 'G4', label: 'G', mult: 1.12, key: 'G' },
    { note: 'Ab4', label: 'G#', mult: 1.19, key: 'Y', black: true },
    { note: 'Bb4', label: 'A#', mult: 1.33, key: 'U', black: true },
    { note: 'C5', label: 'C5', mult: 1.5, key: 'K' },
  ];

  const handlePlayCowbellNote = (noteName: string, mult: number) => {
    setActiveKey(noteName);
    audioEngine.playCowbell(cowbellPitch * mult, cowbellDecay);
    setTimeout(() => setActiveKey(null), 180);
  };

  return (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20">
      {/* Header & Segmented Pill Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FFD000]" />
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
            Melody & Cowbell Engine
          </h2>
        </div>

        {/* Apple Segmented Control */}
        <div className="flex p-1 bg-black/40 rounded-xl border border-white/10 backdrop-blur-md self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('cowbell')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all ${
              activeTab === 'cowbell'
                ? 'bg-yellow-500 text-black shadow-md font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Waves size={13} />
            <span>Cowbell FM</span>
          </button>
          <button
            onClick={() => setActiveTab('vinyl')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all ${
              activeTab === 'vinyl'
                ? 'bg-yellow-500 text-black shadow-md font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Disc size={13} />
            <span>Vinyl Lofi</span>
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all ${
              activeTab === 'samples'
                ? 'bg-yellow-500 text-black shadow-md font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Upload size={13} />
            <span>Vault</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Cowbell FM Synthesizer */}
      {activeTab === 'cowbell' && (
        <div className="space-y-4">
          {/* Hardware Rotary Knobs */}
          <div className="rounded-2xl bg-black/40 border border-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-yellow-400/90 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Sparkles size={12} />
                Roland TR-808 Phonk Cowbell DSP
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">FM Modulator 540Hz / 800Hz</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <AppleKnob
                label="Tune"
                value={cowbellPitch}
                min={0.5}
                max={2.0}
                step={0.02}
                defaultValue={1.0}
                color="#FFD000"
                formatDisplay={(v) => `${(v * 100).toFixed(0)}%`}
                onChange={(val) => {
                  setCowbellPitch(val);
                  audioEngine.setCowbellPitch(val);
                }}
              />
              <AppleKnob
                label="Decay"
                value={cowbellDecay}
                min={0.1}
                max={0.9}
                step={0.02}
                defaultValue={0.35}
                unit="s"
                color="#00F59B"
                formatDisplay={(v) => `${Math.round(v * 1000)}ms`}
                onChange={(val) => {
                  setCowbellDecay(val);
                  audioEngine.setCowbellDecay(val);
                }}
              />
              <AppleKnob
                label="Metallic Q"
                value={fmRatio}
                min={0.8}
                max={2.5}
                step={0.05}
                defaultValue={1.48}
                color="#FF9500"
                formatDisplay={(v) => `${v.toFixed(2)}x`}
                onChange={setFmRatio}
              />
              <AppleKnob
                label="Brightness"
                value={toneFilter}
                min={2000}
                max={18000}
                step={250}
                defaultValue={12000}
                unit="Hz"
                color="#30D158"
                formatDisplay={(v) => `${(v / 1000).toFixed(1)}k`}
                onChange={setToneFilter}
              />
            </div>
          </div>

          {/* Melodic Keyboard */}
          <div className="rounded-2xl bg-black/40 border border-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-wider uppercase font-mono">
                <Music size={13} className="text-yellow-400" />
                <span>Live Cowbell Piano Roll</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">Click keys to riff</span>
            </div>

            <div className="flex gap-1.5 justify-center py-1">
              {COWBELL_NOTES.map((n) => {
                const isPressed = activeKey === n.note;
                return (
                  <button
                    key={n.note}
                    onClick={() => handlePlayCowbellNote(n.note, n.mult)}
                    className={`relative flex-1 h-24 rounded-xl border flex flex-col items-center justify-end pb-2 select-none transition-all duration-100 active:scale-95 ${
                      n.black
                        ? 'bg-zinc-950 text-white border-zinc-700 shadow-md'
                        : 'bg-zinc-800 text-zinc-200 border-white/10 hover:border-yellow-400/40'
                    }`}
                    style={{
                      backgroundColor: isPressed
                        ? '#FFD000'
                        : n.black
                        ? 'rgba(15,15,18,0.95)'
                        : 'rgba(255,255,255,0.06)',
                      color: isPressed ? '#000000' : undefined,
                      borderColor: isPressed ? '#FFD000' : undefined,
                      boxShadow: isPressed
                        ? '0 0 20px rgba(255, 208, 0, 0.6)'
                        : '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    <span className="text-xs font-bold font-mono">{n.label}</span>
                    <span className="text-[9px] opacity-50 font-mono mt-0.5">[{n.key}]</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Memphis Vinyl Emulator */}
      {activeTab === 'vinyl' && (
        <div className="rounded-2xl bg-black/40 border border-white/5 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Disc size={16} className="text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase font-mono">
                Memphis 1993 Tape & Vinyl Simulator
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-400 font-mono">
              Analog Emulation
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Synthesizes realistic low-frequency vinyl rumble, brown noise needle crackles, and authentic tape cassette degradation for that vintage Memphis Phonk warmth.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <AppleKnob
              label="Crackle Vol"
              value={vinylLevel}
              min={0}
              max={0.25}
              step={0.01}
              defaultValue={0.08}
              color="#FFD000"
              formatDisplay={(v) => `${Math.round((v / 0.25) * 100)}%`}
              onChange={(val) => {
                setVinylLevel(val);
                audioEngine.setVinylLevel(val);
              }}
            />
            <AppleKnob
              label="Wow & Flutter"
              value={wowFlutter}
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.25}
              color="#FF9500"
              formatDisplay={(v) => `${Math.round(v * 100)}%`}
              onChange={setWowFlutter}
            />
            <AppleKnob
              label="Tape Warmth"
              value={warmth}
              min={0.1}
              max={1}
              step={0.05}
              defaultValue={0.6}
              color="#AF52DE"
              formatDisplay={(v) => `${Math.round(v * 100)}%`}
              onChange={setWarmth}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Sample Vault */}
      {activeTab === 'samples' && (
        <div className="rounded-2xl bg-black/40 border border-white/5 p-5 backdrop-blur-md space-y-4 text-center">
          <div className="border-2 border-dashed border-white/10 hover:border-yellow-400/40 rounded-2xl p-6 transition-all duration-200 cursor-pointer group">
            <Upload size={28} className="mx-auto mb-2 text-zinc-400 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
            <div className="text-xs font-semibold text-white mb-1">
              Drop Custom WAV / MP3 Stabs Here
            </div>
            <p className="text-[11px] text-zinc-400">
              Supports 16-bit 44.1kHz Brazilian funk vocal loops, acapellas, and Memphis chop files
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => audioEngine.playVocal()}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Music size={13} className="text-yellow-400" />
              <span>Preview Vocal Stab</span>
            </button>
            <button
              onClick={() => audioEngine.playTamborim()}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles size={13} className="text-emerald-400" />
              <span>Preview Tamborim</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelodyEngine;