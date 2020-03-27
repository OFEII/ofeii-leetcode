// 解题思路
// 一、快慢指针🔗
// 快指针每次走两步，慢指针每次走一步，当快指针走到走到终点时，慢指针刚好走到中间

// 二、数组😄
// 遍历，用数组记录链表，res[len>>1]为其中间节点
// （位运算比除法效率高一点，优先级也高）

代码
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
//1.快慢指针
var middleNode = function(head) {
    let fast = head, slow = head
    while(fast&&fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    return slow
};
//2.数组
var middleNode = function(head) {
    let len = 0, newHead = head, res = []
    while(newHead){
        res[len++] = newHead
        newHead = newHead.next
    }
    return res[len>>1]
}