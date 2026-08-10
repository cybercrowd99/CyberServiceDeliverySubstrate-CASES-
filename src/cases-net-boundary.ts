/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES NET Boundary
 *
 * ONE JOB:
 * Define the bounded handoff from the CASES CORE operational surface
 * to the CyberCrowd NET public surface.
 *
 * CORE
 *   |
 *   v
 * CASES NET BOUNDARY
 *   |
 *   v
 * NET
 *
 * This module does not:
 * - execute the independent service
 * - define service capabilities
 * - authorize participation
 * - create relationships
 * - mutate CASES state
 * - perform platform actions
 * - own the independent service
 *
 * It only establishes the structural boundary through which an
 * already-resolved CASES core result may be exposed to NET.
 */

export type CASESNetBoundaryResult = Readonly<{
  type: "cases-net-boundary-result";
  version: "CASES-NET-BOUNDARY-1";
  exposed: boolean;
  coreReference: string | null;
}>;

export function exposeCASESCarefullyToNet(
  coreReference: string
): CASESNetBoundaryResult {
  if (
    typeof coreReference !== "string" ||
    coreReference.trim().length === 0
  ) {
    return Object.freeze({
      type: "cases-net-boundary-result",
      version: "CASES-NET-BOUNDARY-1",
      exposed: false,
      coreReference: null
    });
  }

  return Object.freeze({
    type: "cases-net-boundary-result",
    version: "CASES-NET-BOUNDARY-1",
    exposed: true,
    coreReference: coreReference.trim()
  });
}
