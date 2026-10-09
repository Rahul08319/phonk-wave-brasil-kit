import React, { useState, useRef, useEffect, useCallback } from 'react';

interface AppleKnobProps {
  label: string;
  value: number; // 0.0 to 1.0 or custom range
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  color?: string; // Accent color hex
  formatDisplay?: (val: number) => string;
  onChange: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const AppleKnob: React.FC<AppleKnobProps> = ({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  defaultValue,
  unit = '',
  color = '#00F59B',
  formatDisplay,
  onChange,
  size = 'md',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);
  const startValRef = useRef<number>(value);
  const knobRef = useRef<HTMLDivElement>(null);

  // Normalize value to 0..1 for angle calculation
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  // Angle: -135deg to +135deg (270 degree sweep)
  const angle = -135 + normalized * 270;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startValRef.current = value;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      startYRef.current = e.touches[0].clientY;
      startValRef.current = value;
    }
  };

  const handleDoubleClick = () => {
    if (defaultValue !== undefined) {
      onChange(defaultValue);
    } else {
      onChange(min + (max - min) * 0.5);
    }
  };

  const handleMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;
      const deltaY = startYRef.current - clientY;
      const sensitivity = 0.005; // 200px drag = full range
      const deltaNorm = deltaY * sensitivity;
      const currentNorm = (startValRef.current - min) / (max - min);
      const newNorm = Math.max(0, Math.min(1, currentNorm + deltaNorm));
      let newVal = min + newNorm * (max - min);
      if (step > 0) {
        newVal = Math.round(newVal / step) * step;
      }
      onChange(Number(newVal.toFixed(3)));
    },
    [isDragging, min, max, step, onChange]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientY);
    };
    const onTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove]);

  const displayString = formatDisplay
    ? formatDisplay(value)
    : `${Number(value.toFixed(2))}${unit}`;

  const diameter = size === 'sm' ? 44 : size === 'lg' ? 68 : 56;
  const radius = (diameter - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - normalized * (circumference * 0.75);

  return (
    <div className="flex flex-col items-center select-none group">
      <div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleDoubleClick}
        title="Drag up/down to adjust, double-click to reset"
        className={`relative cursor-ns-resize flex items-center justify-center rounded-full transition-transform duration-75 active:scale-95 ${
          isDragging ? 'scale-105 shadow-lg' : ''
        }`}
        style={{
          width: diameter,
          height: diameter,
        }}
      >
        {/* Apple Translucent Dial Surface */}
        <div
          className="absolute inset-0 rounded-full border border-white/20 shadow-inner"
          style={{
            background:
              'radial-gradient(135% 135% at 30% 20%, rgba(255,255,255,0.18) 0%, rgba(20,20,24,0.85) 60%, rgba(10,10,12,0.95) 100%)',
            boxShadow: isDragging
              ? `0 0 16px ${color}55, inset 0 1px 1px rgba(255,255,255,0.3)`
              : '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
          }}
        />

        {/* SVG Arc track */}
        <svg
          className="absolute inset-0 -rotate-90 pointer-events-none"
          width={diameter}
          height={diameter}
        >
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: isDragging ? 'none' : 'stroke-dashoffset 150ms ease-out',
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        </svg>

        {/* Rotary Indicator Needle */}
        <div
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? 'none' : 'transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <div
            className="w-1 rounded-full shadow-sm"
            style={{
              height: diameter * 0.28,
              backgroundColor: color,
              marginTop: -(diameter * 0.38),
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        </div>

        {/* Center Metallic Cap */}
        <div
          className="relative z-10 rounded-full border border-white/20 shadow-md"
          style={{
            width: diameter * 0.45,
            height: diameter * 0.45,
            background:
              'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.25) 0%, rgba(40,40,45,0.9) 70%, rgba(15,15,18,1) 100%)',
          }}
        />
      </div>

      {/* Value Readout Badge */}
      <div className="mt-1.5 text-center">
        <span
          className="text-[11px] font-mono tracking-tight px-1.5 py-0.5 rounded-full transition-all"
          style={{
            color: isDragging ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
            backgroundColor: isDragging ? `${color}33` : 'rgba(255,255,255,0.05)',
            border: isDragging ? `1px solid ${color}66` : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {displayString}
        </span>
      </div>

      {/* Semantic Label */}
      <span className="text-[10px] font-medium tracking-wider uppercase text-white/50 mt-1">
        {label}
      </span>
    </div>
  );
};

export default AppleKnob;
