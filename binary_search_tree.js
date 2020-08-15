class Node {
	constructor(data = null, parent = null) {
		this.data = data;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}
	
	min() {
		let node = this;
		while(node.left) {
			node = node.left;
		}
		return node;
	}
	
	max() {
		let node = this;
		while(node.right) {
			node = node.right;
		}
		return node;
	}
	
	successor() {
		let node = this;
		if(node.right) {
			return node.right.min();
		} else {
			return null;
		}
	}
	
	predecessor() {
		let node = this;
		if(node.left) {
			return node.left.max();
		} else {
			return null;
		}
	}
	
	delete() {
		let node = this;
		if(!node.left && !node.right) {
			if(node.parent.left === node) {
				node.parent.left = null;
			} else {
				node.parent.right = null;
			}
		} else if (node.left && node.right) {
			let successor = node.successor();
			node.data = successor.data;
			successor.delete();
		} else if (node.left) {
			if(node.parent.left === node) {
				node.parent.left = node.left;
				node.left.parent = node.parent.left;
			} else {
				node.parent.right = node.left;
				node.left.parent = node.parent.right;
			}
			node.left = null;
		} else if (node.right) {
			if(node.parent.left === node) {
				node.parent.left = node.right;
				node.right.parent = node.parent.left;
			} else {
				node.parent.right = node.right;
				node.right.parent = node.parent.right;
			}
			node.right = null;
		}		
	}
}

class BinaryTree {
	constructor(data = null) {
		this.root = new Node(data);
	}
	
	isEmpty() {
		return this.root === null;
	}
	
	insert(data) {
		if(this.isEmpty()) {
			let node = new Node(data);
			this.root = node;
			return node;
		}
		let node = this.root;
		while(node) {
			if(data > node.data) {
				if(node.right) {
					node = node.right;
				} else {
					node.right = new Node(data, node);
					node = node.right;
					break;
				}
			} else if (data < node.data) {
				if(node.left) {
					node = node.left;
				} else {
					node.left = new Node(data, node);
					node = node.left;
					break;
				}
			} else {
				break;
			}
		}
		return node;
	}
	
	traverse(node, type = 'in-order') {
		switch(type) {
			case 'in-order':
				this.inOrder(node);
				break;
				
			case 'pre-order':
				this.preOrder(node);
				break;
				
			case 'post-order':
				this.postOrder(node);
				break;
		}
		/*if(node) {
			if(node.left) {
				this.traverse(node.left);
			}
			console.log(node.data);
			if(node.right) {
				this.traverse(node.right);
			}
		}*/
	}
	
	preOrder(node) {
		if(node) {
			console.log(node.data);
			if(node.left) {
				this.traverse(node.left);
			}
			if(node.right) {
				this.traverse(node.right);
			}
		}
	}
	
	inOrder(node) {
		if(node) {
			if(node.left) {
				this.traverse(node.left);
			}
			console.log(node.data);
			if(node.right) {
				this.traverse(node.right);
			}
		}
	}
	
	postOrder(node) {
		if(node) {
			if(node.left) {
				this.traverse(node.left);
			}
			if(node.right) {
				this.traverse(node.right)
			}
			console.log(node.data);
			
		}
	}
	
	
	search(data) {
		if(this.isEmpty()) {
			return true;
		}
		let node = this.root;
		while(node) {
			if(data > node.data) {
				node = node.right;
			} else if (data < node.data){
				node = node.left;
			} else {
				break;
			}
		}
		return node; 
	}
	
	remove(data) {
		let node = this.search(data);
		if(node) {
			node.delete();
		}		
	}
}

const tree = new BinaryTree(10);
tree.insert(12);
tree.insert(6); 
tree.insert(3);
tree.insert(8);
tree.insert(15);
tree.insert(13);
tree.insert(36);

tree.traverse(tree.root, 'pre-order');
tree.traverse(tree.root, 'in-order');
tree.traverse(tree.root, 'post-order');

console.log(tree.search(14)? '14 Found':'14 Not Found');
console.log(tree.search(36)? '36 Found':'36 Not Found');

tree.remove(15);
tree.traverse(tree.root, 'pre-order');
tree.traverse(tree.root, 'in-order');
tree.traverse(tree.root, 'post-order');