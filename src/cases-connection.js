/**
 * CASES — Explicit Connection
 *
 * ONE JOB:
 * Represent a CASES connection only after the boundary has reached
 * EXPLICIT_RELATIONSHIP.
 *
 * This does not:
 * - infer human intent
 * - create a relationship
 * - execute a service
 * - select a service
 * - absorb an independent system
 * - replace CyberCrowd
 *
 * It only represents an already resolved connection.
 */

import { CASES_BOUNDARY_STATES } from "./cases-boundary.js";

export function createCasesConnection(boundaryState) {
  if (!boundaryState || typeof boundaryState !== "object") {
    throw new TypeError("Invalid CASES boundary state");
  }

  if (
    boundaryState.state !==
    CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  ) {
    throw new Error(
      "CASES connection requires EXPLICIT_RELATIONSHIP"
    );
  }

  return Object.freeze({
    state: CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  });
}

export function isCasesConnection(connection) {
  return (
    !!connection &&
    typeof connection === "object" &&
    connection.state ===
      CASES_BOUNDARY_STATES.EXPLICIT_RELATIONSHIP
  );
}
