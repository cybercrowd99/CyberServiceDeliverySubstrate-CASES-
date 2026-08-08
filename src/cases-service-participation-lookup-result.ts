/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Lookup Result
 *
 * ONE JOB:
 * Provide an immutable structural result representing the outcome
 * of a service-participation lookup.
 *
 * Ownership boundary:
 *
 *   Service Participation Lookup
 *          │
 *          │ bounded lookup
 *          ▼
 *   Participation Lookup Result
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
 * - enrich participation records
 * - transform identifiers
 * - reinterpret metadata
 * - mutate participation records
 * - mutate the lookup
 * - route requests
 * - transfer ownership
 *
 * It only provides an immutable structural representation of a
 * participation lookup outcome.
 */

import {
  CASESServiceParticipationResult,
} from "./cases-service-participation-result";

export type CASESServiceParticipationLookupResult = Readonly<{
  found: boolean;
  result: CASESServiceParticipationResult | undefined;
}>;

/**
 * Create an immutable participation lookup result.
 *
 * The result records whether a canonical participation record was
 * found and, when present, returns that record without changing it.
 */
export function createCASESServiceParticipationLookupResult(
  result: CASESServiceParticipationResult | undefined,
): CASESServiceParticipationLookupResult {
  return Object.freeze({
    found: result !== undefined,
    result,
  });
}
