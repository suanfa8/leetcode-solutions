
# 第 3 节 抽象成图论问题

在算法面试和笔试中，有一些问题问我们「最短」、「最少」、「最小」，可以尝试将它们转换为求解无权图的最短路径的问题求解。

对于这一类问题，最重要的一点在于分析出这一类问题的「图」结构，也就是对图形问题建模。依然是要注意到这些问题的背后是一个「**无权图**」的最短路径问题，因此可以使用「广度优先遍历」。


---

## 例：第 279 题：完全平方数（中等）

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*。你需要让组成和的完全平方数的个数最少。

**示例 1**：

```
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```

**示例 2**：

```
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```

**思路分析**：

+ 我们以示例 1 （输入 $12$）为例，向大家讲解这个问题应该如何分析；
+ 小于 $12$ 的完全平方数有 $1$、$4$、$9$，我们引入记号 `ways(i)` 表示：组成正整数 `i` 的完全平方数的总数，那么 `ways(12) = min(1 + ways(11), 4 + ways(8), 9 + ways(3))`，这里 $11 = 12 - 1$，$8 = 12 - 4$，$3 = 12 - 9$。事实上，分析到这里，我们就可以知道这个问题有「最优子结构」可以使用「动态规划」解决；

![image.png](https://pic.leetcode-cn.com/1609669134-FncvHL-image.png){:width=400}

+ 继续画下去就会发现，可以画出画一个 **图** 结构，这是因为不同的阶段减去不同的完全平方数得到的结果可能相同。

![image.png](https://pic.leetcode-cn.com/1609669549-oklZlk-image.png)

+ 因此从输入的整数 $n$ 开始，使用广度优先遍历，**到 $0$ 为止** 扩散的次数就是题目问的 $n$ 可以拆分为完全平方数的和的最少个数。

下面的动画展示了使用广度优先遍历求解问题的过程。

<![image.png](https://pic.leetcode-cn.com/1609669760-cTCilH-image.png),![image.png](https://pic.leetcode-cn.com/1609669766-qaPiEf-image.png),![image.png](https://pic.leetcode-cn.com/1609669770-nddlZk-image.png),![image.png](https://pic.leetcode-cn.com/1609669774-WdwiNF-image.png),![image.png](https://pic.leetcode-cn.com/1609669778-hdMfHz-image.png)>

代码实现和普通的广度优先遍历一样，相信大家已经非常熟悉这样的代码了：

+ 创建队列、`visited` 数组；
+ 把初始化的结点加入队列，标记初始化结点已经访问；
+ 暂存当前队列中的结点总数 `size`；
+ 将队列中的结点从队首出队 `size` 次，每一次出队的时候，把结点的后继结点都加入队尾，注意：**加入队尾的时候马上标记为已经访问**。


**参考代码**：

```Java []
import java.util.LinkedList;
import java.util.Queue;


public class Solution {

    public int numSquares(int n) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(n);
        // 由于图中存在环，所以需要记录哪些结点是否访问过
        boolean[] visited = new boolean[n + 1];

        int step = 1;
        while (!queue.isEmpty()) {
            // 每一次扩张，保存当前队列的结点总数
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int front = queue.poll();
                for (int j = 1; j * j <= front; j++) {
                    if (j * j == front) {
                        return step;
                    }

                    int next = front - j * j;
                    if (!visited[next]) {
                        queue.offer(next);
                        visited[next] = true;
                    }
                }
            }
            step++;
        }
        return 0;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \sqrt{N})$，这里 $N$ 是输入的整数，`for (int j = 1; n - j * j >= 0; j++)` 这一层循环需要时间消耗 $\sqrt{N}$；
+ 空间复杂度：$O(N)$，状态数组的长度为 $N$。

---

## 练习

1. 完成「力扣」第 22 题：括号生成（中等）：深度优先遍历、广度优先遍历；
2. 完成「力扣」第 690 题：员工的重要性（中等）；
3. 完成「力扣」第 322 题：零钱兑换（中等）：动态规划；
4. 完成「力扣」第 365 题：水壶问题（中等）；
5. 完成「力扣」第 1306 题：跳跃游戏 III（中等）。
