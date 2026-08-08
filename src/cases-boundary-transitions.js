/**
 * CASES — Boundary Transitions
 *
 * ONE JOB:
 * Define allowed transitions between CASES boundary states
 * without inferring human intent or creating a relationship.
 *
 * This does not:
 * - execute a service
 * - absorb an independent system
 * - resolve a relationship
 * - override human interaction
 *
 * It only defines valid transitions.
 */

import { CASES_BOUNDARY_STATES } from "./cases-boundary.js";

export const CASES_BOUNDARY_TRANSITIONS = Object.freeze({
  [CASES_BOUNDARY_STATES.OBSERVATION]: [
    CASES_BOUNDARY_STATES.UNRESOLVED
  ],

  [CASES_BOUNDARY_STATES.UNRESOLVED]: [
    CASES_BOUNDARY_STATES.HUMAN_INTERACTION
  ],

  [CASES_BOUNDARY_STATES.HUMAN_INTERACTION]: [
    CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  ],

  [CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP]: []
});

export function canTransition(from, to) {
  const allowed = CASES_BOUNDARY_TRANSITIONS[from];
  return Array.isArray(allowed) && allowed.includes(to);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CASES_BOUNDARY_TRANSITIONS,
    canTransition
  };
}
