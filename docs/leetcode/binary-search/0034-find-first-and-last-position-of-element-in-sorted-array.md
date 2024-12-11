---
title: 「力扣」第 34 题：在排序数组中查找元素的第一个和最后一个位置（中等）
icon: laptop-code
---

::: tabs

@tab java

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return new int[]{-1, -1};
        }
        int firstPosition = findFirstPosition(nums, target);
        if (firstPosition == -1) {
            return new int[]{-1, -1};
        }
        int lastPosition = findLastPosition(nums, target);
        return new int[]{firstPosition, lastPosition};
    }
    private int findFirstPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                // 下一轮搜索的区间 nums[mid + 1..right]
                left = mid + 1;
            } else {
                // nums[mid] >= target
                // 下一轮搜索的区间 nums[left..mid]
                right = mid;
            }
        }
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }
    private int findLastPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (nums[mid] <= target) {
                // 下一轮搜索的区间 nums[mid..right]
                left = mid;
            } else {
                // nums[mid] > target
                // 下一轮搜索的区间 nums[left..mid - 1]
                right = mid - 1;
            }
        }
        return left;
    }
}
```

:::