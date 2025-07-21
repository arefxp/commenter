import React from 'react';
import { Tone } from '../constants';

interface ToneSelectorProps {
  tones: Tone[];
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ tones, selectedTone, onToneChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {tones.map((tone) => (
        <button
          key={tone.id}
          onClick={() => onToneChange(tone)}
          className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center transition-all duration-200 ease-in-out border
            ${
              selectedTone.id === tone.id
                ? 'bg-[#E63946] border-[#E63946] text-white shadow-md'
                : 'bg-[#457B9D]/50 border-[#457B9D] text-[#F1FAEE] hover:bg-[#457B9D]/80 hover:border-[#A8DADC]'
            }`}
        >
          <span className="mr-2 text-lg">{tone.emoji}</span>
          {tone.label}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;