---
title: 「力扣」第 633 题：平方数之和（中等）
icon: laptop-code
---

## 方法一：二分查找

* 特点：mid 如果是，它的左边和右边都不会存在最优解，mid 自己可以单独成为一类。
* 说明：num % mid == 0 如果不写的话，num = 5 就不对了。

Java 代码：

::: tabs

@tab java

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        if (num < 2) {
            return true;
        }
        int left = 1;
        int right = num / 2;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (num % mid == 0 && num / mid == mid) {
                return true;
            } else if (num / mid > mid) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}
```

@tab java

```java
public class Solution {

    public boolean judgeSquareSum(int c) {
        if (c == 0 || c == 1 || c == 2) {
            return true;
        }

        for (long a = 0; a * a <= c; a++) {
            long bSquare = c - a * a;
            long left = 0;
            long right = bSquare;
            while (left <= right) {
                long mid = (left + right) / 2;
                if (mid * mid == bSquare) {
                    return true;
                } else if (mid * mid < bSquare) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
}
```

@tab java

```java
public class Solution {

    public boolean judgeSquareSum(int c) {
        if (c == 0 || c == 1) {
            return true;
        }

        for (long a = 0; a * a <= c; a++) {
            long bSquare = c - a * a;
            long left = 0;
            long right = bSquare;

            while (left <= right) {
                long mid = left + (right - left) / 2;
                if (mid * mid == bSquare) {
                    return true;
                } else if (mid * mid < bSquare) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
}
```

::: 


## 方法二：双指针

Java 代码：

::: tabs

@tab java

```java
public class Solution {

    public boolean judgeSquareSum(int c) {
        if (c == 0 || c == 1 || c == 2) {
            return true;
        }

        int left = 0;
        int right = (int) Math.sqrt(c);

        while (left <= right) {
            int diff = left * left + right * right - c;
            if (diff == 0) {
                return true;
            } else if (diff > 0) {
                right--;
            } else {
                left++;
            }
        }
        return false;
    }
}
```

::: 


## 方法三：数学方法（省略）

