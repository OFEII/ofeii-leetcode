var compressString = function(S) {

    let res = "", i = j = 0 
    while (j < S.length - 1) {
        if (S[j] !== S[j + 1]) {
            res += S[i] + (j+1 - i)
            i = j+1
        }
        j++
    }

    res += S[i] + (j - i + 1)
    return res.length < S.length ? res : S
};
// 双指针模拟，使用两个下标 i 和 j，枚举头指针i，移动尾指针j