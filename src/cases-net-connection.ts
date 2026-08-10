 /**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES NET Connection
 *
 * ONE JOB:
 * Define the bounded connection record presented by the CASES
 * CORE → NET binding to the CyberCrowd NET surface.
 *
 * CORE → NET BINDING
 *        |
 *        v
 *   NET CONNECTION
 *        |
 *        v
 *   CYBERCROWD NET
 *
 * This module does not:
 * - execute an independent service
 * - define service capability
 * - authorize access
 * - create relationships
 * - mutate CASES state
 * - perform platform actions
 * - reinterpret CORE state
 * - absorb independent service ownership
 */

export type CASESNetConnection = Readonly<{
  type: "cases-net-connection";
  version: "CASES-NET-CONNECTION-1";
  coreReference: string;
  netReference: string;
}>;

export function createCASESNetConnection(
  coreReference: string,
  netReference: string
): CASESNetConnection | null {
  if (
    typeof coreReference !== "string" ||
    coreReference.trim().length === 0
  ) {
    return null;
  }

  if (
    typeof netReference !== "string" ||
    netReference.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    type: "cases-net-connection",
    version: "CASES-NET-CONNECTION-1",
    coreReference: coreReference.trim(),
    netReference: netReference.trim()
  });
}
