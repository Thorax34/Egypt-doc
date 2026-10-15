// ORIGINAL narration script for the 30-second prototype. Read this aloud (or feed it to a
// text-to-speech tool) and save the result as public/narration.mp3.
// One segment = one scene. Every factual claim is listed in CREDITS.md with its status.
export type SceneKey = 'nile' | 'flood' | 'unite' | 'pyramids' | 'change';

export type Segment = {id: string; scene: SceneKey; text: string};

export const SEGMENTS: Segment[] = [
  {
    id: 'nile',
    scene: 'nile',
    text: 'Ancient Egypt grew along the Nile River, in north-eastern Africa.',
  },
  {
    id: 'flood',
    scene: 'flood',
    text: 'Each year the Nile flooded, leaving rich silt. Farmers grew wheat and barley in that fertile soil.',
  },
  {
    id: 'unite',
    scene: 'unite',
    text: 'About five thousand years ago, Upper and Lower Egypt were united. Historians still debate exactly when and how.',
  },
  {
    id: 'pyramids',
    scene: 'pyramids',
    text: 'Later, kings built pyramids as royal tombs. The Great Pyramid at Giza is over four thousand five hundred years old.',
  },
  {
    id: 'change',
    scene: 'change',
    text: 'But Egypt never stood still. Over thousands of years, its rulers, art, and daily life kept changing.',
  },
];

/** Used only when no narration file is found (so you can preview visuals first). */
export const FALLBACK_SECONDS = 33;
