/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "portfolio-image-store.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "scontent.fmnl4-4.fna.fbcdn.net",
      },
      {
        hostname: "*.fbcdn.net",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "img.youtube.com",
      },
    ],
  },
  // Add security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: false, // Set to true if you want source maps in production
};

export default nextConfig;
