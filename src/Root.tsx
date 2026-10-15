import React from 'react';
import {CalculateMetadataFunction, Composition, staticFile} from 'remotion';
import {Prototype, PrototypeProps} from './Prototype';
import {FALLBACK_SECONDS} from './script/prototype';
import {getAudioDurationSeconds} from './lib/audio';
import {FPS, H, W} from './theme';

const defaultProps: PrototypeProps = {
  audioFile: 'narration.mp3',
  tailSeconds: 1,
  hasAudio: false,
  audioFrames: Math.round(FALLBACK_SECONDS * FPS),
};

/**
 * Video length = narration length + tail. Runs before every preview/render.
 * If public/narration.mp3 is missing or unreadable, falls back to an estimate.
 */
const calculateMetadata: CalculateMetadataFunction<PrototypeProps> = async ({props}) => {
  let seconds = FALLBACK_SECONDS;
  let hasAudio = false;
  try {
    seconds = await getAudioDurationSeconds(staticFile(props.audioFile));
    hasAudio = true;
  } catch {
    // no audio file: keep the fallback
  }
  const audioFrames = Math.ceil(seconds * FPS);
  return {
    durationInFrames: audioFrames + Math.round(props.tailSeconds * FPS),
    props: {...props, hasAudio, audioFrames},
  };
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Prototype"
    component={Prototype}
    width={W}
    height={H}
    fps={FPS}
    durationInFrames={defaultProps.audioFrames + FPS}
    defaultProps={defaultProps}
    calculateMetadata={calculateMetadata}
  />
);
