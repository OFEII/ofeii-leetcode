
var findSwapValues = function(array1, array2) {
    function sum (arr){
        let res = arr.reduce((acc,cur)=>{
            return acc+cur
        })
        return res
    }
    let diff = sum(array1) - sum(array2)
    if(diff&1) return []
    diff>>=1
    let s2 = [...new Set(array2)]
    for(let i=0;i<array1.length;i++){
        if(s2.includes(+array1[i]-diff)){
            return[+array1[i], +array1[i]-diff]
        }
    }
    return []
    return +array1[5]-diff
};

console.log(findSwapValues([519, 886, 282, 382, 662, 4718, 258, 719, 494, 795],[52, 20, 78, 50, 38, 96, 81, 20]))