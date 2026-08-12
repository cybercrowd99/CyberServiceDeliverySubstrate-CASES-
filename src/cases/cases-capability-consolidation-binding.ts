/**
 * SUBSYSTEM: CASES
 * REPO: CyberServiceDeliverySubstrate-CASES-
 * FILE: src/cases/cases-capability-consolidation-binding.ts
 *
 * CyberCrowd-CASES — CASES Capability Consolidation Binding V1
 *
 * ONE JOB:
 * Consolidate a registered CORE capability into the CASES capability spine
 * as an immutable structural consolidation event.
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

export type CasesCapabilityConsolidationStatus =
  | "CASES_CAPABILITY_CONSOLIDATION_CREATED"
  | "CASES_CAPABILITY_CONSOLIDATION_INVALID";

export interface CasesCapabilityConsolidationInput {
  readonly capabilityRegistrationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;
}

export interface CasesCapabilityConsolidationBinding {
  readonly status: CasesCapabilityConsolidationStatus;

  readonly capabilityRegistrationId: string;
  readonly serviceId: string;
  readonly capabilityReference: string;

  readonly capabilityConsolidationId: string;
  readonly consolidatedAt: number;
}

/**
 * Creates the immutable CASES capability consolidation binding.
 *
 * Structural consolidation only.
 */
export const createCasesCapabilityConsolidationBinding = (
  input: CasesCapabilityConsolidationInput,
): CasesCapabilityConsolidationBinding => {
  const valid =
    Boolean(input.capabilityRegistrationId) &&
    Boolean(input.serviceId) &&
    Boolean(input.capabilityReference);

  if (!valid) {
    throw new Error(
      "INVALID_CASES_CAPABILITY_CONSOLIDATION_INPUT",
    );
  }

  const capabilityConsolidationId =
    `cases-capability-consolidation:${crypto.randomUUID()}`;

  return Object.freeze({
    status: "CASES_CAPABILITY_CONSOLIDATION_CREATED",

    capabilityRegistrationId: input.capabilityRegistrationId,
    serviceId: input.serviceId,
    capabilityReference: input.capabilityReference,

    capabilityConsolidationId,
    consolidatedAt: Date.now(),
  });
};

/**
 * Structural validation only.
 */
export const validateCasesCapabilityConsolidationBinding = (
  binding: CasesCapabilityConsolidationBinding,
): boolean => {
  return (
    binding.status ===
      "CASES_CAPABILITY_CONSOLIDATION_CREATED" &&
    Boolean(binding.capabilityRegistrationId) &&
    Boolean(binding.serviceId) &&
    Boolean(binding.capabilityReference) &&
    Boolean(binding.capabilityConsolidationId) &&
    Number.isFinite(binding.consolidatedAt)
  );
};
