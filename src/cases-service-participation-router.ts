/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Service Participation Router
 *
 * ONE JOB:
 * Route a validated service participation envelope to the appropriate
 * structural CASES connection surface.
 *
 * The router performs structural routing only.
 *
 * It does NOT:
 * - execute the independent service
 * - invoke service capabilities
 * - infer capabilities
 * - authorize participation
 * - grant permissions
 * - mutate service descriptors
 * - mutate participation envelopes
 * - transfer service ownership
 * - assign economic value
 * - settle payments
 * - write ledger history
 * - control CyberCrowd
 * - make service-specific operational decisions
 *
 * Boundary:
 *
 * INDEPENDENT SERVICE
 *        |
 *        v
 * SERVICE DESCRIPTOR
 *        |
 *        v
 * PARTICIPATION ENVELOPE
 *        |
 *        v
 * PARTICIPATION ROUTER
 *        |
 *        v
 *      CASES
 *        |
 *        v
 *   CYBERCROWD
 *
 * Routing is not execution.
 * Participation state is not service behavior.
 * A connection surface is not a capability interpretation.
 */

import {
  CASESServiceParticipationEnvelope,
  CASESParticipationState,
  isCASESParticipationEnvelope
} from "./cases-service-participation-envelope";

export type CASESParticipationRoute =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "DISCONNECTED";

export interface CASESParticipationRouteRequest {
  envelope: CASESServiceParticipationEnvelope;
}

export interface CASESParticipationRouteRecord {
  readonly type: "cases-participation-route";
  readonly version: "CASES-PARTICIPATION-ROUTE-1";
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
  readonly participationState: CASESParticipationState;
  readonly route: CASESParticipationRoute;
  readonly routedAt: number;
}

export class CASESServiceParticipationRouter {
  route(
    request: CASESParticipationRouteRequest
  ): CASESParticipationRouteRecord {

    if (!isCASESParticipationEnvelope(request.envelope)) {
      throw new Error(
        "Invalid CASES service participation envelope"
      );
    }

    return Object.freeze({
      type: "cases-participation-route",
      version: "CASES-PARTICIPATION-ROUTE-1",

      serviceReference:
        request.envelope.serviceReference,

      descriptorReference:
        request.envelope.descriptorReference,

      participationReference:
        request.envelope.participationReference,

      connectionSurface:
        request.envelope.connectionSurface,

      participationState:
        request.envelope.state,

      route:
        routeForState(request.envelope.state),

      routedAt:
        Date.now()
    });
  }
}

export const casesServiceParticipationRouter =
  new CASESServiceParticipationRouter();

function routeForState(
  state: CASESParticipationState
): CASESParticipationRoute {

  switch (state) {
    case "PENDING":
      return "PENDING";

    case "CONNECTED":
      return "ACTIVE";

    case "SUSPENDED":
      return "SUSPENDED";

    case "UNPLUGGED":
      return "DISCONNECTED";
  }
}
