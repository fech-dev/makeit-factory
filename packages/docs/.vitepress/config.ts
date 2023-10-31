import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Makeit Factory Docs",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // search: {
    //   provider: 'local'
    // },
    // nav: [
    //   { text: 'Home', link: '/' },
    // ],

    sidebar: [
      { text: 'Get Started', link: '/get-started' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fech-dev/makeit-factory' }
    ]
  }
})
