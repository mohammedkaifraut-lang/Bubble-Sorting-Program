/**
 * Bubble Sort Visualizer - Main Application Component
 *
 * Implements a step-by-step interactive Bubble Sort algorithm simulator
 * featuring customizable inputs (5 to 7 numbers), Framer Motion layout animations,
 * color-coded comparison/swap/sorted states, step-by-step logs, speed slider,
 * light/dark theme toggle, and time complexity educational explanations.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { VisualizationBars } from './components/VisualizationBars.tsx';
import { Controls } from './components/Controls.tsx';
import { StepLog } from './components/StepLog.tsx';
import { ResultCard } from './components/ResultCard.tsx';
import { AlgorithmInfo } from './components/AlgorithmInfo.tsx';
import {
  validateInput,
  generateRandomNumbers,
  generateBubbleSortSteps,
} from './utils/bubbleSort.ts';
import { SortStep } from './types.ts';

export default function App() {
  // Theme state: default to dark navy theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bubble-sort-theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark navy
    }
    return true;
  });

  // Sync theme class to document root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('bubble-sort-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bubble-sort-theme', 'light');
    }
  }, [isDark]);

  // Input & validation state
  // Default with the user's example: 5, 3, 8, 1, 9
  const [inputText, setInputText] = useState<string>('5, 3, 8, 1, 9');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedNumbers, setParsedNumbers] = useState<number[]>([5, 3, 8, 1, 9]);

  // Precomputed discrete sorting simulation steps
  const [steps, setSteps] = useState<SortStep[]>(() =>
    generateBubbleSortSteps([5, 3, 8, 1, 9])
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Playback & speed controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(650); // delay between steps in ms

  // Timer reference for playback animation loop
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Updates input and re-evaluates validation and step sequences
   */
  const handleInputChange = useCallback((text: string) => {
    setInputText(text);
    setIsPlaying(false);

    const validation = validateInput(text);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
    } else {
      setErrorMessage(null);
      setParsedNumbers(validation.numbers);
      const newSteps = generateBubbleSortSteps(validation.numbers);
      setSteps(newSteps);
      setCurrentStepIndex(0);
    }
  }, []);

  /**
   * Generates 5 to 7 random numbers between 1 and 99
   */
  const handleRandomClick = useCallback(() => {
    setIsPlaying(false);
    const randomNums = generateRandomNumbers();
    const text = randomNums.join(', ');
    setInputText(text);
    setErrorMessage(null);
    setParsedNumbers(randomNums);
    const newSteps = generateBubbleSortSteps(randomNums);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, []);

  /**
   * Resets simulation back to initial array state
   */
  const handleResetClick = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStepIndex(0);
  }, []);

  /**
   * Sort / Pause / Resume / Replay handler
   */
  const handleSortClick = useCallback(() => {
    if (errorMessage) return;

    if (isPlaying) {
      // Pause
      setIsPlaying(false);
    } else {
      // If at end, reset to beginning first
      if (currentStepIndex >= steps.length - 1) {
        setCurrentStepIndex(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStepIndex, steps.length, errorMessage]);

  /**
   * Single step forward (Step-by-step mode)
   */
  const handleNextStepClick = useCallback(() => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, steps.length]);

  /**
   * Single step backward
   */
  const handlePrevStepClick = useCallback(() => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  /**
   * Jump to specific step selected from the log
   */
  const handleSelectStep = useCallback((index: number) => {
    setIsPlaying(false);
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  }, [steps.length]);

  /**
   * Playback animation loop
   */
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  // Current active step snapshot
  const currentStep = steps[currentStepIndex] || steps[0];
  const isFinished = currentStepIndex >= steps.length - 1;

  // Final sorted numbers
  const sortedNumbers = steps.length > 0 ? steps[steps.length - 1].array.map((x) => x.val) : [];

  const scrollToExplanation = () => {
    const el = document.getElementById('algorithm-info');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-amber-400 selection:text-amber-950">
      {/* Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onScrollToExplanation={scrollToExplanation}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Controls Panel (Input, Buttons, Speed, Stepping) */}
        <Controls
          inputText={inputText}
          onInputChange={handleInputChange}
          errorMessage={errorMessage}
          isPlaying={isPlaying}
          isFinished={isFinished}
          canStepForward={currentStepIndex < steps.length - 1}
          canStepBack={currentStepIndex > 0}
          speedMs={speedMs}
          onSpeedChange={setSpeedMs}
          onSortClick={handleSortClick}
          onResetClick={handleResetClick}
          onRandomClick={handleRandomClick}
          onNextStepClick={handleNextStepClick}
          onPrevStepClick={handlePrevStepClick}
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
        />

        {/* Live Visualization Bars Stage */}
        <VisualizationBars
          currentStep={currentStep}
          totalElements={parsedNumbers.length}
        />

        {/* Sorting Complete Result Summary Card */}
        {isFinished && (
          <ResultCard
            sortedArray={sortedNumbers}
            initialArray={parsedNumbers}
            totalComparisons={currentStep.comparisonsSoFar}
            totalSwaps={currentStep.swapsSoFar}
            totalPasses={currentStep.pass}
            onReplay={handleResetClick}
            onNewRandom={handleRandomClick}
          />
        )}

        {/* Step-by-Step Log Feed */}
        <StepLog
          steps={steps}
          currentStepIndex={currentStepIndex}
          onSelectStep={handleSelectStep}
        />

        {/* Educational Algorithm Explanation & Complexity Guide */}
        <AlgorithmInfo currentPseudocodeLine={currentStep.pseudocodeLine} />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#1a2850] py-6 text-center text-xs text-slate-400">
        <p>
          Bubble Sort Algorithm Visualizer · Built with React, Tailwind CSS & Motion
        </p>
      </footer>
    </div>
  );
}
