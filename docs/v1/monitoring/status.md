# Status endpoint

`GET /v1/status` returns a public service health snapshot for HEO Systems API.

No authentication is required.

## Request

Send a `GET` request to `/v1/status`.

```bash
curl -sS https://api.heo-systems.net/v1/status
```

## Success response (`200 OK`)

The response always includes `status`. It may include `disrupted` and
`maintenance` arrays depending on service state.

### All systems operational

```json
{
  "status": "up"
}
```

### One or more services disrupted

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

## Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
| `503` | `{"status":"error"}` | Status data is temporarily unavailable |
