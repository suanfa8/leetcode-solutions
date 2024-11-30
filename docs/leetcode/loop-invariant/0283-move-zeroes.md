# 「力扣」第 283 题：移动零（简单）

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意** ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```
输入: nums = [0]
输出: [0]
```

**提示**:

- `1 <= nums.length <= 10^4`
- $-2^{31} \le nums[i] \le 2^{31} - 1$

**进阶：**你能尽量减少完成的操作次数吗？

**参考代码 1**：

```java
public class Solution {

    public void moveZeroes(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
      
        // 循环不变量：nums[0..j) !=0, nums[j..i) = 0
        // j 指向了下一个要赋值的元素的位置
        int j = 0;
        for (int i = 0; i < len; i++) {
            if (nums[i] != 0) {
                nums[j] = nums[i];
                j++;
            }
        }

        for (int i = j; i < len; i++) {
            nums[i] = 0;
        }
    }
}
````
**参考代码 2**：

```java
public class Solution {

    public void moveZeroes(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
      
        // 循环不变量：nums[0..j] != 0，nums(j..i) == 0
        int j = -1;
        for (int i = 0; i < len; i++) {
            if (nums[i] != 0) {
                j++;
                swap(nums, j, i);
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
````

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$，只使用了常数个变量。