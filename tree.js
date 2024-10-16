import { mergeSort } from "./mergesort.js";
import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Sort array
    array = mergeSort(array);
    // Remove duplicates
    const filteredArray = array.filter(
      (_, index) => array[index] !== array[index - 1]
    );
    const start = 0;
    const end = filteredArray.length - 1;

    return this.sortedArrayToBST(filteredArray, start, end);
  }

  sortedArrayToBST(array, start, end) {
    if (start > end) {
      return null;
    }

    const middle = start + Math.floor((end - start) / 2);
    const root = new Node(array[middle]);

    root.left = this.sortedArrayToBST(array, start, middle - 1);
    root.right = this.sortedArrayToBST(array, middle + 1, end);

    return root;
  }

  insert(value) {
    let currNode = this.root;

    while (true) {
      if (value <= currNode.data) {
        if (currNode.left === null) {
          currNode.left = new Node(value);
          break;
        }
        currNode = currNode.left;
      } else {
        if (currNode.right === null) {
          currNode.right = new Node(value);
          break;
        }
        currNode = currNode.right;
      }
    }
  }

  deleteItem(value) {
    this.root = this.deleteRecursively(this.root, value);
  }

  deleteRecursively(node, value) {
    if (node === null) {
      return node;
    }

    // Traverse the tree
    if (value < node.data) {
      node.left = this.deleteRecursively(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteRecursively(node.right, value);
    } else {
      // Case 1: No children (leaf node)
      if (node.left === null && node.right === null) {
        return null;
      }
      // Case 2: One child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      // Case 3: Whole ass tree
      // Find in-order successor (only works in a node with both children) and copy its value
      const succ = this.findSuccessor(node.right);
      node.data = succ.data;
      // Find and terminate the other node we just copied our homework from, no mercy
      node.right = this.deleteRecursively(node.right, succ.data);
    }
    return node;
  }

  // Helper function to find in-order successor when deleting a node with 2 children
  findSuccessor(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let currNode = this.root;
    while (currNode.data !== value) {
      if (value < currNode.data) {
        currNode = currNode.left;
        continue;
      }
      currNode = currNode.right;
    }
    return currNode;
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }

    if (callback === null || callback === undefined) {
      throw new Error(
        "A callback is required: e.g. (node) => console.log(node.data)"
      );
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const currNode = queue.shift();

      callback(currNode);

      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
    }
  }

  inOrder(callback) {
    if (callback === null || callback === undefined) {
      throw new Error(
        "A callback is required: e.g. (node) => console.log(node.data)"
      );
    }
    this.inOrderHelper(this.root, callback);
  }

  inOrderHelper(node, callback) {
    if (node === null) return;

    this.inOrderHelper(node.left, callback);
    callback(node);
    this.inOrderHelper(node.right, callback);
  }

  preOrder(callback) {
    if (callback === null || callback === undefined) {
      throw new Error(
        "A callback is required: e.g. (node) => console.log(node.data)"
      );
    }
    this.preOrderHelper(this.root, callback);
  }

  preOrderHelper(node, callback) {
    if (node === null) return;

    callback(node);
    this.preOrderHelper(node.left, callback);
    this.preOrderHelper(node.right, callback);
  }

  postOrder(callback) {
    if (callback === null || callback === undefined) {
      throw new Error(
        "A callback is required: e.g. (node) => console.log(node.data)"
      );
    }
    this.postOrderHelper(this.root, callback);
  }

  postOrderHelper(node, callback) {
    if (node === null) return;

    this.postOrderHelper(node.left, callback);
    this.postOrderHelper(node.right, callback);
    callback(node);
  }

  height(node) {
    if (node === null) {
      return 0;
    }
    return this.heightHelper(node, 0);
  }

  heightHelper(node, currHeight) {
    if (node === null) {
      return currHeight;
    }

    currHeight++;

    // Recursively calculate the height of left and right subtrees
    const leftHeight = this.heightHelper(node.left, currHeight);
    const rightHeight = this.heightHelper(node.right, currHeight);

    // Return the maximum of the two heights
    return Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    if (node === null) {
      throw new Error("Node cannot be null.");
    }
    if (node === this.root) {
      return 0;
    }
    let currNode = this.root;
    let depth = 0;

    while (currNode !== null) {
      if (node.data < currNode.data) {
        currNode = currNode.left;
        depth++;
      } else if (node.data > currNode.data) {
        currNode = currNode.right;
        depth++;
      } else return depth;
    }
    
    throw new Error("Node not found in the tree.");
  }

  isBalanced() {
    return this.checkBalance(this.root) !== -1;
  }

  checkBalance(node) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.checkBalance(node.left);
    if(leftHeight === -1) {
      return -1
    }

    const rightHeight = this.checkBalance(node.right);
    if(rightHeight === -1) {
      return -1
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    // Return height of the current node
    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    const sortedArray = [];
    this.inOrder((node) => sortedArray.push(node.data));
    this.root = this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
