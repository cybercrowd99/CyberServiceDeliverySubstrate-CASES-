/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CORE → NET Binding
 *
 * ONE JOB:
 * Define the bounded structural binding between the CASES CORE
 * operational surface and the CASES NET public connection surface.
 *
 * CORE
 *   |
 *   v
 * CORE → NET BINDING
 *   |
 *   v
 * NET
 *
 * This module does not:
 * - execute an independent service
 * - define service capabilities
 * - authorize access
 * - create relationships
 * - mutate participation records
 * - mutate CASES state
 * - perform platform actions
 * - expose unresolved CASES state
 * - absorb independent service ownership
 *
 * It only carries an already-established CORE reference across the
 * CORE → NET boundary.
 */

export type CASESCoreNetBinding = Readonly<{
  type: "cases-core-net-binding";
  version: "CASES-CORE-NET-BINDING-1";
  coreReference: string;
  netReference: string;
}>;

export function bindCASESCcoreToNet(
  coreReference: string,
  netReference: string
): CASESCoreNetBinding | null {
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
    type: "cases-core-net-binding",
    version: "CASES-CORE-NET-BINDING-1",
    coreReference: coreReference.trim(),
    netReference: netReference.trim()
  });
}
