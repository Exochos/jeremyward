import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server (hot reload etc.) work when opened from another device on the LAN.
  allowedDevOrigins: ["192.168.0.201"],
};

export default nextConfig;
