// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  createQuiz,
  answerQuestion,
  advanceQuestion,
  isQuizFinished,
  calculatePercentage,
  getGrade,
  getFeedbackMessage,
  formatTimeLeft,
} = require("../src/quiz.js");

test("createQuiz creates an initial state without changing the questions", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0 });
  assert.notEqual(state.questions, questions);
  assert.deepEqual(questions, [{ answer: 1 }]);
});

test("answerQuestion increments the score for a correct answer without mutating state", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 0 };
  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { ...state, score: 1 });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0 });
  assert.notEqual(result.state, state);
});

test("answerQuestion keeps the score for an incorrect answer without mutating state", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2 };
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.deepEqual(result.state, state);
  assert.notEqual(result.state, state);
});

test("advanceQuestion returns a new state at the next question", () => {
  const state = { questions: [{ answer: 0 }, { answer: 1 }], current: 0, score: 1 };

  assert.deepEqual(advanceQuestion(state), { ...state, current: 1 });
  assert.equal(state.current, 0);
});

test("isQuizFinished detects when the current question is past the final question", () => {
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 1 }), false);
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 2 }), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade includes the 90%, 75% and 50% boundaries", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(89), "B");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(74), "C");
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns an encouraging message for each grade", () => {
  assert.equal(getFeedbackMessage("A"), "Outstanding work!");
  assert.equal(getFeedbackMessage("B"), "Great job!");
  assert.equal(getFeedbackMessage("C"), "Good effort!");
  assert.equal(getFeedbackMessage("Keep practicing"), "Keep practicing—you'll get there!");
});

test("formatTimeLeft displays the remaining seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
  assert.equal(formatTimeLeft(5), "⏱ 5s");
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});
