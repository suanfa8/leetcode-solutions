---
title: 「力扣」第 611 题：有效三角形的个数（中等）
icon: laptop-code
---


Java 代码：

::: tabs


@tab 排序以后找大于等于前两边之和的最小值

```java
class Solution {

    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        // [6,7,8,9,17,18]
        //  _ _     ^ 大于等于前两边之和的最小值

        int len = nums.length;
        int count = 0;
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];

                if (nums[len - 1] < sum) {
                    // [j + 1..len - 1]
                    count += (len - j - 1);
                    continue;
                }

                int left = j + 1;
                int right = len - 1;

                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < sum) {
                        // 下一轮搜索区间 [mid + 1..right]
                        left = mid + 1;
                    } else {
                        // 下一轮搜索区间 [left..mid]
                        right = mid;
                    }
                }
                // [j + 1..left - 1]
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

@tab 排序以后找严格小于前两边之和的最大值

```java
class Solution {

    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        // [6,7,8,9,17,18]
        //  _ _   ^   严格小于前两边之和的最大值

        int len = nums.length;
        int count = 0;
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];

                if (nums[j + 1] >= sum) {
                    continue;
                }

                int left = j + 1;
                int right = len - 1;

                while (left < right) {
                    int mid = (left + right + 1) / 2;
                    if (nums[mid] >= sum) {
                        // 下一轮搜索区间 [left..mid - 1]
                        right = mid - 1;
                    } else {
                        // 下一轮搜索区间 [mid..right]
                        left = mid;
                    }
                }
                // [j + 1..left] = (j..left]
                count += (left - j);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {

    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);

        int len = nums.length;
        int count = 0;
        // 找严格小于前两条边之和的最大整数
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];

                // 最短的边都大于等于 sum，说明不存在
                if (nums[j + 1] >= sum) {
                    continue;
                }

                int left = j + 1;
                int right = len - 1;
                while (left < right) {
                    int mid = (left + right + 1) / 2;
                    if (nums[mid] >= sum) {
                        // 下一轮搜索区间 [left..mid - 1]
                        right = mid - 1;
                    } else {
                        // 下一轮搜索区间 [mid..right]
                        left = mid;
                    }
                }
                // nums[j + 1..left] = nums(j..left]
                count += (left - j);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {

    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);

        int len = nums.length;
        int count = 0;
        // 找大于等于前两条边之和的最小整数
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];

                if (nums[len - 1] < sum) {
                    count += (len - j - 1);
                    continue;
                }

                int left = j + 1;
                int right = len - 1;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < sum) {
                        // 下一轮搜索区间 [mid + 1..right]
                        left = mid + 1;
                    } else {
                        // 下一轮搜索区间 [left..mid]
                        right = mid;
                    }
                }
                // nums[j + 1..left - 1] 的长度 left - 1 - (j + 1) + 1
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        // 找大于等于前两条边之和的最小整数
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];
                int left = j + 1;
                int right = len;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < sum) {
                        // 下一轮搜索区间 [mid + 1..right]
                        left = mid + 1;
                    } else {
                        // 下一轮搜索区间 [left..mid]
                        right = mid;
                    }
                }
                // nums[j + 1..left - 1] 的长度 left - 1 - (j + 1) + 1
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        // 枚举第一条边和第二条边，找到大于等于前两边之和的最小整数
        for (int i = 0; i < len - 2; i++) {
            for (int j = i + 1; j < len - 1; j++) {
                int left = j + 1;
                int right = len;
                int sum = nums[i] + nums[j];
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < sum) {
                        // 下一轮搜索区间 [mid + 1..right] 
                        left = mid + 1;
                    } else {
                        // 下一轮搜索区间 [left..mid] 
                        right = mid;
                    }
                }
                // nums[j + 1..left) 满足题意
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```


@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        // 枚举第一条边和第二条边，找到严格小于前两条边之和的最大整数
        for (int i = 0; i < len - 2; i++) {
            for (int j = i + 1; j < len - 1; j++) {
                int left = j + 1;
                int right = len - 1;
                int sum = nums[i] + nums[j];
                while (left < right) {
                    int mid = (left + right + 1) / 2;
                    if (nums[mid] >= sum) {
                        // 下一轮搜索区间 [left..mid - 1] 
                        right = mid - 1;
                    } else {
                        left = mid;
                    }
                }
                if (nums[left] < sum) {
                    // 区间 [j + 1..left] 符合条件
                    count += (left - j);
                }
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        for (int i = 0; i < len - 2; i++) {
            for (int j = i + 1; j < len - 1; j++) {
                // 找第 1 个大于等于 nums[i] + nums[j] 的元素的下标
                int left = j + 1;
                int right = len;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < nums[i] + nums[j]) {
                        // 下一轮在 nums[mid + 1..right] 区间里查找
                        left = mid + 1;
                    } else {
                        // 下一轮在 nums[left..mid] 区间里查找
                        right = mid;
                    }
                }
                // left 与 right 重合
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        for (int i = 0; i < len - 2; i++) {
            for (int j = i + 1; j < len - 1; j++) {
                // 找最后一个严格小于 nums[i] + nums[j] 的元素的下标
                int left = j + 1;
                int right = len - 1;
                while (left < right) {
                    int mid = (left + right + 1) / 2;
                    if (nums[mid] >= nums[i] + nums[j]) {
                        // 下一轮在 nums[left..mid - 1] 区间里查找
                        right = mid - 1;
                    } else {
                        // 下一轮在 nums[mid..right] 区间里查找
                        left = mid;
                    }
                }
                // left 与 right 重合
                if (nums[left] < nums[i] + nums[j]) {
                    count += (left - j);
                }
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        // 找严格小于前两条边之和的最大整数
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];
                // 最短的边都大于等于 sum，说明不存在
                if (nums[j + 1] >= sum) {
                    continue;
                }
                int left = j + 1;
                int right = len - 1;
                while (left < right) {
                    int mid = (left + right + 1) / 2;
                    if (nums[mid] >= sum) {
                        // 下一轮搜索区间 [left..mid - 1]
                        right = mid - 1;
                    } else {
                        // 下一轮搜索区间 [mid..right]
                        left = mid;
                    }
                }
                // nums[j + 1..left] = nums(j..left]
                count += (left - j);
            }
        }
        return count;
    }
}
```

@tab java

```java
class Solution {
    public int triangleNumber(int[] nums) {
        Arrays.sort(nums);
        int len = nums.length;
        int count = 0;
        // 找大于等于前两条边之和的最小整数
        for (int i = 0; i < len - 2; i++) {
            if (nums[i] == 0) {
                continue;
            }
            for (int j = i + 1; j < len - 1; j++) {
                int sum = nums[i] + nums[j];
                if (nums[len - 1] < sum) {
                    count += (len - j - 1);
                    continue;
                }
                int left = j + 1;
                int right = len - 1;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (nums[mid] < sum) {
                        // 下一轮搜索区间 [mid + 1..right]
                        left = mid + 1;
                    } else {
                        // 下一轮搜索区间 [left..mid]
                        right = mid;
                    }
                }
                // nums[j + 1..left - 1] 的长度 left - 1 - (j + 1) + 1
                count += (left - j - 1);
            }
        }
        return count;
    }
}
```

::: 