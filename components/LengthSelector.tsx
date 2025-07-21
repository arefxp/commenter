import React from 'react';
import { CommentLength } from '../constants';

interface LengthSelectorProps {
  lengths: CommentLength[];
  selectedLength: CommentLength;
  onLengthChange: (length: CommentLength) => void;
}

const LengthSelector: React.FC<LengthSelectorProps> = ({ lengths, selectedLength, onLengthChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {lengths.map((length) => (
        <button
          key={length.id}
          onClick={() => onLengthChange(length)}
          className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center transition-all duration-200 ease-in-out border
            ${
              selectedLength.id === length.id
                ? 'bg-[#E63946] border-[#E63946] text-white shadow-md'
                : 'bg-[#457B9D]/50 border-[#457B9D] text-[#F1FAEE] hover:bg-[#457B9D]/80 hover:border-[#A8DADC]'
            }`}
        >
          {length.label}
        </button>
      ))}
    </div>
  );
};

export default LengthSelector;