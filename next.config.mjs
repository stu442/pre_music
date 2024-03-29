import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/image/**',
          },
        ],
      },
    
}

// module.exports = nextConfig
export default withPlaiceholder(nextConfig);