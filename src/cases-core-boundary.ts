/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CORE BOUNDARY
 *
 * ONE JOB:
 * Define the immutable boundary result presented by CASES Core
 * after the CORE validation → routing → result sequence.
 *
 * Boundary:
 *
 *   CASES INPUT
 *       |
 *       v
 *   CORE VALIDATION
 *       |
 *       v
 *   CORE ROUTER
 *       |
 *       v
 *   CORE RESULT
 *       |
 *       v
 *   CORE BOUNDARY
 *       |
 *       v
 *   CASES BUS / DECLARED OUTER BOUNDARY
 *
 * This module is a boundary declaration and result adapter.
 *
 * It does NOT:
 * - execute services
 * - create service participation
 * - mutate participation
 * - authorize access
 * - grant permissions
 * - infer intent
 * - create relationships
 * - mutate service descriptors
 * - create ledger history
 * - assign economic value
 * - settle payments
 * - control CyberCrowd
 * - absorb independent service ownership
 *
 * Ownership:
 *   CORE owns CORE processing.
 *   CASES owns service-delivery substrate semantics.
 *   Independent services retain independent ownership.
 *   CyberCrowd remains the platform.
 */

import type { CASESCoreResult } from "./cases-core-result";

export type CASESCoreBoundaryStatus =
  | "ACCEPTED"
  | "REJECTED";

export interface CASESCoreBoundaryResult {
  readonly type: "cases-core-boundary-result";
  readonly version: "CASES-CORE-BOUNDARY-1";
  readonly status: CASESCoreBoundaryStatus;
  readonly coreResult: CASESCoreResult | null;
  readonly errors: readonly string[];
}

function freezeErrors(errors: readonly string[]): readonly string[] {
  return Object.freeze([...errors]);
}

/**
 * Present a valid CORE result at the CASES Core boundary.
 *
 * No transformation of the CORE result is performed.
 * The original structural result is preserved.
 */
export function acceptCasesCoreBoundaryResult(
  coreResult: CASESCoreResult
): CASESCoreBoundaryResult {
  if (
    coreResult === null ||
    typeof coreResult !== "object" ||
    coreResult.type !== "cases-core-result"
  ) {
    return Object.freeze({
      type: "cases-core-boundary-result",
      version: "CASES-CORE-BOUNDARY-1",
      status: "REJECTED",
      coreResult: null,
      errors: freezeErrors(["INVALID_CORE_RESULT"])
    });
  }

  return Object.freeze({
    type: "cases-core-boundary-result",
    version: "CASES-CORE-BOUNDARY-1",
    status: "ACCEPTED",
    coreResult,
    errors: freezeErrors([])
  });
}

/**
 * Reject a CORE result at the CASES Core boundary.
 *
 * Rejection does not mutate the supplied CORE result.
 */
export function rejectCasesCoreBoundaryResult(
  errors: readonly string[]
): CASESCoreBoundaryResult {
  return Object.freeze({
    type: "cases-core-boundary-result",
    version: "CASES-CORE-BOUNDARY-1",
    status: "REJECTED",
    coreResult: null,
    errors: freezeErrors(errors)
  });
}

/**
 * Single binding surface for presenting CORE output
 * to the CASES outer boundary.
 */
export function presentCasesCoreBoundary(
  coreResult: CASESCoreResult
): CASESCoreBoundaryResult {
  return acceptCasesCoreBoundaryResult(coreResult);
}
