/**
 * CASES — State Engine
 *
 * ONE JOB:
 * Maintain and update a CASES-27 connection state while preserving
 * the distinction between NEGATIVE_ZERO, ZERO, and POSITIVE_ZERO.
 *
 * This does not:
 * - execute an independent service
 * - infer human intent
 * - create a human relationship
 * - absorb an independent system
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * It maintains the CASES connection state.
 */

import {
  NEGATIVE_ZERO,
  ZERO,
  POSITIVE_ZERO,
  isCasesNeutralityState
} from "./cases-state.js";

export const CASES_MAGNITUDES = Object.freeze([
  -1,
  1
]);

export const CASES_ACTIVE_FLOOR = 1;

export function createCasesStateEngine(
  p1 = ZERO,
  p2 = ZERO,
  p3 = ZERO,
  magnitude = CASES_ACTIVE_FLOOR
) {
  if (
    !isCasesNeutralityState(p1) ||
    !isCasesNeutralityState(p2) ||
    !isCasesNeutralityState(p3)
  ) {
    throw new TypeError("Invalid CASES neutrality value");
  }

  if (!CASES_MAGNITUDES.includes(magnitude)) {
    throw new TypeError("Invalid CASES magnitude");
  }

  return Object.freeze({
    P1: p1,
    P2: p2,
    P3: p3,
    magnitude
  });
}

export function updateCasesPosition(state, position, value) {
  if (!state || typeof state !== "object") {
    throw new TypeError("Invalid CASES state");
  }

  if (!["P1", "P2", "P3"].includes(position)) {
    throw new TypeError("Invalid CASES position");
  }

  if (!isCasesNeutralityState(value)) {
    throw new TypeError("Invalid CASES neutrality value");
  }

  return Object.freeze({
    ...state,
    [position]: value
  });
}

export function setCasesMagnitude(state, magnitude) {
  if (!state || typeof state !== "object") {
    throw new TypeError("Invalid CASES state");
  }

  if (!CASES_MAGNITUDES.includes(magnitude)) {
    throw new TypeError("Invalid CASES magnitude");
  }

  return Object.freeze({
    ...state,
    magnitude
  });
}

export function mapCasesNeutrality(value) {
  if (value === NEGATIVE_ZERO) {
    return "-0";
  }

  if (value === POSITIVE_ZERO) {
    return "+0";
  }

  return "0";
}

export function getCasesStateStatus(state) {
  if (!state || typeof state !== "object") {
    throw new TypeError("Invalid CASES state");
  }

  return `CASES-STATE: (${mapCasesNeutrality(state.P1)}, ${mapCasesNeutrality(state.P2)}, ${mapCasesNeutrality(state.P3)}) x ${state.magnitude}`;
}
