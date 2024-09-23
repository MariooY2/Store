/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // Matches any image from the pexels domain
      },
      {
        protocol: "https",
        hostname: "wmongmxyifwtvsmqzgzg.supabase.co",
        pathname: "/storage/v1/object/public/**", // Matches any image in the supabase storage bucket
      },
    ],
  },
};

export default nextConfig;