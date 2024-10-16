import { Tree } from "./tree.js";

function generateRandomNumbers(count) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}

const randomNumbers = generateRandomNumbers(15);
console.log("Random Numbers:", randomNumbers);
console.log("---------------------------------------------");

const bst = new Tree(randomNumbers);
bst.prettyPrint(bst.root);

console.log("Is the tree balanced?", bst.isBalanced());
console.log("---------------------------------------------");

console.log("Inorder Traversal:");
bst.inOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Preorder Traversal:");
bst.preOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Postorder Traversal:");
bst.postOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Level Order Traversal:");
bst.levelOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

const unbalancedNumbers = [101, 102, 103, 104, 105];
unbalancedNumbers.forEach((num) => bst.insert(num));
console.log("Is the tree balanced after adding > 100 numbers?", bst.isBalanced());
console.log("---------------------------------------------");
bst.prettyPrint(bst.root);

bst.rebalance();
console.log("Is the tree balanced after rebalancing?", bst.isBalanced());
console.log("---------------------------------------------");
bst.prettyPrint(bst.root);

console.log("Inorder Traversal:");
bst.inOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Preorder Traversal:");
bst.preOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Postorder Traversal:");
bst.postOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

console.log("Level Order Traversal:");
bst.levelOrder((node) => console.log(node.data));
console.log("---------------------------------------------");

