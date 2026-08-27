import withPWA from 'next-pwa';

const nextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/pro-components', 'rc-pagination', 'rc-picker', 'rc-util', '@zoomus/websdk'],
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'lodash', 'react-icons', 'react-bootstrap'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
      {
        source: '/v1/:path*',
        destination: 'http://localhost:3000/v1/:path*',
      },
    ];
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || process.env.PWA_DISABLE === 'true',
  register: true,
  skipWaiting: true,
})(nextConfig);
