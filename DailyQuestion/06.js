
//滑动窗口(左开右闭区间，设左端点l,右端点r)
//滑动窗口最重要的性质 窗口的左边界和右边界只能向右移动(时间复杂度O(n))
//
var findContinuousSequence = function(target) {
    let l = 1 //left edge of sliding window
    let r = 1 //right edge of sliding window
    let sum = 0 //store the sum of window
    let res =[]
    while(l<=Math.round(target/2)){
        if(sum===target){ 
            let temp = [] //temp arr to store
            for(let i=l;i<r;i++){
                temp.push(i)
            }
            res.push(temp)
            sum -=l
            l++               //l slide to right
        }else if(sum>target){ //l slide to right
            sum -= l
            l++
        }else if(sum<target){ // r slide to right
            sum += r
            r++
        }
    }
    return res 
}