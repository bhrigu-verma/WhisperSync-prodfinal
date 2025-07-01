import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
  images: {
    domains: ['assets.aceternity.com','s3.us-east-1.amazonaws','lh3.googleusercontent.com']
  }
};

export default nextConfig;
