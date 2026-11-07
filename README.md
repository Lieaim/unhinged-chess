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

## Custom Game Laboratory (Leveling + Fusion)

Open Custom to enable either or both modifiers. Each has an independent applicability selector; White/Black options also assign mechanics in bot battles. Human/Bot resolves from the colour switch and bot-vs-bot setup. Settings apply immediately; use New match to reset progression.

Choose an action, select a piece, then click a highlighted destination. Evolution uses the same square and asks for a recipe. Fusion removes the first piece and places the result on the second square after confirmation. Reverse selection to choose the other destination. The recipe book describes all twelve result types and allows recipe toggles. Ability actions include shield, ranged, teleport and command. Cooldowns count owner turns. Shields and HP absorb attacks while the attacker stays on its original square. Overlord captures allow one extra move. Command grants one move to the selected adjacent ally.

Lifetime XP and spent points are independent; leveling milestones never repeat. Save snapshots include board identity, HP, shields, cooldowns, XP, spent points, turn restrictions and modifier settings. Undo restores the complete previous snapshot and pauses AI. Custom saves are separate from standard PGN/FEN. Browser persistence saves the current custom state; the undo stack is session-only.

The custom engine deliberately uses a documented variant: king safety/checkmate, pawn double moves, auto-queen promotion, no castling or en passant. Standard remains chess.js with its official rules. Custom AI never calls Stockfish. Its separate worker scores material, HP, shields and XP, enumerates legal special actions, and uses bounded adversarial search. Search time scales from 100 ms to 1.9 seconds; depth scales up to two reply plies. These settings are experimental difficulty labels, not real-world ELO. No repetitions/50-move draws or custom match clocks yet. Evolution/fusion animations and sounds, recipe editor, full pluggable event handlers and extensive browser/AI benchmarks remain follow-up work; current events are a deterministic audit trail emitted by the central action reducer.

Extension files: `labRules.ts` holds recipes, permissions, movement, action validation and atomic transitions; `lab.worker.ts` handles bounded AI; `Laboratory.tsx` renders the existing Custom tab. Add custom mechanics through validated action types and the transition reducer. Events record destruction/move, capture, then turn-end/start; rewards run exactly once in that transition. New mechanics should not grant rewards by replaying the event log.

## One Versus Many and Custom Pieces

In **Custom**, select **Starting armies → One Versus Many**, choose the lone colour and solo piece, then press **Start One Versus Many**. The lone side starts with its king on e1/e8 and the chosen non-king unit on d1/d8; the other side keeps all 16 normal units. Setup controls apply to new matches. Existing human-colour and bot-battle controls work with either army layout.

The **Custom Pieces** modifier is the dependency for nonstandard units. Fusion crafting is disabled without it, and the engine also enforces this permission. Turning it off starts a clean match and falls back to a normal queen as the solo unit. Old saves migrate to Custom Pieces enabled so previously fused units remain usable. Abilities belong to custom units and work even with Fusion crafting disabled.

`src/pieceRegistry.ts` is the shared catalogue for names, movement flags, material values, HP, descriptions, and fusion eligibility. All twelve fusion units live here; recipes can only produce entries marked `fusion: true`. Experimental units cannot appear in fusion recipes accidentally. Add a registry entry, artwork in `FusionPiece.tsx`, and rule tests to extend the catalogue. Multi-step movement uses the custom rules engine and worker AI, never Stockfish.

New experimental units: **Super Queen** (queen + knight), **Titan Empress** (queen + knight, 5 HP), **Void Walker** (unrestricted square-to-square warp), **Dragon** (queen + 3×1 camel jumps, 3 HP), **Nightmare Rider** (repeated knight-vector movement, blocked at occupied intermediate landings). King safety and non-capturable kings remain in effect. These deliberately overpowered units are unbalanced experimental options.
