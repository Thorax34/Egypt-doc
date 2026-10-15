import React from 'react';
import {AbsoluteFill} from 'remotion';
import {H, W} from '../theme';

/** Full-frame 1920x1080 SVG canvas that every scene draws on. */
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {children}
    </svg>
  </AbsoluteFill>
);
