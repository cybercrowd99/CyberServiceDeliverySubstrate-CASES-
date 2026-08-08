/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Result
 *
 * ONE JOB:
 * Represent the immutable result of a CASES service-registry lookup.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ owns service capability + behavior
 *          ▼
 *        CASES
 *          │
 *          │ owns connection surface + registry lookup result
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
 *
 * It only defines the immutable structural result of a registry lookup.
 *
 * A registry result is descriptive, not operational.
 */

import { ServiceParticipation } from "./cases-service-participation";

export type CASESServiceRegistryResult =
  | CASESServiceRegistryFound
  | CASESServiceRegistryNotFound;

export type CASESServiceRegistryFound = Readonly<{
  found: true;
  participation: ServiceParticipation;
}>;

export type CASESServiceRegistryNotFound = Readonly<{
  found: false;
  participation: null;
}>;

/**
 * Create a found registry result.
 *
 * The participation descriptor is preserved exactly as supplied.
 * No capability interpretation, enrichment, transformation, or
 * service activation occurs.
 */
export function serviceRegistryFound(
  participation: ServiceParticipation,
): CASESServiceRegistryFound {
  return Object.freeze({
    found: true,
    participation,
  });
}

/**
 * Create a not-found registry result.
 *
 * A missing descriptor remains an explicit non-result.
 * It does not imply rejection, hostility, permission, or action.
 */
export function serviceRegistryNotFound(): CASESServiceRegistryNotFound {
  return Object.freeze({
    found: false,
    participation: null,
  });
}
