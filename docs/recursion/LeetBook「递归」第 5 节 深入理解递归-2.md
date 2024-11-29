# 第 5 节 深入理解递归-2

我们知道，链表是递归定义的：链表的某一个结点的 `next` 指针指向了一个链表。

很多链表中的问题，可以使用循环实现，也可以使用递归实现。本节我们来比较它们二者解法上的的区别，以帮助大家更好地理解递归。

## 使用递归函数简化「链表」中「穿针引线」的操作

### 例：「力扣」第 21 题：合并两个有序数组

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

**示例 2：**

```
输入：l1 = [], l2 = []
输出：[]
```

**示例 3：**

```
输入：l1 = [], l2 = [0]
输出：[0]
```

**提示：**

- 两个链表的节点数目范围是 `[0, 50]`
- `-100 <= Node.val <= 100`
- `l1` 和 `l2` 均按 **非递减顺序** 排列

**思路分析**：这道题的解法我们就不在题解当中详细地进行说明了。我们直接给出循环的代码（穿针引线）和递归的代码。相信大家并不难理解它们的正确性。我们想一想，这两种解法它们的区别是什么。我们依然采用「打印关键变量」的方法理解程序的执行流程，请见「方法一」和「方法二」后面的「参考代码 3」。

#### 方法一：穿针引线

**参考代码 1**：

```Java []
public class Solution {

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummyNode = new ListNode(-1);
        ListNode p1 = l1;
        ListNode p2 = l2;
        ListNode curNode = dummyNode;
        // 两者都不为空的时候，才有必要进行比较
        while (p1 != null && p2 != null) {
            if (p1.val < p2.val) {
                // 指针修改发生在这里
                curNode.next = p1;
                p1 = p1.next;
            } else {
                // 指针修改发生在这里
                curNode.next = p2;
                p2 = p2.next;
            }
            curNode = curNode.next;
        }
        // 跳出循环是因为 p1 == null 或者 p2 == null
        if (p1 == null) {
            curNode.next = p2;
        }
        if (p2 == null) {
            curNode.next = p1;
        }
        return dummyNode.next;
    }
}
```

#### 方法二：递归

**参考代码 2**：

```Java []
public class Solution {

    /**
     * 使用递归
     *
     * @param l1 有序链表
     * @param l2 有序链表
     * @return 有序链表
     */
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // 先写递归终止的条件
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        // 假设规模小的问题已经解决，如何建立和原始规模问题之间的关系
        if (l1.val < l2.val) {
            // l1 被选出，谁小谁在前面
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            // l2 被选出，谁小谁在前面
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```

我们在程序中添加一些打印输出语句。

**参考代码 3**：

```Java []
import java.util.List;

public class Solution {

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummyNode = new ListNode(-1);
        ListNode p1 = l1;
        ListNode p2 = l2;
        ListNode curNode = dummyNode;
        // 两者都不为空的时候，才有必要进行比较
        while (p1 != null && p2 != null) {
            if (p1.val < p2.val) {
                // 指针修改发生在这里
                curNode.next = p1;
                log(curNode, p1);
                p1 = p1.next;
            } else {
                // 指针修改发生在这里
                curNode.next = p2;
                log(curNode, p2);
                p2 = p2.next;
            }
            curNode = curNode.next;
        }
        // 跳出循环是因为 p1 == null 或者 p2 == null
        if (p1 == null) {
            curNode.next = p2;
            log(curNode, p2);
        }
        if (p2 == null) {
            curNode.next = p1;
            log(curNode, p1);
        }
        return dummyNode.next;
    }

    /**
     * 使用递归
     *
     * @param l1 有序链表
     * @param l2 有序链表
     * @return 有序链表
     */
    public ListNode mergeTwoListsByRecursion(ListNode l1, ListNode l2) {
        // 先写递归终止的条件
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        // 假设规模小的问题已经解决，如何建立和原始规模问题之间的关系
        if (l1.val < l2.val) {
            // l1 被选出，谁小谁在前面
            // 这里声明 res 不是必需的，仅仅只是为了打印输出方便
            ListNode res = mergeTwoListsByRecursion(l1.next, l2);
            l1.next = res;
            log(l1, res);
            return l1;
        } else {
            // l2 被选出，谁小谁在前面
            ListNode res = mergeTwoListsByRecursion(l1, l2.next);
            l2.next = res;
            log(l2, res);
            return l2;
        }
    }

    private void log(ListNode currNode, ListNode nextNode) {
        System.out.println("将结点 " + currNode.val + " 指向结点 " + nextNode.val);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums1 = new int[]{1, 3, 5};
        int[] nums2 = new int[]{2, 4, 6};
        ListNode listNode1 = new ListNode(nums1);
        ListNode listNode2 = new ListNode(nums2);

        System.out.println("循环：");
        ListNode res1 = solution.mergeTwoLists(listNode1, listNode2);
        System.out.println("结果：" + res1);

        ListNode listNode3 = new ListNode(nums1);
        ListNode listNode4 = new ListNode(nums2);
        System.out.println("递归：");
        ListNode res2 = solution.mergeTwoListsByRecursion(listNode3, listNode4);
        System.out.println("结果：" +res2);
    }
}
```

程序输出：

```
循环：
将结点 -1 指向结点 1
将结点 1 指向结点 2
将结点 2 指向结点 3
将结点 3 指向结点 4
将结点 4 指向结点 5
将结点 5 指向结点 6
结果：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
递归：
将结点 5 指向结点 6
将结点 4 指向结点 5
将结点 3 指向结点 4
将结点 2 指向结点 3
将结点 1 指向结点 2
结果：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
```

我们看到「循环」方法合并两个链表的操作是「从头到尾」的，而「递归」方法合并两个链表的操作恰恰相反。这个例子恰恰说明了循环和递归这两种方法的思考路径是不一样的：

+ 循环：自底向上，从一个问题最基本的样子开始，一点一点解决问题，直到完成任务；
+ 递归：自顶向下，先对原始问题进行拆分，直到不能拆分为止，再将子问题的结果一层一层返回，直到原问题得到了解决。

**注意**：递归的解法思考的难度要稍微小一点，这是因为**在上一层递归结束以后我们可以做一点事情，我们利用了递归函数的返回值简化了「穿针引线」的操作**，这其实也是「空间换时间」思想带给我们的遍历。这一点请大家细心体会。

## 例 2：「力扣」第 206 题：反转链表

反转一个单链表。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

**进阶:**
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

+ 如果我们考虑修改结点的指向操作，需要使用三个变量 `preNode`、`curNode` 和 `nextNode`，还需要想清楚修改结点指向的先后顺序；
+ 如果我们结合递归函数的语义完成链表的反转，就需要紧密结合递归函数的语义。

**思路分析**：我们依然是先给出代码，请大家先结合参考代码比较两种方法的异同。

#### 方法一：穿针引线

**参考代码 1**：

```Java []
public class Solution {

    public ListNode reverseList(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return head;
        }

        ListNode preNode = null;
        ListNode curNode = head;
        while (curNode != null) {
            ListNode nextNode = curNode.next;
            curNode.next = preNode;
            preNode = curNode;
            curNode = nextNode;
        }
        return preNode;
    }
}
```

#### 方法二：递归

```Java []
public class Solution {

    public ListNode reverseList(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return head;
        }

        ListNode nextNode = head.next;
        ListNode newNode = reverseList(nextNode);
        nextNode.next = head;
        // 这里不要忘记切断引用，否则会出现错误：Error - Found cycle in the ListNode
        head.next = null;
        return newNode;
    }
}
```

我们学习了「例 1」，就知道了：

+ 「穿针引线」迭代的方法从链表的头部开始反转链表，而「递归」的方法，从链表的尾部开始反转链表；
+ 由于在「递归函数」结束以后还可以处理一些逻辑，具体来说，递归调用栈里记录了一些有用的信息（包括递归函数的返回值），就方便我们进行相关逻辑的处理。

## 总结

在「力扣」很多链表的问题都可以同时使用「递归」和「迭代」完成，大家可以根据我们这一节介绍的方法，比较它们实现上的差异。

## 练习

提示：下面这些链表问题既可以使用「递归」做，也可以使用「循环」做。能实现其中一种方案，可解释性好就可以，没有必要追求某个问题一定要使用某个特定的方法实现。

1. 完成「力扣」第 203 题：移除链表元素（简单）
2. 完成「力扣」第 24 题：两两交换链表中的节点（中等）；
3. 完成「力扣」第 143 题：重排链表（中等）；
4. 完成「力扣」第 92 题：反转链表 II（中等）。