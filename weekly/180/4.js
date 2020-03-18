var maxPerformance = function(n, speed, efficiency, k) {
    let dp = new Array(n).fill(0).map(()=>new Array(2).fill(0))
    for (let i = 0; i < n; i++) {
        dp[i][0] = speed[i]
        dp[i][1] = efficiency[i]
    }
    dp.sort((a,b)=>b[1]-a[1])
    let queue = new PriorityQueue()
    let res = 0
    let sum = 0
    for (let i = 0; i < n; i++) {
        queue.enqueue(dp[i][0],i)
        sum+=dp[i][0]
        if(queue.size()>k){
            sum -= queue.dequeue()
        }
        res = Math.max(res, sum*dp[i][1])
    }
    return queue
    // return (res%(1e9+7))
};
console.log(maxPerformance(6,
    [2,10,3,1,5,8],
    [5,4,3,9,7,2],
    2))
// 优先队列
function PriorityQueue() {
    this.__items = []
  
    /**
     *队列元素对象
     *优先级默认为最低
     */
    function QueueElement(element, priority) {
      // check priority
      if(typeof(priority) != 'number' || Number.isNaN(priority)) {
        // min-level: Infinity
        priority = Infinity
      }
      this.__element = element
      // max-level: 0
      this.__priority = priority

      PriorityQueue.prototype.size = function () {
        return this.__items.length
      }
      PriorityQueue.prototype.getItems = function() {
        return deepCopy(this.__items)
      }
  
      QueueElement.prototype.priority = function() {
        return this.__priority
      }
  
      QueueElement.prototype.toString = function() {
        return this.__element.toString.apply(this.__element)
      }
    }
    PriorityQueue.prototype.dequeue = function() {
        return this.getItems().shift()
      }
    
    // 入队方法
    PriorityQueue.prototype.enqueue = function(element, priority) {
      var queueElement = new QueueElement(element, priority)
  
      // 空队列时直接入队
      if(this.__items.length === 0) {
        this.__items.push(queueElement)
      }
      // 非空队列入队需比较优先级
      else {
        var added = false
        for(var i=0;i<this.__items.length;i++) {
          if(queueElement.priority() < this.__items[i].priority()) {
            this.__items.splice(i, 0, queueElement)
            added = true
            break
          }
        }
        if(!added) {
          this.__items.push(queueElement)
        }
      }
    }
  }

  function deepCopy(source) {
    var dest
    if(Array.isArray(source)) {
      dest = []
      for (let i = 0; i < source.length; i++) {
        dest[i] =deepCopy(source[i])
      }
    }
    else if(toString.call(source) === '[object Object]') {
      dest = {}
      for(var p in source){
        if(source.hasOwnProperty(p)){
          dest[p]=deepCopy(source[p])
        }
      }
    }
    else {
      dest = source
    }
    return dest
  }