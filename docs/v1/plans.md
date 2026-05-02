# Plan catalog endpoint

## `GET /v1/plans`

Returns the full game plan catalog used by the website, including plan specs,
price, order link, per-plan stock state, and optional game-level sold-out state.

## Method and path

- Method: `GET`
- Path: `/v1/plans`

## Query params

None.

## Success response

- Status: `200 OK`
- Content-Type: `application/json`

```json
{
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

Sample values are illustrative; availability fields like `soldOut` can vary by game and over time.

## Errors

- `405 method not allowed` for non-GET requests.
- Invalid or missing catalog data causes startup failure instead of request-time errors.
