import {Easing, interpolate} from 'remotion';
import {useId} from 'react';

export const ease = Easing.bezier(0.45, 0, 0.25, 1);

/** Clamped, eased interpolation: tween(x, fromValue, toValue, x0, x1). */
export const tween = (x: number, from: number, to: number, x0: number, x1: number): number =>
  interpolate(x, [x0, x1], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Wavy filled band: the wave line sits at `base`, fill extends `depth` px below it. */
export const wavePath = (
  width: number,
  base: number,
  amp: number,
  len: number,
  phase: number,
  depth: number,
): string => {
  const pts: string[] = [];
  for (let x = 0; x <= width + 20; x += 20) {
    const y = base + amp * Math.sin((x / len + phase) * Math.PI * 2);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} L ${width + 20} ${base + depth} L 0 ${base + depth} Z`;
};

/** Safe unique id for SVG gradients/clip paths. */
export const useUid = (prefix: string): string => prefix + useId().replace(/[^a-zA-Z0-9]/g, '');
