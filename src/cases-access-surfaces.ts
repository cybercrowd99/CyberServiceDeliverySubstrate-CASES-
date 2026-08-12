/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Access Surface Registry
 *
 * ONE JOB:
 * Declare the structural access surfaces exposed by CASES.
 *
 * Ownership boundary:
 *
 *   CASES
 *    │
 *    ├── CASES-SERVICE
 *    ├── CASES-CONTINUITY
 *    ├── CASES-IDENTITY
 *    └── CASES-STRUCTURAL
 *
 * This module does not:
 * - execute independent service behavior
 * - invoke independent services
 * - infer capability
 * - infer intent
 * - authorize actions
 * - transform service declarations
 * - enrich metadata
 * - create service relationships
 * - transfer ownership
 *
 * It only declares the CASES access-surface structure.
 *
 * Independent Service → CASES → CORE → NET
 */

export default {
  cases: {
    service: "CASES-SERVICE",
    continuity: "CASES-CONTINUITY",
    identity: "CASES-IDENTITY",
    structural: "CASES-STRUCTURAL",
  },
};
