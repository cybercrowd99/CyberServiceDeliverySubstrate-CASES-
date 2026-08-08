/**
 * CASES — State Classification
 * 
 * ONE JOB:
 * Identify the CASES-27 case number represented by an existing
 * three-position CASES connection state.
 *
 * This does not:
 * - change the CASES state
 * - infer human intent
 * - execute a service
 * - create a relationship
 * - absorb an independent system
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * CASES only identifies the existing connection state.
 */

import { CASES_27 } from "./cases-27.js";
import { isCasesState } from "./cases-state.js";

export function getCasesCaseNumber(state) {
  if (!isCasesState(state)) {
    throw new TypeError("Invalid CASES connection state");
  }

  const index = CASES_27.findIndex(
    (candidate) =>
      candidate.P1 === state.P1 &&
      candidate.P2 === state.P2 &&
      candidate.P3 === state.P3
  );

  return index === -1 ? null : index + 1;
}

export function classifyCasesState(state) {
  const caseNumber = getCasesCaseNumber(state);

  if (caseNumber === null) {
    return null;
  }

  return Object.freeze({
    caseNumber,
    P1: state.P1,
    P2: state.P2,
    P3: state.P3
  });
}
