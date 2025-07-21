import React, { useState, useCallback } from 'react';
import { TONES, Tone, LENGTHS, CommentLength } from './constants';
import { generateComment } from './services/geminiService';
import Header from './components/Header';
import PostInput from './components/PostInput';
import ToneSelector from './components/ToneSelector';
import LengthSelector from './components/LengthSelector';
import CommentOutput from './components/CommentOutput';
import Loader from './components/Loader';
import { SparklesIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<Tone>(TONES[0]);
  const [selectedLength, setSelectedLength] = useState<CommentLength>(LENGTHS[1]); // Default to Medium
  const [generatedComment, setGeneratedComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearOutput = () => {
      if (generatedComment) setGeneratedComment('');
      if (error) setError(null);
  }

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    clearOutput();
  };

  const handleToneChange = (tone: Tone) => {
    setSelectedTone(tone);
    clearOutput();
  };

  const handleLengthChange = (length: CommentLength) => {
    setSelectedLength(length);
    clearOutput();
  };

  const handleGenerateComment = useCallback(async () => {
    if (!postContent.trim() || isLoading) {
      if (!postContent.trim()) setError("Please paste a post before generating a comment.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedComment('');

    try {
      const comment = await generateComment(postContent, selectedTone.label, selectedLength.label);
      setGeneratedComment(comment);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the comment. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [postContent, selectedTone, selectedLength, isLoading]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-[#457B9D]/20 p-6 rounded-2xl shadow-lg border border-[#457B9D]/50">
            <PostInput value={postContent} onChange={handlePostChange} />
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-[#A8DADC] mb-3">2. Select Comment Length</label>
              <LengthSelector lengths={LENGTHS} selectedLength={selectedLength} onLengthChange={handleLengthChange} />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#A8DADC] mb-3">3. Select a Tone</label>
              <ToneSelector tones={TONES} selectedTone={selectedTone} onToneChange={handleToneChange} />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGenerateComment}
              disabled={isLoading || !postContent.trim()}
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#E63946] text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  Generate Comment
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {generatedComment && !isLoading && (
            <CommentOutput comment={generatedComment} />
          )}
        </main>
        <footer className="text-center mt-12 text-[#A8DADC]/60 text-sm">
          <p>Developed by ArefXP</p>
        </footer>
      </div>
    </div>
  );
};

export default App;