import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, W} from '../theme';
import {wavePath} from '../lib/anim';

/** Animated Nile band: layered moving waves and glints. */
export const River: React.FC<{y: number; height: number}> = ({y, height}) => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect y={y} width={W} height={height} fill={C.nile} />
      <path d={wavePath(W, y + height * 0.35, 7, 220, f / 90, height * 0.65)} fill={C.nileDark} opacity={0.5} />
      <path d={wavePath(W, y + height * 0.62, 8, 170, -f / 70 + 0.3, height * 0.4)} fill={C.nileDark} opacity={0.55} />
      {Array.from({length: 9}, (_, i) => {
        const x = ((i * 260 + f * 3) % (W + 200)) - 100;
        const yy = y + height * (0.2 + ((i * 37) % 60) / 100);
        return <ellipse key={i} cx={x} cy={yy} rx={34} ry={4} fill={C.nileLight} opacity={0.8} />;
      })}
      <path d={wavePath(W, y, 5, 200, f / 80, 6)} fill={C.nileLight} />
    </g>
  );
};
