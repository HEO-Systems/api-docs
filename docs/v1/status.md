# Status endpoint

`GET /v1/status` returns the public service health snapshot for this API. The
response is derived from Uptime Kuma monitor data and heartbeat history.

No authentication is required.

## Request

Send a `GET` request to `/v1/status`.

```bash
curl -sS https://api.example.com/v1/status
```

## Success response (`200 OK`)

The response always includes `status`. It may also include `disrupted` and
`maintenance`, depending on monitor state.

Monitor names inside arrays are sorted alphabetically for stable output.

### All systems operational

```json
{
  "status": "up"
}
```

### One or more services disrupted

`disrupted` includes monitors marked as down or pending in Uptime Kuma.

```json
{
  "status": "disrupted",
  "disrupted": [
    "Main Website",
    "Celestia [HTTP]"
  ]
}
```

### Maintenance only

```json
{
  "status": "maintenance",
  "maintenance": [
    "Clients Area"
  ]
}
```

### Disrupted and maintenance at the same time

If both states exist, `status` is `disrupted`. Disruption takes priority.

```json
{
  "status": "disrupted",
  "disrupted": [
    "Astra [PING]"
  ],
  "maintenance": [
    "Clients Area"
  ]
}
```

## Error responses

The endpoint can return these non-`200` responses:

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
| `503` | `{"status":"error"}` | API cannot read Uptime Kuma |

## Status reference

| `status` | meaning |
|---|---|
| `up` | Every visible monitor is healthy |
| `disrupted` | At least one visible monitor is down or pending |
| `maintenance` | No disruptions, but one or more monitors are in maintenance |
| `error` | Upstream status source could not be reached |

## Browser and CORS notes

This endpoint supports CORS for approved origins. `OPTIONS` preflight requests
from approved origins return `204 No Content`. For unapproved origins, the API
does not return CORS headers, so browser access is blocked by the browser,
while server-to-server requests still work.

Local development origins are disabled by default and are only accepted when
`ALLOW_LOCAL_ORIGINS=true`.
