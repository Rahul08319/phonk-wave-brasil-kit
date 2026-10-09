/**
 * Dynamic Version & Compatibility Engine
 * 
 * Automatically computes version tags, copyright notices, and future-year
 * compatibility parameters so the workstation stays updated and accurate
 * across coming years without manual intervention.
 */

export interface SystemVersionInfo {
  currentYear: number;
  releaseYear: number;
  copyrightSpan: string;
  versionString: string;
  dspVersion: string;
  compatibilityTier: string;
  engineStatus: 'Optimal' | 'Degraded';
}

export const getSystemVersionInfo = (): SystemVersionInfo => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const releaseYear = 2024;
  const majorVersion = Math.max(1, currentYear - releaseYear + 1);
  const minorVersion = now.getMonth() + 1;

  const copyrightSpan = currentYear > releaseYear 
    ? `${releaseYear}–${currentYear}`
    : `${releaseYear}`;

  return {
    currentYear,
    releaseYear,
    copyrightSpan,
    versionString: `v${majorVersion}.${minorVersion}.0`,
    dspVersion: `DSP-${currentYear}.PRO`,
    compatibilityTier: `Universal WebAudio / WASM (${currentYear}+)`,
    engineStatus: typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: unknown }).webkitAudioContext) ? 'Optimal' : 'Degraded'
  };
};
