/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-delivery-registration-binding.ts
 *
 * CyberCrowd-CASES — CASES Delivery Registration Binding V1
 *
 * ONE JOB:
 * Register a finalized capability into the CASES delivery substrate
 * as an immutable structural delivery-registration event.
 *
 * Structural delivery registration only.
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

export type CasesDeliveryRegistrationStatus =
  | "CASES_DELIVERY_REGISTRATION_CREATED"
  | "CASES_DELIVERY_REGISTRATION_INVALID";

export interface CasesDeliveryRegistrationInput {
  readonly capabilityFinalizationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesDeliveryRegistrationBinding {
  readonly status: CasesDeliveryRegistrationStatus;

  readonly capabilityFinalizationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly deliveryRegistrationId: string;
  readonly registeredAt: number;
}

/**
 * Creates the immutable CASES delivery registration binding.
 *
 * Structural delivery registration only.
 */
export const createCasesDeliveryRegistrationBinding = (
  input: CasesDeliveryRegistrationInput,
): CasesDeliveryRegistrationBinding => {
  const valid =
    Boolean(input.capabilityFinalizationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_DELIVERY_REGISTRATION_INPUT",
    );
  }

  const deliveryRegistrationId =
    `cases-delivery-registration:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_DELIVERY_REGISTRATION_CREATED",

    capabilityFinalizationId: input.capabilityFinalizationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    deliveryRegistrationId,
    registeredAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesDeliveryRegistrationBinding = (
  binding: CasesDeliveryRegistrationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_DELIVERY_REGISTRATION_CREATED" &&
    Boolean(binding.capabilityFinalizationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.deliveryRegistrationId) &&
    Number.isFinite(binding.registeredAt)
  );
};
