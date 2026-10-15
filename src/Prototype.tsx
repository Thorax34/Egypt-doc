import React, {useMemo} from 'react';
import {AbsoluteFill, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C} from './theme';
import {Captions} from './components/Captions';
import {planTimeline} from './lib/timing';
import {SEGMENTS} from './script/prototype';
import {NoAudioBadge, SCENES} from './scenes/PrototypeScenes';

export type PrototypeProps = {
  /** File inside public/ (default narration.mp3). */
  audioFile: string;
  /** Silence after the narration ends, in seconds. */
  tailSeconds: number;
  /** Filled in by calculateMetadata (see Root.tsx). */
  hasAudio: boolean;
  audioFrames: number;
  /** Optional exact segment start times in seconds (length = segments + 1). */
  boundariesSec?: number[];
};

const transitionFor = (i: number, key: string, frames: number) => {
  const timing = linearTiming({durationInFrames: frames});
  switch (i % 3) {
    case 0:
      return <TransitionSeries.Transition key={key} presentation={fade()} timing={timing} />;
    case 1:
      return <TransitionSeries.Transition key={key} presentation={slide({direction: 'from-right'})} timing={timing} />;
    default:
      return <TransitionSeries.Transition key={key} presentation={wipe({direction: 'from-left'})} timing={timing} />;
  }
};

export const Prototype: React.FC<PrototypeProps> = ({audioFile, tailSeconds, hasAudio, audioFrames, boundariesSec}) => {
  const {fps} = useVideoConfig();
  const plan = useMemo(
    () => planTimeline(SEGMENTS, audioFrames, Math.round(tailSeconds * fps), fps, 15, boundariesSec),
    [audioFrames, tailSeconds, fps, boundariesSec],
  );

  const items: React.ReactNode[] = [];
  plan.scenes.forEach((s, i) => {
    const Scene = SCENES[s.scene];
    items.push(
      <TransitionSeries.Sequence key={s.id} durationInFrames={s.duration}>
        <Scene />
      </TransitionSeries.Sequence>,
    );
    if (i < plan.scenes.length - 1) items.push(transitionFor(i, `t-${s.id}`, plan.transition));
  });

  return (
    <AbsoluteFill style={{backgroundColor: C.sandDark}}>
      {hasAudio && <Audio src={staticFile(audioFile)} />}
      <TransitionSeries>{items}</TransitionSeries>
      <Captions chunks={plan.chunks} />
      {!hasAudio && <NoAudioBadge />}
    </AbsoluteFill>
  );
};
