/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    let map = new Map()
    let cnt = 0
    let center = 0
    for(let n of s){
        map.set(n,map.has(n)?map.get(n)+1:1)
    }
    for(let [k,v] of map){
        if(v%2==0){
            cnt += v
        }else{
            cnt += v-1
            center = 1
        }
    }
    return cnt+center
};
console.log(longestPalindrome("abccccdd"))