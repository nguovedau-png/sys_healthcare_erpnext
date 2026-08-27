import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons', 'lodash', 'react-icons'],
  },
};

export default nextConfig;
