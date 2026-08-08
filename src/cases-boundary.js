/**
 * CASES — Connection Boundary
 * 
 * ONE JOB:
 * Define the bounded human and system boundary through which a
 * possible relationship can remain unresolved until explicit
 * interaction occurs.
 *
 * This does not:
 * - infer a human decision
 * - create a relationship
 * - execute a service
 * - select a service
 * - absorb an independent system
 * - replace CyberCrowd
 *
 * CASES provides the boundary.
 */

export const CASES_BOUNDARY_STATES = Object.freeze({
  OBSERVATION: "OBSERVATION",
  UNRESOLVED: "UNRESOLVED",
  HUMAN_INTERACTION: "HUMAN_INTERACTION",
  EXPLICIT_RELATIONSHIP: "EXPLICIT_RELATIONSHIP"
});

export function createCasesBoundaryState(
  state = CASES_BOUNDARY_STATES.OBSERVATION
) {
  return Object.freeze({
    state
  });
}

export function isCasesBoundaryState(state) {
  if (!state || typeof state !== "object") {
    return false;
  }

  return Object.values(CASES_BOUNDARY_STATES).includes(state.state);
}

export function resolveCasesBoundary(state, interaction) {
  if (!isCasesBoundaryState(state)) {
    throw new TypeError("Invalid CASES boundary state");
  }

  if (state.state !== CASES_BOUNDARY_STATES.UNRESOLVED) {
    return state;
  }

  if (!interaction) {
    return state;
  }

  return Object.freeze({
    state: CASES_BOUNDARY_STATES.HUMAN_INTERACTION
  });
}
