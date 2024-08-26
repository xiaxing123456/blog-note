import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import nav from './configs/nav-config';
import sidebar from './configs/sidebar-config';

// 配置当前环境变量
// 根据文件名获取对应的环境变量
const basePath = path.resolve(__dirname, '..');
const envFiles = [`${basePath}/.env`, `${basePath}/.env.${process.env.NODE_ENV || 'development'}`];
envFiles.forEach(file => {
  const envConfig = dotenv.parse(readFileSync(file));
  Object.keys(envConfig).forEach(k => {
    process.env[k] = envConfig[k];
  });
});
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: process.env.VITE_DOCS_TITLE,
  description: '前端笔记',
  assetsDir: 'static',
  outDir: '../docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '导览',
    outline: [2, 4],
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: +(process.env.VITE_PORT || 5175),
    },
    plugins: [],
  },
});
