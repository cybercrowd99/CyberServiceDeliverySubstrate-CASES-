/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation
 *
 * ONE JOB:
 * Define the canonical structural representation of an independently
 * declared service participating through the Cyber Service Delivery
 * Substrate.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation
 *          ▼
 *   Service Participation
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
 * - mutate independent service information
 * - route requests
 * - transfer ownership
 *
 * It only defines the structural participation record used by
 * the CASES service-participation surface.
 */

export type CASESServiceParticipation = Readonly<{
  systemId: string;
  serviceId: string;
  participationId: string;
}>;
