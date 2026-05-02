# API documentation

This documentation explains how to integrate with HEO Systems API from client and
server applications. It focuses on stable request and response contracts for
public endpoints and leaves out internal deployment and configuration details.

## Version and base URL

All versioned API routes in this docset use the `/v1` prefix.

```text
https://api.heo-systems.net/v1
```

## Authentication

Current endpoints in this docset are public and don't require authentication.

## Common behavior

The API applies these shared behaviors:

- It enforces rate limits per client IP.
- It returns `405 method not allowed` for unsupported methods.
- It supports CORS for approved browser origins.

## Endpoints

- [Status endpoint](./v1/status.md): `GET /v1/status`
- [Plan catalog endpoint](./v1/plans.md): `GET /v1/plans`
- [Blog endpoints](./v1/blog.md): `GET /v1/blog/list`,
  `GET /v1/blog/article`
- [Knowledge base endpoints](./v1/knowledge-base.md): `GET /v1/kb/list`,
  `GET /v1/kb/article`
- [Knowledge base feedback endpoint](./v1/feedback.md):
  `POST /v1/kb/feedback`
- [Status widget script endpoint](./v1/widget.md): `GET /v1/heo-status.js`
- [Health endpoint](./v1/health.md): `GET /health`