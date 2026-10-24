import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Dices,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Gauge,
  Sliders,
} from 'lucide-react';

interface ControlsProps {
  inputText: string;
  onInputChange: (val: string) => void;
  errorMessage: string | null;
  isPlaying: boolean;
  isFinished: boolean;
  canStepForward: boolean;
  canStepBack: boolean;
  speedMs: number;
  onSpeedChange: (speed: number) => void;
  onSortClick: () => void;
  onResetClick: () => void;
  onRandomClick: () => void;
  onNextStepClick: () => void;
  onPrevStepClick: () => void;
  currentStepIndex: number;
  totalSteps: number;
}

export const Controls: React.FC<ControlsProps> = ({
  inputText,
  onInputChange,
  errorMessage,
  isPlaying,
  isFinished,
  canStepForward,
  canStepBack,
  speedMs,
  onSpeedChange,
  onSortClick,
  onResetClick,
  onRandomClick,
  onNextStepClick,
  onPrevStepClick,
  currentStepIndex,
  totalSteps,
}) => {
  // Preset examples for quick educational testing
  const presets = [
    { label: 'Example (5, 3, 8, 1, 9)', value: '5, 3, 8, 1, 9' },
    { label: 'Reverse Sorted (Worst)', value: '90, 75, 55, 30, 12' },
    { label: 'Already Sorted (Best)', value: '14, 28, 42, 56, 70' },
    { label: '7 Numbers (Max)', value: '64, 34, 25, 12, 22, 11, 90' },
  ];

  // Helper label for speed slider
  const getSpeedLabel = (ms: number) => {
    if (ms <= 350) return 'Fast';
    if (ms <= 750) return 'Normal';
    return 'Slow';
  };

  return (
    <div className="w-full bg-[#0e1738] rounded-2xl border border-[#1d2a54] p-4 sm:p-6 shadow-sm space-y-5 transition-colors">
      {/* Input Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
          <label
            htmlFor="numbers-input"
            className="text-sm font-semibold text-white"
          >
            Array Input (5 to 7 numbers)
          </label>
          <span className="text-xs text-slate-400">
            Separate numbers with commas or spaces
          </span>
        </div>

        <div className="relative">
          <input
            id="numbers-input"
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isPlaying}
            placeholder="e.g. 5, 3, 8, 1, 9"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition-colors focus:outline-hidden focus:ring-2 ${
              errorMessage
                ? 'border-rose-500/80 bg-rose-950/30 text-rose-200 focus:ring-rose-400'
                : 'border-[#243566] bg-[#0a122c] text-white focus:ring-amber-400 focus:border-amber-400'
            } ${isPlaying ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="mt-2 flex items-start gap-2 text-xs text-rose-300 bg-rose-950/50 p-2.5 rounded-lg border border-rose-800/80">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Presets */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1">
            Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              disabled={isPlaying}
              onClick={() => onInputChange(preset.value)}
              className="text-xs px-2.5 py-1 rounded-md bg-[#142047] text-slate-200 border border-[#243566] hover:bg-[#1a2c63] disabled:opacity-50 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Buttons Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#1b2750]">
        {/* Sort / Pause / Resume Button */}
        <button
          type="button"
          onClick={onSortClick}
          disabled={Boolean(errorMessage)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-98 ${
            isPlaying
              ? 'bg-amber-400 hover:bg-amber-500 text-amber-950'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : isFinished ? (
            <>
              <RotateCcw className="w-4 h-4" />
              <span>Replay Sort</span>
            </>
          ) : currentStepIndex > 0 ? (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Sort</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Sort</span>
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onResetClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-[#243566] bg-[#142047] text-slate-200 hover:bg-[#1a2c63] transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Reset</span>
        </button>

        {/* Random Numbers Button */}
        <button
          type="button"
          onClick={onRandomClick}
          disabled={isPlaying}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-[#243566] bg-[#142047] text-slate-200 hover:bg-[#1a2c63] disabled:opacity-50 transition-colors"
          title="Generate 5 to 7 random numbers between 1 and 99"
        >
          <Dices className="w-4 h-4 text-amber-400" />
          <span>Random numbers</span>
        </button>

        {/* Divider for step controls */}
        <div className="hidden sm:block h-7 w-px bg-[#1d2a54] mx-1" />

        {/* Step-by-Step Manual Navigation */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0">
          <button
            type="button"
            onClick={onPrevStepClick}
            disabled={isPlaying || !canStepBack}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm border border-[#243566] bg-[#142047] text-slate-300 hover:bg-[#1a2c63] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Step back to previous comparison or swap"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev step</span>
          </button>

          <button
            type="button"
            onClick={onNextStepClick}
            disabled={isPlaying || !canStepForward}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-500 text-amber-950 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-colors"
            title="Advance one step (Next step)"
          >
            <span>Next step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speed Slider & Progress Tracking */}
      <div className="pt-3 border-t border-[#1b2750] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Speed Slider */}
        <div className="flex items-center gap-3 w-full sm:w-72">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 shrink-0">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Speed: {getSpeedLabel(speedMs)}</span>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-[10px] text-slate-400">Slow</span>
            <input
              type="range"
              min="150"
              max="1500"
              step="50"
              // Inverting value so right = faster
              value={1650 - speedMs}
              onChange={(e) => onSpeedChange(1650 - Number(e.target.value))}
              aria-label="Sorting animation speed slider"
              className="w-full h-1.5 bg-[#16244f] rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] text-slate-400">Fast</span>
          </div>
        </div>

        {/* Step Progress indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Step <strong className="text-white">{currentStepIndex}</strong> of{' '}
              {totalSteps > 0 ? totalSteps - 1 : 0}
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-24 h-1.5 bg-[#16244f] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-150"
              style={{
                width: `${
                  totalSteps > 1
                    ? Math.round((currentStepIndex / (totalSteps - 1)) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
