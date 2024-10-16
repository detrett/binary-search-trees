import { Tree } from "./tree.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(array);
tree.prettyPrint(tree.root);
tree.insert(18);
tree.prettyPrint(tree.root);
tree.deleteItem(8);
tree.prettyPrint(tree.root);

console.log(tree.find(5))

tree.levelOrder((node) => console.log(node.data));
console.log("---------------------")
tree.inOrder((node) => console.log(node.data));
console.log("---------------------")
tree.preOrder((node) => console.log(node.data));
console.log("---------------------")
tree.postOrder((node) => console.log(node.data));
console.log("---------------------")
console.log(tree.height(tree.root));
console.log(tree.depth(tree.find(23)));