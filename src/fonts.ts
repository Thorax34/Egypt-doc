import {loadFont} from '@remotion/google-fonts/Fredoka';

// Free, open-licence rounded font (Google Fonts, OFL). Needs internet at render time.
const {fontFamily} = loadFont('normal', {weights: ['500', '700'], subsets: ['latin']});

export const FONT = `${fontFamily}, 'Trebuchet MS', Arial, sans-serif`;
