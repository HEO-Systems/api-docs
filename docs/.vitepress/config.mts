import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'HEO Systems API',
  description: 'Documentation for the HEO Systems API',
  themeConfig: {
    nav: [
      { text: 'API Docs', link: '/' },
      { text: 'Status', link: '/v1/status' },
      { text: 'Health', link: '/v1/health' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [{ text: 'API Documentation', link: '/' }]
      },
      {
        text: 'v1 Endpoints',
        items: [
          { text: 'Status', link: '/v1/status' },
          { text: 'Plans', link: '/v1/plans' },
          { text: 'Blog', link: '/v1/blog' },
          { text: 'Knowledge Base', link: '/v1/knowledge-base' },
          { text: 'Feedback', link: '/v1/feedback' },
          { text: 'Widget', link: '/v1/widget' },
          { text: 'Health', link: '/v1/health' }
        ]
      }
    ]
  }
})
