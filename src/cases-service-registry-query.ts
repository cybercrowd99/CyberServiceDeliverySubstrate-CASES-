/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Query
 *
 * ONE JOB:
 * Define the immutable structural query used to look up an independently
 * declared service-participation descriptor in the CASES service registry.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ owns service capability + behavior
 *          ▼
 *        CASES
 *          │
 *          │ owns bounded registry lookup surface
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
 * - transform service behavior
 * - enrich service metadata
 * - transfer ownership
 * - determine what a service should do
 *
 * It only defines what is structurally required to identify a service
 * participation descriptor for lookup.
 *
 * A registry query is a lookup description, not an execution request.
 */

export type CASESServiceRegistryQuery = Readonly<{
  systemId: string;
  serviceId: string;
}>;

/**
 * Create an immutable service-registry query.
 *
 * The query contains only the identifiers necessary to locate a declared
 * participation descriptor.
 *
 * No service behavior is invoked, inferred, transformed, or authorized.
 */
export function createCASESServiceRegistryQuery(
  systemId: string,
  serviceId: string,
): CASESServiceRegistryQuery {
  return Object.freeze({
    systemId,
    serviceId,
  });
}
