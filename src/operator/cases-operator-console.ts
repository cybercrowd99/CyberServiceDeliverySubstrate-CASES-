/**
 * CASES — Cyber Service Delivery Substrate
 *
 * CASES Operator Console
 *
 * ONE JOB:
 * Provide a bounded operator-facing surface for an independently
 * built service participating through CASES.
 *
 * The operator console represents the operator's own participation
 * state at the CASES boundary.
 *
 * It does NOT:
 * - execute the independent service
 * - redefine service behavior
 * - interpret service capabilities
 * - authorize platform access
 * - control CyberCrowd
 * - control another service
 * - mutate service descriptors
 * - rewrite participation history
 * - create ledger records
 * - assign economic value
 * - settle payments
 * - absorb independent service ownership
 *
 * Boundary:
 *
 * INDEPENDENT SERVICE
 *        |
 *        v
 *     OPERATOR
 *        |
 *        v
 *      CASES
 *        |
 *        v
 *   CYBERCROWD
 *
 * The service remains the service.
 * The operator remains the operator.
 * CASES remains the bus.
 * CyberCrowd remains the platform.
 */

export type CASESOperatorState =
  | "PENDING"
  | "CONNECTED"
  | "SUSPENDED"
  | "UNPLUGGED";

export interface CASESOperatorRequest {
  operatorReference: string;
  serviceReference: string;
  participationReference: string;
  requestedState: CASESOperatorState;
}

export interface CASESOperatorRecord {
  readonly type: "cases-operator-record";
  readonly version: "CASES-OPERATOR-1";
  readonly operatorReference: string;
  readonly serviceReference: string;
  readonly participationReference: string;
  readonly state: CASESOperatorState;
  readonly recordedAt: number;
}

export class CASESOperatorConsole {
  create(
    request: CASESOperatorRequest
  ): CASESOperatorRecord {
    return Object.freeze({
      type: "cases-operator-record",
      version: "CASES-OPERATOR-1",
      operatorReference: cleanId(request.operatorReference),
      serviceReference: cleanId(request.serviceReference),
      participationReference: cleanId(
        request.participationReference
      ),
      state: normalizeState(request.requestedState),
      recordedAt: Date.now()
    });
  }

  connect(
    request: CASESOperatorRequest
  ): CASESOperatorRecord {
    return this.create({
      ...request,
      requestedState: "CONNECTED"
    });
  }

  suspend(
    request: CASESOperatorRequest
  ): CASESOperatorRecord {
    return this.create({
      ...request,
      requestedState: "SUSPENDED"
    });
  }

  unplug(
    request: CASESOperatorRequest
  ): CASESOperatorRecord {
    return this.create({
      ...request,
      requestedState: "UNPLUGGED"
    });
  }
}

export const casesOperatorConsole =
  new CASESOperatorConsole();

function normalizeState(
  value: unknown
): CASESOperatorState {
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
