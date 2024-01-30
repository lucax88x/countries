import { expect, test } from "vitest";
import { answerCapital, getRandomCountry } from "./countries";

test("get random country does not explode", () => {
  const country = getRandomCountry();

  console.info(country);

  expect(country).toBeTruthy();
});
//
// test("answer country works with right capital", () => {
//   expect(answerCapital("rome")).toBeTruthy();
// });
//
// test("answer country works with wrong capital", () => {
//   expect(answerCapital("some-city")).toBeFalsy();
// });
