/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Service Participation Envelope
 *
 * ONE JOB:
 * Represent the bounded structural participation of an independently
 * built service at the CASES connection boundary.
 *
 * The participation envelope records structural participation facts.
 * It does not execute, invoke, interpret, authorize, enrich, mutate,
 * or redefine the independent service.
 *
 * It does NOT:
 * - execute the independent service
 * - invoke service capabilities
 * - infer capabilities
 * - authorize participation
 * - grant permissions
 * - transfer service ownership
 * - mutate the service descriptor
 * - create service behavior
 * - create payment instructions
 * - settle payments
 * - write ledger history
 * - create metadata authority
 * - control CyberCrowd
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
 *      CASES
 *        |
 *        v
 *   CYBERCROWD
 *
 * The service remains the service.
 * The participation envelope represents the connection.
 * CASES remains the bus.
 * CyberCrowd remains the platform.
 */

export type CASESParticipationState =
  | "PENDING"
  | "CONNECTED"
  | "SUSPENDED"
  | "UNPLUGGED";

export interface CASESServiceParticipationRequest {
  serviceReference: string;
  descriptorReference: string;
  participationReference: string;
  connectionSurface: string;
  requestedState: CASESParticipationState;
}

export interface CASESServiceParticipationEnvelope {
  readonly type: "cases-service-participation-envelope";
  readonly version: "CASES-PARTICIPATION-1";
  readonly serviceReference: string;
  readonly descriptorReference: string;
  readonly participationReference: string;
  readonly connectionSurface: string;
  readonly state: CASESParticipationState;
  readonly createdAt: number;
}

export class CASESServiceParticipationEnvelopeFactory {
  create(
    request: CASESServiceParticipationRequest
  ): CASESServiceParticipationEnvelope {
    return Object.freeze({
      type: "cases-service-participation-envelope",
      version: "CASES-PARTICIPATION-1",
      serviceReference: cleanId(request.serviceReference),
      descriptorReference: cleanId(
        request.descriptorReference
      ),
      participationReference: cleanId(
        request.participationReference
      ),
      connectionSurface: cleanSurface(
        request.connectionSurface
      ),
      state: normalizeState(request.requestedState),
      createdAt: Date.now()
    });
  }

  connect(
    request: CASESServiceParticipationRequest
  ): CASESServiceParticipationEnvelope {
    return this.create({
      ...request,
      requestedState: "CONNECTED"
    });
  }

  suspend(
    request: CASESServiceParticipationRequest
  ): CASESServiceParticipationEnvelope {
    return this.create({
      ...request,
      requestedState: "SUSPENDED"
    });
  }

  unplug(
    request: CASESServiceParticipationRequest
  ): CASESServiceParticipationEnvelope {
    return this.create({
      ...request,
      requestedState: "UNPLUGGED"
    });
  }
}

export const casesServiceParticipationEnvelope =
  new CASESServiceParticipationEnvelopeFactory();

export function isCASESParticipationEnvelope(
  value: unknown
): value is CASESServiceParticipationEnvelope {
  if (!value || typeof value !== "object") {
    return false;
  }

  const envelope =
    value as Partial<CASESServiceParticipationEnvelope>;

  return (
    envelope.type ===
      "cases-service-participation-envelope" &&
    envelope.version === "CASES-PARTICIPATION-1" &&
    typeof envelope.serviceReference === "string" &&
    typeof envelope.descriptorReference === "string" &&
    typeof envelope.participationReference === "string" &&
    typeof envelope.connectionSurface === "string" &&
    isParticipationState(envelope.state) &&
    typeof envelope.createdAt === "number"
  );
}

function normalizeState(
  value: unknown
): CASESParticipationState {
  switch (value) {
    case "PENDING":
    case "CONNECTED":
    case "SUSPENDED":
    case "UNPLUGGED":
      return value;

    default:
      return "PENDING";
  }
}

function isParticipationState(
  value: unknown
): value is CASESParticipationState {
  return (
    value === "PENDING" ||
    value === "CONNECTED" ||
    value === "SUSPENDED" ||
    value === "UNPLUGGED"
  );
}

function cleanId(
  value: unknown
): string {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return "";
  }

  return String(value)
    .trim()
    .slice(0, 128);
}

function cleanSurface(
  value: unknown
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, 256);
}
