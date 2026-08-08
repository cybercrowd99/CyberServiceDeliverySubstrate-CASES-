/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Router Result
 *
 * ONE JOB:
 * Provide the immutable structural result produced by the CASES
 * service-participation routing surface.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          ▼
 *   Participation Record
 *          │
 *          ▼
 *   Participation Router
 *          │
 *          ▼
 *   Router Result
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
 * It only records the structural routing result without changing the
 * information declared by the participating service.
 */

import {
  CASESServiceParticipationRoute,
} from "./cases-service-participation-router";

export type CASESServiceParticipationRouterResult = Readonly<{
  routed: boolean;
  route: CASESServiceParticipationRoute | undefined;
}>;
