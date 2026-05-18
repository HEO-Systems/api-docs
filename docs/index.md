# API documentation

This directory contains the production API reference for HEO Systems API. It
covers the public endpoint surface for external integrations, including request
rules, authentication, response shapes, and safe usage examples.

## Version and base path

All API routes in this docset use the `/v1` prefix.

Example base URL:

```text
https://api.heo-systems.net/v1
```

## Authentication

Most `/v1` endpoints are public. Customer-scoped hosting control endpoints
require API key authentication.

## Operational behavior

The API applies shared behavior across endpoints:

- Rate limiting is enforced per client IP.
- CORS is enabled for approved origins.
- Non-supported methods return `405 method not allowed`.
- Public content endpoints usually return plain-text errors.
- Authenticated control endpoints return JSON errors.

## Endpoints by category

These endpoint pages are grouped by integration use case.

### Monitoring and service status

Use these endpoints for uptime checks and external service visibility.

- [Health endpoint](./v1/health.md): `GET /health`
- [Status endpoint](./v1/status.md): `GET /v1/status`

### Product and pricing data

Use this endpoint to load public plan metadata in product surfaces.

- [Plan catalog endpoint](./v1/plans.md): `GET /v1/plans`

### Content delivery

Use these endpoints to list and fetch published blog and knowledge base
articles.

- [Blog endpoints](./v1/blog.md): `GET /v1/blog/list`, `GET /v1/blog/article`
- [Knowledge base endpoints](./v1/knowledge-base.md): `GET /v1/kb/list`,
  `GET /v1/kb/article`

### User feedback intake

Use this endpoint to collect knowledge base feedback.

- [Knowledge base feedback endpoint](./v1/feedback.md):
  `POST /v1/kb/feedback`

### Embeddable client assets

Use this endpoint to load the hosted status widget script.

- [Status widget script endpoint](./v1/widget.md): `GET /v1/heo-status.js`

### Customer VPS controls

Use these endpoints for customer-scoped VPS power actions.

- [VPS custom power control endpoints](./v1/hosting/vps-custom-power.md):
  `POST /v1/hosting/cloud/vps-custom/{id}/start`,
  `POST /v1/hosting/cloud/vps-custom/{id}/stop`,
  `POST /v1/hosting/cloud/vps-custom/{id}/reset`

### Customer game server controls

Use these endpoints for customer-scoped game server power, console, and log
actions.

- [Game server power control endpoints](./v1/hosting/game-power.md):
  `POST /v1/hosting/game/power/{server_id}/start`,
  `POST /v1/hosting/game/power/{server_id}/stop`,
  `POST /v1/hosting/game/power/{server_id}/restart`,
  `POST /v1/hosting/game/power/{server_id}/kill`
- [Game server console and log endpoints](./v1/hosting/game-console-logs.md):
  `GET /v1/hosting/game/console/{server_id}/websocket`,
  `POST /v1/hosting/game/console/{server_id}/command`,
  `GET /v1/hosting/game/logs/{server_id}/latest`

## Content response quick reference

Blog and knowledge base list endpoints return metadata only. Article endpoints
return the same metadata plus the rendered body.

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

When you use the API, start with the endpoint page that matches your
integration and test requests with a scoped API key where authentication is
required.
