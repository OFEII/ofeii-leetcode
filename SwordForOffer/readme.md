#### 

## **数据结构类题目**

### **LinkedList**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
```



#### 面试题06-从尾到头打印链表

```js
var reversePrint = function(head) {
    let res = []
    while(head){
        res.push(head.val)
        head = head.next
    }
    return res.reverse()
};
//因为链表 this.next = null
//while 如果head存在即链表存在，push进数组，右移head = head.next 直到next为null
```



#### 面试题22-链表中倒数第k个结点

#### 面试题24-反转链表

#### 面试题25-合并两个排序的链表

#### 面试题35-复杂链表的复制

#### 面试题52-两个链表的第一个公共节点

#### 面试题18-删除链表的节点



### **Tree**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
```

#### 面试题07-重建二叉树

```js
var buildTree = function(preorder, inorder) {
    if(!preorder.length||!inorder.length){
        return null
    }
    const rootVal = preorder[0]
    const node = new TreeNode(rootVal)
    let i = 0// i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
    for(;i<inorder.length;++i){
        if(inorder[i] === rootVal){
            break
        }
    }
    node.left = buildTree(preorder.slice(1,i+1),inorder.slice(0,i))
    node.right = buildTree(preorder.slice(i+1),inorder.slice(i+1))
    return node
};
// 递推参数： 前序遍历中根节点的索引pre_root、中序遍历左边界in_left、中序遍历右边界in_right。
// 终止条件： 当 in_left > in_right ，子树中序遍历为空，说明已经越过叶子节点，此时返回 nullnull 。
// 递推工作：
// 建立根节点root： 值为前序遍历中索引为pre_root的节点值。
// 搜索根节点root在中序遍历的索引i： 为了提升搜索效率，本题解使用哈希表 dic 预存储中序遍历的值与索引的映射关系，每次搜索的时间复杂度为 O(1)O(1)。
// 构建根节点root的左子树和右子树： 通过调用 recur() 方法开启下一层递归。
// 左子树： 根节点索引为 pre_root + 1 ，中序遍历的左右边界分别为 in_left 和 i - 1。
// 右子树： 根节点索引为 i - in_left + pre_root + 1（即：根节点索引 + 左子树长度 + 1），中序遍历的左右边界分别为 i + 1 和 in_right。
// 返回值： 返回 root，含义是当前递归层级建立的根节点 root 为上一递归层级的根节点的左或右子节点。
```

#### 面试题26-树的子结构



#### 面试题27-二叉树的镜像

#### 面试题32-1 -从上往下打印二叉树

#### 面试题32-2 -从上往下打印二叉树 2

#### 面试题32-3 -从上往下打印二叉树 3

#### 面试题33-二叉搜索树的后序遍历序列

#### 面试题34-二叉树中和为某一值的路径

#### 面试题36-二叉搜索树与双向链表

#### 面试题55-1-二叉树的深度

#### 面试题55-2-平衡二叉树

#### 面试题28-对称的二叉树

#### 面试题37-序列化二叉树

#### 面试题54-[二叉搜索树的第k大节点](https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof)



### **Stack & Queue**

#### 面试题09-用两个栈实现队列

```js
var CQueue = function() {
    this.inStack =[]
    this.outStack =[]

};
CQueue.prototype.appendTail = function(value) {
    this.inStack.push(value)
};
CQueue.prototype.deleteHead = function() {
    const { inStack, outStack } = this
    if(outStack.length){
        return outStack.pop()
    }else{
        while(inStack.length){
            outStack.push(inStack.pop())
        }
        return outStack.pop()||-1
    }
};
```



#### 面试题30-[包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof)

#### 面试题31-栈的压入、弹出序列

#### 面试题58-1-翻转单词顺序

#### 面试题59-1-滑动窗口的最大值



### **Heap**

#### 面试题40-最小的K个数



### **Hash Table**

#### 面试题50-第一个只出现一次的字符



### **图**

#### 面试题12-矩阵中的路径(BFS)

```js
// 我们从第一个网格开始依次遍历整个board。对于每一个网格我们都执行dfs，如果不满足word的要求，我们回溯尝试其他可能。 为了防止无限循环，我们需要记录当前DFS链路中已经访问的元素，我们不妨使用一个visited的集合。

function DFS(board, row, col, rows, cols, word, cur) {
  // 边界检查
  if (row >= rows || row < 0) return false;
  if (col >= cols || col < 0) return false;

  const item = board[row][col];

  if (item !== word[cur]) return false;

  if (cur + 1 === word.length) return true;

  // If use HashMap keep track visited letters, then need manual clear HashMap for each backtrack which needs extra space.
  // here we use a little trick
  board[row][col] = null;

  // UP, DOWN, LEFT, RIGHT
  const res =
    DFS(board, row + 1, col, rows, cols, word, cur + 1) ||
    DFS(board, row - 1, col, rows, cols, word, cur + 1) ||
    DFS(board, row, col - 1, rows, cols, word, cur + 1) ||
    DFS(board, row, col + 1, rows, cols, word, cur + 1);

  board[row][col] = item;

  return res;
}
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  if (word.length === 0) return true;
  if (board.length === 0) return false;

  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const hit = DFS(board, i, j, rows, cols, word, 0);
      if (hit) return true;
    }
  }
  return false;
};
//dfs
```





#### 面试题13-机器人的运动范围(DFS)

```js
// 和普通 BFS 相比，有两点不同：
// 需要调用 bitSum 来检查数位之和
// 因为从左上角开始遍历，因此只需要遍历「右」和「下」这两个方向
var movingCount = function(m, n, k) {
    let res = 0;
    const directions = [
        [1, 0],
        [0, 1]
    ];
    const queue = [[0, 0]];
    const visited = {
        "0-0": true
    }; // 标记 (x,y) 是否被访问过

    while (queue.length) {
        const [x, y] = queue.shift();
        //  (x, y) 的数位之和不符合要求
        // 题目要求节点每次只能走1格，所以无法从当前坐标继续出发
        if (bitSum(x) + bitSum(y) > k) {
            continue;
        }
        ++res;

        for (const direction of directions) {
            const newx = direction[0] + x;
            const newy = direction[1] + y;
            if (
                !visited[`${newx}-${newy}`] &&
                newx >= 0 &&
                newy >= 0 &&
                newx < m &&
                newy < n
            ) {
                queue.push([newx, newy]);
                visited[`${newx}-${newy}`] = true;
            }
        }
    }

    return res;
};

function bitSum(n) {
    let res = 0;
    while (n) {
        res = res + (n % 10);
        n = Math.floor(n / 10);
    }
    return res;
}
```



## **具体算法类题目**

### **斐波那契数列**

#### 面试题10-1-斐波拉契数列

```js
var fib = function(n) {
    let arr =[0,1]
    let modNum = 1e9+7
    for(let i =2;i<n+1;i++){
        arr.push(arr[i-1]%modNum +arr[i-2]%modNum)
    }
    return arr[n]%modNum
};
//dp[n] = dp[n-1] +dp[n-2]
// 状态定义： 设 dp 为一维数组，其中 dp[i]dp[i] 的值代表 斐波那契数列第 ii 个数字 。
// 转移方程：dp[i+1]=dp[i]+dp[i−1] ，即对应数列定义f(n+1)=f(n)+f(n−1) ；
// 初始状态： dp[0]=0, dp[1]=1 ，即初始化前两个数字；
// 返回值： dp[n] ，即斐波那契数列的第 n 个数字。
```



#### 面试题10-2-青蛙跳台阶问题

```js
var numWays = function(n) {
    let modNum = 1e9+7
    // let dp = new Array(n+1).fill(0)
    let dp=[1,1,2]
    for(let i =3;i<n+1;i++){
        dp[i]=(dp[i-1]+dp[i-2])%modNum
    }
    return dp[n]

};
//dp[i] = dp[i-1] +dp[i-1]
```



### **搜索算法**

#### 面试题03 数组中重复的数字

```js
var findRepeatNumber = function (nums) {
   const set = new Set()
   for (let i = 0; i < nums.length; i++) {
     if (set.has(nums[i])) return nums[i]
     set.add(nums[i])
   }
   return 0
 }
//利用set数组存储唯一的值
//遍历一遍 如果已经在数组里面return nums[i] 即重复数字
//Set.has返回一个布尔值，表示该值是否为Set的成员
//Set.add添加某个值，返回 Set 结构本身
//Set.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
//Set.clear()：清除所有成员，没有返回值
```

#### 面试题04-二维数组中的查找

```js
var findNumberIn2DArray = function(matrix, target) {
    return matrix.map(e=>e.includes(target)).includes(true)
};
//map 遍历二维数组的 对每个数组用includes方法返回一个布尔值
// return 由布尔值组成的数组是否有true
```

#### 面试题11-旋转数组的最小数字（二分查找）

```js
var minArray = function(numbers) {
    // return Math.min(...numbers)
    let l =0
    let r =numbers.length-1
    while(l<r){
        let mid = Math.floor((r + l) >>1)
        if(numbers[mid]>numbers[r]){
            l = mid+1
        }else if(numbers[mid] < numbers[r]){
            r=mid
        }else{
            r--
        }
    }
    return numbers[l]
};
//搜索算法-二分搜索
// l=0 r=n-1
//while(l<r) 如果l<r let mid = r+l>>1 
// 如果n[mid]>n[r] 中间值比右边大 左边=mid+1 缩小范围
// 如果n[mid]<n[r] 中间值比右边小 右边=mid 缩小范围
//如果n[mid]==n[r] r--
// 最后返回旋转点即n[l]==n[r]
```



#### 面试题56-1-数组中数字出现的次数（二分查找）



### **全排列**

#### 面试题38-字符串的排列

### 贪心

#### 面试题14- I. 剪绳子

### **动态规划**

#### 面试题14- I. 剪绳子

```js
var cuttingRope = function(n) {
    const dp = new Array(n + 1).fill(1)
    for(let i =3;i<=n;i++){
        for(let j =1;j<i;j++){
            dp[i]=Math.max(dp[i],j*(i-j),j*dp[i-j])
        }
    }
    return dp[n]
};
// 解法 1: 动态规划
// 状态数组dp[i]表示：数字 i 拆分为至少两个正整数之和的最大乘积。为了方便计算，dp 的长度是 n + 1，值初始化为 1。

// 显然dp[2]等于 1，外层循环从 3 开始遍历，一直到 n 停止。内层循环 j 从 1 开始遍历，一直到 i 之前停止，它代表着数字 i 可以拆分成 j + (i - j)。但 j * (i - j)不一定是最大乘积，因为i-j不一定大于dp[i - j]（数字i-j拆分成整数之和的最大乘积），这里要选择最大的值作为 dp[i] 的结果。

// 空间复杂度是 O(N)，时间复杂度是 O(N^2)
```

#### 面试题42-连续子数组的最大和

#### 面试题19-正则表达式匹配(我用的暴力)





### **回溯**

#### 面试题12-矩阵中的路径(BFS)

#### 面试题13-机器人的运动范围(DFS)



### **排序**

#### 面试题51-数组中的逆序对(归并排序)

#### 面试题40-最小的K个数(堆排序)



### **位运算**

#### 面试题15-二进制中1的个数

#### 面试题16-数值的整数次方



### **其他算法**

#### 面试题05-替换空格 (正则replace)

```js
var replaceSpace = function(s) {
    let res = s.replace(/\s/g,"%20")
    return res
};
// reg正则表达式替换replace
```



#### 面试题21-调整数组顺序使奇数位于偶数前面

#### 面试题39-数组中出现次数超过一半的数字

#### 面试题43- 1～n整数中1出现的次数

#### 面试题45-把数组排成最小的数

#### 面试题49-丑数

#### 面试题57-2-和为S的连续正数序列(滑动窗口思想)

#### 面试题57-和为S的两个数字(双指针思想)

#### 面试题58-2-左旋转字符串(矩阵翻转)

#### 面试题62-圆圈中最后剩下的数(约瑟夫环)

#### 面试题66-构建乘积数组

