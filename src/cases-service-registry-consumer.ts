/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Descriptor Index Consumer
 *
 * ONE JOB:
 * Provide a bounded read-only consumer surface for the immutable
 * service-registry descriptor index.
 *
 * Ownership boundary:
 *
 *   Immutable Descriptor Index
 *          │
 *          │ read-only lookup
 *          ▼
 *   Descriptor Index Consumer
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
 * - enrich descriptors
 * - transform identifiers
 * - reinterpret metadata
 * - mutate descriptors
 * - mutate the descriptor index
 * - route requests
 * - transfer ownership
 *
 * It only consumes the canonical descriptor index through its
 * declared read-only lookup surface.
 */

import {
  CASESServiceRegistryDescriptor,
  CASESServiceRegistryDescriptorIndex,
} from "./cases-service-registry-descriptor-index";

export type CASESServiceRegistryDescriptorConsumer = Readonly<{
  get: (
    systemId: string,
    serviceId: string,
  ) => CASESServiceRegistryDescriptor | undefined;
}>;

/**
 * Create a bounded consumer for the immutable descriptor index.
 *
 * The consumer performs read-only descriptor lookup through the
 * index's declared get operation. It does not copy, modify, enrich,
 * or reinterpret the descriptor.
 */
export function createCASESServiceRegistryDescriptorConsumer(
  index: CASESServiceRegistryDescriptorIndex,
): CASESServiceRegistryDescriptorConsumer {
  return Object.freeze({
    get(systemId: string, serviceId: string) {
      return index.get(systemId, serviceId);
    },
  });
}
