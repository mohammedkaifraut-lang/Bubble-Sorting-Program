/**
 * Core type definitions for Bubble Sort Visualizer
 */

export interface ArrayItem {
  /** Unique ID to allow motion/react layout animations to track element transitions */
  id: string;
  /** Numerical value of the element */
  val: number;
}

export type StepType = 
  | 'INIT'          // Initial starting state
  | 'COMPARE'       // Comparing two adjacent elements at j and j+1
  | 'SWAP'          // Swapping the two elements because arr[j] > arr[j+1]
  | 'PASS_SUMMARY'  // Completed a pass; largest remaining element is locked into final place
  | 'FINISHED';     // Entire array is fully sorted

export interface SortStep {
  /** Sequential step index (0-based) */
  id: number;
  /** Type of action at this step */
  type: StepType;
  /** 1-based pass number */
  pass: number;
  /** Snapshot of the array elements at this point in time */
  array: ArrayItem[];
  /** Pair of indices currently being compared (highlighted in yellow), or null */
  comparingIndices: [number, number] | null;
  /** Pair of indices that were just swapped, or null */
  swappedIndices: [number, number] | null;
  /** Indices that are permanently locked in their sorted positions (highlighted in green) */
  sortedIndices: number[];
  /** Descriptive log text (e.g. "Pass 1: compare 5 and 3 → swap → [3, 5, 8, 1, 9]") */
  description: string;
  /** Concise string representation of the array (e.g. "[3, 5, 8, 1, 9]") */
  arrayString: string;
  /** Cumulative number of comparisons made up to this step */
  comparisonsSoFar: number;
  /** Cumulative number of swaps made up to this step */
  swapsSoFar: number;
  /** Whether this step marks the completion of a pass */
  isPassEnd?: boolean;
  /** Line number in standard Bubble Sort pseudocode (1-indexed) */
  pseudocodeLine?: number;
}

export interface SortStats {
  totalComparisons: number;
  totalSwaps: number;
  totalPasses: number;
  initialArray: number[];
  sortedArray: number[];
}
