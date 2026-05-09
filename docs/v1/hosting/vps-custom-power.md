# VPS custom power control endpoints

These endpoints let you send power actions for customer-scoped VPS instances.
They use API key authentication and only operate on VPS IDs that are scoped to
that key.

## Base path

All endpoints in this page use:

```text
/v1/hosting/cloud/vps-custom/{id}
```

`{id}` is the internal VPS ID from the `vps_servers.id` field.

## Authentication

Send an API key in the `Authorization` header.

```text
Authorization: Bearer <api_key>
```

The API stores only a secure hash of each key. Revoked keys are rejected.

## `POST /v1/hosting/cloud/vps-custom/{id}/start`

This endpoint sends a start action to the VPS provider.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "start",
  "vps_id": "vps_123",
  "provider": "HTZNR-FSN",
  "provider_server_id": 123456,
  "status": "requested",
  "message": "Start action sent to hypervisor"
}
```

## `POST /v1/hosting/cloud/vps-custom/{id}/stop`

This endpoint sends a stop action to the VPS provider.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "stop",
  "vps_id": "vps_123",
  "provider": "HTZNR-FSN",
  "provider_server_id": 123456,
  "status": "requested",
  "message": "Stop action sent to hypervisor"
}
```

## `POST /v1/hosting/cloud/vps-custom/{id}/reset`

This endpoint sends a reset action to the VPS provider.

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
| `502` | `provider_error` | Failed to send action to hypervisor |

## Operational notes

Power actions are request-based. A successful response means the action request
was accepted and sent to the provider API.
