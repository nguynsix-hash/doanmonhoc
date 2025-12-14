import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Fix lỗi 'path is not defined' và định nghĩa __dirname cho môi trường ESM/Vite
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 1. Alias cũ của bạn
      '@': path.resolve(__dirname, './src'),
      
      // 2. ✨ ALIAS MỚI FIX LỖI REACT DUPLICATE ✨
      // Buộc Recharts và các thư viện khác sử dụng cùng một bản React chính.
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    }
  },
  server: {
    open: true,
    port: 5173
  },
  build: {
    outDir: 'dist'
  },
  base: '/',
  define: {
    'process.env': {}
  }
});