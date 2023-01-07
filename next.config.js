/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
  webpack: (config) => ({
    ...config,
    experiments: {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    },
  }),
};

export default nextConfig;
