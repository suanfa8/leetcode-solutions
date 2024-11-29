import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "portfolio",
    {
      text: "LeetCode",
      icon: "book",
      prefix: "leetcode/",
      children: "structure",
    },
    
    {
      text: "零起步算法",
      icon: "laptop-code",
      prefix: "zero-algo/",
      link: "zero-algo/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-笔记",
      icon: "laptop-code",
      prefix: "notes/",
      link: "notes/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-递归",
      icon: "laptop-code",
      prefix: "recursion/",
      link: "recursion/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-滑动窗口与双指针",
      icon: "laptop-code",
      prefix: "two-point/",
      link: "two-point/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-并查集",
      icon: "laptop-code",
      prefix: "union-find/",
      link: "union-find/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-深度优先遍历",
      icon: "laptop-code",
      prefix: "dfs/",
      link: "dfs/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    {
      text: "LeetBook-广度优先遍历",
      icon: "laptop-code",
      prefix: "bfs/",
      link: "bfs/",
      children: "structure",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsible: true,
      // 可选的。设置分组是否默认展开，默认值是 false
      expanded: false,
    },
    // {
    //   text: "案例",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "文档",
    //   icon: "book",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
});
