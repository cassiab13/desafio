class Node {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class NodeService {
    constructor() {
        this.root = null;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    getHeight() {
        return this.getHeightNode(this.root);
    }

    getHeightNode(node) {
        if (node === null) {
            return 0;
        }
        const leftHeight = node.left !== null ? this.getHeightNode(node.left) : 0;
        const rightHeight = node.right !== null ? this.getHeightNode(node.right) : 0;
        return Math.max(leftHeight, rightHeight) + 1;
    }

    rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }

    rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }

    rotateRightLeft(node) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
    }

    rotateLeftRight(node) {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
    }

    insertNode(node, value) {
        if (node === null) {
            return new Node(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node;
        }
        return this.balance(node);
    }

    balance(node) {
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left) >= 0) {
                return this.rotateRight(node);
            }
            return this.rotateLeftRight(node);
        } else if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right) <= 0) {
                return this.rotateLeft(node);
            }
            return this.rotateRightLeft(node);
        }
        return node;
    }

    getBalanceFactor(node) {
        if (node === null) {
            return 0;
        }
        const leftHeight = node.left !== null ? node.left.height : 0;
        const rightHeight = node.right !== null ? node.right.height : 0;
        return leftHeight - rightHeight;
    }
}
