/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CORE → NET BINDING
 *
 * ONE JOB:
 * Bind a validated CASES Core result to the declared NET connection
 * surface without executing either side.
 *
 * The independent service remains independently owned.
 * CASES remains the service-delivery substrate.
 * CORE remains the core processing boundary.
 * NET remains the platform connection surface.
 * CyberCrowd remains the platform.
 */

export type CASESCoreNetBinding = Readonly<{
  type: "cases-core-net-binding";
  version: "CASES-CORE-NET-BINDING-1";
  bound: boolean;
  casesReference: string | null;
  coreReference: string | null;
  netReference: string | null;
}>;

export function bindCasesCoreToNet(
  casesReference: string,
  coreReference: string,
  netReference: string,
): CASESCoreNetBinding {
  if (
    typeof casesReference !== "string" ||
    casesReference.length === 0 ||
    typeof coreReference !== "string" ||
    coreReference.length === 0 ||
    typeof netReference !== "string" ||
    netReference.length === 0
  ) {
    return Object.freeze({
      type: "cases-core-net-binding",
      version: "CASES-CORE-NET-BINDING-1",
      bound: false,
      casesReference: null,
      coreReference: null,
      netReference: null,
    });
  }

  return Object.freeze({
    type: "cases-core-net-binding",
    version: "CASES-CORE-NET-BINDING-1",
    bound: true,
    casesReference,
    coreReference,
    netReference,
  });
}
