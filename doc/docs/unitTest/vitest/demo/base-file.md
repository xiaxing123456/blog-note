# 基础文件代码

## setup-file

### `index.ts:`

```ts
import '@tests/unit/apis/index';

vi.stubGlobal('logger', console);
```

## globals:

### `options.ts:`

```ts
import getComponents from '@tests/unit/globals/components';
import plugins from '@tests/unit/globals/plugins';

export const options = {
  global: {
    plugins: [...plugins],
    components: getComponents(),
  },
};
```

### `plugins.ts:`

```ts
import { platformUIplugin } from '@dmsplatform/ui';
import i18n from '@engine/i18n';
// import routes from '@engine/router';
import { VXETable } from '@engine/utils/resources/vxe-table';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import 'vxe-table-plugin-element/dist/style.css';
// import store, { key } from './store';

export default [
  // routes,

  // [store, key],
  [ElementPlus, { size: 'mini', locale: zhCn }],
  VXETable,
  i18n,
  platformUIplugin,
];
```

### `components.ts`

```ts
import { platformUIComponents } from '@dmsplatform/ui';
import PltDialog from '@dmsplatform/ui/src/components/plt-dialog/plt-dialog';

export default function () {
  const components: any = {};
  const MockDialogComponent = {
    ...PltDialog,
    props: {
      ...PltDialog.props,
      transfer: {
        type: Boolean,
        default: false, // 只覆盖这个 `prop` 的默认值
      },
    },
  };
  platformUIComponents.forEach(component => {
    if (component.name === 'PltDialog') {
      components.PltDialog = MockDialogComponent;
    } else {
      components[component.name] = component;
    }
  });
  return components;
}
```

## apis

### `index.ts`

```ts
// import '@tests/unit/apis/data-element/data-element';
import './business-process-use/business-process-use';
```

### `business-process-use.ts`

moke 用法

```ts
export const businessProcessUseApiUrl = '@cost/apis/business-process-use/business-process-use';

vi.mock(businessProcessUseApiUrl, async importOriginal => {
  const mod: any = await importOriginal(); // 获取全部文件中导出的内容
  const { data } = await vi.importActual<any>('./data.ts');

  return {
    ...mod,
    queryDataPicker: vi.fn((params: AnyObj) => {
      if (params.shellId === '1') {
        return Promise.resolve({ data });
      }
      return Promise.reject(new Error('error'));
    }),
  };
});
```

## components

### `cost-detect-errors-dialog.vue`

```vue
<template>
  <plt-dialog :model-value="modelValue" :title="title || t('errorsDialog.title')" @hide="onCancel">
    <div class="dialog-body plt-container">
      <div class="dialog-body-title">
        {{
          t('errorsDialog.span_error_and_warning_num', {
            errorNum: statistics.error,
            warningNum: statistics.warning,
            total: statistics.total,
          })
        }}
      </div>
      <div class="plt-grid-wrap">
        <plt-grid ref="pltTableEl" v-bind="pltTableOptions"></plt-grid>
      </div>
    </div>
    <template v-if="footerView" #footer>
      <span class="dialog-footer">
        <el-button
          v-if="!statistics.error"
          type="primary"
          class="base-dialog-btn"
          @click="handleConfirm"
        >
          {{ confirmName || t('global.label_btn_confirm') }}
        </el-button>
      </span>
    </template>
  </plt-dialog>
</template>
<script lang="ts" setup>
import { useCostI18n } from '@cost/composables/use-i18n/use-i18n';
import { PltGridProps } from '@dmsplatform/ui/src/components/plt-grid/plt-grid';
import { PltColumn } from '@dmsplatform/ui/src/components/plt-grid/src/index.types';
import { computed, nextTick, ref } from 'vue';
import { VxeTablePropTypes } from 'vxe-table';

const { t } = useCostI18n();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  columns: {
    type: Array,
    default: () => [],
  },
  confirmName: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:modelValue', 'callback']);

const pltTableEl = ref();
const errorTypeNeum = {
  error: t('icf.label_error'), // 错误
  warn: t('icf.label_warn'), // 警告
};
const footerView = ref(false);
/** 表格 列配置 */
const columns = computed(() =>
  props.columns.length > 0
    ? props.columns
    : [
        {
          type: 'seq',
          title: t('global.label_seq'), // 序号
          width: 60,
        },
        {
          field: 'content',
          title: t('errorsDialog.label_content'), // 信息
          showOverflow: false,
          width: 350,
        },
        {
          field: 'errorType',
          title: t('global.label_type'), // 类型
          width: 60,
          sortable: true,
          formatter: ({ cellValue }: { cellValue: 'error' | 'warn' }) => {
            return errorTypeNeum[cellValue] || '';
          },
        },
        {
          field: 'category',
          title: t('global.label_position'), // 位置
          width: 350,
          sortable: true,
        },
      ]
);
/** 表格 排序配置 */
const sortConfig = computed(() =>
  props.columns.length > 0
    ? undefined
    : {
        defaultSort: [
          {
            field: 'errorType',
            order: 'asc',
          },
          {
            field: 'category',
            order: 'asc',
          },
        ],
        multiple: true,
        showIcon: false,
      }
);
/** 表格配置项 */
const pltTableOptions = ref<PltGridProps>({
  border: true,
  autoResize: true,
  align: null,
  multipleChoice: false,
  checkboxConfig: {
    highlight: true,
    checkField: 'checked',
    range: true,
  },
  highlightCurrentRow: true,
  highlightHoverRow: true,
  columns: columns.value as PltColumn[],
  data: [],
  sortConfig: sortConfig.value as VxeTablePropTypes.SortConfig,
});

/** 统计数字，total:总数，error:报错数，warning:警告数 */
const statistics = computed(() => {
  const total = pltTableOptions.value.data?.length;
  let error = 0;
  let warning = 0;
  pltTableOptions.value.data?.forEach((item: { errorType: string }) => {
    if (item.errorType === 'error') {
      error += 1;
    } else if (item.errorType === 'warn') {
      warning += 1;
    }
  });
  return { total, error, warning };
});

/** 父组件调用此方法，获取列表数据 并 显示弹框 */
const setData = (data: any, footerShow: boolean) => {
  footerView.value = footerShow;
  nextTick(() => {
    pltTableOptions.value.data = data;
  });
};

/** 点击 【取消】 按钮 */
const onCancel = () => {
  emits('update:modelValue', false);
};
/** 点击 【确定】 按钮 */
const handleConfirm = () => {
  onCancel();
  emits('callback');
};
/** 暴露方法 */
defineExpose({
  setData,
});
</script>

<style lang="scss" scoped>
.dialog-body {
  box-sizing: border-box;
  &-title {
    margin-bottom: 9px;
    font-size: 12px;
    color: #333333;
  }
}
.container-footer {
  text-align: center;
}
</style>
```

### `cost-detect-errors-dialog.spects`

```ts
import CostDetectErrorsDialog from '@cost/components/cost-detect-errors-dialog';
import { options } from '@tests/unit/globals/options';
import sleep from '@tests/unit/setup-file/utils/sleep';
import { config, flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

config.global = options.global;
describe('CostDetectErrorsDialog', async () => {
  let wrapper: VueWrapper;
  const initData = [
    {
      errorType: 'warn',
      fields: ['主表_wsy_014', '主表_wsy_09'],
      category: '用户属性表单',
      content: '20',
    },
    {
      errorType: 'error',
      fields: ['主表_wsy_014', '主表_wsy_09'],
      category: '用户属性表单',
      content: '20',
    },
    {
      errorType: 'warn1',
      fields: ['主表_wsy_014', '主表_wsy_09'],
      category: '用户属性表单',
      content: '20',
    },
  ];
  const columns = [
    {
      type: 'seq',
      title: '序号',
      width: 60,
      className: 'noAdd',
    },
    {
      field: 'content',
      title: '信息',
      showOverflow: false,
    },
  ];
  beforeEach(async () => {
    wrapper = mount(CostDetectErrorsDialog, {
      attachTo: document.getElementById('app'),
      props: {
        modelValue: false,
        title: '错误弹窗',
        callback: () => ({}),
      },
    });
    await flushPromises();
    wrapper.setProps({ modelValue: true });
    await sleep(1000);
  });

  it('renders element', async () => {
    /** 错误弹窗组件渲染 */
    await sleep(200);
    expect(wrapper.find('.dialog-body').exists()).toBe(true);
  });

  it('handleConfirm', async () => {
    /** 向外暴露的事件 */
    wrapper.vm.setData(
      [
        {
          errorType: 'warn',
          fields: ['主表_wsy_014', '主表_wsy_09'],
          category: '用户属性表单',
          content: '20',
        },
      ],
      true
    );
    await sleep(1000);
    wrapper.findAll('.base-dialog-btn')[0].trigger('click');
    await sleep(2000);
    expect(wrapper.emitted('callback')).toBeTruthy();
  });

  it('footerHide', async () => {
    /** 向外暴露的事件 */
    wrapper.vm.setData(initData, false);
    await sleep(1000);
    expect(wrapper.find('.dialog-footer').exists()).toBe(false);
  });

  it('init column', async () => {
    /** 初始化列 */
    wrapper = mount(CostDetectErrorsDialog, {
      attachTo: document.getElementById('app'),
      props: {
        modelValue: false,
        title: '错误弹窗',
        columns,
        callback: () => ({}),
      },
    });
    await sleep(1000);
    wrapper.setProps({ modelValue: true });
    await flushPromises();
    /** 向外暴露的事件 */
    wrapper.vm.setData(initData, false);
    expect(wrapper.findAll('.vxe-header--column').length).toBe(columns.length);
  });
});
```
