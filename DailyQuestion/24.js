// 解题思路
// 一、dp💆
// core：dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])
// 空间O(n)

// 二、优化💆‍♂️
// 利用变量存储
// 空间O(1)

// 终于有面试了 后天美团一面 加油😆

代码
// 一、dp
var massage = function(nums) {
    let n = nums.length
    if(n === 0)return 0
    if(n === 1)return nums[0]
    let dp = new Array(n+1).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0],nums[1])
    for(let i = 2;i<n;i++){
        dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])
    }
    return dp[n-1]

};
// 二、优化
var massage = function(nums) {
    let a = 0, b = 0
    for (let i = 0; i < nums.length; i++) {
    let c = Math.max(b, a + nums[i])
        a = b
        b = c
    }
    return b
}
