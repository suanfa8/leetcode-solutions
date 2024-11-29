# 第 5 节 双向 BFS 与多源 BFS

这一节我们介绍「广度优先遍历」的变形：双向 BFS 与多源 BFS。

---

## 双向广度优先遍历

「双向 BFS」应用于这样的特殊场景：**无向图（无向图可以看成双向有向图）**，有明确的搜索 **终点（目标）**。

双向广度优先遍历，分别从起始状态和目标状态开始，**以交替的方式扩展每一层**，当两边搜索的状态列表有交集的时候，表示搜索过程相遇，搜索终止。双向 BFS 等价于单向 BFS，但是避免了单向 BFS 在层数很深的时候状态结点的大规模扩散。

大家可以点击下面的视频观看「双向 BFS」的动态演示过程，观察到：绿色圆圈的面积 + 红色圆圈的面积 < 黄色圆圈的面积。

![双向遍历2(1).mp4](9e2b84de-0542-41d5-a864-512a7c4f569b)

我们这一节的例题，都会先写出单向 BFS 的解法，再写出双向 BFS 的解法。

---

## 例 1：「力扣」第 127 题：单词接龙（困难）

给定两个单词（*beginWord* 和 *endWord*）和一个字典，找到从 *beginWord* 到 *endWord* 的最短转换序列的长度。转换需遵循如下规则：

1. 每次转换只能改变一个字母。
2. 转换过程中的中间单词必须是字典中的单词。

说明:

+ 如果不存在这样的转换序列，返回 0。
+ 所有单词具有相同的长度。
+ 所有单词只由小写字母组成。
+ 字典中不存在重复的单词。
+ 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。

**示例 1**：

```
输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出: 5

解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
     返回它的长度 5。
```

示例 2：

```
输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: 0

解释: endWord "cog" 不在字典中，所以无法进行转换。
```

**思路分析**：

+ 这道题虽然标注为「困难」，但是思路其实并不难，难在代码编写；
+ 「每次转换只能改变一个字母」，例如 "hot" 改动第一个字符到 "dot"，同理 "dot" 也可以改动第一个字符到 "hot"。"hot" 和 "dot" 就可以表示为「图」的两个顶点，它们之间的权值为 $1$，所有的单词之间有联系，权值都为 $1$，因此可以认为是无权图，这个问题就是让我们求无权图的最短路径是多少，显然使用「广度优先遍历」；
+ 我们没有必要一开始把图关系建立起来，大家可以比较一下下面两种方式：
  + 对于每一个单词，都比对它和其它单词是否可以转换，时间复杂度为 $O(wordLen \cdot N^2)$，这里 $N$ 为单词集合的单词总数，$wordLen$ 为每一个单词的长度，是一个确定的值；
  + 先把所有的单词放入哈希表，把每一个单词的每一位做修改，每一位修改的可能性有 $25$ 种，如果修改以后的单词正好在哈希表中，说明找到了一个转换关系，时间复杂度为 $25 \cdot wordLen * N$。
因此这个问题的特点是「一边扩散、一边建立图结构」。


<![0127.001.jpeg](https://pic.leetcode-cn.com/1609710410-AoMUJV-0127.001.jpeg),![0127.002.jpeg](https://pic.leetcode-cn.com/1609710410-sCKBIQ-0127.002.jpeg),![0127.003.jpeg](https://pic.leetcode-cn.com/1609710410-NnzIof-0127.003.jpeg),![0127.004.jpeg](https://pic.leetcode-cn.com/1609710410-PIjngf-0127.004.jpeg),![0127.005.jpeg](https://pic.leetcode-cn.com/1609710410-xjNbGd-0127.005.jpeg)>


**参考代码 1**：单向 BFS

```Java []
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class Solution {

    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // 第 1 步：先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
        Set<String> wordSet = new HashSet<>(wordList);
        if (wordSet.size() == 0 || !wordSet.contains(endWord)) {
            return 0;
        }
        wordSet.remove(beginWord);

        // 第 2 步：开始广度优先遍历
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);

        int step = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                // 依次遍历当前队列中的单词
                String front = queue.poll();

                int wordLen = front.length();
                char[] charArray = front.toCharArray();
                // 尝试修改每一位上的字母
                for (int j = 0; j < wordLen; j++) {
                    // 注意：每次只能修改一个字符，因此需要暂存当前位的字符
                    char origin = charArray[j];
                    // 一共修改 26 次，修改成 origin 是没有必要的，但不做特殊处理
                    for (int k = 0; k < 26; k++) {
                        charArray[j] = (char) ('a' + k);
                        String nextWord = new String(charArray);
                        if (wordSet.contains(nextWord)) {
                            if (nextWord.equals(endWord)) {
                                return step + 1;
                            }

                            if (!visited.contains(nextWord)) {
                                queue.add(nextWord);
                                // 注意：添加到队列以后，必须马上标记为已经访问
                                visited.add(nextWord);
                            }
                        }
                    }
                    charArray[j] = origin;
                }
            }
            step++;
        }
        return 0;
    }
}
```

**参考代码 2**：双向 BFS
```Java []
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // 第 1 步：先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
        Set<String> wordSet = new HashSet<>(wordList);
        if (wordSet.size() == 0 || !wordSet.contains(endWord)) {
            return 0;
        }

        // 第 2 步：执行双向 BFS，左右交替扩散的步数之和为所求
        Set<String> visited = new HashSet<>();

        // 分别用左边和右边扩散的哈希表代替单向 BFS 里的队列，它们在双向 BFS 的过程中交替使用（等价于使用队列）
        Set<String> beginVisited = new HashSet<>();
        beginVisited.add(beginWord);
        Set<String> endVisited = new HashSet<>();
        endVisited.add(endWord);
        int step = 1;
        while (!beginVisited.isEmpty() && !endVisited.isEmpty()) {
            // 优先选择小的哈希表进行扩散，考虑到的情况更少
            if (beginVisited.size() > endVisited.size()) {
                Set<String> temp = beginVisited;
                beginVisited = endVisited;
                endVisited = temp;
            }

            // 到这里，保证 beginVisited 是相对较小的集合，nextLevelVisited 在扩散完成以后，会成为新的 beginVisited
            Set<String> nextLevelVisited = new HashSet<>();
            for (String word : beginVisited) {
                // 尝试对 word 修改每一个字符，看看是不是能落在 endVisited 中，扩展得到的新的 word 添加到 nextLevelVisited 里
                char[] charArray = word.toCharArray();
                for (int i = 0; i < word.length(); i++) {
                    char origin = charArray[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        charArray[i] = c;
                        String nextWord = new String(charArray);
                        if (wordSet.contains(nextWord)) {
                            if (endVisited.contains(nextWord)) {
                                return step + 1;
                            }

                            if (!visited.contains(nextWord)) {
                                nextLevelVisited.add(nextWord);
                                visited.add(nextWord);
                            }
                        }
                    }
                    charArray[i] = origin;
                }
            }

            // 原来的 beginVisited 丢弃，从 nextLevelVisited 开始新的双向 BFS
            beginVisited = nextLevelVisited;
            step++;
        }
        return 0;
    }
}
```

---

## 多源 BFS

「多源 BFS」其实不是什么特别新鲜的 BFS 的问题。我们以前看过的 BFS 问题，起始顶点只有一个，而有一类问题起始顶点有多个。但是多源 BFS 问题可以转换为单源 BFS 问题，只需要 **认为「多源」来自「一个虚拟的源」**，也就是在一开始的时候，把所有符合条件的结点都加入 **队列**，剩下的都一样。

---

### 例 2：「力扣」第 994 题：腐烂的橘子（中等）

在给定的网格中，每个单元格可以有以下三个值之一：

- 值 `0` 代表空单元格；
- 值 `1` 代表新鲜橘子；
- 值 `2` 代表腐烂的橘子。

每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 `-1`。

**示例 1**：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png)

```
输入：[[2,1,1],[1,1,0],[0,1,1]]
输出：4
```

**示例 2**：

```
输入：[[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
```

**示例 3**：

```
输入：[[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
```

**提示**：

1. `1 <= grid.length <= 10`
2. `1 <= grid[0].length <= 10`
3. `grid[i][j]` 仅为 `0`、`1` 或 `2`

**思路分析**：

+ 题目问「最小分钟数」，橘子腐烂的规则是：每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。很显然，这是一个四连通问题，并且使用「广度优先遍历」求解；
+ 在一开始的时候，遍历整个网格，把所有腐烂的橘子（值为 `2`）都加入队列。由于最终的状态是「单元格中没有新鲜橘子」，因此可以在遍历网格的同时，统计「新鲜橘子」的个数；
+ 从当前腐烂的橘子开始，执行若干次四连通的广度优先遍历，每一次遍历到一个新的单元格，「新鲜橘子」的个数 $-1$。广度优先遍历的次数就是所有橘子腐烂需要的分钟数；
+ 遍历完成以后，如果还有新鲜的橘子，说明有橘子永远不会腐烂，根据题意返回 $-1$。

**参考代码**：

```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int[][] directions = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[rows][cols];
        // 新鲜橘子的个数
        int count = 0;
        // 初始化的时候，把腐烂的橘子加入队列
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j});
                    visited[i][j] = true;
                } else if (grid[i][j] == 1) {
                    count++;
                }
            }
        }

        int step = 0;
        while (!queue.isEmpty()) {
            // 如果当前没有新鲜的橘子，就没有可以扩散的区域了
            if (count == 0) {
                break;
            }
            step++;
            int curSize = queue.size();
            for (int i = 0; i < curSize; i++) {
                int[] front = queue.poll();
                int x = front[0];
                int y = front[1];
                for (int[] direction : directions) {
                    int newX = x + direction[0];
                    int newY = y + direction[1];
                    if (inArea(newX, newY, rows, cols) && !visited[newX][newY] && grid[newX][newY] == 1) {
                        count--;
                        queue.offer(new int[]{newX, newY});
                        visited[newX][newY] = true;
                    }
                }
            }
        }

        if (count > 0) {
            // 此时说明，好的橘子是一个「孤岛」，不会被坏橘子污染到
            return -1;
        }
        return step;
    }

    private boolean inArea(int i, int j, int rows, int cols) {
        return 0 <= i && i < rows && 0 <= j && j < cols;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\rm{rows} \times \rm{cols})$，这里 $\rm{rows}$ 表示二维矩阵的行数、$\rm{cols}$ 表示二维矩阵的列数，最坏情况下每一个单元格都会被遍历一次；
+ 空间复杂度：$O(\rm{rows} \times \rm{cols})$，递归调用栈的深度最多为 $\rm{rows} \times \rm{cols}$。

---

## 练习

1. 完成「力扣」第 542 题：01 矩阵（中等）；
2. 完成「力扣」第 1162 题：地图分析（中等）；
3. 完成「力扣」第 433 题：最小基因变化（中等）；
4. 完成「力扣」第 752 题：打开转盘锁（中等）；
5. 完成「力扣」第 773 题：滑动谜题（困难）。


---


## 总结



广度优先遍历我们就为大家介绍到这里了，我们为大家做一些总结：

+ 「广度优先遍历」和「深度优先遍历」一样，都是遍历的方式，所谓遍历就是考虑了所有可能出现的情况。因此如果一个问题须要考虑所有可能的情况，可以使用「广度优先遍历」或者「深度优先遍历」完成；
+ 「广度优先遍历」的典型应用是：寻找无权图中的最短路径问题；
+ 如果一个问题问我们「最短」、「最少」、「最小」，可以尝试对问题进行建模，看看是不是可以转换成为一个无权图的最短路径问题；
+ 二维网格上的连通性问题，可以考虑使用「广度优先遍历」、「深度优先遍历」、「并查集」实现，注意多做相关问题，熟悉代码的编写和一些常用的技巧，注重调试。

感谢大家。