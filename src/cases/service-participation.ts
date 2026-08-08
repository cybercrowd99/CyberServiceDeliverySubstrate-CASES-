/**
 * CASES — Cyber Service Delivery Substrate
 *
 * Independent Service Participation Descriptor
 *
 * ONE JOB:
 * Describe the bounded participation surface of an independently built
 * service without absorbing, executing, transforming, or redefining the
 * service itself.
 *
 * Ownership boundary:
 *
 *   Independent Service
 *          │
 *          │ owns capability + behavior
 *          ▼
 *        CASES
 *          │
 *          │ owns connection surface
 *          ▼
 *      CyberCrowd
 *
 * This module does not:
 * - execute a service
 * - invoke a service
 * - transfer ownership
 * - establish legal ownership
 * - redefine service behavior
 * - infer service capability
 * - infer human intent
 * - create a relationship
 * - authorize an action
 * - move data beyond the declared participation surface
 * - convert a latent CASES state into active work
 *
 * It only describes the independent system's declared participation
 * boundary in structurally immutable form.
 */

export type ServiceParticipationResult =
  | ServiceParticipationAccepted
  | ServiceParticipationRejected;

export type ServiceParticipationAccepted = Readonly<{
  routed: true;
  participation: ServiceParticipation;
}>;

export type ServiceParticipationRejected = Readonly<{
  routed: false;
  participation: null;
}>;

export type ServiceCapability = Readonly<{
  id: string;
  label: string;
}>;

export type ServiceConnectionSurface = Readonly<{
  identity?: boolean;
  bookings?: boolean;
  payments?: boolean;
  storefront?: boolean;
  analytics?: boolean;
  fleetLocation?: boolean;
  accessibility?: boolean;
}>;

export type ServiceParticipation = Readonly<{
  systemId: string;
  serviceId: string;
  capabilities: readonly ServiceCapability[];
  connectionSurface: ServiceConnectionSurface;
}>;

export function validateServiceParticipation(
  participation: ServiceParticipation,
): ServiceParticipationResult {
  if (!isStructurallyValidServiceParticipation(participation)) {
    return Object.freeze({
      routed: false,
      participation: null,
    });
  }

  return Object.freeze({
    routed: true,
    participation,
  });
}

function isStructurallyValidServiceParticipation(
  participation: ServiceParticipation,
): participation is ServiceParticipation {
  if (participation === null || typeof participation !== "object") {
    return false;
  }

  if (
    typeof participation.systemId !== "string" ||
    participation.systemId.length === 0
  ) {
    return false;
  }

  if (
    typeof participation.serviceId !== "string" ||
    participation.serviceId.length === 0
  ) {
    return false;
  }

  if (!Array.isArray(participation.capabilities)) {
    return false;
  }

  for (const capability of participation.capabilities) {
    if (
      capability === null ||
      typeof capability !== "object" ||
      typeof capability.id !== "string" ||
      capability.id.length === 0 ||
      typeof capability.label !== "string" ||
      capability.label.length === 0
    ) {
      return false;
    }
  }

  if (
    participation.connectionSurface === null ||
    typeof participation.connectionSurface !== "object"
  ) {
    return false;
  }

  return true;
}
