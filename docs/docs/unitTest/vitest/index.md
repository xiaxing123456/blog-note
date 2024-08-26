# [Vitest](https://cn.vitest.dev/)

## 一、快速起步

### 将 Vitest 安装到项目

```bash
    pnpm add -D vitest
```

### 配置 package.json

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### 配置 Vitest

Vitest 的主要优势之一是它与 Vite 的统一配置。如果存在，`vitest` 将读取你的根目录 `vite.config.ts` 以匹配插件并设置为你的 Vite 应用。例如，你的 Vite 有 resolve.alias 和 plugins 的配置将会在 Vitest 中开箱即用。如果你想在测试期间想要不同的配置，你可以:

- 创建 `vitest.config.ts`，优先级将会最高。
- 将 `--config`选项传递给 CLI，例如 `vitest --config ./path/to/vitest.config.ts`。
- 在 `defineConfig` 上使用 `process.env.VITEST` 或 `mode` 属性（如果没有被覆盖，将设置为 test）有条件地在 `vite.config.ts` 中应用不同的配置。
  Vitest 支持与 Vite 相同的配置文件扩展名：`.js`、`.mjs`、`.cjs`、`.ts`、`.cts`、`.mts`。 Vitest 不支持 `.json` 扩展名。

如果你已经在使用 Vite，请在 Vite 配置中添加 `test` 属性。你还需要使用 三斜杠指令 在你的配置文件的顶部引用。

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ...
  },
});
```

可以参阅 [配置索引]() 中的配置选项列表

### 编写测试

例如，我们将编写一个简单的测试来验证将两个数字相加的函数的输出。

```ts
// sum.ts
export function sum(a, b) {
  return a + b;
}
```

```ts
// sum.spec.js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 执行测试

最后，运行 `npm run test`、`yarn test` 或 `pnpm test`，具体取决于你的包管理器，Vitest 将打印此消息：
