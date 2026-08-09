/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Router Validation
 *
 * ONE JOB:
 * Provide the bounded structural validation surface for a
 * service-participation router result before it is accepted as a
 * structurally valid CASES routing record.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          ▼
 *   Participation Record
 *          │
 *          ▼
 *   Participation Router
 *          │
 *          ▼
 *   Router Result
 *          │
 *          ▼
 *   Router Validation
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
 * - enrich participation data
 * - transform declared identifiers
 * - reinterpret metadata
 * - mutate the router result
 * - route service requests
 * - transfer ownership
 *
 * It only validates the declared structural fields required for a
 * service-participation routing result.
 */

import {
  CASESServiceParticipationRouterResult,
} from "./cases-service-participation-router-result";

export type CASESServiceParticipationRouterValidation = Readonly<{
  valid: boolean;
  errors: readonly string[];
}>;

/**
 * Validate a service-participation router result.
 *
 * Validation remains limited to structural correctness. No capability,
 * intent, authority, relationship, or service behavior is inferred.
 */
export function validateCASESServiceParticipationRouter(
  result: CASESServiceParticipationRouterResult,
): CASESServiceParticipationRouterValidation {
  const errors: string[] = [];

  if (typeof result.routed !== "boolean") {
    errors.push("routed must be a boolean");
  }

  if (result.routed) {
    if (result.route === undefined) {
      errors.push("route is required when routed is true");
    } else {
      if (typeof result.route.systemId !== "string") {
        errors.push("route.systemId must be a string");
      }

      if (typeof result.route.serviceId !== "string") {
        errors.push("route.serviceId must be a string");
      }

      if (typeof result.route.participationId !== "string") {
        errors.push("route.participationId must be a string");
      }
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    errors: Object.freeze(errors),
  });
}
