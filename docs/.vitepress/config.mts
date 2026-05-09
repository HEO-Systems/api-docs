import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'HEO Systems API',
  description: 'Documentation for the HEO Systems API',
  themeConfig: {
    nav: [
      { text: 'API Docs', link: '/' },
      { text: 'Status', link: '/v1/monitoring/status' },
      { text: 'Health', link: '/v1/monitoring/health' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [{ text: 'API Documentation', link: '/' }]
      },
      {
        text: 'Monitoring and service status',
        items: [
          { text: 'Status', link: '/v1/monitoring/status' },
          { text: 'Health', link: '/v1/monitoring/health' }
        ]
      },
      {
        text: 'Product and pricing data',
        items: [{ text: 'Plan catalog', link: '/v1/product/plans' }]
      },
      {
        text: 'Content delivery',
        items: [
          { text: 'Blog', link: '/v1/content/blog' },
          { text: 'Knowledge Base', link: '/v1/content/knowledge-base' }
        ]
      },
      {
        text: 'User feedback intake',
        items: [{ text: 'Knowledge base feedback', link: '/v1/feedback/feedback' }]
      },
      {
        text: 'Embeddable client assets',
        items: [{ text: 'Status widget', link: '/v1/embed/widget' }]
      },
      {
        text: 'Customer VPS controls',
        items: [{ text: 'VPS custom power', link: '/v1/hosting/vps-custom-power' }]
      }
    ]
  }
})
