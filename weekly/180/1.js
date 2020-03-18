var luckyNumbers  = function(matrix) {
    let m1 = [],m2=[]
    for (let i = 0; i < matrix.length; i++) {
        m1[i] = Math.min(...matrix[i])
    }
    let matrixRotate = rotate(matrix)
    for (let i = 0; i < matrixRotate.length; i++) {
        m2[i] = Math.max(...matrixRotate[i])
    }
    let res = m1.filter(e=> m2.includes(e))
    if (+res==0) return []
    return  [+res]

};
var rotate = function(matrix) {
    let arr = matrix[0].map(function(col, i) {
        return matrix.map(function(row) {
        return row[i]
        })
      })
    return arr
};

console.log(luckyNumbers([[36376,85652,21002,4510],[68246,64237,42962,9974],[32768,97721,47338,5841],[55103,18179,79062,46542]]))