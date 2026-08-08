/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Descriptor Index
 *
 * ONE JOB:
 * Provide an immutable, canonical index of service-registry descriptors
 * keyed by independently declared identifiers.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation identifiers
 *          ▼
 *        CASES
 *          │
 *          │ canonical index only
 *          ▼
 *    Registry Descriptor Index
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
 * - enrich descriptors
 * - transform identifiers
 * - reinterpret metadata
 * - route requests
 * - transfer ownership
 *
 * It only provides a structural index of canonical descriptors.
 */

import {
  CASESServiceRegistryDescriptor,
} from "./cases-service-registry-descriptor";

export type CASESServiceRegistryDescriptorIndex = Readonly<{
  get: (
    systemId: string,
    serviceId: string,
  ) => CASESServiceRegistryDescriptor | undefined;
}>;

/**
 * Create an immutable descriptor index.
 *
 * The index stores canonical descriptors keyed by their declared
 * identifiers. No enrichment, transformation, or interpretation occurs.
 */
export function createCASESServiceRegistryDescriptorIndex(
  descriptors: CASESServiceRegistryDescriptor[],
): CASESServiceRegistryDescriptorIndex {
  const map = new Map<string, CASESServiceRegistryDescriptor>();

  for (const d of descriptors) {
    map.set(`${d.systemId}:${d.serviceId}`, d);
  }

  return Object.freeze({
    get(systemId: string, serviceId: string) {
      return map.get(`${systemId}:${serviceId}`);
    },
  });
}
