/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-capability-registration-binding.ts
 *
 * CyberCrowd-CASES — CASES Capability Registration Binding V1
 *
 * ONE JOB:
 * Register a declared CORE capability into the CASES capability registry
 * as an immutable structural registration event.
 *
 * Structural registration only.
 *
 * This file does NOT:
 * - execute CASES behavior
 * - execute CORE behavior
 * - mutate CASES state
 * - mutate CORE state
 * - interpret doctrine
 * - authorize behavior
 * - execute governance
 * - expose CORE internals
 */

export type CasesCapabilityRegistrationStatus =
  | "CASES_CAPABILITY_REGISTRATION_CREATED"
  | "CASES_CAPABILITY_REGISTRATION_INVALID";

export interface CasesCapabilityRegistrationInput {
  readonly serviceId: string;
  readonly capabilityReference: string;
  readonly capabilityBindingId: string;
}

export interface CasesCapabilityRegistrationBinding {
  readonly status: CasesCapabilityRegistrationStatus;

  readonly serviceId: string;
  readonly capabilityReference: string;
  readonly capabilityBindingId: string;

  readonly capabilityRegistrationId: string;
  readonly registeredAt: number;
}

/**
 * Creates the immutable CASES capability registration binding.
 *
 * Structural registration only.
 */
export const createCasesCapabilityRegistrationBinding = (
  input: CasesCapabilityRegistrationInput,
): CasesCapabilityRegistrationBinding => {
  const valid =
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference) &&
    Boolean(input.capabilityBindingId);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_CAPABILITY_REGISTRATION_INPUT",
    );
  }

  const capabilityRegistrationId =
    `cases-capability-registration:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_CAPABILITY_REGISTRATION_CREATED",

    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,
    capabilityBindingId: input.capabilityBindingId,

    capabilityRegistrationId,
    registeredAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesCapabilityRegistrationBinding = (
  binding: CasesCapabilityRegistrationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_CAPABILITY_REGISTRATION_CREATED" &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.capabilityBindingId) &&
    Boolean(binding.capabilityRegistrationId) &&
    Number.isFinite(binding.registeredAt)
  );
};
