import React, { useState, useEffect } from 'react';
import { audioEngine, TRACK_CONFIGS, PHONK_PRESETS } from '../lib/audioEngine';
import { Play, Square, Download, RotateCcw, Shuffle, Sparkles, FileAudio, FileCode } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface SequencerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
  externalPattern?: boolean[][];
}

export const Sequencer: React.FC<SequencerProps> = ({ onPlayStateChange, externalPattern }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(135);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExportingWav, setIsExportingWav] = useState(false);

  // Initialize with the iconic "Rio Rider" Brazilian Phonk groove
  const [pattern, setPattern] = useState<boolean[][]>(() => {
    return PHONK_PRESETS[0].pattern.map((row) => [...row]);
  });

  // Keep in sync with external preset selections
  useEffect(() => {
    if (externalPattern && externalPattern.length === 8) {
      setPattern(externalPattern.map((row) => [...row]));
    }
  }, [externalPattern]);

  // Hook into Web Audio engine playhead clock
  useEffect(() => {
    const unsubscribe = audioEngine.onStep((step) => {
      setCurrentStep(step);
    });
    return () => unsubscribe();
  }, []);

  const toggleStep = (trackIndex: number, stepIndex: number) => {
    const updated = pattern.map((row, rIdx) => {
      if (rIdx === trackIndex) {
        const newRow = [...row];
        newRow[stepIndex] = !newRow[stepIndex];
        return newRow;
      }
      return row;
    });
    setPattern(updated);

    // If toggling on, preview the sound immediately
    if (!pattern[trackIndex][stepIndex]) {
      audioEngine.triggerPad(trackIndex);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEngine.stopSequencer();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    } else {
      audioEngine.startSequencer(pattern, bpm);
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    const clamped = Math.max(70, Math.min(190, newBpm));
    setBpm(clamped);
    audioEngine.setBpm(clamped);
  };

  const handleClear = () => {
    const cleared = Array(8).fill(null).map(() => Array(16).fill(false));
    setPattern(cleared);
    toast({
      title: 'Sequencer Reset',
      description: 'Pattern grid cleared. Build your new Phonk groove!',
    });
  };

  const handleRandomize = () => {
    const randomized = Array(8).fill(null).map((_, trackIdx) => {
      // Denser rhythm for cowbells & hats, syncopated for 808
      const density = trackIdx === 0 ? 0.45 : trackIdx === 1 ? 0.25 : trackIdx === 5 ? 0.8 : 0.2;
      return Array(16).fill(false).map(() => Math.random() < density);
    });
    setPattern(randomized);
    toast({
      title: 'Phonk Generator',
      description: 'New generative Brazilian syncopation loaded!',
    });
  };

  const handleExportWav = async () => {
    try {
      setIsExportingWav(true);
      const wavBlob = await audioEngine.exportWav(pattern, bpm);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `phonk-wave-brasil-${bpm}bpm.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Master Audio Exported! 🎵',
        description: `WAV loop rendered in 44.1kHz 16-bit stereo.`,
      });
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Could not render WAV audio loop.',
        variant: 'destructive',
      });
    } finally {
      setIsExportingWav(false);
    }
  };

  const handleExportMidi = () => {
    try {
      const midiBlob = audioEngine.exportMidi(pattern, bpm);
      const url = URL.createObjectURL(midiBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `phonk-wave-brasil-${bpm}bpm.mid`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'DAW MIDI Exported! 🎹',
        description: 'Ready to drag and drop into FL Studio, Ableton, or Logic Pro.',
      });
    } catch {
      toast({
        title: 'Export Failed',
        description: 'Could not generate MIDI file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20">
      {/* Top Bar with Transport Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00F59B]" />
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
            16-Step Pattern Sequencer
          </h2>
        </div>

        {/* Transport Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* BPM Stepper */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-3 py-1 rounded-xl text-xs font-mono">
            <span className="text-zinc-400">BPM</span>
            <input
              type="number"
              value={bpm}
              onChange={(e) => handleBpmChange(Number(e.target.value))}
              className="w-12 bg-transparent text-white font-bold text-center focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded"
              min={70}
              max={190}
            />
          </div>

          {/* Play/Stop Button with Apple spring styling */}
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95 shadow-lg ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square size={13} fill="currentColor" />
                <span>STOP</span>
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                <span>PLAY LOOP</span>
              </>
            )}
          </button>

          {/* Randomize / Clear */}
          <button
            onClick={handleRandomize}
            title="Generate Random Phonk Beat"
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 hover:text-white transition-all active:scale-95"
          >
            <Shuffle size={14} />
          </button>

          <button
            onClick={handleClear}
            title="Clear Pattern Grid"
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 hover:text-white transition-all active:scale-95"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 16-Step Step Numbers Header */}
      <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-zinc-400">
        <div className="w-24 shrink-0 font-bold uppercase tracking-wider text-right pr-2">Track</div>
        <div className="grid grid-cols-16 flex-1 gap-1 text-center">
          {Array(16).fill(null).map((_, i) => {
            const isBeatStart = i % 4 === 0;
            const isCurrent = currentStep === i && isPlaying;
            return (
              <div
                key={i}
                className={`py-0.5 rounded transition-colors ${
                  isCurrent
                    ? 'text-emerald-400 font-bold bg-emerald-500/20 shadow-[0_0_8px_#00F59B]'
                    : isBeatStart
                    ? 'text-zinc-200 font-bold'
                    : 'text-zinc-600'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Track Step Grid */}
      <div className="space-y-1.5 mb-5">
        {TRACK_CONFIGS.map((track, trackIdx) => {
          return (
            <div key={track.id} className="flex items-center gap-2 group">
              {/* Track Label Button */}
              <button
                onClick={() => audioEngine.triggerPad(trackIdx)}
                className="w-24 shrink-0 py-1 px-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 text-left transition-all active:scale-95 flex items-center justify-between"
                title="Click to preview track sound"
              >
                <span className="text-[11px] font-bold truncate" style={{ color: track.color }}>
                  {track.name.replace(/[^a-zA-Z0-9 ]/g, '').trim()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: track.color }} />
              </button>

              {/* 16 Step Buttons */}
              <div className="grid grid-cols-16 flex-1 gap-1">
                {pattern[trackIdx].map((isActive, stepIdx) => {
                  const isCurrentPlayhead = isPlaying && currentStep === stepIdx;
                  const isBeatBoundary = stepIdx % 4 === 0;

                  return (
                    <button
                      key={stepIdx}
                      onClick={() => toggleStep(trackIdx, stepIdx)}
                      className={`h-7 rounded-md border transition-all duration-75 select-none relative overflow-hidden active:scale-90 ${
                        isActive
                          ? 'shadow-md'
                          : isBeatBoundary
                          ? 'bg-white/[0.04] border-white/10 hover:border-white/25'
                          : 'bg-black/30 border-white/[0.05] hover:border-white/20'
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? track.color
                          : isCurrentPlayhead
                          ? 'rgba(0, 245, 155, 0.15)'
                          : undefined,
                        borderColor: isActive
                          ? track.color
                          : isCurrentPlayhead
                          ? '#00F59B'
                          : undefined,
                        boxShadow: isActive
                          ? `0 0 12px ${track.glow}`
                          : isCurrentPlayhead
                          ? '0 0 8px rgba(0,245,155,0.4)'
                          : undefined,
                      }}
                      title={`${track.name} — Step ${stepIdx + 1}`}
                    >
                      {/* Playhead flash highlight */}
                      {isCurrentPlayhead && (
                        <div className="absolute inset-0 bg-white/40 animate-pulse pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Toolbar Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Sparkles size={14} className="text-yellow-400" />
          <span>Professional Audio & MIDI Engine</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportWav}
            disabled={isExportingWav}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 transition-all active:scale-95"
          >
            <FileAudio size={14} />
            <span>{isExportingWav ? 'Rendering WAV...' : 'Export 16-Bit WAV'}</span>
          </button>

          <button
            onClick={handleExportMidi}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs font-semibold text-blue-400 transition-all active:scale-95"
          >
            <FileCode size={14} />
            <span>Export DAW MIDI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sequencer;