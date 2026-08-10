/**
 * CASES — Cyber Service Delivery Substrate
 *
 * NET → Organ Binding
 *
 * ONE JOB:
 * Carry an existing organ reference into the CASES NET surface.
 *
 * This module does not:
 * - execute an organ
 * - define organ behavior
 * - authorize access
 * - create relationships
 * - mutate CASES state
 * - perform platform actions
 */

export type CASESNetOrganBinding = Readonly<{
  type: "cases-net-organ-binding";
  version: "CASES-NET-ORGAN-BINDING-1";
  organReference: string;
  netReference: string;
}>;

export function bindOrganToNet(
  organReference: string,
  netReference: string
): CASESNetOrganBinding | null {
  if (
    typeof organReference !== "string" ||
    organReference.trim().length === 0 ||
    typeof netReference !== "string" ||
    netReference.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    type: "cases-net-organ-binding",
    version: "CASES-NET-ORGAN-BINDING-1",
    organReference: organReference.trim(),
    netReference: netReference.trim()
  });
}
