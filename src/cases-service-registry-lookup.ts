/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Lookup
 *
 * ONE JOB:
 * Perform a bounded lookup of an independently declared service-
 * participation descriptor within the CASES service registry.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ owns capability + behavior
 *          ▼
 *      CASES Registry
 *          │
 *          │ bounded lookup only
 *          ▼
 *     Registry Result
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
 * - transform descriptors
 * - enrich descriptors
 * - redefine service behavior
 * - transfer ownership
 *
 * It only performs the declared identifier lookup and returns the
 * corresponding registry result.
 */

import {
  CASESServiceRegistry,
} from "./cases-service-registry";

import {
  CASESServiceRegistryQuery,
} from "./cases-service-registry-query";

import {
  CASESServiceRegistryResult,
  serviceRegistryFound,
  serviceRegistryNotFound,
} from "./cases-service-registry-result";

export function lookupCASESServiceRegistry(
  registry: CASESServiceRegistry,
  query: CASESServiceRegistryQuery,
): CASESServiceRegistryResult {
  const participation = registry.get(
    query.systemId,
    query.serviceId,
  );

  if (participation === undefined) {
    return serviceRegistryNotFound();
  }

  return serviceRegistryFound(participation);
}
