import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  envPrefix: 'VITE_', // Las variables de entorno deben empezar con "VITE_"
  base: '/saludo/', // Configuración del subdirectorio base
});
