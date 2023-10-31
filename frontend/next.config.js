/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's.gravatar.com',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
      basePath: '/',
}

module.exports = nextConfig
