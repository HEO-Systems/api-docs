# API documentation

This documentation explains how to integrate with HEO Systems API from client and
server applications.

## Version and base URL

All versioned API routes in this docset use the `/v1` prefix.
Note: the health endpoint is not versioned.

```text
https://api.heo-systems.net/v1
```

## Authentication

Most endpoints in this docset are public. Customer-scoped hosting control
endpoints require API key authentication.

## Common behavior

The API applies these shared behaviors:

- It enforces rate limits per client IP.
- It returns `405 method not allowed` for unsupported methods.
- It supports CORS for approved browser origins.

## Endpoints by category

These endpoint pages are grouped by integration use case.

### Monitoring and service status

Use these endpoints for uptime checks and external service visibility.

- [Health endpoint](./v1/monitoring/health.md): unversioned `GET /health` (not
  `/v1/health`)
- [Status endpoint](./v1/monitoring/status.md): `GET /v1/status`

### Product and pricing data

Use this endpoint to load public plan metadata in product surfaces.

- [Plan catalog endpoint](./v1/product/plans.md): `GET /v1/plans`

### Content delivery

Use these endpoints to list and fetch published blog and knowledge base
articles.

- [Blog endpoints](./v1/content/blog.md): `GET /v1/blog/list`,
  `GET /v1/blog/article`
- [Knowledge base endpoints](./v1/content/knowledge-base.md): `GET /v1/kb/list`,
  `GET /v1/kb/article`

### User feedback intake

Use this endpoint to collect knowledge base feedback.

- [Knowledge base feedback endpoint](./v1/feedback/feedback.md):
  `POST /v1/kb/feedback`

### Embeddable client assets

Use this endpoint to load the hosted status widget script.

- [Status widget script endpoint](./v1/embed/widget.md): `GET /v1/heo-status.js`

### Customer VPS controls

Use these endpoints for customer-scoped VPS power actions.

- [VPS custom power control endpoints](./v1/hosting/vps-custom-power.md):
  `POST /v1/hosting/cloud/vps-custom/{id}/start`,
  `POST /v1/hosting/cloud/vps-custom/{id}/stop`,
  `POST /v1/hosting/cloud/vps-custom/{id}/reset`
