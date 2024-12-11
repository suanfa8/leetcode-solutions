import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/leetcode-solutions/",

  lang: "zh-CN",
  title: "「力扣」题解",
  description: "vuepress-theme-hope 的文档演示",
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/leetcode-solutions/assets/icon/leetcode.jpeg"}]
  ],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
