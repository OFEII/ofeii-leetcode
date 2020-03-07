// 建立一个队列数组 maxVal用于存储最大值
var MaxQueue = function() { 
    this.queue = []
    this.maxVal = -Infinity
};
// 数组不存在即队列为空返回-1 否则返回最大值maxVal
MaxQueue.prototype.max_value = function() {
    if(!this.queue.length) return -1
    return this.maxVal
};
//入队push 比较入队的值与maxVal 大则更新maxVal
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value)
    if(value>this.maxVal) this.maxVal = value
};
// 出队shift 返回数组第一个删除元素 如果删除数为最大值则比较剩余数组中的最大值
MaxQueue.prototype.pop_front = function() {
    if(!this.queue.length) return -1
    let val = this.queue.shift()
    if(val === this.maxVal) this.maxVal = Math.max(...this.queue)
    return val
};
