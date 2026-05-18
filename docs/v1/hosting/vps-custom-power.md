# VPS custom power control endpoints

These endpoints let you send power actions for customer-scoped VPS instances.
They use API key authentication and only operate on VPS IDs that are scoped to
that key. Use these endpoints when you need to start, stop, or reset a VPS from
an external integration.

## Base path

All endpoints in this page use:

```text
/v1/hosting/cloud/vps-custom/{id}
```

`{id}` is the VPS ID shown in your HEO Systems dashboard or returned by an
authorized integration workflow.

## Authentication

Send an API key in the `Authorization` header.

```text
Authorization: Bearer <api_key>
```

Revoked API keys are rejected.

## `POST /v1/hosting/cloud/vps-custom/{id}/start`

This endpoint requests a start action for the VPS.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "start",
  "vps_id": "vps_123",
  "status": "requested",
  "message": "Start action sent"
}
```

## `POST /v1/hosting/cloud/vps-custom/{id}/stop`

This endpoint requests a stop action for the VPS.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "stop",
  "vps_id": "vps_123",
  "status": "requested",
  "message": "Stop action sent"
}
```

## `POST /v1/hosting/cloud/vps-custom/{id}/reset`

This endpoint requests a reset action for the VPS.

Reset requires confirmation with `force=true`, either as a query parameter or
in a JSON request body.

### Example with query confirmation

```bash
curl -sS -X POST \
  "https://api.heo-systems.net/v1/hosting/cloud/vps-custom/vps_123/reset?force=true" \
  -H "Authorization: Bearer <api_key>"
```

### Confirmation required response (`400 Bad Request`)

```json
{
  "success": false,
  "error": "confirmation_required",
  "message": "Reset requires force=true"
}
```

## Common error responses

These endpoints can return:

| code | error | message |
|---|---|---|
| `401` | `unauthorized` | Missing, invalid, or revoked API key |
| `403` | `unauthorized` | You do not have access to this VPS |
| `404` | `not_found` | Endpoint not found |
| `405` | `method_not_allowed` | Method not allowed |
| `429` | N/A | Too many requests |
| `502` | `provider_error` | Failed to send action |

## Operational notes

Power actions are request-based. A successful response means the API accepted
the request. The VPS may take additional time to reach the requested state.
