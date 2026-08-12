/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-delivery-consolidation-binding.ts
 *
 * CyberCrowd-CASES — CASES Delivery Consolidation Binding V1
 *
 * ONE JOB:
 * Consolidate a delivery-registration event into the CASES delivery spine
 * as an immutable structural delivery-consolidation artifact.
 *
 * Structural consolidation only.
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

export type CasesDeliveryConsolidationStatus =
  | "CASES_DELIVERY_CONSOLIDATION_CREATED"
  | "CASES_DELIVERY_CONSOLIDATION_INVALID";

export interface CasesDeliveryConsolidationInput {
  readonly deliveryRegistrationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesDeliveryConsolidationBinding {
  readonly status: CasesDeliveryConsolidationStatus;

  readonly deliveryRegistrationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly deliveryConsolidationId: string;
  readonly consolidatedAt: number;
}

/**
 * Creates the immutable CASES delivery consolidation binding.
 *
 * Structural consolidation only.
 */
export const createCasesDeliveryConsolidationBinding = (
  input: CasesDeliveryConsolidationInput,
): CasesDeliveryConsolidationBinding => {
  const valid =
    Boolean(input.deliveryRegistrationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_DELIVERY_CONSOLIDATION_INPUT",
    );
  }

  const deliveryConsolidationId =
    `cases-delivery-consolidation:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_DELIVERY_CONSOLIDATION_CREATED",

    deliveryRegistrationId: input.deliveryRegistrationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    deliveryConsolidationId,
    consolidatedAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesDeliveryConsolidationBinding = (
  binding: CasesDeliveryConsolidationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_DELIVERY_CONSOLIDATION_CREATED" &&
    Boolean(binding.deliveryRegistrationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.deliveryConsolidationId) &&
    Number.isFinite(binding.consolidatedAt)
  );
};
