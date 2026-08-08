/**
 * CASES — Case Descriptions
 *
 * ONE JOB:
 * Provide the descriptive names for the 27 CASES connection states.
 *
 * This does not:
 * - calculate CASES states
 * - modify CASES states
 * - infer human intent
 * - execute a service
 * - absorb an independent system
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * It provides the descriptive vocabulary for CASES-27.
 */

export const CASES_CASE_DESCRIPTIONS = Object.freeze({
  1: "TOTAL_LATENT_FRICTION",
  2: "INTERNAL_FRICTION",
  3: "FRICTION_MISMATCH",
  4: "RELUCTANT_COMPLIANCE",
  5: "PASSIVE_RELUCTANCE",
  6: "HIDDEN_RESISTANCE",
  7: "PERFORMATIVE_ALIGNMENT",
  8: "STRAINED_COOPERATION",
  9: "RELUCTANT_ALLY",
  10: "UNINTENDED_FRICTION",
  11: "OPERATIONAL_DRAG",
  12: "OPTIMISTIC_DRAG",
  13: "MISINTERPRETED_NEUTRALITY",
  14: "PURE_NEUTRALITY",
  15: "FAVORED_NEUTRALITY",
  16: "WASTED_EFFORT",
  17: "UNSEEN_SUPPORT",
  18: "PASSIVE_GROWTH",
  19: "BETRAYED_INTENT",
  20: "INEFFICIENT_INTENT",
  21: "HIGH_TOLERANCE_ALLY",
  22: "SUSPICIOUS_SUPPORT",
  23: "QUIET_ALIGNMENT",
  24: "TRUSTED_ALIGNMENT",
  25: "REJECTED_ALIGNMENT",
  26: "UNDER_APPRECIATED_ALLY",
  27: "TOTAL_LATENT_SUPPORT"
});

export function getCasesCaseDescription(caseNumber) {
  return CASES_CASE_DESCRIPTIONS[caseNumber] ?? null;
}
