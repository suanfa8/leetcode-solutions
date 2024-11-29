# 第 3 节-滑动窗口-1：同向交替移动的两个变量

有一类数组上的问题，问我们固定长度的滑动窗口的性质，这一类问题在思维层面上相对简单。我们通过两道简单的例题向大家展示这一类问题的写法。

## 例 1：「力扣」第 643 题：子数组最大平均数 I

给定 `n` 个整数，找出平均数最大且长度为 `k` 的连续子数组，并输出该最大平均数。

**示例：**

```
输入：[1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
```

**提示：**

- `1 <= k <= n <= 30,000`。
- 所给数据范围 `[-10,000，10,000]`。

**思路分析**：

我们可以枚举出所有长度为 `k` 的连续子数组（时间复杂度为 $O(N)$），分别求出它们的平均数（时间复杂度为 $O(N)$），从中选出最大的平均数。 事实上，相邻的两个长度固定的连续子数组，它们有一部分是重合的，在计算平均数的时候可以不用遍历。



![image.png](https://pic.leetcode-cn.com/1620975090-MHUIaC-image.png)

由于窗口的长度固定，我们可以计算出所有的长度固定的连续子数组的和，在这些和中求出最大值，除以 $k$，就是题目要求的最大平均值

<![ppt1](https://assets.leetcode-cn.com/solution-static/643/1.png),![ppt2](https://assets.leetcode-cn.com/solution-static/643/2.png),![ppt3](https://assets.leetcode-cn.com/solution-static/643/3.png),![ppt4](https://assets.leetcode-cn.com/solution-static/643/4.png),![ppt5](https://assets.leetcode-cn.com/solution-static/643/5.png),![ppt6](https://assets.leetcode-cn.com/solution-static/643/6.png)>

**参考代码**：

```java
public class Solution {

    public double findMaxAverage(int[] nums, int k) {
        int len = nums.length;
        // 由于题目限制了 k <= len，因此不用做特判
        int windowSum = 0;
        // 第 1 步：先求出第 1 个窗口的和
      	for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }

      	// 第 2 步：通过遍历求出除了第 1 个窗口的和
        int res = windowSum;
        // 循环不变量定义：[left..right) 是长度为 k 的窗口
        for (int right = k; right < len; right++) {
            // 加上一个数再减去一个数
            windowSum = windowSum + nums[right] - nums[right - k];
            res = Math.max(res, windowSum);
        }
        return (double) res / k;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 是数组 $\textit{nums}$ 的长度。我们的算法遍历了数组一次。
- 空间复杂度：$O(1)$。

---

## 例 2：「力扣」第 1052 题：爱生气的书店老板

今天，书店老板有一家店打算试营业 `customers.length` 分钟。每分钟都有一些顾客（`customers[i]`）会进入书店，所有这些顾客都会在那一分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 `i` 分钟生气，那么 `grumpy[i] = 1`，否则 `grumpy[i] = 0`。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 `X` 分钟不生气，但却只能使用一次。

请你返回这一天营业下来，最多有多少客户能够感到满意的数量。

**示例：**

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
输出：16
解释：
书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
```

**提示：**

+ `1 <= X <= customers.length == grumpy.length <= 20000`
+ `0 <= customers[i] <= 1000`
+ `0 <= grumpy[i] <= 1`

**思路分析**：

+ 如果 `grumpy[i] = 0` 表示在这个时刻进店的顾客本来就是满意的。书店老板即使发动技能，这部分的顾客也不会因此受到影响。那么真正受到影响的就是 `grumpy[i] = 1` 的那些顾客，因此：

```
能够满意的客户数量 = 老板是不是发动技能都满意的客户数量 + 老板发动技能可以让顾客满意的数量
```

+ 其中老板发动技能可以让顾客满意的数量就是那些 `grumpy[i] = 1` 的那些顾客，为了求得这部分的区间和，我们可以使用「前缀和」技巧：输入数组区间 `preSum[i]` 表示 `[0..i)` 的和，区间 `[i..j]` 的和可以使用 `preSum[j] - preSum[i - 1]` ，请大家重点体会我们的定义为什么 `preSum[i]` 是左闭右开的，且为什么要数组开 `len + 1` 长度。

<![ppt1](https://assets.leetcode-cn.com/solution-static/1052/1.png),![ppt2](https://assets.leetcode-cn.com/solution-static/1052/2.png),![ppt3](https://assets.leetcode-cn.com/solution-static/1052/3.png),![ppt4](https://assets.leetcode-cn.com/solution-static/1052/4.png),![ppt5](https://assets.leetcode-cn.com/solution-static/1052/5.png),![ppt6](https://assets.leetcode-cn.com/solution-static/1052/6.png),![ppt7](https://assets.leetcode-cn.com/solution-static/1052/7.png),![ppt8](https://assets.leetcode-cn.com/solution-static/1052/8.png),![ppt9](https://assets.leetcode-cn.com/solution-static/1052/9.png)>

**参考代码**：

```java
public class Solution {

    public int maxSatisfied(int[] customers, int[] grumpy, int X) {
        int len = grumpy.length;
        // 前缀和 preSum[i] 表示 [0..i) 里因为老板生气而感到不开心的顾客数
        int[] preSum = new int[len + 1];

        // 统计 1. 所有本来就不生气的顾客数量；2. 前缀和数组
        int originCount = 0;
        for (int i = 0; i < len; i++) {
            if (grumpy[i] == 0) {
                // 不生气
                originCount += customers[i];
                preSum[i + 1] = preSum[i];
            } else {
                // 生气时候前缀和
                preSum[i + 1] = preSum[i] + customers[i];
            }
        }

        int maxAngryCount = 0;
        // 固定长度的滑动窗口的左边界：[i..i + X)
        for (int left = 0; left < len - X + 1; left++) {
            maxAngryCount = Math.max(maxAngryCount, preSum[left + X] - preSum[left]);
        }
        // 所有本来就不生气的顾客
        return originCount + maxAngryCount;
    }
}
```

**说明**：参考代码中有一些细节和边界的地方需要大家仔细体会。

**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $n$ 是数组 $\textit{customers}$ 和 $\textit{grumpy}$ 的长度。需要对两个数组各遍历两次。
- 空间复杂度：$O(1)$。

## 总结

这一节的问题比较简单，详细大家稍加练习就一定可以掌握，并把代码写对。

## 练习

1. 完成「力扣」第 1423 题：可获得的最大点数；
2. 完成「力扣」第 1456 题：定长子串中元音的最大数目；

3. 完成「力扣」第 1658 题：将 x 减到 0 的最小操作数。
