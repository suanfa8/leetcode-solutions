---
title: 「力扣」第 4 题：寻找两个正序数组的中位数 （困难）
icon: laptop-code
---



Java 代码：

::: tabs

@tab java

```java
class Solution {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.length;
        int len2 = nums2.length;
        if (len1 > len2) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        len1 = nums1.length;
        len2 = nums2.length;

        int leftCount = (len1 + len2) / 2;

        // 保证 nums1 的长度较短，在较短的数组上查找分界线
        // 分界线需要满足的条件：
        // 数组 1 分界线左边的数小于等于数组 2 分界线右边的数
        // 「并且」数组 2 分界线左边的数小于等于数组 1 分界线右边的数
        // 分割线左边的数个数为 (len1 + len2 + 1) / 2

        // 定义分割线左边的元素个数
        int left = 0;
        int right = len1;

        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (nums1[mid - 1] > nums2[leftCount - mid]) {
                // 下一轮搜索区间 [left..mid - 1]
                right = mid - 1; 
            } else {
                // 下一轮搜索区间 [mid..right]
                left = mid;
            }
        }


        // 特殊情况讨论

        int i = left;
        int j = leftCount - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];

        if (((len1 + len2) % 2) == 1) {
            return Math.min(nums1RightMin, nums2RightMin);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
```

@tab java

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int len1 = nums1.length;
        int len2 = nums2.length;

        // 左边少 1 个数
        int leftTotal = (len1 + len2) / 2;
        int left = 0;
        int right = len1;

        // nums1[i - 1] <= nums2[j] && nums1[j - 1] <= nums2[i]
        while (left < right) {
            int i = (left + right + 1) / 2;
            int j = leftTotal - i;
            if (nums1[i - 1] > nums2[j]) {
                right = i - 1;
            } else {
                left = i;
            }
        }

        int i = left;
        int j = leftTotal - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
        int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];
        if ((len1 + len2) % 2 == 1) {
            return Math.min(nums1RightMin, nums2RightMin);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
```

::: tabs

@tab 让分割线左边多一个元素

```java
class Solution {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.length;
        int len2 = nums2.length;
        if (len1 > len2) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }

        len1 = nums1.length;
        len2 = nums2.length;

        int leftCount = (len1 + len2 + 1) / 2;

        // 保证 nums1 的长度较短，在较短的数组上查找分界线
        // 分界线需要满足的条件：
        // 数组 1 分界线左边的数小于等于数组 2 分界线右边的数
        // 「并且」数组 2 分界线左边的数小于等于数组 1 分界线右边的数
        // 分割线左边的数个数为 (len1 + len2 + 1) / 2

        // 定义分割线左边的元素个数
        int left = 0;
        int right = len1;

        while (left < right) {
            int mid = (left + right + 1) / 2;
            if (nums1[mid - 1] > nums2[leftCount - mid]) {
                // 下一轮搜索区间 [left..mid - 1]
                right = mid - 1; 
            } else {
                // 下一轮搜索区间 [mid..right]
                left = mid;
            }
        }


        // 特殊情况讨论

        int i = left;
        int j = leftCount - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];

        if (((len1 + len2) % 2) == 1) {
            return Math.max(nums1LeftMax, nums2LeftMax);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
```

@tab java

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int len1 = nums1.length;
        int len2 = nums2.length;

        // 改这里，左边多 1 个数
        int leftTotal = (len1 + len2 + 1) / 2;
        int left = 0;
        int right = len1;

        // nums1[i - 1] <= nums2[j] && nums1[j - 1] <= nums2[i]
        while (left < right) {
            int i = (left + right + 1) / 2;
            int j = leftTotal - i;
            if (nums1[i - 1] > nums2[j]) {
                right = i - 1;
            } else {
                left = i;
            }
        }

        int i = left;
        int j = leftTotal - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
        int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];
        if ((len1 + len2) % 2 == 1) {
            // 改这里
            return Math.max(nums1LeftMax, nums2LeftMax);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
```


::: tabs

@tab java

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int len1 = nums1.length;
        int len2 = nums2.length;

        // 左边少 1 个数
        int leftTotal = (len1 + len2) / 2;
        int left = 0;
        int right = len1;

        // nums1[i - 1] <= nums2[j] && nums2[j - 1] <= nums1[i]
        while (left < right) {
            int i = (left + right) / 2;
            int j = leftTotal - i;
            if (nums2[j - 1] > nums1[i]) {
                left = i + 1;
            } else {
                right = i;
            }
        }

        int i = left;
        int j = leftTotal - i;

        int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
        int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];
        if ((len1 + len2) % 2 == 1) {
            return Math.min(nums1RightMin, nums2RightMin);
        } else {
            return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
        }
    }
}
```

@tab java

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int len1 = nums1.length;
        int len2 = nums2.length;

        // 左边少 1 个数
        int leftTotal = (len1 + len2) / 2;
        int left = 0;
        int right = len1;

        // nums1[i - 1] <= nums2[j] && nums2[j - 1] <= nums1[i]
        while (left <= right) {
            int i = (left + right) / 2;
            int j = leftTotal - i;
            int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
            int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
            int nums1RightMin = i == len1 ? Integer.MAX_VALUE : nums1[i];
            int nums2RightMin = j == len2 ? Integer.MAX_VALUE : nums2[j];

            if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
                if ((len1 + len2) % 2 == 1) {
                    return Math.min(nums1RightMin, nums2RightMin);
                } else {
                    return (double) ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin))) / 2;
                }
            } else if (nums1LeftMax > nums2RightMin){
                right = i - 1;
            } else {
                left = i + 1;
            }
        }
        return -1;
    }
}
```

::: 