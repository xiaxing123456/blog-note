# [vue test utils](https://test-utils.vuejs.org/installation/)

```bash
    pnpm install --save-dev @vue/test-utils
```

## 开始

我们将从一个简单的组件开始

```vue
// TodoApp.vue
<template>
  <div data-test="todo">Learn Vue.js 3</div>
</template>

<script setup="ts"></script>
```

```ts
// TodoApp.spec.ts
import { mount } from '@vue/test-utils';
import TodoApp from './TodoApp.vue';

test('renders a todo', () => {
  // 获取组件实例
  const wrapper = mount(TodoApp);

  // 获取CSS属性值为 "todo" 的元素实例
  const todo = wrapper.get('[data-test="todo"]');

  // 断言文本
  expect(todo.text()).toBe('Learn Vue.js 3');
});
```
