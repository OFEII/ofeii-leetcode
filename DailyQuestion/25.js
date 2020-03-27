// 解题思路
// 简单写一写
// 1.遍历，计算每个格子的所叠成的表面积 surface = 4*grid[i][j] 四周 + 2 上下两个面
// 2.判断立方体周围是否有立方体和立方体的数量,再对其相减取得surface的最大值

// 代码
var surfaceArea = function(grid) {
    let r = grid.length, c = grid[0].length
    let surface = 0
    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            let temp = grid[i][j]
            if(temp > 0){
                surface += 4*temp +2
                if(j<c-1 && grid[i][j+1] > 0) surface -= Math.min(temp, grid[i][j+1])
                if(i<r-1 && grid[i+1][j] > 0) surface -= Math.min(temp, grid[i+1][j])
                if(i>0 && grid[i-1][j] > 0) surface -= Math.min(temp, grid[i-1][j])
                if(j>0 && grid[i][j-1] > 0) surface -= Math.min(temp, grid[i][j-1])
            }
        }
    }
    return surface
};