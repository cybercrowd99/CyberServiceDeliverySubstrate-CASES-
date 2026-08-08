/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Validation Result
 *
 * ONE JOB:
 * Provide an immutable structural result representing the outcome
 * of service-participation validation.
 *
 * Ownership boundary:
 *
 *   Participation Declaration
 *          │
 *          ▼
 *   Participation Validation
 *          │
 *          ▼
 *   Validation Result
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
 * - enrich participation data
 * - transform identifiers
 * - reinterpret metadata
 * - mutate the participation record
 * - perform validation itself
 * - route requests
 * - transfer ownership
 *
 * It only provides an immutable structural representation of a
 * participation validation outcome.
 */

export type CASESServiceParticipationValidationResult = Readonly<{
  valid: boolean;
  errors: readonly string[];
}>;

/**
 * Create an immutable service-participation validation result.
 *
 * The result records whether structural validation succeeded and
 * preserves the validation errors without modifying the declaration.
 */
export function createCASESServiceParticipationValidationResult(
  valid: boolean,
  errors: readonly string[] = [],
): CASESServiceParticipationValidationResult {
  return Object.freeze({
    valid,
    errors: Object.freeze([...errors]),
  });
}
