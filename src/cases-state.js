/**
 * CASES — Connection State
 * 
 * ONE JOB:
 * Define the CASES neutrality positions and the three-position
 * CASES connection state.
 *
 * CASES does not:
 * - execute an independent service
 * - absorb an independent service
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * CASES provides the connection state.
 */

export const NEGATIVE_ZERO = "NEGATIVE_ZERO";
export const ZERO = "ZERO";
export const POSITIVE_ZERO = "POSITIVE_ZERO";

export const NEUTRALITY_STATES = Object.freeze([
  NEGATIVE_ZERO,
  ZERO,
  POSITIVE_ZERO
]);

export const CASES_POSITIONS = Object.freeze({
  P1: "SYSTEM_IDENTIFICATION",
  P2: "OPERATIONAL_STANCE",
  P3: "CYBERCROWD_INTERPRETATION"
});

export const CASES_ZERO_STATE = Object.freeze({
  P1: ZERO,
  P2: ZERO,
  P3: ZERO
});

export function createCasesState(
  p1 = ZERO,
  p2 = ZERO,
  p3 = ZERO
) {
  return Object.freeze({
    P1: p1,
    P2: p2,
    P3: p3
  });
}

export function isCasesNeutralityState(value) {
  return NEUTRALITY_STATES.includes(value);
}

export function isCasesState(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  return (
    isCasesNeutralityState(state.P1) &&
    isCasesNeutralityState(state.P2) &&
    isCasesNeutralityState(state.P3)
  );
}
