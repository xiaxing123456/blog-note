# API 参考

## mount

创建一个包装器，其中包含要测试的已挂载和渲染的 Vue 组件。请注意，当使用 Vitest 模拟日期/计时器时，必须在`.vi.setSystemTime` 之后调用它。

- **Signature:**

```ts
interface MountingOptions<Props, Data = {}> {
  attachTo?: Element | string;
  attrs?: Record<string, unknown>;
  data?: () => {} extends Data ? any : Data extends object ? Partial<Data> : any;
  props?: (RawProps & Props) | ({} extends Props ? null : never);
  slots?: { [key: string]: Slot } & { default?: Slot };
  global?: GlobalMountOptions;
  shallow?: boolean;
}

function mount(Component, options?: MountingOptions): VueWrapper;
```

- **Details:**
  `mount` 是 Vue Test Utils 公开的主要方法。它创建了一个 Vue 3 应用程序，用于保存和渲染测试中的组件。作为回报，它创建了一个包装器来对组件进行操作和断言。

```ts
import { mount } from '@vue/test-utils';

const Component = {
  template: '<div>Hello world</div>',
};

test('mounts a component', () => {
  const wrapper = mount(Component, {});

  expect(wrapper.html()).toContain('Hello world');
});
```

请注意，它接受第二个参数来定义组件的状态 configuration.`mount`

**示例：使用组件 props 和 Vue App 插件进行挂载**

```ts
const wrapper = mount(Component, {
  props: {
    msg: 'world',
  },
  global: {
    plugins: [vuex],
  },
});
```

### options.global

在组件状态中，您可以通过 MountingOptions.global-config 属性配置前面提到的 Vue 3 应用程序。这将有助于提供您的组件期望可用的模拟值。

> TIP
>
> 如果你发现自己必须为许多测试设置通用的应用程序配置，那么你可以使用导出的配置对象为整个测试套件设置配置。

#### attachTo

- 类型： `Element | string`
- 描述：可以是有效的 CSS 选择器，也可以是连接 document 中的 Element 实例
- 案例:

  - `Component.vue`

  ```vue
  <template>
    <p>Vue Component</p>
  </template>
  ```

  - `Component.spec.js`

  ```ts
  import { mount } from '@vue/test-utils';
  import Component from './Component.vue';

  document.body.innerHTML = `
    <div>
        <h1>Non Vue app</h1>
        <div id="app"></div>
    </div>
    `;

  test('mounts on a specific element', () => {
    const wrapper = mount(Component, {
      attachTo: document.getElementById('app'),
    });

    expect(document.body.innerHTML).toBe(`
    <div>
        <h1>Non Vue app</h1>
        <div id="app"><div data-v-app=""><p>Vue Component</p></div></div>
    </div>
    `);
  });
  ```

### Methods

#### get

- 类型： `string[]`
- 默认值： `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`

匹配包含测试文件的 glob 规则。
