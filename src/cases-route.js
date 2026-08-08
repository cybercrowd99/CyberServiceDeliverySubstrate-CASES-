/**
 * CASES — Cyber Service Delivery Substrate
 *
 * ONE JOB:
 * Provide the bounded connection route between an independent system
 * and CyberCrowd.
 *
 * CASES does not become the independent system.
 * CASES does not execute the independent system.
 * CASES does not harvest the independent system.
 *
 * It provides the route.
 */

function casesRoute(independentSystem, cyberCrowd) {
  return {
    independentSystem,
    cyberCrowd,
    route: "CASES",
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = casesRoute;
}
