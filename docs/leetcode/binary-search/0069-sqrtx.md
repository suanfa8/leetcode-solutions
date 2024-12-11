---
title: 「力扣」第 69 题：x 的平方根（简单）
icon: laptop-code
---

## 彩排代码

::: tabs#code

@tab java

```java
/**
 * @author liwei
 * @date 2019/6/25 7:44 PM
 */
public class Solution4 {

    public int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }
        // 注意：针对特殊测试用例，例如 2147395599
        // 要把搜索的范围设置成长整型
        long left = 1;
        long right = x / 2;
        while (left < right) {
            // 注意：这里一定取右中位数，如果取左中位数，代码会进入死循环
            // long mid = left + (right - left + 1) / 2;
            long mid = (left + right + 1) >>> 1;
            long square = mid * mid;
            if (square > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        // 因为一定存在，因此无需后处理
        return (int) left;
    }
}
```

@tab java

```java
/**
 * @author liwei
 * @date 2019/6/25 7:44 PM
 */
public class Solution {

    public int mySqrt(int x) {
        // 注意：针对特殊测试用例，例如 2147395599
        // 要把搜索的范围设置成长整型
        // 为了照顾到 0 把左边界设置为 0
        long left = 0;
        // # 为了照顾到 1 把右边界设置为 x // 2 + 1
        long right = x / 2 + 1;
        while (left < right) {
            // 注意：这里一定取右中位数，如果取左中位数，代码会进入死循环
            // long mid = left + (right - left + 1) / 2;
            long mid = (left + right + 1) >>> 1;
            long square = mid * mid;
            if (square > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        // 因为一定存在，因此无需后处理
        return (int) left;
    }
}
```


@tab java

```java
public class Solution {

    public int mySqrt(int x) {
        long left = 0;
        // 为了照顾到 1 ，把右边界加 1 ，或者对 1 单独判断
        long right = x / 2 + 1;

        while (left < right) {
            long mid = (left + right + 1) >>> 1;
            if (mid * mid > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return (int) left;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.mySqrt(2147395599));
        int max = 2147395599;
        for (int i = 0; i < max; i++) {
            int mySqrt = solution.mySqrt(i);
            int sysSqrt = (int) Math.sqrt(i);
            if (mySqrt != sysSqrt) {
                System.out.println(i);
                break;
            }
        }
    }
}
```

@tab java

```java
/**
 * @author liweiwei1419
 * @date 2019/9/19 3:40 下午
 */
public class Solution8 {

    public int mySqrt(int x) {
        long left = 0;
        long right = x;
        while (left < right) {
            long mid = (left + right + 1) >>> 1;
            if (mid * mid > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return (int) left;
    }
}
```

@tab java

```java
/**
 * @author liwei
 * @date 2019/6/25 7:44 PM
 */
public class Solution {

    public int mySqrt(int x) {
        long left = 0;
        long right = Integer.MAX_VALUE;
        while (left < right) {
            // 这种取中位数的方法又快又好，是我刚学会的，原因在下面这篇文章的评论区
            // https://www.liwei.party/2019/06/17/leetcode-solution-new/search-insert-position/
            // 注意：这里得用无符号右移
            long mid = (left + right + 1) >>> 1;
            long square = mid * mid;
            if (square > x) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return (int) left;
    }
}
```

@tab java

```java
/**
 * @author liwei
 * @date 2019/7/23 1:36 AM
 */
public class Solution {

    public int mySqrt(int target) {
        if (target == 0) {
            return 0;
        }
        int left = 1;
        // 对于一个非负数 n ，它的平方根不会大于（n/2+1）
        int right = target / 2 + 1;
        // 如果用左边界，则还需要在最后判断返回left还是left-1
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mid < target / mid) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        if (left > target / left) {
            return left - 1;
        }
        return left;
    }
}
```

:::


Python 代码：

::: tabs#code
@tab python

```python
class Solution:

    # 二分法
    def mySqrt(self, x: int) -> int:
        # 为了照顾到 0 把左边界设置为 0
        left = 0
        # 为了照顾到 1 把右边界设置为 x // 2 + 1
        right = x // 2 + 1
        while left <= right:
            # mid = left + (right - left) // 2
            mid = (left + right) >> 1
            square = mid * mid
            if square == x:
                return mid
            elif square < x:
                left = mid + 1
            else:
                right = mid - 1
        # 注意返回 left 和返回 right 的区别，应该返回 right
        # 【因为返回的是不超过，所要把右边界返回回去】
        return right

if __name__ == '__main__':
    x = 8
    solution = Solution()
    result = solution.mySqrt(x)
    print(result)
```

@tab python

```python
class Solution:

    # 二分法
    def mySqrt(self, x: int) -> int:
        if x == 1:
            return 1
        left = 0
        right = x // 2
        while left <= right:
            mid = left + (right - left) // 2
            square = mid * mid
            if square == x:
                return mid
            elif square < x:
                left = mid + 1
            else:
                right = mid - 1
        return right
```

@tab python

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0

        left = 1
        right = x // 2

        while left < right:
            # 注意：这里一定取右中位数，如果取左中位数，代码可能会进入死循环
            # mid = left + (right - left + 1) // 2
            mid = (left + right + 1) >> 1
            square = mid * mid

            if square > x:
                right = mid - 1
            else:
                left = mid
        # 因为一定存在，因此无需后处理
        return left
```

@tab python

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        # 为了照顾到 0 把左边界设置为 0
        left = 0
        # 为了照顾到 1 把右边界设置为 x // 2 + 1
        right = x // 2 + 1
        while left < right:
            # 注意：这里一定取右中位数，如果取左中位数，代码可能会进入死循环
            # mid = left + (right - left + 1) // 2
            mid = (left + right + 1) >> 1
            square = mid * mid

            if square > x:
                right = mid - 1
            else:
                left = mid
        # 因为一定存在，因此无需后处理
        return left
```

@tab python

```python
class Solution:

    # 二分法
    def mySqrt(self, x: int) -> int:
        left = 0
        right = 999999
        while left < right:
            mid = (left + right + 1) >> 1
            square = mid * mid
            if square > x:
                right = mid - 1
            else:
                left = mid

        return left
```

@tab python

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        
        l = 0
        r = x // 2 + 1
        while l < r:
            mid = l + (r - l + 1) // 2
            square = mid * mid
            
            if square > x:
                r = mid - 1
            else:
                l = mid
        return l
```

@tab python

```python
class Solution:
    # 二分法
    def mySqrt(self, x):
        """
        :type x: int
        :rtype: int
        """
        l = 0
        r = x // 2 + 1
        while l <= r:
            m = l + (r - l) // 2
            s = m * m
            if s == x:
                return m
            elif s < x:
                l = m + 1
            else:
                r = m - 1
        # 注意返回 l 和返回 r 的区别，应该返回 r
        # 【因为返回的是不超过，所要把右边界返回回去】
        return r
```

@tab python

```python
class Solution:
    # 二分法
    def mySqrt(self, x):
        """
        :type x: int
        :rtype: int
        """
        if x == 1:
            return 1
        l = 0
        r = x // 2
        while l <= r:
            m = l + (r - l) // 2
            s = m * m
            if s == x:
                return m
            elif s < x:
                l = m + 1
            else:
                r = m - 1
        return r
```

::: 