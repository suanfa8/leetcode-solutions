---
title: 「力扣」第 905 题：按奇偶排序数组（简单）
icon: laptop-code
---


Java 代码：

::: tabs

@tab 第 1 版 partition 代码

```java
class Solution {

    public int[] sortArrayByParity(int[] nums) {
        int len = nums.length;
        
        // nums[0..j] 偶数
        // nums(j..i) 奇数
        int j = -1;
        for (int i = 0; i < len; i++) {
            if ((nums[i] % 2) == 0 ) {
                j++;
                swap(nums, i, j);
            }
        }
        return nums;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

@tab 第 2 版 partition 代码

```java
class Solution {

    public int[] sortArrayByParity(int[] nums) {
        int len = nums.length;
        
        // nums[0..even) 偶数
        // nums(odd..right] 奇数
        int even = 0;
        int odd = len - 1;

        while (true) {
            while (even <= odd && (nums[even] % 2) == 0) {
                even++;
            }

            while (even <= odd && (nums[odd] % 2) == 1) {
                odd--;
            }

            if (even >= odd) {
                break;
            }

            swap(nums, even, odd);
            even++;
            odd--;
        }
        return nums;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

::: 