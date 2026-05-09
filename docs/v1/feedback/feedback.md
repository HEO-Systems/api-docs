# Knowledge base feedback endpoint

`POST /v1/kb/feedback` records reader feedback for a knowledge base article.

No authentication is required.

## Request

Send a JSON request body.

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
| `title` | string | No | Article title for the feedback event |
| `helpful` | boolean | Yes | Whether the reader marked the article as helpful |
| `slug` | string | No | Article slug or path |

## Success responses

| code | body | when it happens |
|---|---|---|
| `200` | `{"success":true}` | Feedback accepted |
| `202` | `{"success":true}` | Feedback accepted without downstream forwarding |

## Error responses

| code | body | when it happens |
|---|---|---|
| `400` | text | Invalid JSON body, unknown fields, or missing `helpful` |
| `405` | text | Method is not `POST` |
| `415` | text | `Content-Type` is present but not `application/json` |
| `429` | text | Rate limit exceeded |
| `500` | text | Internal processing failed |
| `502` | text | Temporary downstream failure |
