/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-capability-finalization-binding.ts
 *
 * CyberCrowd-CASES — CASES Capability Finalization Binding V1
 *
 * ONE JOB:
 * Finalize a consolidated CORE capability into the CASES capability spine
 * as an immutable structural finalization anchor.
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

export type CasesCapabilityFinalizationStatus =
  | "CASES_CAPABILITY_FINALIZATION_CREATED"
  | "CASES_CAPABILITY_FINALIZATION_INVALID";

export interface CasesCapabilityFinalizationInput {
  readonly capabilityConsolidationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesCapabilityFinalizationBinding {
  readonly status: CasesCapabilityFinalizationStatus;

  readonly capabilityConsolidationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly capabilityFinalizationId: string;
  readonly finalizedAt: number;
}

/**
 * Creates the immutable CASES capability finalization binding.
 *
 * Structural finalization only.
 */
export const createCasesCapabilityFinalizationBinding = (
  input: CasesCapabilityFinalizationInput,
): CasesCapabilityFinalizationBinding => {
  const valid =
    Boolean(input.capabilityConsolidationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_CAPABILITY_FINALIZATION_INPUT",
    );
  }

  const capabilityFinalizationId =
    `cases-capability-finalization:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_CAPABILITY_FINALIZATION_CREATED",

    capabilityConsolidationId: input.capabilityConsolidationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    capabilityFinalizationId,
    finalizedAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesCapabilityFinalizationBinding = (
  binding: CasesCapabilityFinalizationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_CAPABILITY_FINALIZATION_CREATED" &&
    Boolean(binding.capabilityConsolidationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.capabilityFinalizationId) &&
    Number.isFinite(binding.finalizedAt)
  );
};
