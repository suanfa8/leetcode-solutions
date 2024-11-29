# 第 2 节 数据结构 - 栈


![image.png](https://pic.leetcode-cn.com/1612150162-rhKxZd-image.png)


---

## 深度优先遍历的两种实现方式


在深度优先遍历的过程中，需要将 **当前遍历到的结点** 的相邻结点 **暂时保存** 起来，以便在回退的时候可以继续访问它们。遍历到的结点的顺序呈现「后进先出」的特点，因此 **深度优先遍历可以通过「栈」实现**。

再者，深度优先遍历有明显的递归结构。我们知道支持递归实现的数据结构也是栈。因此实现深度优先遍历有以下两种方式：

+ 编写递归方法；
+ 编写栈，通过迭代的方式实现。

![image.png](https://pic.leetcode-cn.com/1608890373-CFNdrG-image.png)

---

## 二叉树三种遍历方式的非递归实现

我们通过例题的方式向大家展现一种使用栈模拟的二叉树深度优先遍历的过程。但是要向大家说的是：

+ 并不是所有的递归（深度优先遍历）的问题都可以很方便地使用「栈」实现，了解非递归实现可以作为编程练习；
+ 虽然「递归调用」在一些编程语言中会造成系统资源开销，性能不如非递归好，还有可能造成「栈溢出」的风险，但是 **在工程实践** 中，递归方法的可读性更强，更易于理解和以后的维护，因此没有必要苛求必需要将递归方法转换成为非递归实现。

### 例 1：「力扣」第 144 题：[二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)（简单）

给你二叉树的根节点 `root` ，返回它节点值的 **前序** 遍历。

（这里省略示例。）

**提示**：

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

**进阶**：递归算法很简单，你可以通过迭代算法完成吗？

---

**思路分析**：递归方法相信大家都会。这里介绍使用栈模拟递归的过程。

对于二叉树的遍历，每一个结点有两种处理方式：

+ 输出该结点；
+ 递归处理该结点。

我们可以在结点存入栈的时候附加一个「指令信息」，`ADDTORESULT` 表示输出该结点（添加到结果集），`GO` 表示递归处理该结点。在栈顶元素的弹出的时候，读取「指令信息」，遇到 `GO` 的时候，就将当前结点的左、右孩子结点按照「前序遍历」（根 -> 左 -> 右）的「倒序」的方式压入栈中。

「倒序」是因为栈处理元素的顺序是「后进先出」，弹栈的时候才会按照我们想要的顺序输出到结果集。

读者可以结合下面的参考代码理解这种使用「栈」模拟了递归（深度优先遍历）的思想。

**注意**：

+ 使用栈模拟递归实现的方式并不唯一，这里介绍的栈模拟的方法可以迁移到「力扣」第 94 题（二叉树的中序遍历）和「力扣」第 145 题（二叉树的后序遍历），例 2 和例 3 我们不再过多描述；
+ 感兴趣的朋友还可以参考这些问题的官方题解了解更多使用栈模拟深度优先遍历的实现。

**参考代码 1**：递归

```Java []
import java.util.ArrayList;
import java.util.List;


public class Solution {

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }

    private void dfs(TreeNode treeNode, List<Integer> res) {
        if (treeNode == null) {
            return;
        }
        res.add(treeNode.val);
        dfs(treeNode.left, res);
        dfs(treeNode.right, res);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 为二叉树的结点总数；
+ 空间复杂度：$O(N)$，栈的深度为需要使用的空间的大小，极端情况下，树成为一个链表的时候，栈的深度达到最大。

**参考代码 2**：使用栈模拟

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class Solution {

    private enum Action {
        /**
         * 如果当前结点有孩子结点（左右孩子结点至少存在一个），执行 GO
         */
        GO,
        /**
         * 添加到结果集（真正输出这个结点）
         */
        ADDTORESULT
    }

    private class Command {
        private Action action;
        private TreeNode node;

        /**
         * 将动作类与结点类封装起来
         *
         * @param action
         * @param node
         */
        public Command(Action action, TreeNode node) {
            this.action = action;
            this.node = node;
        }
    }

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Deque<Command> stack = new ArrayDeque<>();
        stack.addLast(new Command(Action.GO, root));
        while (!stack.isEmpty()) {
            Command command = stack.removeLast();
            if (command.action == Action.ADDTORESULT) {
                res.add(command.node.val);
            } else {
                // 特别注意：以下的顺序与递归执行的顺序反着来，即：倒过来写的结果
                // 前序遍历：根结点、左子树、右子树、
                // 添加到栈的顺序：右子树、左子树、根结点
                if (command.node.right != null) {
                    stack.add(new Command(Action.GO, command.node.right));
                }
                if (command.node.left != null) {
                    stack.add(new Command(Action.GO, command.node.left));
                }
                stack.add(new Command(Action.ADDTORESULT, command.node));
            }
        }
        return res;
    }
}
```

**复杂度分析**：（同参考代码 1）。

**说明**：在理解了例 1 以后，例 2 和 例 3 可以类似地完成，我们不再对例 2 和例 3 进行详解、对复杂度展开分析，只给出参考代码。


### 例 2：「力扣」第 94 题：二叉树的中序遍历（中等）

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

（这里省略示例。）

**提示：**

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

**参考代码 1**：递归

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }

    private void dfs(TreeNode node, List<Integer> res) {
        if (node == null) {
            return;
        }
        dfs(node.left, res);
        res.add(node.val);
        dfs(node.right, res);
    }
}
```

**参考代码 2**：使用栈模拟


```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class Solution {

    private enum Action {
        /**
         * 如果当前结点有孩子结点（左右孩子结点至少存在一个），执行 GO
         */
        GO,
        /**
         * 添加到结果集（真正输出这个结点）
         */
        ADDTORESULT
    }

    private class Command {
        private Action action;
        private TreeNode node;

        /**
         * 将动作类与结点类封装起来
         *
         * @param action
         * @param node
         */
        public Command(Action action, TreeNode node) {
            this.action = action;
            this.node = node;
        }
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Deque<Command> stack = new ArrayDeque<>();
        stack.addLast(new Command(Action.GO, root));
        while (!stack.isEmpty()) {
            Command command = stack.removeLast();
            if (command.action == Action.ADDTORESULT) {
                res.add(command.node.val);
            } else {
                // 特别注意：以下的顺序与递归执行的顺序反着来，即：倒过来写的结果
                // 中序遍历：左子树、根结点、右子树、
                // 添加到栈的顺序：右子树、根结点、左子树
                if (command.node.right != null) {
                    stack.add(new Command(Action.GO, command.node.right));
                }
                stack.add(new Command(Action.ADDTORESULT, command.node));
                if (command.node.left != null) {
                    stack.add(new Command(Action.GO, command.node.left));
                }
            }
        }
        return res;
    }
}
```

### 例 3：「力扣」第 145 题：二叉树的后序遍历（中等）

给定一个二叉树，返回它的 *后序* 遍历。

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

**参考代码 1**：递归

```Java []
import java.util.ArrayList;
import java.util.List;


public class Solution {

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }

    private void dfs(TreeNode node, List<Integer> res) {
        if (node == null) {
            return;
        }
        dfs(node.left, res);
        dfs(node.right, res);
        res.add(node.val);
    }
}
```


**参考代码 2**：使用栈模拟

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    private enum Action {
        /**
         * 如果当前结点有孩子结点（左右孩子结点至少存在一个），执行 GO
         */
        GO,
        /**
         * 添加到结果集（真正输出这个结点）
         */
        ADDTORESULT
    }

    private class Command {
        private Action action;
        private TreeNode node;

        /**
         * 将动作类与结点类封装起来
         *
         * @param action
         * @param node
         */
        public Command(Action action, TreeNode node) {
            this.action = action;
            this.node = node;
        }
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Deque<Command> stack = new ArrayDeque<>();
        stack.addLast(new Command(Action.GO, root));
        while (!stack.isEmpty()) {
            Command command = stack.removeLast();
            if (command.action == Action.ADDTORESULT) {
                res.add(command.node.val);
            } else {
                assert command.action == Action.GO;
                // 特别注意：以下的顺序与递归执行的顺序反着来，即：倒过来写的结果
                // 后序遍历：左子树、右子树、根结点
                // 添加到栈的顺序：根结点、右子树、左子树
                stack.addLast(new Command(Action.ADDTORESULT, command.node));
                if (command.node.right != null) {
                    stack.addLast(new Command(Action.GO, command.node.right));
                }
                if (command.node.left != null) {
                    stack.addLast(new Command(Action.GO, command.node.left));
                }
            }
        }
        return res;
    }
}
```

---


## 

---


## 练习

> 友情提示：对于多叉树而言，没有中序遍历，这是因为结点的孩子结点有若干个，无法统一规定根结点与孩子结点的遍历先后顺序。但也正是因为没有中序遍历，只存在根结点和孩子结点谁先输出和谁先递归处理的问题，用栈进行模拟其实相对简单。

1. 完成「力扣」第 589 题：N叉树的前序遍历（简单）；
2. 完成「力扣」第 590 题：N叉树的后序遍历（简单）。

---

## 总结

+ 深度优先遍历通过「栈」实现；
+ 深度优先遍历符合「后进先出」规律，可以借助「栈」实现；
+ 深度优先遍历有明显的「递归」结构，递归也是借助「栈」实现的；
+ 因此深度优先遍历一般通过「递归」实现，底层借助了「栈」这个数据结构作为支持；
+ 栈虽然结构（数组或者链表）和规则定义简单（后进先出），但是它在算法的世界里发挥了巨大的作用；
+ 比较递归与非递归实现：我们用一张表格来比较「递归」和「栈」实现「深度优先遍历」的优缺点。


|      | 递归                                                         | 栈模拟                                                       |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | 编码容易、可读性强、易于维护。                               | 执行效率较高。                                               |
| 缺点 | 递归方法逐层调用函数会产生一定性能消耗，如果递归深度较深，可能会抛出 `StackOverflow` 异常。 | 不是所有的递归都可以很容易地通过模拟栈来实现。显式编写栈的代码较难理解，不易于维护。 |

在实际应用中，相对重要的是代码的可读性和易于维护性。在「力扣」上的绝大多数使用深度优先遍历实现的问题，我们都建议大家采用递归的方式实现。