// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';

import ioGrid from './components/io-grid/io-grid.vue';
// import './style/index.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册自定义全局组件
        app.component('IoGrid', ioGrid);
    },
};
