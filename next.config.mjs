/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-domain.com"], // Add your domain here if needed
    unoptimized: true, // Add this line
  },
  typescript: {
    // During development, you might want to set this to true temporarily
    ignoreBuildErrors: false,
  },
  eslint: {
    // During development, you might want to set this to true temporarily
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
