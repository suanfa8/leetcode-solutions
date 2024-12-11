---
title: 「力扣」第 287 题：寻找重复数
icon: laptop-code
---

# 「力扣」第 287 题：寻找重复数

给定一个包含 `n + 1` 个整数的数组 `nums` ，其数字都在 `[1, n]` 范围内（包括 `1` 和 `n`），可知至少存在一个重复的整数。

假设 `nums` 只有 **一个重复的整数** ，返回 **这个重复的数** 。

你设计的解决方案必须 **不修改** 数组 `nums` 且只用常量级 `O(1)` 的额外空间。

**示例 1：**

```
输入：nums = [1,3,4,2,2]
输出：2
```

**示例 2：**

```
输入：nums = [3,1,3,4,2]
输出：3
```

**示例 3 :**

```
输入：nums = [3,3,3,3,3]
输出：3
```

**提示：**

- $1 \le n \le 10^5$
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
- `nums` 中 **只有一个整数** 出现 **两次或多次** ，其余整数均只出现 **一次**

**进阶：**

- 如何证明 `nums` 中至少存在一个重复的数字?
- 你可以设计一个线性级时间复杂度 `O(n)` 的解决方案吗？


Java 代码：

::: tabs

@tab java

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int len = nums.length; // n + 1 = len, n = len - 1
        // 在 [left..right] 里查找数组 nums 中重复的整数
        int left = 1;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            // 小于等于 mid 的元素的个数
            int count = 0;
            for (int num : nums) {
                if (num <= mid) {
                    count++;
                }
            }
            if (count > mid) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else {
                // count <= mid，有可能在 [left..mid] 存在重复元素
                // 下一轮搜索区间是 [mid + 1..right]
                // 整数区间 [mid + 1..right] 有 right - mid 个整数
                // 整数区间 [mid + 1..right] 有 len - count >= right + 1 - mid 个元素
                left = mid + 1;
            }
        }
        return left;
    }
}
```

@tab java

```java
class Solution {
    
    public int findDuplicate(int[] nums) {
        int len = nums.length; // len = n + 1
        
        int left = 1;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            
            // 小于等于 mid 的元素个数
            int count = 0;
            for (int num : nums) {
                if (num <= mid) {
                    count++;
                }
            }
            
            if (count > mid) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else {
                // count <= mid, -count >= - mid
                // 整数区间 [mid + 1..right] 里有 len - count >= right + 1 - count >= right + 1 - mid
                // right - mid 个抽屉，right + 1 - mid 个苹果
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```

@tab java

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int len = nums.length; // n + 1 = len
        int left = 1;
        int right = len - 1;
        // 在 [left..right] 中一定有一个重复的整数
        while (left < right) {
            int mid = (left + right) / 2;
            // nums 里小于等于 mid 的元素的个数
            int count = 0;
            for (int num: nums) {
                if (num <= mid) {
                    count++;
                }
            }
            if (count > mid) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else {
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```

@tab java

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int len = nums.length; // len = n + 1
        int left = 1;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            int count = 0;
            for (int num: nums) {
                if (num <= mid) {
                    count++;
                }
            }
            if (count > mid) {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            } else {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```

::: 