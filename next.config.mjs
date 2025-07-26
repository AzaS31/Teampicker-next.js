import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения из .env

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Включаем App Router
  },
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  },
};

export default nextConfig;
