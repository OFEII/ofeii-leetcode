// 解题思路
// 一、合并数组排序
// splice+sort(splice会改变原数组，slice不会修改数组)

// 二、双指针归并

// 比较A[m-1]B[n-1] ➡ A[m+n-1]=较大数 ➡ 指针向前移动 m--/n--
// (compare A[m-1] with B[n-1] ➡ select A[]max ➡ A[m+n-1] ➡move m/n pointer front)
// 如果m为0而n不为0 ➡ 将B中的元素直接移动A
// (if m==0 && n!=0 ➡ B move to A/A[]=B[])
// ⚠：不能修改A的引用即return A(可省略)

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