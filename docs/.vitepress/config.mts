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
        items: [{ text: 'API documentation', link: '/' }]
      },
      {
        text: 'Monitoring',
        items: [
          { text: 'Status', link: '/v1/status' },
          { text: 'Health', link: '/v1/health' }
        ]
      },
      {
        text: 'Content and product',
        items: [
          { text: 'Plans', link: '/v1/plans' },
          { text: 'Blog', link: '/v1/blog' },
          { text: 'Knowledge base', link: '/v1/knowledge-base' },
          { text: 'Feedback', link: '/v1/feedback' },
          { text: 'Widget', link: '/v1/widget' }
        ]
      },
      {
        text: 'Hosting controls',
        items: [
          { text: 'VPS power', link: '/v1/hosting/vps-custom-power' },
          { text: 'Game server power', link: '/v1/hosting/game-power' },
          {
            text: 'Game console and logs',
            link: '/v1/hosting/game-console-logs'
          }
        ]
      }
    ]
  }
})
