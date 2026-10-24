import React, { useState } from 'react';
import { BookOpen, Clock, Cpu, ShieldCheck, Zap, Code2 } from 'lucide-react';

interface AlgorithmInfoProps {
  currentPseudocodeLine?: number;
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({
  currentPseudocodeLine,
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'pseudocode'>('explanation');

  const pseudocodeLines = [
    { line: 1, text: 'procedure bubbleSort(A: list of sortable items)' },
    { line: 2, text: '  n := length(A)' },
    { line: 3, text: '  for i from 0 to n - 2 do' },
    { line: 4, text: '    swapped := false' },
    { line: 5, text: '    for j from 0 to n - i - 2 do' },
    { line: 6, text: '      if A[j] > A[j + 1] then' },
    { line: 7, text: '        swap(A[j], A[j + 1])' },
    { line: 8, text: '        swapped := true' },
    { line: 9, text: '    if not swapped then break  // early termination' },
    { line: 10, text: '  return A' },
  ];

  return (
    <section
      id="algorithm-info"
      className="w-full bg-[#0e1738] rounded-2xl border border-[#1d2a54] p-5 sm:p-7 shadow-sm space-y-6 transition-colors"
    >
      {/* Header and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b2750]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#131f45] border border-[#23356b] flex items-center justify-center text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Understanding Bubble Sort
            </h2>
            <p className="text-xs text-slate-400">
              Mechanics, early exit optimization, and asymptotic time complexity
            </p>
          </div>
        </div>

        {/* Segmented Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#0a122c] border border-[#1d2a54] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('explanation')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'explanation'
                ? 'bg-[#1a2b58] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview & Complexity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pseudocode')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'pseudocode'
                ? 'bg-[#1a2b58] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Algorithm Pseudocode</span>
          </button>
        </div>
      </div>

      {activeTab === 'explanation' ? (
        <div className="space-y-6">
          {/* Conceptual Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-white uppercase tracking-wider text-xs">
                How It Works
              </h3>
              <p>
                <strong>Bubble Sort</strong> is a fundamental comparison-based sorting algorithm. It steps through the array repeatedly, compares adjacent elements in pairs, and swaps them if they are in the wrong order (i.e. if the left number is strictly greater than the right number).
              </p>
              <p>
                Like air bubbles rising to the surface in a liquid, the largest unsorted element in each pass &quot;bubbles up&quot; to its permanent position at the end of the array. Once placed, that position is locked (highlighted in <span className="text-emerald-400 font-semibold">green</span>) and never needs to be inspected again.
              </p>
            </div>

            <div className="space-y-3 bg-[#0a122c] p-4 rounded-xl border border-[#1d2a54]">
              <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>The Early Exit Optimization</span>
              </h3>
              <p className="text-xs text-slate-300">
                A standard naive implementation runs all $(n-1)$ passes even if the array is already sorted. By maintaining a boolean <code className="px-1 py-0.5 rounded bg-[#16244f] text-amber-300 font-mono text-[11px]">swapped</code> flag during each pass:
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-300">
                <li>If at least one swap happened, sorting continues to the next pass.</li>
                <li>If <strong>zero swaps</strong> occurred during a pass, the list is guaranteed to be fully sorted, and the algorithm terminates immediately.</li>
              </ul>
            </div>
          </div>

          {/* Time & Space Complexity Cards */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Complexity Analysis</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Best Case */}
              <div className="p-3.5 rounded-xl border border-[#1d2a54] bg-[#0a122c] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Best Case</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-600/60 text-emerald-300">
                    O(n)
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-white">
                  Linear Time
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  When the array is already sorted, only 1 pass of $(n - 1)$ comparisons with 0 swaps is needed.
                </p>
              </div>

              {/* Worst Case */}
              <div className="p-3.5 rounded-xl border border-[#1d2a54] bg-[#0a122c] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Worst Case</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-600/60 text-rose-300">
                    O(n²)
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-white">
                  Quadratic Time
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  When elements are reverse sorted, every comparison requires a swap ($n(n-1)/2$ total operations).
                </p>
              </div>

              {/* Average Case */}
              <div className="p-3.5 rounded-xl border border-[#1d2a54] bg-[#0a122c] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Average Case</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-600/60 text-amber-300">
                    O(n²)
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-white">
                  Quadratic Time
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  For random input distributions, expected comparisons and swaps are quadratic.
                </p>
              </div>

              {/* Space & Stability */}
              <div className="p-3.5 rounded-xl border border-[#1d2a54] bg-[#0a122c] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Aux Space & Stability</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-600/60 text-sky-300">
                    O(1)
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-white flex items-center gap-1.5">
                  <span>In-Place</span>
                  <span className="text-xs font-normal text-slate-400">· Stable</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">
                  Operates directly in memory. Equal elements never swap past each other, preserving order.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Pseudocode Tab */
        <div className="space-y-3">
          <div className="bg-[#070d20] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-[#1d2a54] shadow-inner">
            {pseudocodeLines.map((item) => {
              // Highlight line if matching current execution step
              const isHighlighted =
                currentPseudocodeLine &&
                (currentPseudocodeLine === item.line ||
                  (currentPseudocodeLine === 3 && item.line === 6) ||
                  (currentPseudocodeLine === 4 && (item.line === 7 || item.line === 8)));

              return (
                <div
                  key={item.line}
                  className={`py-1 px-2 rounded-sm transition-colors flex items-center gap-3 ${
                    isHighlighted
                      ? 'bg-amber-400/20 text-amber-300 border-l-2 border-amber-400 font-semibold'
                      : 'hover:bg-[#0e1836]'
                  }`}
                >
                  <span className="w-5 text-slate-600 select-none text-right">
                    {item.line}
                  </span>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">
            Note: The inner loop boundary is <code className="text-slate-200 bg-[#142047] px-1 py-0.5 rounded font-mono">n - i - 1</code> because the last <code className="text-slate-200 bg-[#142047] px-1 py-0.5 rounded font-mono">i</code> elements are already placed in their final sorted positions.
          </p>
        </div>
      )}
    </section>
  );
};
