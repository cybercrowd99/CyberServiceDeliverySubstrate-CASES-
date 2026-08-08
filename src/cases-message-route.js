/**
 * CASES — Message Route
 * 
 * ONE JOB:
 * Define the bounded route through which a validated CASES
 * connection message can be presented to CyberCrowd.
 *
 * This does not:
 * - execute an independent service
 * - absorb an independent system
 * - modify CASES state
 * - infer human intent
 * - create a human relationship
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * It provides the message route.
 */

import { isValidCasesMessage } from "./cases-message-validation.js";

export function routeCasesMessage(message) {
  if (!isValidCasesMessage(message)) {
    return Object.freeze({
      routed: false,
      message: null
    });
  }

  return Object.freeze({
    routed: true,
    message
  });
}
