import Node from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  fixTheArray(arr) {
    arr.sort((a, b) => a - b);
    arr = arr.reduce(
      (previous, current) =>
        previous.includes(current) ? previous : [...previous, current],
      [],
    );
    return arr;
  }

  buildTree(arr) {
    if (!arr.length) return null;
    arr = this.fixTheArray(arr);

    const n = arr.length;
    let start = n - n;
    let end = n - 1;
    let mid = Math.floor(end / 2);
    const root = new Node(arr[mid]);
    let visitedNode = { node: root, range: [start, end] };
    const queue = [];
    queue.push(visitedNode);

    let indexNode;
    while (queue.length !== 0) {
      indexNode = queue[0].node;
      let [start, end] = queue[0].range;
      mid = start + Math.floor((end - start) / 2);

      // left part
      let midLeft = start + Math.floor((mid - 1 - start) / 2);
      if (start < mid) {
        indexNode.left = new Node(arr[midLeft]);
        visitedNode = { node: indexNode.left, range: [start, mid - 1] };
        queue.push(visitedNode);
      }

      // right part
      let midRight = mid + 1 + Math.floor((end - mid - 1) / 2);
      if (end > mid) {
        indexNode.right = new Node(arr[midRight]);
        visitedNode = { node: indexNode.right, range: [mid + 1, end] };
        queue.push(visitedNode);
      }
      queue.shift();
    }
    return root;
  }

  insert(value) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (currentNode.data === value) {
        return;
      }

      if (currentNode.left == null && value < currentNode.data) {
        currentNode.left = new Node(value);
        return;
      }

      if (currentNode.right == null && value > currentNode.data) {
        currentNode.right = new Node(value);
        return;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
  }

  deleteItem(value) {
    if (this.root == null) return null;

    let currentNode = this.root;
    while (
      currentNode.data != null &&
      currentNode.left == null &&
      currentNode.right == null
    ) {
      // deleting a right leaf node or with a single child
      if (currentNode.right != null && currentNode.right.data === value) {
        currentNode.right = currentNode.right.right ?? currentNode.right.left;
        return;
      }

      // deleting a left leaf node or with a single child
      if (currentNode.left != null && currentNode.left.data === value) {
        currentNode.left = currentNode.left.left ?? currentNode.left.right;
        return;
      }

      // deleting a node with 2 children (god that's horrible)
      // if for some reason the item is the root
      if (
        currentNode.data === value &&
        currentNode.left != null &&
        currentNode.right != null
      ) {
        break;
      }

      if (value > currentNode.data && currentNode.right != null) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data && currentNode.left != null) {
        currentNode = currentNode.left;
      }
    }
    // loop finished so means it could not be found or it is the root of the tree
    if (currentNode.data !== value) {
      console.log("not found");
      return;
    }

    // if the item is the root of the tree
    let nodeReplacement = currentNode.right;
    if (nodeReplacement.left == null) {
      currentNode.data = nodeReplacement.data;
      return;
    }
    // else traverse through the lowest part of the subtree
    while (nodeReplacement.left != null) {
      nodeReplacement = nodeReplacement.right;
    }
    currentNode.data = nodeReplacement.data;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//   1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345
const test = new Tree(arr);
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

test.deleteItem(9);
test.deleteItem(69);
// test.insert(6);
prettyPrint(test.root);
