# Game server power control endpoints

These endpoints let you send power actions for customer-scoped game servers.
They use API key authentication and only operate on server IDs that are scoped
to that key. Use these endpoints when you need to start, stop, restart, or kill
a game server from an external integration.

## Base path

All endpoints in this page use:

```text
/v1/hosting/game/power/{server_id}
```

`{server_id}` is the game server ID shown in your HEO Systems dashboard or
returned by an authorized integration workflow.

## Authentication

Send an API key in the `Authorization` header.

```text
Authorization: Bearer <api_key>
```

Revoked API keys are rejected.

## `POST /v1/hosting/game/power/{server_id}/start`

This endpoint requests a start action for the game server.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "start",
  "server_id": "srv_123",
  "status": "requested",
  "message": "Start action sent"
}
```

## `POST /v1/hosting/game/power/{server_id}/stop`

This endpoint requests a stop action for the game server.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "stop",
  "server_id": "srv_123",
  "status": "requested",
  "message": "Stop action sent"
}
```

## `POST /v1/hosting/game/power/{server_id}/restart`

This endpoint requests a restart action for the game server.

### Success response (`200 OK`)

```json
{
  "success": true,
  "action": "restart",
  "server_id": "srv_123",
  "status": "requested",
  "message": "Restart action sent"
}
```

## `POST /v1/hosting/game/power/{server_id}/kill`

This endpoint requests a forced kill action for the game server.

Kill requires confirmation with `force=true`, either as a query parameter or in
a JSON request body.

### Example with query confirmation

```bash
curl -sS -X POST \
  "https://api.heo-systems.net/v1/hosting/game/power/srv_123/kill?force=true" \
  -H "Authorization: Bearer <api_key>"
```

### Confirmation required response (`400 Bad Request`)

```json
{
  "success": false,
  "error": "confirmation_required",
  "message": "Kill requires force=true"
}
```

## Common error responses

These endpoints can return:

| code | error | message |
|---|---|---|
| `400` | `confirmation_required` | Kill requires `force=true` |
| `401` | `unauthorized` | Missing, invalid, or revoked API key |
| `403` | `forbidden` | You do not have access to this game server |
| `403` | `insufficient_scope` | This API key only has read scope |
| `404` | `not_found` | Endpoint not found |
| `405` | `method_not_allowed` | Method not allowed |
| `429` | N/A | Too many requests |
| `502` | `provider_error` | Failed to send action |

## Operational notes

Power actions are request-based. A successful response means the API accepted
the request. The game server may take additional time to reach the requested
state.
