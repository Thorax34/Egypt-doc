import React from 'react';
import {C} from '../theme';

export type Head = 'bare' | 'nemes' | 'white' | 'red' | 'double';

/**
 * Cartoon figure. Origin (x, y) = centre of the feet; about 300 units tall with crown.
 * Faces right; use flip to face left. `walk` is an angle in radians (pass frame * 0.3).
 * Crowns are SIMPLIFIED symbols, not reconstructions.
 */
export const Person: React.FC<{
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  head?: Head;
  cloth?: string;
  tool?: 'none' | 'hoe' | 'staff';
  walk?: number;
  skin?: string;
}> = ({x, y, scale = 1, flip = false, head = 'bare', cloth = C.linen, tool = 'none', walk = 0, skin = C.skin}) => {
  const sw = Math.sin(walk) * 20;
  const arm = {stroke: skin, strokeWidth: 13, strokeLinecap: 'round' as const};
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <g transform={`rotate(${sw} -22 -130)`}>
        <line x1={-22} y1={-130} x2={-24} y2={-72} {...arm} />
      </g>
      <g transform={`rotate(${-sw} 0 -68)`}>
        <rect x={-16} y={-68} width={13} height={68} rx={6} fill={skin} />
      </g>
      <g transform={`rotate(${sw} 0 -68)`}>
        <rect x={3} y={-68} width={13} height={68} rx={6} fill={skin} />
      </g>
      <rect x={-26} y={-142} width={52} height={78} rx={12} fill={skin} />
      <path d="M-30,-72 L30,-72 L38,-22 L-38,-22 Z" fill={cloth} stroke={C.sandDark} strokeWidth={2} />
      <rect x={-30} y={-76} width={60} height={9} fill={C.gold} />

      {head === 'nemes' && (
        <g>
          <path
            d="M-36,-178 Q-36,-214 0,-212 Q36,-214 36,-178 L40,-120 L24,-120 L24,-160 L-24,-160 L-24,-120 L-40,-120 Z"
            fill={C.lapis}
          />
          <path d="M-36,-192 Q0,-208 36,-192" stroke={C.gold} strokeWidth={5} fill="none" />
        </g>
      )}
      <circle cx={0} cy={-172} r={31} fill={skin} />
      <circle cx={13} cy={-176} r={4.5} fill={C.ink} />
      <line x1={6} y1={-176} x2={26} y2={-181} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M8,-160 Q16,-154 24,-160" stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
      {head === 'bare' && (
        <path d="M-31,-176 Q-31,-208 0,-206 Q31,-208 31,-180 Q20,-192 0,-192 Q-20,-192 -31,-176Z" fill={C.ink} />
      )}
      {head === 'white' && (
        <path d="M-18,-196 L-13,-262 Q0,-296 13,-262 L18,-196 Z" fill={C.linen} stroke={C.sandDark} strokeWidth={3} />
      )}
      {head === 'red' && (
        <g>
          <path
            d="M-26,-196 L-26,-268 L-6,-268 L-6,-228 L26,-228 L26,-196 Z"
            fill={C.red}
            stroke={C.redDark}
            strokeWidth={3}
          />
          <path d="M-6,-268 Q6,-300 26,-270" fill="none" stroke={C.redDark} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {head === 'double' && (
        <g>
          <path d="M-26,-196 L-26,-232 L26,-232 L26,-196 Z" fill={C.red} stroke={C.redDark} strokeWidth={3} />
          <path d="M-14,-230 L-11,-270 Q0,-300 11,-270 L14,-230 Z" fill={C.linen} stroke={C.sandDark} strokeWidth={3} />
          <path d="M12,-232 Q26,-262 38,-240" fill="none" stroke={C.redDark} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}

      <g transform={`rotate(${-sw} 22 -130)`}>
        <line x1={22} y1={-130} x2={30} y2={-72} {...arm} />
        {tool === 'hoe' && (
          <g>
            <line x1={30} y1={-72} x2={78} y2={-150} stroke={C.mud} strokeWidth={8} strokeLinecap="round" />
            <path d="M70,-158 L98,-142 L80,-128 Z" fill={C.mud} />
          </g>
        )}
        {tool === 'staff' && <line x1={34} y1={-72} x2={34} y2={-232} stroke={C.gold} strokeWidth={8} strokeLinecap="round" />}
      </g>
    </g>
  );
};
