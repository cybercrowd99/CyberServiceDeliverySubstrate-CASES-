/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES CyberCrowd Boundary
 *
 * ONE JOB:
 * Provide the bounded structural boundary through which CASES
 * presents service participation to CyberCrowd.
 *
 * This boundary carries structural CASES connection information.
 * It does not transfer service ownership or CASES authority into
 * CyberCrowd, and it does not turn CASES into a CyberCrowd executor.
 *
 * It does NOT:
 * - execute services
 * - invoke service capabilities
 * - infer capabilities
 * - authorize service participation
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation records
 * - modify CASES bus state
 * - transfer service ownership
 * - assign economic value
 * - settle payments
 * - write ledger history
 * - create service behavior
 * - make service-specific decisions
 *
 * Boundary:
 *
 * INDEPENDENT SERVICE
 *        |
 *        v
 * CASES PARTICIPATION
 *        |
 *        v
 *      CASES BUS
 *        |
 *        v
 * CYBERCROWD BOUNDARY
 *        |
 *        v
 *   CYBERCROWD
 *
 * CASES provides the connection.
 * CyberCrowd receives the declared connection surface.
 * The independent service remains independent.
 */

import {
  CASESBusConnection
} from "./cases-bus";

export interface CASESCyberCrowdBoundaryRequest {
  readonly connection: CASESBusConnection;
}

export interface CASESCyberCrowdBoundaryRecord {
  readonly type: "cases-cybercrowd-boundary-record";
  readonly version: "CASES-CYBERCROWD-BOUNDARY-1";
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
  readonly route: CASESBusConnection["route"];
  readonly presentedAt: number;
}

export class CASESCyberCrowdBoundary {
  present(
    request: CASESCyberCrowdBoundaryRequest
  ): CASESCyberCrowdBoundaryRecord {
    const connection = request.connection;

    return Object.freeze({
      type: "cases-cybercrowd-boundary-record",
      version: "CASES-CYBERCROWD-BOUNDARY-1",

      serviceReference:
        connection.serviceReference,

      descriptorReference:
        connection.descriptorReference,

      participationReference:
        connection.participationReference,

      connectionSurface:
        connection.connectionSurface,

      route:
        connection.route,

      presentedAt:
        Date.now()
    });
  }
}

export const casesCyberCrowdBoundary =
  new CASESCyberCrowdBoundary();
