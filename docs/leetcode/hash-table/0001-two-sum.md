# 「力扣」第 1 题：两数之和（简单）

* 题目链接：https://leetcode.cn/problems/two-sum/

## 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**

- $2 \le nums.length \le 10^4$
- $-10^9 \le nums[i] \le 10^9$
- $-10^9 \le target \le 10^9$

- **只会存在一个有效答案**

**进阶：**你可以想出一个时间复杂度小于 $O(n^2)$ 的算法吗？


## 思路分析

## 方法一：暴力解法

**参考代码 1**：

Java 代码：

```java
public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
      	// throw new IllegalArgumentException("没有找到和为 target 的两个数。");
        return new int[0];
    }
  
}
```

**复杂度分析**：

- 时间复杂度：$O(N^2)$，其中 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$。

## 方法二：哈希表

在遍历的过程中记住已经遍历过的元素的值和下标，因此使用「哈希表」记录看到的元素的「值」和「下标」的对应关系。

**参考代码 2**：

Java 代码：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;

        Map<Integer, Integer> hashMap = new HashMap<>(len - 1);
        hashMap.put(nums[0], 0);
        for (int i = 1; i < len; i++) {
            int another = target - nums[i];
            if (hashMap.containsKey(another)) {
                return new int[]{i, hashMap.get(another)};
            }
            hashMap.put(nums[i], i);
        }
        // throw new IllegalArgumentException("没有找到和为 target 的两个数。");
        return new int[0];
    }

}
````

**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 是输入数组的长度；
- 空间复杂度：$O(N)$。

