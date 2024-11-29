# 第 3 节 深度优先遍历的应用

![image.png](https://pic.leetcode-cn.com/1611530242-omrkWW-image.png)


这一节我们介绍「深度优先的应用」，希望大家通过这一节的练习体会：如何在遍历的过程中记录一些信息，完成题目交给我们的任务。

---

## 应用 1：获得图（树）的一些属性

在一些树的问题中，其实就是通过一次深度优先遍历，获得树的某些属性。例如：「二叉树」的最大深度、「二叉树」的最小深度、平衡二叉树、是否 BST。**在遍历的过程中，通常需要设计一些变量，一边遍历，一边更新设计的变量的值**。

### 例 1：「力扣」第 129 题：求根到叶子节点数字之和（中等）

给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

**示例 1**：

```
输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
```

**示例 2**：

```
输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
```

---

**题意分析**：

+ 在树中，从根结点到任意一个 **叶子结点** 的路径组成了一个整数，因此需要先遍历到叶子结点，才能得到一个「完整的」整数；
+ 非叶子结点是某两条（或者一条）从根结点到叶子结点的 **公共** 数位；
+ 可以使用「前序遍历」的思想，一层一层向下传值，每传递一层，就在数的后面加 $0$，即将当前得到的数乘以 $10$；
+ 当遍历到空结点的时候就得到了一个正数，再将结果逐层上传，**通过设计递归函数的返回值逐层向上传递**。

#### 方法：深度优先遍历（前序遍历）

**参考代码**：

```Java []
public class Solution {

    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int cumsum) {
        if (node == null) {
            return 0;
        }
        cumsum = 10 * cumsum + node.val;
        if (node.left == null && node.right == null) {
            return cumsum;
        }
        return dfs(node.left, cumsum) + dfs(node.right, cumsum);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，其中 $N$ 是二叉树的结点总数；
+ 空间复杂度：$O(N)$，递归调用的栈的深度为树的高度，树的高度在最极端的情况下（树退化成为链表）为 $N$。

> 友情提示：既然可以一层一层得到一个数，广度优先遍历也是很自然的想法，读者可以尝试使用广度优先遍历的思想完成该问题。

---

## 应用 2：计算无向图的连通分量

### 例 2：「力扣」第 323 题：无向图中连通分量的数目（会员题，中等）

给定编号从 `0` 到 `n-1` 的 `n` 个节点和一个无向边列表（每条边都是一对节点），请编写一个函数来计算无向图中连通分量的数目。

**示例 1**：

```
输入: n = 5 和 edges = [[0, 1], [1, 2], [3, 4]]

     0          3
     |          |
     1 --- 2    4 

输出: 2
```

**示例 2**：

```
输入: n = 5 和 edges = [[0, 1], [1, 2], [2, 3], [3, 4]]

     0           4
     |           |
     1 --- 2 --- 3

输出:  1
```

**注意**：
你可以假设在 `edges` 中不会出现重复的边。而且由于所以的边都是无向边，`[0, 1]` 与 `[1, 0]`  相同，所以它们不会同时在 `edges` 中出现。

**思路分析**：

+ 首先需要对输入数组进行处理，由于 `n` 个结点的编号从 `0` 到 `n - 1` ，因此使用「嵌套数组」表示邻接表即可（具体实现见代码）；
+ 然后遍历每一个顶点，对每一个顶点执行一次深度优先遍历，注意：在遍历的过程中使用 `visited` 布尔数组记录已经遍历过的结点。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public int countComponents(int n, int[][] edges) {
        // 第 1 步：构建图
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        // 无向图，所以需要添加双向引用
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        // 第 2 步：开始深度优先遍历
        int count = 0;
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(adj, i, visited);
                count++;
            }
        }
        return count;
    }

    /**
     * @param adj     邻接表
     * @param u       从顶点 u 开始执行深度优先遍历
     * @param visited 记录某个结点是否被访问过
     */
    private void dfs(List<Integer>[] adj, int u, boolean[] visited) {
        visited[u] = true;
        List<Integer> successors = adj[u];
        for (int successor : successors) {
            if (!visited[successor]) {
                dfs(adj, successor, visited);
            }
        }
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(V + E)$，这里 $E$ 是边的条数，即数组 `edges` 的长度，初始化的时候遍历数组得到邻接表。这里 $V$ 为输入整数 `n`，遍历的过程是每一个结点执行一次深度优先遍历，时间复杂度为 $O(V)$；
+ 空间复杂度：$O(V + E)$，综合考虑邻接表 $O(E)$、`visited` 数组（$O(V)$）、递归调用栈的深度（$O(V)$）三者得到。

---


## 应用 3：检测图中是否存在环

我们分别通过两个例子讲解「无向图」中环的检测和「有向图」中环的检测（是不是要讲一下拓扑排序）。

### 例 3：「力扣」第 684 题：冗余连接（中等）

在本问题中, 树指的是一个连通且无环的无向图。

输入一个图，该图由一个有着 `N` 个节点 (节点值不重复 1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在 `1` 到 `N` 中间，这条附加的边不属于树中已存在的边。

结果图是一个以边组成的二维数组。每一个边的元素是一对 `[u, v]`，满足 `u < v`，表示连接顶点 `u` 和 `v` 的无向图的边。

返回一条可以删去的边，使得结果图是一个有着 `N` 个节点的树。如果有多个答案，则返回二维数组中最后出现的边。答案边 `[u, v]` 应满足相同的格式 `u < v`。

**示例 1**：

```
输入: [[1,2], [1,3], [2,3]]
输出: [2,3]
解释: 给定的无向图为:
  1
 / \
2 - 3
```

**示例 2**：

```
输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
输出: [1,4]
解释: 给定的无向图为:
5 - 1 - 2
    |   |
    4 - 3
```

**注意**：

- 输入的二维数组大小在 3 到 1000。
- 二维数组中的整数在 `1` 到 `N` 之间，其中 `N` 是输入数组的大小。

---

**思路分析**：

+ 如果两个顶点其中有一个不在这张图上，它当然不是多余的边；

+ 可以在添加一条边的时候，检查从其中一个顶点是否可以通过 **遍历** 到达另一个顶点，这里所说的遍历可以是「深度优先遍历」，也可以是「广度优先遍历」；
  + 如果遍历不能到达，说明这条表不是多余的边，**需要添加到图中**（注意：无向图需要添加两条边）；
  + 如果遍历可以到达，说明形成了回路，当前考虑的这条边就是多余的边。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Solution {

    private Map<Integer, List<Integer>> graph;
    private Set<Integer> visited;

    public int[] findRedundantConnection(int[][] edges) {
        this.graph = new HashMap<>();
        this.visited = new HashSet<>();

        // 遍历每一条边
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            if (graph.containsKey(u) && graph.containsKey(v)) {
                visited.clear();
                // 深度优先遍历该图，判断 u 到 v 之间是否已经存在了一条路径
                if (dfs(u, v)) {
                    return edge;
                }
            }
            // 所有相邻顶点都找不到回路，才向图中添加这条边，由于是无向图，所以要添加两条边
            addEdge(u, v);
            addEdge(v, u);
        }
        return null;
    }

    private void addEdge(int u, int v) {
        if (graph.containsKey(u)) {
            graph.get(u).add(v);
            return;
        }
        List<Integer> successors = new ArrayList<>();
        successors.add(v);
        graph.put(u, successors);
    }


    /**
     * 从 source 开始进行深度优先遍历，看看是不是能够找到一条到 target 的回路
     *
     * @param source
     * @param target
     * @return 找不到回路返回 false
     */
    private boolean dfs(int source, int target) {
        if (source == target) {
            return true;
        }
        visited.add(source);
        // 遍历 source 的所有相邻顶点
        for (int adj : graph.get(source)) {
            if (!visited.contains(adj)) {
                if (dfs(adj, target)) {
                    return true;
                }
            }
        }
        // 所有相邻顶点都找不到，才能返回 false
        return false;
    }
}
```

> 友情提示：该问题还可以使用拓扑排序完成。事实上，无向图找是否存在环是「并查集」这个数据结构的典型应用。

**复杂度分析**：

+ 时间复杂度：$O(E^2)$，这里 $E$ 是图的边的总数，$V$ 是图的顶点总数。根据题目的描述，$V = E$。在最坏情况下，每一个顶点要通过深度优先遍历访问除了它以外的其它与在同一个连通分量中的顶点；
+ 空间复杂度：$O(V + E)$，邻接表的大小为 $V + E$，栈的深度为图的顶点总数 $V$。

下面这一题是找有向图是否有环。

### 例 4：「力扣」第 802 题：找到最终的安全状态（中等）

在有向图中, 我们从某个节点和每个转向处开始, 沿着图的有向边走。 如果我们到达的节点是终点 (即它没有连出的有向边), 我们停止。

现在, 如果我们最后能走到终点，那么我们的起始节点是最终安全的。 更具体地说, 存在一个自然数 `K`,  无论选择从哪里开始行走, 我们走了不到 `K` 步后必能停止在一个终点。

哪些节点最终是安全的？ 结果返回一个有序的数组。

该有向图有 `N` 个节点，标签为 `0`, `1`, ..., `N - 1`, 其中 `N` 是 `graph` 的节点数.  图以以下的形式给出: `graph[i]` 是节点 `j` 的一个列表，满足 `(i, j)` 是图的一条有向边。

```
示例：
输入：graph = [[1,2],[2,3],[5],[0],[5],[],[]]
输出：[2,4,5,6]
这里是上图的示意图。
```

![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png)

**提示**：

- `graph` 节点数不超过 `10000`；
- 图的边数不会超过 `32000`；
- 每个 `graph[i]` 被排序为不同的整数列表， 在区间 `[0, graph.length - 1]` 中选取。

**题意分析**：

+ 注意这个问题是在「有向图」的前提下展开讨论；
+ 题目要我们找所有的「安全终点」，安全终点的意思是：它的前驱结点可以经过有限步来到一个 **没有后继结点的结点**；
+ 因此这个问题就是要求我们判断一个 **有向图** 是否存在环，因此可以从一个结点开始执行深度优先遍历。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    /**
     * 使用 Boolean 利用了 null 表示还未计算出结果
     * true 表示从当前顶点出发的所有路径有回路
     * false 表示从当前顶点出发的所有路径没有回路
     */
    private Boolean[] visited;

    public List<Integer> eventualSafeNodes(int[][] graph) {
        int len = graph.length;
        visited = new Boolean[len];
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < len; ++i) {
            if (dfs(i, graph)) {
                continue;
            }
            res.add(i);
        }
        return res;

    }

    /**
     * @param u
     * @param graph
     * @return 从顶点 u 出发的所有路径是不是有一条能够回到 u，有回路就返回 true
     */
    private boolean dfs(int u, int[][] graph) {
        if (visited[u] != null) {
            return visited[u];
        }
        // 先默认从 u 出发的所有路径有回路
        visited[u] = true;
        // 结点 u 的所有后继结点都不能回到自己，才能认为结点 u 是安全的
        for (int successor : graph[u]) {
            if (dfs(successor, graph)) {
                return true;
            }
        }
        // 注意：这里需要重置
        visited[u] = false;
        return false;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(V + E)$，这里 $V$ 为图的顶点总数，$E$ 为图的边数；
+ 空间复杂度：$O(V + E)$。

**总结**：

+ 在声明变量、设计递归函数的时候，**一定要明确递归函数的变量的定义和递归函数的返回值，写上必要的注释**，这样在编写代码逻辑的时候，才不会乱。

> 友情提示：还可以使用拓扑排序（借助入度和广度优先遍历）或者并查集两种方法完成。

---

## 应用 4：二分图检测

### 例 6：「力扣」第 785 题：判断二分图（中等）

给定一个无向图`graph`，当这个图为二分图时返回`true`。

如果我们能将一个图的节点集合分割成两个独立的子集A和B，并使图中的每一条边的两个节点一个来自A集合，一个来自B集合，我们就将这个图称为二分图。

`graph`将会以邻接表方式给出，`graph[i]`表示图中与节点`i`相连的所有节点。每个节点都是一个在`0`到`graph.length-1`之间的整数。这图中没有自环和平行边： `graph[i]` 中不存在`i`，并且`graph[i]`中没有重复的值。

**示例 1**：

```
输入: [[1,3], [0,2], [1,3], [0,2]]
输出: true
解释: 
无向图如下:
0----1
|    |
|    |
3----2
我们可以将节点分成两组: {0, 2} 和 {1, 3}。
```

**示例 2**：

```
输入: [[1,2,3], [0,2], [0,1,3], [0,2]]
输出: false
解释: 
无向图如下:
0----1
| \  |
|  \ |
3----2
我们不能将节点分割成两个独立的子集。
```

**注意**：

- `graph` 的长度范围为 `[1, 100]`。
- `graph[i]` 中的元素的范围为 `[0, graph.length - 1]`。
- `graph[i]` 不会包含 `i` 或者有重复的值。
- 图是无向的: 如果`j` 在 `graph[i]`里边, 那么 `i` 也会在 `graph[j]`里边。


**思路分析**：

+ 在遍历的过程中，除了 `visited` 布尔数组记录已经访问过的结点以外，还需要记录「每一次遍历」的起始结点的颜色；
+ 在遍历的过程中，把上一个结点的染色信息代入下一个结点的染色信息，判断是否会冲突；
+ 通过这个问题，请大家体会：
  + 图的深度优先遍历需要记录哪些结点是否访问过；
  + 完成深度优先遍历可能还需要携带其它信息，这个问题里「其它信息」，就是遍历 `color`，表示语义是：对顶点 i 尝试染色 color；
  + 注意体会「递归函数的返回值」对于完成一个任务的作用，这道题里「递归函数的返回值」是「是否染色成功」。

**参考代码**：

```Java []
public class Solution {

    private boolean[] visited;
    private int[] colors;
    private int[][] graph;

    public boolean isBipartite(int[][] graph) {
        this.graph = graph;

        // 图中顶点的个数
        int V = graph.length;
        // 一个顶点是否被访问过，使用 visited 控制
        visited = new boolean[V];
        colors = new int[V];

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                // 第 2 个参数填 0 或者 1 都行
                if (!dfs(i, 0)) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * 从顶点 i 开始染色
     *
     * @param i
     * @param color 对顶点 i 尝试染色 color
     * @return 是否染色成功
     */
    private boolean dfs(int i, int color) {
        visited[i] = true;
        colors[i] = color;
        // 对所有后继结点执行深度优先遍历
        int[] successors = graph[i];
        for (int successor : successors) {
            if (!visited[successor]) {
                // 还没见过，尝试染色，染成另一种颜色，所以是 1 - color
                if (!dfs(successor, 1 - color)) {
                    return false;
                }
            } else if (colors[i] == colors[successor]) {
                // 如果已经见过了，两边的颜色需要不一致
                return false;
            }
        }
        return true;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(V + E)$，这里 $V$ 是无向图中的顶点总数，$E$ 是无向图的边数；
+ 空间复杂度：$O(V)$，空间消耗主要有：`visited` 数组，递归调用栈、染色数组，均为 $O(V)$。

> 友情提示：这道问题可以使用 BFS 和并查集完成，感兴趣的朋友可以尝试一下，如果遇到问题可以在相应问题的题解区查找解答。

## 应用 5：拓扑排序

### 例 7：「力扣」第 210 题：课程表 II（中等）

现在你总共有 *n* 门课需要选，记为 `0` 到 `n-1`。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: `[0,1]`。

给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

**示例 1**：

```
输入: 2, [[1,0]] 
输出: [0,1]
解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
```

**示例 2**：

```
输入: 4, [[1,0],[2,0],[3,1],[3,2]]
输出: [0,1,2,3] or [0,2,1,3]
解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
     因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
```

**说明:**

1. 输入的先决条件是由**边缘列表**表示的图形，而不是邻接矩阵。详情请参见[图的表示法](http://blog.csdn.net/woaidapaopao/article/details/51732947)。

2. 你可以假定输入的先决条件中没有重复的边。

**提示:**

+ 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。

思路分析：

+ 题目中提示已经说得很清楚了，要求我们在「有向图」中检测是否有环，如果没有环，则输出拓扑排序的结果；
+ 所谓「拓扑排序」需要保证：① 每一门课程只出现一次；② 必需保证先修课程的顺序在所有它的后续课程的前面；
+ 拓扑排序的结果不唯一，并且只有「有向无环图」才有拓扑排序；
+ **关键要把握题目的要求**：「必需保证先修课程的顺序在所有它的后续课程的前面」，「所有」关键字提示我们可以使用「 遍历」的思想遍历当前课程的 **所有** 后续课程，并且保证这些课程之间的学习顺序不存在「环」，可以使用「深度优先遍历」或者「广度优先遍历」；
+ 我们这里给出「深度优先遍历」的实现代码，注意：需要在当前课程的所有 **后续课程** 结束以后才输出当前课程，所以 ①  **收集结果的位置应该在「后序」的位置（类比二叉树的后序遍历）**；② 后序遍历的结果需要逆序才是拓扑排序的结果；
+ 事实上，「拓扑排序」问题使用「广度优先遍历」的思想和实现是更经典的做法，我们放在「广度优先遍历」专题里向大家介绍。

**编码前的说明**：

深度优先遍历的写法需要注意：

+ 递归函数返回值的意义：这里返回 `true` 表示在有向图中找到了环，返回 `false` 表示没有环；
+ 我们扩展了布尔数组 `visited` 的含义，如果在无向图中，只需要 `true` 和 `false` 两种状态。在有向图中，为了检测是否存在环，我们新增一个状态，用于表示在对一门课程进行深度优先遍历的过程中，已经被标记，使用整数 `1` 表示。原来的 `false` 用整数 `0` 表示，含义为还未访问；原来的 `true` 用整数 `2` 表示，含义为「已经访问」，确切地说是「当前课程的所有后续课程」已经被访问。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // 步骤 1：构建邻接表
        Set<Integer>[] adj = new HashSet[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new HashSet<>();
        }
        int pLen = prerequisites.length;
        for (int i = 0; i < pLen; i++) {
            // 后继课程
            int second = prerequisites[i][0];
            // 先行课程
            int first = prerequisites[i][1];
            // 注意 dfs 中，后继课程作为 key，前驱课程作为 value，这种方式不符合邻接表的习惯，邻接表总是通过前驱得到后继
            adj[second].add(first);
        }

        // 步骤二：对每一个结点执行一次深度优先遍历
        // 0 表示没有访问过，对应于 boolean 数组里的 false
        // 1 表示已经访问过，新增状态，如果 dfs 的时候遇到 1 ，表示当前遍历的过程中形成了环
        // 2 表示当前结点的所有后继结点已经遍历完成，对应于 boolean 数组里的 true
        int[] visited = new int[numCourses];

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            // 对每一个结点执行一次深度优先遍历
            if (dfs(i, adj, visited, res)) {
                return new int[]{};
            }
        }
        return res.stream().mapToInt(i -> i).toArray();
    }

    /**
     * @param current
     * @param adj
     * @param visited
     * @param res
     * @return true 表示有环，false 表示没有环
     */
    private boolean dfs(int current, Set<Integer>[] adj,
                        int[] visited, List<Integer> res) {

        if (visited[current] == 1) {
            return true;
        }
        if (visited[current] == 2) {
            return false;
        }

        visited[current] = 1;
        for (Integer successor : adj[current]) {
            if (dfs(successor, adj, visited, res)) {
                // 如果有环，返回空数组
              	return true;
            }
        }

        // 注意：在「后序」这个位置添加到结果集
        res.add(current);
        visited[current] = 2;
        // 所有的后继结点都遍历完成以后，都没有遇到重复，才可以说没有环
        return false;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(V + E)$，这里 $V$ 表示课程总数，$E$ 表示课程依赖关系总数，对每一个顶点执行一次深度优先遍历，所有顶点需要遍历的操作总数与边总数有关；
+ 空间复杂度：$O(V + E)$，邻接表的大小为 $V + E$，递归调用栈的深度最多为 $V$，因此空间复杂度是 $O(V + E)$。

## 应用 6：回溯算法获得一个问题所有的解

这部分概念比较多，并且需要一定的练习作为基础才能较好地理解，本章节第 4 - 6 节将会详细介绍「回溯算法」。

---

## 练习


说明：下面这两个问题的场景是「有向图中检测环」，经典的做法是「拓扑排序」。

1. 完成「力扣」第 207 题：课程表（中等）；
2. 完成「力扣」第 1136 题：平行课程（会员题、困难）；
3. 完成「力扣」第 886 题：可能的二分法（中等）。

---

## 总结

掌握了深度优先遍历的思想，其实就可以解决「力扣」上绝大多数「树」和「图」的问题，请大家在完成练习的同时自己想一想解决这个问题的算法思想是什么，有哪一些问题实现的思路有通用性，相信这样的刷题方式对理解算法思想是有帮助的。