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
    ],
  },
};

export default nextConfig;
