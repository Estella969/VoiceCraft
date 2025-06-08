import React, { useState } from 'react';

interface ToneSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

const ToneSlider: React.FC<ToneSliderProps> = ({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-purple-300">{value}%</span>
      </div>
      
      <div className="relative h-12 mb-1">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-2 top-5 appearance-none bg-white/10 rounded-full outline-none z-10"
          style={{
            // Custom styling for the range input
            background: `linear-gradient(to right, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.5) ${value}%, rgba(255, 255, 255, 0.1) ${value}%, rgba(255, 255, 255, 0.1) 100%)`
          }}
        />
        
        <div 
          className={`absolute h-5 w-5 rounded-full bg-purple-400 top-3.5 transform -translate-x-1/2 transition-transform ${
            isDragging ? 'scale-125 shadow-lg shadow-purple-500/50' : ''
          }`}
          style={{ 
            left: `${value}%`,
            boxShadow: isDragging ? '0 0 10px rgba(139, 92, 246, 0.5)' : '0 0 5px rgba(139, 92, 246, 0.3)'
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-purple-300/70">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};

export default ToneSlider;