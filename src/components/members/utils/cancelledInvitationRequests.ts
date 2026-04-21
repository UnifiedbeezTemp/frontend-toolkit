import { api } from "../../../api"

export type InvitationRequestMethod = "delete" | "patch" | "post" | "put"

interface CancelledInvitationRequestDescriptor<TPayload> {
  method: InvitationRequestMethod
  endpoint: string
  buildPayload: (payload: TPayload) => unknown
  unavailableMessage: string
}

interface SingleCancelledInvitationPayload {
  invitationId: string
}

interface BulkCancelledInvitationPayload {
  invitationIds: string[]
}

const replaceEndpointTokens = (
  endpoint: string,
  payload: SingleCancelledInvitationPayload | BulkCancelledInvitationPayload,
) =>
  endpoint
    .replace(
      ":invitationId",
      "invitationId" in payload ? encodeURIComponent(payload.invitationId) : "",
    )
    .replace(
      ":invitationIds",
      "invitationIds" in payload
        ? payload.invitationIds.map((id) => encodeURIComponent(id)).join(",")
        : "",
    )
    .trim()

const runCancelledInvitationRequest = async <TResult, TPayload>(
  descriptor: CancelledInvitationRequestDescriptor<TPayload>,
  payload: TPayload,
): Promise<TResult> => {
  const endpoint = replaceEndpointTokens(
    descriptor.endpoint,
    payload as
      | SingleCancelledInvitationPayload
      | BulkCancelledInvitationPayload,
  )

  if (!endpoint) {
    throw new Error(descriptor.unavailableMessage)
  }

  const requestPayload = descriptor.buildPayload(payload)

  switch (descriptor.method) {
    case "delete":
      return api.delete<TResult>(endpoint, { data: requestPayload })
    case "patch":
      return api.patch<unknown, TResult>(endpoint, requestPayload)
    case "post":
      return api.post<unknown, TResult>(endpoint, requestPayload)
    case "put":
      return api.put<unknown, TResult>(endpoint, requestPayload)
    default:
      throw new Error("Unsupported invitation request method")
  }
}

// Update only `method` and `endpoint` when the backend is ready.
export const deleteCancelledInvitationRequest: CancelledInvitationRequestDescriptor<SingleCancelledInvitationPayload> =
  {
    method: "delete",
    endpoint: "",
    buildPayload: ({ invitationId }) => ({ invitationId }),
    unavailableMessage:
      "Cancelled invitation delete endpoint is not configured yet.",
  }

// Update only `method` and `endpoint` when the backend is ready.
export const bulkDeleteCancelledInvitationRequest: CancelledInvitationRequestDescriptor<BulkCancelledInvitationPayload> =
  {
    method: "delete",
    endpoint: "",
    buildPayload: ({ invitationIds }) => ({ invitationIds }),
    unavailableMessage:
      "Bulk cancelled invitation delete endpoint is not configured yet.",
  }

export const requestCancelledInvitationDeletion = <TResult = unknown>(
  invitationId: string,
) =>
  runCancelledInvitationRequest<TResult, SingleCancelledInvitationPayload>(
    deleteCancelledInvitationRequest,
    { invitationId },
  )

export const requestBulkCancelledInvitationDeletion = <TResult = unknown>(
  invitationIds: string[],
) =>
  runCancelledInvitationRequest<TResult, BulkCancelledInvitationPayload>(
    bulkDeleteCancelledInvitationRequest,
    { invitationIds },
  )
