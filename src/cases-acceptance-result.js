/**
 * CASES — Acceptance Result
 * 
 * ONE JOB:
 * Define the immutable result structure produced by the
 * CASES acceptance gate.
 *
 * This does not:
 * - execute a service
 * - modify CASES state
 * - infer human intent
 * - create a relationship
 * - transform a connection message
 *
 * It only provides the bounded acceptance outcome.
 */

export const CASES_ACCEPTANCE_RESULT = Object.freeze({
  ACCEPTED: "ACCEPTED",
  HUMAN_INTERACTION_REQUIRED: "HUMAN_INTERACTION_REQUIRED"
});

export function createCasesAcceptanceResult(
  status,
  message = null
) {
  return Object.freeze({
    status,
    message
  });
}

export function createCasesAcceptedResult(message) {
  return createCasesAcceptanceResult(
    CASES_ACCEPTANCE_RESULT.ACCEPTED,
    message
  );
}

export function createCasesInteractionRequiredResult() {
  return createCasesAcceptanceResult(
    CASES_ACCEPTANCE_RESULT.HUMAN_INTERACTION_REQUIRED,
    null
  );
}

export function isCasesAcceptanceResult(result) {
  if (!result || typeof result !== "object") {
    return false;
  }

  return (
    result.status === CASES_ACCEPTANCE_RESULT.ACCEPTED ||
    result.status ===
      CASES_ACCEPTANCE_RESULT.HUMAN_INTERACTION_REQUIRED
  );
}
