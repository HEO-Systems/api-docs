# Knowledge base endpoints

The knowledge base API exposes read-only endpoints for listing and loading
knowledge base content.

## `GET /v1/kb/list`

This endpoint returns article summaries.

### Request

```bash
curl -sS https://api.heo-systems.net/v1/kb/list
```

You can filter by category slug:

```bash
curl -sS "https://api.heo-systems.net/v1/kb/list?category=game-server-management"
```

### Query parameters

| name | required | description |
|---|---|---|
| `category` | No | Category slug from the path segment under `/knowledgebase/` |

### Success response (`200 OK`)

```json
[
  {
    "title": "Creating and Managing MySQL Databases",
    "description": "How to create a MySQL database...",
    "path": "/knowledgebase/game-server-management/mysql-databases",
    "category": "Game Server Management"
  }
]
```

List results are sorted by `title` ascending.

### Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
| `500` | text | Content source could not be loaded |

## `GET /v1/kb/article`

This endpoint returns one full knowledge base article, including Markdown and
rendered HTML.

### Request

Pass the article `path` query parameter.

```bash
curl -sS "https://api.heo-systems.net/v1/kb/article?path=/knowledgebase/game-server-management/mysql-databases"
```

### Query parameters

| name | required | description |
|---|---|---|
| `path` | Yes | Full content path beginning with `/knowledgebase/` |

### Success response (`200 OK`)

```json
{
  "title": "Creating and Managing MySQL Databases",
  "description": "How to create a MySQL database...",
  "path": "/knowledgebase/game-server-management/mysql-databases",
  "category": "Game Server Management",
  "body": "Many advanced Minecraft plugins...",
  "html": "<p>Many advanced Minecraft plugins...</p>"
}
```

### Error responses

| code | body | when it happens |
|---|---|---|
| `400` | text | `path` query parameter is missing |
| `404` | text | No article matches the given `path` |
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
| `500` | text | Content source could not be loaded |
