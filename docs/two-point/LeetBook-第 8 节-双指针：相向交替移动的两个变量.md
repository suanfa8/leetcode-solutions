# 第 7 节-双指针：相向交替移动的两个变量

「双指针」是指通过两个变量交替相向移动完成任务的算法，具体来说，可以使用两个变量 `i` 和 `j` ，初始的时候，`i` 和 `j` 分别指向数组的第一个元素和最后一个元素，然后指针 `i` 不断向右移动， 指针 `j` 不断向左移动，直到它们相遇。这样设计的算法少考虑了很多暴力解法需要考虑的情况，如下图所示。

![image.png](https://pic.leetcode-cn.com/1616666788-SntYzm-image.png)

我们依然是通过例子向大家展示「双指针」算法 的应用。

## 例 1：「力扣」第 11 题：盛最多水的容器（中等）

给你 `n` 个非负整数 `a1，a2，...，a``n`，每个数代表坐标中的一个点 `(i, ai)` 。在坐标内画 `n` 条垂直线，垂直线 `i` 的两个端点分别为 `(i, ai)` 和 `(i, 0)` 。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

**说明**：你不能倾斜容器。

**示例 1：**

![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

**示例 3：**

```
输入：height = [4,3,2,1,4]
输出：16
```

**示例 4：**

```
输入：height = [1,2,1]
输出：2
```

**提示：**

- `n = height.length`
- `2 <= n <= 3 * 10^4`
- `0 <= height[i] <= 3 * 10^4`

**视频题解**：

![11. 盛最多水的容器.mp4]()


#### 方法一：暴力解法

```Java []
public class Solution {

    public int maxArea(int[] height) {
        int len = height.length;
        if (len < 2) {
            return 0;
        }
        int res = 0;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
            }
        }
        return res;
    }
}
```
```Python3 []
from typing import List


class Solution:

    def maxArea(self, height: List[int]) -> int:
        size = len(height)
        if size < 2:
            return 0

        res = 0
        for left in range(0, size - 1):
            for right in range(left + 1, size):
                res = max(res, min(height[left], height[right]) * (right - left))
        return res
```


暴力解法的时间复杂度太高，我们可以使用指针对撞的方法降低时间复杂度。


#### 方法二：双指针


下面的动画演示了「双指针」算法作用于示例 1 的计算过程：

<![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide1.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide2.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide3.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide4.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide5.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide6.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide7.PNG),![1200](https://pic.leetcode-cn.com/Figures/11_Container_WaterSlide8.PNG)>


**参考代码**：

```Java []
public class Solution {

    public int maxArea(int[] height) {
        int len = height.length;
        if (len < 2) {
            return 0;
        }

        int left = 0;
        int right = len - 1;

        int res = 0;
        while (left < right) {
            int minHeight = Math.min(height[left], height[right]);
            res = Math.max(res, minHeight * (right - left));

            if (height[left] == minHeight) {
                left++;
            } else {
                right--;
            }
        }
        return res;
    }
}
```
```Python3 []
from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        size = len(height)
        if size < 2:
            return 0

        left = 0
        right = size - 1
        res = 0
        while left < right:
            min_h = min(height[left], height[right])
            res = max(res, (right - left) * min_h)
            if min_h == height[left]:
                left += 1
            else:
                right -= 1
        return res
```

**复杂度分析**：

- 时间复杂度：$O(N)$，双指针总计最多遍历整个数组一次；
- 空间复杂度：$O(1)$，只需要额外的常数级别的空间。

**本题总结**：「双指针」算法和「滑动窗口」算法一样，都是基于 **特定的问题** 对 **暴力解法** 进行的优化，少考虑了很多不必要的情况，使得时间复杂度达到线性级别。

---


## 例 2：「力扣」第 167 题：两数之和 II - 输入有序数组（简单）

给定一个已按照**升序排列** 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2*。*

**说明:**

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

**示例:**

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

**视频题解**：

![167. 两数之和II.mp4]()


**题意分析**：


这道题可以使用「[1. 两数之和](https://leetcode-cn.com/problems/two-sum/)」的解法，使用 $O(n^2)$ 的时间复杂度和 $O(1)$ 的空间复杂度暴力求解，或者借助哈希表使用 $O(n)$ 的时间复杂度和 $O(n)$ 的空间复杂度求解。但是这两种解法都是针对无序数组的，没有利用到输入数组有序的性质。利用输入数组有序的性质，可以得到时间复杂度和空间复杂度更优的解法。

+ 联系两数之和第 1 题，可以使用哈希表也是可以的，不过哈希表的方法没有用到数组的有序性；
+ 看到有序，首先可以想到使用「二分查找」。但是我们这题，用「指针对撞」更合适。

初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。

使用双指针的实质是缩小查找范围。那么会不会把可能的解过滤掉？答案是不会。假设 $\text{numbers}[i]+\text{numbers}[j]=\text{target}$ 是唯一解，其中 $0 \leq i<j \leq \text{numbers.length}-1$。初始时两个指针分别指向下标 $0$ 和下标 $\text{numbers.length}-1$，左指针指向的下标小于或等于 $i$，右指针指向的下标大于或等于 $j$。除非初始时左指针和右指针已经位于下标 $i$ 和 $j$，否则一定是左指针先到达下标 $i$ 的位置或者右指针先到达下标 $j$ 的位置。

如果左指针先到达下标 $i$ 的位置，此时右指针还在下标 $j$ 的右侧，$\text{sum}>\text{target}$，因此一定是右指针左移，左指针不可能移到 $i$ 的右侧。

如果右指针先到达下标 $j$ 的位置，此时左指针还在下标 $i$ 的左侧，$\text{sum}<\text{target}$，因此一定是左指针右移，右指针不可能移到 $j$ 的左侧。

由此可见，在整个移动过程中，左指针不可能移到 $i$ 的右侧，右指针不可能移到 $j$ 的左侧，因此不会把可能的解过滤掉。由于题目确保有唯一的答案，因此使用双指针一定可以找到答案。


**参考代码**：

```Java []
public class Solution {

    public int[] twoSum(int[] numbers, int target) {
        int len = numbers.length;
        int left = 0;
        int right = len - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
        return new int[]{-1, -1};
    }
}
```
```Python3 []
from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        size = len(numbers)
        if size < 2:
            return []
        left = 0
        right = size - 1
        while left < right:
            if numbers[left] + numbers[right] == target:
                return [left + 1, right + 1]
            elif numbers[left] + numbers[right] < target:
                left += 1
            else:
                right -= 1
        return []
```


**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 是数组的长度。两个指针移动的总次数最多为 $N$ 次；
- 空间复杂度：$O(1)$。

---


## 例 3：「力扣」第 15 题：三数之和（中等）

给你一个包含 `n` 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？请你找出所有和为 `0` 且不重复的三元组。

**注意**：答案中不可以包含重复的三元组。

**示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

**示例 2：**

```
输入：nums = []
输出：[]
```

**示例 3：**

```
输入：nums = [0]
输出：[]
```

**提示：** 

- `0 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

![15. 三数之和.mp4]()

本题与 [1. 两数之和](https://leetcode-cn.com/problems/two-sum/) 类似，是非常经典的面试题，但是做法不尽相同。

题目中要求找到所有「不重复」且和为 $0$ 的三元组，这个「不重复」的要求使得我们无法简单地使用三重循环枚举所有的三元组。这是因为在最坏的情况下，数组中的元素全部为 $0$，即

```
[0, 0, 0, 0, 0, ..., 0, 0, 0]
```

任意一个三元组的和都为 $0$。如果我们直接使用三重循环枚举三元组，会得到 $O(N^3)$ 个满足题目要求的三元组（其中 $N$ 是数组的长度）时间复杂度至少为 $O(N^3)$。在这之后，我们还需要使用哈希表进行去重操作，得到不包含重复三元组的最终答案，又消耗了大量的空间。这个做法的时间复杂度和空间复杂度都很高，因此我们要换一种思路来考虑这个问题。

「不重复」的本质是什么？我们保持三重循环的大框架不变，只需要保证：

- 第二重循环枚举到的元素不小于当前第一重循环枚举到的元素；

- 第三重循环枚举到的元素不小于当前第二重循环枚举到的元素。

也就是说，我们枚举的三元组 $(a, b, c)$ 满足 $a \leq b \leq c$，保证了只有 $(a, b, c)$ 这个顺序会被枚举到，而 $(b, a, c)$、$(c, b, a)$ 等等这些不会，这样就减少了重复。要实现这一点，我们可以将数组中的元素从小到大进行排序，随后使用普通的三重循环就可以满足上面的要求。

同时，对于每一重循环而言，相邻两次枚举的元素不能相同，否则也会造成重复。举个例子，如果排完序的数组为

```
[0, 1, 2, 2, 2, 3]
 ^  ^  ^
```

我们使用三重循环枚举到的第一个三元组为 $(0, 1, 2)$，如果第三重循环继续枚举下一个元素，那么仍然是三元组 $(0, 1, 2)$，产生了重复。因此我们需要将第三重循环「跳到」下一个不相同的元素，即数组中的最后一个元素 $3$，枚举三元组 $(0, 1, 3)$。

下面给出了改进的方法的伪代码实现：

```
nums.sort()
for first = 0 .. n-1
    // 只有和上一次枚举的元素不相同，我们才会进行枚举
    if first == 0 or nums[first] != nums[first-1] then
        for second = first+1 .. n-1
            if second == first+1 or nums[second] != nums[second-1] then
                for third = second+1 .. n-1
                    if third == second+1 or nums[third] != nums[third-1] then
                        // 判断是否有 a+b+c==0
                        check(first, second, third)
```

这种方法的时间复杂度仍然为 $O(N^3)$，毕竟我们还是没有跳出三重循环的大框架。然而它是很容易继续优化的，可以发现，如果我们固定了前两重循环枚举到的元素 $a$ 和 $b$，那么只有唯一的 $c$ 满足 $a+b+c=0$。当第二重循环往后枚举一个元素 $b'$ 时，由于 $b' > b$，那么满足 $a+b'+c'=0$ 的 $c'$ 一定有 $c' < c$，即 $c'$ 在数组中一定出现在 $c$ 的左侧。也就是说，我们可以从小到大枚举 $b$，**同时**从大到小枚举 $c$，即**第二重循环和第三重循环实际上是并列的关系**。

有了这样的发现，我们就可以保持第二重循环不变，而将**第三重循环变成一个从数组最右端开始向左移动的指针**，从而得到下面的伪代码：

```
nums.sort()
for first = 0 .. n-1
    if first == 0 or nums[first] != nums[first-1] then
        // 第三重循环对应的指针
        third = n-1
        for second = first+1 .. n-1
            if second == first+1 or nums[second] != nums[second-1] then
                // 向左移动指针，直到 a+b+c 不大于 0
                while nums[first]+nums[second]+nums[third] > 0
                    third = third-1
                // 判断是否有 a+b+c==0
                check(first, second, third)
```

这个方法就是我们常说的「双指针」，当我们需要枚举数组中的两个元素时，如果我们发现随着第一个元素的递增，第二个元素是递减的，那么就可以使用双指针的方法，将枚举的时间复杂度从 $O(N^2)$ 减少至 $O(N)$。为什么是 $O(N)$ 呢？这是因为在枚举的过程每一步中，「左指针」会向右移动一个位置（也就是题目中的 $b$），而「右指针」会向左移动若干个位置，这个与数组的元素有关，但我们知道它一共会移动的位置数为 $O(N)$，**均摊下来**，每次也向左移动一个位置，因此时间复杂度为 $O(N)$。

注意到我们的伪代码中还有第一重循环，时间复杂度为 $O(N)$，因此枚举的总时间复杂度为 $O(N^2)$。由于排序的时间复杂度为 $O(N \log N)$，在渐进意义下小于前者，因此算法的总时间复杂度为 $O(N^2)$。

上述的伪代码中还有一些细节需要补充，例如我们需要保持左指针一直在右指针的左侧（即满足 $b \leq c$），具体可以参考下面的代码，均给出了详细的注释。

```C++ [sol1-C++]
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        // 枚举 a
        for (int first = 0; first < n; ++first) {
            // 需要和上一次枚举的数不相同
            if (first > 0 && nums[first] == nums[first - 1]) {
                continue;
            }
            // c 对应的指针初始指向数组的最右端
            int third = n - 1;
            int target = -nums[first];
            // 枚举 b
            for (int second = first + 1; second < n; ++second) {
                // 需要和上一次枚举的数不相同
                if (second > first + 1 && nums[second] == nums[second - 1]) {
                    continue;
                }
                // 需要保证 b 的指针在 c 的指针的左侧
                while (second < third && nums[second] + nums[third] > target) {
                    --third;
                }
                // 如果指针重合，随着 b 后续的增加
                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
                if (second == third) {
                    break;
                }
                if (nums[second] + nums[third] == target) {
                    ans.push_back({nums[first], nums[second], nums[third]});
                }
            }
        }
        return ans;
    }
};
```

```Python [sol1-Python3]
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        ans = list()
        
        # 枚举 a
        for first in range(n):
            # 需要和上一次枚举的数不相同
            if first > 0 and nums[first] == nums[first - 1]:
                continue
            # c 对应的指针初始指向数组的最右端
            third = n - 1
            target = -nums[first]
            # 枚举 b
            for second in range(first + 1, n):
                # 需要和上一次枚举的数不相同
                if second > first + 1 and nums[second] == nums[second - 1]:
                    continue
                # 需要保证 b 的指针在 c 的指针的左侧
                while second < third and nums[second] + nums[third] > target:
                    third -= 1
                # 如果指针重合，随着 b 后续的增加
                # 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
                if second == third:
                    break
                if nums[second] + nums[third] == target:
                    ans.append([nums[first], nums[second], nums[third]])
        
        return ans
```

```Java [sol1-Java]
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        List<List<Integer>> ans = new ArrayList<List<Integer>>();
        // 枚举 a
        for (int first = 0; first < n; ++first) {
            // 需要和上一次枚举的数不相同
            if (first > 0 && nums[first] == nums[first - 1]) {
                continue;
            }
            // c 对应的指针初始指向数组的最右端
            int third = n - 1;
            int target = -nums[first];
            // 枚举 b
            for (int second = first + 1; second < n; ++second) {
                // 需要和上一次枚举的数不相同
                if (second > first + 1 && nums[second] == nums[second - 1]) {
                    continue;
                }
                // 需要保证 b 的指针在 c 的指针的左侧
                while (second < third && nums[second] + nums[third] > target) {
                    --third;
                }
                // 如果指针重合，随着 b 后续的增加
                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
                if (second == third) {
                    break;
                }
                if (nums[second] + nums[third] == target) {
                    List<Integer> list = new ArrayList<Integer>();
                    list.add(nums[first]);
                    list.add(nums[second]);
                    list.add(nums[third]);
                    ans.add(list);
                }
            }
        }
        return ans;
    }
}
```

```golang [sol1-Golang]
func threeSum(nums []int) [][]int {
    n := len(nums)
    sort.Ints(nums)
    ans := make([][]int, 0)
 
    // 枚举 a
    for first := 0; first < n; first++ {
        // 需要和上一次枚举的数不相同
        if first > 0 && nums[first] == nums[first - 1] {
            continue
        }
        // c 对应的指针初始指向数组的最右端
        third := n - 1
        target := -1 * nums[first]
        // 枚举 b
        for second := first + 1; second < n; second++ {
            // 需要和上一次枚举的数不相同
            if second > first + 1 && nums[second] == nums[second - 1] {
                continue
            }
            // 需要保证 b 的指针在 c 的指针的左侧
            for second < third && nums[second] + nums[third] > target {
                third--
            }
            // 如果指针重合，随着 b 后续的增加
            // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
            if second == third {
                break
            }
            if nums[second] + nums[third] == target {
                ans = append(ans, []int{nums[first], nums[second], nums[third]})
            }
        }
    }
    return ans
}
```

**复杂度分析**

- 时间复杂度：$O(N^2)$，其中 $N$ 是数组 $\textit{nums}$ 的长度。

- 空间复杂度：$O(\log N)$。我们忽略存储答案的空间，额外的排序的空间复杂度为 $O(\log N)$。然而我们修改了输入的数组 $\textit{nums}$，在实际情况下不一定允许，因此也可以看成使用了一个额外的数组存储了 $\textit{nums}$ 的副本并进行排序，空间复杂度为 $O(N)$。

---

## 例 4：「力扣」第 125 题：验证回文串（简单）

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明**：本题中，我们将空字符串定义为有效的回文串。

**示例 1:**

```
输入: "A man, a plan, a canal: Panama"
输出: true
```

**示例 2:**

```
输入: "race a car"
输出: false
```

**视频讲解**：

![...5. 验证回文串 - Lizzi.mp4]()

**思路分析**：我们可以对方法一中第二种判断回文串的方法进行优化，就可以得到只使用 $O(1)$ 空间的算法。

我们直接在原字符串 $s$ 上使用双指针。在移动任意一个指针时，需要不断地向另一指针的方向移动，直到遇到一个字母或数字字符，或者两指针重合为止。也就是说，我们每次将指针移到下一个字母字符或数字字符，再判断这两个指针指向的字符是否相同。

**参考代码**：

```Java []
public class Solution {

    public boolean isPalindrome(String s) {
        int len = s.length();
        // 如果字符只有 1 个字母，那么也一定是回文数
        if (len < 2) {
            return true;
        }

        // 只考虑字母和数字字符，可以忽略字母的大小写。
        s = s.toLowerCase();
        // 只保留小写字母和数字
        s = s.replaceAll("[^0-9a-z]", "");
        char[] charArray = s.toCharArray();
        int left = 0;
        int right = charArray.length - 1;
        while (left < right) {
            char leftChar = charArray[left];
            char rightChar = charArray[right];
            if (leftChar != rightChar) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```
```Python3 []
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left = 0
        right = len(s) - 1
        while left < right:
            # 只考虑字母和数字字符
            if not s[left].isalnum():
                left += 1
                continue
            if not s[right].isalnum():
                right -= 1
                continue
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
```


**复杂度分析**：

+ 时间复杂度：$O(|s|)$，其中 $|s|$ 是字符串 $s$ 的长度；
+ 空间复杂度：$O(1)$。

---

## 例 5：「力扣」第 344 题：反转字符串（简单）

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `char[]` 的形式给出。

不要给另外的数组分配额外的空间，你必须**原地修改输入数组**、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 [ASCII](https://baike.baidu.com/item/ASCII) 码表中的可打印字符。

**示例 1：**

```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

**思路分析**：对于长度为 `N` 的待被反转的字符数组，我们可以观察反转前后下标的变化，假设反转前字符数组为 `s[0] s[1] s[2] ... s[N - 1]`，那么反转后字符数组为 `s[N - 1] s[N - 2] ... s[0]`。比较反转前后下标变化很容易得出 `s[i]` 的字符与 `s[N - 1 - i]` 的字符发生了交换的规律，因此我们可以得出如下双指针的解法：

- 将 `left` 指向字符数组首元素，`right` 指向字符数组尾元素。
- 当 `left < right`：
	- 交换  `s[left]`  和  `s[right]`；
	- `left` 指针右移一位，即 `left = left + 1`；
	- `right` 指针左移一位，即 `right = right - 1`。
- 当 `left >= right`，反转结束，返回字符数组即可。

![fig1](https://assets.leetcode-cn.com/solution-static/344/344_fig1.png)


**参考代码**：


```Java []
public class Solution {

    public String reverseString(char[] s) {
        int len = s.length;

        int left = 0;
        int right = len - 1;
        while (left < right) {
            swap(s, left, right);
            left++;
            right--;
        }
        return new String(s);
    }

    private void swap(char[] s, int index1, int index2) {
        char temp = s[index1];
        s[index1] = s[index2];
        s[index2] = temp;
    }
}
```
```Python3 []
from typing import List


class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        size = len(s)
        if size < 2:
            return

        left = 0
        right = size - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
```


**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 为字符数组的长度。一共执行了 $\cfrac{N}{2}$ 次交换；
- 空间复杂度：$O(1)$。只使用了常数空间来存放若干变量。

---

## 例 6：「力扣」第 345 题：反转字符串中的元音字母（中等）

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

**示例 1:**

```
输入: "hello"
输出: "holle"
```

**示例 2:**

```
输入: "leetcode"
输出: "leotcede"
```

**说明:**

+ 元音字母不包含字母"y"。

**参考代码**：

```Java []
public class Solution {

    public String reverseVowels(String s) {
        int len = s.length();
        if (len < 2) {
            return s;
        }
        char[] charArray = s.toCharArray();
        int left = 0;
        int right = len - 1;
        while (true) {
            while (left < len && checkVowels(charArray[left])) {
                left++;
            }
            while (right >= 0 && checkVowels(charArray[right])) {
                right--;
            }
            if (left < right) {
                swap(charArray, left, right);
                left++;
                right--;
            } else {
                break;
            }
        }
        return new String(charArray);
    }

    private void swap(char[] chars, int index1, int index2) {
        char temp = chars[index1];
        chars[index1] = chars[index2];
        chars[index2] = temp;
    }

    private boolean checkVowels(char c) {
        return c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u' &&
                c != 'A' && c != 'E' && c != 'I' && c != 'O' && c != 'U';
    }
}
```
```Python3 []
class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}
        s = list(s)
        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] not in vowels:
                left += 1
            elif s[right] not in vowels:
                right -= 1
            else:
                s[left], s[right] = s[right], s[left]
                left += 1
                right -= 1
        return ''.join(s)
```

**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 为字符数组的长度。一共执行了 $\cfrac{N}{2}$ 次交换；
- 空间复杂度：$O(1)$。只使用了常数空间来存放若干变量。

## 练习

1. 完成「力扣」第 16 题：最接近的三数之和；
2. 完成「力扣」第 18 题：四数之和；
3. 完成「力扣」第 42 题：接雨水；
4. 完成「力扣」第 658 题：找到 K 个最接近的元素；
5. 完成「力扣」第 259 题：较小的三数之和；
6. 完成「力扣」第 360 题：有序转化数组；
7. 完成「力扣」第 844 题：比较含退格的字符串；
8. 完成「力扣」第 845 题：数组中的最长山脉；
9. 完成「力扣」第 881 题：救生艇；
10. 完成「力扣」第 925 题：长按键入；
11. 完成「力扣」第 977 题：有序数组的平方；
12. 完成「力扣」第 1099 题：小于 K 的两数之和；
13. 完成「力扣」第 1229 题：安排会议日程。









