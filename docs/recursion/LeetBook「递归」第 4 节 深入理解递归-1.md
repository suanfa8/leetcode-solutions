# 第 4 节 深入理解递归-1

「递归」在算法的世界里无处不在，这一节我们例举出「递归」函数的应用。这一些知识点可能是大家所熟知的，我们在讲解的时候会突出算法设计的思想，从思想层面帮助大家重新审视这些问题，好让大家对递归函数有更深刻的理解。

「归并排序」和「快速排序」是非常重要的「递归」函数的学习材料。我们建议大家先通过形象地理解算法的执行流程，再通过代码理解递归函数是如何帮助我们完成任务，理解递归的设计和其中的细节。

## 使用「归并排序」实现「力扣」第 912 题：排序数组

「归并排序」将数组不断拆分，直到拆到不能再拆分为止（即数组只有 $1$ 个元素的时候）。由于 $1$ 个元素的数组肯定是有序数组，然后我们「逐层向上」依次合并两个有序数组。通过这样的方式，我们实现了排序的功能。

「拆分」与「合并」就通过递归的方式，方便地实现了它们的逻辑。

请大家结合下面的动画和下面参考代码，理解「递归返回以后进行合并两个有序数组」的时机。

![Recursion-Merge-Sort.gif](https://pic.leetcode-cn.com/1615448603-BzZRNE-Recursion-Merge-Sort.gif)

**参考代码 1**：第 912 题：排序数组

```Java []
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        int[] temp = new int[len];
        mergeSort(nums, 0, len - 1, temp);
        return nums;
    }

    /**
     * 递归函数语义：对数组 nums 的子区间 [left.. right] 进行归并排序
     *
     * @param nums
     * @param left
     * @param right
     * @param temp  用于合并两个有序数组的辅助数组，全局使用一份，避免多次创建和销毁
     */
    private void mergeSort(int[] nums, int left, int right, int[] temp) {
        // 1. 递归终止条件
        if (left == right) {
            return;
        }

        // 2. 拆分，对应「分而治之」算法的「分」
        int mid = (left + right) / 2;

        mergeSort(nums, left, mid, temp);
        mergeSort(nums, mid + 1, right, temp);

        // 3. 在递归函数调用完成以后还可以做点事情

        // 合并两个有序数组，对应「分而治之」的「合」
        mergeOfTwoSortedArray(nums, left, mid, right, temp);
    }


    /**
     * 合并两个有序数组：先把值复制到临时数组，再合并回去
     *
     * @param nums
     * @param left
     * @param mid   mid 是第一个有序数组的最后一个元素的下标，即：[left..mid] 有序，[mid + 1..right] 有序
     * @param right
     * @param temp  全局使用的临时数组
     */
    private void mergeOfTwoSortedArray(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        int i = left;
        int j = mid + 1;

        int k = left;
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                // 注意写成 < 就丢失了稳定性（相同元素原来靠前的排序以后依然靠前）
                nums[k] = temp[i];
                k++;
                i++;
            } else {
                nums[k] = temp[j];
                k++;
                j++;
            }
        }

        while (i <= mid) {
            nums[k] = temp[i];
            k++;
            i++;
        }
        while (j <= right) {
            nums[k] = temp[j];
            k++;
            j++;
        }
    }
}
```

**说明**：

+ `mergeSort(nums, left, mid, temp);` 与 `mergeSort(nums, mid + 1, right, temp);` 是在递归地解决子问题。在它们之后我们编写的 `mergeOfTwoSortedArray(nums, left, mid, right, temp);` 是根据之前递归调用返回的结果（两个子数组 `nums[left..mid]` 和 `nums[mid + 1.. right]` 分别有序）进行「合并两个有序数组」的操作，以得到一个长度更长的有序数组 `nums[left..right]` 。如果我们使用迭代会变得非常麻烦，感兴趣的朋友可以阅读《算法（第 4 版）》「自底向上的归并排序」进行对比；
+ 从这个例子我们可以知道，虽然「递归」在理论上执行效率没有「递推」效率高，但正确地编写「递归」函数可以帮助我们简化逻辑，而且现代编程语言的编译器还会对递归函数进行优化。因此我们的建议是：如果「递归」函数可以清晰地表达我们想要实现的业务逻辑，不建议为了追求性能极致而改用非递归的写法。

代码编写完成以后，我们可以给程序添加打印输出，方便我们更好地理解「归并排序」。

**参考代码 2**：

```Java []
import java.util.Arrays;

public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        int[] temp = new int[len];
        mergeSort(nums, 0, len - 1, temp, 0);
        return nums;
    }

    private void mergeSort(int[] nums, int left, int right, int[] temp, int recursionLevel) {
        log("拆分子问题", left, right, recursionLevel);
        if (left == right) {
            log("解决子问题", left, right, recursionLevel);
            return;
        }

        int mid = (left + right) / 2;
        mergeSort(nums, left, mid, temp, recursionLevel + 1);
        mergeSort(nums, mid + 1, right, temp, recursionLevel + 1);
        mergeOfTwoSortedArray(nums, left, mid, right, temp);
        log("解决子问题", left, right, recursionLevel);
    }

    private void mergeOfTwoSortedArray(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        int i = left;
        int j = mid + 1;

        int k = left;
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                // 注意写成 < 就丢失了稳定性（相同元素原来靠前的排序以后依然靠前）
                nums[k] = temp[i];
                k++;
                i++;
            } else {
                nums[k] = temp[j];
                k++;
                j++;
            }
        }

        while (i <= mid) {
            nums[k] = temp[i];
            k++;
            i++;
        }
        while (j <= right) {
            nums[k] = temp[j];
            k++;
            j++;
        }
    }

    private void log(String log, int left, int right, int recursionLevel) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("  ".repeat(Math.max(0, recursionLevel)));
        stringBuilder.append(log);
        stringBuilder.append(" ");
        stringBuilder.append("=>");
        stringBuilder.append(" ");
        stringBuilder.append("[");
        stringBuilder.append(left);
        stringBuilder.append(", ");
        stringBuilder.append(right);
        stringBuilder.append("]");
        System.out.println(stringBuilder.toString());
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = new int[]{8, 6, 7, 2, 3, 5, 4, 1};
        int[] res = solution.sortArray(nums);
        System.out.println(Arrays.toString(res));
    }
}
```

控制台输出：

```
拆分子问题 => [0, 7]
  拆分子问题 => [0, 3]
    拆分子问题 => [0, 1]
      拆分子问题 => [0, 0]
      解决子问题 => [0, 0]
      拆分子问题 => [1, 1]
      解决子问题 => [1, 1]
    解决子问题 => [0, 1]
    拆分子问题 => [2, 3]
      拆分子问题 => [2, 2]
      解决子问题 => [2, 2]
      拆分子问题 => [3, 3]
      解决子问题 => [3, 3]
    解决子问题 => [2, 3]
  解决子问题 => [0, 3]
  拆分子问题 => [4, 7]
    拆分子问题 => [4, 5]
      拆分子问题 => [4, 4]
      解决子问题 => [4, 4]
      拆分子问题 => [5, 5]
      解决子问题 => [5, 5]
    解决子问题 => [4, 5]
    拆分子问题 => [6, 7]
      拆分子问题 => [6, 6]
      解决子问题 => [6, 6]
      拆分子问题 => [7, 7]
      解决子问题 => [7, 7]
    解决子问题 => [6, 7]
  解决子问题 => [4, 7]
解决子问题 => [0, 7]
[1, 2, 3, 4, 5, 6, 7, 8]
```

根据控制台的打印输出，我们可以发现：归并排序的流程是按照「深度优先搜索」的方式进行的。事实上，所有的递归函数的调用过程，都是按照「深度优先搜索」的方式进行的。

## 使用「快速排序」实现「力扣」第 912 题：排序数组

「归并排序」在「拆分子问题」环节是「无脑地」进行拆分，然后我们需要在「合」的环节进行一些操作。而「快速排序」在「分」这件事情上做出了文章，因此在「合」的环节什么都不用做。

「快速排序」大家可以阅读经典的算法教程《算法导论》《算法（第 4 版）》进行学习，也可以阅读 LeetBook 之 [排序算法全解析](https://leetcode-cn.com/leetbook/detail/sort-algorithms/) 。我们在这里就不对「快速排序」算法进行具体讲解，而直接给出代码，相关的知识点通过注释给出。

这一版快速排序的代码，我们

+ 引入了随机化选择切分元素 `pivot`，以避免递归树倾斜；
+ 并且使用了双指针技巧，将与 `pivot` 相等的元素平均地分散到待排序区间的开头和末尾。

**参考代码 3**：第 912 题：排序数组

```Java []
import java.util.Random;

public class Solution {

    /**
     * 随机化是为了防止递归树偏斜的操作，此处不展开叙述
     */
    private static final Random RANDOM = new Random();

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        quickSort(nums, 0, len - 1);
        return nums;
    }

    /**
     * 对数组的子区间 nums[left..right] 排序
     *
     * @param nums
     * @param left
     * @param right
     */
    private void quickSort(int[] nums, int left, int right) {
        // 1. 递归终止条件
        if (left == right) {
            return;
        }

        int pIndex = partition(nums, left, right);

        // 2. 拆分，对应「分而治之」算法的「分」
        quickSort(nums, left, pIndex - 1);
        quickSort(nums, pIndex + 1, right);

        // 3. 递归完成以后没有「合」的操作，这是由「快速排序」partition 的逻辑决定的
    }


    /**
     * 将数组 nums[left..right] 分区，返回下标 pivot，
     * 且满足 [left + 1..lt) <= pivot，(gt, right] >= pivot
     *
     * @param nums
     * @param left
     * @param right
     * @return
     */
    private int partition(int[] nums, int left, int right) {
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, randomIndex, left);

        int pivot = nums[left];
        int lt = left + 1;
        int gt = right;

        while (true) {
            while (lt <= right && nums[lt] < pivot) {
                lt++;
            }

            while (gt > left && nums[gt] > pivot) {
                gt--;
            }

            if (lt >= gt) {
                break;
            }

            // 细节：相等的元素通过交换，等概率分到数组的两边
            swap(nums, lt, gt);
            lt++;
            gt--;
        }
        swap(nums, left, gt);
        return gt;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

我们依然可以为「快速排序」增加打印输出语句：

**参考代码 4**：

```Java []
import java.util.Arrays;
import java.util.Random;

public class Solution {

    /**
     * 随机化是为了防止递归树偏斜的操作，此处不展开叙述
     */
    private static final Random RANDOM = new Random();

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        quickSort(nums, 0, len - 1, 0);
        return nums;
    }

    /**
     * 对数组的子区间 nums[left..right] 排序
     *
     * @param nums
     * @param left
     * @param right
     */
    private void quickSort(int[] nums, int left, int right, int recursionLevel) {
        log("拆分子问题", left, right, recursionLevel);
        // 1. 递归终止条件
        if (left >= right) {
            log("递归到底", left, right, recursionLevel);
            return;
        }

        int pIndex = partition(nums, left, right);
        // 2. 拆分，对应「分而治之」算法的「分」
        quickSort(nums, left, pIndex - 1, recursionLevel + 1);
        quickSort(nums, pIndex + 1, right, recursionLevel + 1);
        // 3. 递归完成以后没有「合」的操作，这是由「快速排序」partition 的逻辑决定的
    }


    /**
     * 将数组 nums[left..right] 分区，返回下标 pivot，
     * 且满足 [left + 1..lt) <= pivot，(gt, right] >= pivot
     *
     * @param nums
     * @param left
     * @param right
     * @return
     */
    private int partition(int[] nums, int left, int right) {
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, randomIndex, left);

        int pivot = nums[left];
        int lt = left + 1;
        int gt = right;

        while (true) {
            while (lt <= right && nums[lt] < pivot) {
                lt++;
            }

            while (gt > left && nums[gt] > pivot) {
                gt--;
            }

            if (lt >= gt) {
                break;
            }

            // 细节：相等的元素通过交换，等概率分到数组的两边
            swap(nums, lt, gt);
            lt++;
            gt--;
        }
        swap(nums, left, gt);
        return gt;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

    private void log(String log, int left, int right, int recursionLevel) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("  ".repeat(Math.max(0, recursionLevel)));
        stringBuilder.append(log);
        stringBuilder.append(" ");
        stringBuilder.append("=>");
        stringBuilder.append(" ");
        stringBuilder.append("[");
        stringBuilder.append(left);
        stringBuilder.append(", ");
        stringBuilder.append(right);
        stringBuilder.append("]");
        System.out.println(stringBuilder.toString());
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = new int[]{7, 7, 7, 1, 7, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9};
        int[] res = solution.sortArray(nums);
        System.out.println(Arrays.toString(res));
    }
}
```

控制台输出：

```shell
拆分子问题 => [0, 15]
  拆分子问题 => [0, 9]
    拆分子问题 => [0, 3]
      拆分子问题 => [0, -1]
      递归到底 => [0, -1]
      拆分子问题 => [1, 3]
        拆分子问题 => [1, 2]
          拆分子问题 => [1, 0]
          递归到底 => [1, 0]
          拆分子问题 => [2, 2]
          递归到底 => [2, 2]
        拆分子问题 => [4, 3]
        递归到底 => [4, 3]
    拆分子问题 => [5, 9]
      拆分子问题 => [5, 5]
      递归到底 => [5, 5]
      拆分子问题 => [7, 9]
        拆分子问题 => [7, 8]
          拆分子问题 => [7, 6]
          递归到底 => [7, 6]
          拆分子问题 => [8, 8]
          递归到底 => [8, 8]
        拆分子问题 => [10, 9]
        递归到底 => [10, 9]
  拆分子问题 => [11, 15]
    拆分子问题 => [11, 14]
      拆分子问题 => [11, 11]
      递归到底 => [11, 11]
      拆分子问题 => [13, 14]
        拆分子问题 => [13, 13]
        递归到底 => [13, 13]
        拆分子问题 => [15, 14]
        递归到底 => [15, 14]
    拆分子问题 => [16, 15]
    递归到底 => [16, 15]
[1, 2, 3, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 7, 8, 9]
```

**说明**：

+ 由于加入了随机化，每一次运行的结果很可能不同；
+ 遇到拆分子问题 `[15, 14]` ，这个时候区间里没有元素，所以马上接下来输出的语句就是「递归到底」，然后程序将结果一层一层向上返回。

## 练习

1. 《剑指 Offer》第 51 题：数组中的逆序对（困难）；
2. 完成「力扣」第 215 题：数组中的第K个最大元素（中等）；
3. 完成「力扣」第 315 题：计算右侧小于当前元素的个数（困难）；
4. 完成「力扣」第 493 题：翻转对（困难）；
5. 完成「力扣」第 53 题：最大子序和（简单）。

## 总结

在程序中添加打印输出，是我们理解程序的重要方法。它虽然很粗暴，但很实用。



