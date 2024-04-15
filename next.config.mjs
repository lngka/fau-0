/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,  // Prettier should not require `fs` when used in the browser
        path: false,
        module: false
      };
    }
    return config;
  },
};

export default nextConfig;
