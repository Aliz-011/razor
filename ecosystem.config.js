module.exports = {
  apps: [
    {
      name: 'razor-web',
      script: '.output/server/index.mjs',
      interpreter: 'bun',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',

      env: {
        NODE_ENV: 'development',
        PORT: 3001, // Default port for this app
        VITE_SERVER_URL: 'http://10.113.4.55',
      },

      env_production: {
        NODE_ENV: 'production',
        PORT: 3001, // Make sure this matches the port Nginx proxies to for the root location (/)
        VITE_SERVER_URL: 'http://10.113.4.55',
      },
    },

    {
      name: 'razor-api',
      script: 'dist/src/index.js',
      interpreter: 'bun',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',

      env: {
        NODE_ENV: 'development',
        PORT: 3000, // Default port for this app
        CORS_ORIGIN: 'http://localhost:3001',
        BETTER_AUTH_SECRET: 'snqkz6CZaQNrf9UgGzd1MXlKgu93xgSi',
        BETTER_AUTH_URL: 'http://localhost:3000',
        DATABASE_URL: 'file:/home/mcdpuma/razor/apps/server/local.db',
        DB_HOST: '10.113.4.55',
        DB_HOST2: '10.97.3.211',
        DB_USERNAME: 'yuniza',
        DB_PASSWORD: 'd0Ta_blazt@22#',
      },

      // Environment variables specific to production (--env production)
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        CORS_ORIGIN: 'http://10.113.4.55',
        BETTER_AUTH_SECRET: 'snqkz6CZaQNrf9UgGzd1MXlKgu93xgSi',
        BETTER_AUTH_URL: 'http://10.113.4.55',
        DATABASE_URL: 'file:/home/mcdpuma/razor/apps/server/local.db',
        DB_HOST: '10.113.4.55',
        DB_HOST2: '10.97.3.211',
        DB_USERNAME: 'yuniza',
        DB_PASSWORD: 'd0Ta_blazt@22#',
      },
    },
  ],
};
