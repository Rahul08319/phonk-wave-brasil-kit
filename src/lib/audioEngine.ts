/**
 * PhonkWave BR — Advanced Web Audio Engine & DSP Synthesizer
 * 
 * Features:
 * - Authentic 808-style Cowbell synthesis (dual detuned square/bandpass oscillators + snappy envelope)
 * - Heavy Brazilian Mandelão 808 Sub-Bass with pitch-dive transient & soft-clipping saturation
 * - High-speed tight rhythm scheduling via Web Audio API AudioContext.currentTime lookahead
 * - Dynamic Formant Vocal Stabs & Brazilian Tamborim / Baile Percussion
 * - Multi-band Filter, Waveshaper Drive, Vinyl Crackle Generator & Master Limiter
 * - OfflineAudioContext WAV loop export
 * - Standard Type 0 MIDI export
 */

export interface TrackConfig {
  id: string;
  name: string;
  category: string;
  color: string;
  glow: string;
  defaultPitch?: number;
}

export const TRACK_CONFIGS: TrackConfig[] = [
  { id: 'cowbell', name: '🔔 COWBELL', category: 'Melodic Lead', color: '#FFD000', glow: 'rgba(255, 208, 0, 0.4)', defaultPitch: 1 },
  { id: 'sub808', name: '🔊 808 SUB', category: 'Bass', color: '#FF3B30', glow: 'rgba(255, 59, 48, 0.4)' },
  { id: 'kick', name: '🥁 KICK', category: 'Drums', color: '#00F59B', glow: 'rgba(0, 245, 155, 0.4)' },
  { id: 'snare', name: '💥 SNARE', category: 'Drums', color: '#00C7BE', glow: 'rgba(0, 199, 190, 0.4)' },
  { id: 'clap', name: '👏 CLAP', category: 'Drums', color: '#AF52DE', glow: 'rgba(175, 82, 222, 0.4)' },
  { id: 'hihat', name: '✨ HI-HAT', category: 'Cymbals', color: '#FF9500', glow: 'rgba(255, 149, 0, 0.4)' },
  { id: 'tamborim', name: '🪘 TAMBORIM', category: 'Favela Perc', color: '#30D158', glow: 'rgba(48, 209, 88, 0.4)' },
  { id: 'vocal', name: '🗣️ VOCAL STAB', category: 'Sample', color: '#FF2D55', glow: 'rgba(255, 45, 85, 0.4)' }
];

export interface PhonkPreset {
  id: string;
  name: string;
  tag: string;
  description: string;
  bpm: number;
  drive: number;
  decay: number;
  pattern: boolean[][]; // 8 tracks x 16 steps
}

// Built-in iconic Brazilian Phonk & Memphis Groove Presets
export const PHONK_PRESETS: PhonkPreset[] = [
  {
    id: 'rio-rider',
    name: 'Rio Rider',
    tag: 'Brazilian Phonk',
    description: 'Syncopated Mandelão 808 slides with blazing high cowbell melody',
    bpm: 135,
    drive: 0.65,
    decay: 0.45,
    pattern: [
      // Cowbell: 1, 3, 4, 7, 9, 11, 12, 15
      [true, false, true, true, false, false, true, false, true, false, true, true, false, false, true, false],
      // 808: 1, 7, 11, 14
      [true, false, false, false, false, false, true, false, false, false, true, false, false, true, false, false],
      // Kick: 1, 5, 9, 13
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      // Snare: 5, 13
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Clap: 5, 13
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Hi-Hat: 16th notes with groove
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      // Tamborim: syncopated Brazilian 3-3-2 funk groove
      [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false],
      // Vocal stab on beat 1 and 9
      [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
    ]
  },
  {
    id: 'funk-do-morro',
    name: 'Funk do Morro',
    tag: 'Favela Drift',
    description: 'Raw distorted cowbells, heavy tamborim groove, aggressive Memphis kick',
    bpm: 140,
    drive: 0.85,
    decay: 0.35,
    pattern: [
      // Cowbell
      [true, false, true, false, true, false, true, true, false, true, false, true, false, true, true, false],
      // 808
      [true, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false],
      // Kick
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      // Snare
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Clap
      [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, true],
      // Hi-Hat
      [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      // Tamborim
      [true, true, false, true, true, false, true, false, true, true, false, true, true, false, true, false],
      // Vocal
      [false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false]
    ]
  },
  {
    id: 'drift-sp',
    name: 'São Paulo Drift',
    tag: 'Speed Phonk',
    description: '145 BPM high-octane racing Phonk with fast rolling hats and piercing cowbells',
    bpm: 145,
    drive: 0.70,
    decay: 0.40,
    pattern: [
      // Cowbell
      [true, true, true, false, true, true, false, true, true, true, false, true, true, false, true, false],
      // 808
      [true, false, false, false, false, true, false, false, true, false, false, false, false, true, false, false],
      // Kick
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      // Snare
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Clap
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Hi-Hat
      [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      // Tamborim
      [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
      // Vocal
      [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]
  },
  {
    id: 'slowed-reverb',
    name: 'Slowed & Reverb SP',
    tag: 'Vapor Wave',
    description: 'Downtempo 118 BPM atmospheric glide with lush tape vinyl crackle',
    bpm: 118,
    drive: 0.40,
    decay: 0.75,
    pattern: [
      // Cowbell
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      // 808
      [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
      // Kick
      [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
      // Snare
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Clap
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Hi-Hat
      [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
      // Tamborim
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      // Vocal
      [false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false]
    ]
  }
];

export class PhonkAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private distortionNode: WaveShaperNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private limiterNode: DynamicsCompressorNode | null = null;
  private vinylGain: GainNode | null = null;
  private vinylSource: AudioBufferSourceNode | null = null;

  private isPlaying = false;
  private bpm = 135;
  private currentStep = 0;
  private timerId: number | null = null;
  private nextStepTime = 0;
  private stepCallbacks: Array<(step: number) => void> = [];

  // Audio parameters
  private masterVolume = 0.85;
  private drive = 0.55;
  private filterCutoff = 18000;
  private cowbellPitchMultiplier = 1.0;
  private cowbellDecay = 0.35;
  private subGlide = 0.12;
  private vinylLevel = 0.08;
  private swing = 0.15; // Brazilian funk syncopation swing (0 to 0.5)

  // Track Mute / Solo states
  private mutes: boolean[] = Array(8).fill(false);
  private solos: boolean[] = Array(8).fill(false);

  // Live session audio recording
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  // 808 glide tracking
  private lastSubFreq = 42;

  constructor() {
    // Lazy initialized on first user click to respect browser autoplay policies
  }

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);

    // Limiter / Compressor to avoid clipping on heavy phonk 808s
    this.limiterNode = this.ctx.createDynamicsCompressor();
    this.limiterNode.threshold.setValueAtTime(-1.5, this.ctx.currentTime);
    this.limiterNode.knee.setValueAtTime(4, this.ctx.currentTime);
    this.limiterNode.ratio.setValueAtTime(18, this.ctx.currentTime);
    this.limiterNode.attack.setValueAtTime(0.002, this.ctx.currentTime);
    this.limiterNode.release.setValueAtTime(0.08, this.ctx.currentTime);

    // Master Low-pass / Tone Filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(this.filterCutoff, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Distortion / Saturation Curve
    this.distortionNode = this.ctx.createWaveShaper();
    this.distortionNode.curve = this.makeDistortionCurve(this.drive * 45);
    this.distortionNode.oversample = '4x';

    // Analyser Node for Real-time Oscilloscope & Spectrum Visualizer
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.82;

    // Chain: MasterGain -> Distortion -> Filter -> Limiter -> Analyser -> Destination
    this.masterGain.connect(this.distortionNode);
    this.distortionNode.connect(this.filterNode);
    this.filterNode.connect(this.limiterNode);
    this.limiterNode.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Start subtle procedural vinyl crackle background
    this.startVinylCrackle();
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Soft saturation sigmoid curve with punchy clipping
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  private startVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        // Brown noise filtered crackle
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        const pop = Math.random() > 0.9994 ? (Math.random() - 0.5) * 0.4 : 0;
        data[i] = (lastOut * 0.04 + pop) * 0.25;
      }

      this.vinylSource = this.ctx.createBufferSource();
      this.vinylSource.buffer = buffer;
      this.vinylSource.loop = true;

      this.vinylGain = this.ctx.createGain();
      this.vinylGain.gain.setValueAtTime(this.vinylLevel, this.ctx.currentTime);

      this.vinylSource.connect(this.vinylGain);
      this.vinylGain.connect(this.masterGain);
      this.vinylSource.start();
    } catch {
      // Quiet fail if browser restricts
    }
  }

  // --- SOUND GENERATORS ---

  /**
   * Authentic Roland TR-808 Cowbell Synthesizer
   * Two detuned pulse square waves (540Hz and 800Hz) through sharp bandpass
   */
  public playCowbell(pitch = 1.0, decay = 0.35, when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;
    const effPitch = pitch * this.cowbellPitchMultiplier;

    const baseF1 = 540 * effPitch;
    const baseF2 = 800 * effPitch;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'square';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(baseF1, time);
    osc2.frequency.setValueAtTime(baseF2, time);

    // Initial pitch deflection transient for classic bite
    osc1.frequency.exponentialRampToValueAtTime(baseF1 * 0.96, time + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(baseF2 * 0.96, time + 0.04);

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(840 * effPitch, time);
    bpf.Q.setValueAtTime(8.5, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    osc1.connect(bpf);
    osc2.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + decay + 0.05);
    osc2.stop(time + decay + 0.05);
  }

  /**
   * Mandelão 808 Sub-Bass
   * Thick sine with rapid pitch dive attack & glide portamento
   */
  public play808(targetFreq = 42, glide = 0.12, when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';

    // Pitch envelope: starts higher, drops fast, then glides
    const startFreq = this.lastSubFreq > 0 ? this.lastSubFreq : targetFreq * 2.2;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(targetFreq, time + glide);
    this.lastSubFreq = targetFreq;

    // Sub overdrive waveshaping for heavy harmonics
    const subSat = this.ctx.createWaveShaper();
    subSat.curve = this.makeDistortionCurve(30);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.setValueAtTime(0.85, time + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.85);

    osc.connect(subSat);
    subSat.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.9);
  }

  /**
   * Brazilian Phonk Kick
   * Heavy thump, 160Hz -> 38Hz in 65ms
   */
  public playKick(when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);

    // Click transient
    const click = this.ctx.createOscillator();
    click.type = 'triangle';
    click.frequency.setValueAtTime(600, time);
    click.frequency.exponentialRampToValueAtTime(80, time + 0.02);
    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.4, time);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.025);

    click.connect(clickGain);
    clickGain.connect(this.masterGain);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    click.start(time);
    osc.stop(time + 0.38);
    click.stop(time + 0.03);
  }

  /**
   * Snappy 808 / Phonk Snare
   */
  public playSnare(when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    // Body sine
    const toneOsc = this.ctx.createOscillator();
    toneOsc.type = 'triangle';
    toneOsc.frequency.setValueAtTime(185, time);
    toneOsc.frequency.exponentialRampToValueAtTime(60, time + 0.1);

    const toneGain = this.ctx.createGain();
    toneGain.gain.setValueAtTime(0.65, time);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

    // Snappy noise burst
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.2, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1100, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    toneOsc.connect(toneGain);
    toneGain.connect(this.masterGain);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    toneOsc.start(time);
    noiseSource.start(time);
    toneOsc.stop(time + 0.15);
    noiseSource.stop(time + 0.2);
  }

  /**
   * Multi-stage 808 Clap
   */
  public playClap(when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.3, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bpf = this.ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(1250, time);
    bpf.Q.setValueAtTime(2.2, time);

    const gain = this.ctx.createGain();
    // 3 rapid pre-bursts (at 0, 11ms, 22ms)
    gain.gain.setValueAtTime(0.6, time);
    gain.gain.setValueAtTime(0.1, time + 0.01);
    gain.gain.setValueAtTime(0.7, time + 0.012);
    gain.gain.setValueAtTime(0.1, time + 0.022);
    gain.gain.setValueAtTime(0.85, time + 0.024);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.26);

    noise.connect(bpf);
    bpf.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.28);
  }

  /**
   * High-frequency metallic Hi-Hat
   */
  public playHiHat(open = false, when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;
    const dur = open ? 0.28 : 0.055;

    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const hpf = this.ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    noise.connect(hpf);
    hpf.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + dur + 0.01);
  }

  /**
   * Brazilian Favela Tamborim / Baile Funk Percussion
   */
  public playTamborim(when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720, time);
    osc.frequency.exponentialRampToValueAtTime(320, time + 0.06);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.75, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, time);
    filter.Q.setValueAtTime(5.0, time);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  /**
   * Phonk Formant Vocal Stab ("Ahn!" / "Vem!")
   */
  public playVocal(when?: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const time = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(115, time + 0.18);

    // Formant 1: ~700Hz, Formant 2: ~1200Hz
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(700, time);
    f1.Q.setValueAtTime(4, time);

    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1250, time);
    f2.Q.setValueAtTime(6, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(f1);
    osc.connect(f2);
    f1.connect(gain);
    f2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.24);
  }

  /**
   * Trigger any sound by track index
   */
  public triggerPad(trackIndex: number) {
    switch (trackIndex) {
      case 0:
        this.playCowbell(this.cowbellPitchMultiplier, this.cowbellDecay);
        break;
      case 1:
        this.play808(42, this.subGlide);
        break;
      case 2:
        this.playKick();
        break;
      case 3:
        this.playSnare();
        break;
      case 4:
        this.playClap();
        break;
      case 5:
        this.playHiHat(false);
        break;
      case 6:
        this.playTamborim();
        break;
      case 7:
        this.playVocal();
        break;
    }
  }

  // --- SEQUENCER TRANSPORT ---

  public startSequencer(pattern: boolean[][], bpm: number) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.bpm = bpm;
    this.currentStep = 0;
    if (this.ctx) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
    this.scheduleLoop(pattern);
  }

  public stopSequencer() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notifyStep(0);
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(60, Math.min(220, newBpm));
  }

  public onStep(cb: (step: number) => void) {
    this.stepCallbacks.push(cb);
    return () => {
      this.stepCallbacks = this.stepCallbacks.filter((c) => c !== cb);
    };
  }

  private notifyStep(step: number) {
    for (const cb of this.stepCallbacks) {
      cb(step);
    }
  }

  private scheduleLoop(pattern: boolean[][]) {
    if (!this.isPlaying || !this.ctx) return;

    const secondsPerBeat = 60.0 / this.bpm;
    const stepDuration = secondsPerBeat / 4.0; // 16th notes
    const lookaheadTime = 0.1; // 100ms lookahead

    while (this.nextStepTime < this.ctx.currentTime + lookaheadTime) {
      // Trigger active notes for current step
      const step = this.currentStep;
      // Brazilian syncopation swing applied to odd 16th steps
      const isOdd = step % 2 === 1;
      const swingOffset = isOdd ? stepDuration * (this.swing * 0.4) : 0;
      const triggerTime = this.nextStepTime + swingOffset;

      for (let track = 0; track < pattern.length; track++) {
        if (pattern[track][step]) {
          this.scheduleNote(track, triggerTime);
        }
      }

      // Sync step indicator with audio clock
      const scheduledStep = this.currentStep;
      const delayMs = Math.max(0, (triggerTime - this.ctx.currentTime) * 1000);
      setTimeout(() => {
        if (this.isPlaying) {
          this.notifyStep(scheduledStep);
        }
      }, delayMs);

      this.nextStepTime += stepDuration;
      this.currentStep = (this.currentStep + 1) % 16;
    }

    this.timerId = window.setTimeout(() => this.scheduleLoop(pattern), 25);
  }

  private scheduleNote(trackIndex: number, time: number) {
    // Check solo and mute states
    const hasActiveSolo = this.solos.some(Boolean);
    if (hasActiveSolo) {
      if (!this.solos[trackIndex]) return;
    } else if (this.mutes[trackIndex]) {
      return;
    }

    switch (trackIndex) {
      case 0:
        this.playCowbell(this.cowbellPitchMultiplier, this.cowbellDecay, time);
        break;
      case 1:
        this.play808(42, this.subGlide, time);
        break;
      case 2:
        this.playKick(time);
        break;
      case 3:
        this.playSnare(time);
        break;
      case 4:
        this.playClap(time);
        break;
      case 5:
        this.playHiHat(false, time);
        break;
      case 6:
        this.playTamborim(time);
        break;
      case 7:
        this.playVocal(time);
        break;
    }
  }

  // --- PARAMETERS SETTERS ---

  public setMute(trackIndex: number, isMuted: boolean) {
    if (trackIndex >= 0 && trackIndex < 8) {
      this.mutes[trackIndex] = isMuted;
    }
  }

  public setSolo(trackIndex: number, isSoloed: boolean) {
    if (trackIndex >= 0 && trackIndex < 8) {
      this.solos[trackIndex] = isSoloed;
    }
  }

  public setSwing(amount: number) {
    this.swing = Math.max(0, Math.min(0.6, amount));
  }

  public getSwing(): number {
    return this.swing;
  }

  /**
   * Start live session recording directly from master audio bus
   */
  public startLiveRecording(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;
    try {
      // Connect master gain to media stream destination
      const dest = this.ctx.createMediaStreamDestination();
      this.masterGain.connect(dest);
      this.recordedChunks = [];
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      this.mediaRecorder = new MediaRecorder(dest.stream, { mimeType });
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
      this.mediaRecorder.start(100);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Stop recording and return Audio Blob
   */
  public stopLiveRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.recordedChunks = [];
        resolve(blob);
      };
      this.mediaRecorder.stop();
    });
  }

  public setMasterVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1.5, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public setDrive(val: number) {
    this.drive = Math.max(0, Math.min(1, val));
    if (this.distortionNode) {
      this.distortionNode.curve = this.makeDistortionCurve(this.drive * 65);
    }
  }

  public setFilterCutoff(hz: number) {
    this.filterCutoff = Math.max(200, Math.min(20000, hz));
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setValueAtTime(this.filterCutoff, this.ctx.currentTime);
    }
  }

  public setCowbellPitch(multiplier: number) {
    this.cowbellPitchMultiplier = Math.max(0.5, Math.min(2.5, multiplier));
  }

  public setCowbellDecay(sec: number) {
    this.cowbellDecay = Math.max(0.1, Math.min(1.2, sec));
  }

  public setSubGlide(sec: number) {
    this.subGlide = Math.max(0.01, Math.min(0.5, sec));
  }

  public setVinylLevel(lvl: number) {
    this.vinylLevel = Math.max(0, Math.min(0.3, lvl));
    if (this.vinylGain && this.ctx) {
      this.vinylGain.gain.setValueAtTime(this.vinylLevel, this.ctx.currentTime);
    }
  }

  public getVisualizerData(freqArray: Uint8Array, timeArray: Uint8Array) {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(freqArray);
      this.analyser.getByteTimeDomainData(timeArray);
    }
  }

  // --- EXPORT FUNCTIONALITY ---

  /**
   * Export Loop to WAV using OfflineAudioContext
   */
  public async exportWav(pattern: boolean[][], bpm: number): Promise<Blob> {
    const secondsPerBeat = 60.0 / bpm;
    const loopDuration = secondsPerBeat * 4; // 1 bar (4 beats)
    const sampleRate = 44100;
    const offlineCtx = new OfflineAudioContext(2, sampleRate * loopDuration, sampleRate);

    const stepDuration = secondsPerBeat / 4.0;
    const master = offlineCtx.createGain();
    master.gain.setValueAtTime(0.85, 0);

    const compressor = offlineCtx.createDynamicsCompressor();
    master.connect(compressor);
    compressor.connect(offlineCtx.destination);

    for (let step = 0; step < 16; step++) {
      const stepTime = step * stepDuration;
      for (let track = 0; track < pattern.length; track++) {
        if (pattern[track][step]) {
          if (track === 0) {
            // Cowbell
            const o1 = offlineCtx.createOscillator();
            const o2 = offlineCtx.createOscillator();
            o1.type = 'square';
            o2.type = 'square';
            o1.frequency.setValueAtTime(540 * this.cowbellPitchMultiplier, stepTime);
            o2.frequency.setValueAtTime(800 * this.cowbellPitchMultiplier, stepTime);
            const bpf = offlineCtx.createBiquadFilter();
            bpf.type = 'bandpass';
            bpf.frequency.setValueAtTime(840 * this.cowbellPitchMultiplier, stepTime);
            bpf.Q.setValueAtTime(8, stepTime);
            const g = offlineCtx.createGain();
            g.gain.setValueAtTime(0.65, stepTime);
            g.gain.exponentialRampToValueAtTime(0.0001, stepTime + this.cowbellDecay);
            o1.connect(bpf);
            o2.connect(bpf);
            bpf.connect(g);
            g.connect(master);
            o1.start(stepTime);
            o2.start(stepTime);
            o1.stop(stepTime + this.cowbellDecay);
            o2.stop(stepTime + this.cowbellDecay);
          } else if (track === 1) {
            // 808
            const osc = offlineCtx.createOscillator();
            osc.frequency.setValueAtTime(85, stepTime);
            osc.frequency.exponentialRampToValueAtTime(42, stepTime + this.subGlide);
            const g = offlineCtx.createGain();
            g.gain.setValueAtTime(0.8, stepTime);
            g.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.7);
            osc.connect(g);
            g.connect(master);
            osc.start(stepTime);
            osc.stop(stepTime + 0.75);
          } else if (track === 2) {
            // Kick
            const osc = offlineCtx.createOscillator();
            osc.frequency.setValueAtTime(160, stepTime);
            osc.frequency.exponentialRampToValueAtTime(38, stepTime + 0.08);
            const g = offlineCtx.createGain();
            g.gain.setValueAtTime(0.9, stepTime);
            g.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.35);
            osc.connect(g);
            g.connect(master);
            osc.start(stepTime);
            osc.stop(stepTime + 0.38);
          } else if (track === 3 || track === 4) {
            // Snare / Clap
            const b = offlineCtx.createBuffer(1, sampleRate * 0.2, sampleRate);
            const d = b.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
            const src = offlineCtx.createBufferSource();
            src.buffer = b;
            const f = offlineCtx.createBiquadFilter();
            f.type = 'highpass';
            f.frequency.setValueAtTime(1000, stepTime);
            const g = offlineCtx.createGain();
            g.gain.setValueAtTime(0.6, stepTime);
            g.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.18);
            src.connect(f);
            f.connect(g);
            g.connect(master);
            src.start(stepTime);
            src.stop(stepTime + 0.2);
          }
        }
      }
    }

    const rendered = await offlineCtx.startRendering();
    return this.audioBufferToWav(rendered);
  }

  private audioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const dataLength = buffer.length * blockAlign;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    // RIFF chunk descriptor
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    this.writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);

    // data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    // Write interleaved 16-bit PCM samples
    let offset = 44;
    const channelData = [];
    for (let c = 0; c < numChannels; c++) {
      channelData.push(buffer.getChannelData(c));
    }

    for (let i = 0; i < buffer.length; i++) {
      for (let c = 0; c < numChannels; c++) {
        const sample = Math.max(-1, Math.min(1, channelData[c][i]));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }

  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  /**
   * Export Pattern to Standard Type 0 MIDI File
   */
  public exportMidi(pattern: boolean[][], bpm: number): Blob {
    // Standard MIDI Header: MThd, length 6, format 0, 1 track, 480 ticks/quarter note
    const ticksPerQuarter = 480;
    const ticksPer16th = ticksPerQuarter / 4; // 120 ticks

    // General MIDI Drum note mappings
    const midiNotes = [
      56, // Cowbell
      35, // Acoustic Bass Drum / 808
      36, // Bass Drum 1
      38, // Snare Drum
      39, // Hand Clap
      42, // Closed Hi-Hat
      54, // Tambourine / Tamborim
      60  // Vocal Stab (C4)
    ];

    const trackEvents: number[] = [];

    // Set Tempo event (Meta 0x51, length 3)
    const microsecPerQuarter = Math.round(60000000 / bpm);
    trackEvents.push(0x00, 0xff, 0x51, 0x03);
    trackEvents.push((microsecPerQuarter >> 16) & 0xff);
    trackEvents.push((microsecPerQuarter >> 8) & 0xff);
    trackEvents.push(microsecPerQuarter & 0xff);

    let lastTick = 0;

    for (let step = 0; step < 16; step++) {
      const stepTick = step * ticksPer16th;
      for (let t = 0; t < pattern.length; t++) {
        if (pattern[t][step]) {
          const delta = stepTick - lastTick;
          this.writeVarInt(trackEvents, delta);
          trackEvents.push(0x99); // Note On channel 10 (drums)
          trackEvents.push(midiNotes[t]);
          trackEvents.push(110); // Velocity
          lastTick = stepTick;

          // Note off after short duration (60 ticks)
          const offDelta = 60;
          this.writeVarInt(trackEvents, offDelta);
          trackEvents.push(0x89); // Note Off channel 10
          trackEvents.push(midiNotes[t]);
          trackEvents.push(0);
          lastTick = stepTick + offDelta;
        }
      }
    }

    // End of Track meta event
    this.writeVarInt(trackEvents, 0);
    trackEvents.push(0xff, 0x2f, 0x00);

    // Build MIDI binary
    const headerBytes = [
      0x4d, 0x54, 0x68, 0x64, // MThd
      0x00, 0x00, 0x00, 0x06, // Chunk length
      0x00, 0x00,             // Format 0
      0x00, 0x01,             // 1 track
      (ticksPerQuarter >> 8) & 0xff, ticksPerQuarter & 0xff
    ];

    const trackHeader = [
      0x4d, 0x54, 0x72, 0x6b, // MTrk
      (trackEvents.length >> 24) & 0xff,
      (trackEvents.length >> 16) & 0xff,
      (trackEvents.length >> 8) & 0xff,
      trackEvents.length & 0xff
    ];

    const totalBytes = new Uint8Array([...headerBytes, ...trackHeader, ...trackEvents]);
    return new Blob([totalBytes], { type: 'audio/midi' });
  }

  private writeVarInt(arr: number[], value: number) {
    let buffer = value & 0x7f;
    while ((value >>= 7)) {
      buffer <<= 8;
      buffer |= (value & 0x7f) | 0x80;
    }
    while (true) {
      arr.push(buffer & 0xff);
      if (buffer & 0x80) buffer >>= 8;
      else break;
    }
  }
}

// Global Singleton Instance
export const audioEngine = new PhonkAudioEngine();
