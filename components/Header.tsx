
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white tracking-tight">
              Gemini Image Gen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </button>
            <button className="text-sm font-medium bg-white text-slate-900 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
