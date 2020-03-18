// 解题思路
// 方法一：检查位置-逆向思维
// -找到矩形不重叠的条件即上下左右均不重叠
// -再对条件取反

// 方法二：检查区域-正向思维
// 代码
// 方法一：检查位置
var isRectangleOverlap = function(rec1, rec2) {
    return !(rec1[2] <= rec2[0] ||   // left
             rec1[3] <= rec2[1] ||   // bottom
             rec2[2] <= rec1[0] ||   // right
             rec2[3] <= rec1[1]);    // top
}
// 方法二：检查区域
var isRectangleOverlap = function(rec1, rec2) {
    return (Math.min(rec1[2], rec2[2]) > Math.max(rec1[0], rec2[0]) &&Math.min(rec1[3], rec2[3]) > Math.max(rec1[1], rec2[1]))
       
};