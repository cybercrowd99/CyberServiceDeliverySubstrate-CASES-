/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Query
 *
 * ONE JOB:
 * Define the bounded structural query used to identify an independently
 * declared service participation record by its declared identifiers.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation identifiers
 *          ▼
 *       CASES Query
 *          │
 *          ▼
 *   Participation Records
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
 * - transform declared identifiers
 * - reinterpret metadata
 * - route service requests
 * - transfer ownership
 *
 * It only defines the structural identifiers used to locate a declared
 * service participation record.
 */

export type CASESServiceParticipationQuery = Readonly<{
  systemId: string;
  serviceId: string;
  participationId: string;
}>;
