/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CyberCrowd → Participation Binding
 *
 * ONE JOB:
 * Carry an existing CyberCrowd reference into the Participation surface.
 *
 * This module does not:
 * - run a service
 * - define abilities
 * - authorize anyone
 * - create relationships
 * - change CASES data
 * - perform platform actions
 */

export type CASESCyberCrowdParticipationBinding = Readonly<{
  type: "cases-cybercrowd-participation-binding";
  version: "CASES-CYBERCROWD-PARTICIPATION-BINDING-1";
  cyberCrowdReference: string;
  participationReference: string;
}>;

export function bindCyberCrowdToParticipation(
  cyberCrowdReference: string,
  participationReference: string
): CASESCyberCrowdParticipationBinding | null {
  if (
    typeof cyberCrowdReference !== "string" ||
    cyberCrowdReference.trim().length === 0 ||
    typeof participationReference !== "string" ||
    participationReference.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    type: "cases-cybercrowd-participation-binding",
    version: "CASES-CYBERCROWD-PARTICIPATION-BINDING-1",
    cyberCrowdReference: cyberCrowdReference.trim(),
    participationReference: participationReference.trim()
  });
}
