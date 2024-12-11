---
title: 「力扣」第 875 题：爱吃香蕉的珂珂（中等）
icon: laptop-code
---


Java 代码：

::: tabs

@tab java

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int maxVal = 0;
        for (int p : piles) {
            maxVal = Math.max(maxVal, p);
        }

        int left = 1;
        int right = maxVal;
        while (left < right) {
            int mid = (left + right) / 2;
            int count = cal(piles, mid);
            if (count == h) {
                right = mid;
            } else if (count < h) {
                // 注意：这里的分析
                right = mid;
            } else {
                left = mid + 1;
            }

        }
        return left;
    }

    private int cal(int[] piles, int speed) {
        int count = 0;
        for (int p : piles) {
            if (p % speed == 0) {
                count += p / speed;
            } else {
                count += (p / speed + 1);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {

    public int minEatingSpeed(int[] piles, int h) {
        int len = piles.length;

        int maxValue = 1;
        for (int pile : piles) {
            maxValue = Math.max(maxValue , pile);
        }

        int left = 1;
        int right = maxValue;

        while (left < right) {
            int mid = (left + right) / 2;
            int hours = calculateHours(piles, mid);

            if (hours < h) {
                // mid 满足条件的，> mid ，下一轮搜索区间 [mid..right]
                right = mid;
            } else if (hours == h) {
                right = mid;
            } else {
                // hours > h，下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            }
        }
        return left;
    }

    private int calculateHours(int[] piles, int maxValue) {
        int hours = 0;
        for (int pile : piles) {
            if (pile % maxValue == 0) {
                hours += (pile / maxValue);
            } else {
                 hours += (pile / maxValue + 1);
            }
        }
        return hours;
    }
}
```

@tab java

```java
import java.util.Arrays;

public class Solution {

    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = Arrays.stream(piles).max().getAsInt();

        while (left < right) {
            int mid = (left + right) / 2;

            int hours = 0;
            for (int pile: piles) {
                if (pile % mid == 0) {
                    hours += (pile / mid);
                } else {
                    hours += (pile / mid) + 1;
                }
            }

            if (hours > h) {
                // 说明吃得慢了
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