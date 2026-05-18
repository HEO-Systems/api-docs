# Game server console and log endpoints

These endpoints let HEO API keys open a game server console stream, send
console commands, and retrieve the latest game server log for scoped servers.

## Authentication and scopes

Send a HEO API key in the `Authorization` header.

```text
Authorization: Bearer <api_key>
```

Required scopes:

| endpoint | required HEO scope | action |
|---|---|---|
| `GET /v1/hosting/game/console/{server_id}/websocket` | `game-console:read` or `game-console:read_write` | Open a console stream |
| `POST /v1/hosting/game/console/{server_id}/command` | `game-console:read_write` | Send console commands |
| `GET /v1/hosting/game/logs/{server_id}/latest` | `game-logs:read` | Read the latest log |

Console write scope does not grant log access. Log access requires
`game-logs:read`.

Read-only `game-console:read` keys can only open read-only console streams. If
the stream can send commands, use `game-console:read_write`.

## `GET /v1/hosting/game/console/{server_id}/websocket`

Returns short-lived websocket bootstrap data for the game server console. The
response does not include stored account credentials.

When the websocket server signals that the stream token is expiring or expired,
request fresh bootstrap data from this endpoint and authenticate the existing or
new websocket connection with the refreshed token.

```json
{
  "success": true,
  "server_id": "srv_123",
  "websocket": {
    "socket_url": "wss://console.example.com/ws",
    "token": "short-lived-token"
  }
}
```

## `POST /v1/hosting/game/console/{server_id}/command`

Sends a command to the game server console. The API key must include
`game-console:read_write`.

```bash
curl -sS -X POST \
  "https://api.heo-systems.net/v1/hosting/game/console/srv_123/command" \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -d '{"command":"say Deployment complete"}'
```

```json
{
  "success": true,
  "server_id": "srv_123",
  "status": "sent"
}
```

## `GET /v1/hosting/game/logs/{server_id}/latest`

Returns the latest game server log as text.

```json
{
  "success": true,
  "server_id": "srv_123",
  "empty": false,
  "content": "[12:00:00] Server started\n"
}
```

## Error responses

| code | error | message |
|---|---|---|
| `400` | `validation_error` | Invalid JSON body or missing command |
| `401` | `unauthorized` | Missing, invalid, or revoked API key |
| `403` | `forbidden` | You do not have access to this game server |
| `403` | `insufficient_scope` | Required console or log scope is missing |
| `403` | `provider_permission_denied` | Console commands are not available for this server |
| `404` | `not_found` | Endpoint not found |
| `405` | `method_not_allowed` | Method not allowed |
| `502` | `provider_error` | The console or log request failed |

Stored account credentials are never returned in these responses.
