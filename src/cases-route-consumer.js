/**
 * CASES — Route Consumer
 *
 * ONE JOB:
 * Consume a CASES route result without executing a service,
 * changing CASES state, or interpreting human intent.
 *
 * This does not:
 * - execute an independent service
 * - absorb an independent system
 * - modify the routed message
 * - infer human intent
 * - create a relationship
 * - replace CyberCrowd
 *
 * It only exposes the bounded route outcome to the next layer.
 */

import {
  CASES_ROUTE_RESULT,
  isCasesRouteResult
} from "./cases-route-result.js";

export function consumeCasesRouteResult(result) {
  if (!isCasesRouteResult(result)) {
    return Object.freeze({
      accepted: false,
      status: CASES_ROUTE_RESULT.BLOCKED,
      message: null
    });
  }

  if (result.status === CASES_ROUTE_RESULT.BLOCKED) {
    return Object.freeze({
      accepted: false,
      status: CASES_ROUTE_RESULT.BLOCKED,
      message: null
    });
  }

  return Object.freeze({
    accepted: true,
    status: CASES_ROUTE_RESULT.ROUTED,
    message: result.message
  });
}
