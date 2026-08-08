/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Service Participation Validation
 *
 * ONE JOB:
 * Validate the structural requirements of a service-participation
 * record before it is accepted by the CASES participation surface.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          ▼
 *   Participation Declaration
 *          │
 *          ▼
 *   Participation Validation
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
 * - create participation
 * - route requests
 * - transfer ownership
 *
 * It only validates the declared structural fields required for
 * service participation.
 */

export type CASESServiceParticipationValidationResult = Readonly<{
  valid: boolean;
  errors: readonly string[];
}>;

export type CASESServiceParticipationValidator = Readonly<{
  validate: (
    participation: unknown,
  ) => CASESServiceParticipationValidationResult;
}>;

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function hasRequiredString(
  value: Record<string, unknown>,
  field: string,
): boolean {
  return (
    typeof value[field] === "string" &&
    value[field].trim().length > 0
  );
}

/**
 * Create a bounded service-participation validator.
 *
 * Validation checks only structural requirements. It does not
 * interpret what the participating service means or what it can do.
 */
export function createCASESServiceParticipationValidator(): CASESServiceParticipationValidator {
  return Object.freeze({
    validate(participation: unknown) {
      const errors: string[] = [];

      if (!isObject(participation)) {
        return Object.freeze({
          valid: false,
          errors: Object.freeze([
            "PARTICIPATION_MUST_BE_AN_OBJECT",
          ]),
        });
      }

      const requiredFields = [
        "systemId",
        "serviceId",
        "participationId",
      ];

      for (const field of requiredFields) {
        if (!hasRequiredString(participation, field)) {
          errors.push(`${field.toUpperCase()}_IS_REQUIRED`);
        }
      }

      return Object.freeze({
        valid: errors.length === 0,
        errors: Object.freeze(errors),
      });
    },
  });
}
