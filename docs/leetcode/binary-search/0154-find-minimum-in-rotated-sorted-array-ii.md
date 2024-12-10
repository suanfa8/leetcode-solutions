---
title: 「力扣」第 154 题：寻找旋转排序数组中的最小值 II（困难）
icon: laptop-code
---

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次 **旋转** 后，得到输入数组。例如，原数组 `nums = [0,1,4,4,5,6,7]` 在变化后可能得到：

- 若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,4]`
- 若旋转 `7` 次，则可以得到 `[0,1,4,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` **旋转一次** 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

给你一个可能存在 **重复** 元素值的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。

你必须尽可能减少整个过程的操作步骤。



**示例 1：**

```plain
输入：nums = [1,3,5]
输出：1
```

**示例 2：**

```plain
输入：nums = [2,2,2,0,1]
输出：0
```



**提示：**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转



**进阶：**这道题与 [寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/description/) 类似，但 `nums` 可能包含重复元素。允许重复会影响算法的时间复杂度吗？会如何影响，为什么？

## 彩排代码

::: tabs#code

@tab java

```java
class Solution {

    public int minArray(int[] numbers) {
        int len = numbers.length;
        if (len == 1) {
            return numbers[0];
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right--;
            } else {
                left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
public class Solution {

    public int minArray(int[] numbers) {
        int left = 0;
        int right = numbers.length - 1;
    
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (numbers[mid] < numbers[right]) {
                right = mid;
            } else if (numbers[mid] > numbers[right]) {
                // 以 [3, 4, 5, 1, 3] 为例，mid 肯定不是最小值
                // 最小值只可能存在于 [mid + 1..right] 这个区间里
                // 于是将 left 向左收缩到 mid + 1
                left = mid + 1;
            } else {
                // numbers[mid] == numbers[right]
                // [3,3,3,1,3]
                // [3,1,3,1,3] 最小值可能在前，也可能在后
                // 只能把 right 这个位置排除掉
                right--;
            }
        }
        // 因为把大于的数都排除了，最后剩下的那个数一定就是要找的数，不必再判断
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {

    public int minArray(int[] numbers) {
        int len = numbers.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right = right - 1;
            } else {
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {
    public int minArray(int[] numbers) {
        int len = numbers.length;
        if (len == 1) {
            return numbers[0];
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else if (numbers[mid] == numbers[right]){
                right = right - 1;
            } else {
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        // 退出循环以后 left 与 right 重合
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {

    public int minArray(int[] numbers) {
        int len = numbers.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间是 [left..mid]
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right = right - 1;
            } else {
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {
    public int minArray(int[] numbers) {
        int len = numbers.length;

        int left = 0;
        int right = len - 1;
    
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                right = mid; 
            } else if (numbers[mid] == numbers[right]) {
                right--;
            } else {
                left = mid + 1;
                // 这里不能乱写
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {

    public int minArray(int[] numbers) {
        int len = numbers.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right--;
            } else {
                // numbers[mid] > numbers[right]
                left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {

    public int minArray(int[] numbers) {
        int len = numbers.length;
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right--;
            } else {
               //  numbers[mid] > numbers[right]
               left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {
    public int minArray(int[] numbers) {
        int len = numbers.length;
        if (len == 1) {
            return numbers[0];
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            } else if (numbers[mid] == numbers[right]) {
                right--;
            } else {
                left = mid + 1;
            }
        }
        return numbers[left];
    }
}
```

@tab java

```java
class Solution {
    public int minArray(int[] numbers) {
        int len = numbers.length;
        if (len == 1) {
            return numbers[0];
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (numbers[mid] < numbers[right]) {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            } else if (numbers[mid] > numbers[right]) {
                left = mid + 1;
            } else {
                right--;
            }
        }
        return numbers[left];
    }
}
```

:::