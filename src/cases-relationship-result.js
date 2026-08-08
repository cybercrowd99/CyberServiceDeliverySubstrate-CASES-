/**
 * CASES — Relationship Result
 * 
 * ONE JOB:
 * Define the immutable result structure produced by the
 * CASES relationship gate.
 *
 * This does not:
 * - execute a service
 * - modify CASES state
 * - infer human intent
 * - create a relationship
 * - transform a connection message
 * - enrich connection data
 *
 * It only provides the bounded relationship-resolution outcome.
 */

export const CASES_RELATIONSHIP_RESULT = Object.freeze({
  RESOLVED: "RESOLVED",
  NOT_RESOLVED: "NOT_RESOLVED"
});

export function createCasesRelationshipResult(
  status,
  message = null
) {
  return Object.freeze({
    status,
    message
  });
}

export function createCasesResolvedResult(message) {
  return createCasesRelationshipResult(
    CASES_RELATIONSHIP_RESULT.RESOLVED,
    message
  );
}

export function createCasesNotResolvedResult() {
  return createCasesRelationshipResult(
    CASES_RELATIONSHIP_RESULT.NOT_RESOLVED,
    null
  );
}

export function isCasesRelationshipResult(result) {
  if (!result || typeof result !== "object") {
    return false;
  }

  return (
    result.status === CASES_RELATIONSHIP_RESULT.RESOLVED ||
    result.status === CASES_RELATIONSHIP_RESULT.NOT_RESOLVED
  );
}
