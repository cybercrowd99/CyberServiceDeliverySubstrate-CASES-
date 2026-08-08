/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Validation
 *
 * ONE JOB:
 * Validate the structural identifiers required for a bounded CASES
 * service-registry lookup.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation
 *          ▼
 *        CASES
 *          │
 *          │ validates connection identifiers only
 *          ▼
 *      Registry Lookup
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
 * - create a relationship
 * - activate service behavior
 * - transform service descriptors
 * - enrich service metadata
 * - resolve service capabilities
 * - route requests
 * - move data beyond the declared validation surface
 *
 * It only validates the structural shape of a registry query.
 *
 * Validation is structural, not interpretive.
 */

import {
  CASESServiceRegistryQuery,
} from "./cases-service-registry-query";

export type CASESServiceRegistryValidationResult = Readonly<{
  valid: boolean;
  query: CASESServiceRegistryQuery | null;
}>;

/**
 * Validate a CASES registry query.
 *
 * Validation is limited to the presence of non-empty systemId and
 * serviceId identifiers. No capability, intent, authorization,
 * relationship, or service behavior is inferred from either value.
 */
export function validateCASESServiceRegistryQuery(
  query: CASESServiceRegistryQuery,
): CASESServiceRegistryValidationResult {
  const valid =
    typeof query.systemId === "string" &&
    query.systemId.length > 0 &&
    typeof query.serviceId === "string" &&
    query.serviceId.length > 0;

  if (!valid) {
    return Object.freeze({
      valid: false,
      query: null,
    });
  }

  return Object.freeze({
    valid: true,
    query,
  });
}
