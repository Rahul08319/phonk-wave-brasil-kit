import React, { useState, useEffect } from 'react';
import DrumMachine from '../components/DrumMachine';
import MelodyEngine from '../components/MelodyEngine';
import EffectsRack from '../components/EffectsRack';
import Sequencer from '../components/Sequencer';
import PresetManager from '../components/PresetManager';
import AudioVisualizer from '../components/AudioVisualizer';
import AppleKnob from '../components/AppleKnob';
import { audioEngine, PhonkPreset, PHONK_PRESETS } from '../lib/audioEngine';
import { Play, Square, ShieldCheck, Sparkles, Keyboard, Cpu, FileAudio, FileCode, X, HelpCircle, Radio } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const Index: React.FC = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<PhonkPreset>(PHONK_PRESETS[0]);
  const [masterVol, setMasterVol] = useState(0.85);
  const [limiting, setLimiting] = useState(0.65);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [isExportingWav, setIsExportingWav] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Dynamic automatic year detection & updater logic
  useEffect(() => {
    const updateYear = () => {
      const now = new Date();
      setCurrentYear(now.getFullYear());
    };
    updateYear();
    // Check periodically for year transitions
    const timer = setInterval(updateYear, 60000);
    return () => clearInterval(timer);
  }, []);

  // Global keyboard shortcuts (Space for Play/Pause, ? for shortcuts modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          audioEngine.stopSequencer();
          setIsPlaying(false);
        } else {
          audioEngine.startSequencer(activePreset.pattern, activePreset.bpm);
          setIsPlaying(true);
        }
      } else if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, activePreset]);

  const handleGlobalPlayToggle = () => {
    if (isPlaying) {
      audioEngine.stopSequencer();
      setIsPlaying(false);
    } else {
      audioEngine.startSequencer(activePreset.pattern, activePreset.bpm);
      setIsPlaying(true);
    }
  };

  const handleLoadPreset = (preset: PhonkPreset) => {
    setActivePreset(preset);
  };

  const handleQuickWavExport = async () => {
    try {
      setIsExportingWav(true);
      const wavBlob = await audioEngine.exportWav(activePreset.pattern, activePreset.bpm);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `phonk-wave-brasil-${activePreset.name.toLowerCase().replace(/\s+/g, '-')}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Master Loop Exported! 🎧',
        description: 'WAV 44.1kHz 16-bit stereo downloaded successfully.',
      });
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Could not export audio file.',
        variant: 'destructive',
      });
    } finally {
      setIsExportingWav(false);
    }
  };

  const handleQuickMidiExport = () => {
    try {
      const midiBlob = audioEngine.exportMidi(activePreset.pattern, activePreset.bpm);
      const url = URL.createObjectURL(midiBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `phonk-wave-brasil-${activePreset.name.toLowerCase().replace(/\s+/g, '-')}.mid`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'DAW MIDI Exported! 🎹',
        description: 'MIDI sequence ready for FL Studio, Ableton, and Logic Pro.',
      });
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Could not export MIDI file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background audio-reactive ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden transition-all duration-500">
        <div
          className="absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-[140px] transition-opacity duration-300"
          style={{
            backgroundColor: '#00F59B',
            opacity: isPlaying ? 0.18 : 0.08,
            transform: isPlaying ? 'scale(1.15)' : 'scale(1.0)',
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-[140px] transition-opacity duration-300"
          style={{
            backgroundColor: '#FFD000',
            opacity: isPlaying ? 0.16 : 0.07,
            transform: isPlaying ? 'scale(1.1)' : 'scale(1.0)',
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full blur-[140px] transition-opacity duration-300"
          style={{
            backgroundColor: '#FF3B30',
            opacity: isPlaying ? 0.18 : 0.08,
            transform: isPlaying ? 'scale(1.2)' : 'scale(1.0)',
          }}
        />
      </div>

      {/* Apple macOS Desktop Window Titlebar */}
      <div className="border-b border-white/10 bg-black/70 backdrop-blur-2xl px-4 py-2 flex items-center justify-between text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] cursor-pointer hover:opacity-80 transition-opacity" title="Close" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] cursor-pointer hover:opacity-80 transition-opacity" title="Minimize" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] cursor-pointer hover:opacity-80 transition-opacity" title="Expand" />
          </div>
          <span className="text-zinc-500 font-mono text-[11px] ml-2 hidden sm:inline">PhonkWave BR — Logic Studio VST</span>
        </div>

        <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CoreAudio DSP: ACTIVE</span>
        </div>
      </div>

      {/* Apple Liquid Glass Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-yellow-400 to-red-500 p-[1.5px] shadow-[0_0_20px_rgba(0,245,155,0.25)] flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-lg">
                🇧🇷
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  PhonkWave BR
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                    STUDIO PRO
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-zinc-400 tracking-wide hidden sm:block">
                Brazilian Phonk Audio Suite • Cowbells • Mandelão 808s • Memphis DSP
              </p>
            </div>
          </div>

          {/* Center Transport & Status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <Cpu size={13} className="text-emerald-400" />
              <span>DSP: 44.1kHz 32-bit Float</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <Sparkles size={13} className="text-yellow-400" />
              <span>BPM: {activePreset.bpm}</span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleGlobalPlayToggle}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 shadow-lg ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square size={12} fill="currentColor" />
                  <span>STOP [SPACE]</span>
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" />
                  <span>PLAY [SPACE]</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowShortcutsModal(true)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-95"
              title="Keyboard Shortcuts [?]"
            >
              <HelpCircle size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Interface — Bento Grid Layout */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Drum Machine & Presets (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <DrumMachine />
            <PresetManager onLoadPreset={handleLoadPreset} activePresetId={activePreset.id} />
          </div>

          {/* Center Column: Melody Engine & 16-Step Sequencer (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <MelodyEngine />
            <Sequencer
              onPlayStateChange={setIsPlaying}
              externalPattern={activePreset.pattern}
            />
          </div>

          {/* Right Column: Master Visualizer, FX Rack & Master Console (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Visualizer Canvas */}
            <AudioVisualizer isPlaying={isPlaying} />

            {/* Effects Rack */}
            <EffectsRack />

            {/* Master Console Hardware Strip */}
            <div className="rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00F59B]" />
                  <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-400 font-mono">
                    Master Bus & Output
                  </h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">True Peak Limiter</span>
              </div>

              {/* VU Meter & Rotary Knobs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <AppleKnob
                  label="Master Vol"
                  value={masterVol}
                  min={0}
                  max={1.2}
                  step={0.02}
                  defaultValue={0.85}
                  color="#00F59B"
                  formatDisplay={(v) => `${Math.round((v / 1.2) * 100)}%`}
                  onChange={(val) => {
                    setMasterVol(val);
                    audioEngine.setMasterVolume(val);
                  }}
                />
                <AppleKnob
                  label="Limiter Cap"
                  value={limiting}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  defaultValue={0.65}
                  color="#FF3B30"
                  formatDisplay={(v) => `${Math.round(v * 100)}%`}
                  onChange={setLimiting}
                />
              </div>

              {/* Dynamic VU Meter Display */}
              <div className="p-3 bg-black/50 rounded-2xl border border-white/5 mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                  <span>-48dB</span>
                  <span>-18dB</span>
                  <span>-6dB</span>
                  <span className="text-red-400">0dB</span>
                </div>
                <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 transition-all duration-75"
                    style={{
                      width: isPlaying ? '78%' : '8%',
                      boxShadow: isPlaying ? '0 0 10px rgba(0,245,155,0.6)' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Master Export Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleQuickWavExport}
                  disabled={isExportingWav}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <FileAudio size={14} />
                  <span>{isExportingWav ? 'Rendering...' : 'Quick Export WAV'}</span>
                </button>
                <button
                  onClick={handleQuickMidiExport}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileCode size={14} />
                  <span>Quick Export MIDI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-900 border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard size={18} className="text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Hardware Shortcuts
                </h3>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-300">Play / Pause Sequencer</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 font-mono">Space</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-300">Trigger MPC Drum Pads 1–8</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-yellow-400 font-mono">1 – 8</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-300">Play Cowbell Piano Roll Keys</span>
                <kbd className="px-2 py-0.5 rounded bg-white/10 text-yellow-400 font-mono">A, S, D, F...</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-300">Reset Rotary Dial to Default</span>
                <span className="text-zinc-400 font-mono">Double-Click</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-300">Fine Parameter Adjustment</span>
                <span className="text-zinc-400 font-mono">Click & Drag Y</span>
              </div>
            </div>

            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Apple-Grade Footer with Automatic Year Logic */}
      <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl py-6 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🇧🇷</span>
            <div>
              <p className="font-medium text-zinc-300">
                PhonkWave BR • Brazilian Phonk & Memphis Audio Workstation
              </p>
              <p className="text-[11px] text-zinc-400">
                Crafted with Apple Human Interface Guidelines • 100% Client-Side Web Audio DSP
              </p>
            </div>
          </div>

          {/* Automatic Dynamic Year & System Status */}
          <div className="flex items-center gap-4 text-center md:text-right font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Auto-Year Ready (2024–{currentYear})</span>
            </div>
            <div className="text-zinc-400">
              <span>Engine v2.{currentYear - 2024}.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
