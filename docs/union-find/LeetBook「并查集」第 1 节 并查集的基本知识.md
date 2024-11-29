# 第 1 节 并查集的基础知识

![image.png](https://pic.leetcode-cn.com/1615973712-RWNizN-image.png)

## 并查集动态处理的两个问题

### 查询（Find）

查询图中的两个顶点是不是在同一个集合中。

> **注意**：并查集只回答两个顶点之间是否有一条路径连接，而不回答怎么连接。

### 合并（Union）

将两个不相交集合进行合并。

---

## 设计并查集的两种思想

### quick-find：基于 id

「基于 id」的思想很常见：

+ 古代打仗的时候，士兵用不同颜色的军服区分敌我；
+ 导游给同一个旅游团的成员发放同样颜色的帽子，以便认识同一个旅游团的成员；
+ 身着情侣装走在大街小巷，其实也起到了标识的作用。


「基于 id」的思想给每一个元素（顶点）分配一个唯一标识，称为 `id`。

+ 初始化的时候：所有元素的 `id` 都不一样，表示一个元素单独属于一个集合。
+ 如果两个元素的 `id` 一样，标识它们同属于一个集合；
+ 合并的时候，需要将其中一个集合中的 **所有元素** 的 `id` 赋值成为另一个集合的 `id`（一个集合中的所有元素的 `id` 均一样）。

类似于：给每个元素（顶点）改名字，名字一样，就表示在同一个集合中。

+ 优点：查询两个元素是否在一个集合中很快，时间复杂度为 $O(1)$；
+ 缺点：把两个集合合并成一个集合较慢，需要遍历其中一个集合中的所有元素。

<![image.png](https://pic.leetcode-cn.com/1615973866-sudJOl-image.png),![image.png](https://pic.leetcode-cn.com/1615973871-rPzege-image.png),![image.png](https://pic.leetcode-cn.com/1615973876-QEnUhL-image.png)>

「基于 id」的思想并不常用，了解即可。

### quick-union：基于 parent（重要）

「基于 parent」的思想其实也很常见：记录每个顶点的父亲顶点是谁。这样设计「并查集」的思想也叫「代表元」法。

我们不再使用 `id` 数组，而使用 `parent` 数组。`parent` 数组的定义是：`parent[i]` 表示标识为 `i` 的结点的父亲结点的标识（可以形象地记为「找爸爸」）。在这个定义下，根结点的父亲结点是自己。

<![image.png](https://pic.leetcode-cn.com/1615973982-lgOjig-image.png),![image.png](https://pic.leetcode-cn.com/1615973986-aoIuHn-image.png),![image.png](https://pic.leetcode-cn.com/1615973991-NofOuw-image.png),![image.png](https://pic.leetcode-cn.com/1615973995-MQKlfI-image.png)>

因此，这种方式形成的「并查集」组织成了 **若干个不相交的树形结构**，并且我们在访问结点的时候，总是按照「从下到上」进行访问的。

---

## 详解代表元法

### 「代表元」的「三个不重要」

以下「三个不重要」概括了「代表元法」的设计理念，大家需要结合练习体会。

+ 谁作为根结点不重要：根结点与非根结点只是位置不同，并没有附加的含义；
+ 树怎么形成的不重要：合并的时候任何一个集合的根结点指向另一个结合的根结点就可以；
+ 树的形态不重要：理由同「谁作为根结点不重要」。

### 代表元法可能造成的问题

树的高度过高，查询性能降低。

![image.png](https://pic.leetcode-cn.com/1615976709-mzvSLu-image.png)

> 知识扩展：几乎所有的「树」的问题都在和「树的高度」较劲：
>
> + 「快速排序」，使用随机化 `pivot` 的方式避免递归树太深；
> + 「二叉搜索树」为了避免递归树太深，采用不同的旋转方式，得到了 AVL 树和红黑树。

解决方案有「按秩合并」与「路径压缩」，我们先介绍「按秩合并」。

---

## 按秩合并 

按「秩」合并的意思是：让树的「秩」较小的树的根结点，指向树的「秩」较大的树的根结点。

这里的「秩」有两种含义，分别用于不同的场景：

+ 按 `size` 合并，用于需要维护每个连通分量结点个数的时候；
+ 按 `rank` 合并，绝大多数时候。

### 按 `size` 合并

按 `size` 合并的意思是让树的「结点总数」较小的树的根结点，指向树的「结点总数」较大的树的根结点。

<![image.png](https://pic.leetcode-cn.com/1615974317-uVsYAj-image.png),![image.png](https://pic.leetcode-cn.com/1615974322-QTExSE-image.png)>


### 按 `rank` 合并

按 `rank` 合并的意思是让树的「高度」较小的树的根结点，指向树的「高度」较大的树的根结点。

<![image.png](https://pic.leetcode-cn.com/1615974469-sMFRNP-image.png),![image.png](https://pic.leetcode-cn.com/1615974473-rLRjKM-image.png)>

之所以把「高度」称为 `rank` ，是因为同时使用「按秩合并」和「路径压缩」的时候，树的「高度」很难维护其准确的定义，但是依然可以作为合并时候的依据，因此成为「秩」。


---


## 路径压缩

### 路径压缩方式 1：隔代压缩

「隔代压缩」的意思是：两步一跳，一直循环执行「把当前结点指向它的父亲结点的父亲结点」这样的操作。下面是一个例子。

<![image.png](https://pic.leetcode-cn.com/1615975786-cnLpdK-image.png),![image.png](https://pic.leetcode-cn.com/1615975789-HEozzX-image.png),![image.png](https://pic.leetcode-cn.com/1615975794-uuywdm-image.png)>

这样的压缩并不彻底，但是多压缩几次，就可以达到压缩彻底的效果。

### 路径压缩方式 2：完全压缩

「隔代压缩」的意思是：把从「查询结点」到「根结点」沿途经过的所有结点都指向根结点。「隔代压缩」相比较于「完全压缩」，压缩彻底。

<![LeetBook-并查集(2).001.jpeg](https://pic.leetcode-cn.com/1615976413-wcwyOF-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).001.jpeg),![LeetBook-并查集(2).002.jpeg](https://pic.leetcode-cn.com/1615976413-irzlLI-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).002.jpeg),![LeetBook-并查集(2).003.jpeg](https://pic.leetcode-cn.com/1615976413-mbDTjM-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).003.jpeg),![LeetBook-并查集(2).004.jpeg](https://pic.leetcode-cn.com/1615976413-BwYumQ-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).004.jpeg),![LeetBook-并查集(2).005.jpeg](https://pic.leetcode-cn.com/1615976413-gllkiK-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).005.jpeg),![LeetBook-并查集(2).006.jpeg](https://pic.leetcode-cn.com/1615976413-BQkqAR-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).006.jpeg),![LeetBook-并查集(2).007.jpeg](https://pic.leetcode-cn.com/1615976413-RYoInt-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).007.jpeg),![LeetBook-并查集(2).008.jpeg](https://pic.leetcode-cn.com/1615976413-icjlUe-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).008.jpeg),![LeetBook-并查集(2).009.jpeg](https://pic.leetcode-cn.com/1615976413-FeJgQe-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).009.jpeg),![LeetBook-并查集(2).010.jpeg](https://pic.leetcode-cn.com/1615976413-NygsXu-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).010.jpeg),![LeetBook-并查集(2).011.jpeg](https://pic.leetcode-cn.com/1615976413-bGbPBr-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).011.jpeg),![LeetBook-并查集(2).012.jpeg](https://pic.leetcode-cn.com/1615976413-bTbsVB-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).012.jpeg),![LeetBook-并查集(2).013.jpeg](https://pic.leetcode-cn.com/1615976413-KeuLGC-LeetBook-%E5%B9%B6%E6%9F%A5%E9%9B%86\(2\).013.jpeg)>


## 同时使用了「路径压缩」和「按秩合并」的时间复杂度

并查集的时间复杂度分析，其理论性较强，通常只需要知道结论即可。这里我们给出结论：

> 同时使用按秩合并与路径压缩时，最坏情况的时间复杂度为 $O(m \alpha(n))$，这里 $\alpha(n)$ 是一个增长非常慢的函数，$\alpha(n) \le 4$。

结论的具体介绍请见《算法导论》第 21.4 节《带路径压缩的按秩合并的分析》。

可以 **感性** 地这样理解结论：由于路径压缩采用「一边查询，一边修改树结构」的策略，并且 **修改树的结构是不可逆的**，合并之前需要先查询再合并。如果次数非常多的话，最后并查集里所有的树的高度都只有 $2$，平均到每一次「合并」和「查询」操作，步骤是常数次的。