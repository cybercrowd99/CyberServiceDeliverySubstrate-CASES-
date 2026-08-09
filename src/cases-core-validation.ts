/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Core Validation
 *
 * ONE JOB:
 * Validate the structural shape of a CASES core input without
 * executing service behavior or granting authority.
 *
 * Boundary:
 *
 * CASES STRUCTURAL INPUT
 *        |
 *        v
 * CORE VALIDATION
 *        |
 *        v
 * cases-core-validation-result
 *
 * This module validates structure only.
 *
 * It does NOT:
 * - execute an independent service
 * - invoke service capabilities
 * - infer capabilities
 * - authorize access
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation records
 * - change ownership
 * - assign economic value
 * - settle payments
 * - write ledger history
 * - control CyberCrowd
 *
 * CASES remains the connection substrate.
 * The independent service remains the service.
 * CyberCrowd remains the platform.
 */

import {
  CASESCoreValidationResult,
  casesCoreValidationFailure,
  casesCoreValidationSuccess
} from "./cases-core-validation-result";

export interface CASESCoreValidationInput {
  readonly serviceReference?: unknown;
  readonly descriptorReference?: unknown;
  readonly participationReference?: unknown;
  readonly connectionSurface?: unknown;
  readonly state?: unknown;
}

export function validateCASESCoreInput(
  input: unknown
): CASESCoreValidationResult {
  const errors: string[] = [];

  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    return casesCoreValidationFailure(
      "CORE_INPUT_MUST_BE_AN_OBJECT"
    );
  }

  const value = input as CASESCoreValidationInput;

  validateReference(
    value.serviceReference,
    "SERVICE_REFERENCE",
    errors
  );

  validateReference(
    value.descriptorReference,
    "DESCRIPTOR_REFERENCE",
    errors
  );

  validateReference(
    value.participationReference,
    "PARTICIPATION_REFERENCE",
    errors
  );

  validateConnectionSurface(
    value.connectionSurface,
    errors
  );

  validateState(value.state, errors);

  return errors.length === 0
    ? casesCoreValidationSuccess()
    : casesCoreValidationFailure(...errors);
}

function validateReference(
  value: unknown,
  fieldName: string,
  errors: string[]
): void {
  if (typeof value !== "string") {
    errors.push(`${fieldName}_MUST_BE_A_STRING`);
    return;
  }

  if (value.trim().length === 0) {
    errors.push(`${fieldName}_IS_REQUIRED`);
    return;
  }

  if (value.trim().length > 128) {
    errors.push(`${fieldName}_EXCEEDS_MAX_LENGTH`);
  }
}

function validateConnectionSurface(
  value: unknown,
  errors: string[]
): void {
  if (typeof value !== "string") {
    errors.push(
      "CONNECTION_SURFACE_MUST_BE_A_STRING"
    );
    return;
  }

  if (value.trim().length === 0) {
    errors.push(
      "CONNECTION_SURFACE_IS_REQUIRED"
    );
    return;
  }

  if (value.trim().length > 256) {
    errors.push(
      "CONNECTION_SURFACE_EXCEEDS_MAX_LENGTH"
    );
  }
}

function validateState(
  value: unknown,
  errors: string[]
): void {
  if (
    value !== "PENDING" &&
    value !== "CONNECTED" &&
    value !== "SUSPENDED" &&
    value !== "UNPLUGGED"
  ) {
    errors.push("INVALID_PARTICIPATION_STATE");
  }
}

export function isCASESCoreValidationInput(
  value: unknown
): value is CASESCoreValidationInput {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}
