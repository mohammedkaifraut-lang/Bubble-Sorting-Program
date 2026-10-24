import React from 'react';
import { motion } from 'motion/react';
import { ArrayItem, SortStep } from '../types.ts';
import { ArrowLeftRight, Check, Eye } from 'lucide-react';

interface VisualizationBarsProps {
  currentStep: SortStep;
  totalElements: number;
}

export const VisualizationBars: React.FC<VisualizationBarsProps> = ({
  currentStep,
}) => {
  const { array, comparingIndices, swappedIndices, sortedIndices, type } = currentStep;

  // Compute maximum value in the array to calculate proportional heights
  const maxVal = Math.max(...array.map((item) => Math.abs(item.val)), 10);

  // Helper to determine if an index is being compared
  const isComparing = (idx: number) => {
    return comparingIndices ? comparingIndices.includes(idx) : false;
  };

  // Helper to determine if an index was just swapped
  const isSwapped = (idx: number) => {
    return swappedIndices ? swappedIndices.includes(idx) : false;
  };

  // Helper to determine if an index is in its final sorted position
  const isSorted = (idx: number) => {
    return sortedIndices.includes(idx);
  };

  return (
    <div className="w-full bg-[#0e1738] rounded-2xl border border-[#1d2a54] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Top Status & Legend Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1b2750]">
        <div className="flex items-center gap-2">
          {type === 'COMPARE' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/50 px-2.5 py-1 rounded-md">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Comparing pair</span>
            </div>
          )}
          {type === 'SWAP' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-200 bg-amber-950/90 border border-amber-400 px-2.5 py-1 rounded-md animate-pulse">
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
              <span>Swapping adjacent elements</span>
            </div>
          )}
          {type === 'PASS_SUMMARY' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-1 rounded-md">
              <Check className="w-3.5 h-3.5" />
              <span>Pass Completed</span>
            </div>
          )}
          {type === 'FINISHED' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-1 rounded-md">
              <Check className="w-3.5 h-3.5" />
              <span>All Sorted</span>
            </div>
          )}
          {type === 'INIT' && (
            <span className="text-xs text-slate-400 font-medium">
              Ready to sort {array.length} numbers
            </span>
          )}
        </div>

        {/* Color Legend (unboxed clean labels) */}
        <div className="flex items-center flex-wrap gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 shadow-xs ring-1 ring-amber-500/60 inline-block" />
            <span>Comparing (Yellow)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block shadow-xs" />
            <span>Sorted Position (Green)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#1a2954] border border-[#273d78] inline-block" />
            <span>Unsorted</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Visualization Stage */}
      <div className="relative pt-8 pb-4">
        {/* Active Comparison Indicator Badge floating above the bars */}
        {comparingIndices && comparingIndices.length === 2 && (
          <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#131f45] border border-amber-400/60 text-amber-200 text-xs font-semibold rounded-full shadow-md">
              {isSwapped(comparingIndices[0]) ? (
                <>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Swapping values {array[comparingIndices[0]]?.val} ↔{' '}
                    {array[comparingIndices[1]]?.val}
                  </span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    Comparing values {array[comparingIndices[0]]?.val} and{' '}
                    {array[comparingIndices[1]]?.val}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Vertical Bars Area */}
        <div className="h-64 sm:h-72 flex items-end justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-6">
          {array.map((item: ArrayItem, index: number) => {
            const comparing = isComparing(index);
            const sorted = isSorted(index);
            const swapped = isSwapped(index);

            // Proportional height calculation:
            // Normalize to between 22% (minimum visible bar height) and 95%
            const heightPercent = Math.max(
              22,
              Math.min(95, Math.round((Math.abs(item.val) / maxVal) * 88) + 12)
            );

            // Determine bar theme colors according to requirements:
            // "highlight the two bars being compared in yellow, turn bars green once in final sorted position"
            let barBgClass = 'bg-[#1a2954] hover:bg-[#22356c] text-slate-100 border border-[#273d78]';
            let ringClass = '';
            let statusLabel = '';

            if (comparing) {
              barBgClass = 'bg-amber-400 text-amber-950 font-bold border-amber-300';
              ringClass = 'ring-4 ring-amber-400/60 shadow-lg shadow-amber-400/40 z-10';
              statusLabel = swapped ? 'Swap' : 'Compare';
            } else if (sorted) {
              barBgClass = 'bg-emerald-500 text-white font-bold border-emerald-400';
              ringClass = 'ring-2 ring-emerald-400/60 shadow-md shadow-emerald-500/30';
              statusLabel = 'Sorted';
            }

            return (
              <motion.div
                key={item.id}
                layout
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 28,
                  mass: 0.8,
                }}
                className="flex-1 max-w-[80px] min-w-[38px] flex flex-col items-center justify-end h-full group"
              >
                {/* Micro status tag above the bar during comparison/sorting */}
                <div className="h-6 flex items-center justify-center text-[11px] font-semibold mb-1">
                  {comparing && (
                    <span className="text-amber-600 dark:text-amber-400 animate-bounce">
                      {statusLabel}
                    </span>
                  )}
                  {sorted && !comparing && (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Vertical Bar Element */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-xl flex flex-col items-center justify-between p-2 transition-colors duration-200 ${barBgClass} ${ringClass}`}
                >
                  {/* Top value badge */}
                  <span className="text-base sm:text-xl font-extrabold tracking-tight select-none">
                    {item.val}
                  </span>

                  {/* Visual indicator within bar */}
                  <div className="w-full flex justify-center opacity-60">
                    <div className="w-6 h-1 rounded-full bg-current opacity-40" />
                  </div>
                </div>

                {/* Bottom Index Label */}
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                    [{index}]
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
