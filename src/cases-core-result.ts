/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Core Result
 *
 * ONE JOB:
 * Define the immutable structural result returned by the CASES
 * core boundary after validation and routing.
 *
 * Boundary:
 *
 * CORE INPUT
 *    |
 *    v
 * CORE VALIDATION
 *    |
 *    v
 * CORE ROUTER
 *    |
 *    v
 * CORE RESULT
 *    |
 *    v
 * CASES BUS / DECLARED BOUNDARY
 *
 * This module is declarative only.
 *
 * It does NOT:
 * - execute an independent service
 * - invoke service capabilities
 * - infer capabilities
 * - authorize access
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation records
 * - create relationships
 * - create ledger history
 * - assign economic value
 * - settle payments
 * - control CyberCrowd
 * - absorb independent service ownership
 *
 * The independent service remains independently owned.
 * CASES remains the service-delivery substrate.
 * CyberCrowd remains the platform.
 */

export type CASESCoreResultStatus =
  | "ROUTED"
  | "NOT_ROUTED";

export type CASESCoreRoute =
  | "SERVICE"
  | "PARTICIPATION"
  | "CYBERCROWD_BOUNDARY";

export interface CASESCoreResult {
  readonly type: "cases-core-result";
  readonly version: "CASES-CORE-RESULT-1";
  readonly status: CASESCoreResultStatus;
  readonly route: CASESCoreRoute | null;
  readonly serviceReference: string | null;
  readonly descriptorReference: string | null;
  readonly participationReference: string | null;
  readonly connectionSurface: string | null;
  readonly errors: readonly string[];
}

export function casesCoreRoutedResult(
  route: CASESCoreRoute,
  serviceReference: string,
  descriptorReference: string,
  participationReference: string,
  connectionSurface: string
): CASESCoreResult {
  return Object.freeze({
    type: "cases-core-result",
    version: "CASES-CORE-RESULT-1",
    status: "ROUTED",
    route,
    serviceReference,
    descriptorReference,
    participationReference,
    connectionSurface,
    errors: Object.freeze([])
  });
}

export function casesCoreNotRoutedResult(
  errors: readonly string[]
): CASESCoreResult {
  return Object.freeze({
    type: "cases-core-result",
    version: "CASES-CORE-RESULT-1",
    status: "NOT_ROUTED",
    route: null,
    serviceReference: null,
    descriptorReference: null,
    participationReference: null,
    connectionSurface: null,
    errors: Object.freeze([...errors])
  });
}
