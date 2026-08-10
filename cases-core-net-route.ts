/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CORE → NET ROUTE
 *
 * ONE JOB:
 * Present a successfully bound CASES Core result to the declared NET
 * connection surface.
 *
 * This file does not execute services, create relationships, mutate
 * participation, or redefine ownership.
 */

export type CASESCoreNetRoute = Readonly<{
  type: "cases-core-net-route";
  version: "CASES-CORE-NET-ROUTE-1";
  routed: boolean;
  coreReference: string | null;
  netReference: string | null;
}>;

export function routeCasesCoreToNet(
  coreReference: string,
  netReference: string,
): CASESCoreNetRoute {
  if (
    typeof coreReference !== "string" ||
    coreReference.length === 0 ||
    typeof netReference !== "string" ||
    netReference.length === 0
  ) {
    return Object.freeze({
      type: "cases-core-net-route",
      version: "CASES-CORE-NET-ROUTE-1",
      routed: false,
      coreReference: null,
      netReference: null,
    });
  }

  return Object.freeze({
    type: "cases-core-net-route",
    version: "CASES-CORE-NET-ROUTE-1",
    routed: true,
    coreReference,
    netReference,
  });
}
