import type { NextConfig } from "next";

const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // если деплоишь в докер/на сервер
};

export default nextConfig;
