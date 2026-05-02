# Status widget script endpoint

`GET /v1/heo-status.js` serves a browser widget script that polls the status
API and displays a toast when services are disrupted or under maintenance.

## Request

Use a standard script include:

```html
<script src="https://api.heo-systems.net/v1/heo-status.js"></script>
```

## Response

On success, the endpoint returns JavaScript with:

- `Content-Type: application/javascript`
- Internal polling against `/v1/status` on a 10-second interval
- A dismissible toast UI appended to `document.body`

## Error responses

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |

## Operational notes

The script contains hardcoded service URLs for production use. If you need
environment-specific behavior, use your own wrapper script or host-specific
build step, then load the API endpoints you need.
