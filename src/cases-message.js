/**
 * CASES — Connection Message
 *
 * ONE JOB:
 * Define the bounded message structure used to describe a CASES
 * connection between an independent system and CyberCrowd.
 *
 * This does not:
 * - execute an independent service
 * - absorb an independent system
 * - infer human intent
 * - create a human relationship
 * - modify CASES state
 * - define service-specific behavior
 * - replace CyberCrowd
 *
 * It defines the connection message.
 */

export const CASES_MESSAGE_TYPE = "CASES_CONNECTION";

export function createCasesMessage({
  system,
  state,
  caseNumber = null
}) {
  if (!system || typeof system !== "string") {
    throw new TypeError("CASES message requires a system");
  }

  if (!state || typeof state !== "object") {
    throw new TypeError("CASES message requires a state");
  }

  return Object.freeze({
    type: CASES_MESSAGE_TYPE,
    system,
    state: Object.freeze({
      P1: state.P1,
      P2: state.P2,
      P3: state.P3
    }),
    caseNumber
  });
}

export function isCasesMessage(message) {
  return (
    !!message &&
    typeof message === "object" &&
    message.type === CASES_MESSAGE_TYPE &&
    typeof message.system === "string" &&
    !!message.state &&
    typeof message.state === "object" &&
    "P1" in message.state &&
    "P2" in message.state &&
    "P3" in message.state
  );
}
