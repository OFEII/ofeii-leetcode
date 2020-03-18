### hash

哈希表（Hash Table，也叫散列表），是根据键（Key）而直接访问在内存存储位置的数据结构。也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做哈希函数，存放记录的数组称做哈希表。

哈希表是使用 O(1) 时间进行数据的插入删除和查找，但是哈希表不保证表中数据的有序性，这样在哈希表中查找最大数据或者最小数据的时间是 O(N) 实现。

#### map

```js
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构）只能用字符串当作键
let map = new Map()
（1）size 属性-返回 Map 结构的成员总数
（2）Map.prototype.set(key, value)
（3）Map.prototype.get(key)
（4）Map.prototype.has(key)
（5）Map.prototype.delete(key)
（6）Map.prototype.clear()

```



#### set

```javascript
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
let s = new Set()

add(val)-set
delete(val)-boolean
has(val)-boolean
clear()

keys()，values()，entries()
forEach()

集合
// 并集
let union = new Set([...a, ...b])
// 交集
let intersect = new Set([...a].filter(x => b.has(x)))
// 差集
let difference = new Set([...a].filter(x => !b.has(x)))

```

#### 经典构造

```js
    let map =  new Map()
    for (let n of nums) {
        map.set(n,map.has(n)? map.get(n)+1:1)
        //等价于
		if(map.has(n)) map.set(n,map.get(n)+1)
		else map.set(n,1)
    }
	
```



### leetcode1160拼写单词-每日一题17

```js
var countCharacters = function(words, chars) {
    let map =  new Map()
    let cnt = 0
    //遍历chars map记录每个字母出现的次数-set get has
    for (let c of chars) {
        map.set(c,map.has(c)? map.get(c)+1:1)
    }
    //遍历words 检查每个字符
    for (let w of words) {
        if (check(w, new Map(map))) {
            cnt += w.length
        }
    }
    return cnt

};
function check(w, map) {
    for (let i of w) {
        if (map.has(i) && map.get(i) > 0){
            map.set(i, map.get(i) - 1)
        }else{
            return false
        }
    }
    return true
}
输入：words = ["cat","bt","hat","tree"], chars = "atach"
输出：6
解释： 
可以形成字符串 "cat" 和 "hat"，所以答案是 3 + 3 = 6。
```

### leetcode36有效的数独

-set构建hash 遍历已经存在return false 否则add进set里面

```js
const isValidSudoku = arr => {
  for (let i = 0; i < 9; i++) {
    // 遍历行*列
    let row = new Set(), col = new Set()
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] !== '.') {
        if (row.has(arr[i][j])) return false
        row.add(arr[i][j])
      }
      if (arr[j][i] !== '.') {
        if (col.has(arr[j][i])) return false
        col.add(arr[j][i])
      }
    }
    // 遍历3*3小宫格
    let block = new Set()
    let x = (i / 3 >> 0) * 3, y = i % 3 * 3
    for (let j = 0; j < 9; j++) {
      if (arr[x][y] !== '.') {
        if (block.has(arr[x][y])) return false
        block.add(arr[x][y])
      }
      y++
      if ((j + 1) % 3 === 0) {
        x += 1
        y -= 3
      }
    }
  }
  return true
}
```

### leetcode49. 字母异位词分组

```js
var groupAnagrams = function(strs) {
    let hash = new Map()
    for(let i = 0; i < strs.length; i++) {
        let str = strs[i].split('').sort().join()
        if(hash.has(str)) {
            let temp = hash.get(str)
            temp.push(strs[i])
            hash.set(str, temp)
        } else {
            hash.set(str, [strs[i]])
        }
    }
    
    return [...hash.values()] -键名
};
//输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
//输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

### leetcode187. 重复的DNA序列

所有 DNA 都由一系列缩写为 A，C，G 和 T 的核苷酸组成，例如：“ACGAATTCCG”。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。编写一个函数来查找 DNA 分子中所有出现超过一次的 10 个字母长的序列（子串）。

输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
输出：["AAAAACCCCC", "CCCCCAAAAA"]	

```js
// 维护一个length = 10的窗口，每次将窗口内的字符串存进map中
// 当第二次遇到同样字符串，+1即可
var findRepeatedDnaSequences = function(s) {
    if (s.length < 11) return []
    let n = s.length, map = new Map()
    let left = 0
    let right = 10
    let res= []
    while (right <= n) { //循环直到窗口右边为n
        let cur = s.substring(left, right) //cur存储长度为10的字符串
        // map.set(key, value),key出现超过一次+1
        map.set(cur, map.has(cur) ? map.get(cur) + 1 : 1)
        left++ //10的窗口右移
        right++
    }
    for (let [k, v] of map) {
        if (v > 1) res.push(k)
    }
    return res
};
```

leetcode205. 同构字符串

给定两个字符串 s 和 *t*，判断它们是否是同构的。

```js
var isIsomorphic = function(s, t) {
    for(let i=0;i<s.length;i++){
        if(s.indexOf(s[i])!= t.indexOf(t[i])) return false
    }
    return true
    
    // 2.map
    let mapS = new Map()
    let mapT = new Map()
    for(let i=0;i<s.length;i++){
        if(mapS.has(s[i])||mapT.has(t[i])){
            if(mapS.get(s[i])!== mapT.get(t[i])) return false
        }
        mapS.set(s[i],i)
        mapT.set(t[i],i)
    }
    return true
};
```

### leetcode204. 计数质数

统计所有小于非负整数 n 的质数的数量

```js
//厄拉多筛法
// 每计算一个数，都要把它的倍数去掉。到了n，数一下留下了几个数。
var countPrimes = function (n) {
  let cnt = 0
  signs = []
  for (let i = 2; i < n; i++) {
    if (!signs[i]) {
      cnt++
      for (let j = 2 * i; j < n; j += i) {
        signs[j] = true
      }
    }
  }
  return cnt
};
```

### leetcode594. 最长和谐子序列

和谐数组是指一个数组里元素的最大值和最小值之间的差别正好是1。

```js
var findLHS = function(nums) {
    let map = new Map()
    let max = 0
    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }
    for(let [k,v] of map){
        if(map.has(k+1)) {
            max = Math.max(max,map.get(k+1) + v)
        }
    }
    return max
};
```



#### 532. 数组中的K-diff数对

```js

var findPairs = function(nums, k) {
	if(nums.length === 0 || k < 0) return 0
	let myMap = new Map(),
		cnt = 0
	//Get word cnt
	for(num of nums){
		myMap.set(num,(myMap.get(num)+1) || 1)
	}
	//search solutions
	myMap.forEach((value,key) =>{
		if(k === 0){
			if(value > 1) cnt++
		}
		else{
			if(myMap.has(key+k)) cnt++
		}
	})

	return cnt
};

```

