/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Router Result Validation
 *
 * ONE JOB:
 * Validate the structural correctness of a CASES service-participation
 * router result without executing, interpreting, or changing the
 * participation information represented by that result.
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
 *   Result Validation
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
 * It only checks that the router result contains the required structural
 * fields and that those fields retain the declared identifier form.
 */

import {
  CASESServiceParticipationRouterResult,
} from "./cases-service-participation-router-result";

export type CASESServiceParticipationRouterResultValidation = Readonly<{
  valid: boolean;
  errors: readonly string[];
}>;

/**
 * Validate the structural form of a service-participation router result.
 *
 * Validation is limited to required structural fields. No service
 * capability, intent, authority, relationship, or behavior is inferred.
 */
export function validateCASESServiceParticipationRouterResult(
  result: CASESServiceParticipationRouterResult,
): CASESServiceParticipationRouterResultValidation {
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
```0
