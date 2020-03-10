![img](https://assets.leetcode-cn.com/aliyun-lc-upload/users/ofeii/avatar_1582869561.png)

# [每日一题ep01:queue=>stack(JavaScript)](https://leetcode-cn.com/problems/implement-stack-using-queues/solution/mei-ri-yi-ti-ep01queuestackjavascript-by-ofeii/)

### 解题思路

**栈**(stack) ,它是一种受限的线性表,**后进先出**(LIFO, last in first out)
其限制是仅允许在表的一端进行插入和删除运算，这一端称为栈顶,另一端为栈底。
向一个栈插入新元素为进栈,使其成为新的栈顶元素。
从一个栈删除元素为出栈，使其相邻的元素成为新的栈顶元素。

**队列**(Queue),它是一种受限的线性表,**先进先出**(FIFO, First In First Out)
只允许在表的前端(front)进行删除操作,而在表的后端(rear)进行插入操作。

鉴于JS中没有stack和queue，所以调用**数组API**来实现。
注意到**对一个空的栈不会调用 pop 或者 top 操作**,所以在pop和top中都加入一个!this.empty()的判断。

### 代码

```js
var MyStack = function() {
    this.stack =[]

};

MyStack.prototype.push = function(x) {
    this.stack.push(x)
};

MyStack.prototype.pop = function() {
    if(!this.empty()){
        return this.stack.pop()
    }
};

MyStack.prototype.top = function() {
    if(!this.empty()){
       return this.stack[this.stack.length - 1] 
    } 
};

MyStack.prototype.empty = function() {
    return this.stack.length === 0
};
```

😎

# [每日一题ep02: reverseList反转链表(JavaScript)](https://leetcode-cn.com/problems/reverse-linked-list/solution/mei-ri-yi-ti-ep02-reverselistfan-zhuan-lian-biao-j/)

### 解题思路

**递归法**
利用**递归**将 next 进行反转链表，当前节点=head.next.
时间复杂度: O(n). n-1 层递归，每层时间复杂度均为 O(1)
空间复杂度: O(n). n-1 层递归

### 代码

```js
var reverseList = function(head) {
    if(!head||!head.next){
        return head
    }
    let next = head.next //next ->reversed ->head.next
    let rHead = reverseList(next)
    head.next = null //cut head
    next.next = head //back to front
    return rHead
};
```

😀



## [每日一题ep03: Merge Sorted Array合并排序的数组(JavaScript)](https://leetcode-cn.com/problems/sorted-merge-lcci/solution/mei-ri-yi-ti-ep03-merge-sorted-arrayhe-bing-pai-xu/)

### 解题思路

**一、合并数组排序**
**splice+sort**(splice会改变原数组，slice不会修改数组)

**二、双指针归并**

1. **比较A[m-1]B[n-1] ➡ A[m+n-1]=较大数 ➡ 指针向前移动 m--/n--**
   (compare A[m-1] with B[n-1] ➡ select A[]max ➡ A[m+n-1] ➡move m/n pointer front)
2. **如果m为0而n不为0 ➡ 将B中的元素直接移动A**
   (if m==0 && n!=0 ➡ B move to A/A[]=B[])

**⚠**：不能修改A的引用即**return A**(可省略)

### 代码

```js
//1.合并数组排序
var merge = function(A, m, B, n) {
    A.splice(m, A.length,...B)
    A.sort((a, b) => a - b)
}
//2.双指针归并
var merge = function(A, m, B, n) {
    while(m>0 && n>0){
        A[m+n-1] = A[m-1]>B[n-1] ? A[m-- -1] : B[n-- -1]
    }
    while(n>0){
        A[n-1] = B[n-- -1]
    }
}
```

😂

## [每日一题ep04: rotted orange🍊腐烂橘子(JavaScript)](https://leetcode-cn.com/problems/rotting-oranges/solution/mei-ri-yi-ti-ep04-rotted-orangefu-lan-ju-zi-javasc/)

### 解题思路

**方法一：枚举 + 广度优先搜索BFS**
广度优先搜索BFS（Breadth First Search），就是从**起点出发**，每次都尝试访问**同一层的节点**，如果同一层都访问完了，再访问**下一层**，最后广度优先搜索找到的路径就是从起点开始的**最短合法路径**。

**上下左右相邻**的新鲜**🍊**=一个腐烂🍊尝试访问的**同一层的节点**
**路径长度**=新鲜🍊被**腐烂的时间**
对每一个bad🍊进行BFS

**方法二：多源广度优先搜索BFS**
**超级源点**

### 代码

```js
var orangesRotting = function(grid) {
    let times = 0,
        cnt = 0, // fresh oranges counter🍊
        queue = []
    //inital organe queue , good->record cnt, bad->push into a queue
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 2) queue.push( [i, j, 0] ) // 3rd rot time=0
        if (grid[i][j] === 1) cnt++
      }
    }
    
    //run rot function
    while (queue.length ) {
      let curr = queue.shift()  // delete and return 1st element of queue
      times = curr[2] //rot time
      rot(curr[0], curr[1], curr[2])
    }
    // create a "rot" function
    function rot(row, col, t) {
      // 4 direction
      let d = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];
      for (let i = 0; i < 4; i++) {
        let r = row + d[i][0]
        let c = col + d[i][1]
        // r!∈(0,row) c!∈(0,col)  grid[r][c] !== 1 ->continue(pass)
        // else grid[r][c]=2 (good orange rot)-> cnt-- 
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== 1) {
            continue
        }else{
            grid[r][c] = 2
            cnt--
            queue.push( [r, c, t+1] )
        }
      }
    }
    
    return cnt > 0 ? -1 : times
  }
```

🍊

# [每日一题ep05: divide candy🍬分糖果 II(JavaScript/js)](https://leetcode-cn.com/problems/distribute-candies-to-people/solution/mei-ri-yi-ti-ep05-divide-candyfen-tang-guo-iijavas/)

### 解题思路

**一、暴力法** **（😄easy）**
**不断遍历数组** 如果🍬**不为0**则一直**分**
**空间**复杂度 **O(1)** 除了结果只需用常数空间来存储变量
**时间**复杂度 **O(max(sqrt(G),N))**，G为糖果数量，N为人数
1.等差求和公式(s+1)s/2 >=G➡ s^2+s >=2G ➡ s<=sqrt(2G) ➡O(sqrt(G))
2.建立糖果分配组需要时间O(N)

**二、数学公式法**😵
**look at 👀 the detail code below👇**

### 代码

```js
//一、暴力法
var distributeCandies = function(candies, num_people) {
    let res = new Array(num_people).fill(0)
    let i = 0
    while(candies !=0){
        res[i%num_people]+= Math.min(i+1,candies)
        candies -= Math.min(i+1, candies)
        i++
    }
    return res
}
//二、数学公式法
var distributeCandies = function(candies, num_people) {
    let n = num_people //人数n
    let p = Math.floor((2 * candies + 0.25)**0.5 - 0.5)//获得完整🍬的人数p
    let r = Math.floor(candies - (p + 1) * p * 0.5)//剩余🍬数量r
    let res = new Array(n).fill(0)
    let rows = Math.floor(p/n)//完整的分发回合数
    let cols = p%n // 如果rows<0 cols为unlucky guy
    for (let i = 0; i < n; i++) {
        res[i] = (i+1)*rows + Math.floor(rows * (rows - 1) * 0.5) * n //complete rows
        if(i<cols) res[i] += i+1+rows*n //cols in the last row
    }
    res[cols] += r //remaining 🍬
    return res
}
```

# [每日一题ep06: continuous sequence🔲和s的连续正序列 (JavaScript/js)](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/solution/mei-ri-yi-ti-ep06-continuous-sequencehe-sde-lian-x/)

### 解题思路

**一、滑动窗口法**😆
滑动窗口🔲(左开右闭区间，设左端点l,右端点r)
滑动窗口最重要的性质:窗口的左边界和右边界只能向右移动(时间复杂度O(n))
look at 👀 the detail code below👇

**二、数学公式法**😵
等差求和...

### 代码

```javascript
var findContinuousSequence = function(target) {
    let l = 1 //left edge of sliding window
    let r = 1 //right edge of sliding window
    let sum = 0 //store the sum of window
    let res =[]
    while(l<=Math.round(target/2)){
        if(sum===target){ 
            let temp = [] //temp arr to store
            for(let i=l;i<r;i++){
                temp.push(i)
            }
            res.push(temp)
            sum -=l
            l++               //l slide to right
        }else if(sum>target){ //l slide to right
            sum -= l
            l++
        }else if(sum<target){ // r slide to right
            sum += r
            r++
        }
   }
    return res 
}
```

# [每日一题ep07: MaxQueue🔢队列最大值 (JavaScript/js)](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/solution/mei-ri-yi-ti-ep07-maxqueuedui-lie-zui-da-zhi-javas/)

### 解题思路

**一、数组法**😊
**定义**一个**队列**并实现**函数max_value** 得到**队列里的最大值**🔢
**⚠**函数max_value、push_back 和 pop_front 的**时间复杂度都是O(1)**

**pop_front的时间复杂度为何为O(1)？**--**均摊时间复杂度**

- 假设数组长度为n
- 只有当pop_front的值为maxVal最大值时才需Math.max 复杂度O(n)
- 其余情况下为O(1)
- 均摊下来 n*1+n/(n+1) = 2n/(n+1) -> 故为O(1)

### 代码

```js
// 建立一个队列数组 maxVal用于存储最大值
var MaxQueue = function() { 
    this.queue = []
    this.maxVal = -Infinity
};
// 数组不存在即队列为空返回-1 否则返回最大值maxVal
MaxQueue.prototype.max_value = function() {
    if(!this.queue.length) return -1
    return this.maxVal
};
//入队push 比较入队的值与maxVal 大则更新maxVal
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value)
    if(value>this.maxVal) this.maxVal = value
};
// 出队shift 返回数组第一个删除元素 如果删除数为最大值则需比较剩余数组中的最大值并更新
MaxQueue.prototype.pop_front = function() {
    if(!this.queue.length) return -1
    let val = this.queue.shift()
    if(val === this.maxVal) this.maxVal = Math.max(...this.queue)
    return val
};
```

# [每日一题ep08: coinChange💰队列最大值 (JavaScript/js)](https://leetcode-cn.com/problems/coin-change/solution/mei-ri-yi-ti-ep08-coinchangedui-lie-zui-da-zhi-jav/)

### 解题思路

一、动态规划法💰

### 代码

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = new Array(amount+1).fill(Infinity)
  dp[0] = 0
  for (let coin of coins ) {
    for (let i = 1; i <= amount; i++) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

#  [每日一题ep09: maxProfit📈股票最大利润💸 (JavaScript/js)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/mei-ri-yi-ti-ep08-maxprofitgu-piao-zui-da-li-run-j/)

### 解题思路

**方法一：暴力法**
数组中两个数字的最大差值即为**最大利润maxprofit**
比较差值求出**max(prices[j] - prices[i])** **(j > i)**
**时间复杂度**:**O(n^2)**,循环运行n(n-1)/2次
**空间复杂度**:**O(1)**,只使用了常数个变量

**方法二：一次遍历法** 📈**低买高卖才能赚钱**💸 😎
一个变量**minprice**存储 **历史最低价**
一个变量**max**存储 **最大利润**
第 i 天卖出股票能得到的利润就是 prices[i] - minprice
最大利润为 **max(prices[i] - minprice)**
**时间复杂度**:**O(n)**
**空间复杂度**:**O(1)**

**方法三：动态规划dp法**
**core:**
dp[i] = max(0, dp[i−1] + diff[i])
max = max(max, dp[i])

### 代码

```js
// 方法一：暴力法
var maxProfit = function(prices) {
    let max = 0
    for(let i =0;i<prices.length-1;i++){
        for (let j = i+1; j < prices.length; j++) {
            let p = prices[j]-prices[i]
            if(p > max) max = p
        }
    } 
    return max
};
// 方法二：一次遍历法
var maxProfit = function(prices) {
    let minprice = Number.MAX_SAFE_INTEGER
    let max = 0
    for(let i = 0;i<prices.length;i++){
        if(prices[i]<minprice){
            minprice = prices[i]
        }else{
            max = Math.max(max,prices[i]-minprice)
        }
    }
    return max
}
// 方法三：dp粗糙版
var maxProfit = function(prices) {
    if(prices.length<=1) return 0
    let diff = []
    for (let i = 0; i < prices.length-1; i++) {
        diff[i] = prices[i+1] -prices[i]
    }

    let dp = new Array(prices.length).fill(0)
    dp[0] = Math.max(0,diff[0])
    let max = dp[0]
    for (let i = 1; i < diff.length; i++) {
        dp[i] = Math.max(0, dp[i-1]+diff[i])
        max = Math.max(max,dp[i])
    }
    return max
}
// 方法三：dp优化版
var maxProfit = function(prices) {
    let last = 0
    let max = 0
    for (let i = 0; i < prices.length-1; i++) {
        last = Math.max(0, last + prices[i+1]-prices[i])
        max = Math.max(max,last)
    }
    return max
}
```

# [每日一题ep10: 🍴🍴🌳d of binarytree二叉树的直径 (JavaScript/js)](https://leetcode-cn.com/problems/diameter-of-binary-tree/solution/mei-ri-yi-ti-ep10-d-of-binarytreeer-cha-shu-de-zhi/)

### 解题思路

### 一、DFS 递归法

经过一个node，其**左右子树的最大深度之和 + 1**（二叉树的根节点深度为0）
定义一个**递归函数 depth(node)**
计算 node 为起点的 **路径经过节点数 res**
函数返回该节点为 **根的子树的深度**

**时间复杂度：O(n)** n为**二叉树的节点** 遍历n
**空间复杂度：O(Height)** 常数变量 递归的深度为**二叉树的高度**

### 代码

```js
var diameterOfBinaryTree = function(root) {
    let res = 0
    depth(root)
    return res
    function depth (node) {
        if (!node) return 0 // 节点不存在返回0
        let left = depth(node.left) // left为左子树的深度
        let right = depth(node.right)//right 为右子树的深度
        res = Math.max(left + right, res) //计算l+r 更新res
        return Math.max(left, right)+1 //返回该节点为根的子树的深度
    }
};
```