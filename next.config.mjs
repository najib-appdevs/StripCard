// original main config
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// modify config
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mehedi.appdevs.team",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

// output modify config
// /** @type {import('next').NextConfig} */
// const nextConfig = { output: "export", images: { unoptimized: true } };
// export default nextConfig;
