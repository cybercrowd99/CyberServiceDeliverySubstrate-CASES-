/**
 * CASES — Zero-State
 * 
 * ONE JOB:
 * Provide the explicit CASES Zero-State for a connection that
 * has no latent negative or positive lean.
 *
 * This does not:
 * - redefine CASES neutrality
 * - modify CASES-27
 * - execute an independent service
 * - create a service relationship
 *
 * It provides the neutral starting state.
 */

import { CASES_ZERO_STATE, ZERO } from "./cases-state.js";

export const CASES_ZERO = CASES_ZERO_STATE;

export function isCasesZeroState(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  return (
    state.P1 === ZERO &&
    state.P2 === ZERO &&
    state.P3 === ZERO
  );
}
