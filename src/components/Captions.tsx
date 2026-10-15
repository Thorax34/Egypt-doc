import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {FONT} from '../fonts';
import type {CaptionChunk} from '../lib/timing';

/** Burned-in captions, timed from planTimeline(). Always on top of the scenes. */
export const Captions: React.FC<{chunks: CaptionChunk[]}> = ({chunks}) => {
  const frame = useCurrentFrame();
  const c = chunks.find((ch) => frame >= ch.start && frame < ch.end);
  if (!c) return null;
  const local = frame - c.start;
  const opacity = interpolate(local, [0, 4], [0, 1], {extrapolateRight: 'clamp'});
  const lift = interpolate(local, [0, 6], [12, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 64}}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 1.15,
          color: C.linen,
          background: 'rgba(43,27,18,0.82)',
          padding: '14px 38px',
          borderRadius: 30,
          maxWidth: 1500,
          textAlign: 'center',
          opacity,
          transform: `translateY(${lift}px)`,
        }}
      >
        {c.text}
      </div>
    </AbsoluteFill>
  );
};
