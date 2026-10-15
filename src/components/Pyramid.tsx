import React from 'react';
import {C} from '../theme';

/** Simple pyramid. (x, y) = centre of the base; w = base width; h = height. */
export const Pyramid: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => (
  <g>
    <polygon points={`${x - w / 2},${y} ${x},${y - h} ${x},${y}`} fill={C.stone} />
    <polygon points={`${x},${y - h} ${x + w / 2},${y} ${x},${y}`} fill={C.stoneShade} />
    {Array.from({length: 6}, (_, k) => {
      const yy = y - (h * (k + 1)) / 7;
      const hw = (w / 2) * (1 - (k + 1) / 7);
      return <line key={k} x1={x - hw} y1={yy} x2={x + hw} y2={yy} stroke="#00000022" strokeWidth={3} />;
    })}
  </g>
);
