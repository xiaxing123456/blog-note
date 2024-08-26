# 博客文档搭建手册

## 一、搭建 monorepo 环境

1. **描述:**

   - 我这边采用的是 pnpm 作为包管理工具, 使用 pnpm 安装包速度快、磁盘占用小、依赖树扁平化、依赖包版本锁定等特性，适合 monorepo 项目。详细配置可以参考 [pnpm](https://pnpm.io/zh/installation)

2. **安装依赖**

```
   npm install pnpm -g #全局安装pnpm
   pnpm init #初始化项目
   pnpm install vue typescript -D #全局下添加依赖
```

3. **创建配置文件:**

   - `.npmrc`
     ```
     # 文件内容`shamefully-hoist = true` 否则安装的模块无法放置到 node_modules 目录下
     shamefully-hoist = true
     ```
   - `pnpm-workspace.yaml` 详细配置可以参考 [pnpm-workspace](https://pnpm.io/zh/pnpm-workspace_yaml)

     ```yaml
     # 定义`工作区`的根目录，并使您能够 在工作区中包含/排除目录。默认情况下，所有 所有子目录都包括在内。
     packages:
       - docs # 存放我们学习文档
       - 'packages/**' # 存放学习案例
     ```

   - `.prettierrc`

     ```ts
     {
         "useTabs": false, # 使用空格缩进
         "tabWidth": 4, # 缩进空格数
         "printWidth": 100, # 换行长度
         "singleQuote": true, # 使用单引号
         "trailingComma": "es5", # 使用es5的逗号风格
         "bracketSpacing": true, # 使用空格缩进
         "arrowParens": "avoid", # 箭头函数参数
         "semi": true, # 使用分号
         "vueIndentScriptAndStyle": false # vue 脚本和样式缩进
     }
     ```

4. **创建项目结构**

   - `docs`
   - `packages`

## 二、搭建 docs 项目

1. **创建项目依赖**
   ```
      pnpm init # 初始化项目
      pnpm add -D vitepress # 引入 vitepress
      pnpm vitepress init # 安装向导
          ┌  Welcome to VitePress!
          │
          ◇  Where should VitePress initialize the config? #VitePress应该在哪里初始化配置
          │  ./
          │
          ◇  Site title: #站点名称
          │  My Awesome Project
          │
          ◇  Site description: #站点描述
          │  A VitePress Site
          │
          ◆  Theme: #主题
          │  ● Default Theme (Out of the box, good-looking docs) #默认主题
          │  ○ Default Theme + Customization #默认主题+自定义
          │  ○ Custom Theme #自定义主题
          └
      pnpm add -D sass # 引入 sass
      pnpm add @types/node -D # 引入 node 类型
      pnpm add dotenv -D # 引入 dotenv
   ```
2. **设置配置文件**

   ```ts
   import dotenv from 'dotenv';
   import { readFileSync } from 'fs';
   import path from 'path';
   import { defineConfig } from 'vitepress';
   import nav from './configs/nav-config';
   import sidebar from './configs/sidebar-config';

   // 配置当前环境变量
   // 根据文件名获取对应的环境变量
   const basePath = path.resolve(__dirname, '..');
   const envFiles = [
     `${basePath}/.env`,
     `${basePath}/.env.${process.env.NODE_ENV || 'development'}`,
   ];
   envFiles.forEach(file => {
     const envConfig = dotenv.parse(readFileSync(file));
     Object.keys(envConfig).forEach(k => {
       process.env[k] = envConfig[k];
     });
   });
   // https://vitepress.dev/reference/site-config
   export default defineConfig({
     title: process.env.VITE_DOCS_TITLE,
     description: 'Front end learning notes',
     themeConfig: {
       // https://vitepress.dev/reference/default-theme-config
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
   ```
