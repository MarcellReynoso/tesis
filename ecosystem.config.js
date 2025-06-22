module.exports = {
  apps: [
    {
      name: 'tesis',
      script: 'npm',
      args: 'start',
      cwd: process.env.MARCELL_PATH || '.',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        NODE_OPTIONS: '--max-old-space-size=1024'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
}; 