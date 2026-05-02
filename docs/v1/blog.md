# Blog endpoints

The blog API exposes read-only endpoints for listing and loading blog content.

## `GET /v1/blog/list`

This endpoint returns article summaries ordered by `date` descending.

### Request

```bash
curl -sS https://api.heo-systems.net/v1/blog/list
```

### Success response (`200 OK`)

```json
[
  {
    "title": "Welcome to the New HEO Systems Blog",
    "description": "We are excited to announce the launch...",
    "path": "/blog/company-news/welcome-to-heo-systems-blog",
    "category": "Company News",
    "date": "2025-12-10",
    "author": "Hamza",
    "readTime": "1 min read",
    "cover": "/media/company/HEO_Systems_Banner.jpg"
  }
]
```

### Error responses

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
| `500` | text | Content source could not be loaded |

## `GET /v1/blog/article`

This endpoint returns one full blog article, including Markdown and rendered
HTML.

### Request

Pass the article `path` query parameter.

```bash
curl -sS "https://api.heo-systems.net/v1/blog/article?path=/blog/company-news/welcome-to-heo-systems-blog"
```

### Query parameters

| name | required | description |
|---|---|---|
| `path` | Yes | Full content path beginning with `/blog/` |

### Success response (`200 OK`)

```json
{
  "title": "Welcome to the New HEO Systems Blog",
  "description": "We are excited to announce the launch...",
  "path": "/blog/company-news/welcome-to-heo-systems-blog",
  "category": "Company News",
  "date": "2025-12-10",
  "author": "Hamza",
  "readTime": "1 min read",
  "cover": "/media/company/HEO_Systems_Banner.jpg",
  "body": "We are excited to announce...",
  "html": "<p>We are excited to announce...</p>"
}
```

### Error responses

| code | body | when it happens |
|---|---|---|
| `400` | text | `path` query parameter is missing |
| `404` | text | No blog article matches the given `path` |
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded |
| `500` | text | Content source could not be loaded |
