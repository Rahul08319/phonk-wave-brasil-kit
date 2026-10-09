import React, { useState } from 'react';
import { PHONK_PRESETS, PhonkPreset, audioEngine } from '../lib/audioEngine';
import { Save, Download, Upload, Star, Sparkles, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface PresetManagerProps {
  onLoadPreset?: (preset: PhonkPreset) => void;
  activePresetId?: string;
}

export const PresetManager: React.FC<PresetManagerProps> = ({ onLoadPreset, activePresetId = 'rio-rider' }) => {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState(activePresetId);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'rio-rider': true,
    'funk-do-morro': true,
  });

  const handleSelect = (preset: PhonkPreset) => {
    setSelectedId(preset.id);
    audioEngine.setBpm(preset.bpm);
    audioEngine.setDrive(preset.drive);
    audioEngine.setCowbellDecay(preset.decay);

    if (onLoadPreset) {
      onLoadPreset(preset);
    }

    toast({
      title: `Loaded Preset: ${preset.name}`,
      description: `${preset.tag} • ${preset.bpm} BPM • ${preset.description}`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveUserPreset = () => {
    toast({
      title: 'Preset Saved! 💾',
      description: 'Your custom Phonk pattern has been stored in browser memory.',
    });
  };

  return (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FFD000]" />
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
            Sound Banks & Presets
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleSaveUserPreset}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 hover:text-white transition-all active:scale-95"
            title="Save Current Pattern"
          >
            <Save size={13} />
          </button>
        </div>
      </div>

      {/* Preset List with Apple Liquid Glass cards */}
      <div className="space-y-2 mb-4">
        {PHONK_PRESETS.map((preset) => {
          const isSelected = selectedId === preset.id;
          const isFav = favorites[preset.id];

          return (
            <div
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? 'bg-yellow-500/15 border-yellow-400/60 shadow-[0_0_20px_rgba(255,208,0,0.15)]'
                  : 'bg-black/30 border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                    {preset.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-zinc-400 font-mono">
                    {preset.tag}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {preset.bpm} BPM
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  {preset.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => toggleFavorite(e, preset.id)}
                  className="p-1 text-zinc-500 hover:text-yellow-400 transition-colors"
                >
                  <Star
                    size={13}
                    fill={isFav ? '#FFD000' : 'none'}
                    className={isFav ? 'text-yellow-400' : 'text-zinc-500'}
                  />
                </button>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => handleSelect(PHONK_PRESETS[0])}
          className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>🇧🇷 Rio Classic</span>
        </button>
        <button
          onClick={() => handleSelect(PHONK_PRESETS[1])}
          className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[11px] font-semibold text-red-400 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>🔥 Morro Drift</span>
        </button>
      </div>
    </div>
  );
};

export default PresetManager;