/**
 * CASES — Message Validation
 *
 * ONE JOB:
 * Validate the structure of a CASES connection message before it
 * crosses the CASES connection boundary.
 *
 * This does not:
 * - modify the message
 * - modify CASES state
 * - infer human intent
 * - execute a service
 * - absorb an independent system
 * - create a relationship
 * - define service-specific behavior
 *
 * It only validates the message structure.
 */

import {
  CASES_MESSAGE_TYPE,
  isCasesMessage
} from "./cases-message.js";

export function validateCasesMessage(message) {
  if (!isCasesMessage(message)) {
    return Object.freeze({
      valid: false,
      type: CASES_MESSAGE_TYPE,
      reason: "INVALID_CASES_MESSAGE"
    });
  }

  return Object.freeze({
    valid: true,
    type: CASES_MESSAGE_TYPE,
    reason: null
  });
}

export function isValidCasesMessage(message) {
  return validateCasesMessage(message).valid;
}
