# 成本插件单元测试配置

## 一、SVN 地址

- 开发环境：http://192.168.10.181:7098/svn/P677-CostManager/trunk/dev/vue

## 二、vite.config.ts 配置

```ts
    test: {
        setupFiles: [resolve(__dirname, './tests/unit/setup-file/index.ts')], // setup 文件的路径。它们将运行在每个测试文件之前。
        globals: true, // 启用全局模式可以全局调用vitest的api
        alias: {
            '@tests': fileURLToPath(new URL('./tests', import.meta.url)), // 在测试内部运行时定义自定义别名。它们将与来自 resolve.alias 的别名合并。
        },
        environment: 'jsdom', // 更换为浏览器的环境来运行代码
        include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // 匹配包含测试文件的 glob 规则。
        coverage: {
            // provider: 'istanbul',
            reportsDirectory: 'tests/unit/coverage', // 覆盖报告目录.相当于打包地址
            include: ['src/components'], // 统计覆盖率目录
            exclude: ['src/components/cost-plt-picker/cost-plt-picker.type.ts'], // 不需要统计覆盖率的目录
            reporter: ['text', 'json', 'html'],
            all: true, // 是否将所有文件（包括未测试的文件）包括在报告中。
        },
        deps: {
            inline: [/vue/], // 指定哪些依赖应该被内联。
            experimentalOptimizer: {
                force: true,
            },
            interopDefault: true,
            external: [ // 指定哪些文件或目录应被视为外部的，不进行打包。
                '**/node_modules/**',
                '**/dist/**',
                '**/cypress/**',
                '**/.{idea,git,cache,output,temp}/**',
            ],
        },
        transformMode: { // 指定哪些文件类型需要进行转换。
            web: [/\.[jt]sx$/, /\.vue$/],
        },
    },
```

## 三、tsconfig.json 配置

```json
{
  "extends": "@dmsplatform/dev-config/tsconfig/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "allowJs": true,
    "outDir": "dist",
    "types": ["vitest/globals"],
    "paths": {
      "@cost/*": ["src/*"],
      "@tests/*": ["tests/*"], // 单元测试新加了配置
      "@engine/*": ["../../node_modules/@dmsplatform/config-engine/src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts", // 单元测试新加了配置
    "tests/**/*.tsx", // 单元测试新加了配置
    "../../node_modules/@dmsplatform/config-engine/src/types/**/*.d.ts",
    "../../node_modules/@dmsplatform/common/src/types/**/*.d.ts"
  ],
  "exclude": ["node_modules"]
}
```

## 四、测试文件目录结构

```bash
 tests:
  - unit:
    - setup-file:
      - index.ts // setup 文件
    - globals:
      - options.ts // 全局配置文件 主要配置 @vue/test-utils的基础config.global
      - plugins.ts // 全局插件 比如ElementPlus、VXETable等
      - components.ts // 全局组件配置
    - apis:
        - index.ts // api 测试文件用mock模拟
    - components: // 单元测试组件文件夹
```
