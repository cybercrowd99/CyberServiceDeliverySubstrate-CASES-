/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Descriptor
 *
 * ONE JOB:
 * Provide the canonical immutable descriptor representing an independently
 * declared service-participation surface after structural normalization.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation identifiers
 *          ▼
 *        CASES
 *          │
 *          │ canonical descriptor only
 *          ▼
 *    Registry Descriptor
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
 * - transform identifiers
 * - enrich descriptors
 * - reinterpret metadata
 * - route requests
 * - transfer ownership
 *
 * It only defines the canonical structural descriptor.
 *
 * Independent Service → CASES → CyberCrowd
 */

export type CASESServiceRegistryDescriptor = Readonly<{
  systemId: string;
  serviceId: string;
}>;

/**
 * Create a canonical registry descriptor.
 *
 * The descriptor is structurally immutable and contains only the
 * identifiers declared by the independent participant.
 *
 * No enrichment, transformation, inference, or semantic interpretation
 * occurs here.
 */
export function createCASESServiceRegistryDescriptor(
  systemId: string,
  serviceId: string,
): CASESServiceRegistryDescriptor {
  return Object.freeze({
    systemId,
    serviceId,
  });
}
