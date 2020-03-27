// 解题思路
// 一、模拟法
// 遍历棋盘8*8，确定白色车的下标，用 (st,ed)(st,ed) 表示。

// 利用方向数组进行向四个方向对🚗模拟移动，碰到💂或者🐘或者棋盘边缘停止，cnt记录碰到💂的数量

// 代码
var numRookCaptures = function(board) {
    let cnt = 0, st = 0, ed = 0
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (board[i][j] == 'R') {
                st = i;
                ed = j;
                break;
            }
        }
    }
    for (let i = 0; i < 4; ++i) {
        for (let step = 0;; ++step) {
            const tx = st + step * dx[i]
            const ty = ed + step * dy[i]
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8 || board[tx][ty] == 'B') break
            if (board[tx][ty] == 'p') {
                cnt++
                break
            }
        }
    }
    return cnt
};