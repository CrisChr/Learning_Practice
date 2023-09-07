
function compareFn(insertKey, nodeKey){
  return insertKey < nodeKey;
}

class Node {
  constructor(key){
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  insert(key){
    if(this.root == null){
      this.root = new Node(key);
    }else{
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key){
    if(compareFn(key, node.key)){
      if(node.left == null){
        node.left = new Node(key);
      }else{
        this.insertNode(node.left, key);
      }
    }else{
      if(node.right == null){
        node.right = new Node(key);
      }else{
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callback){
    this.inOrderTraversetNode(this.root, callback)
  }

  inOrderTraversetNode(node, callback){
    if(node !== null){
      this.inOrderTraversetNode(node.left, callback);
      callback(node.key);
      this.inOrderTraversetNode(node.right, callback)
    }
  }

  // 先序遍历
  preOrderTraverse(callback){
    this.preOrderTraversetNode(this.root, callback);
  }

  preOrderTraversetNode(node, callback){
    if(node != null){
      callback(node.key);
      this.preOrderTraversetNode(node.left, callback);
      this.preOrderTraversetNode(node.right, callback);
    }
  }

  //后序遍历
  postOrderTraverse(callback){
    this.postOrderTraversetNode(this.root, callback);
  }

  postOrderTraversetNode(node, callback){
    if(node != null){
      this.postOrderTraversetNode(node.left, callback);
      this.postOrderTraversetNode(node.right, callback);
      callback(node.key);
    }
  }

  min(){
    return this.getBstMinValue(this.root)
  }

  getBstMinValue(node){
    if(node.left != null && node != null){
      return this.getBstMinValue(node.left)
    }
    return node.key
  }

  max(){
    return this.getBstMaxValue(this.root);
  }

  getBstMaxValue(node){
    if(node.right != null && node != null){
      return this.getBstMaxValue(node.right);
    }
    return node.key;
  }

  //搜索一个特定的值
  search(key){
    return this.searchNode(this.root, key);
  }

  searchNode(node, key){
    if(node == null) return false;
    let searched= false;
    this.inOrderTraverse(function(value){
      if(value === key){
        searched = true;
      }
    });
    return searched;
  }
}

const bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

//中序遍历
// bst.inOrderTraverse(function(value){
//   console.log('current node key: ', value)
// });

// 中序遍历
// bst.preOrderTraverse(function(value){
//   console.log('current node key: ', value)
// })

//后序遍历
// bst.postOrderTraverse(function(value){
//   console.log('current node key: ', value)
// })

// 最小值
console.log(bst.min());

//最大值
console.log(bst.max());

//查询某个值
console.log(bst.search(80))