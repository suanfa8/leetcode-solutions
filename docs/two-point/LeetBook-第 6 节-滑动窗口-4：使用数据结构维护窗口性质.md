# 第 6 节-滑动窗口-4：使用数据结构维护窗口性质

有一类问题只是名字上叫「滑动窗口」，但解决这一类问题需要用到常见的数据结构。这一节给出的问题可以当做例题进行学习，一些比较复杂的问题是基于这些问题衍生出来的。

## 例 1：「力扣」第 239 题：滑动窗口最大值

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入：nums = [1], k = 1
输出：[1]
```

**示例 3：**

```
输入：nums = [1,-1], k = 1
输出：[1,-1]
```

**示例 4：**

```
输入：nums = [9,11], k = 2
输出：[11]
```

**示例 5：**

```
输入：nums = [4,-2], k = 2
输出：[4]
```

**提示：**

- $1 \le nums.length \le 10^5$
- $-10^4 \le nums[i] \le 104$
- $1 \le k \le nums.length$

#### 前言

对于每个滑动窗口，我们可以使用 $O(k)$ 的时间遍历其中的每一个元素，找出其中的最大值。对于长度为 $n$ 的数组 $\textit{nums}$ 而言，窗口的数量为 $n-k+1$，因此该算法的时间复杂度为 $O((n-k+1)k)=O(nk)$，会超出时间限制，因此我们需要进行一些优化。

我们可以想到，对于两个相邻（只差了一个位置）的滑动窗口，它们共用着 $k-1$ 个元素，而只有 $1$ 个元素是变化的。我们可以根据这个特点进行优化。

#### 方法一：优先队列

**思路与算法**

对于「最大值」，我们可以想到一种非常合适的数据结构，那就是优先队列（堆），其中的大根堆可以帮助我们实时维护一系列元素中的最大值。

对于本题而言，初始时，我们将数组 $\textit{nums}$ 的前 $k$ 个元素放入优先队列中。每当我们向右移动窗口时，我们就可以把一个新的元素放入优先队列中，此时堆顶的元素就是堆中所有元素的最大值。然而这个最大值可能并不在滑动窗口中，在这种情况下，**这个值在数组 $\textit{nums}$ 中的位置出现在滑动窗口左边界的左侧**。因此，当我们后续继续向右移动窗口时，这个值就永远不可能出现在滑动窗口中了，我们可以将其永久地从优先队列中移除。

我们不断地移除堆顶的元素，直到其确实出现在滑动窗口中。此时，堆顶元素就是滑动窗口中的最大值。为了方便判断堆顶元素与滑动窗口的位置关系，我们可以在优先队列中存储二元组 $(\textit{num}, \textit{index})$，表示元素 $\textit{num}$ 在数组中的下标为 $\textit{index}$。

**代码**

```C++ [sol1-C++]
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        priority_queue<pair<int, int>> q;
        for (int i = 0; i < k; ++i) {
            q.emplace(nums[i], i);
        }
        vector<int> ans = {q.top().first};
        for (int i = k; i < n; ++i) {
            q.emplace(nums[i], i);
            while (q.top().second <= i - k) {
                q.pop();
            }
            ans.push_back(q.top().first);
        }
        return ans;
    }
};
```

```Java [sol1-Java]
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        PriorityQueue<int[]> pq = new PriorityQueue<int[]>(new Comparator<int[]>() {
            public int compare(int[] pair1, int[] pair2) {
                return pair1[0] != pair2[0] ? pair2[0] - pair1[0] : pair2[1] - pair1[1];
            }
        });
        for (int i = 0; i < k; ++i) {
            pq.offer(new int[]{nums[i], i});
        }
        int[] ans = new int[n - k + 1];
        ans[0] = pq.peek()[0];
        for (int i = k; i < n; ++i) {
            pq.offer(new int[]{nums[i], i});
            while (pq.peek()[1] <= i - k) {
                pq.poll();
            }
            ans[i - k + 1] = pq.peek()[0];
        }
        return ans;
    }
}
```

```Python [sol1-Python3]
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        # 注意 Python 默认的优先队列是小根堆
        q = [(-nums[i], i) for i in range(k)]
        heapq.heapify(q)

        ans = [-q[0][0]]
        for i in range(k, n):
            heapq.heappush(q, (-nums[i], i))
            while q[0][1] <= i - k:
                heapq.heappop(q)
            ans.append(-q[0][0])
        
        return ans
```

```go [sol1-Golang]
var a []int
type hp struct{ sort.IntSlice }
func (h hp) Less(i, j int) bool  { return a[h.IntSlice[i]] > a[h.IntSlice[j]] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{}   { a := h.IntSlice; v := a[len(a)-1]; h.IntSlice = a[:len(a)-1]; return v }

func maxSlidingWindow(nums []int, k int) []int {
    a = nums
    q := &hp{make([]int, k)}
    for i := 0; i < k; i++ {
        q.IntSlice[i] = i
    }
    heap.Init(q)

    n := len(nums)
    ans := make([]int, 1, n-k+1)
    ans[0] = nums[q.IntSlice[0]]
    for i := k; i < n; i++ {
        heap.Push(q, i)
        for q.IntSlice[0] <= i-k {
            heap.Pop(q)
        }
        ans = append(ans, nums[q.IntSlice[0]])
    }
    return ans
}
```

```C [sol1-C]
void swap(int** a, int** b) {
    int* tmp = *a;
    *a = *b, *b = tmp;
}

int cmp(int* a, int* b) {
    return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
}

struct Heap {
    int** heap;
    int size;
    int capacity;
};

void init(struct Heap* obj, int capacity) {
    obj->size = 0;
    obj->heap = NULL;
    obj->capacity = capacity;
    obj->heap = malloc(sizeof(int*) * (obj->capacity + 1));
    for (int i = 1; i <= obj->capacity; i++) {
        obj->heap[i] = malloc(sizeof(int) * 2);
    }
}

void setFree(struct Heap* obj) {
    for (int i = 1; i <= obj->capacity; i++) {
        free(obj->heap[i]);
    }
    free(obj->heap);
    free(obj);
}

void push(struct Heap* obj, int num0, int num1) {
    int sub1 = ++(obj->size), sub2 = sub1 >> 1;
    (obj->heap[sub1])[0] = num0, (obj->heap[sub1])[1] = num1;
    while (sub2 > 0 && cmp(obj->heap[sub2], obj->heap[sub1]) < 0) {
        swap(&(obj->heap[sub1]), &(obj->heap[sub2]));
        sub1 = sub2, sub2 = sub1 >> 1;
    }
}

void pop(struct Heap* obj) {
    int sub = 1;
    swap(&(obj->heap[sub]), &(obj->heap[(obj->size)--]));
    while (sub <= obj->size) {
        int sub1 = sub << 1, sub2 = sub << 1 | 1;
        int maxSub = sub;
        if (sub1 <= obj->size && cmp(obj->heap[maxSub], obj->heap[sub1]) < 0) {
            maxSub = sub1;
        }
        if (sub2 <= obj->size && cmp(obj->heap[maxSub], obj->heap[sub2]) < 0) {
            maxSub = sub2;
        }
        if (sub == maxSub) {
            break;
        }
        swap(&(obj->heap[sub]), &(obj->heap[maxSub]));
        sub = maxSub;
    }
}

int* top(struct Heap* obj) {
    return obj->heap[1];
}

int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    struct Heap* q = malloc(sizeof(struct Heap));
    init(q, numsSize);
    for (int i = 0; i < k; i++) {
        push(q, nums[i], i);
    }
    int* ans = malloc(sizeof(int) * (numsSize - k + 1));
    *returnSize = 0;
    ans[(*returnSize)++] = top(q)[0];

    for (int i = k; i < numsSize; ++i) {
        push(q, nums[i], i);
        while (top(q)[1] <= i - k) {
            pop(q);
        }
        ans[(*returnSize)++] = top(q)[0];
    }
    setFree(q);
    return ans;
}
```

**复杂度分析**

- 时间复杂度：$O(n \log n)$，其中 $n$ 是数组 $\textit{nums}$ 的长度。在最坏情况下，数组 $\textit{nums}$ 中的元素单调递增，那么最终优先队列中包含了所有元素，没有元素被移除。由于将一个元素放入优先队列的时间复杂度为 $O(\log n)$，因此总时间复杂度为 $O(n \log n)$。

- 空间复杂度：$O(n)$，即为优先队列需要使用的空间。**这里所有的空间复杂度分析都不考虑返回的答案需要的 $O(n)$ 空间，只计算额外的空间使用。**

#### 方法二：单调队列

**思路与算法**

我们可以顺着方法一的思路继续进行优化。

由于我们需要求出的是滑动窗口的最大值，如果当前的滑动窗口中有两个下标 $i$ 和 $j$，其中 $i$ 在 $j$ 的左侧（$i < j$），并且 $i$ 对应的元素不大于 $j$ 对应的元素（$\textit{nums}[i] \leq \textit{nums}[j]$），那么会发生什么呢？

当滑动窗口向右移动时，**只要 $i$ 还在窗口中，那么 $j$ 一定也还在窗口中**，这是 $i$ 在 $j$ 的左侧所保证的。因此，由于 $\textit{nums}[j]$ 的存在，**$\textit{nums}[i]$ 一定不会是滑动窗口中的最大值了**，我们可以将 $\textit{nums}[i]$ 永久地移除。

因此我们可以使用一个队列存储所有还没有被移除的下标。在队列中，这些下标按照从小到大的顺序被存储，并且它们在数组 $\textit{nums}$ 中对应的值是严格单调递减的。因为如果队列中有两个相邻的下标，它们对应的值相等或者递增，那么令前者为 $i$，后者为 $j$，就对应了上面所说的情况，即 $\textit{nums}[i]$ 会被移除，这就产生了矛盾。

当滑动窗口向右移动时，我们需要把一个新的元素放入队列中。为了保持队列的性质，我们会不断地将新的元素与队尾的元素相比较，如果前者大于等于后者，那么队尾的元素就可以被永久地移除，我们将其弹出队列。我们需要不断地进行此项操作，直到队列为空或者新的元素小于队尾的元素。

由于队列中下标对应的元素是严格单调递减的，因此此时队首下标对应的元素就是滑动窗口中的最大值。但与方法一中相同的是，此时的最大值可能在滑动窗口左边界的左侧，并且随着窗口向右移动，它永远不可能出现在滑动窗口中了。因此我们还需要不断从队首弹出元素，直到队首元素在窗口中为止。

为了可以同时弹出队首和队尾的元素，我们需要使用双端队列。满足这种单调性的双端队列一般称作「单调队列」。

**代码**

```C++ [sol2-C++]
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        deque<int> q;
        for (int i = 0; i < k; ++i) {
            while (!q.empty() && nums[i] >= nums[q.back()]) {
                q.pop_back();
            }
            q.push_back(i);
        }

        vector<int> ans = {nums[q.front()]};
        for (int i = k; i < n; ++i) {
            while (!q.empty() && nums[i] >= nums[q.back()]) {
                q.pop_back();
            }
            q.push_back(i);
            while (q.front() <= i - k) {
                q.pop_front();
            }
            ans.push_back(nums[q.front()]);
        }
        return ans;
    }
};
```

```Java [sol2-Java]
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        Deque<Integer> deque = new LinkedList<Integer>();
        for (int i = 0; i < k; ++i) {
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
        }

        int[] ans = new int[n - k + 1];
        ans[0] = nums[deque.peekFirst()];
        for (int i = k; i < n; ++i) {
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            while (deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }
            ans[i - k + 1] = nums[deque.peekFirst()];
        }
        return ans;
    }
}
```

```Python [sol2-Python3]
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        q = collections.deque()
        for i in range(k):
            while q and nums[i] >= nums[q[-1]]:
                q.pop()
            q.append(i)

        ans = [nums[q[0]]]
        for i in range(k, n):
            while q and nums[i] >= nums[q[-1]]:
                q.pop()
            q.append(i)
            while q[0] <= i - k:
                q.popleft()
            ans.append(nums[q[0]])
        
        return ans
```

```go [sol2-Golang]
func maxSlidingWindow(nums []int, k int) []int {
    q := []int{}
    push := func(i int) {
        for len(q) > 0 && nums[i] >= nums[q[len(q)-1]] {
            q = q[:len(q)-1]
        }
        q = append(q, i)
    }

    for i := 0; i < k; i++ {
        push(i)
    }

    n := len(nums)
    ans := make([]int, 1, n-k+1)
    ans[0] = nums[q[0]]
    for i := k; i < n; i++ {
        push(i)
        for q[0] <= i-k {
            q = q[1:]
        }
        ans = append(ans, nums[q[0]])
    }
    return ans
}
```

```C [sol2-C]
int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    int q[numsSize];
    int left = 0, right = 0;
    for (int i = 0; i < k; ++i) {
        while (left < right && nums[i] >= nums[q[right - 1]]) {
            right--;
        }
        q[right++] = i;
    }
    *returnSize = 0;
    int* ans = malloc(sizeof(int) * (numsSize - k + 1));
    ans[(*returnSize)++] = nums[q[left]];
    for (int i = k; i < numsSize; ++i) {
        while (left < right && nums[i] >= nums[q[right - 1]]) {
            right--;
        }
        q[right++] = i;
        while (q[left] <= i - k) {
            left++;
        }
        ans[(*returnSize)++] = nums[q[left]];
    }
    return ans;
}
```

```JavaScript [sol2-JavaScript]
var maxSlidingWindow = function(nums, k) {
    const n = nums.length;
    const q = [];
    for (let i = 0; i < k; i++) {
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
    }

    const ans = [nums[q[0]]];
    for (let i = k; i < n; i++) {
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
        while (q[0] <= i - k) {
            q.shift();
        }
        ans.push(nums[q[0]]);
    }
    return ans;
};
```

**复杂度分析**

- 时间复杂度：$O(n)$，其中 $n$ 是数组 $\textit{nums}$ 的长度。每一个下标恰好被放入队列一次，并且最多被弹出队列一次，因此时间复杂度为 $O(n)$。

- 空间复杂度：$O(k)$。与方法一不同的是，在方法二中我们使用的数据结构是双向的，因此「不断从队首弹出元素」保证了队列中最多不会有超过 $k+1$ 个元素，因此队列使用的空间为 $O(k)$。

## 例 2：「力扣」第 480 题：滑动窗口中位数

中位数是有序序列最中间的那个数。如果序列的长度是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。

例如：

- `[2,3,4]`，中位数是 `3`
- `[2,3]`，中位数是 `(2 + 3) / 2 = 2.5`

给你一个数组 *nums*，有一个长度为 *k* 的窗口从最左端滑动到最右端。窗口中有 *k* 个数，每次窗口向右移动 *1* 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。

**示例：**

给出 *nums* = `[1,3,-1,-3,5,3,6,7]`，以及 *k* = 3。

```
窗口位置                      中位数
---------------               -----
[1  3  -1] -3  5  3  6  7       1
 1 [3  -1  -3] 5  3  6  7      -1
 1  3 [-1  -3  5] 3  6  7      -1
 1  3  -1 [-3  5  3] 6  7       3
 1  3  -1  -3 [5  3  6] 7       5
 1  3  -1  -3  5 [3  6  7]      6
```

因此，返回该滑动窗口的中位数数组 `[1,-1,-1,3,5,6]`。

**提示：**

- 你可以假设 `k` 始终有效，即：`k` 始终小于等于输入的非空数组的元素个数。
- 与真实值误差在 $10^{ -5}$ 以内的答案将被视作正确答案。

#### 前言

本题是「[295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)」的进阶版本。

我们首先思考一下完成本题需要做哪些事情：

- 初始时，我们需要将数组 $\textit{nums}$ 中的前 $k$ 个元素放入一个滑动窗口，并且求出它们的中位数；

- 随后滑动窗口会向右进行移动。每一次移动后，会将一个新的元素放入滑动窗口，并且将一个旧的元素移出滑动窗口，最后再求出它们的中位数。

因此，我们需要设计一个「数据结构」，用来维护滑动窗口，并且需要提供如下的三个接口：

- $\texttt{insert(num)}$：将一个数 $\textit{num}$ 加入数据结构；

- $\texttt{erase(num)}$：将一个数 $\textit{num}$ 移出数据结构；

- $\texttt{getMedian()}$：返回当前数据结构中所有数的中位数。

#### 方法一：双优先队列 + 延迟删除

**思路与算法**

我们可以使用两个优先队列（堆）维护所有的元素，第一个优先队列 $\textit{small}$ 是一个大根堆，它负责维护所有元素中较小的那一半；第二个优先队列 $\textit{large}$ 是一个小根堆，它负责维护所有元素中较大的那一半。具体地，如果当前需要维护的元素个数为 $x$，那么 $\textit{small}$ 中维护了 $\lceil \frac{x}{2} \rceil$ 个元素，$\textit{large}$ 中维护了 $\lfloor \frac{x}{2} \rfloor$ 个元素，其中 $\lceil y \rceil$ 和 $\lfloor y \rfloor$ 分别表示将 $y$ 向上取整和向下取整。也就是说：

> $\textit{small}$ 中的元素个数要么与 $\textit{large}$ 中的元素个数相同，要么比 $\textit{large}$ 中的元素个数恰好多 $1$ 个。

这样设计的好处在于：当二者包含的元素个数相同时，它们各自的堆顶元素的平均值即为中位数；而当 $\textit{small}$ 包含的元素多了一个时，$\textit{small}$ 的堆顶元素即为中位数。这样 $\texttt{getMedian()}$ 就设计完成了。

而对于 $\texttt{insert(num)}$ 而言，如果当前两个优先队列都为空，那么根据元素个数的要求，我们必须将这个元素加入 $\textit{small}$；如果 $\textit{small}$ 非空（显然不会存在 $\textit{small}$ 空而 $\textit{large}$ 非空的情况），我们就可以将 $\textit{num}$ 与 $\textit{small}$ 的堆顶元素 $\textit{top}$ 比较：

- 如果 $\textit{num} \leq \textit{top}$，我们就将其加入 $\textit{small}$ 中；

- 如果 $\textit{num} > \textit{top}$，我们就将其加入 $\textit{large}$ 中。

在成功地加入元素 $\textit{num}$ 之后，两个优先队列的元素个数可能会变得不符合要求。由于我们只加入了一个元素，那么不符合要求的情况只能是下面的二者之一：

- $\textit{small}$ 比 $\textit{large}$ 的元素个数多了 $2$ 个；

- $\textit{small}$ 比 $\textit{large}$ 的元素个数少了 $1$ 个。

对于第一种情况，我们将 $\textit{small}$ 的堆顶元素放入 $\textit{large}$；对于第二种情况，我们将 $\textit{large}$ 的堆顶元素放入 $\textit{small}$，这样就可以解决问题了，$\texttt{insert(num)}$ 也就设计完成了。

然而对于 $\texttt{erase(num)}$ 而言，设计起来就不是那么容易了，因为我们知道，**优先队列是不支持移出非堆顶元素**这一操作的，因此我们可以考虑使用「延迟删除」的技巧，即：

> 当我们需要移出优先队列中的某个元素时，我们只将这个删除操作「记录」下来，而不去真的删除这个元素。当这个元素出现在 $\textit{small}$ 或者 $\textit{large}$ 的堆顶时，我们再去将其移出对应的优先队列。

「延迟删除」使用到的辅助数据结构一般为哈希表 $\textit{delayed}$，其中的每个键值对 $(\textit{num}, \textit{freq})$，表示元素 $\textit{num}$ 还需要被删除 $\textit{freq}$ 次。「优先队列 + 延迟删除」有非常多种设计方式，体现在「延迟删除」的时机选择。在本题解中，我们使用一种比较容易编写代码的设计方式，即：

> 我们保证在任意操作 $\texttt{insert(num)}$，$\texttt{erase(num)}$，$\texttt{getMedian()}$ 完成之后（或者说任意操作开始之前），$\textit{small}$ 和 $\textit{large}$ 的堆顶元素都是不需要被「延迟删除」的。这样设计的好处在于：我们无需更改 $\texttt{getMedian()}$ 的设计，只需要略加修改 $\texttt{insert(num)}$ 即可。

我们首先设计一个辅助函数 $\texttt{prune(heap)}$，它的作用很简单，就是对 $\textit{heap}$ 这个优先队列（$\textit{small}$ 或者 $\textit{large}$ 之一），不断地弹出其需要被删除的堆顶元素，并且减少 $\textit{delayed}$ 中对应项的值。在 $\texttt{prune(heap)}$ 完成之后，我们就可以保证 **$\textit{heap}$ 的堆顶元素是不需要被「延迟删除」的**。

这样我们就可以在 $\texttt{prune(heap)}$ 的基础上设计另一个辅助函数 $\texttt{makeBalance()}$，它的作用即为调整 $\textit{small}$ 和 $\textit{large}$ 中的元素个数，使得二者的元素个数满足要求。由于有了 $\texttt{erase(num)}$ 以及「延迟删除」，我们在将一个优先队列的堆顶元素放入另一个优先队列时，第一个优先队列的堆顶元素可能是需要删除的。因此我们就可以用 $\texttt{makeBalance()}$ 将 $\texttt{prune(heap)}$ 封装起来，它的逻辑如下：

- 如果 $\textit{small}$ 和 $\textit{large}$ 中的元素个数满足要求，则不进行任何操作；

- 如果 $\textit{small}$ 比 $\textit{large}$ 的元素个数多了 $2$ 个，那么我们我们将 $\textit{small}$ 的堆顶元素放入 $\textit{large}$。此时 $\textit{small}$ 的对应元素可能是需要删除的，因此我们调用 $\texttt{prune(small)}$；

- 如果 $\textit{small}$ 比 $\textit{large}$ 的元素个数少了 $1$ 个，那么我们将 $\textit{large}$ 的堆顶元素放入 $\textit{small}$。此时 $\textit{large}$ 的对应的元素可能是需要删除的，因此我们调用 $\texttt{prune(large)}$。

此时，我们只需要在原先 $\texttt{insert(num)}$ 的设计的最后加上一步 $\texttt{makeBalance()}$ 即可。然而对于 $\texttt{erase(num)}$，我们还是需要进行一些思考的：

- 如果 $\textit{num}$ 与 $\textit{small}$ 和 $\textit{large}$ 的堆顶元素都不相同，那么 $\textit{num}$ 是需要被「延迟删除」的，我们将其在哈希表中的值增加 $1$；

- 否则，例如 $\textit{num}$ 与 $\textit{small}$ 的堆顶元素相同，那么该元素是可以理解被删除的。虽然我们没有实现「立即删除」这个辅助函数，但只要我们将 $\textit{num}$ 在哈希表中的值增加 $1$，并且调用「延迟删除」的辅助函数 $\texttt{prune(small)}$，那么就相当于实现了「立即删除」的功能。

无论是「立即删除」还是「延迟删除」，其中一个优先队列中的元素个数发生了变化（减少了 $1$），因此我们还需要用 $\texttt{makeBalance()}$ 调整元素的个数。

此时，所有的接口都已经设计完成了。由于 $\texttt{insert(num)}$ 和 $\texttt{erase(num)}$ 的最后一步都是 $\texttt{makeBalance()}$，而 $\texttt{makeBalance()}$ 的最后一步是 $\texttt{prune(heap)}$，因此我们就保证了任意操作完成之后，$\textit{small}$ 和 $\textit{large}$ 的堆顶元素都是不需要被「延迟删除」的。

具体实现的细节相对较多，读者可以参考下面的代码和注释进一步理解。

**代码**

```C++ [sol1-C++]
class DualHeap {
private:
    // 大根堆，维护较小的一半元素
    priority_queue<int> small;
    // 小根堆，维护较大的一半元素
    priority_queue<int, vector<int>, greater<int>> large;
    // 哈希表，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
    unordered_map<int, int> delayed;

    int k;
    // small 和 large 当前包含的元素个数，需要扣除被「延迟删除」的元素
    int smallSize, largeSize;

public:
    DualHeap(int _k): k(_k), smallSize(0), largeSize(0) {}

private:
    // 不断地弹出 heap 的堆顶元素，并且更新哈希表
    template<typename T>
    void prune(T& heap) {
        while (!heap.empty()) {
            int num = heap.top();
            if (delayed.count(num)) {
                --delayed[num];
                if (!delayed[num]) {
                    delayed.erase(num);
                }
                heap.pop();
            }
            else {
                break;
            }
        }
    }

    // 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
    void makeBalance() {
        if (smallSize > largeSize + 1) {
            // small 比 large 元素多 2 个
            large.push(small.top());
            small.pop();
            --smallSize;
            ++largeSize;
            // small 堆顶元素被移除，需要进行 prune
            prune(small);
        }
        else if (smallSize < largeSize) {
            // large 比 small 元素多 1 个
            small.push(large.top());
            large.pop();
            ++smallSize;
            --largeSize;
            // large 堆顶元素被移除，需要进行 prune
            prune(large);
        }
    }

public:
    void insert(int num) {
        if (small.empty() || num <= small.top()) {
            small.push(num);
            ++smallSize;
        }
        else {
            large.push(num);
            ++largeSize;
        }
        makeBalance();
    }

    void erase(int num) {
        ++delayed[num];
        if (num <= small.top()) {
            --smallSize;
            if (num == small.top()) {
                prune(small);
            }
        }
        else {
            --largeSize;
            if (num == large.top()) {
                prune(large);
            }
        }
        makeBalance();
    }

    double getMedian() {
        return k & 1 ? small.top() : ((double)small.top() + large.top()) / 2;
    }
};

class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        DualHeap dh(k);
        for (int i = 0; i < k; ++i) {
            dh.insert(nums[i]);
        }
        vector<double> ans = {dh.getMedian()};
        for (int i = k; i < nums.size(); ++i) {
            dh.insert(nums[i]);
            dh.erase(nums[i - k]);
            ans.push_back(dh.getMedian());
        }
        return ans;
    }
};
```

```Java [sol1-Java]
class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        DualHeap dh = new DualHeap(k);
        for (int i = 0; i < k; ++i) {
            dh.insert(nums[i]);
        }
        double[] ans = new double[nums.length - k + 1];
        ans[0] = dh.getMedian();
        for (int i = k; i < nums.length; ++i) {
            dh.insert(nums[i]);
            dh.erase(nums[i - k]);
            ans[i - k + 1] = dh.getMedian();
        }
        return ans;
    }
}

class DualHeap {
    // 大根堆，维护较小的一半元素
    private PriorityQueue<Integer> small;
    // 小根堆，维护较大的一半元素
    private PriorityQueue<Integer> large;
    // 哈希表，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
    private Map<Integer, Integer> delayed;

    private int k;
    // small 和 large 当前包含的元素个数，需要扣除被「延迟删除」的元素
    private int smallSize, largeSize;

    public DualHeap(int k) {
        this.small = new PriorityQueue<Integer>(new Comparator<Integer>() {
            public int compare(Integer num1, Integer num2) {
                return num2.compareTo(num1);
            }
        });
        this.large = new PriorityQueue<Integer>(new Comparator<Integer>() {
            public int compare(Integer num1, Integer num2) {
                return num1.compareTo(num2);
            }
        });
        this.delayed = new HashMap<Integer, Integer>();
        this.k = k;
        this.smallSize = 0;
        this.largeSize = 0;
    }

    public double getMedian() {
        return (k & 1) == 1 ? small.peek() : ((double) small.peek() + large.peek()) / 2;
    }

    public void insert(int num) {
        if (small.isEmpty() || num <= small.peek()) {
            small.offer(num);
            ++smallSize;
        } else {
            large.offer(num);
            ++largeSize;
        }
        makeBalance();
    }

    public void erase(int num) {
        delayed.put(num, delayed.getOrDefault(num, 0) + 1);
        if (num <= small.peek()) {
            --smallSize;
            if (num == small.peek()) {
                prune(small);
            }
        } else {
            --largeSize;
            if (num == large.peek()) {
                prune(large);
            }
        }
        makeBalance();
    }

    // 不断地弹出 heap 的堆顶元素，并且更新哈希表
    private void prune(PriorityQueue<Integer> heap) {
        while (!heap.isEmpty()) {
            int num = heap.peek();
            if (delayed.containsKey(num)) {
                delayed.put(num, delayed.get(num) - 1);
                if (delayed.get(num) == 0) {
                    delayed.remove(num);
                }
                heap.poll();
            } else {
                break;
            }
        }
    }

    // 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
    private void makeBalance() {
        if (smallSize > largeSize + 1) {
            // small 比 large 元素多 2 个
            large.offer(small.poll());
            --smallSize;
            ++largeSize;
            // small 堆顶元素被移除，需要进行 prune
            prune(small);
        } else if (smallSize < largeSize) {
            // large 比 small 元素多 1 个
            small.offer(large.poll());
            ++smallSize;
            --largeSize;
            // large 堆顶元素被移除，需要进行 prune
            prune(large);
        }
    }
}
```

```Python [sol1-Python3]
class DualHeap:
    def __init__(self, k: int):
        # 大根堆，维护较小的一半元素，注意 python 没有大根堆，需要将所有元素取相反数并使用小根堆
        self.small = list()
        # 小根堆，维护较大的一半元素
        self.large = list()
        # 哈希表，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
        self.delayed = collections.Counter()

        self.k = k
        # small 和 large 当前包含的元素个数，需要扣除被「延迟删除」的元素
        self.smallSize = 0
        self.largeSize = 0


    # 不断地弹出 heap 的堆顶元素，并且更新哈希表
    def prune(self, heap: List[int]):
        while heap:
            num = heap[0]
            if heap is self.small:
                num = -num
            if num in self.delayed:
                self.delayed[num] -= 1
                if self.delayed[num] == 0:
                    self.delayed.pop(num)
                heapq.heappop(heap)
            else:
                break
    
    # 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
    def makeBalance(self):
        if self.smallSize > self.largeSize + 1:
            # small 比 large 元素多 2 个
            heapq.heappush(self.large, -self.small[0])
            heapq.heappop(self.small)
            self.smallSize -= 1
            self.largeSize += 1
            # small 堆顶元素被移除，需要进行 prune
            self.prune(self.small)
        elif self.smallSize < self.largeSize:
            # large 比 small 元素多 1 个
            heapq.heappush(self.small, -self.large[0])
            heapq.heappop(self.large)
            self.smallSize += 1
            self.largeSize -= 1
            # large 堆顶元素被移除，需要进行 prune
            self.prune(self.large)

    def insert(self, num: int):
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)
            self.smallSize += 1
        else:
            heapq.heappush(self.large, num)
            self.largeSize += 1
        self.makeBalance()

    def erase(self, num: int):
        self.delayed[num] += 1
        if num <= -self.small[0]:
            self.smallSize -= 1
            if num == -self.small[0]:
                self.prune(self.small)
        else:
            self.largeSize -= 1
            if num == self.large[0]:
                self.prune(self.large)
        self.makeBalance()

    def getMedian(self) -> float:
        return float(-self.small[0]) if self.k % 2 == 1 else (-self.small[0] + self.large[0]) / 2


class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        dh = DualHeap(k)
        for num in nums[:k]:
            dh.insert(num)
        
        ans = [dh.getMedian()]
        for i in range(k, len(nums)):
            dh.insert(nums[i])
            dh.erase(nums[i - k])
            ans.append(dh.getMedian())
        
        return ans
```

```go [sol1-Golang]
type hp struct {
    sort.IntSlice
    size int
}
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{}   { a := h.IntSlice; v := a[len(a)-1]; h.IntSlice = a[:len(a)-1]; return v }
func (h *hp) push(v int)         { h.size++; heap.Push(h, v) }
func (h *hp) pop() int           { h.size--; return heap.Pop(h).(int) }
func (h *hp) prune() {
    for h.Len() > 0 {
        num := h.IntSlice[0]
        if h == small {
            num = -num
        }
        if d, has := delayed[num]; has {
            if d > 1 {
                delayed[num]--
            } else {
                delete(delayed, num)
            }
            heap.Pop(h)
        } else {
            break
        }
    }
}

var delayed map[int]int
var small, large *hp

func medianSlidingWindow(nums []int, k int) []float64 {
    delayed = map[int]int{} // 哈希表，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
    small = &hp{}           // 大根堆，维护较小的一半元素
    large = &hp{}           // 小根堆，维护较大的一半元素
    makeBalance := func() {
        // 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
        if small.size > large.size+1 { // small 比 large 元素多 2 个
            large.push(-small.pop())
            small.prune() // small 堆顶元素被移除，需要进行 prune
        } else if small.size < large.size { // large 比 small 元素多 1 个
            small.push(-large.pop())
            large.prune() // large 堆顶元素被移除，需要进行 prune
        }
    }
    insert := func(num int) {
        if small.Len() == 0 || num <= -small.IntSlice[0] {
            small.push(-num)
        } else {
            large.push(num)
        }
        makeBalance()
    }
    erase := func(num int) {
        delayed[num]++
        if num <= -small.IntSlice[0] {
            small.size--
            if num == -small.IntSlice[0] {
                small.prune()
            }
        } else {
            large.size--
            if num == large.IntSlice[0] {
                large.prune()
            }
        }
        makeBalance()
    }
    getMedian := func() float64 {
        if k&1 > 0 {
            return float64(-small.IntSlice[0])
        }
        return float64(-small.IntSlice[0]+large.IntSlice[0]) / 2
    }

    for _, num := range nums[:k] {
        insert(num)
    }
    n := len(nums)
    ans := make([]float64, 1, n-k+1)
    ans[0] = getMedian()
    for i := k; i < n; i++ {
        insert(nums[i])
        erase(nums[i-k])
        ans = append(ans, getMedian())
    }
    return ans
}
```

```C [sol1-C]
struct Heap {
    int* heap;
    int heapSize;
    int realSize;
    bool (*cmp)(int, int);
};

void init(struct Heap* obj, int n, bool (*cmp)(int, int)) {
    obj->heap = malloc(sizeof(int) * (n + 1));
    obj->heapSize = 0;
    obj->cmp = cmp;
}

bool cmp1(int a, int b) {
    return a < b;
}

bool cmp2(int a, int b) {
    return a > b;
}

void swap(int* a, int* b) {
    int tmp = *a;
    *a = *b, *b = tmp;
}

void push(struct Heap* obj, int x) {
    int p = ++(obj->heapSize), q = p >> 1;
    obj->heap[p] = x;
    while (q) {
        if (!obj->cmp(obj->heap[q], obj->heap[p])) {
            break;
        }
        swap(&(obj->heap[q]), &(obj->heap[p]));
        p = q, q = p >> 1;
    }
}

void pop(struct Heap* obj) {
    swap(&(obj->heap[1]), &(obj->heap[(obj->heapSize)--]));
    int p = 1, q = p << 1;
    while (q <= obj->heapSize) {
        if (q + 1 <= obj->heapSize) {
            if (obj->cmp(obj->heap[q], obj->heap[q + 1])) {
                q++;
            }
        }
        if (!obj->cmp(obj->heap[p], obj->heap[q])) {
            break;
        }
        swap(&(obj->heap[q]), &(obj->heap[p]));
        p = q, q = p << 1;
    }
}

int top(struct Heap* obj) {
    return obj->heap[1];
}

bool empty(struct Heap* obj) {
    return obj->heapSize == 0;
}

struct HashTable {
    int key;
    int val;
    UT_hash_handle hh;
} * hashtable;

void prune(struct Heap* obj) {
    while (!empty(obj)) {
        int num = top(obj);
        struct HashTable* tmp;
        HASH_FIND_INT(hashtable, &num, tmp);
        if (tmp == NULL) {
            break;
        }
        tmp->val--;
        if (!(tmp->val)) {
            HASH_DEL(hashtable, tmp);
            free(tmp);
        }
        pop(obj);
    }
}

void makeBalance(struct Heap* small, struct Heap* large) {
    if (small->realSize > large->realSize + 1) {
        push(large, top(small));
        pop(small);
        --(small->realSize);
        ++(large->realSize);
        prune(small);
    } else if (small->realSize < large->realSize) {
        push(small, top(large));
        pop(large);
        ++(small->realSize);
        --(large->realSize);
        prune(large);
    }
}

void insert(struct Heap* small, struct Heap* large, int num) {
    if (empty(small) || num <= top(small)) {
        push(small, num);
        ++(small->realSize);
    } else {
        push(large, num);
        ++(large->realSize);
    }
    makeBalance(small, large);
}

void erase(struct Heap* small, struct Heap* large, int num) {
    struct HashTable* tmp;
    HASH_FIND_INT(hashtable, &num, tmp);
    if (tmp == NULL) {
        tmp = malloc(sizeof(struct HashTable));
        tmp->key = num;
        tmp->val = 1;
        HASH_ADD_INT(hashtable, key, tmp);
    } else {
        tmp->val++;
    }
    if (num <= top(small)) {
        --(small->realSize);
        if (num == top(small)) {
            prune(small);
        }
    } else {
        --(large->realSize);
        if (num == top(large)) {
            prune(large);
        }
    }
    makeBalance(small, large);
}

double getMedian(struct Heap* small, struct Heap* large, int k) {
    return (k & 1) ? top(small) : (((double)top(small) + top(large)) / 2);
}

double* medianSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    hashtable = NULL;
    struct Heap* small = malloc(sizeof(struct Heap));
    init(small, numsSize, cmp1);
    struct Heap* large = malloc(sizeof(struct Heap));
    init(large, numsSize, cmp2);
    for (int i = 0; i < k; ++i) {
        insert(small, large, nums[i]);
    }
    double* ans = malloc(sizeof(double) * (numsSize - k + 1));
    *returnSize = 0;
    ans[(*returnSize)++] = getMedian(small, large, k);
    for (int i = k; i < numsSize; ++i) {
        insert(small, large, nums[i]);
        erase(small, large, nums[i - k]);
        ans[(*returnSize)++] = getMedian(small, large, k);
    }
    return ans;
}
```

**复杂度分析**

由于「延迟删除」的存在，$\textit{small}$ 比 $\textit{large}$ 在最坏情况下可能包含所有的 $n$ 个元素，即没有一个元素被真正删除了。因此优先队列的大小是 $O(n)$ 而不是 $O(k)$ 的，其中 $n$ 是数组 $\textit{nums}$ 的长度。

- 时间复杂度：$O(n\log n)$。$\texttt{insert(num)}$ 和 $\texttt{erase(num)}$ 的单次时间复杂度为 $O(\log n)$，$\texttt{getMedian()}$ 的单次时间复杂度为 $O(1)$。因此总时间复杂度为 $O(n\log n)$。

- 空间复杂度：$O(n)$。即为 $\textit{small}$，$\textit{large}$ 和 $\textit{delayed}$ 需要使用的空间。

#### 结语

读者可以尝试回答如下的两个问题来检验自己是否掌握了该方法：

- 在 $\texttt{insert(num)}$ 的最后我们加上了一步 $\texttt{makeBalance()}$，其中包括可能进行的 $\texttt{prune(heap)}$ 操作，这对于 $\texttt{insert(num)}$ 操作而言是否是必要的？

- 在 $\texttt{insert(num)}$ 的过程中，如果我们将 $\texttt{insert(num)}$ 放入了 $\textit{large}$ 中，并且 $\textit{num}$ 恰好出现在 $\textit{large}$ 的堆顶位置，且两个优先队列的元素个数满足要求，不需要进行调整。此时会不会出现 $\textit{num}$ 是一个需要被「延迟删除」的元素的情况，这样就不满足在 $\texttt{insert(num)}$ 操作完成之后 $\textit{large}$ 的堆顶是不需要被「延迟删除」的要求了？

**答案**

- 是必要的。举个例子：在 $\texttt{insert(num)}$ 操作之前，$\textit{large}$ 的堆顶元素是有效的，但其中第二小的元素是需要被删除的。此时，如果我们将一个很大的元素加入 $\textit{large}$ 中，并且 $\textit{large}$ 包含的元素数量超过了 $\textit{small}$，那么我们就需要将 $\textit{large}$ 的堆顶元素放入 $\textit{small}$ 中。这样一来，$\textit{large}$ 的堆顶元素就变成了那个需要被删除的第二小的元素了，所以 $\texttt{prune(heap)}$ 操作是必要的。

- 不可能会出现这种情况，假设出现了这种情况，那么 $\textit{num}$ 显然不会等于 $\textit{large}$ 原先的堆顶元素，因为 $\textit{large}$ 原先的堆顶元素一定是不需要被删除的。那么 $\textit{num}$ 满足：

    $$
    \textit{small} ~的堆顶元素 < \textit{num} < \textit{large} ~的堆顶元素
    $$

    由于 $\textit{small}$ 是大根堆，$\textit{large}$ 是小根堆，因此**根本就不存在与 $\textit{num}$ 值相同的元素**，也就不可能会被延迟删除了。

## 练习

1. 完成「力扣」第 220 题：存在重复元素 III

2. 完成「力扣」第 683 题：K 个关闭的灯泡

提示：第 220 题、第 683 题需要维护「窗口」内的所有元素的最大值与最小值

3. 完成「力扣」第 1438 题：绝对差不超过限制的最长连续子数组