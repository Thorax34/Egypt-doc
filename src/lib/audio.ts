import {ALL_FORMATS, Input, UrlSource} from 'mediabunny';

/** Duration of an audio file in seconds, using Mediabunny (the method Remotion's docs recommend). */
export const getAudioDurationSeconds = async (src: string): Promise<number> => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {getRetryDelay: () => null}),
  });
  return input.computeDuration();
};
