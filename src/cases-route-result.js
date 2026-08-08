/**
 * CASES — Route Result
 *
 * ONE JOB:
 * Provide the immutable result structure returned by the
 * CASES connection route.
 *
 * This does not:
 * - execute a service
 * - modify CASES state
 * - transform the connection message
 * - infer human intent
 * - create a relationship
 *
 * It only provides the bounded route result.
 */

export const CASES_ROUTE_RESULT = Object.freeze({
  ROUTED: "ROUTED",
  BLOCKED: "BLOCKED"
});

export function createCasesRouteResult(
  status,
  message = null
) {
  return Object.freeze({
    status,
    message
  });
}

export function createCasesRoutedResult(message) {
  return createCasesRouteResult(
    CASES_ROUTE_RESULT.ROUTED,
    message
  );
}

export function createCasesBlockedResult() {
  return createCasesRouteResult(
    CASES_ROUTE_RESULT.BLOCKED,
    null
  );
}

export function isCasesRouteResult(result) {
  if (!result || typeof result !== "object") {
    return false;
  }

  return (
    result.status === CASES_ROUTE_RESULT.ROUTED ||
    result.status === CASES_ROUTE_RESULT.BLOCKED
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CASES_ROUTE_RESULT,
    createCasesRouteResult,
    createCasesRoutedResult,
    createCasesBlockedResult,
    isCasesRouteResult
  };
}
