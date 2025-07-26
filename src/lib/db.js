// src/lib/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения из .env

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
