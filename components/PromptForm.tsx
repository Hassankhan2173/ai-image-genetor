
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ASPECT_RATIOS } from '../constants';
import type { AspectRatio } from '../types';

interface PromptFormProps {
  onSubmit: (prompt: string, aspectRatio: AspectRatio) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt, aspectRatio);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-lg p-4 shadow-lg border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A sleek, tech-focused, minimalist logo of a blue star..."
            className="w-full flex-grow bg-slate-900 text-slate-200 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto">
            <label htmlFor="aspect-ratio" className="sr-only">Aspect Ratio</label>
            <select
              id="aspect-ratio"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              {ASPECT_RATIOS.map((ratio) => (
                <option key={ratio.value} value={ratio.value}>{ratio.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
