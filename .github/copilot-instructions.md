# Repository instructions

## Project structure

This is a dependency-light, static browser quiz. `src/index.html` loads `questions.js`, `quiz.js`, then `app.js` as classic scripts; keep that order because the UI uses globals defined by the earlier scripts. `app.js` owns DOM rendering and screen state, `questions.js` holds the `QUESTIONS` data, and `quiz.js` contains browser-independent quiz functions. The logic and question data export CommonJS values conditionally so Node tests can load them without changing browser use.

The repository-root `index.html` redirects GitHub Pages visitors to `src/index.html`. The guides under `workshops/` describe the workshop flow; `README.md` is the overview and setup source of truth.

## Build, test, and run

Node.js 20 or newer is the documented runtime. There is no build or lint script configured.

- Run the full test suite: `npm test`
- Run one test file: `node --test tests/quiz.test.js` or `node --test tests/questions.test.js`
- Run one named test: `node --test --test-name-pattern="getGrade gives an A" tests/quiz.test.js`
- Serve the app locally: `npm start` (serves `src/` at `http://localhost:8080`)

Tests use Node's built-in `node:test` and `node:assert/strict`; no test dependencies need installation. The starter intentionally has one failing test: the exact-90% grade boundary in `tests/quiz.test.js`. The README describes this as expected workshop behavior; don't treat that known failure as an unrelated regression.

## Code and test conventions

- Keep quiz calculations and other testable behavior in `src/quiz.js`, separate from browser DOM code in `src/app.js`.
- Keep question records in `src/questions.js` as objects with question text, four options, and a zero-based `answer` index. `tests/questions.test.js` validates the structure and uniqueness.
- Add focused Node built-in tests in the corresponding file under `tests/`; load production code with `require` through its conditional CommonJS exports.
- Browser markup, styles, and scripts live together under `src/`; preserve the script dependency order in `src/index.html`.
