export default {
  '/docs/': getDocsSidebar(),
};

/** 文档笔记 */
function getDocsSidebar() {
  return [
    {
      text: '大纲',
      collapsed: true,
      items: [
        { text: '博客文档搭建手册', link: '/docs/blogBuildManual/' },
        {
          text: '单元测试',
          collapsed: true,
          items: [
            {
              text: 'Vitest',
              collapsed: true,
              items: [
                { text: '快速起步', link: '/docs/unitTest/vitest/' },
                {
                  text: '配置',
                  collapsed: true,
                  items: [{ text: '配置索引', link: '/docs/unitTest/vitest/configIndex' }],
                },
                {
                  text: 'API',
                  collapsed: true,
                  items: [
                    {
                      text: 'Test API Reference',
                      link: '/docs/unitTest/vitest/api/testAPIReference',
                    },
                  ],
                },
                {
                  text: '案例',
                  collapsed: true,
                  items: [
                    {
                      text: '成本插件单元测试配置',
                      link: '/docs/unitTest/vitest/demo',
                    },
                    {
                      text: '基础文件代码',
                      link: '/docs/unitTest/vitest/demo/base-file.md',
                    },
                  ],
                },
              ],
            },
            {
              text: 'Vue test utils',
              collapsed: true,
              items: [
                { text: '快速起步', link: '/docs/unitTest/vueTestUtils/' },
                {
                  text: 'API参考',
                  link: '/docs/unitTest/vueTestUtils/apiReference',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
