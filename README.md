# 项目简介

Java 代码：

::: tabs

@tab java

```java
```

@tab java

```java
```

::: 


Python 代码：

::: tabs

@tab python

```python
```

@tab python

```python
```
::: 

## 是什么？

使用 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 搭建的 **力扣题解** 项目。

## 为什么

为《算法也疯狂》编写配套的题解 Git 代码仓库，这样题解就可以进行版本管理。


## 操作记录

* 操作笔记

https://cloud.tencent.com/developer/article/2371440

* 本地启动

http://localhost:8080/leetcode-solutions/

* GitHub Pages 地址

https://suanfa8.github.io/leetcode-solutions/


* 启动项目


```shell
npm i
```


```shell
npm run docs:dev
```

* 配置数学公式

配置方法：https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tex.html#%E9%85%8D%E7%BD%AE

启用 `katex` 更有效。

```
npm i -D katex
```

* 启用评论

参考资料：https://ecosystem.vuejs.press/zh/plugins/blog/comment/

* github workflows 部署失败

报错：`Error: The process '/usr/bin/git' failed with exit code 128`


解决方法：需要增加权限配置

https://blog.51cto.com/aiyc/6037421


* 特殊格式

* 静态文件目录

```
src/.vuepress/public
```

