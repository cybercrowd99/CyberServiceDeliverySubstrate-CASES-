/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Core Router
 *
 * ONE JOB:
 * Select the bounded structural route for a validated CASES
 * core connection.
 *
 * The router does not execute the selected route.
 *
 * Boundary:
 *
 * CORE INPUT
 *    |
 *    v
 * VALIDATED CORE STRUCTURE
 *    |
 *    v
 * CORE ROUTER
 *    |
 *    v
 * DECLARED ROUTE
 *
 * The route is a structural destination only.
 *
 * This module does NOT:
 * - execute an independent service
 * - invoke capabilities
 * - interpret capabilities
 * - authorize access
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation records
 * - alter CASES history
 * - create ledger records
 * - settle payments
 * - assign economic value
 * - control CyberCrowd
 * - absorb independent service ownership
 *
 * The independent service remains the service.
 * CASES remains the connection substrate.
 * CyberCrowd remains the platform.
 */

export type CASESCoreRoute =
  | "SERVICE"
  | "PARTICIPATION"
  | "CYBERCROWD_BOUNDARY";

export interface CASESCoreRouteRequest {
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
}

export interface CASESCoreRouteResult {
  readonly type: "cases-core-route-result";
  readonly version: "CASES-CORE-ROUTE-1";
  readonly route: CASESCoreRoute;
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
}

export class CASESCoreRouter {
  route(
    request: CASESCoreRouteRequest
  ): CASESCoreRouteResult {
    const serviceReference = cleanId(
      request.serviceReference
    );

    const descriptorReference = cleanId(
      request.descriptorReference
    );

    const participationReference = cleanId(
      request.participationReference
    );

    const connectionSurface = cleanId(
      request.connectionSurface
    );

    const selectedRoute =
      connectionSurface === "CYBERCROWD"
        ? "CYBERCROWD_BOUNDARY"
        : participationReference
          ? "PARTICIPATION"
          : "SERVICE";

    return Object.freeze({
      type: "cases-core-route-result",
      version: "CASES-CORE-ROUTE-1",
      route: selectedRoute,
      serviceReference,
      descriptorReference,
      participationReference,
      connectionSurface
    });
  }
}

export const casesCoreRouter =
  new CASESCoreRouter();

function cleanId(value: unknown): string {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return "";
  }

  return String(value)
    .trim()
    .slice(0, 128);
}
