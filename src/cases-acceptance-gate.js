/**
 * CASES — Acceptance Gate
 * 
 * ONE JOB:
 * Permit a routed CASES connection message to enter the
 * acceptance surface only when the existing CASES boundary
 * state explicitly records HUMAN_INTERACTION.
 *
 * This does not:
 * - infer human intent
 * - create a relationship
 * - execute a service
 * - absorb an independent system
 * - modify CASES state
 * - transform the connection message
 * - decide what service should occur
 *
 * It only enforces the human-interaction gate.
 */

import {
  CASES_BOUNDARY_STATES
} from "./cases-boundary.js";

import {
  isCasesRouteResult,
  CASES_ROUTE_RESULT
} from "./cases-route-result.js";

export function canAcceptCasesConnection(
  routeResult,
  boundaryState
) {
  if (!isCasesRouteResult(routeResult)) {
    return false;
  }

  if (routeResult.status !== CASES_ROUTE_RESULT.ROUTED) {
    return false;
  }

  if (!boundaryState || typeof boundaryState !== "object") {
    return false;
  }

  return (
    boundaryState.state ===
    CASES_BOUNDARY_STATES.HUMAN_INTERACTION
  );
}

export function createCasesAcceptanceResult(
  routeResult,
  boundaryState
) {
  const accepted = canAcceptCasesConnection(
    routeResult,
    boundaryState
  );

  return Object.freeze({
    accepted,
    status: accepted
      ? "HUMAN_INTERACTION_CONFIRMED"
      : "HUMAN_INTERACTION_REQUIRED",
    message: accepted
      ? routeResult.message
      : null
  });
}
