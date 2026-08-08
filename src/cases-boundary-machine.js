/**
 * CASES — Boundary Machine
 *
 * ONE JOB:
 * Apply an already validated CASES boundary transition without
 * inferring human intent or creating a relationship by itself.
 *
 * This does not:
 * - infer human intent
 * - select a service
 * - execute a service
 * - absorb an independent system
 * - bypass the CASES boundary
 * - replace CyberCrowd
 *
 * It only moves an existing boundary state along an allowed route.
 */

import { CASES_BOUNDARY_STATES } from "./cases-boundary.js";
import { canTransition } from "./cases-boundary-transitions.js";

export function transitionCasesBoundary(state, nextState) {
  if (!state || typeof state !== "object") {
    throw new TypeError("Invalid CASES boundary state");
  }

  if (!canTransition(state.state, nextState)) {
    throw new Error("Invalid CASES boundary transition");
  }

  return Object.freeze({
    state: nextState,
    touched:
      nextState === CASES_BOUNDARY_STATES.HUMAN_INTERACTION ||
      nextState === CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  });
}
