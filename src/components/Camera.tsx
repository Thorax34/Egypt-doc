import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {H, W} from '../theme';
import {ease, lerp} from '../lib/anim';

export type View = {x: number; y: number; scale: number};

/**
 * SVG camera: slowly pans/zooms across the whole scene.
 * (x, y) is the point in the 1920x1080 world that ends up centred on screen.
 * Keep scale >= 1 and x/y inside [W/2s, W-W/2s] so the edges never show.
 */
export const Camera: React.FC<{from: View; to: View; children: React.ReactNode}> = ({
  from,
  to,
  children,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = ease(Math.min(1, Math.max(0, frame / Math.max(1, durationInFrames - 1))));
  const s = lerp(from.scale, to.scale, t);
  const x = lerp(from.x, to.x, t);
  const y = lerp(from.y, to.y, t);
  return <g transform={`translate(${W / 2 - x * s} ${H / 2 - y * s}) scale(${s})`}>{children}</g>;
};
