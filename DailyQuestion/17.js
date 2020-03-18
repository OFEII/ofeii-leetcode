// 一、hash计数法😴🔤
// 遍历chars 用map记录每个字母出现的次数-set get has
// 遍历words 检查每个字符并计数-复制一份map
// check函数：检查w是否出现在map中(map.has(i) && map.get(i)>0)，出现则map中的次数减1
// 代码
// 一、hash
var countCharacters = function(words, chars) {
    let map =  new Map()
    let cnt = 0
    for (let c of chars) {
        map.set(c,map.has(c)? map.get(c)+1:1)
    }
    for (let w of words) {
        if (check(w, new Map(map))) {
            cnt += w.length
        }
    }
    return cnt

};
function check(w, map) {
    for (let i of w) {
        if (map.has(i) && map.get(i)>0){
            map.set(i, map.get(i) - 1)
        }else{
            return false
        }
    }
    return true
}