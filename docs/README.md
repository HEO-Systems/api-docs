# API documentation

This directory contains the production API reference for HEO Systems API. It
covers every public endpoint currently exposed by the server, including request
rules, response contracts, and integration notes.

## Version and base path

All API routes in this docset use the `/v1` prefix.

Example base URL:

```text
https://api.heo-systems.net/v1
```

## Authentication

Current `/v1` endpoints are public and do not require authentication.

## Operational behavior

The API applies shared runtime behavior across endpoints:

- Rate limiting is enforced per client IP.
- CORS is enabled for approved origins. Local development origins are optional
  and controlled by `ALLOW_LOCAL_ORIGINS`.
- Non-supported methods return `405 method not allowed`.
- Most business errors return plain-text messages; some endpoints return JSON.

## Endpoints

- [Status endpoint](./v1/status.md): `GET /v1/status`
- [Plan catalog endpoint](./v1/plans.md): `GET /v1/plans`
- [Blog endpoints](./v1/blog.md): `GET /v1/blog/list`, `GET /v1/blog/article`
- [Knowledge base endpoints](./v1/knowledge-base.md): `GET /v1/kb/list`,
  `GET /v1/kb/article`
- [Knowledge base feedback endpoint](./v1/feedback.md):
  `POST /v1/kb/feedback`
- [Status widget script endpoint](./v1/widget.md): `GET /v1/heo-status.js`
- [Health endpoint](./v1/health.md): `GET /health`

## Runtime configuration

These environment variables affect request handling and security behavior:

| variable | purpose |
|---|---|
| `TRUSTED_PROXIES` | Comma-separated list of trusted proxy IPs or CIDRs. The API only trusts `CF-Connecting-IP` and `X-Forwarded-For` when the direct client IP is in this list. |
| `RATELIMIT_RPS` | Token refill rate per second for the shared API limiter. |
| `RATELIMIT_BURST` | Maximum burst size for the shared API limiter. |
| `RATELIMIT_BLOCK_SECONDS` | Temporary block duration after a shared API limit violation. |
| `FEEDBACK_RATELIMIT_WINDOW_SECONDS` | Interval used by the feedback limiter. One token is refilled per interval. |
| `FEEDBACK_RATELIMIT_BURST` | Maximum burst size for the feedback limiter. |
| `ALLOW_LOCAL_ORIGINS` | When `true`, the API accepts `http://localhost:*` and `http://127.0.0.1:*` for CORS. |
| `MAX_FEEDBACK_BODY_BYTES` | Maximum request body size in bytes for `POST /v1/kb/feedback`. |

## Content model quick reference

Blog and knowledge base endpoints are backed by Markdown content files with
front matter. List endpoints return metadata only. Article endpoints return the
same metadata plus the rendered body.

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
  "body": "Markdown body (article endpoints only)",
  "html": "<p>Rendered HTML (article endpoints only)</p>"
}
```

## Next steps

When you add a new route, add or update a page in `docs/v1/` and then include
it in this index. This keeps onboarding and integrations straightforward.
