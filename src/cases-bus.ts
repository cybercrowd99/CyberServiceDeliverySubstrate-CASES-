/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Bus
 *
 * ONE JOB:
 * Provide the bounded structural connection surface between
 * independently built services and CyberCrowd.
 *
 * The bus carries declared CASES participation routes.
 *
 * It does NOT:
 * - execute services
 * - invoke service capabilities
 * - infer capabilities
 * - authorize participation
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation records
 * - transfer service ownership
 * - assign economic value
 * - settle payments
 * - write ledger history
 * - control CyberCrowd
 * - make service-specific decisions
 *
 * Boundary:
 *
 * INDEPENDENT SERVICE
 *        |
 *        v
 * PARTICIPATION ENVELOPE
 *        |
 *        v
 * PARTICIPATION ROUTER
 *        |
 *        v
 *      CASES BUS
 *        |
 *        v
 *   CYBERCROWD
 *
 * The bus provides the route.
 * The service provides the service.
 * CyberCrowd remains the platform.
 */

import {
  CASESParticipationRoute,
  CASESParticipationRouteRecord
} from "./cases-service-participation-router";

export interface CASESBusConnection {
  readonly type: "cases-bus-connection";
  readonly version: "CASES-BUS-1";
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
  readonly route: CASESParticipationRoute;
  readonly connectedAt: number;
}

export interface CASESBusDelivery {
  readonly type: "cases-bus-delivery";
  readonly version: "CASES-BUS-1";
  readonly connection: CASESBusConnection;
}

export class CASESBus {
  connect(
    route: CASESParticipationRouteRecord
  ): CASESBusConnection {
    return Object.freeze({
      type: "cases-bus-connection",
      version: "CASES-BUS-1",

      serviceReference:
        route.serviceReference,

      descriptorReference:
        route.descriptorReference,

      participationReference:
        route.participationReference,

      connectionSurface:
        route.connectionSurface,

      route:
        route.route,

      connectedAt:
        Date.now()
    });
  }

  deliver(
    connection: CASESBusConnection
  ): CASESBusDelivery {
    return Object.freeze({
      type: "cases-bus-delivery",
      version: "CASES-BUS-1",
      connection
    });
  }
}

export const casesBus =
  new CASESBus();
