'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Play, Pause, RotateCcw } from 'lucide-react';

const BAR_COUNT = 50;

function generateArray(count) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
}

// ─── Sorting algorithms ───────────────────────────────────────────────────────
//
// Each algorithm is a generator function. Every yield gives the visualiser a
// snapshot of the current state. The step() function calls .next() once per
// tick, draws the frame, and plays a tone.
//
// Yield should look like this:
//   yield { array: a, comparing: [i, j] }
//
//   - array:     the current array
//   - comparing: indices to highlight in pink — usually the two bars you're
//                looking at right now. Can be a single index too, e.g. [i]
//   - swapped:   (optional) set true when you actually move a bar so the tone
//                plays. If you don't use swapped, a tone plays on every step instead.
//
// At the end, yield { array: a, comparing: [], done: true } to trigger the
// completion sweep.
//
// To add a new algorithm:
//   1. Write the generator function below (copy bubbleSort as a template)
//   2. Add it to the `algorithms` array further down — that's it

// Bottom-up iterative merge sort — merges increasingly large sorted chunks
// until the whole array is sorted. Easier to visualise than recursive because
// it always operates on the full array, never on slices.
function* mergeSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi  = Math.min(lo + 2 * width, n);

      // copy the two chunks we're about to merge
      const left  = a.slice(lo, mid);
      const right = a.slice(mid, hi);
      let i = 0, j = 0, k = lo;

      while (i < left.length && j < right.length) {
        yield { array: a, comparing: [lo + i, mid + j] };
        if (left[i] <= right[j]) {
          a[k++] = left[i++];
        } else {
          a[k++] = right[j++];
        }
        yield { array: a, comparing: [k - 1], swapped: true };
      }
      while (i < left.length) {
        a[k++] = left[i++];
        yield { array: a, comparing: [k - 1], swapped: true };
      }
      while (j < right.length) {
        a[k++] = right[j++];
        yield { array: a, comparing: [k - 1], swapped: true };
      }
    }
  }

  yield { array: a, comparing: [], done: true };
}

function* bubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: a, comparing: [j, j + 1] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        // swapped: true tells step() to play a tone on this frame
        yield { array: a, comparing: [j, j + 1], swapped: true };
      }
    }
  }
  yield { array: a, comparing: [], done: true };
}

function* radixSort(arr) {
  const a = [...arr];
  const max = Math.max(...a);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < a.length; i++) {
      const digit = Math.floor((a[i] / exp) % 10);
      buckets[digit].push(a[i]);
      // no swapped flag here — step() will play a tone on every yield instead
      yield { array: a, comparing: [i] };
    }
    let idx = 0;
    for (let b = 0; b < buckets.length; b++) {
      for (let j = 0; j < buckets[b].length; j++) {
        a[idx++] = buckets[b][j];
        yield { array: a, comparing: [idx - 1], swapped: true };
      }
    }
    exp *= 10;
  }
  yield { array: a, comparing: [], done: true };
}

// ─── Algorithm registry ───────────────────────────────────────────────────────
// Add new algorithms here. id must be unique, fn is the generator above.
const algorithms = [
  { id: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)', fn: bubbleSort },
  { id: 'radix',  label: 'Radix Sort',  complexity: 'O(nk)', fn: radixSort },
  { id: 'merge',  label: 'Merge Sort',  complexity: 'O(n log n)', fn: mergeSort },
];

export default function SortingPage() {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);  // created lazily on first play (browser autoplay policy)
  const timeoutRef = useRef(null);
  const generatorRef = useRef(null);
  const arrayRef = useRef(generateArray(BAR_COUNT));
  const comparingRef = useRef([]);
  const isDoneRef = useRef(false);
  const speedRef = useRef(20);  // mirrors speed state so the running loop always reads the latest value

  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [selectedAlgo, setSelectedAlgo] = useState('bubble');

  function drawBars(arr, comparing = [], done = false) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / arr.length;

    arr.forEach((val, i) => {
      const barHeight = (val / 100) * height;
      const x = Math.floor(i * barWidth);
      const y = Math.floor(height - barHeight);
      const w = Math.max(Math.floor(barWidth) - 1, 1);
      const h = Math.ceil(barHeight);

      if (done) {
        ctx.fillStyle = '#3EF47B';
      } else if (comparing.includes(i)) {
        ctx.fillStyle = '#FFC2C6';
      } else {
        ctx.fillStyle = '#20201d';
      }

      ctx.fillRect(x, y, w, h);
    });
  }

  // value is a bar height (10–100). Maps to a frequency between 150 and 1200 Hz.
  function playTone(value) {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150 + (value / 100) * 1050, ctx.currentTime);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  // Runs after sorting completes — sweeps left to right, flashing each bar and playing a tone (because it sounds nice)
  function finalSweep(arr) {
    let i = 0;

    function sweepStep() {
      if (i >= arr.length) {
        drawBars(arr, [], true);
        isDoneRef.current = true;
        setIsDone(true);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const barWidth = canvas.width / arr.length;

      drawBars(arr, [], true);

      const barHeight = (arr[i] / 100) * canvas.height;
      ctx.fillStyle = '#20201d';
      ctx.fillRect(
        Math.floor(i * barWidth),
        Math.floor(canvas.height - barHeight),
        Math.max(Math.floor(barWidth) - 1, 1),
        Math.ceil(barHeight)
      );

      playTone(arr[i]);
      i++;
      timeoutRef.current = setTimeout(sweepStep, 18);
    }

    sweepStep();
  }

  function step() {
    if (!generatorRef.current) return;

    const result = generatorRef.current.next();

    if (result.done || result.value?.done) {
      const arr = result.value?.array ?? arrayRef.current;
      arrayRef.current = arr;
      comparingRef.current = [];
      setIsRunning(false);
      finalSweep(arr);
      return;
    }

    const { array, comparing, swapped } = result.value;
    arrayRef.current = array;
    comparingRef.current = comparing;
    drawBars(array, comparing);

    // Play on explicit swaps (bubble sort), or on every step when the algorithm
    // doesn't use swapped (eg radix sort). Either way a tone fires each visible move.
    const shouldPlay = swapped !== undefined ? swapped : comparing.length > 0;
    if (shouldPlay) playTone(array[comparing[0]]);

    timeoutRef.current = setTimeout(step, speedRef.current);
  }

  function handleStart() {
    if (isDoneRef.current) return;
    if (!generatorRef.current) {
      const algo = algorithms.find(a => a.id === selectedAlgo);
      generatorRef.current = algo.fn(arrayRef.current);
    }
    setIsRunning(true);
    step();
  }

  function handleSelectAlgo(id) {
    if (isRunning) return;
    setSelectedAlgo(id);
    clearTimeout(timeoutRef.current);
    generatorRef.current = null;
    isDoneRef.current = false;
    const newArr = generateArray(BAR_COUNT);
    arrayRef.current = newArr;
    comparingRef.current = [];
    setIsDone(false);
    drawBars(newArr);
  }

  function handlePause() {
    clearTimeout(timeoutRef.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearTimeout(timeoutRef.current);
    generatorRef.current = null;
    isDoneRef.current = false;
    const newArr = generateArray(BAR_COUNT);
    arrayRef.current = newArr;
    comparingRef.current = [];
    setIsRunning(false);
    setIsDone(false);
    drawBars(newArr);
  }

  function handleSpeedChange(e) {
    const val = 151 - Number(e.target.value);
    setSpeed(val);
    speedRef.current = val;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawBars(arrayRef.current, comparingRef.current, isDoneRef.current);
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background-primary px-6 pb-16 pt-12"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <Link href="/">
            <button className="flex items-center gap-2 text-text-dark opacity-60 hover:opacity-100 transition-opacity text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-dark mb-1">Sorting Visualiser</h1>
          <p className="text-text-muted text-sm">
            {algorithms.find(a => a.id === selectedAlgo)?.label} — {algorithms.find(a => a.id === selectedAlgo)?.complexity}
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          {algorithms.map(algo => (
            <button
              key={algo.id}
              onClick={() => handleSelectAlgo(algo.id)}
              disabled={isRunning}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors disabled:cursor-not-allowed ${
                selectedAlgo === algo.id
                  ? 'bg-accent-primary text-almost-black font-medium'
                  : 'text-text-dark hover:text-text-light'
              }`}
              style={selectedAlgo !== algo.id ? { border: '1px solid rgba(248, 248, 248, 0.12)' } : {}}
            >
              {algo.label}
            </button>
          ))}
        </div>

        <div
          className="w-full rounded-2xl overflow-hidden mb-6"
          style={{ height: '340px', border: '1px solid rgba(248, 248, 248, 0.08)' }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-almost-black text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Pause size={14} />
              Pause
            </button>
          ) : (
            <button
              onClick={handleStart}
              disabled={isDone}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-almost-black text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Play size={14} />
              {isDone ? 'Done' : 'Sort'}
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-text-dark text-sm hover:bg-white/5 transition-colors"
            style={{ border: '1px solid rgba(248, 248, 248, 0.15)' }}
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-text-muted text-sm">Slow</span>
            <input
              type="range"
              min={1}
              max={150}
              value={151 - speed}
              onChange={handleSpeedChange}
              className="w-28 accent-accent-primary cursor-pointer"
            />
            <span className="text-text-muted text-sm">Fast</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
