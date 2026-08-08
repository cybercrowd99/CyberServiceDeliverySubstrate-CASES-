/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Registry Validation Result
 *
 * ONE JOB:
 * Represent the immutable structural result of validating a CASES
 * service-registry query.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ declares participation
 *          ▼
 *        CASES
 *          │
 *          │ validates structure only
 *          ▼
 *      Validation Result
 *          │
 *          ▼
 *      Registry Lookup
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
 * - transform service descriptors
 * - enrich service metadata
 * - resolve capabilities
 * - route requests
 * - transfer ownership
 *
 * It only represents the immutable result of structural validation.
 *
 * A validation result is descriptive, not operational.
 */

import {
  CASESServiceRegistryQuery,
} from "./cases-service-registry-query";

export type CASESServiceRegistryValidationResult =
  | CASESServiceRegistryValidationValid
  | CASESServiceRegistryValidationInvalid;

export type CASESServiceRegistryValidationValid = Readonly<{
  valid: true;
  query: CASESServiceRegistryQuery;
}>;

export type CASESServiceRegistryValidationInvalid = Readonly<{
  valid: false;
  query: null;
}>;

/**
 * Create an immutable valid validation result.
 *
 * The query remains the independently declared structural query.
 * No interpretation, authorization, enrichment, or service action
 * occurs here.
 */
export function serviceRegistryValidationValid(
  query: CASESServiceRegistryQuery,
): CASESServiceRegistryValidationValid {
  return Object.freeze({
    valid: true,
    query,
  });
}

/**
 * Create an immutable invalid validation result.
 *
 * Invalid structure does not imply rejection of the service,
 * hostility, lack of capability, or any other operational meaning.
 */
export function serviceRegistryValidationInvalid(): CASESServiceRegistryValidationInvalid {
  return Object.freeze({
    valid: false,
    query: null,
  });
}
