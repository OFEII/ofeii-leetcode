
var CustomStack = function(maxSize) {
    this.s = []
    this.t=0
    this.n = maxSize
};


CustomStack.prototype.push = function(x) {
    if(t<n) s[++t]=x
    return this.s

};


CustomStack.prototype.pop = function() {
    if(t)return s[t--]
    return -1
};

CustomStack.prototype.increment = function(k, val) {
    while(k) s[k--]+=val

};


/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */

let customStack = new CustomStack(3); // 栈是空的 []
console.log(customStack.push(1)) 
console.log(customStack.push(2)) 
console.log(customStack.pop()) 
console.log(customStack.push(2)) 
console.log(customStack.push(3)) 
console.log(customStack.push(4)) 
console.log(customStack.increment(5, 100))                // 栈变为 [101, 102, 103]
console.log(customStack.pop()) 
console.log(customStack.push(2)) 
console.log(customStack.push(3))
console.log(customStack.push(4))
console.log(customStack.increment(5, 100))                // 栈变为 [101, 102, 103]
console.log(customStack.increment(2, 100))                // 栈变为 [201, 202, 103]
console.log(customStack.pop())                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
console.log(customStack.pop())                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
console.log(customStack.pop())                            // 返回 201 --> 返回栈顶值 201，栈变为 []
console.log(customStack.pop()) 

// ["CustomStack","push","pop","increment","pop","increment","push","pop","push","increment","increment","increment"]
// [[2],[34],[],[8,100],[],[9,91],[63],[],[84],[10,93],[6,45],[10,4]]