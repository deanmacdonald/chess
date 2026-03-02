/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},

  webpack: (config) => {
    config.cache = false;

    config.watchOptions = {
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "/data/**",
        "/data/data/**",
        "/storage/**",
        "/system/**",
        "/proc/**",
        "/dev/**",
        "/sys/**",
        "/", // <- critical: ignore root
        "/data", // <- critical: ignore parent
        "/data/data", // <- critical: ignore parent
      ],
      followSymlinks: false,
    };

    return config;
  },
};

module.exports = nextConfig;
