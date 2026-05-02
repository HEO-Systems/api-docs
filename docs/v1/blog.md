# Blog endpoints

The blog API exposes two read-only endpoints: one for listing articles and one
for loading a single article by path.

## `GET /v1/blog/list`

This endpoint returns blog summaries. Results are ordered by `date` descending,
so newer entries appear first.

### Request

Send a `GET` request:

```bash
curl -sS https://api.heo-systems.net/v1/blog/list
```

### Success response (`200 OK`)

The response is a JSON array of article summaries.

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

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
| `500` | text | Content source could not be loaded |

## `GET /v1/blog/article`

This endpoint returns one full blog article, including both Markdown body and
rendered HTML.

### Request

Provide the article `path` as a query parameter.

```bash
curl -sS "https://api.heo-systems.net/v1/blog/article?path=/blog/company-news/welcome-to-heo-systems-blog"
```

### Query parameters

| name | required | description |
|---|---|---|
| `path` | Yes | Full content path beginning with `/blog/` |

### Success response (`200 OK`)

The response includes summary fields plus `body` and `html`.

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

This endpoint can return:

| code | body | when it happens |
|---|---|---|
| `400` | text | `path` query parameter is missing |
| `404` | text | No blog article matches the given `path` |
| `405` | text | Method is not `GET` |
| `429` | text | Rate limit exceeded for client IP |
| `500` | text | Content source could not be loaded |
