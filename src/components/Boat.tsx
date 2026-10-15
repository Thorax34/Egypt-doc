import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

/** Simplified Nile sailing boat with a square sail. */
export const Boat: React.FC<{x: number; y: number; scale?: number; flip?: boolean}> = ({
  x,
  y,
  scale = 1,
  flip = false,
}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 18) * 5;
  const rot = Math.sin(f / 24) * 2;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${flip ? -scale : scale} ${scale}) rotate(${rot})`}>
      <line x1={0} y1={-6} x2={0} y2={-160} stroke={C.mud} strokeWidth={7} strokeLinecap="round" />
      <rect x={-64} y={-155} width={128} height={86} rx={6} fill={C.linen} stroke={C.mud} strokeWidth={4} />
      <rect x={-64} y={-125} width={128} height={14} fill={C.red} />
      <path
        d="M-125,-34 Q-92,40 0,44 Q92,40 125,-34 Q82,-12 0,-8 Q-82,-12 -125,-34 Z"
        fill="#B9803A"
        stroke={C.mud}
        strokeWidth={4}
      />
    </g>
  );
};
