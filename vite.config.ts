import { defineConfig, UserConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig(({ mode }) => {
  let config: UserConfig = {
    plugins: [preact()],
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
      }
    },
    build: {
      sourcemap: true
    }
  }

  if (mode === 'development') {
    config.server = {
      port: 3004,
      proxy: {
        '/dev': {
          target: 'http://localhost:3005/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/dev/, '')
        }
      },
      cors: false
    }

    return config;
  } else if (mode === 'production') {
    return config;
  }
});