/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },

  env: {
    AWS_REGION:process.env.AWS_REGION,
    ACCESS_KEY:process.env.ACCESS_KEY,
    SECRET_KEY:process.env.SECRET_KEY,
    BUCKET_NAME:process.env.BUCKET_NAME,
    NEXT_PUBLIC_API_URL:process.env.NEXT_PUBLIC_API_URL,
  },
/*   env:{
    TOSS_SECRET_SECRET:process.env.TOSS_SECRET_SECRET
  }, */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.munto.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ['moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com', 'images.munto.kr'],
  },
};

module.exports = nextConfig;
