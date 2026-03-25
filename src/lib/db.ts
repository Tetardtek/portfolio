import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? 'portfolio',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'portfolio_v2',
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 5,
      idleTimeout: 60000,
    })
  }
  return pool
}
