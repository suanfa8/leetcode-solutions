# 第 4 节 回溯算法

![image.png](https://pic.leetcode-cn.com/1611540618-qrHmGi-image.png)


---

## 回溯算法是深度优先遍历思想的应用

回溯算法是一种通过不断 **尝试** ，搜索一个问题的一个解或者 **所有解** 的方法。在求解的过程中，如果继续求解不能得到题目要求的结果，就需要 **回退** 到上一步尝试新的求解路径。回溯算法的核心思想是：在一棵 **隐式的树**（看不见的树） 上进行一次深度优先遍历。

我们通过一道经典的问题 N 皇后问题，向大家介绍「回溯算法」的思想。

---

## 例题：「力扣」第 51 题：$N$ 皇后（困难）


*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例：

```
输入：4
输出：[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

**提示**：

+ 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。


**思路分析**：解决这个问题的思路是尝试每一种可能，然后逐个判断。只不过回溯算法按照一定的顺序进行尝试，**在一定不可能得到解的时候进行剪枝**，进而减少了尝试的可能。下面的幻灯片展示了整个搜索的过程。


<![12-01-05.001.jpeg](https://pic.leetcode-cn.com/1604311782-wkCjzV-12-01-05.001.jpeg),![12-01-05.002.jpeg](https://pic.leetcode-cn.com/1604311782-lNtoWv-12-01-05.002.jpeg),![12-01-05.003.jpeg](https://pic.leetcode-cn.com/1604311782-FnyGou-12-01-05.003.jpeg),![12-01-05.004.jpeg](https://pic.leetcode-cn.com/1604311782-iGPBJR-12-01-05.004.jpeg),![12-01-05.005.jpeg](https://pic.leetcode-cn.com/1604311782-aQFfoc-12-01-05.005.jpeg),![12-01-05.006.jpeg](https://pic.leetcode-cn.com/1604311782-HMzXEB-12-01-05.006.jpeg),![12-01-05.007.jpeg](https://pic.leetcode-cn.com/1604311782-XOIbsJ-12-01-05.007.jpeg),![12-01-05.008.jpeg](https://pic.leetcode-cn.com/1604311782-ZDrVKU-12-01-05.008.jpeg),![12-01-05.009.jpeg](https://pic.leetcode-cn.com/1604311782-lAioLA-12-01-05.009.jpeg),![12-01-05.010.jpeg](https://pic.leetcode-cn.com/1604311782-cIFpuN-12-01-05.010.jpeg),![12-01-05.011.jpeg](https://pic.leetcode-cn.com/1604311782-ffasVX-12-01-05.011.jpeg),![12-01-05.012.jpeg](https://pic.leetcode-cn.com/1604311782-eMXgDz-12-01-05.012.jpeg),![12-01-05.013.jpeg](https://pic.leetcode-cn.com/1604311782-tQSbhW-12-01-05.013.jpeg),![12-01-05.014.jpeg](https://pic.leetcode-cn.com/1604311782-SdiiYd-12-01-05.014.jpeg),![12-01-05.015.jpeg](https://pic.leetcode-cn.com/1604311782-achRiy-12-01-05.015.jpeg),![12-01-05.016.jpeg](https://pic.leetcode-cn.com/1604311782-ojlcxT-12-01-05.016.jpeg),![12-01-05.017.jpeg](https://pic.leetcode-cn.com/1604311782-BqvGuM-12-01-05.017.jpeg),![12-01-05.018.jpeg](https://pic.leetcode-cn.com/1604311782-HhXUJT-12-01-05.018.jpeg),![12-01-05.019.jpeg](https://pic.leetcode-cn.com/1604311782-AoMDtB-12-01-05.019.jpeg),![12-01-05.020.jpeg](https://pic.leetcode-cn.com/1604311782-QTXGVc-12-01-05.020.jpeg),![12-01-05.021.jpeg](https://pic.leetcode-cn.com/1604311782-dlbqra-12-01-05.021.jpeg),![12-01-05.022.jpeg](https://pic.leetcode-cn.com/1604311782-Zhrcrz-12-01-05.022.jpeg),![12-01-05.023.jpeg](https://pic.leetcode-cn.com/1604311782-GBSMCY-12-01-05.023.jpeg),![12-01-05.024.jpeg](https://pic.leetcode-cn.com/1604311782-HmQjCl-12-01-05.024.jpeg),![12-01-05.025.jpeg](https://pic.leetcode-cn.com/1604311782-RAUwXT-12-01-05.025.jpeg),![12-01-05.026.jpeg](https://pic.leetcode-cn.com/1604311782-BoBRhw-12-01-05.026.jpeg),![12-01-05.027.jpeg](https://pic.leetcode-cn.com/1604311782-sllLGZ-12-01-05.027.jpeg),![12-01-05.028.jpeg](https://pic.leetcode-cn.com/1604311782-RbklaS-12-01-05.028.jpeg),![12-01-05.029.jpeg](https://pic.leetcode-cn.com/1604311782-durFXx-12-01-05.029.jpeg),![12-01-05.030.jpeg](https://pic.leetcode-cn.com/1604311782-EqZhrX-12-01-05.030.jpeg),![12-01-05.031.jpeg](https://pic.leetcode-cn.com/1604312087-UmQdZn-12-01-05.031.jpeg),![12-01-05.032.jpeg](https://pic.leetcode-cn.com/1604311782-KlYTmD-12-01-05.032.jpeg),![12-01-05.033.jpeg](https://pic.leetcode-cn.com/1604311782-LmLroH-12-01-05.033.jpeg),![12-01-05.034.jpeg](https://pic.leetcode-cn.com/1604311782-CfDbcx-12-01-05.034.jpeg),![12-01-05.035.jpeg](https://pic.leetcode-cn.com/1604311782-npRgQj-12-01-05.035.jpeg),![12-01-05.036.jpeg](https://pic.leetcode-cn.com/1604311782-mZKACL-12-01-05.036.jpeg),![12-01-05.037.jpeg](https://pic.leetcode-cn.com/1604311782-ThVGGc-12-01-05.037.jpeg),![12-01-05.038.jpeg](https://pic.leetcode-cn.com/1604311782-OdtyxO-12-01-05.038.jpeg),![12-01-05.039.jpeg](https://pic.leetcode-cn.com/1604311782-rujaEF-12-01-05.039.jpeg),![12-01-05.040.jpeg](https://pic.leetcode-cn.com/1604311782-BjfCVQ-12-01-05.040.jpeg),![12-01-05.041.jpeg](https://pic.leetcode-cn.com/1604311782-dKVjSy-12-01-05.041.jpeg),![12-01-05.042.jpeg](https://pic.leetcode-cn.com/1604311782-HDLZKZ-12-01-05.042.jpeg),![12-01-05.043.jpeg](https://pic.leetcode-cn.com/1604311782-jWgKHZ-12-01-05.043.jpeg),![12-01-05.044.jpeg](https://pic.leetcode-cn.com/1604311782-AOAolp-12-01-05.044.jpeg),![12-01-05.045.jpeg](https://pic.leetcode-cn.com/1604311782-CXIIYC-12-01-05.045.jpeg),![12-01-05.046.jpeg](https://pic.leetcode-cn.com/1604311782-JkPLzK-12-01-05.046.jpeg),![12-01-05.047.jpeg](https://pic.leetcode-cn.com/1604311782-hrDiRb-12-01-05.047.jpeg),![12-01-05.048.jpeg](https://pic.leetcode-cn.com/1604311782-kGWbQp-12-01-05.048.jpeg),![12-01-05.049.jpeg](https://pic.leetcode-cn.com/1604311782-mLWrMF-12-01-05.049.jpeg),![12-01-05.050.jpeg](https://pic.leetcode-cn.com/1604311782-PFWaIE-12-01-05.050.jpeg),![12-01-05.051.jpeg](https://pic.leetcode-cn.com/1604311782-zlqxvC-12-01-05.051.jpeg),![12-01-05.052.jpeg](https://pic.leetcode-cn.com/1604311782-OhhOwv-12-01-05.052.jpeg),![12-01-05.053.jpeg](https://pic.leetcode-cn.com/1604311782-jNPIjn-12-01-05.053.jpeg),![12-01-05.054.jpeg](https://pic.leetcode-cn.com/1604311782-NMkYog-12-01-05.054.jpeg),![12-01-05.055.jpeg](https://pic.leetcode-cn.com/1604311782-lmRpCG-12-01-05.055.jpeg),![12-01-05.056.jpeg](https://pic.leetcode-cn.com/1604311782-ehFIud-12-01-05.056.jpeg),![12-01-05.057.jpeg](https://pic.leetcode-cn.com/1604311782-QvdjPr-12-01-05.057.jpeg),![12-01-05.058.jpeg](https://pic.leetcode-cn.com/1604311782-EvqNbR-12-01-05.058.jpeg),![12-01-05.059.jpeg](https://pic.leetcode-cn.com/1604311782-insOgZ-12-01-05.059.jpeg),![12-01-05.060.jpeg](https://pic.leetcode-cn.com/1604311782-pFlPqx-12-01-05.060.jpeg),![12-01-05.061.jpeg](https://pic.leetcode-cn.com/1604311782-tCCtmr-12-01-05.061.jpeg),![12-01-05.062.jpeg](https://pic.leetcode-cn.com/1604311782-NPphwd-12-01-05.062.jpeg),![12-01-05.063.jpeg](https://pic.leetcode-cn.com/1604311782-rNQYQj-12-01-05.063.jpeg),![12-01-05.064.jpeg](https://pic.leetcode-cn.com/1604311782-tnoiYA-12-01-05.064.jpeg),![12-01-05.065.jpeg](https://pic.leetcode-cn.com/1604311782-OoyJmL-12-01-05.065.jpeg),![12-01-05.066.jpeg](https://pic.leetcode-cn.com/1604311782-DIwVqD-12-01-05.066.jpeg),![12-01-05.067.jpeg](https://pic.leetcode-cn.com/1604311782-nwnDjo-12-01-05.067.jpeg),![12-01-05.068.jpeg](https://pic.leetcode-cn.com/1604311782-XpZKuw-12-01-05.068.jpeg),![12-01-05.069.jpeg](https://pic.leetcode-cn.com/1604311782-UaxNLS-12-01-05.069.jpeg),![12-01-05.070.jpeg](https://pic.leetcode-cn.com/1604311782-KkqxXB-12-01-05.070.jpeg),![12-01-05.071.jpeg](https://pic.leetcode-cn.com/1604311782-QitPxH-12-01-05.071.jpeg),![12-01-05.072.jpeg](https://pic.leetcode-cn.com/1604311782-unHnlr-12-01-05.072.jpeg),![12-01-05.073.jpeg](https://pic.leetcode-cn.com/1604311782-RjLdvl-12-01-05.073.jpeg),![12-01-05.074.jpeg](https://pic.leetcode-cn.com/1604311782-NlJRIK-12-01-05.074.jpeg),![12-01-05.075.jpeg](https://pic.leetcode-cn.com/1604311782-ZoYvgn-12-01-05.075.jpeg),![12-01-05.076.jpeg](https://pic.leetcode-cn.com/1604311782-bBASuk-12-01-05.076.jpeg),![12-01-05.077.jpeg](https://pic.leetcode-cn.com/1604311782-fIwQic-12-01-05.077.jpeg),![12-01-05.078.jpeg](https://pic.leetcode-cn.com/1604311782-ktxfAr-12-01-05.078.jpeg),![12-01-05.079.jpeg](https://pic.leetcode-cn.com/1604311782-JcDScU-12-01-05.079.jpeg),![12-01-05.080.jpeg](https://pic.leetcode-cn.com/1604311782-DchnIw-12-01-05.080.jpeg),![12-01-05.081.jpeg](https://pic.leetcode-cn.com/1604311782-GfNYLE-12-01-05.081.jpeg)>


下面的树形图展示了上面搜索的过程：

![image.png](https://pic.leetcode-cn.com/1604311636-RHdpwi-image.png)

### 在遍历的过程中记录已经放置的皇后的位置

由于我们需要根据前面已经放置的皇后的位置，来决定当前位置是否可以放置皇后，因此记住已经放置的皇后的位置就很重要。

+ 由于我们一行一行考虑放置皇后，摆放的这些皇后肯定不在同一行；
+ 为了避免它们在同一列，需要一个长度为 $N$ 的布尔数组 `cols`，已经放置的皇后占据的列，就需要在对应的列的位置标记为 `true`；
+ 还需要考虑「任何两个皇后不能位于同一条斜线上」，下面的图展示了位于一条斜线上的皇后的位置特点。

![image.png](https://pic.leetcode-cn.com/1604369085-NKikxL-image.png)

为此，我们需要一个表示主对角线方向的布尔数组 `main`（Main diagonal，长度为 $2N+1$），如果某个单元格放放置了一个皇后，就需要将对应的主对角线标记为 `true`。注意：由于有 3 个方向的横坐标 - 纵坐标的结果为负值，可以统一地为每一个横坐标 - 纵坐标的结果增加一个偏移，具体请见参考代码 1。

![image.png](https://pic.leetcode-cn.com/1604369096-LBpNxP-image.png)

同理，我们还需要一个表示副对角线方向的布尔数组 `sub`（Sub diagonal，长度为 $2N+1$），如果某个单元格放放置了一个皇后，就需要将对应的副对角线标记为 `true`。

**参考代码**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    private int n;
    /**
     * 记录某一列是否放置了皇后
     */
    private boolean[] col;
    /**
     * 记录主对角线上的单元格是否放置了皇后
     */
    private boolean[] main;
    /**
     * 记录了副对角线上的单元格是否放置了皇后
     */
    private boolean[] sub;
    
    private List<List<String>> res;

    public List<List<String>> solveNQueens(int n) {
        res = new ArrayList<>();
        if (n == 0) {
            return res;
        }

        // 设置成员变量，减少参数传递，具体作为方法参数还是作为成员变量，请参考团队开发规范
        this.n = n;
        this.col = new boolean[n];
        this.main = new boolean[2 * n - 1];
        this.sub = new boolean[2 * n - 1];
        Deque<Integer> path = new ArrayDeque<>();
        dfs(0, path);
        return res;
    }

    private void dfs(int row, Deque<Integer> path) {
        if (row == n) {
            // 深度优先遍历到下标为 n，表示 [0.. n - 1] 已经填完，得到了一个结果
            List<String> board = convert2board(path);
            res.add(board);
            return;
        }

        // 针对下标为 row 的每一列，尝试是否可以放置
        for (int j = 0; j < n; j++) {
            if (!col[j] && !main[row - j + n - 1] && !sub[row + j]) {
                path.addLast(j);
                col[j] = true;
                main[row - j + n - 1] = true;
                sub[row + j] = true;
                dfs(row + 1, path);
                sub[row + j] = false;
                main[row - j + n - 1] = false;
                col[j] = false;
                path.removeLast();
            }
        }
    }

    private List<String> convert2board(Deque<Integer> path) {
        List<String> board = new ArrayList<>();
        for (Integer num : path) {
            StringBuilder row = new StringBuilder();
            row.append(".".repeat(Math.max(0, n)));
            row.replace(num, num + 1, "Q");
            board.add(row.toString());
        }
        return board;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N!)$，这里 $N$ 为皇后的个数，这里讨论的时间复杂度很宽松，第一行皇后可以摆放的位置有 $N$ 个，第二行皇后可以摆放的位置有 $N - 1$ 个，依次类推下去，按照分步计数乘法原理，一共有 $N!$ 种可能；
+ 空间复杂度：$O(N)$，递归调用栈的深度最多为 $N$，三个布尔数组的长度分别为 $N$、$2N+1$、$2N+1$，都是 $N$ 的线性组合。

其实，判断是否重复，可以使用哈希表，下面给出的参考代码 2 就使用了哈希表判断是否重复，可以不用处理主对角线方向上「横坐标 - 纵坐标」的下标偏移。但事实上，哈希表底层也是数组。

---

## 树形问题
回溯算法其实是在一棵隐式的树或者图上进行了一次深度优先遍历，我们在解决问题的过程中需要把问题抽象成一个树形问题。充分理解树形问题最好的办法就是用一个小的测试用例，在纸上画出树形结构图，然后再针对树形结构图进行编码。

重要的事情我们说三遍：画图分析很重要、画图分析很重要、画图分析很重要。

要理解「回溯算法」的递归前后，变量需要恢复也需要想象代码是在一个树形结构中执行深度优先遍历，回到以前遍历过的结点，变量需要恢复成和第一次来到该结点的时候一样的值。

另一个理解回溯算法执行流程的重要方法是：在递归方法执行的过程中，将涉及到的变量的值打印出来看，观察变量的值的变化。

> 友情提示：画图分析问题是思考算法问题的重要方法，画图这个技巧在解决链表问题、回溯算法、动态规划的问题上都有重要的体现，请大家不要忽视「画图」这个简单的分析问题的方法，很多时候思路就出现在我们在草稿纸上写写画画以后。


---

## 回溯算法问题的问法

问「一个问题 **所有的** 解」一般考虑使用回溯算法。因此回溯算法也叫「暴力搜索」，但不同于最粗暴的多个 `for` 循环，回溯算法是有方向的遍历。

---

## 再谈「搜索」

计算机擅长做的事情是「计算」，即「做重复的事情」。能用编程的方法解决的问题通常 **结构相同**，**问题规模不同**。因此，我们解决一个问题的时候，通常需要将问题一步一步进行拆解，把一个大问题拆解为结构相同的若干个小问题。

> 友情提示：我们介绍「状态」和「状态空间」这两个概念是为了方便后面的问题描述，其实大家在完成了一定练习以后对这两个概念就会有形象的理解。如果一开始不理解这些概念完全可以跳过。

### 「状态」和「状态空间」

为了区分解决问题的不同阶段、不同规模，我们可以通过语言描述进行交流。在算法的世界里，是通过变量进行描述的，不同的变量的值就代表了解决一个实际问题中所处的不同的阶段，这些变量就叫做「状态变量」。所有的状态变量构成的集合称为「状态空间」。

> 友情提示：「空间」这个词经常代表的含义是「所有」。在《线性代数》里，线性空间（向量空间）就是规定了「加法」和「数乘」，且对这两种运算封闭的 **所有** 元素的集合。

### 不同状态之间的联系形成图（树）结构

我们可以把某种规模的问题描述想象成一个结点。由于规模相近的问题之间存在联系，我们把有联系的结点之间使用一条边连接，因此形成的状态空间就是一张图。

树结构有唯一的起始结点（根结点），且不存在环，树是特殊的图。这一章节绝大多数的问题都从一个基本的问题出发，拆分成多个子问题，并且继续拆分的子问题没有相同的部分，因此这一章节遇到的绝大多数问题的状态空间是一棵树。

我们要了解这个问题的状态空间，就需要通过 **遍历** 的方式。正是因为通过遍历，我们能够访问到状态空间的所有结点，因此可以获得一个问题的 **所有** 解。

---

## 为什么叫「回溯」（难点）

而「回溯」就是 **深度优先遍历** 状态空间的过程中发现的特有的现象，程序会回到以前访问过的结点。而程序在回到以前访问过的结点的时候，就需要将状态变量恢复成为第一次来到该结点的值。

在代码层面上，在递归方法结束以后，执行递归方法之前的操作的 **逆向操作** 即可。


> 友情提示：理解回溯算法的「回溯」需要基于一定的练习，可以不必一开始就理解透彻。另外，理解「回溯算法」的一个重要技巧是 **在程序中打印状态变量进行观察，一步一步看到变量的变化**。 

---


## 回溯算法的实现细节

### 解释递归后面状态重置是怎么回事

+ 当回到上一级的时候，所有的状态变量需要重置为第一次来到该结点的状态，这样继续尝试新的选择才有意义；
+ 在代码层面上，需要在递归结束以后，添加递归之前的操作的逆向操作；

### 基本类型变量和对象类型变量的不同处理

+ 基本类型变量每一次向下传递的时候的行为是复制，所以无需重置；
+ 对象类型变量在遍历的全程只有一份，因此再回退的时候需要重置；
+ 类比于 Java 中的 **方法参数** 的传递机制：
  + 基本类型变量在方法传递的过程中的行为是复制，每一次传递复制了参数的值；
  + 对象类型变量在方法传递的过程中复制的是对象地址，对象全程在内存中共享地址。

### 字符串问题的特殊性

+ 如果使用 `+` 拼接字符串，每一次拼接产生新的字符串，因此无需重置；
+ 如果使用 `StringBuilder` 拼接字符串，整个搜索的过程  `StringBuilder`  对象只有一份，需要状态重置。

### 为什么不是广度优先遍历

+ 广度优先遍历每一层需要保存所有的「状态」，如果状态空间很大，需要占用很大的内存空间；
+ 深度优先遍历只要有路径可以走，就继续尝试走新的路径，不同状态的差距只有一个操作，而广度优先遍历在不同的层之前，状态差异很大，就不能像深度优先遍历一样，可以 **使用一份状态变量去遍历所有的状态空间**，在合适的时候记录状态的值就能得到一个问题的所有的解。

---

## 练习

1. 完成「力扣」第 46 题：全排列（中等）；
2. 完成「力扣」第 37 题：数独（困难）；

---

下面是字符串的搜索问题，完成这些问题可以帮助理解回溯算法的实现细节。

1. 完成「力扣」第 22 题：括号生成（中等）；
2. 完成「力扣」第 17 题：电话号码的字母组合（中等）；
3. 完成「力扣」第 784 题：字母大小写全排列（中等）。