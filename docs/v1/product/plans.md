# Plan catalog endpoint

## `GET /v1/plans`

Returns the full service plan catalog used by the website, including game
hosting and web hosting plans. Web hosting plans are grouped under the top-
level `services` map, and game hosting plans are grouped under `games`. The
response includes plan specs, pricing, order link, per-plan stock state, and
service-level sold-out state.

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
        },
        {
          "ram": 0,
          "storage": 100,
          "price": 9.99,
          "name": "100GB",
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

Sample values are illustrative. Availability fields like `soldOut` can vary
by service and over time. Numeric `ram` and `storage` values are measured in
GB.

## Errors

- `405 method not allowed` for non-GET requests.
- Invalid or missing catalog data causes startup failure instead of request-time errors.
