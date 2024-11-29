# 第 2 节 二维平面上的搜索问题

![image.png](https://pic.leetcode-cn.com/1611489764-dXtjvl-image.png)

我们在专题「深度优先遍历」里已经见过了使用深度优先遍历完成二维平面上的搜索问题，在那里向大家提到过：只要是遍历的问题，用深度优先遍历或者广度优先遍历都可以完成。下面我们就举几个典型的例子向大家说明在广度优先遍历中，需要注意的事项和编码技巧。

广度优先遍历不像深度优先遍历那样，可以使用递归方法的函数方法栈，将遍历过程中的参数设计成递归函数的参数，因此须要我们将遍历过程中须要的数据封装成类的对象（如果都是整数可以封装成整型数组）放入队列。

---

## 例 ：「力扣」第 695 题：岛屿的最大面积（中等）

给定一个包含了一些 `0` 和 `1` 的非空二维数组 `grid` 。

一个 岛屿 是由一些相邻的 `1` (代表土地) 构成的组合，这里的「相邻」要求两个 `1` 必须在水平或者竖直方向上相邻。你可以假设 `grid` 的四个边缘都被 `0`（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 `0` 。)

**示例 1**：

```
[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
```

对于上面这个给定矩阵应返回 `6`。注意答案不应该是 `11` ，因为岛屿只能包含水平或垂直的四个方向的 `1` 。

**示例 2**：

```
[[0,0,0,0,0,0,0,0]]
```

对于上面这个给定的矩阵, 返回 `0`。

**注意:** 给定的矩阵`grid` 的长度和宽度都不超过 $50$。

**思路分析**：

+ 「岛屿」的定义是矩阵中值为 `1` 的上、下、左、右「四连通」的区域的单元格的总数，我们可以遍历每一个单元格，只要是 `1` ，就执行一次「广度优先遍历」，广度优先遍历出队的结点的个数就是岛屿的面积；
+ 我们再次向大家强调：在 **无权图** 中使用广度优先遍历在加入结点以后，需要马上标记为已经访问；
+ 由于这道题不用求遍历的起始点到其它结点的最短路径数，因此不需要将当前队列中的结点总数暂存起来，然后再依次取出；
+ 广度优先遍历要向队列中存入相关的数据，有些时候须要将一些数据封装成类，当前这个问题需要向队列中传入结点的坐标，可以是一维坐标，也可以是二维坐标。大家可以通过比较下面的「参考代码 1」和「参考代码 2」了解二维坐标和一维坐标的相互转换。

**参考代码 1**：使用二维坐标

```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution3 {

    // 方法二：广度优先遍历（使用二维坐标）

    /**
     * 方向向量（坐标偏移），4 个方向的顺序无关紧要
     */
    private final static int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int maxAreaOfIsland(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];

        int maxArea = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    maxArea = Math.max(maxArea, bfs(grid, i, j, rows, cols, visited));
                }
            }
        }
        return maxArea;
    }

    /**
     * @param grid    二维网格
     * @param i       横坐标
     * @param j       纵坐标
     * @param rows    二维网格的行数
     * @param cols    二维网格的列数
     * @param visited 标记是否访问过
     * @return 当前连通分量里结点的个数
     */
    private int bfs(int[][] grid, int i, int j, int rows, int cols, boolean[][] visited) {
        int count = 0;
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{i, j});
        visited[i][j] = true;
        while (!queue.isEmpty()) {
            int[] front = queue.poll();
            int curX = front[0];
            int curY = front[1];
            count++;
            for (int[] direction : DIRECTIONS) {
                int newX = curX + direction[0];
                int newY = curY + direction[1];
                if (inArea(newX, newY, rows, cols) && grid[newX][newY] == 1 && !visited[newX][newY]) {
                    queue.offer(new int[]{newX, newY});
                    // 注意：一定要在入队以后马上标记为「已经访问」
                    visited[newX][newY] = true;
                }
            }
        }
        return count;
    }

    private boolean inArea(int i, int j, int rows, int cols) {
        return i >= 0 && i < rows && j >= 0 && j < cols;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\rm{rows} \times \rm{cols})$，这里 $\rm{rows}$ 表示二维矩阵的行数、$\rm{cols}$ 表示二维矩阵的列数，最坏情况下每一个单元格都会被遍历一次；
+ 空间复杂度：$O(\rm{rows} \times \rm{cols})$，数组 `visited` 的大小为 $\rm{rows} \times \rm{cols}$，队列的大小最多为 $\rm{rows} \times \rm{cols}$。

**参考代码 2**：使用一维坐标

```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private final static int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int maxAreaOfIsland(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[] visited = new boolean[rows * cols];

        int maxArea = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1 && !visited[getIndex(i, j, cols)]) {
                    maxArea = Math.max(maxArea, bfs(grid, i, j, rows, cols, visited));
                }
            }
        }
        return maxArea;
    }

    private int bfs(int[][] grid, int i, int j, int rows, int cols, boolean[] visited) {
        int count = 0;
        Queue<Integer> queue = new LinkedList<>();
        int index = getIndex(i, j, cols);
        queue.offer(index);
        visited[index] = true;
        while (!queue.isEmpty()) {
            int front = queue.poll();
            int curX = front / cols;
            int curY = front % cols;
            count++;
            for (int[] direction : DIRECTIONS) {
                int newX = curX + direction[0];
                int newY = curY + direction[1];

                int newIndex = getIndex(newX, newY, cols);
                if (inArea(newX, newY, rows, cols) && grid[newX][newY] == 1 && !visited[newIndex]) {
                    queue.offer(newIndex);
                    visited[newIndex] = true;
                }
            }
        }
        return count;
    }


    private int getIndex(int x, int y, int cols) {
        return x * cols + y;
    }

    private boolean inArea(int i, int j, int rows, int cols) {
        return i >= 0 && i < rows && j >= 0 && j < cols;
    }
}
```

**复杂度分析**：（同参考代码 1）。

---

## 练习

1. 完成「力扣」第 1091 题：二进制矩阵中的最短路径（中等）；

> 友情提示：本节的例题是「四连通问题」，「力扣」第 1091 题是「八连通问题」，解题思路和代码编写非常类似。

2. 完成「力扣」第 200 题：岛屿数量（中等）：深度优先遍历、广度优先遍历、并查集；
3. 完成「力扣」第 417 题：太平洋大西洋水流问题（中等）：深度优先遍历、广度优先遍历；
4. 完成「力扣」第 130 题：被围绕的区域（中等）：深度优先遍历、广度优先遍历、并查集；
5. 完成「力扣」第 934 题：最短的桥（中等）；
6. 完成「力扣」第 529 题：扫雷游戏（中等）：深度优先遍历、广度优先遍历；
7. 完成「力扣」第 1020 题：飞地的数量（中等）：方法同第 130 题，深度优先遍历、广度优先遍历；
8. 完成「力扣」第 1254 题：统计封闭岛屿的数目（中等）：深度优先遍历、广度优先遍历；
9. 完成「力扣」第 1034 题：边框着色（中等）：深度优先遍历、广度优先遍历；
10. 完成「力扣」第 733 题：图像渲染（简单）：深度优先遍历、广度优先遍历；
11. 完成「力扣」之「剑指 Offer 系列」第 13 题：机器人的运动范围（中等）：深度优先遍历、广度优先遍历；
12. 完成「力扣」第 909 题：蛇梯棋（中等）广度优先遍历。

> 友情提示：题目问「最少移动次数」，如果这个问题是需要遍历的话，需要想到使用「广度优先遍历」。

---

## 总结

我们这一节给出的问题都是在二维平面上找最短路径的问题，解决这些问题在思路层面上没有难度，难点在于调试，请大家在练习的时候一定要耐心，如果不能通过测评，可以使用小数据测试用例进行调试，**把队列中的元素打印出来看一下**，很多时候就能发现问题所在。




