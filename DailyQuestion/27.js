// 解题思路💡
// 一、hash+gcd🎴
// 1.遍历deck，得到key-value的map。再用map.values()取出其value。
// 2.利用gcd判断每个数是否满足最大公约数>1

// 代码📜
var hasGroupsSizeX = function(deck) {
    let map = new Map()
    for(let n of deck){
        map.set(n,map.has(n)?map.get(n)+1:1)
    }
    let arr = [...map.values()]
    let res = arr[0]
    return arr.every(i => (res = gcd(res, i)) > 1)

};
let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
