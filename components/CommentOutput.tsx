import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './IconComponents';

interface CommentOutputProps {
  comment: string;
}

const CommentOutput: React.FC<CommentOutputProps> = ({ comment }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(comment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#457B9D]/20 p-6 rounded-2xl shadow-lg border border-[#457B9D]/50 relative animate-fade-in">
        <h3 className="text-lg font-semibold text-[#A8DADC] mb-4">Generated Comment</h3>
        <p className="text-[#F1FAEE] whitespace-pre-wrap leading-relaxed">
            {comment}
        </p>
        <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-[#457B9D]/70 rounded-full text-[#F1FAEE] hover:bg-[#457B9D] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
            aria-label="Copy comment to clipboard"
        >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default CommentOutput;