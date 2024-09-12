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
        { text: 'Cocos Creator', collapsed: true, item: [] },
        {
          text: '前端知识',
          collapsed: true,
          items: [
            {
              text: 'nodejs',
              collapsed: true,
              items: [
                {
                  text: 'express框架搭建',
                  link: '/docs/web/nodejs/express/',
                },
              ],
            },
            {
              text: 'axios请求',
              collapsed: true,
              items: [
                {
                  text: 'base64编码传参问题',
                  link: '/docs/web/axios/base64.md',
                },
              ],
            },
          ],
        },
        {
          text: 'nvm 管理 node版本',
          collapsed: true,
          items: [
            {
              text: '安装 nvm',
              link: '/docs/nvm/',
            },
            {
              text: 'linux 安装nvm',
              link: '/docs/nvm/linux',
            },
          ],
        },
        {
          text: 'linux',
          collapsed: true,
          items: [
            {
              text: 'linux 常用命令',
              link: '/docs/linux/',
            },
          ],
        },
      ],
    },
  ];
}
