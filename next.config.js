/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
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
    ],
    domains: ['moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com', 'images.munto.kr'],
  },
};

module.exports = nextConfig;
