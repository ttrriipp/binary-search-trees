import Node from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  fixArray(arr) {
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
    arr = this.fixArray(arr);

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
        console.log("that already exist silly!");
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
  //TODO: finish this!!!
  deleteItem(value) {
    let currentNode = this.root;

    // if the value is the root
    if (currentNode.data === value) {
      if (currentNode.left == null && currentNode.right == null) {
        currentNode.data = null;
        console.log("bruh u just deleted the whole damn tree");
        return;
      }

      if (currentNode.right == null && currentNode.left.right == null) {
        currentNode.data = currentNode.left.data;
        currentNode.left = null;
        console.log("successfully deleted the root");
        return;
      }

      let replacementNode = currentNode.right;
      if (replacementNode.left == null) {
        currentNode.data = replacementNode.data;
        currentNode.right = replacementNode.right;
        console.log("successfully deleted the root");
        return;
      }

      while (replacementNode.left.left != null) {
        replacementNode = replacementNode.left;
      }

      currentNode.data = replacementNode.left.data;
      replacementNode.left = replacementNode.left.right;
      console.log("successfully deleted the root");
      return;
    }

    while (currentNode !== null) {
      // make sure that the node has no child
      if (
        currentNode.left != null &&
        currentNode.left.data === value &&
        currentNode.left.left == null &&
        currentNode.left.right == null
      ) {
        currentNode.left = null;
        console.log("successfully deleted a leaf node");
        return;
      }

      if (
        currentNode.right != null &&
        currentNode.right.data === value &&
        currentNode.right.left == null &&
        currentNode.right.right == null
      ) {
        currentNode.right = null;
        console.log("successfully deleted a leaf node");
        return;
      }

      // make sure that the node has only one child
      if (
        currentNode.left != null &&
        currentNode.left.data === value &&
        ((currentNode.left.left == null && currentNode.left.right != null) ||
          (currentNode.left.left != null && currentNode.left.right == null))
      ) {
        currentNode.left = currentNode.left.left ?? currentNode.left.right;
        console.log("successfully deleted node w/ single child");
        return;
      }

      if (
        currentNode.right != null &&
        currentNode.right.data === value &&
        ((currentNode.right.left == null && currentNode.right.right != null) ||
          (currentNode.right.left != null && currentNode.right.right == null))
      ) {
        currentNode.right = currentNode.right.left ?? currentNode.right.right;
        console.log("successfully deleted a node w/ single child");
        return;
      }

      // make sure that the node has 2 child of not null
      if (
        currentNode.left != null &&
        currentNode.left.data === value &&
        currentNode.left.left != null &&
        currentNode.left.right != null
      ) {
        let replacementNode = currentNode.left.right;
        if (replacementNode.left != null) {
          while (replacementNode.left != null) {
            replacementNode = replacementNode.left;
          }
        }
        currentNode.left.data = replacementNode.data;
        currentNode.left.right = replacementNode.right;
        console.log(
          "successfully deleted a node with 2 child (damn you are a monster)",
        );
        return;
      }

      if (
        currentNode.right != null &&
        currentNode.right.data === value &&
        currentNode.right.left != null &&
        currentNode.right.right != null
      ) {
        let replacementNode = currentNode.right.right;
        if (replacementNode.left != null) {
          while (replacementNode.left != null) {
            replacementNode = replacementNode.left;
          }
        }
        currentNode.right.data = replacementNode.data;
        currentNode.right.right = replacementNode.right;
        console.log(
          "successfully deleted a node with 2 child (damn you are a monster)",
        );
        return;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    console.log("there's no such value");
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (currentNode.data === value) {
        return currentNode;
      }

      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return `nope can't find ${value} :(`;
  }

  levelOrderIteration(callback) {
    if (!callback) throw new Error("bruh provide callback");

    const queue = [];
    queue.push(this.root);
    let indexNode;
    while (queue.length !== 0) {
      indexNode = queue[0];
      callback(indexNode);

      if (indexNode.left != null) {
        queue.push(indexNode.left);
      }

      if (indexNode.right != null) {
        queue.push(indexNode.right);
      }

      queue.shift();
    }
  }

  levelOrderRecursion(callback, node = this.root) {
    if (!callback) throw new Error("bruh provide callback");

    if (node == null) return;
    if (node === this.root) callback(node);

    if (node.left != null) callback(node.left);
    if (node.right != null) callback(node.right);

    this.levelOrderRecursion(callback, node.left);
    this.levelOrderRecursion(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("bruh provide callback");

    if (node == null) return;

    callback(node);
    this.inOrder(callback, node.left);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("bruh provide callback");

    if (node == null) return;

    this.preOrder(callback, node.left);
    callback(node);
    this.preOrder(callback, node.right);
  }

  postOrder(callback) {
    // left, right, root
    if (!callback) throw new Error("bruh provide callback");

    let indexNode = this.root;
    // First In Last Out
    const stack = [this.root];
    // [node, node.right, node.left]

    // Do the right side first because the left side will be the first to pop
    while (indexNode != null) {
      stack.push(indexNode);
      indexNode = indexNode.right;
    }

    indexNode = this.root.right;
    // Now the left
    while (indexNode != null) {}
  }
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

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//   1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345
// const arr = [1, 2, 3, 4];
const test = new Tree(arr);

function make69(node) {
  node.data = 69;
}

// test.levelOrderIteration(make69);
// prettyPrint(test.root);
test.levelOrderRecursion(make69);
prettyPrint(test.root);
