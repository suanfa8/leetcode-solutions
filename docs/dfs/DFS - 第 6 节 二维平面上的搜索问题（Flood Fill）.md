# 第 6 节：二维平面上的搜索问题（Flood Fill）

### 例 1：「力扣」第 79 题：单词搜索（中等）

给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

**示例**：

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false
```

**提示**：

- `board` 和 `word` 中只包含大写和小写英文字母；
- `1 <= board.length <= 200`
- `1 <= board[i].length <= 200`
- `1 <= word.length <= 10^3`

**思路分析**：

+ 这道题要求我们在一个二维表格上找出给定目标单词 `word` 的一个路径，题目中说：「相邻」单元格是那些水平相邻或垂直相邻的单元格。也就是说：如果当前单元格恰好与 `word` 的某个位置的字符匹配，应该从当前单元格的上、下、左、右 $4$ 个方向继续匹配剩下的部分；
+ 下面的幻灯片展示了整个匹配的过程，请大家注意：
  + 对于每一个单元格，在第一个字符匹配的时候，才执行一次深度优先遍历，直到找到符合条件的一条路径结束。如果第一个字符都不匹配，当然没有必要继续遍历下去；
  + 递归终止的条件是：匹配到了 `word` 的最后一个字符；
  + 在不能匹配的时候，需要 **原路返回**，尝试新的路径。这一点**非常重要**，我们修改了题目中的示例，请大家仔细观察下面的幻灯片中的例子，**体会「回溯」在什么时候发生**？

<![0079.001.jpeg](https://pic.leetcode-cn.com/1609294456-OChpSv-0079.001.jpeg),![0079.002.jpeg](https://pic.leetcode-cn.com/1609294462-qTCVer-0079.002.jpeg),![0079.003.jpeg](https://pic.leetcode-cn.com/1609294480-igSPrc-0079.003.jpeg),![0079.004.jpeg](https://pic.leetcode-cn.com/1609294480-MQWIsm-0079.004.jpeg),![0079.005.jpeg](https://pic.leetcode-cn.com/1609294480-yeAsRC-0079.005.jpeg),![0079.006.jpeg](https://pic.leetcode-cn.com/1609294480-gWHIDO-0079.006.jpeg),![0079.007.jpeg](https://pic.leetcode-cn.com/1609294480-ZKlrNA-0079.007.jpeg),![0079.008.jpeg](https://pic.leetcode-cn.com/1609294480-eXaEqk-0079.008.jpeg),![0079.009.jpeg](https://pic.leetcode-cn.com/1609294480-LSJyxS-0079.009.jpeg),![0079.010.jpeg](https://pic.leetcode-cn.com/1609294480-vzRQbr-0079.010.jpeg),![0079.011.jpeg](https://pic.leetcode-cn.com/1609294677-VuCDle-0079.011.jpeg),![0079.012.jpeg](https://pic.leetcode-cn.com/1609294677-AqNZgN-0079.012.jpeg),![0079.013.jpeg](https://pic.leetcode-cn.com/1609294677-hfMPjh-0079.013.jpeg),![0079.014.jpeg](https://pic.leetcode-cn.com/1609294677-lznocs-0079.014.jpeg),![0079.015.jpeg](https://pic.leetcode-cn.com/1609294677-EhvSeB-0079.015.jpeg),![0079.016.jpeg](https://pic.leetcode-cn.com/1609294677-lDgwMn-0079.016.jpeg),![0079.017.jpeg](https://pic.leetcode-cn.com/1609294677-xBYkLL-0079.017.jpeg),![0079.018.jpeg](https://pic.leetcode-cn.com/1609294677-TifcjV-0079.018.jpeg),![0079.019.jpeg](https://pic.leetcode-cn.com/1609294677-sFcisn-0079.019.jpeg),![0079.020.jpeg](https://pic.leetcode-cn.com/1609294730-WGDmxA-0079.020.jpeg),![0079.021.jpeg](https://pic.leetcode-cn.com/1609294730-SqoAiw-0079.021.jpeg),![0079.022.jpeg](https://pic.leetcode-cn.com/1609294730-sFaLvH-0079.022.jpeg),![0079.023.jpeg](https://pic.leetcode-cn.com/1609294730-zjpVdv-0079.023.jpeg),![0079.024.jpeg](https://pic.leetcode-cn.com/1609294730-wSwJeo-0079.024.jpeg),![0079.025.jpeg](https://pic.leetcode-cn.com/1609294730-daHoAG-0079.025.jpeg),![0079.026.jpeg](https://pic.leetcode-cn.com/1609294730-imVcpG-0079.026.jpeg),![0079.027.jpeg](https://pic.leetcode-cn.com/1609294730-tGcDKl-0079.027.jpeg),![0079.028.jpeg](https://pic.leetcode-cn.com/1609294730-dfwxhc-0079.028.jpeg),![0079.029.jpeg](https://pic.leetcode-cn.com/1609294730-YLohuR-0079.029.jpeg),![0079.030.jpeg](https://pic.leetcode-cn.com/1609294730-RIcIel-0079.030.jpeg),![0079.031.jpeg](https://pic.leetcode-cn.com/1609294730-IHrdIn-0079.031.jpeg),![0079.032.jpeg](https://pic.leetcode-cn.com/1609294730-cwrOJR-0079.032.jpeg),![0079.033.jpeg](https://pic.leetcode-cn.com/1609294730-ExLvZq-0079.033.jpeg),![0079.034.jpeg](https://pic.leetcode-cn.com/1609294730-tTkGlh-0079.034.jpeg)>

+ 整个搜索的过程可以用下面的树形结构表示，由于空间限制我们没有画出完整的树的样子，希望大家能够结合上面的幻灯片想清楚这个问题「**当一条路径不能匹配的时候是如何回退的**」，并且结合参考代码理解程序的执行流程。

![image.png](https://pic.leetcode-cn.com/1609297824-YbeLiB-image.png)



**参考代码**：

```Java []
public class Solution {

    private boolean[][] visited;
    private int[][] directions = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}};
    private int rows;
    private int cols;
    private int len;
    private char[] charArray;
    private char[][] board;

    public boolean exist(char[][] board, String word) {
        len = word.length();
        rows = board.length;
        if (rows == 0) {
            return false;
        }
        cols = board[0].length;
        visited = new boolean[rows][cols];
        this.charArray = word.toCharArray();
        this.board = board;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (dfs(i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @param i
     * @param j
     * @param begin 从 word[begin] 处开始搜索
     * @return
     */
    private boolean dfs(int i, int j, int begin) {
        // 字符串的最后一个字符匹配，即返回 true
        if (begin == len - 1) {
            return board[i][j] == charArray[begin];
        }

        // 只要当前考虑的字符能够匹配，就从四面八方继续搜索
        if (board[i][j] == charArray[begin]) {
            visited[i][j] = true;
            for (int[] direction : directions) {
                int newX = i + direction[0];
                int newY = j + direction[1];
                if (inArea(newX, newY) && !visited[newX][newY]) {
                    if (dfs(newX, newY, begin + 1)) {
                        return true;
                    }
                }
            }
            visited[i][j] = false;
        }
        return false;
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

**说明**：

+ `DIRECTIONS` 表示方向数组，$4$ 个元素分别表示下、右、上、左 $4$ 个方向向量，顺序无关紧要，建议四连通、八连通的问题都这样写；
+ 有一些朋友可能会觉得封装私有函数会降低程序的执行效率，这一点在一些编程语言中的确是这样，但是我们在日常编写代码的过程中，语义清晰和可读性是更重要的，因此在编写代码的时候，最好能够做到「一行代码只做一件事情」

**复杂度分析**：

+ 时间复杂度：$O(\rm{rows} \cdot \rm{cols} \cdot 4^N)$，这里 $\rm{rows}$ 表示二维矩阵的行数、$\rm{cols}$ 表示二维矩阵的列数，最坏情况下每一个单元格会走错 $3$ 次，第 $4$ 次才找到正确的路径，注意：这个复杂度分析非常宽松，实际情况下运行不会那么坏；
+ 空间复杂度：$O(\rm{rows} \cdot \rm{cols})$，使用 `visited` 布尔数组需要这么多空间，递归调用栈的深度被忽略。

> **友情提示**：二维网格的搜索问题，思路其实并不难，就是执行一次遍历，但是代码很难一下子写对，并且调试也是相对麻烦的，需要大家有一点点耐心。

---

下面我们再展示一个问题，希望大家通过这个问题熟悉二维平面上回溯算法的编码技巧。

### 例 2：「力扣」第 695 题：岛屿的最大面积（中等）


给定一个包含了一些 `0` 和 `1` 的非空二维数组 `grid` 。

一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

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

**注意:** 给定的矩阵`grid` 的长度和宽度都不超过 50。

**思路分析**：

+ 找到一个岛屿，就是在 `1`（表示土地）的上、下、左、右 $4$ 个方向执行一次深度优先遍历遍历，只要这 $4$ 个方向上还有 `1` ，就继续执行深度优先遍历。


**参考代码 1**：递归实现

```Java []
public class Solution {

    private int[][] directions = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    private int rows;
    private int cols;
    private int[][] grid;
    private boolean[][] visited;

    public int maxAreaOfIsland(int[][] grid) {
        if (grid == null) {
            return 0;
        }
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;
        if (cols == 0) {
            return 0;
        }

        this.grid = grid;
        this.visited = new boolean[rows][cols];
        int res = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    res = Math.max(res, dfs(i, j));
                }
            }
        }
        return res;
    }

    private int dfs(int x, int y) {
        visited[x][y] = true;
        int res = 1;
        for (int[] direction:directions) {
            int nextX = x + direction[0];
            int nextY = y + direction[1];
            if (inArea(nextX, nextY) && grid[nextX][nextY] == 1 && !visited[nextX][nextY]) {
                res += dfs(nextX, nextY);
            }
        }
        return res;
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\rm{rows} \times \rm{cols})$，这里 $\rm{rows}$ 表示二维矩阵的行数、$\rm{cols}$ 表示二维矩阵的列数，最坏情况下每一个单元格都会被遍历一次；
+ 空间复杂度：$O(\rm{rows} \times \rm{cols})$，递归调用栈的深度最多为 $\rm{rows} \times \rm{cols}$。

「深度优先遍历」还可以通过「栈」显式实现，值得说明的是：把「参考代码 2」的「栈」换成「队列」，就是「广度优先遍历」。


**参考代码 2**：模拟栈

```Java []
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    private final static int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int maxAreaOfIsland(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];

        int maxArea = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    maxArea = Math.max(maxArea, dfs(grid, i, j, rows, cols, visited));
                }
            }
        }
        return maxArea;
    }

    private int dfs(int[][] grid, int i, int j, int rows, int cols, boolean[][] visited) {
        int count = 0;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.addLast(new int[]{i, j});
        visited[i][j] = true;
        while (!stack.isEmpty()) {
            int[] top = stack.removeLast();
            int curX = top[0];
            int curY = top[1];
            count++;
            for (int[] direction : DIRECTIONS) {
                int newX = curX + direction[0];
                int newY = curY + direction[1];
                if (inArea(newX, newY, rows, cols) && grid[newX][newY] == 1 && !visited[newX][newY]) {
                    stack.addLast(new int[]{newX, newY});
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
+ 空间复杂度：$O(\rm{rows} \times \rm{cols})$，显式使用的栈的深度最多为 $\rm{rows} \times \rm{cols}$。

---

## 练习

提示读者这部分所有的问题都可以使用广度优先遍历完成。

1. 完成「力扣」第 130 题：被围绕的区域（中等）；深度优先遍历、广度优先遍历、并查集。
2. 完成「力扣」第 200 题：岛屿数量（中等）：深度优先遍历、广度优先遍历、并查集；
3. 完成「力扣」第 417 题：太平洋大西洋水流问题（中等）：深度优先遍历、广度优先遍历；
4. 完成「力扣」第 1020 题：飞地的数量（中等）：方法同第 130 题，深度优先遍历、广度优先遍历；
5. 完成「力扣」第 1254 题：统计封闭岛屿的数目（中等）：深度优先遍历、广度优先遍历；
6. 完成「力扣」第 1034 题：边框着色（中等）：深度优先遍历、广度优先遍历；

---
13. 完成「力扣」第 133 题：克隆图（中等）：借助哈希表，使用深度优先遍历、广度优先遍历；

---

14. 完成「力扣」之「剑指 Offer 系列」第 13 题：机器人的运动范围（中等）：深度优先遍历、广度优先遍历；
15. 完成「力扣」第 529 题：扫雷问题（中等）：深度优先遍历、广度优先遍历；

---


## 总结

一些二维平面上的问题还可以使用广度优先遍历和并查集实现，大家可以尝试罗列这些问题，并加以练习。
