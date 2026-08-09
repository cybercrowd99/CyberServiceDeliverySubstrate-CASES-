/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CORE → SERVICE PARTICIPATION BINDING
 *
 * ONE JOB:
 * Convert a routed CASES Core result into a bounded service-participation
 * request without creating, mutating, authorizing, or owning the
 * participation record.
 *
 * Boundary:
 *
 * CORE RESULT
 *     |
 *     v
 * CORE → SERVICE PARTICIPATION BINDING
 *     |
 *     v
 * CASES SERVICE PARTICIPATION
 *
 * This module is a binding surface only.
 *
 * It does NOT:
 * - create service participation
 * - mutate participation records
 * - authorize participation
 * - grant service permissions
 * - execute an independent service
 * - resolve relationships
 * - modify service descriptors
 * - create identity authority
 * - create ledger history
 * - assign economic value
 * - route CyberCrowd traffic
 * - own the independent service
 *
 * Rule:
 *   CORE provides the routed structural result.
 *   SERVICE PARTICIPATION owns participation semantics.
 *   This file only binds the two boundaries.
 */

import type {
  CASESCoreResult,
  CASESCoreRoute
} from "./cases-core-result";

export interface CASESCoreServiceParticipationRequest {
  readonly type: "cases-core-service-participation-request";
  readonly version: "CASES-CORE-SERVICE-PARTICIPATION-1";
  readonly route: CASESCoreRoute;
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
}

export type CASESCoreServiceParticipationBindingResult =
  | {
      readonly type: "cases-core-service-participation-binding-result";
      readonly version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1";
      readonly status: "BOUND";
      readonly request: CASESCoreServiceParticipationRequest;
      readonly errors: readonly [];
    }
  | {
      readonly type: "cases-core-service-participation-binding-result";
      readonly version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1";
      readonly status: "NOT_BOUND";
      readonly request: null;
      readonly errors: readonly string[];
    };

function cleanReference(value: string): string {
  return value.trim();
}

function requireReference(
  value: string | null,
  fieldName: string
): string {
  if (typeof value !== "string" || cleanReference(value).length === 0) {
    throw new Error(`${fieldName.toUpperCase()}_IS_REQUIRED`);
  }

  return cleanReference(value);
}

/**
 * Bind a routed CORE result to the service-participation boundary.
 *
 * This does not execute the participation operation.
 * It produces only the immutable request structure required by
 * the service-participation layer.
 */
export function bindCasesCoreResultToServiceParticipation(
  result: CASESCoreResult
): CASESCoreServiceParticipationBindingResult {
  if (
    result === null ||
    typeof result !== "object" ||
    result.type !== "cases-core-result"
  ) {
    return Object.freeze({
      type: "cases-core-service-participation-binding-result",
      version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1",
      status: "NOT_BOUND",
      request: null,
      errors: Object.freeze(["INVALID_CORE_RESULT"])
    });
  }

  if (result.status !== "ROUTED") {
    return Object.freeze({
      type: "cases-core-service-participation-binding-result",
      version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1",
      status: "NOT_BOUND",
      request: null,
      errors: Object.freeze([
        "CORE_RESULT_NOT_ROUTED"
      ])
    });
  }

  if (result.route !== "SERVICE" && result.route !== "PARTICIPATION") {
    return Object.freeze({
      type: "cases-core-service-participation-binding-result",
      version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1",
      status: "NOT_BOUND",
      request: null,
      errors: Object.freeze([
        "CORE_RESULT_ROUTE_NOT_SERVICE_PARTICIPATION"
      ])
    });
  }

  try {
    const request: CASESCoreServiceParticipationRequest =
      Object.freeze({
        type: "cases-core-service-participation-request",
        version: "CASES-CORE-SERVICE-PARTICIPATION-1",
        route: result.route,
        serviceReference: requireReference(
          result.serviceReference,
          "serviceReference"
        ),
        descriptorReference: requireReference(
          result.descriptorReference,
          "descriptorReference"
        ),
        participationReference: requireReference(
          result.participationReference,
          "participationReference"
        ),
        connectionSurface: requireReference(
          result.connectionSurface,
          "connectionSurface"
        )
      });

    return Object.freeze({
      type: "cases-core-service-participation-binding-result",
      version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1",
      status: "BOUND",
      request,
      errors: Object.freeze([])
    });
  } catch (error) {
    return Object.freeze({
      type: "cases-core-service-participation-binding-result",
      version: "CASES-CORE-SERVICE-PARTICIPATION-RESULT-1",
      status: "NOT_BOUND",
      request: null,
      errors: Object.freeze([
        error instanceof Error
          ? error.message
          : "CORE_SERVICE_PARTICIPATION_BINDING_FAILED"
      ])
    });
  }
}
