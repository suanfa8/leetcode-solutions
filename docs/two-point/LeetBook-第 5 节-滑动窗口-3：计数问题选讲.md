# 第 5 节-滑动窗口-3：计数问题选讲

这一节我们向大家介绍几个关于「滑动窗口」的计数问题，写对计数问题的标准是：不重不漏。

## 例 1：「力扣」第 159 题：至多包含两个不同字符的最长子串（会员题）

给定一个字符串 `s`，找出 **至多** 包含两个不同字符的最长子串 `t` ，并返回该子串的长度。

**示例 1:**

```
输入: "eceba"
输出: 3
解释: t 是 "ece"，长度为3。
```

**示例 2:**

```
输入: "ccaabbb"
输出: 5
解释: t 是 "aabbb"，长度为5。
```

**说明：**

- $1 \le s.length \le 10^4$
- `s` 只包含英文字母

**思路分析**：

+ 如果一个字符串的子串至多包含 3 个不同字符，那么左端点相同，且长度更长的子串一定不是我们要找的子串，此时应该让左端点右移，好让子串至多包含 2 个不同字符；
+ 然后尝试让右边界右移，直到一个字符串的子串至多包含 3 个不同的字符的时候停下。

以上两个步骤交替进行，具体细节请见参考代码。

**参考代码**：

```Java []
public class Solution {

    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int len = s.length();
        if (len < 3) {
            return len;
        }

        char[] charArray = s.toCharArray();
        int[] freq = new int[128];
        // 滑动窗口里不同字符的个数
        int count = 0;

        int res = 2;
        int left = 0;
        int right = 0;
        while (right < len) {
            freq[charArray[right]]++;
            if (freq[charArray[right]] == 1) {
                count++;
            }
            right++;

            while (count == 3) {
                freq[charArray[left]]--;
                if (freq[charArray[left]] == 0) {
                    count--;
                }
                left++;
            }
            // 退出循环以后有 count = 2，因此在这里选出最大值
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 `N` 是输入字符串的长度；
+ 空间复杂度：$O(\Sigma)$，频数数组的长度取决于输入字符串里字符的种类个数。


**思考**：

写完代码以后，请大家思考：
+ 为什么 `res = Math.max(res, right - left);` 这一行代码要写在退出循环 `while (count > 2)` 以后的位置；
+ 并且为什么记录滑动窗口的长度表达式为 `right - left`。


## 例 2：「力扣」第 340 题：至多包含 K 个不同字符的最长子串（会员题）

给定一个字符串 `s`，找出 **至多** 包含 `k` 个不同字符的最长子串 `T`。

**示例 1:**

```
输入: s = "eceba", k = 2
输出: 3
解释: 则 T 为 "ece"，所以长度为 3。
```

**示例 2:**

```
输入: s = "aa", k = 1
输出: 2
解释: 则 T 为 "aa"，所以长度为 2。
```

**说明：**

- $1 \le s.length \le 5 * 10^4$
- $0 \le k \le 50$

**思路分析**：

这道题与「力扣」第 159 题类似，只需要把 $2$ 改成 `k` 就可以了，其它一样。

**参考代码**：

```Java []
public class Solution {

    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int len = s.length();
        if (len <= k) {
            return len;
        }

        char[] charArray = s.toCharArray();
        int[] freq = new int[128];
        int count = 0;

        int left = 0;
        int right = 0;
        int res = k;
        while (right < len) {
            freq[charArray[right]]++;
            if (freq[charArray[right]] == 1) {
                count++;
            }
            right++;

            while (count == k + 1) {
                freq[charArray[left]]--;
                if (freq[charArray[left]] == 0) {
                    count--;
                }
                left++;
            }

            res = Math.max(res, right - left);
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 `N` 是输入字符串的长度；
+ 空间复杂度：$O(\Sigma)$，频数数组的长度取决于输入字符串里字符的种类个数。


## 例 3：「力扣」第 795 题： 区间子数组个数

给定一个元素都是正整数的数组`A` ，正整数 `L` 以及 `R` (`L <= R`)。

求连续、非空且其中最大元素满足大于等于`L` 小于等于`R`的子数组个数。

```
例如 :
输入: 
A = [2, 1, 4, 3]
L = 2
R = 3
输出: 3
解释: 满足条件的子数组: [2], [2, 1], [3].
```

**注意:**

- L, R 和 `A[i]` 都是整数，范围在 `[0, 10^9]`。
- 数组 `A` 的长度范围在`[1, 50000]`。

**思路分析**：暴力解法需要枚举所有子数组，然后遍历所有子数组，计算最大元素大于等于`L` 小于等于`R`的连续子数组个数，时间复杂度为 $O(N^3)$，这里 $N$ 是输入数组的长度。

事实上，最大元素在区间 $[L..R]$ 里的连续子数组的个数，可以看成是一个「区间」的问题，处理区间的问题可以按照「前缀和」的思路。把原问题转化成为「最大元素小于等于 $R$ 的连续子数组的个数」减去「最大元素小于等于 $L - 1$ 的连续子数组的个数」。

而「最大元素小于等于 $X$ 的连续子数组的个数」可以使用滑动窗口算法完成，这是因为一旦我们遍历到某个元素的值严格大于 $X$，计算「小于等于 $X$ 的连续子数组的个数」就不能包括这个严格大于 $X$ 的元素。

因此「最大元素小于等于 $X$ 的连续子数组的个数」就等于「最大元素小于等于 $X$ 的连续子数组」的长度之和。我们枚举这些区间的时候可以固定左端点。例如，子区间 $[4, 6, 2, 8 ]$ 里的所有元素都小于等于 $8$，最大元素小于等于 $8$ 的连续子数组的个数就为 $[4]$、$[4,6]$ 、$[4,6,8]$ 、$[4,6,8,10]$ ，这些区间都以左端点 $4$ 开头。

统一枚举的标准才能做到不重不漏。

**参考代码**：

```Java []
public class Solution {

    public int numSubarrayBoundedMax(int[] nums, int left, int right) {
        return lessEqualsThan(nums, right) - lessEqualsThan(nums, left - 1);
    }

    private int lessEqualsThan(int[] nums, int k) {
        int len = nums.length;
        int res = 0;
        // 循环不变量：nums[left..right] 里的所有元素都小于等于 k
        for (int left = 0, right = 0; right < len; right++) {
            if (nums[right] > k) {
                left = right + 1;
            }
            res += right - left;
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，其中 $N$ 是输入数组 `nums` 的长度；
+ 空间复杂度：$O(1)$。

## 例 4：「力扣」第 992 题： K 个不同整数的子数组

### 📺 视频讲解 

![992. K 个不同整数的子数组.mp4]()

#### 最初直觉使用双指针算法遇到的问题

对于一个固定的左边界来说，满足「恰好存在 `K` 个不同整数的子区间」的右边界 **不唯一**，且形成区间。

示例 1：左边界固定的时候，恰好存在 $2$ 个不同整数的子区间为 $[1,2],[1,2,1],[1,2,1,2]$ ，总数为 $3$。其值为下标 $3 - 1 + 1$，即区间 $[1..3]$ 的长度。

![image.png](https://pic.leetcode-cn.com/1612775858-VWbhYR-image.png){:width=500}

我们需要找到左边界固定的情况下，满足「恰好存在 `K` 个不同整数的子区间」最小右边界和最大右边界。

#### 把原问题转换成为容易求解的问题

> 友情提示：这里把 「恰好」 转换成为 「最多」需要一点求解「双指针（滑动窗口）」问题的经验。建立在熟练掌握这一类问题求解思路的基础上。

把「**恰好**」改成「**最多**」就可以使用双指针一前一后交替向右的方法完成，这是因为 **对于每一个确定的左边界，最多包含 $K$ 种不同整数的右边界是唯一确定的**，并且在左边界向右移动的过程中，右边界或者在原来的地方，或者在原来地方的右边。

而「最多存在 $K$ 个不同整数的子区间的个数」与「恰好存在 `K` 个不同整数的子区间的个数」的差恰好等于「最多存在 $K - 1$ 个不同整数的子区间的个数」。

![image.png](https://pic.leetcode-cn.com/1612776085-sZFGqE-image.png)

因为原问题就转换成为求解「最多存在 $K$ 个不同整数的子区间的个数」与 「最多存在 $K - 1$ 个不同整数的子区间的个数」，它们其实是一个问题。

实现函数 `atMostWithKDistinct(A, K)` ，表示「最多存在 $K$ 个不同整数的子区间的个数」。于是 `atMostWithKDistinct(A, K) - atMostWithKDistinct(A, K - 1)` 即为所求。

**参考代码**：

```Java []
public class Solution {

    public int subarraysWithKDistinct(int[] A, int K) {
        return atMostKDistinct(A, K) - atMostKDistinct(A, K - 1);
    }

    /**
     * @param A
     * @param K
     * @return 最多包含 K 个不同整数的子区间的个数
     */
    private int atMostKDistinct(int[] A, int K) {
        int len = A.length;
        int[] freq = new int[len + 1];

        int left = 0;
        int right = 0;
        // [left, right) 里不同整数的个数
        int count = 0;
        int res = 0;
        // [left, right) 包含不同整数的个数小于等于 K
        while (right < len) {
            if (freq[A[right]] == 0) {
                count++;
            }
            freq[A[right]]++;
            right++;

            while (count > K) {
                freq[A[left]]--;
                if (freq[A[left]] == 0) {
                    count--;
                }
                left++;
            }
            // [left, right) 区间的长度就是对结果的贡献
            res += right - left;
        }
        return res;
    }
}
```

**说明**： `res += right - left;` 这行代码的意思：

用具体的例子理解：最多包含 3 种不同整数的子区间  `[1, 3, 2, 3]` （双指针算法是在左边界固定的前提下，让右边界走到最右边），当前可以确定 `1` 开始的满足最多包含 3 种不同整数的子区间有 `[1]`、`[1, 3]`、`[1, 3, 2]`、`[1, 3, 2, 3]`。

**所有的** 左边界固定前提下，根据右边界最右的下标，计算出来的子区间的个数就是整个函数要返回的值。用右边界固定的前提下，左边界最左边的下标去计算也是完全可以的。


**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(N)$，使用了常数个变量、频数数组的长度为 $N + 1$。

## 总结

计数问题需要统一计数的标准。这一类问题需要仔细计算，一些代码的细节如果想不明白，可以在草稿纸上写出具体的例子帮助总结规律。


## 练习

1. 完成「力扣」第 713 题：乘积小于K的子数组；
2. 完成「力扣」第 904 题：水果成篮；
3. 完成「力扣」第 1358 题：包含所有三种字符的子字符串数目；
4. 完成「力扣」第 467 题：环绕字符串中唯一的子字符串；
5. 完成「力扣」第 719 题：找出第 k 小的距离对。
