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
      if (currentNode.left == null && value < currentNode.data) {
        currentNode.left = new Node(value);
        break;
      }

      if (currentNode.right == null && value > currentNode.data) {
        currentNode.right = new Node(value);
        break;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
  }

  deleteItem(value) {
    let currentNode = this.root;

    while (currentNode.left !== value || currentNode.right !== value) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    if (currentNode.left === value) {
      currentNode.left = currentNode.left.left;
      return;
    } else if (currentNode.right === value) {
      currentNode.right = currentNode.right.right;
      return;
    }
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

test.insert(0);
prettyPrint(test.root);
