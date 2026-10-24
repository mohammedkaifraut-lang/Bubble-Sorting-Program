import React from 'react';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onScrollToExplanation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onScrollToExplanation,
}) => {
  return (
    <header className="border-b border-[#1a2850] bg-[#0a1128]/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-500 flex items-center justify-center text-white shadow-sm ring-1 ring-amber-400/40">
            <Sparkles className="w-5 h-5 text-slate-950 fill-amber-300" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Bubble Sort Visualizer
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive step-by-step sorting simulation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onScrollToExplanation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-[#131f45] rounded-lg border border-transparent hover:border-[#22356b] transition-colors"
            title="Read how Bubble Sort works and complexity analysis"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>How it works</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle light and dark theme"
            className="p-2 text-slate-300 hover:text-white hover:bg-[#131f45] rounded-lg border border-transparent hover:border-[#22356b] transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
