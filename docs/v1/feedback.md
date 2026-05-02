# Knowledge base feedback endpoint

`POST /v1/kb/feedback` records reader feedback for a knowledge base article. If
the Discord webhook integration is configured, the API forwards the event as an
embed message.

## Request

Send a JSON body.

```bash
curl -sS -X POST "https://api.heo-systems.net/v1/kb/feedback" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Creating and Managing MySQL Databases",
    "helpful": true,
    "slug": "/knowledgebase/game-server-management/mysql-databases"
  }'
```

## Request body

| field | type | required | description |
|---|---|---|---|
| `title` | string | No | Article title shown in downstream webhook message |
| `helpful` | boolean | Yes | Whether the reader marked the article as helpful |
| `slug` | string | No | Article slug/path shown in downstream webhook message |

When `title` or `slug` is empty, webhook payloads use fallback labels.

The endpoint enforces a maximum request size. The default is `32768` bytes.
You can change this value with `MAX_FEEDBACK_BODY_BYTES`.

## Success responses

The endpoint can return two success codes:

| code | body | when it happens |
|---|---|---|
| `200` | `{"success":true}` | Feedback accepted and webhook call succeeded |
| `202` | `{"success":true}` | Webhook integration is disabled in server config |

## Error responses

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `400` | text | Invalid JSON body, unknown fields, or missing `helpful` |
| `405` | text | Method is not `POST` |
| `415` | text | `Content-Type` is present but not `application/json` |
| `429` | text | Rate limit exceeded for client IP |
| `500` | text | Failed to encode or build webhook payload |
| `502` | text | Webhook delivery failed or webhook returned non-2xx |

## Feedback rate limit

Anonymous feedback submissions use a dedicated feedback rate limit per client
IP.

- Default limit: 1 request every 30 seconds.
- Exceeding the limit returns `429 Too Many Requests`.
- The response includes `Retry-After` with the configured window in seconds.

You can tune feedback limit behavior with:

- `FEEDBACK_RATELIMIT_WINDOW_SECONDS`
- `FEEDBACK_RATELIMIT_BURST`

## Integration notes

Webhook behavior is controlled by `DISCORD_FEEDBACK_WEBHOOK_URL`.

- When the variable is empty, the endpoint short-circuits with `202`.
- When the variable is set, the endpoint sends a Discord embed with feedback
  details and a UTC timestamp.
