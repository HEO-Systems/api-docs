# Plan catalog endpoint

`GET /v1/plans` returns the current service plan catalog used by HEO Systems
properties.

No authentication is required.

## Request

Send a `GET` request to `/v1/plans`.

```bash
curl -sS https://api.heo-systems.net/v1/plans
```

## Success response (`200 OK`)

The response body is JSON with top-level `services` and `games` maps.

```json
{
  "services": {
    "webhosting": {
      "name": "Web Hosting",
      "soldOut": false,
      "soldOutMessage": "",
      "plans": [
        {
          "ram": 0,
          "storage": 10,
          "price": 0.99,
          "name": "Starter",
          "orderLink": "https://clients.heo-systems.com/...",
          "soldOut": false
        }
      ]
    }
  },
  "games": {
    "minecraft": {
      "name": "Minecraft",
      "soldOut": true,
      "soldOutMessage": "",
      "plans": [
        {
          "ram": 4,
          "storage": 32,
          "price": 3.99,
          "name": "Minecraft 4GB",
          "orderLink": "https://clients.heo-systems.com/...",
          "soldOut": true
        }
      ]
    }
  }
}
```

Sample values are illustrative. Availability can change over time.

## Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
