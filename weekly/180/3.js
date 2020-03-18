var balanceBST = function(root) {
    // 获取节点值。bst中序遍历返回升序数组。
    let arr = [];
    let fn = (node) => {
        if(!node)return;
        fn(node.left);
        arr.push(node.val);
        fn(node.right);
    };
    fn(root);

    // 重建平衡bst
    let mid = ~~(arr.length / 2);
    let h = new TreeNode(arr[mid]);
    let buildTree = (node, arr, mid) => {
        if(!arr.length || arr.length === 1){
            return;
        }
        if(arr.length === 2){ // 跟mid的划分有关，有两个数，mid是右侧那个
            node.left = new TreeNode(arr[0]);
            return
        }

        // 左树
        node.left = new TreeNode(arr[~~(mid / 2)]);
        buildTree(node.left, arr.slice(0, mid), ~~(mid / 2));

        // 右树
        let a = arr.slice(mid+1);
        let mi = ~~(a.length / 2);
        node.right = new TreeNode(a[mi]);
        buildTree(node.right, a, mi)
    };
    // 参数解释：给定一个数组，已经锁定了head和head的index
    buildTree(h, arr, mid);
    return h;
};
