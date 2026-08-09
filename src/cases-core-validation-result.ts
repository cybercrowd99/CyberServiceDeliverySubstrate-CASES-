/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Core Validation Result
 *
 * ONE JOB:
 * Provide the immutable structural result returned by CASES
 * core validation.
 *
 * This module records whether a structural validation operation
 * succeeded and, when it does not, which structural conditions
 * failed.
 *
 * It does NOT:
 * - execute services
 * - invoke capabilities
 * - infer capabilities
 * - authorize access
 * - grant permissions
 * - mutate service records
 * - mutate descriptors
 * - change participation state
 * - transfer ownership
 * - assign economic value
 * - settle payments
 * - write ledger history
 * - control CyberCrowd
 *
 * Boundary:
 *
 * CASES STRUCTURAL INPUT
 *        |
 *        v
 * CORE VALIDATION
 *        |
 *        v
 * VALIDATION RESULT
 *
 * The result reports structure.
 * It does not create authority.
 */

export interface CASESCoreValidationResult {
  readonly type: "cases-core-validation-result";
  readonly version: "CASES-CORE-VALIDATION-1";
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export interface CASESCoreValidationResultInput {
  readonly valid: boolean;
  readonly errors?: readonly string[];
}

export function createCASESCoreValidationResult(
  input: CASESCoreValidationResultInput
): CASESCoreValidationResult {
  const errors = Array.isArray(input.errors)
    ? input.errors
        .filter(
          (error): error is string =>
            typeof error === "string"
        )
        .map((error) => error.trim())
        .filter(Boolean)
    : [];

  return Object.freeze({
    type: "cases-core-validation-result",
    version: "CASES-CORE-VALIDATION-1",
    valid: input.valid === true,
    errors: Object.freeze(errors)
  });
}

export function casesCoreValidationSuccess(): CASESCoreValidationResult {
  return createCASESCoreValidationResult({
    valid: true,
    errors: []
  });
}

export function casesCoreValidationFailure(
  ...errors: string[]
): CASESCoreValidationResult {
  return createCASESCoreValidationResult({
    valid: false,
    errors
  });
}

export function isCASESCoreValidationResult(
  value: unknown
): value is CASESCoreValidationResult {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const result =
    value as Partial<CASESCoreValidationResult>;

  return (
    result.type === "cases-core-validation-result" &&
    result.version === "CASES-CORE-VALIDATION-1" &&
    typeof result.valid === "boolean" &&
    Array.isArray(result.errors) &&
    result.errors.every(
      (error) => typeof error === "string"
    )
  );
}
