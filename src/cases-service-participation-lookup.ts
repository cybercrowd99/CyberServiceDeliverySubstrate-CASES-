/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Lookup
 *
 * ONE JOB:
 * Provide a bounded structural lookup surface for immutable
 * service-participation results identified by their declared
 * participation identifiers.
 *
 * Ownership boundary:
 *
 *   Service Participation Result
 *          │
 *          │ canonical structural record
 *          ▼
 *   Participation Lookup
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
 * - enrich participation records
 * - transform identifiers
 * - reinterpret metadata
 * - mutate participation results
 * - change participation state
 * - route requests
 * - transfer ownership
 *
 * It only provides a stable read-only lookup structure for
 * canonical service-participation results.
 */

import {
  CASESServiceParticipationResult,
} from "./cases-service-participation-result";

export type CASESServiceParticipationLookup = Readonly<{
  get: (
    systemId: string,
    serviceId: string,
    participationId: string,
  ) => CASESServiceParticipationResult | undefined;
}>;

/**
 * Create an immutable participation lookup.
 *
 * Results are stored under their declared system, service, and
 * participation identifiers. No enrichment, transformation,
 * interpretation, or service execution occurs.
 */
export function createCASESServiceParticipationLookup(
  results: CASESServiceParticipationResult[],
): CASESServiceParticipationLookup {
  const map = new Map<string, CASESServiceParticipationResult>();

  for (const result of results) {
    map.set(
      `${result.systemId}:${result.serviceId}:${result.participationId}`,
      result,
    );
  }

  return Object.freeze({
    get(
      systemId: string,
      serviceId: string,
      participationId: string,
    ) {
      return map.get(
        `${systemId}:${serviceId}:${participationId}`,
      );
    },
  });
}
