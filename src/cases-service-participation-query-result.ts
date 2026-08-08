/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Query Result
 *
 * ONE JOB:
 * Provide the immutable structural result of a service-participation
 * query without executing, interpreting, or modifying the participation
 * information being returned.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation
 *          ▼
 *   Participation Records
 *          │
 *          ▼
 *       CASES Query
 *          │
 *          ▼
 *   Query Result
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
 * - mutate the participation record
 * - transfer ownership
 *
 * It only defines the immutable structural result returned when a
 * participation record is located by its declared identifiers.
 */

import {
  CASESServiceParticipation,
} from "./cases-service-participation";

export type CASESServiceParticipationQueryResult = Readonly<{
  found: boolean;
  participation: CASESServiceParticipation | undefined;
}>;
