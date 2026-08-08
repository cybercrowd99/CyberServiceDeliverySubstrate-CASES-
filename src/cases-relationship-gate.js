/**
 * CASES — Relationship Gate
 * 
 * ONE JOB:
 * Permit a CASES connection to become an explicit relationship
 * only when the existing acceptance result and boundary state
 * both explicitly authorize that condition.
 *
 * This does not:
 * - infer human intent
 * - create a relationship by itself
 * - execute a service
 * - absorb an independent system
 * - modify CASES state
 * - transform or enrich a message
 *
 * It only verifies the final structural boundary condition.
 */

import {
  CASES_BOUNDARY_STATES
} from "./cases-boundary.js";

import {
  CASES_ACCEPTANCE_RESULT,
  isCasesAcceptanceResult
} from "./cases-acceptance-result.js";

export function canResolveCasesRelationship(
  acceptanceResult,
  boundaryState
) {
  if (!isCasesAcceptanceResult(acceptanceResult)) {
    return false;
  }

  if (
    acceptanceResult.status !==
    CASES_ACCEPTANCE_RESULT.ACCEPTED
  ) {
    return false;
  }

  if (!boundaryState || typeof boundaryState !== "object") {
    return false;
  }

  return (
    boundaryState.state ===
    CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  );
}

export function resolveCasesRelationship(
  acceptanceResult,
  boundaryState
) {
  const resolved = canResolveCasesRelationship(
    acceptanceResult,
    boundaryState
  );

  return Object.freeze({
    resolved,
    message: resolved
      ? acceptanceResult.message
      : null
  });
}
