---
title: 「力扣」第 26 题：删除排序数组中的重复项
isOriginal: true
date: 2017-06-02 08:00:00
author: liweiwei1419
category: 循环不变量
tag:
  - 数组
  - 循环不变量
---

# 「力扣」第 26 题：删除排序数组中的重复项（简单）

* 题目链接：https://leetcode-cn.com/problems/move-zeroes

**参考代码 1**：

```java
public class Solution {

    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }
      
        // 循环不变量：nums[0..j）是移除重复元素以后的数组
        int j = 1;
        for (int i = 1; i < len; i++) {
            if (nums[i] != nums[j - 1]) {
                // 注意顺序：先更新值，再递增下标
                nums[j] = nums[i];
                j++;
            }
        }
        return j;
    }
}
````
**参考代码 2**：
```java
public class Solution {

    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }
      
        // 循环不变量：nums[0..j] 是移除重复元素以后的数组
        int j = 0;
        for (int i = 1; i < len; i++) {
            if (nums[i] != nums[j]) {
                j++;
                nums[j] = nums[i];
            }
        }
        return j + 1;
    }
}
````

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$，只使用了常数个变量。