# [Test API 索引](https://cn.vitest.dev/api/)

下面的类型签名中使用了以下类型：

```ts
type Awaitable<T> = T | PromiseLike<T>;
type TestFunction = () => Awaitable<void>;

interface TestOptions {
  /**
   * 如果执行时间过长，测试将失败
   */
  timeout?: number;
  /**
   * 如果测试失败，将重试特定次数
   *
   * @default 0
   */
  retry?: number;
  /**
   * 即使每次都失败，也会重复多次相同的测试
   * 如果有 "retry" 选项并且失败，它将在每个周期中使用每次重试
   * 对于调试随机故障很有用
   *
   * @default 0
   */
  repeats?: number;
}
```

## test

- 类型：`(name: string | Function, fn: TestFunction, timeout?: number | TestOptions) => void`
- 别名：`it`

`test` 定义了一组相关的期望。 它接收测试名称和保存测试期望的函数。
或者，我们可以提供超时（以毫秒为单位）来指定终止前等待的时间。 默认为 5 秒，可以通过 [testTimeout](https://cn.vitest.dev/config/#testtimeout) 进行全局配置

```ts
import { expect, test } from 'vitest';

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2);
});
```
