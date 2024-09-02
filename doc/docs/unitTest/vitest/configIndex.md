# 配置索引

## [配置](https://cn.vitest.dev/config/#%E9%85%8D%E7%BD%AE)

`vitest` 将读取你的项目根目录的 `vite.config.ts` 文件以匹配插件并设置为你的 Vite 应用。如果想使用不同的配置进行测试，你可以：

创建 `vitest.config.ts`，优先级更高。
将 `--config` 选项传递给 CLI，例如 `vitest --config ./path/to/vitest.config.ts` 。
在 `defineConfig` 中使用 `process.env.VITEST` 或 `mode` 属性（默认值是 `test`）在 `vite.config.ts` 中有条件的应用不同的配置。
要配置 `vitest` 本身，请在你的 Vite 配置中添加 `test` 属性。如果你使用 `vite` 的 `defineConfig` 你还需要将 三斜线指令 写在配置文件的顶部。

使用 `vite` 的 `defineConfig` 可以参考下面的格式：

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify options here.
  },
});
```

## [配置选项](https://cn.vitest.dev/config/#%E9%85%8D%E7%BD%AE%E9%80%89%E9%A1%B9) 查看 vitest 的配置

### include

- 类型： `string[]`
- 默认值： `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`

匹配包含测试文件的 glob 规则。

### exclude

- 类型： `string[]`
- 默认值： `['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*']`

匹配排除测试文件的 glob 规则。

### includeSource

- 类型： `string[]`
- 默认值： `[]`

包括源代码中的测试文件的通配符。

当定义时，Vitest 将运行所有包含 import.meta.vitest 的匹配文件。

### environment

- 类型： `'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string`
- 默认值： `node`
- 命令行终端: `--environment=<env>`

Vitest 中的默认测试环境是一个 Node.js 环境。如果你正在构建 Web 端应用，你可以使用 `jsdom` 或 `happy-dom` 这种类似浏览器(browser-like)的环境来替代 Node.js。 如果你正在构建边缘计算函数，你可以使用 `edge-runtime` 环境

### setupFiles

- 类型： `string | string[]`

setup 文件的路径。它们将运行在每个测试文件之前。
