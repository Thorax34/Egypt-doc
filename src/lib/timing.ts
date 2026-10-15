import type {Segment} from '../script/prototype';

export type CaptionChunk = {text: string; start: number; end: number};

export type ScenePlan = {
  id: string;
  scene: Segment['scene'];
  /** Frame where this scene's narration begins (global timeline). */
  start: number;
  /** Frames of narration belonging to this scene. */
  slot: number;
  /** Frames the scene must last inside <TransitionSeries> (slot + overlap). */
  duration: number;
};

export type Plan = {
  scenes: ScenePlan[];
  chunks: CaptionChunk[];
  transition: number;
  totalFrames: number;
};

export const wordsOf = (t: string): string[] => t.trim().split(/\s+/).filter(Boolean);

const MAX_CAPTION_WORDS = 6;

/**
 * Turns the script + real audio length into scene lengths and caption timings.
 *
 * Without exact timestamps, each segment gets a share of the audio proportional to its word
 * count. That is an ESTIMATE: it drifts when the narrator pauses a lot. For exact sync, pass
 * `boundariesSec` (n+1 numbers: start of each segment, then the audio end) taken from a
 * transcript with word timestamps (see README, "Exact sync").
 */
export const planTimeline = (
  segments: Segment[],
  audioFrames: number,
  tailFrames: number,
  fps: number,
  transitionFrames = 15,
  boundariesSec?: number[],
): Plan => {
  const n = segments.length;
  const wc = segments.map((s) => wordsOf(s.text).length);
  const totalWords = wc.reduce((a, b) => a + b, 0);

  let b: number[];
  if (boundariesSec && boundariesSec.length === n + 1) {
    b = boundariesSec.map((s) => Math.round(s * fps));
    b[0] = 0;
    b[n] = audioFrames;
    for (let i = 1; i <= n; i++) b[i] = Math.max(b[i], b[i - 1] + 1);
  } else {
    b = [0];
    let cum = 0;
    for (let i = 0; i < n; i++) {
      cum += wc[i];
      b.push(Math.round((audioFrames * cum) / totalWords));
    }
  }

  const slots = segments.map((_, i) => b[i + 1] - b[i]);
  slots[n - 1] += tailFrames;

  // A transition must be shorter than both neighbouring scenes.
  const minSlot = Math.min(...slots);
  const transition = Math.max(1, Math.min(transitionFrames, Math.floor(minSlot / 2)));

  const scenes: ScenePlan[] = segments.map((s, i) => ({
    id: s.id,
    scene: s.scene,
    start: b[i],
    slot: slots[i],
    duration: slots[i] + (i < n - 1 ? transition : 0),
  }));

  // Captions: split each segment into sentences, then balanced chunks of <= 6 words,
  // timed by word share inside the segment's narration slot.
  const chunks: CaptionChunk[] = [];
  segments.forEach((s, i) => {
    const words = wordsOf(s.text);
    const speechSlot = b[i + 1] - b[i];
    let used = 0;
    const sentences = s.text.split(/(?<=[.!?])\s+/).filter(Boolean);
    for (const sentence of sentences) {
      const sw = wordsOf(sentence);
      const nChunks = Math.ceil(sw.length / MAX_CAPTION_WORDS);
      const base = Math.floor(sw.length / nChunks);
      const extra = sw.length % nChunks;
      let idx = 0;
      for (let c = 0; c < nChunks; c++) {
        const size = base + (c < extra ? 1 : 0);
        const start = b[i] + Math.round((speechSlot * used) / words.length);
        used += size;
        const end = b[i] + Math.round((speechSlot * used) / words.length);
        chunks.push({text: sw.slice(idx, idx + size).join(' '), start, end});
        idx += size;
      }
    }
  });

  return {scenes, chunks, transition, totalFrames: audioFrames + tailFrames};
};
