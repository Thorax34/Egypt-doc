import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, H, W} from '../theme';
import {useUid} from '../lib/anim';

export const Sky: React.FC<{
  top?: string;
  bottom?: string;
  sunX?: number;
  sunY?: number;
  sunColor?: string;
  clouds?: boolean;
}> = ({top = C.skyTop, bottom = C.skyBottom, sunX = 1560, sunY = 210, sunColor = C.sun, clouds = true}) => {
  const f = useCurrentFrame();
  const id = useUid('sky');
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      <g transform={`translate(${sunX} ${sunY})`}>
        <g transform={`rotate(${f * 0.3})`}>
          {Array.from({length: 16}, (_, i) => (
            <polygon
              key={i}
              points="-14,-120 14,-120 0,-170"
              fill={sunColor}
              opacity={0.55}
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
        <circle r={84} fill={sunColor} />
      </g>
      {clouds &&
        [0, 1, 2].map((i) => {
          const x = ((i * 700 + f * (0.6 + i * 0.25)) % (W + 500)) - 250;
          return (
            <g key={i} transform={`translate(${x} ${120 + i * 70})`} opacity={0.9}>
              <ellipse rx={90} ry={30} fill="#fff" />
              <ellipse cx={-50} cy={8} rx={60} ry={24} fill="#fff" />
              <ellipse cx={55} cy={10} rx={64} ry={24} fill="#fff" />
            </g>
          );
        })}
    </g>
  );
};
