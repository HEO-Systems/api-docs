# Status widget script endpoint

`GET /v1/heo-status.js` serves a browser widget script that checks API status
and shows a toast when services are disrupted or in maintenance.

No authentication is required.

## Request

Load the script in your page:

```html
<script src="https://api.heo-systems.net/v1/heo-status.js"></script>
```

## Success response (`200 OK`)

The endpoint returns JavaScript with `Content-Type: application/javascript`.

## Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
