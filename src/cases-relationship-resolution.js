/**
 * CASES — Relationship Resolution
 * 
 * ONE JOB:
 * Resolve an existing CASES relationship result into a final
 * bounded connection representation without creating new authority,
 * service execution, or behavioral interpretation.
 *
 * This does not:
 * - execute a service
 * - absorb an independent system
 * - infer human intent
 * - create a relationship
 * - modify CASES state
 * - transform or enrich the message
 *
 * It only exposes the already-resolved relationship.
 */

import {
  CASES_RELATIONSHIP_RESULT,
  isCasesRelationshipResult
} from "./cases-relationship-result.js";

export function resolveCasesRelationshipResult(result) {
  if (!isCasesRelationshipResult(result)) {
    return Object.freeze({
      resolved: false,
      status: CASES_RELATIONSHIP_RESULT.NOT_RESOLVED,
      message: null
    });
  }

  if (
    result.status !==
    CASES_RELATIONSHIP_RESULT.RESOLVED
  ) {
    return Object.freeze({
      resolved: false,
      status: CASES_RELATIONSHIP_RESULT.NOT_RESOLVED,
      message: null
    });
  }

  return Object.freeze({
    resolved: true,
    status: CASES_RELATIONSHIP_RESULT.RESOLVED,
    message: result.message
  });
}
