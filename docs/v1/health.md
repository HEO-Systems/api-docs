# Health endpoint

`GET /health` returns a lightweight liveness response for load balancers and
monitors.

No authentication is required.

## Request

Send a `GET` request to `/health`.

```bash
curl -sS https://api.heo-systems.net/health
```

## Success response (`200 OK`)

The response body is JSON:

```json
{
  "status": "healthy",
  "version": "<build-version>"
}
```

`version` is environment-specific.

## Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
