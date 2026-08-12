/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-delivery-execution-binding.ts
 *
 * CyberCrowd-CASES — CASES Delivery Execution Binding V1
 *
 * ONE JOB:
 * Anchor a finalized delivery artifact into the CASES execution spine
 * as an immutable structural execution-binding event.
 *
 * Structural execution anchoring only.
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

export type CasesDeliveryExecutionStatus =
  | "CASES_DELIVERY_EXECUTION_CREATED"
  | "CASES_DELIVERY_EXECUTION_INVALID";

export interface CasesDeliveryExecutionInput {
  readonly deliveryFinalizationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesDeliveryExecutionBinding {
  readonly status: CasesDeliveryExecutionStatus;

  readonly deliveryFinalizationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly deliveryExecutionId: string;
  readonly executionAnchoredAt: number;
}

/**
 * Creates the immutable CASES delivery execution binding.
 *
 * Structural execution anchoring only.
 */
export const createCasesDeliveryExecutionBinding = (
  input: CasesDeliveryExecutionInput,
): CasesDeliveryExecutionBinding => {
  const valid =
    Boolean(input.deliveryFinalizationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_DELIVERY_EXECUTION_INPUT",
    );
  }

  const deliveryExecutionId =
    `cases-delivery-execution:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_DELIVERY_EXECUTION_CREATED",

    deliveryFinalizationId: input.deliveryFinalizationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    deliveryExecutionId,
    executionAnchoredAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesDeliveryExecutionBinding = (
  binding: CasesDeliveryExecutionBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_DELIVERY_EXECUTION_CREATED" &&
    Boolean(binding.deliveryFinalizationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.deliveryExecutionId) &&
    Number.isFinite(binding.executionAnchoredAt)
  );
};
