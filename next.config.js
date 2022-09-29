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
    ]
  },
})
