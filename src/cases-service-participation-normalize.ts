/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Normalization
 *
 * ONE JOB:
 * Normalize independently declared service-participation identifiers
 * into a stable structural representation for the CASES participation
 * surface.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          ▼
 *   Participation Declaration
 *          │
 *          ▼
 *   Validation
 *          │
 *          ▼
 *   Normalization
 *          │
 *          ▼
 *        CASES
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
 * - reinterpret metadata
 * - create identifiers
 * - change service ownership
 * - route requests
 * - perform service work
 *
 * It only performs bounded structural normalization of declared
 * participation identifiers.
 */

export type CASESServiceParticipationDeclaration = Readonly<{
  systemId: string;
  serviceId: string;
  participationId: string;
}>;

/**
 * Normalize a service-participation declaration.
 *
 * Only surrounding whitespace is removed from the declared
 * identifiers. No identifier is generated, renamed, enriched,
 * or otherwise reinterpreted.
 */
export function normalizeCASESServiceParticipation(
  participation: CASESServiceParticipationDeclaration,
): CASESServiceParticipationDeclaration {
  return Object.freeze({
    systemId: participation.systemId.trim(),
    serviceId: participation.serviceId.trim(),
    participationId: participation.participationId.trim(),
  });
}
