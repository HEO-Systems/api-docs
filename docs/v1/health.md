# Health endpoint

`GET /health` returns a lightweight liveness response that you can use in load
balancers and external monitors.

No authentication is required.

## Request

Send a `GET` request to `/health`.

```bash
curl -sS https://api.heo-systems.net/health
```

## Success response (`200 OK`)

The response body is always JSON:

```json
{
  "status": "healthy",
  "version": "<build-version>"
}
```

The `version` value is injected at build or deploy time and varies by environment.

## Error responses

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
