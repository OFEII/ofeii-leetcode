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