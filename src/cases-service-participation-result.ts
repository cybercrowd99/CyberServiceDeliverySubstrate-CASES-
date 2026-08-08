/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Result
 *
 * ONE JOB:
 * Provide an immutable structural result representing the outcome
 * of a CASES service-participation routing operation.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declared participation
 *          ▼
 *   Participation Envelope
 *          │
 *          ▼
 *   Participation Router
 *          │
 *          ▼
 *   Participation Result
 *          │
 *          ▼
 *        CASES
 *          │
 *          ▼
 *      CyberCrowd
 *
 * This module does not:
 * - execute a service
 * - invoke a service
 * - infer capability
 * - infer intent
 * - authorize an action
 * - create relationships
 * - activate service behavior
 * - enrich participation data
 * - transform identifiers
 * - reinterpret metadata
 * - mutate the participation envelope
 * - mutate routing state
 * - route requests
 * - transfer ownership
 *
 * It only provides the immutable structural result of a
 * participation-routing operation.
 */

export type CASESServiceParticipationResult = Readonly<{
  systemId: string;
  serviceId: string;
  participationId: string;
  route: string;
}>;

/**
 * Create an immutable service-participation result.
 *
 * The result preserves the identifiers and structural route declared
 * by the participation-routing operation. No enrichment, inference,
 * transformation, or service execution occurs.
 */
export function createCASESServiceParticipationResult(
  systemId: string,
  serviceId: string,
  participationId: string,
  route: string,
): CASESServiceParticipationResult {
  return Object.freeze({
    systemId,
    serviceId,
    participationId,
    route,
  });
}
