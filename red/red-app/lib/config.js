require('dotenv').config();

const config = {
  app: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || '9595',
    storagePath: process.env.STORAGE_PATH || './storage',
    webUrl: process.env.WEB_URL || '',
  },
  db: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || '5432',
    user: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DATABASE || '',
    connectionTimeoutMillis: process.env.PG_TIMEOUT || '15000',
    max: process.env.PG_POOL_MAX || '20',
    idleConnectTimeout: process.env.PG_POOL_TIMEOUT || '15000',
    idleTimeoutMillis: process.env.PG_POOL_IDLE_TIMEOUT || '150000',
  }
}


module.exports = config;
