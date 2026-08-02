---
name: testing-server-vitest
description: How to run and validate the ai-career-booster server test suite (vitest) and the client dev/build, including environment gotchas (Node version, missing credentials, MONGODB_URI naming).
---

# Testing ai-career-booster (server vitest suite + client smoke)

## Server unit tests
- `cd server && npm install && npm test` (`vitest run`) — specs live in `server/tests/` mirroring `src/`.
  The suite is pure-unit: it needs **no** MongoDB, network or AI credentials. Verify that property with
  `env -u MONGO_URI -u MONGODB_URI -u JWT_SECRET -u GEMINI_API_KEY npm test` and, if available,
  `unshare -rn npx vitest run` (network namespace with no connectivity).
- Coverage: `npm run test:coverage` writes `coverage/index.html` and `coverage/coverage-summary.json`
  (parse `total` from the JSON for exact percentages rather than reading the text table).
- Determinism checks worth running when specs share module-level state (e.g. `ai-cache`, `ai-logger`,
  `provider-health`): repeat runs, `npx vitest run --sequence.shuffle --sequence.seed=<n>`, one run per
  spec file, and `npx vitest run --no-isolate`.

## Proving tests aren't tautological (mutation spot-checks)
Clone the branch to `/tmp` first so the real working tree is never dirtied, then mutate a constant,
run the suite, and `git checkout --` the file. Constants that are cheap and high-signal to mutate:
`src/services/ai/utils/cost-estimator.ts` (per-token rates), `src/middleware/ai-usage.middleware.ts`
(`FREE_LIMITS`), `src/services/ai/logging/provider-health.service.ts` (`successRate>70`),
`src/services/ai/core/ai-cache.service.ts` (default TTL), `src/services/ai/core/ai-logger.service.ts`
(500-entry cap). Surviving mutants indicate a real coverage gap (default parameter values of helper
functions such as `retry()` in `src/services/ai/utils/retry.util.ts` are an easy one to miss).

## Known pre-existing breakage — always compare against `main`
Clone `main` to a second temp dir and diff outputs; several commands fail on `main` already:
- `cd server && npx tsc --noEmit` → 6 `TS2345 ... AskAIOptions` errors (`server/tsconfig.json` includes
  only `src/**/*`, so `tests/` is not type-checked).
- `cd client && npm run lint` → exits 1 with ~39 problems.
- `cd client && npm run build` → exits 2 with ~13 TS errors (e.g. missing `../services/resume-api`).
Judge a PR by the *diff* of these outputs vs `main`, not by their exit codes.

## Running the app
- `cd server && npm run dev` throws `Error: GEMINI_API_KEY is missing.` at module load without a key.
  Any non-empty dummy value gets past provider init. Note `src/config/db.ts` reads **`MONGODB_URI`**
  (not `MONGO_URI`); without it mongoose throws immediately. With dummy values the server still prints
  `Server running on port 5000`, which is enough for a dependency/runtime smoke test.
- `cd client && npm run dev` needs **Node >= 20.19** (use `source ~/.nvm/nvm.sh && nvm use 22`). On older
  Node a fresh `npm install` can also leave rolldown's native binding missing
  (`Cannot find module '@rolldown/binding-linux-x64-gnu'`) — reinstall `node_modules` under Node 22.
  App renders at http://localhost:5173 (CareerBoost AI landing page) with no backend required.

## Devin Secrets Needed
- `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY` — only for end-to-end/API testing; not needed for the
  unit test suite, lint, build or typecheck.
