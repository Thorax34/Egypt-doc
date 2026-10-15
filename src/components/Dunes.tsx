import React from 'react';
import {H} from '../theme';

/** Soft desert hill. Stack two or three with different colours for depth. */
export const Dunes: React.FC<{y: number; color: string; amp?: number; shift?: number}> = ({
  y,
  color,
  amp = 60,
  shift = 0,
}) => <path d={`M0 ${H} L0 ${y} Q ${480 + shift} ${y - amp} 960 ${y} T 1920 ${y} L1920 ${H} Z`} fill={color} />;
