// @ts-check
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com', 'i.imgur.com'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
      ],
    },
  ],
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/latest',
        permanent: true,
      },
      {
        source: '/join',
        destination: 'https://theatrejs.notion.site/Join-Theatre-js-9bf931f3a5ef4872beff7b0e2fa217c1',
        permanent: false,
      },
    ]
  },
})
