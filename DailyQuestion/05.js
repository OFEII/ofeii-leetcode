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
//一、暴力法 不断遍历数组 如果🍬不为0则一直分
//空间复杂度 O(1) 除了结果只需用常数空间来存储变量
//时间复杂度O(max(sqrt(G),N))，G为糖果数量，N为人数
//等差求和公式(s+1)s/2 >=G➡ s^2+s >=2G ➡ s<=sqrt(2G) ➡O(sqrt(G))
//建立糖果分配组需要时间O(N)

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
console.log(distributeCandies(7,4))
