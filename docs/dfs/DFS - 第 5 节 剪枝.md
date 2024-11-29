# 第 5 节 剪枝

![image.png](https://pic.leetcode-cn.com/1611540769-uMxIkB-image.png)

## 剪枝的必要性

剪枝的想法是很自然的。回溯算法本质上是遍历算法，如果 **在遍历的过程中**，可以分析得到这样一条分支一定不存在需要的结果，就可以跳过这个分支。

发现剪枝条件依然是通过举例的例子，**画图分析**，即：**通过具体例子抽象出一般的剪枝规则**。通常可以选取一些较典型的例子，以便抽象出一般规律。

> **友情提示**：阅读下面的文字，可能会有一些晦涩，建议大家了解思路，通过对具体例子的分析，逐渐分析出解决这个问题的细节。

---

## 「剪枝」技巧例举

### 技巧 1：按照一定顺序搜索

按照顺序搜索其实也是去除重复结果的必要条件。

#### 例 1：「力扣」第 47 题：全排列 II

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

**示例 1**：

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**示例 2**：

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**提示**：

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

**思路分析**：

+ 这道题基于「力扣」第 46 题（全排列）的思想完成，首先依然是先画出树形结构，然后编写深度优先遍历的代码，在遍历的过程中收集所有的全排列；
+ 与「力扣」第 46 题（全排列）不同的是：输入数组中有重复元素，如果还按照第 46 题的写法做，就会出现重复列表；
+ 如果搜索出来结果列表，再在结果列表里去重，**比较相同的列表是一件比较麻烦的事情**，我们可以 ①：依次对列表排序，再逐个比较列表中的元素；② 将列表封装成为类，使用哈希表去重的方式去掉重复的列表。这两种方式编码都不容易实现；
+ 既然需要排序，我们可以在一开始的时候，就对输入数组进行排序，在遍历的过程中，通过一定剪枝条件，发现一定会搜索到重复元素的结点，跳过它，这样在遍历完成以后，就能得到不重复的列表。

我们画出树形图，找出它们重复的部分，进而发现产生重复的原因。


![image.png](https://pic.leetcode-cn.com/1609747293-XJCbkK-image.png)


产生重复列表的原因：

+ 很容易看到，在树的同一层，如果当前考虑的数字相同，就有可能搜索到重复的结果（前提：输入数组按照升序排序），因此剪枝条件为 `nums[i] == nums[i - 1]` 这里为了保证数组下标不越界，前提是 `i > 0`；
+ 光有这个条件还不够，我们观察下面两个分支，中间被着重标注的分支，满足 `nums[i] == nums[i - 1]` 并且 `nums[i - 1]` 还未被使用，就下来由于还要使用 `1` 一定会与前一个分支搜索出的结果重复；
+ 而左边被着重标注的分支，也满足  `nums[i] == nums[i - 1]` ，但是 `nums[i - 1]` 已经被使用，接下来不会再用到它，因此不会产生重复。

![image.png](https://pic.leetcode-cn.com/1609747321-OawzfE-image.png)


**参考代码**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> permuteUnique(int[] nums) {
        int len = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // 剪枝的前提是排序
        Arrays.sort(nums);
        boolean[] used = new boolean[len];
        // 使用 Deque 是 Java 官方 Stack 类的建议
        Deque<Integer> path = new ArrayDeque<>(len);
        dfs(nums, 0, len, used, path, res);
        return res;
    }

    private void dfs(int[] nums, int index, int len, boolean[] used, Deque<Integer> path, List<List<Integer>> res) {
        if (index == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < len; i++) {
            if (used[i]) {
                continue;
            }

            // 注意：理解 !used[i - 1]，很关键
            // 剪枝条件：i > 0 是为了保证 nums[i - 1] 有意义
            // 写 !used[i - 1] 是因为 nums[i - 1] 在深度优先遍历的过程中刚刚被撤销选择
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            used[i] = true;
            path.addLast(nums[i]);
            dfs(nums, index + 1, len, used, path, res);
            // 回溯部分的代码，和 dfs 之前的代码是对称的
            used[i] = false;
            path.removeLast();
        }
    }
}
```

#### 例 2：「力扣」第 39 题：（组合问题）

给定一个**无重复元素**的数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的数字可以无限制重复被选取。

**说明：**

- 所有数字（包括 `target`）都是正整数。
- 解集不能包含重复的组合。 

**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
```

**示例 2**：

```
输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

**提示**：

+ `1 <= candidates.length <= 30`
+ `1 <= candidates[i] <= 200`
+ `candidate` 中的每个元素都是独一无二的。
+ `1 <= target <= 500`

**思路分析**：有了之前问题的求解经验，我们 **强烈建议** 大家使用示例 1 ，以自己熟悉的方式画出树形结构，再尝试编码、通过调试的方式把这个问题做出来。

+ 可以从目标值 `target = 7` 开始，逐个减去 `2` 、`3` 、`6` 、`7` ，把问题转化成使用 `[2, 3, 6, 7]` 能够得到的组合之和为 `5`、 `4`、 `1`、`0`  的所有列表，如果能够得到有效的列表，再加上减去的那个数，就是原始问题的一个列表，这是这个问题的递归结构；
+ 减去一个数以后，得到的数为 `0​` 或者负数以后，就可以停止了，请大家想一想这是为什么。画好这棵树以后，我们关注叶子结点的值为 `0` 的结点，从根结点到叶子结点的一条路径，满足沿途减去的数的和为 `target = 7`；  

![image.png](https://pic.leetcode-cn.com/1609747338-Xtbzly-image.png)


+ 由于这个问题得到的结果是组合，`[2, 2, 3]`、`[2, 3, 2]` 与 `[3, 2, 2]` 只能作为一个列表在结果集里输出，我们依然是按照第 47 题的分析，在图中标注出这些重复的分支，发现剪枝的条件；

![image.png](https://pic.leetcode-cn.com/1609747346-vldsxx-image.png)


+ 去除重复的方法通常是按照一定的顺序考虑问题，我们观察重复的三个列表 `[2, 2, 3]`、`[2, 3, 2]` 与 `[2, 3, 2]` ，我们只需要一个，保留自然顺序 `[2, 2, 3]` 即可，于是我们可以指定如下规则：如果在深度较浅的层减去的数等于 `a` ，那么更深的层只能减去大于等于 `a` 的数（根据题意，一个元素可以使用多次，因此可以减去等于 `a` 的数），这样就可以跳过重复的分支，深度优先遍历得到的结果就不会重复；
+ 容易发现，如果减去一个数的值小于 `0​` ，就没有必要再减去更大的数，这也是可以剪枝的地方。

**参考代码 1**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // 排序是剪枝的前提
        Arrays.sort(candidates);
        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        // 由于进入更深层的时候，小于 0 的部分被剪枝，因此递归终止条件值只判断等于 0 的情况
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = begin; i < len; i++) {
            // 重点理解这里剪枝，前提是候选数组已经有序
            if (target - candidates[i] < 0) {
                break;
            }

            path.addLast(candidates[i]);
            dfs(candidates, i, len, target - candidates[i], path, res);
            path.removeLast();
        }
    }
}
```

如果对这个问题研究比较深入，可以发现，其实只要保持深层结点不重复使用浅层结点使用过的数值即可，**也就是说排序对于这道问题来说不是必须的**，排序用于提速，而真正去除重复元素的技巧是：设置搜索起点，这是另一种意义上的按顺序搜索（搜索起点不回头）。下面的代码也可以通过系统测评。

**参考代码 2**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    /**
     * @param candidates 候选数组
     * @param begin      搜索起点
     * @param len        冗余变量，是 candidates 里的属性，可以不传
     * @param target     每减去一个元素，目标值变小
     * @param path       从根结点到叶子结点的路径，是一个栈
     * @param res        结果集列表
     */
    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        // target 为负数和 0 的时候不再产生新的孩子结点
        if (target < 0) {
            return;
        }
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 重点理解这里从 begin 开始搜索的语意
        for (int i = begin; i < len; i++) {
            path.addLast(candidates[i]);
            // 注意：由于每一个元素可以重复使用，下一轮搜索的起点依然是 i，这里非常容易弄错
            dfs(candidates, i, len, target - candidates[i], path, res);
            // 状态重置
            path.removeLast();
        }
    }
}
```


#### 例 3：「力扣」第 77 题：子集（中等）

给定两个整数 *n* 和 *k*，返回 1 ... *n* 中所有可能的 *k* 个数的组合。

**示例**：

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**思路分析**：

+ 依然是 **强烈建议** 大家在纸上根据示例画出树形结构图；
+ 根据第 39 题的经验，可以设置搜索起点，以防止不重不漏；
+ 如果对这个问题研究得比较深入，由于 `k` 是一个正整数，搜索起点不一定需要枚举到 `n` ，具体搜索起点的上限可以尝试举出一个数值合适的例子找找规律，我们在这里直接给出参考的代码。

**参考代码**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }
        Deque<Integer> path = new ArrayDeque<>(k);
        dfs(n, k, 1, path, res);
        return res;
    }

    // i 的极限值满足： n - i + 1 = (k - pre.size())
    // n - i + 1 是闭区间 [i, n] 的长度
    // k - pre.size() 是剩下还要寻找的数的个数
    private void dfs(int n, int k, int index, Deque<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }

      	// 注意：这里搜索起点的上限为 n - (k - path.size()) + 1 ，这一步有很强的剪枝效果
        for (int i = index; i <= n - (k - path.size()) + 1; i++) {
            path.addLast(i);
            dfs(n, k, i + 1, path, res);
            path.removeLast();
        }
    }
}
```

#### 例 4：「力扣」第 473 题：火柴拼正方形（中等）

还记得童话《卖火柴的小女孩》吗？现在，你知道小女孩有多少根火柴，请找出一种能使用所有火柴拼成一个正方形的方法。不能折断火柴，可以把火柴连接起来，并且每根火柴都要用到。

输入为小女孩拥有火柴的数目，每根火柴用其长度表示。输出即为是否能用所有的火柴拼成正方形。

示例 1：

```
输入: [1,1,2,2,2]
输出: true

解释: 能拼成一个边长为2的正方形，每边两根火柴。
```

示例 2：

```
输入: [3,3,3,3,4]
输出: false

解释: 不能用所有火柴拼成一个正方形。
```

**参考代码**：

```Java []
import java.util.Arrays;
import java.util.Comparator;

public class Solution {

    private int len;

    public boolean makesquare(int[] nums) {
        this.len = nums.length;
        if (len == 0) {
            return false;
        }

        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 4 != 0) {
            return false;
        }
        // 边长
        int edge = sum / 4;
        // 记录了哪些火柴已经被使用
        boolean[] visited = new boolean[len];

        // 不想修改输入数组，所以将输入数组做了一份拷贝，想使用降序排序的 API，故使用包装类型
        Integer[] copy = new Integer[len];
        for (int i = 0; i < len; i++) {
            copy[i] = nums[i];
        }
        Arrays.sort(copy, Comparator.reverseOrder());
        return dfs(copy, visited, 0, edge, 0, 0);
    }

    public boolean dfs(Integer[] nums, boolean[] visited, int k, int edge, int begin, int tempSum) {
        if (k == 4) {
            return true;
        }
        if (tempSum == edge) {
            // 注意：需要从 begin = 0 开始搜索，有一些边是跳过的
            return dfs(nums, visited, k + 1, edge, 0, 0);
        }
        for (int i = begin; i < len; i++) {
            if (tempSum + nums[i] > edge) {
                continue;
            }

            if (!visited[i]) {
                visited[i] = true;
                // 由于是按照顺序搜索的，下一轮搜索起点为 i + 1
                if (dfs(nums, visited, k, edge, i + 1, tempSum + nums[i])) {
                    return true;
                }
                visited[i] = false;

                // 长度相等的边都可以跳过
                while (i + 1 < len && nums[i].equals(nums[i + 1])) {
                    i++;
                }
            }
        }
        return false;
    }
}
```

### 技巧 2：空间换时间（记忆化）

发现剪枝条件和「空间换时间」都是剪枝的技巧。「力扣」第 51 题：（$N$ 皇后）和第 37 题（解数独），都需要在遍历的时候，记录已经放置的棋盘上的棋子的信息，这种空间换时间的思想其实也达到了剪枝的效果。

剪枝会在遍历的过程中带来性能消耗，如果问题规模较小则没有必要剪枝。如果问题规模较大，剪枝就很有必要了。


## 练习

1. 完成「力扣」第 40 题：组合总和 II（中等）；
2. 完成「力扣」第 78 题：子集（中等）；
3. 完成「力扣」第 90 题：子集 II（中等）。

---

4. 完成「力扣」第 1593 题：拆分字符串使唯一子字符串的数目最大（中等）；
5. 完成「力扣」第 1071 题：活字印刷（中等）。

---


## 总结

「剪枝」条件通常是具体问题具体分析，因此需要我们积累一定求解问题的经验。
