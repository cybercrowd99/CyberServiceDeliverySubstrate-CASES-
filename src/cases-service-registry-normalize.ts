/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Normalize
 *
 * ONE JOB:
 * Provide a structurally immutable CASES service-registry descriptor
 * in the canonical registry shape without changing its declared
 * identifiers or interpreting its meaning.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation
 *          ▼
 *        CASES
 *          │
 *          │ canonical structural representation only
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
 * - transform service identifiers
 * - enrich descriptors
 * - reinterpret service metadata
 * - route requests
 * - move data beyond the declared surface
 * - redefine the independent service
 *
 * "Normalize" here means structural normalization only.
 * The declared identifiers are preserved exactly.
 *
 * Independent Service → CASES → CyberCrowd
 *
 * CASES remains the connection surface.
 * The service remains the service.
 */

import {
  CASESServiceRegistryQuery,
} from "./cases-service-registry-query";

/**
 * Canonical structural representation of a service-registry query.
 *
 * The returned object is immutable and contains only the identifiers
 * already declared by the independent participant.
 */
export type CASESServiceRegistryNormalizedQuery =
  Readonly<{
    systemId: string;
    serviceId: string;
  }>;

/**
 * Normalize a service-registry query structurally.
 *
 * No trimming, rewriting, inference, enrichment, translation,
 * capability resolution, or semantic interpretation occurs.
 *
 * The identifiers remain exactly as declared by the caller.
 */
export function normalizeCASESServiceRegistryQuery(
  query: CASESServiceRegistryQuery,
): CASESServiceRegistryNormalizedQuery {
  return Object.freeze({
    systemId: query.systemId,
    serviceId: query.serviceId,
  });
}
