import React from 'react';
import {C} from '../theme';
import {FONT} from '../fonts';

const MAIN = 'M450,880 C430,780 480,700 460,600 C440,500 470,420 450,330';
const BRANCHES = [
  'M450,330 C420,260 360,200 340,140',
  'M450,330 C450,260 450,200 450,128',
  'M450,330 C480,260 540,200 570,140',
];

/**
 * Stylised map panel (900x900, north up). NOT to scale and NOT geographically exact.
 *  draw    0..1  river draws itself from south to north
 *  regions 0..1  fades in Upper (south) and Lower (north, the delta) Egypt tints
 *  unite   0..1  both tints become one gold kingdom
 */
export const NileMap: React.FC<{draw: number; regions?: number; unite?: number}> = ({
  draw,
  regions = 0,
  unite = 0,
}) => {
  const sep = regions * (1 - unite);
  const mainDraw = Math.min(1, draw / 0.65);
  const branchDraw = Math.min(1, Math.max(0, (draw - 0.65) / 0.35));
  const txt = {fontFamily: FONT, fontWeight: 700, fill: C.ink} as const;
  return (
    <g>
      <rect width={900} height={900} rx={36} fill={C.sand} stroke={C.mud} strokeWidth={8} />
      <path d="M0,40 Q0,0 40,0 H860 Q900,0 900,40 V110 Q700,150 450,125 Q250,105 0,140 Z" fill={C.nileLight} />
      <path d="M900,520 L770,900 H900 Z" fill={C.nileLight} />
      <g opacity={draw > 0.005 ? 0.8 : 0} fill="none" strokeLinecap="round" strokeLinejoin="round" stroke={C.papyrus}>
        <path d={MAIN} strokeWidth={70} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - mainDraw} />
        {BRANCHES.map((d) => (
          <path key={d} d={d} strokeWidth={38} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - branchDraw} opacity={branchDraw > 0.005 ? 1 : 0} />
        ))}
      </g>
      <path d="M450,340 L290,135 Q450,105 610,135 Z" fill={C.red} opacity={sep * 0.55} />
      <path d={MAIN} fill="none" stroke={C.linen} strokeWidth={110} strokeLinecap="round" opacity={sep * 0.7} />
      <path d="M450,340 L290,135 Q450,105 610,135 Z" fill={C.gold} opacity={unite * 0.75} />
      <path d={MAIN} fill="none" stroke={C.gold} strokeWidth={110} strokeLinecap="round" opacity={unite * 0.75} />
      <g fill="none" stroke={C.nile} strokeLinecap="round" strokeLinejoin="round" opacity={draw > 0.005 ? 1 : 0}>
        <path d={MAIN} strokeWidth={16} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - mainDraw} />
        {BRANCHES.map((d) => (
          <path key={d} d={d} strokeWidth={10} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - branchDraw} opacity={branchDraw > 0.005 ? 1 : 0} />
        ))}
      </g>
      <text x={450} y={78} textAnchor="middle" fontSize={34} {...txt} opacity={0.8}>
        Mediterranean Sea
      </text>
      <text x={846} y={720} textAnchor="middle" fontSize={30} {...txt} opacity={0.8} transform="rotate(-72 846 720)">
        Red Sea
      </text>
      <text x={40} y={868} fontSize={24} fontFamily={FONT} fontWeight={500} fill={C.mud}>
        Simplified map, not to scale
      </text>
    </g>
  );
};
