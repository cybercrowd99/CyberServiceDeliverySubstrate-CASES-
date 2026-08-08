/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Registry
 *
 * ONE JOB:
 * Maintain a structurally immutable index of independently declared
 * service-participation descriptors without invoking, executing,
 * transforming, enriching, or redefining the services themselves.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation surface
 *          ▼
 *        CASES Registry
 *          │
 *          │ owns indexing + lookup only
 *          ▼
 *      CyberCrowd
 *
 * This module does not:
 * - execute a service
 * - invoke a service
 * - infer capability
 * - infer intent
 * - authorize an action
 * - route requests
 * - transform descriptors
 * - enrich descriptors
 * - create relationships
 * - activate service behavior
 *
 * It only stores and exposes immutable participation descriptors.
 */

import {
  ServiceParticipation,
  ServiceParticipationResult,
} from "./cases-service-participation";

export class CASESServiceRegistry {
  private readonly registry: Map<string, ServiceParticipation> = new Map();

  /**
   * Register a structurally validated participation descriptor.
   * Does not mutate, enrich, or interpret the descriptor.
   */
  register(result: ServiceParticipationResult): void {
    if (!result.routed || result.participation === null) {
      return;
    }

    const key = `${result.participation.systemId}:${result.participation.serviceId}`;

    // Store descriptor exactly as declared
    this.registry.set(key, result.participation);
  }

  /**
   * Retrieve a descriptor by systemId + serviceId.
   * Returns the immutable descriptor or undefined.
   */
  get(systemId: string, serviceId: string): ServiceParticipation | undefined {
    const key = `${systemId}:${serviceId}`;
    return this.registry.get(key);
  }

  /**
   * Enumerate all stored descriptors.
   * Returns immutable snapshots.
   */
  all(): readonly ServiceParticipation[] {
    return Array.from(this.registry.values());
  }
}

export function createCASESServiceRegistry(): CASESServiceRegistry {
  return new CASESServiceRegistry();
}
