function quickSort(arr) {
    let pivot = arr[0]
    let left = []
    let right = []
    if(arr.length<2) return arr
    for (let i = 0; i < arr.length; i++) {
        arr[i]<pivot ? left.push(arr[i]):right.push[arr[i]]
    }
    return quickSort(left).concat()
}