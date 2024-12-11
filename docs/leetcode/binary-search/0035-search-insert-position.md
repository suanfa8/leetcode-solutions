---
title: 「力扣」第 35 题：搜索插入位置（简单）
icon: laptop-code
---


Java 代码：

练习的时候写出的代码：

::: tabs

@tab java

```java
public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        if (nums[len - 1] < target) {
            return len;
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 当 nums[mid] 严格小于目标元素时，不是解
            if (nums[mid] < target) {
                // 下一轮搜索的区间 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

@tab java

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        // 找出第一个大于等于 target 的下标
        int len = nums.length;
        if (nums[len - 1] < target) {
            return len;
        }

        // 在 nums[left..right] 找出第一个大于等于 target 的下标
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                // 下一轮搜索的区间就是 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索的区间就是 [left..mid]
                // nums[mid] >= target
                right = mid;
            }
        }
        return left;
    }
}
```

@tab java

```java
public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        if (nums[len - 1] < target) {
            return len;
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
}
```

::: 