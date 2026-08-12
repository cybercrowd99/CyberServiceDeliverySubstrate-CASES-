/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-delivery-finalization-binding.ts
 *
 * CyberCrowd-CASES — CASES Delivery Finalization Binding V1
 *
 * ONE JOB:
 * Finalize a consolidated delivery event into the CASES delivery spine
 * as an immutable structural delivery-finalization anchor.
 *
 * Structural finalization only.
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

export type CasesDeliveryFinalizationStatus =
  | "CASES_DELIVERY_FINALIZATION_CREATED"
  | "CASES_DELIVERY_FINALIZATION_INVALID";

export interface CasesDeliveryFinalizationInput {
  readonly deliveryConsolidationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesDeliveryFinalizationBinding {
  readonly status: CasesDeliveryFinalizationStatus;

  readonly deliveryConsolidationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly deliveryFinalizationId: string;
  readonly finalizedAt: number;
}

/**
 * Creates the immutable CASES delivery finalization binding.
 *
 * Structural finalization only.
 */
export const createCasesDeliveryFinalizationBinding = (
  input: CasesDeliveryFinalizationInput,
): CasesDeliveryFinalizationBinding => {
  const valid =
    Boolean(input.deliveryConsolidationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_DELIVERY_FINALIZATION_INPUT",
    );
  }

  const deliveryFinalizationId =
    `cases-delivery-finalization:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_DELIVERY_FINALIZATION_CREATED",

    deliveryConsolidationId: input.deliveryConsolidationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    deliveryFinalizationId,
    finalizedAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesDeliveryFinalizationBinding = (
  binding: CasesDeliveryFinalizationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_DELIVERY_FINALIZATION_CREATED" &&
    Boolean(binding.deliveryConsolidationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.deliveryFinalizationId) &&
    Number.isFinite(binding.finalizedAt)
  );
};
