/**
 * Bubble Sort Algorithm Engine & Step Generator
 *
 * Bubble Sort works by repeatedly stepping through the list, comparing
 * adjacent elements and swapping them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 */

import { ArrayItem, SortStep } from '../types.ts';

export interface ValidationResult {
  isValid: boolean;
  numbers: number[];
  errorMessage: string | null;
}

/**
 * Validates user text input:
 * - Accepts 5 to 7 numbers separated by commas and/or spaces.
 * - Confirms that all tokens are valid numeric values.
 * - Returns detailed error message if validation fails.
 */
export function validateInput(text: string): ValidationResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: 'Please enter 5 to 7 numbers separated by commas or spaces.',
    };
  }

  // Split by commas, whitespace, or combination of both
  const tokens = trimmed.split(/[\s,]+/).filter(Boolean);

  if (tokens.length < 5) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: `Too few numbers: Please enter at least 5 numbers (you entered ${tokens.length}).`,
    };
  }

  if (tokens.length > 7) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: `Too many numbers: Please enter at most 7 numbers (you entered ${tokens.length}).`,
    };
  }

  const numbers: number[] = [];
  for (const token of tokens) {
    // Check if token is a valid number
    const num = Number(token);
    if (isNaN(num)) {
      return {
        isValid: false,
        numbers: [],
        errorMessage: `"${token}" is not a valid number. Please enter only numbers separated by commas or spaces.`,
      };
    }
    // Limit to reasonable display integers or decimals
    if (!Number.isFinite(num)) {
      return {
        isValid: false,
        numbers: [],
        errorMessage: `"${token}" is infinite or out of range.`,
      };
    }
    numbers.push(num);
  }

  return {
    isValid: true,
    numbers,
    errorMessage: null,
  };
}

/**
 * Generates 5 to 7 random integers between 1 and 99
 */
export function generateRandomNumbers(): number[] {
  // Pick random count between 5 and 7
  const count = Math.floor(Math.random() * 3) + 5; // 5, 6, or 7
  const numbers: number[] = [];

  while (numbers.length < count) {
    // Generate random number between 1 and 99
    const val = Math.floor(Math.random() * 99) + 1;
    // Prefer distinct numbers for clearer sorting visualization, but duplicates are valid too
    if (!numbers.includes(val) || numbers.length >= count - 1) {
      numbers.push(val);
    }
  }

  return numbers;
}

/**
 * Precomputes all discrete visualization steps for Bubble Sort.
 *
 * Each step captures:
 * 1. An immutable snapshot of the array with unique IDs (so Framer Motion can smoothly animate swaps)
 * 2. Active comparison indices (highlighted in yellow)
 * 3. Swap state and new ordering
 * 4. Locked sorted indices (highlighted in green as passes complete)
 * 5. Log string formatted to match requirements (e.g. "Pass 1: compare 5 and 3 → swap → [3, 5, 8, 1, 9]")
 */
export function generateBubbleSortSteps(initialNumbers: number[]): SortStep[] {
  // Give each initial element a unique stable ID based on original index and value
  const workingArray: ArrayItem[] = initialNumbers.map((val, idx) => ({
    id: `item-${idx}-${val}`,
    val,
  }));

  const steps: SortStep[] = [];
  const n = workingArray.length;
  const sortedSet = new Set<number>();

  let comparisons = 0;
  let swaps = 0;

  // Initial Step 0: Ready
  steps.push({
    id: 0,
    type: 'INIT',
    pass: 0,
    array: workingArray.map((item) => ({ ...item })),
    comparingIndices: null,
    swappedIndices: null,
    sortedIndices: [],
    description: `Initial array ready: [${workingArray.map((x) => x.val).join(', ')}]. Click "Sort" or "Next step" to begin.`,
    arrayString: `[${workingArray.map((x) => x.val).join(', ')}]`,
    comparisonsSoFar: 0,
    swapsSoFar: 0,
    pseudocodeLine: 1,
  });

  // Bubble Sort Outer Loop
  for (let i = 0; i < n - 1; i++) {
    const passNum = i + 1;
    let swappedInThisPass = false;

    // Inner Loop: compare adjacent pairs from index 0 to n - 1 - i
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const valA = workingArray[j].val;
      const valB = workingArray[j + 1].val;
      const needsSwap = valA > valB;

      // STEP: COMPARE (yellow highlight on j and j+1)
      const compareDesc = needsSwap
        ? `Pass ${passNum}: compare ${valA} and ${valB} → swap → [${workingArray.map((x) => x.val).join(', ')}]`
        : `Pass ${passNum}: compare ${valA} and ${valB} → no swap → [${workingArray.map((x) => x.val).join(', ')}]`;

      steps.push({
        id: steps.length,
        type: 'COMPARE',
        pass: passNum,
        array: workingArray.map((item) => ({ ...item })),
        comparingIndices: [j, j + 1],
        swappedIndices: null,
        sortedIndices: Array.from(sortedSet),
        description: compareDesc,
        arrayString: `[${workingArray.map((x) => x.val).join(', ')}]`,
        comparisonsSoFar: comparisons,
        swapsSoFar: swaps,
        pseudocodeLine: 3,
      });

      if (needsSwap) {
        swaps++;
        swappedInThisPass = true;

        // Perform swap in working array
        const temp = workingArray[j];
        workingArray[j] = workingArray[j + 1];
        workingArray[j + 1] = temp;

        const newArrayStr = `[${workingArray.map((x) => x.val).join(', ')}]`;
        const swapDesc = `Pass ${passNum}: compare ${valA} and ${valB} → swap → ${newArrayStr}`;

        // STEP: SWAP (elements animated to new positions)
        steps.push({
          id: steps.length,
          type: 'SWAP',
          pass: passNum,
          array: workingArray.map((item) => ({ ...item })),
          comparingIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: Array.from(sortedSet),
          description: swapDesc,
          arrayString: newArrayStr,
          comparisonsSoFar: comparisons,
          swapsSoFar: swaps,
          pseudocodeLine: 4,
        });
      }
    }

    // At the end of each pass, the element at (n - 1 - i) is guaranteed in its final sorted position!
    const lockedIndex = n - 1 - i;
    sortedSet.add(lockedIndex);

    // Check early termination: if no swaps occurred, the rest of the array is already sorted
    if (!swappedInThisPass) {
      for (let k = 0; k < n; k++) {
        sortedSet.add(k);
      }

      steps.push({
        id: steps.length,
        type: 'PASS_SUMMARY',
        pass: passNum,
        array: workingArray.map((item) => ({ ...item })),
        comparingIndices: null,
        swappedIndices: null,
        sortedIndices: Array.from(sortedSet),
        description: `Pass ${passNum} complete: Array after pass: [${workingArray.map((x) => x.val).join(', ')}] (No swaps needed - early termination!)`,
        arrayString: `[${workingArray.map((x) => x.val).join(', ')}]`,
        comparisonsSoFar: comparisons,
        swapsSoFar: swaps,
        isPassEnd: true,
        pseudocodeLine: 6,
      });
      break;
    } else {
      // Normal pass completion
      if (i === n - 2) {
        // If second to last element is placed, index 0 is also locked
        sortedSet.add(0);
      }

      const lockedVal = workingArray[lockedIndex].val;
      steps.push({
        id: steps.length,
        type: 'PASS_SUMMARY',
        pass: passNum,
        array: workingArray.map((item) => ({ ...item })),
        comparingIndices: null,
        swappedIndices: null,
        sortedIndices: Array.from(sortedSet),
        description: `Pass ${passNum} complete: Array after pass: [${workingArray.map((x) => x.val).join(', ')}] (${lockedVal} locked in sorted position)`,
        arrayString: `[${workingArray.map((x) => x.val).join(', ')}]`,
        comparisonsSoFar: comparisons,
        swapsSoFar: swaps,
        isPassEnd: true,
        pseudocodeLine: 5,
      });
    }
  }

  // Ensure all indices are marked sorted at conclusion
  for (let k = 0; k < n; k++) {
    sortedSet.add(k);
  }

  // Final Step: SORTED
  steps.push({
    id: steps.length,
    type: 'FINISHED',
    pass: steps.length > 0 ? steps[steps.length - 1].pass : 0,
    array: workingArray.map((item) => ({ ...item })),
    comparingIndices: null,
    swappedIndices: null,
    sortedIndices: Array.from(sortedSet),
    description: `Sorted array: [${workingArray.map((x) => x.val).join(', ')}] — ${comparisons} comparisons, ${swaps} swaps.`,
    arrayString: `[${workingArray.map((x) => x.val).join(', ')}]`,
    comparisonsSoFar: comparisons,
    swapsSoFar: swaps,
    isPassEnd: true,
    pseudocodeLine: 7,
  });

  return steps;
}
