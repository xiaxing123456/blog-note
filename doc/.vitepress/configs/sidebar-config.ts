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
                  items: [{ text: '配置索引', link: '/docs/unitTest/vitest/configIndex' }],
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
