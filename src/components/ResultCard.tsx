import React from 'react';
import { CheckCircle2, RotateCcw, Dices, ArrowRightLeft, Eye, Award } from 'lucide-react';

interface ResultCardProps {
  sortedArray: number[];
  initialArray: number[];
  totalComparisons: number;
  totalSwaps: number;
  totalPasses: number;
  onReplay: () => void;
  onNewRandom: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  sortedArray,
  initialArray,
  totalComparisons,
  totalSwaps,
  totalPasses,
  onReplay,
  onNewRandom,
}) => {
  const n = initialArray.length;
  // Maximum possible comparisons without early termination is n*(n-1)/2
  const maxPossibleComparisons = (n * (n - 1)) / 2;
  const isEarlyTerminated = totalComparisons < maxPossibleComparisons;

  return (
    <div className="w-full bg-[#0a1836] border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-lg transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Main Result Headline */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Sorting Complete
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
            Sorted array: [{sortedArray.join(', ')}]
          </h3>

          <p className="text-xs text-slate-300">
            Initial input: <span className="font-mono text-slate-200">[{initialArray.join(', ')}]</span>
            {isEarlyTerminated && (
              <span className="ml-2 text-emerald-300 font-medium">
                · Early termination saved {maxPossibleComparisons - totalComparisons} comparison{maxPossibleComparisons - totalComparisons === 1 ? '' : 's'}!
              </span>
            )}
          </p>
        </div>

        {/* Action Replay Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReplay}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#142047] border border-[#243566] text-slate-200 hover:bg-[#1a2c63] transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Replay</span>
          </button>
          <button
            type="button"
            onClick={onNewRandom}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-xs"
          >
            <Dices className="w-4 h-4" />
            <span>Try Another</span>
          </button>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-500/20">
        <div className="bg-[#0e1738] rounded-xl p-3 border border-[#1d2a54]">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Comparisons</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {totalComparisons}
          </div>
        </div>

        <div className="bg-[#0e1738] rounded-xl p-3 border border-[#1d2a54]">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Swaps</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {totalSwaps}
          </div>
        </div>

        <div className="bg-[#0e1738] rounded-xl p-3 border border-[#1d2a54]">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Passes</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {totalPasses}
          </div>
        </div>

        <div className="bg-[#0e1738] rounded-xl p-3 border border-[#1d2a54]">
          <div className="text-slate-400 text-xs mb-1">
            Array Length (n)
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {n}
          </div>
        </div>
      </div>
    </div>
  );
};
