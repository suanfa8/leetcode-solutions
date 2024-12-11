---
title: 「力扣」第 374 题：猜数字大小（简单）
icon: laptop-code
---


Java 代码：

::: tabs

@tab 错误代码
```java
public class Solution extends GuessGame {
    
    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left <= right) {
            int mid = (left + right) / 2;
            int guessNum = guess(mid);
            if (guessNum == 0) {
                return mid;
            } else if (guessNum == -1) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
    
}
```

@tab 正确代码

```java
public class Solution extends GuessGame {
    
    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int guessNum = guess(mid);
            if (guessNum == 0) {
                return mid;
            } else if (guessNum == -1) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
    
}
```

@tab java

```java
public class Solution extends GuessGame {
    
    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left <= right) {
            int mid = (left + right) >>> 1;
            if (guess(mid) == 0) {
                return mid;
            } else if (guess(mid) == -1) {
                // 答案 < 你猜的数字，下一轮搜索区间 [left.. mid - 1]
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
    
}
```

@tab java

```java
public class Solution extends GuessGame {
    
    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            int mid = (left + right + 1) >>> 1;
            if (guess(mid) == -1) {
                // 答案 < 你猜的数字，下一轮搜索区间 [left.. mid - 1]
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return left;
    }
    
}
```

@tab java

```java
public class Solution extends GuessGame {
    
    public int guessNumber(int n) {
        int left = 1;
        int right = n;
        while (left < right) {
            int mid = (left + right) >>> 1;
            if (guess(mid) == 1) {
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


Python 代码：

::: tabs

@tab python

```python
```

@tab python

```python
```
::: 