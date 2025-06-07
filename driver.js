import Tree from "./Tree.js";

function randomArr() {
  const arr = new Array(10);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }

  return arr;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const test = new Tree(randomArr());
// console.log(test.isBalanced());

function printElements(node) {
  console.log(node.data);
}

// test.levelOrderIteration(printElements);
// test.levelOrderRecursion(printElements);
// test.preOrder(printElements);
// test.inOrder(printElements);
// test.postOrder(printElements);
//
// unbalance the tree

test.insert(69);
test.insert(56);
test.insert(48);
test.insert(47);
test.insert(46);
prettyPrint(test.root);
console.log(test.isBalanced());
test.rebalance();
prettyPrint(test.root);
console.log(test.isBalanced());
test.levelOrderIteration(printElements);
test.levelOrderRecursion(printElements);
test.preOrder(printElements);
test.inOrder(printElements);
test.postOrder(printElements);
