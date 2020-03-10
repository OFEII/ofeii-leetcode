// 经过一个node，其左右子树的最大深度之和 + 1（二叉树的根节点深度为0）
// 定义一个递归函数 depth(node) 
// 计算 node 为起点的路径经过节点数
// 函数返回该节点为根的子树的深度
//时间复杂度O(n) n为二叉树的节点 遍历n
//空间复杂度O(Height) 常数变量 递归的深度为二叉树的高度

var diameterOfBinaryTree = function(root) {
    let res = 0
    depth(root)
    return res
    function depth (node) {
        if (!node) return 0 // 节点不存在返回0
        let left = depth(node.left) // left为左子树的深度
        let right = depth(node.right)//right 为右子树的深度
        res = Math.max(left + right, res) //计算l+r 更新res
        return Math.max(left, right)+1 //返回该节点为根的子树的深度
    }
};
