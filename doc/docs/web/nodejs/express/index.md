# express + ts 搞定后端

原文：https://juejin.cn/post/6949194205759373319

## 执行`pnpm`命令，初始化工程目录

> npm i pnpm -g // 全局安装 pnpm
> pnpm init
> 执行完成后，会在 `server` 根目录下生成一个最基础的 `package.json` 文件。

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node app.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## `typescript` 初始化及配置

1. 安装 `typescript` 依赖
   > pnpm add typescript -D
2. 初始化 `typescript` 配置
   > tsc --init
   > 全局安装 typescript（控制台执行 pnpm add typescript -g）即可在全局环境下使用 tsc
   > 或者执行 pnpm exec tsc --init
   > 执行成功后，会在 `server` 根目录下生成一个包含默认配置的 `tsconfig.json` 文件。
3. 根据项目需求，精简配置

```json
{
  "compilerOptions": {
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": ["es5", "es6"] /* Specify library files to be included in the compilation. */,
    "strict": true /* Enable all strict type-checking options. */,
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
    "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

注意：需要开启 experimentalDecorators 和 emitDecoratorMetadata 配置，因为后续的 typeorm 和 routing-controller 处理会用拿到 typescript 的装饰器特性。

## 添加 `express`

1. 安装 `express` 相关依赖

```shell
pnpm add express body-parser routing-controllers

pnpm add @types/express @types/body-parser -D
```

2. 添加应用入口文件

   1. 在 `server` 根目录下，新建 `app.ts` 文件，作为应用的入口文件。

   `app.ts` 中引用 `routing-controllers` 的 `createExpressServer` 函数，用于创建 `express` 应用实例

   ```js
   import { createExpressServer } from 'routing-controllers';
   import { json, urlencoded } from 'body-parser';

   const app = createExpressServer({
     controllers: [],
   });

   // body 解析相关中间件
   // 解析 json 格式
   app.use(json());
   // 解析 urlencoded body
   // 会在 request 对象上挂载 body 属性，包含解析后的数据。
   // 这个新的 body 对象包含 key-value 键值对，若设置 extended 为 true，则键值可以是任意累心个，否则只能是字符串或数组。
   app.use(urlencoded({ extended: true }));
   ```

   此时我们还没有 controllers，将在下一步实现 User 接口时添加。

   2. 启动服务，监听 `3000` 端口
      app.ts 中添加以下代码，表示启动服务，监听 3000 端口，若启动成功则控制台打印提示信息。

      ```js
      app.listen(3000, () => {
        console.log(`  App is running at http://localhost:3000\n`);
        console.log('  Press CTRL-C to stop\n');
      });
      ```

   3. 测试运行
      因为使用 typescript 编写，若想直接运行 app.ts，需要安装 ts-node 包。

      ```shell
            pnpm add ts-node -D
      ```
