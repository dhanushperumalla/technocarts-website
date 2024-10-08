/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-domain.com"], // Add your domain here if needed
    unoptimized: true, // Add this line
  },
};

export default nextConfig;
