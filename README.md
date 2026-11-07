# Unhinged Chess

React + TypeScript + Vite chess laboratory. No accounts or player ratings.

## Run

Node 22+: `npm install`, `npm run dev`. Validate with `npm test` and `npm run build`.

## Deployment

Create an empty GitHub repository named `unhinged-chess`, push the main branch, and select **Settings → Pages → GitHub Actions**. The included workflow tests and deploys the site. Relative asset paths support repository Pages URLs.

## Bots

Type any integer from -1000 to 5000, drag the slider, or use presets. White is the human by default; Flip switches human colour. Bot vs bot exposes independent white and black settings. Pause before single stepping.

Stockfish runs single-threaded in a disposable Web Worker, with a 32 MB hash. Positive ELO continuously scales thinking time and changes search depth. Below 3000, MultiPV candidate selection adds progressively fewer random choices. Zero selects uniformly among legal moves. Negative settings increasingly select the last (worst) MultiPV candidate; -1000 always does so. These labels are not calibrated ratings. Partial MultiPV searches can omit candidates, so negative bots choose the worst *returned* candidate, not a proven worst move. Maximum thinking time multiplies the budget by four.

## Extension points

`src/bot.ts`: difficulty controller, candidate selector, Stockfish adapter. A custom bot can expose an asynchronous FEN-to-UCI move function. Cancel workers on state changes.

`src/modes.ts`: gamemode registry, rules interface and piece metadata. Custom mode demonstrates a separate capture-the-opponent game with three-square Chaos Jumpers. Extend RulesEngine with arbitrary board dimensions, move generators, events and victory checks. Stockfish only understands standard chess; route incompatible modes to a custom bot. The current UI renders 8×8; large boards need viewport rendering before production use.

Sandbox paints or erases standard pieces and imports/exports FEN. Developer mode exposes FEN and engine diagnostics. Standard game history persists locally; themes and preferred bot ELO also persist.

## Current limitations

This is an initial implementation, not the entire long-term specification. Custom mode is a minimal two-piece demonstration; its board is not persisted. No evaluation graph, batch tournaments, suggested-move overlay, custom sprites, configurable move delay, animation toggle or full settings persistence yet. Draws follow chess.js automatic draw handling rather than separate claim and automatic 50/75-move UI. Promotion uses a text prompt. Sandbox positions must be valid before playing. Tests cover core rules and difficulty policy, not browser interaction, engine tactical benchmarks or cancellation races. Stronger labels do not guarantee stronger play in every position.

## Engine licensing

Stockfish is GPL-3.0. The npm stockfish package includes licensing and source information; preserve these when redistributing. Engine assets are copied from the installed package during build. See https://github.com/nmrugg/stockfish.js and https://stockfishchess.org for corresponding source and license.
