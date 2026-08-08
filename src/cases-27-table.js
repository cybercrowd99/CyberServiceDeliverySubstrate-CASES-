/**
 * CASES — CASES-27 Table View
 *
 * ONE JOB:
 * Provide a readable table representation of the 27 CASES states.
 *
 * This does not:
 * - change CASES-27
 * - redefine neutrality
 * - alter boundary positions
 *
 * It only formats the existing states for display or debugging.
 */

import { CASES_27 } from "./cases-27.js";

export function cases27Table() {
  return CASES_27.map((state, index) => ({
    id: index + 1,
    P1: state.P1,
    P2: state.P2,
    P3: state.P3
  }));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { cases27Table };
}
