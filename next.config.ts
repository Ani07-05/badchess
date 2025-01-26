/** @type {import('next').NextConfig} */
interface WebpackConfig {
  resolve: {
    fallback: {
      [key: string]: boolean;
    };
  };
}

interface NextConfig {
  reactStrictMode: boolean;
  webpack: (config: WebpackConfig, options: { isServer: boolean }) => WebpackConfig;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        os: false,
        path: false,
        stream: false,
        perf_hooks: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig

