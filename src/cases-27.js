/**
 * CASES — CASES-27
 * 
 * ONE JOB:
 * Define the 27 latent CASES connection states created by the
 * three CASES boundary positions and their three neutrality values.
 *
 * CASES does not:
 * - execute an independent service
 * - absorb an independent service
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * CASES defines the latent connection-state combinations.
 */

import {
  NEGATIVE_ZERO,
  ZERO,
  POSITIVE_ZERO
} from "./cases-state.js";

export const CASES_27_VALUES = Object.freeze([
  NEGATIVE_ZERO,
  ZERO,
  POSITIVE_ZERO
]);

export const CASES_27 = Object.freeze(
  CASES_27_VALUES.flatMap((p1) =>
    CASES_27_VALUES.flatMap((p2) =>
      CASES_27_VALUES.map((p3) =>
        Object.freeze({
          P1: p1,
          P2: p2,
          P3: p3
        })
      )
    )
  )
);

export const CASES_27_COUNT = CASES_27.length;

export function isCases27State(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  return CASES_27.some(
    (candidate) =>
      candidate.P1 === state.P1 &&
      candidate.P2 === state.P2 &&
      candidate.P3 === state.P3
  );
}

export function getCases27State(p1, p2, p3) {
  return CASES_27.find(
    (state) =>
      state.P1 === p1 &&
      state.P2 === p2 &&
      state.P3 === p3
  );
}
