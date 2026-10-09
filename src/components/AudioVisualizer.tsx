import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../lib/audioEngine';
import { Activity, BarChart3, Radio } from 'lucide-react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'bars' | 'wave'>('bars');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const bufferLength = 64;
    const freqArray = new Uint8Array(bufferLength);
    const timeArray = new Uint8Array(bufferLength);

    const render = () => {
      animId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      audioEngine.getVisualizerData(freqArray, timeArray);

      if (mode === 'bars') {
        const barWidth = (width / bufferLength) * 1.6;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let barHeight = (freqArray[i] / 255) * (height - 8);

          // Idle ambient pulse when paused so the canvas isn't dead
          if (!isPlaying && barHeight < 4) {
            barHeight = 4 + Math.sin(Date.now() * 0.003 + i * 0.2) * 3;
          }

          // Brazilian Phonk vibrant gradient: Emerald -> Gold -> Hot Red
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#00F59B');
          gradient.addColorStop(0.65, '#FFD000');
          gradient.addColorStop(1, '#FF3B30');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, height - barHeight, Math.max(2, barWidth - 2), barHeight, [2, 2, 0, 0]);
          ctx.fill();

          // Peak cap
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fillRect(x, Math.max(0, height - barHeight - 2), Math.max(2, barWidth - 2), 1.5);

          x += barWidth + 1.5;
          if (x > width) break;
        }
      } else {
        // Oscilloscope Waveform
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#00F59B';
        ctx.shadowColor = '#00F59B';
        ctx.shadowBlur = 8;
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = timeArray[i] / 128.0;
          if (!isPlaying) {
            v = 1.0 + Math.sin(Date.now() * 0.004 + i * 0.25) * 0.06;
          }
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, mode]);

  return (
    <div className="relative rounded-2xl bg-black/40 border border-white/10 p-3.5 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Top Bar with Mode switcher */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-emerald-400">
            <Radio size={12} className={isPlaying ? 'animate-pulse text-emerald-400' : 'text-zinc-500'} />
            <span className="tracking-wide uppercase font-mono">{isPlaying ? 'LIVE FFT 44.1kHz' : 'STANDBY'}</span>
          </div>
          <span className="text-[11px] text-zinc-400 font-medium hidden sm:inline">Phonk DSP Bus</span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setMode('bars')}
            className={`p-1 rounded text-xs transition-all ${
              mode === 'bars' ? 'bg-emerald-500 text-black font-semibold shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Frequency Spectrum"
          >
            <BarChart3 size={13} />
          </button>
          <button
            onClick={() => setMode('wave')}
            className={`p-1 rounded text-xs transition-all ${
              mode === 'wave' ? 'bg-emerald-500 text-black font-semibold shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Oscilloscope Waveform"
          >
            <Activity size={13} />
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative w-full h-24 bg-zinc-950/80 rounded-xl overflow-hidden border border-white/5">
        <canvas
          ref={canvasRef}
          width={420}
          height={96}
          className="w-full h-full block"
        />

        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-3 opacity-15">
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;
