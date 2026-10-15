# Ancient Egypt cartoon documentary (Remotion) — prototype

A ~30 second prototype: 5 animated scenes (map, flood + farming, unification, pyramids,
change over time), scene transitions, camera moves, labels, and captions. Video length and
timing follow your narration audio file.

## Status — read this first
- NOT yet rendered with real Remotion. The development sandbox had no internet, so
  `npm install` and `remotion render` were never run. The first real test is yours (below).
- What WAS checked offline: the timing maths, and every scene drawn at several frames through a
  stand-in for Remotion's hooks and screenshotted. All files pass a syntax check. Not checked:
  type-checking, the real `@remotion/*` APIs, audio playback, transitions, the actual MP4.
- Remotion packages are pinned to 4.0.381 (a version seen in Remotion's docs). They must all
  stay on the same exact version. Newer: `npx remotion upgrade`.

## Architecture (phone-friendly)
Your phone is the remote control; a free cloud machine does the heavy work.

    Android browser ──► GitHub repo (this project) ──► GitHub Actions renders MP4
          ▲                    ▲                              │
          │  upload narration.mp3, edit script                │
          └──────────── download MP4 artifact ◄───────────────┘

Rendering needs Chrome + FFmpeg-class tooling and lots of CPU, which is not realistic in a phone
browser. As far as I know Remotion does not officially support running on Android (e.g. Termux);
that route is untested here and not recommended.

## Setup from Android (one time)
1. Create a free GitHub account and a new repository (public repos get the most free Actions
   minutes; check GitHub's current limits).
2. Upload this project's files (unzip first; the GitHub web UI uploads files/folders from the
   Android file picker). Keep the folder structure and the hidden `.github/workflows/render.yml`.
3. Put your narration at `public/narration.mp3` (Add file → Upload files).

## Test 1: visuals only (no audio)
Open the repo in a Codespace (Code → Codespaces → Create; free monthly allowance, check current
limits), then:

    npm install
    npm run dev

Open the forwarded port 3000 in your browser: Remotion Studio shows the "Prototype" composition
with a red "No narration file found" badge, so you can scrub the animation first.

## Test 2: render the MP4 on GitHub
1. Repo → Actions → "Render video" → Run workflow (use "Desktop site" in Chrome if the button is hidden).
2. When the run turns green, open it → Artifacts → `Prototype-mp4` → download the ZIP → unzip in
   your Files app → MP4. Artifacts are kept 7 days.
3. If it fails, open the failed step and copy the log; the most likely causes are a version
   mismatch between the `@remotion/*` packages or a missing Chrome dependency.

## Narration
- Script: `src/script/prototype.ts` (original text). Read it aloud or use any free text-to-speech
  you are allowed to use commercially (check each tool's licence, voice terms, and YouTube rules
  on synthetic voices). I did not test any TTS tool.
- Save as `public/narration.mp3`. Video length = audio length + 1 s tail, computed automatically.

## How sync works (and its limit)
- Scene lengths and caption timing are an ESTIMATE: each script segment gets a share of the audio
  proportional to its word count. Long pauses make captions drift.
- Exact sync: get word timestamps from a transcript of your audio (e.g. a Whisper-based tool,
  which Remotion supports through `@remotion/install-whisper-cpp`; not implemented yet), then pass
  `boundariesSec` (start second of each segment + audio end) as a prop in `src/Root.tsx`.

## Folder map
    src/Root.tsx            composition + audio-length calculation
    src/Prototype.tsx       scenes + transitions + audio + captions
    src/script/             narration text (one segment per scene)
    src/lib/timing.ts       audio length -> scene lengths + caption timing
    src/components/         reusable SVG parts (Camera, Sky, River, Person, NileMap, Label...)
    src/scenes/             one component per scene
    CREDITS.md              sources and what is established vs debated

## Scaling to 8-10 minutes
Same pattern: write ~1,300-1,500 words in segments (one scene each), add scene components using
the existing parts, extend `SCENES`, record the narration, render. A 10-minute 1080p render is
heavy (18,000 frames); I have not measured how long it takes on GitHub's runners. Free minutes
are limited on private repos, so render in 2-3 parts if needed.

## Costs, licences, keys
- No API keys or paid services are used. Remotion is free for individuals and small companies
  (teams of 4+ need a company licence); read https://www.remotion.dev/license before monetising.
- Fredoka font via Google Fonts (open licence); fetched when rendering, so internet is required.
- GitHub free-tier limits can change.
