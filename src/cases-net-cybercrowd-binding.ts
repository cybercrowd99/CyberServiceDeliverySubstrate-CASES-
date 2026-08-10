/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES NET → CyberCrowd Binding
 *
 * ONE JOB:
 * Bind an established CASES NET connection to the CyberCrowd
 * connection surface.
 *
 * This module does not:
 * - execute an independent service
 * - define service capabilities
 * - authorize a user
 * - create a relationship
 * - mutate CASES state
 * - perform service work
 * - assign economic value
 * - absorb independent service ownership
 *
 * It only establishes the structural NET → CyberCrowd binding.
 */

export type CASESNetCyberCrowdBinding = Readonly<{
  type: "cases-net-cybercrowd-binding";
  version: "CASES-NET-CYBERCROWD-BINDING-1";
  netReference: string;
  cyberCrowdReference: string;
}>;

export function bindCASESNettToCyberCrowd(
  netReference: string,
  cyberCrowdReference: string
): CASESNetCyberCrowdBinding | null {
  if (
    typeof netReference !== "string" ||
    netReference.trim().length === 0 ||
    typeof cyberCrowdReference !== "string" ||
    cyberCrowdReference.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    type: "cases-net-cybercrowd-binding",
    version: "CASES-NET-CYBERCROWD-BINDING-1",
    netReference: netReference.trim(),
    cyberCrowdReference: cyberCrowdReference.trim()
  });
}
