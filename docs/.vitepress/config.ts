import {defineConfig} from 'vitepress';
import {description, name} from './meta';
import {nav} from "./nav";
import {sidebar} from "./sidebar";
import algolia from "./algolia";
// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    lang: "zh-CN",
    title: name,// 文档的标题
    description,// 文档描述
    lastUpdated: true,
    cleanUrls: true,
    appearance: 'dark',
    markdown: {
        lineNumbers: false,
    },
    locales: {
        root: {label: '简体中文', lang: 'zh-CN'},
    },
    head: [
        [
            'link', {rel: 'icon', href: '/icon/m_cam.svg'}
        ]
    ],
    themeConfig: {
        // 顶部左侧内容
        logo: "/icon/m_cam.svg",
        outline: 'deep',
        returnToTopLabel: '返回顶部',
        // https://vitepress.dev/reference/default-theme-config
        // 顶部右侧导航
        nav,
        // 侧边栏
        sidebar,
        footer: {
            message: '程序员cute050的个人博客',
            copyright: '用心去做高质量的专业前端内容网站，欢迎 star ⭐ 让更多人发现'
        },
        algolia,
        socialLinks: [{
            icon: 'github',
            link: 'https://github.com/cute050',
        }],
        docFooter: {
            prev: "上一篇文章",
            next: "下一篇文章",
        },
    },
})
