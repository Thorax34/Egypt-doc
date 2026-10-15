import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';
import {FONT} from '../fonts';

/** Animated label pill that pops in at frame `at` (scene-local). Optional second line. */
export const Label: React.FC<{
  x: number;
  y: number;
  text: string;
  sub?: string;
  at: number;
  color?: string;
  textColor?: string;
}> = ({x, y, text, sub, at, color = C.linen, textColor = C.ink}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 11, stiffness: 140}});
  const w = Math.max(text.length * 21, (sub?.length ?? 0) * 13) + 60;
  const h = sub ? 96 : 64;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2.4} fill={color} stroke={C.ink} strokeWidth={4} />
      <text textAnchor="middle" y={sub ? -6 : 11} fontFamily={FONT} fontWeight={700} fontSize={34} fill={textColor}>
        {text}
      </text>
      {sub && (
        <text textAnchor="middle" y={28} fontFamily={FONT} fontWeight={500} fontSize={24} fill={textColor} opacity={0.9}>
          {sub}
        </text>
      )}
    </g>
  );
};
