import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

export const Palm: React.FC<{x: number; y: number; scale?: number; phase?: number}> = ({
  x,
  y,
  scale = 1,
  phase = 0,
}) => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 40 + phase) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-10,0 Q-4,-120 6,-250 L22,-250 Q10,-120 14,0 Z" fill={C.mud} />
      <g transform="translate(14 -250)">
        {[-190, -155, -120, -90, -60, -25, 10].map((a, i) => (
          <ellipse
            key={a}
            cx={80}
            cy={0}
            rx={84}
            ry={17}
            fill={i % 2 ? C.papyrus : C.papyrusDark}
            transform={`rotate(${a + sway})`}
          />
        ))}
      </g>
    </g>
  );
};

/** Papyrus reeds along the river bank. */
export const Reeds: React.FC<{x: number; y: number; count?: number; scale?: number}> = ({
  x,
  y,
  count = 7,
  scale = 1,
}) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {Array.from({length: count}, (_, i) => {
        const h = 110 + ((i * 53) % 70);
        const lean = Math.sin(f / 35 + i) * 6 + (i - count / 2) * 7;
        const bx = i * 16 - count * 8;
        return (
          <g key={i}>
            <path
              d={`M${bx} 0 Q ${bx + lean / 2} ${-h / 2} ${bx + lean} ${-h}`}
              stroke={C.papyrusDark}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={bx + lean} cy={-h - 4} r={9} fill={C.papyrus} />
          </g>
        );
      })}
    </g>
  );
};
