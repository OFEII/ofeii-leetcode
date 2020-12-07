// lc861. 翻转矩阵后的得分
//  贪心
function matrixScore(A: number[][]): number {
  const m = A.length, n = A[0].length
  let res = m * (1 << (n - 1))
  for (let i = 1; i < n; i++) {
      let nOnes = 0
      for (let j = 0; j < m; j++) {
            nOnes += A[j][0] === 1 ? A[j][i] : (1 - A[j][i])
      }
      const k = Math.max(nOnes, m - nOnes)
      res += k * (1 << (n - i - 1))
  }
  return res
};
// test
// 输入：[[0,0,1,1],[1,0,1,0],[1,1,0,0]]
// 输出：39
// 解释：
// 转换为 [[1,1,1,1],[1,0,0,1],[1,1,1,1]]
// 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39