---
title: 「力扣」第 704 题：二分查找（简单）
icon: laptop-code
---

Java 代码：

::: tabs

@tab java

```java
class Solution {
    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 在 nums[left..right] 查找 target 的下标
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                // 在 nums[mid + 1..right] 查找 target 的下标 
                left = mid + 1;
            } else {
                // nums[mid] > target
                // 在 nums[left..mid - 1] 查找 target 的下标
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid - 1]
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;

        int left = 0;
        int right = len - 1;
        // 在 nums[left..right] 左闭右闭区间里查找目标元素
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                // nums[mid] > target
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int left = Integer.MAX_VALUE - 8;
        int right = Integer.MAX_VALUE - 2;
        // 输出 -6
        System.out.println((left + right) / 2);
        // 输出 2147483642
        System.out.println(left + (right - left) / 2);
        // 输出 2147483642
        System.out.println((left + right) >>> 1);
    }
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;

        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            }
        }
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (nums[mid] > target) {
                // 下一轮搜索区间是 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间是 [mid..right]
                left = mid;
            }
        }
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;

        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left < right) {
            int mid = (left + right) / 2;
            if (判别条件) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            }
        }
        // 退出循环以后 left == right 成立
        // 视情况判断 nums[left] 是否是我们要找的
    }
    
}
```

@tab java

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (判别条件) {
                // 下一轮搜索区间是 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间是 [mid..right]
                left = mid;
            }
        }
        // 退出循环以后 left == right 成立
        // 视情况判断 nums[left] 是否是我们要找的
    }
}
```

@tab 垃圾模板

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;
        // 目标元素可能存在在区间 [left..right]
        while (left + 1 < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid;
            } else {
                right = mid;
            }
        }

        if (nums[left] == target) {
            return left;
        }
        if (nums[right] == target) {
            return right;
        }
        return -1;
    }
}
```


@tab 递归

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        return binarySearch(nums, 0, len - 1, target);
    }

    private int binarySearch(int[] nums, int left, int right, int target) {
        if (left > right) {
            return -1;
        }
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            return binarySearch(nums, mid + 1, right, target);
        } else {
            return binarySearch(nums, left, mid - 1, target);
        }
    }
}
```

::: 