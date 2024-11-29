# 第 2 节-使用循环不变量写对代码

这一节我们讲解两个非常基础且常考的问题，向大家展示：我们在写代码的时候一定要明确自己对变量以及区间的定义是什么，并且在编写代码的过程中保持定义不变。

## 例 1：「力扣」第 75 题：颜色分类

给定一个包含红色、白色和蓝色，一共 `n` 个元素的数组，**[原地](https://baike.baidu.com/item/原地算法)**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 `0`、 `1` 和 `2` 分别表示红色、白色和蓝色。

**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

**示例 2：**

```
输入：nums = [2,0,1]
输出：[0,1,2]
```

**示例 3：**

```
输入：nums = [0]
输出：[0]
```

**示例 4：**

```
输入：nums = [1]
输出：[1]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` 为 `0`、`1` 或 `2`

**进阶：**

- 你可以不使用代码库中的排序函数来解决这道题吗？
- 你能想出一个仅使用常数空间的一趟扫描算法吗？

### 📺 视频题解  

![75.颜色分类.mp4]()

**思路分析**：解决这道问题需要有快速排序 partition 的知识作为基础。

我们可以在区间上设置两个表示分界的位置，并且定义循环不变量：

+ 所有的元素在区间 `[0..zero) = 0`；
+ 所有的元素在区间 `[zero..i) = 1`；
+ 区间 `[i..two)` 是程序没有看到的部分；
+ 所有的元素在区间 `[two..len - 1] = 2`，这里 `len` 表示数组的长度。

这种定义下，为了让初始化的时候三个区间都为空区间，`zero = 0`，`two = len`，程序没有看到的部分是整个数组。程序什么时候终止呢？当 `i == two`  时，三个子区间正好覆盖了整个数组，程序没有看到的部分为空，因此循环可以继续的条件是：`i < two` 。其它的细节我们放在代码中。

**参考代码 1**：

```Java
import java.util.Arrays;


public class Solution {

    public void sortColors(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
        
        int zero = 0;
        int two = len;
        int i = 0;
        while (i < two) {
            if (nums[i] == 0) {
                swap(nums, i, zero);
                zero++;
                i++;
            } else if (nums[i] == 1) {
                i++;
            } else {
                two--;
                swap(nums, i, two);
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$。

如果我们按照下面这种方式定义循环不变量：

+ 所有的元素在区间 `[0..zero] = 0`；
+ 所有的元素在区间 `(zero..i) = 1`；
+ 区间 `[i..two]` 是程序没有看到的部分；
+ 所有的元素在区间 `(two..len - 1] = 2`，这里 `len` 表示数组的长度。

这种定义下，为了让初始化的时候三个区间都为空区间，`zero = -1`，`two = len - 1`。程序什么时候终止呢？当 `i == two + 1`  时，三个子区间正好覆盖了整个数组，因此循环可以继续的条件是：`i <= two` 。其它的细节我们放在代码中。

**参考代码 2**：

```Java []
public class Solution {

    public void sortColors(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
        int zero = -1;
        int two = len - 1;
        int i = 0;
        while (i <= two) {
            if (nums[i] == 0) {
                zero++;
                swap(nums, i, zero);
                i++;
            } else if (nums[i] == 1) {
                i++;
            } else {
                swap(nums, i, two);
                two--;
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**复杂度分析**：（同「参考代码 1」）。

**总结**：循环不变量是写对代码、分析边界条件的基础。

在循环变量 `i` 遍历的过程中，人为定义的循环不变的性质，决定了「初始化」「遍历过程」和「循环终止」条件。初始化的时候，变量的初始值需要保证三个区间为空区间，而循环终止的时候，循环变量 `i` 需要使得我们定义的三个区间覆盖整个数组。

## 例 2：「力扣」第 215 题：数组中的第 K 个最大元素

在未排序的数组中找到第 `k` 个最大的元素。请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

**示例 1:**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2:**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**说明:**

- $1 \le k \le nums.length \le 10^4$

- $-10^4 \le  nums[i] \le  10^4$

**思路分析**：这道题可以使用优先队列（堆）完成。我们这里展示另一种使用快速排序 partition 的知识解决的办法。我们给出三种循环不变量的定义，借此问题，大家也可以复习一下快速排序算法。

**循环不变量定义 1**：把等于切分元素的所有元素分到了数组的同一侧。

我们定义 `pivot = nums[left] `，剩下的区间 `[left + 1..right]` 被变量 `le` 分成三个部分：

+ `[left + 1 .. le] <= pivot`；
+ `(le..i] > pivot`；
+ `(i..right]` 是程序没有看到的部分。

其它细节我们放在「参考代码 1」中。

**参考代码 1**：

```Java []
import java.util.Arrays;
import java.util.Random;

public class Solution {

    private static Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
				// 第 k 大元素的下标是 len - k
        int target = len - k;

        int left = 0;
        int right = len - 1;
        while (true) {
            int pIndex = partition(nums, left, right);

            if (pIndex == target) {
                return nums[pIndex];
            } else if (pIndex < target) {
                // 下一轮搜索区间 [pIndex + 1..right]
                left = pIndex + 1;
            } else {
                // pIndex > target
                // 下一轮搜索区间 [left..pIndex - 1]
                right = pIndex - 1;
            }
        }

    }

    private int partition(int[] nums, int left, int right) {
        // 注意：必须随机化
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(nums, left, randomIndex);

        int pivot = nums[left];
        // [left + 1 .. le] <= pivot
        // (le..i] > pivot
        // 注意：一定要设置成 left ，否则交换会出错
        int le = left;
        for (int i = left + 1; i <= right; i++) {
            // 这里写 < 或者 <= 都可以
            if (nums[i] <= pivot) {
                le++;
                swap(nums, le, i);
            }
        }

        swap(nums, left, le);
        return le;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，证明过程可以参考「《算法导论》9.2：期望为线性的选择算法」；
- 空间复杂度：$O(\log N)$，递归使用栈空间的空间代价的期望为 $O(\log N)$。

**循环不变量定义 2**：把等于切分元素的所有元素 **等概率** 地分到了数组的两侧，避免了递归树倾斜，递归树相对平衡。

我们定义 `pivot = nums[left] `，剩下的区间 `[left + 1..right]` 被变量 `le` 、`ge` 分成三个部分：

+ `[left..le) <= pivot`；
+ `[le..ge]` 是程序没有看到的部分；
+ `(ge..right] >= pivot`。

其它细节我们放在「参考代码 2」中。

**参考代码 2**：

```Java []
import java.util.Random;

public class Solution {

    private static Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;

        // 第 k 大元素的下标是 len - k
        int target = len - k;

        while (true) {
            int index = partition(nums, left, right);
            if (index == target) {
                return nums[index];
            } else if (index < target) {
                left = index + 1;
            } else {
                right = index - 1;
            }
        }
    }

    public int partition(int[] nums, int left, int right) {
        // 在区间随机选择一个元素作为标定点
        int randomIndex = left + random.nextInt(right - left + 1 );
        swap(nums, left, randomIndex);
        

        int pivot = nums[left];

        // 将等于 pivot 的元素分散到两边
        // [left..le) <= pivot
        // (ge..right] >= pivot

        int le = left + 1;
        int ge = right;

        while (true) {
            // 遇到 nums[le] >= pivot 的时候停下来
            // 遇到与 pivot 相等的元素，是通过交换被等概率分到两边的
            while (le <= ge && nums[le] < pivot) {
                le++;
            }
            while (le <= ge && nums[ge] > pivot) {
                ge--;
            }

            if (le > ge) {
                break;
            }
            swap(nums, le, ge);
            le++;
            ge--;
        }

        // 这里还要交换，注意是 ge
        swap(nums, left, ge);
        return ge;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**复杂度分析**：（同「参考代码 1」）。

**循环不变量定义 3**：把等于切分元素的所有元素挤到了数组的中间，在有很多元素和切分元素相等的情况下，递归区间大大减少。

> 友情提示：这一版代码稍显麻烦，大家了解即可。

我们定义 `pivot = nums[left] `，剩下的区间 `[left + 1..right]` 被变量 `lt` 、`gt` 分成四个部分：

+ `[left + 1..lt] < pivot`；
+ `[lt + 1..i) = pivot` ；
+ `[i..gt)` 是程序没有看到的部分；
+ `[gt..right] > pivot`。

其它细节我们放在「参考代码 3」中。

**参考代码 3**：

```Java []
import java.util.Random;

public class Solution {

    private static Random RANDOM = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int target = len - k;

        int left = 0;
        int right = len - 1;
        while (true) {
            int[] pIndex = partition(nums, left, right);

            int index1 = pIndex[0];
            int index2 = pIndex[1];

            if (target < index1) {
                // 下一轮搜索区间 [left..index1 - 1]
                right = index1 - 1;
            } else if (target == index1) {
                return nums[index1];
            } else if (target < index2) {
                left = index1 + 1;
                right = index2 - 1;
            } else if (target == index2) {
                return nums[index2];
            } else {
                // pIndex > target
                // 下一轮搜索区间 [index2 + 1..right]
                left = index2 + 1;
            }
        }
    }

    private int[] partition(int[] nums, int left, int right) {
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, randomIndex, left);

        // 循环不变量：
        // all in [left + 1..lt] < pivot
        // all in [lt + 1..i) = pivot
        // all in [gt..right] > pivot
        int pivot = nums[left];
        int lt = left;
        int gt = right + 1;

        int i = left + 1;
        while (i < gt) {
            if (nums[i] < pivot) {
                lt++;
                swap(nums, i, lt);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);
        // 这里要特别小心
        return new int[]{lt, gt - 1};
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

**复杂度分析**：（同「参考代码 1」）。

## 总结

循环不变量是人为定义的，无需记忆。只要我们在编码的开始明确了我们对变量和区间的定义，写对代码就是水到渠成的事情了。
