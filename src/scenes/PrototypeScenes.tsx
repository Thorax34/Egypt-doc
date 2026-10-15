import React from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, H, W} from '../theme';
import {FONT} from '../fonts';
import {tween, useUid, wavePath} from '../lib/anim';
import {Boat} from '../components/Boat';
import {Camera} from '../components/Camera';
import {Dunes} from '../components/Dunes';
import {Label} from '../components/Label';
import {NileMap} from '../components/NileMap';
import {Palm, Reeds} from '../components/Palm';
import {Person} from '../components/Person';
import {Pyramid} from '../components/Pyramid';
import {River} from '../components/River';
import {Sky} from '../components/Sky';
import {Stage} from '../components/Stage';

/** Frame, scene length, and progress 0..1 inside this scene. */
const useScene = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return {f, d, t: f / d};
};

const Parchment: React.FC = () => {
  const id = useUid('parch');
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0" stopColor={C.parchment} />
          <stop offset="1" stopColor={C.parchmentDark} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
    </g>
  );
};

/* 1 ── Egypt and the Nile on a simplified map ─────────────────────────────── */
export const NileMapScene: React.FC = () => {
  const {d, t} = useScene();
  return (
    <Stage>
      <Camera from={{x: 960, y: 540, scale: 1}} to={{x: 960, y: 470, scale: 1.3}}>
        <Parchment />
        <g transform="translate(578 60) scale(0.85)">
          <NileMap draw={tween(t, 0, 1, 0.08, 0.7)} />
        </g>
        <Label x={1180} y={640} text="The Nile River" at={Math.round(d * 0.32)} color={C.nileLight} />
        <Label x={700} y={260} text="Egypt" at={Math.round(d * 0.5)} color={C.gold} />
        <Label x={1230} y={340} text="Northeast Africa" at={Math.round(d * 0.66)} />
      </Camera>
    </Stage>
  );
};

/* 2 ── The yearly flood, silt, and farming ────────────────────────────────── */
export const FloodFarmScene: React.FC = () => {
  const {f, d, t} = useScene();
  const rise = tween(t, 0, 1, 0.05, 0.3);
  const fall = tween(t, 0, 1, 0.35, 0.55);
  const level = rise * (1 - fall);
  const soil = interpolateColors(fall, [0, 1], [C.sandDark, C.silt]);
  const grow = tween(t, 0, 1, 0.55, 0.88);
  const crop = interpolateColors(grow, [0, 1], [C.papyrus, C.gold]);
  const waterBottom = 700 + 380 * level;
  return (
    <Stage>
      <Camera from={{x: 960, y: 540, scale: 1}} to={{x: 1100, y: 600, scale: 1.18}}>
        <Sky />
        <Dunes y={560} color={C.sandLight} amp={50} />
        <Palm x={160} y={640} scale={1} />
        <Palm x={1780} y={650} scale={0.9} phase={2} />
        <River y={540} height={160} />
        <Reeds x={560} y={700} count={8} />
        <Reeds x={1400} y={702} count={6} scale={0.9} />
        <Boat x={tween(t, -200, 2100, 0, 1)} y={620} scale={0.9} />
        <rect y={700} width={W} height={380} fill={soil} />
        <rect y={700} width={W} height={380 * level} fill={C.nile} opacity={0.85} />
        <path d={wavePath(W, waterBottom, 7, 170, f / 70, 16)} fill={C.nile} opacity={level > 0.02 ? 0.85 : 0} />
        {[820, 920, 1010].map((row, r) =>
          Array.from({length: 22}, (_, i) => {
            const x = 40 + i * 90 + (r % 2) * 40;
            const h = 90 * grow;
            return (
              <g key={`${r}-${i}`} opacity={grow > 0.01 ? 1 : 0}>
                <line x1={x} y1={row} x2={x} y2={row - h} stroke={crop} strokeWidth={6} strokeLinecap="round" />
                <ellipse cx={x} cy={row - h - 10} rx={8} ry={16 * grow + 1} fill={crop} />
              </g>
            );
          }),
        )}
        <Person
          x={tween(t, -80, 1500, 0.45, 1)}
          y={960}
          scale={1.05}
          tool="hoe"
          head="bare"
          walk={f * 0.3}
          cloth={C.linen}
        />
        <Label x={960} y={300} text="The Nile floods every year" at={Math.round(d * 0.07)} color={C.nileLight} />
        <Label x={1330} y={820} text="Rich, dark silt" at={Math.round(d * 0.5)} />
        <Label x={760} y={420} text="Wheat and barley" at={Math.round(d * 0.74)} color={C.gold} />
      </Camera>
    </Stage>
  );
};

/* 3 ── Upper and Lower Egypt are joined (details debated) ─────────────────── */
export const UnificationScene: React.FC = () => {
  const {f, d, t} = useScene();
  const regions = tween(t, 0, 1, 0.08, 0.3);
  const unite = tween(t, 0, 1, 0.5, 0.72);
  const approach = tween(t, 0, 1, 0.4, 0.65);
  const merged = unite > 0.55;
  return (
    <Stage>
      <Camera from={{x: 960, y: 540, scale: 1}} to={{x: 1000, y: 520, scale: 1.12}}>
        <Parchment />
        <g transform="translate(110 60) scale(0.85)">
          <NileMap draw={1} regions={regions} unite={unite} />
        </g>
        <rect x={1020} y={770} width={780} height={26} rx={13} fill={C.stoneShade} />
        {!merged && (
          <>
            <Person x={1270 + approach * 140} y={770} scale={1.2} head="white" tool="none" walk={f * 0.2} cloth={C.linen} />
            <Person x={1560 - approach * 140} y={770} scale={1.2} head="red" flip walk={f * 0.2} cloth={C.linen} />
          </>
        )}
        {merged && <Person x={1415} y={770} scale={1.3} head="double" tool="staff" cloth={C.linen} />}
        <Label x={1270} y={230} text="Upper Egypt" sub="the south" at={Math.round(d * 0.1)} color={C.linen} />
        <Label x={1560} y={230} text="Lower Egypt" sub="the north" at={Math.round(d * 0.16)} color="#F2B3A5" />
        <Label x={1415} y={310} text="One kingdom" at={Math.round(d * 0.62)} color={C.gold} />
        <Label
          x={1415}
          y={850}
          text="Dates and details are debated"
          sub="Simplified illustration"
          at={Math.round(d * 0.76)}
          color={C.lapis}
          textColor={C.linen}
        />
      </Camera>
    </Stage>
  );
};

/* 4 ── Pyramids as royal tombs ─────────────────────────────────────────────── */
export const PyramidsScene: React.FC = () => {
  const {f, d, t} = useScene();
  const id = useUid('rise');
  const grow = tween(t, 0, 1, 0.04, 0.55);
  const groundY = 800;
  return (
    <Stage>
      <defs>
        <clipPath id={id}>
          <rect x={0} y={groundY - 460 * grow} width={W} height={600} />
        </clipPath>
      </defs>
      <Camera from={{x: 960, y: 540, scale: 1}} to={{x: 1060, y: 620, scale: 1.2}}>
        <Sky sunX={400} sunY={200} />
        <Dunes y={720} color={C.sandLight} amp={40} shift={200} />
        <g clipPath={`url(#${id})`}>
          <Pyramid x={520} y={groundY} w={300} h={190} />
          <Pyramid x={1380} y={groundY} w={560} h={356} />
          <Pyramid x={960} y={groundY + 14} w={640} h={407} />
        </g>
        <Dunes y={830} color={C.sand} amp={50} />
        <Dunes y={930} color={C.sandDark} amp={40} shift={-150} />
        <Person x={((f * 2.2) % 2400) - 200} y={990} scale={0.6} walk={f * 0.3} head="bare" />
        <Person x={((f * 2.2 + 120) % 2400) - 200} y={1010} scale={0.55} walk={f * 0.3 + 1} head="bare" cloth="#F5D9A0" />
        <Palm x={140} y={900} scale={0.8} />
        <Label x={960} y={230} text="Pyramids were royal tombs" at={Math.round(d * 0.12)} color={C.linen} />
        <Label
          x={960}
          y={345}
          text="Great Pyramid of Giza"
          sub="Built around 2600 BCE (approximate)"
          at={Math.round(d * 0.58)}
          color={C.gold}
        />
      </Camera>
    </Stage>
  );
};

/* 5 ── Egypt changed over time ─────────────────────────────────────────────── */
const Temple: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-30} width={220} height={30} fill={C.stoneShade} />
    <rect x={-120} y={-150} width={240} height={26} fill={C.stone} stroke={C.stoneShade} strokeWidth={3} />
    {[-90, -45, 0, 45, 90].map((cx) => (
      <rect key={cx} x={cx - 13} y={-126} width={26} height={96} fill={C.stone} stroke={C.stoneShade} strokeWidth={3} />
    ))}
  </g>
);

export const ChangeScene: React.FC = () => {
  const {f, d, t} = useScene();
  const line = tween(t, 0, 1, 0.05, 0.75);
  const pop = (k: number) => Math.round(d * (0.22 + k * 0.2));
  const show = (k: number) => (f >= pop(k) ? 1 : 0);
  return (
    <Stage>
      <Camera from={{x: 960, y: 540, scale: 1}} to={{x: 1000, y: 540, scale: 1.1}}>
        <Sky top={C.lapis} bottom={C.gold} sunX={1500} sunY={300} clouds={false} />
        <Dunes y={660} color={C.sandDark} amp={50} />
        <rect y={720} width={W} height={360} fill={C.sand} />
        <path
          d="M200,760 L1720,760"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - line}
          stroke={C.ink}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
        <path d="M1700,735 L1740,760 L1700,785" stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" opacity={line > 0.98 ? 1 : 0} />
        <g opacity={show(0)}>
          <Pyramid x={480} y={690} w={300} h={190} />
        </g>
        <g opacity={show(1)}>
          <Person x={960} y={706} scale={1.0} head="nemes" tool="staff" />
        </g>
        <g opacity={show(2)}>
          <Temple x={1440} y={706} />
        </g>
        {[480, 960, 1440].map((x) => (
          <circle key={x} cx={x} cy={760} r={14} fill={C.gold} stroke={C.ink} strokeWidth={5} />
        ))}
        <Label x={480} y={835} text="Old Kingdom" at={pop(0)} />
        <Label x={960} y={835} text="Middle Kingdom" at={pop(1)} />
        <Label x={1440} y={835} text="New Kingdom" at={pop(2)} />
        <Label x={960} y={150} text="Egypt changed over time" at={Math.round(d * 0.1)} color={C.linen} />
        <Label x={960} y={235} text="Symbolic icons, not exact reconstructions" at={Math.round(d * 0.8)} color={C.lapis} textColor={C.linen} />
      </Camera>
    </Stage>
  );
};

export const SCENES: Record<string, React.FC> = {
  nile: NileMapScene,
  flood: FloodFarmScene,
  unite: UnificationScene,
  pyramids: PyramidsScene,
  change: ChangeScene,
};

/** Shown in the corner when narration.mp3 is missing. */
export const NoAudioBadge: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'flex-start', padding: 24}}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 26,
        background: C.red,
        color: C.linen,
        padding: '8px 18px',
        borderRadius: 18,
      }}
    >
      No narration file found: using estimated timing
    </div>
  </AbsoluteFill>
);
