---
title: 「力扣」第 278 题：第一个错误的版本（简单）
icon: laptop-code
---

Java 代码：

::: tabs

@tab java

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int left = 1;
        int right = n;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
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
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */
public class Solution extends VersionControl {
    
    // 什么是第一个错误的版本？
    // 如果 isBadVersion(version) = true，它有可能是第 1 个错误的版本
    // 1. 如果 version 的前面没有错误的版本，那么 version 就一定是第 1 个错误的版本
    // 2. 如果 version 的前面有错误的版本，那么 version 就一定不是第 1 个错误的版本
    // 一定可以确定的是，比 version 大的元素，一定不是第 1 个错误的版本
    
    public int firstBadVersion(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            // 超时
            int mid = (left + right) / 2;
            if (isBadVersion(mid)) {
                // 下一轮搜索的区间是 [left..mid]
                right = mid;
            } else {
                // 下一轮搜索的区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```

@tab java

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */
public class Solution extends VersionControl {
    
    public int firstBadVersion(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                // 下一轮搜索的区间是 [left..mid]
                right = mid;
            } else {
                // 下一轮搜索的区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```


@tab java

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */
public class Solution extends VersionControl {
    
    public int firstBadVersion(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            int mid = (left + right) >>> 1;
            if (isBadVersion(mid)) {
                // 下一轮搜索的区间是 [left..mid]
                right = mid;
            } else {
                // 下一轮搜索的区间是 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }
}
```

::: 