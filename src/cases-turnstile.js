/**
 * CASES — Turnstile
 * 
 * ONE JOB:
 * Define the explicit human interaction required to move a CASES
 * boundary from an unresolved condition toward an explicit relationship.
 *
 * This does not:
 * - infer human intent
 * - create a relationship without interaction
 * - execute a service
 * - select a service
 * - absorb an independent system
 * - replace CyberCrowd
 *
 * The human touches the turnstile.
 */

import {
  CASES_BOUNDARY_STATES,
  isCasesBoundaryState
} from "./cases-boundary.js";

export function createCasesTurnstile() {
  return Object.freeze({
    state: CASES_BOUNDARY_STATES.UNRESOLVED,
    touched: false
  });
}

export function touchCasesTurnstile(turnstile) {
  if (!turnstile || typeof turnstile !== "object") {
    throw new TypeError("Invalid CASES turnstile");
  }

  return Object.freeze({
    state: CASES_BOUNDARY_STATES.HUMAN_INTERACTION,
    touched: true
  });
}

export function isCasesTurnstileTouched(turnstile) {
  return (
    !!turnstile &&
    turnstile.touched === true &&
    isCasesBoundaryState(turnstile)
  );
}

export function resolveCasesTurnstile(turnstile) {
  if (!isCasesTurnstileTouched(turnstile)) {
    return turnstile;
  }

  return Object.freeze({
    state: CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP,
    touched: true
  });
}
