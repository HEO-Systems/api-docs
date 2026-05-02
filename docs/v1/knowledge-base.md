# Knowledge base endpoints

The knowledge base API provides read-only list and article routes. It supports
optional category filtering on the list endpoint.

## `GET /v1/kb/list`

This endpoint returns knowledge base summaries.

### Request

Send a `GET` request:

```bash
curl -sS https://api.heo-systems.net/v1/kb/list
```

To filter by category slug, pass `category`:

```bash
curl -sS "https://api.heo-systems.net/v1/kb/list?category=game-server-management"
```

### Query parameters

| name | required | description |
|---|---|---|
| `category` | No | Category slug from the path segment under `/knowledgebase/` |

`category` filtering is path-based, not title-based. For example, the slug
`game-server-management` matches
`/knowledgebase/game-server-management/...`.

### Success response (`200 OK`)

The response is a JSON array of article summaries.

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

Knowledge base list results are sorted by `title` ascending.

### Error responses

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
| `500` | text | Content source could not be loaded |

## `GET /v1/kb/article`

This endpoint returns one full knowledge base article with Markdown and
rendered HTML.

### Request

Provide the article `path` as a query parameter.

```bash
curl -sS "https://api.heo-systems.net/v1/kb/article?path=/knowledgebase/game-server-management/mysql-databases"
```

### Query parameters

| name | required | description |
|---|---|---|
| `path` | Yes | Full content path beginning with `/knowledgebase/` |

### Success response (`200 OK`)

The response includes summary fields plus `body` and `html`.

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

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `400` | text | `path` query parameter is missing |
| `404` | text | No article matches the given `path` |
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
| `500` | text | Content source could not be loaded |
