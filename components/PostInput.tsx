import React from 'react';

interface PostInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PostInput: React.FC<PostInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="post-content" className="block text-sm font-medium text-[#A8DADC] mb-2">
        1. Paste the LinkedIn Post
      </label>
      <textarea
        id="post-content"
        value={value}
        onChange={onChange}
        placeholder="Paste the content of the LinkedIn post here..."
        rows={8}
        className="w-full p-4 bg-[#132A46] border border-[#457B9D]/60 rounded-lg text-[#F1FAEE] placeholder-[#A8DADC]/50 focus:ring-2 focus:ring-[#A8DADC] focus:border-[#A8DADC] transition-all duration-200 resize-y"
      />
    </div>
  );
};

export default PostInput;