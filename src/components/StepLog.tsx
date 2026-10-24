import React, { useEffect, useRef, useState } from 'react';
import { SortStep } from '../types.ts';
import {
  ListOrdered,
  Eye,
  ArrowLeftRight,
  CheckCircle2,
  Flag,
  ArrowDownToLine,
  Filter,
} from 'lucide-react';

interface StepLogProps {
  steps: SortStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const StepLog: React.FC<StepLogProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'passesOnly'>('all');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active step when it changes
  useEffect(() => {
    if (autoScroll && activeStepRef.current && logContainerRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStepIndex, autoScroll, filterMode]);

  // Filter steps if passesOnly is selected
  const displayedSteps = filterMode === 'all'
    ? steps
    : steps.filter((s) => s.isPassEnd || s.type === 'FINISHED' || s.type === 'INIT');

  const getStepIcon = (type: SortStep['type']) => {
    switch (type) {
      case 'COMPARE':
        return <Eye className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'SWAP':
        return <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'PASS_SUMMARY':
        return <Flag className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'FINISHED':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      default:
        return <ListOrdered className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="w-full bg-[#0e1738] rounded-2xl border border-[#1d2a54] p-4 sm:p-6 shadow-sm transition-colors">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2750]">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            Step-by-Step Log
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            ({steps.length > 0 ? `${currentStepIndex + 1}/${steps.length}` : '0 steps'})
          </span>
        </div>

        {/* View Filters & Auto-scroll Toggle */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center bg-[#0a122c] border border-[#1d2a54] p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-[#1a2b58] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All steps ({steps.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('passesOnly')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterMode === 'passesOnly'
                  ? 'bg-[#1a2b58] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pass summaries only
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-1.5 rounded-lg border transition-colors ${
              autoScroll
                ? 'bg-amber-950/70 border-amber-400/80 text-amber-300'
                : 'border-[#1d2a54] text-slate-400 hover:text-slate-200'
            }`}
            title={autoScroll ? 'Auto-scroll is ON' : 'Auto-scroll is OFF'}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Feed */}
      <div
        ref={logContainerRef}
        className="mt-3 max-h-72 overflow-y-auto space-y-1.5 pr-1 text-xs font-mono scroll-smooth"
      >
        {displayedSteps.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No steps generated yet. Provide valid numbers above.
          </div>
        ) : (
          displayedSteps.map((step) => {
            const isActive = step.id === currentStepIndex;
            const isPast = step.id < currentStepIndex;
            const isPassEnd = step.isPassEnd;

            return (
              <div
                key={step.id}
                ref={isActive ? activeStepRef : null}
                onClick={() => onSelectStep(step.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-[#1e274b] border-amber-400 shadow-md ring-1 ring-amber-400/60'
                    : isPassEnd
                    ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 hover:border-emerald-400'
                    : isPast
                    ? 'bg-[#0a122c]/80 border-[#1c2a52] text-slate-300 hover:bg-[#121e42]'
                    : 'bg-[#0a122c]/40 border-transparent text-slate-500 hover:bg-[#0e1836]'
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className="mt-0.5">{getStepIcon(step.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`font-semibold ${
                          isActive
                            ? 'text-amber-200'
                            : isPassEnd
                            ? 'text-emerald-300'
                            : 'text-slate-200'
                        }`}
                      >
                        {step.description}
                      </span>
                    </div>

                    {/* Array snapshot after pass or compare */}
                    <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Array: {step.arrayString}</span>
                      <span>·</span>
                      <span>Comps: {step.comparisonsSoFar}</span>
                      <span>·</span>
                      <span>Swaps: {step.swapsSoFar}</span>
                    </div>
                  </div>
                </div>

                {/* Right Badge */}
                <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
                  {isActive && (
                    <span className="text-[10px] uppercase font-bold text-amber-950 bg-amber-400 px-2 py-0.5 rounded-md shadow-xs">
                      Current
                    </span>
                  )}
                  {isPassEnd && !isActive && (
                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-600/50 px-2 py-0.5 rounded-md">
                      Pass {step.pass} End
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">
                    #{step.id}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <p className="mt-2 text-[11px] text-slate-400 text-right">
        Tip: Click any step in the log to inspect the array state at that exact moment.
      </p>
    </div>
  );
};
