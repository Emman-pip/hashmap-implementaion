const linkedList = () => {
	const Node = () => {
		return {
			next: null,
			value: null
		}
	}
	let head = null
	let tail = null
	let counter = 0
	const add = (value) => {
		const newNode = Node()
		newNode.value = value
		if (counter === 0) {
			head = newNode
			tail = newNode
			counter++
		} else {
			tail.next = newNode
			tail = tail.next
			counter++
		}
	}
	return {
		add,
		display: () => {
			let ptr = head
			let str = ""
			while (ptr != null) {
				str += `${ptr.value}->`
				ptr = ptr.next
			}
			str += "NULL"
			//console.log(str)

		},
		len: () => {
			return counter
		},
		getTail: () => {
			return tail
		},
		getHead: () => {
			return head
		},
		setNode: (value, newValue) => {
			let ptr = head
			while (ptr != null) {
				if (ptr.value[1] == value) {
					ptr.value[1] = newValue
					return
				}
				ptr = ptr.next
			}
			add([head.value[0], newValue])
		},
		deleteNode: (node) => {
			let prev = null
			let current = head
			while (current != null) {
				if (!(current.value[1] == node[1])) {
					prev = current
					current = current.next
					continue
				}
				else {
					if (prev == null) {
						head = current.next
						return
					}
					prev.next = current.next
					counter--
					return
				}

			}
			return -1
		}
	}
}

const hashMap = () => {
	const modulo = (num) => {
		return num % 200
	}

	const createHash = (key) => {
		let hashcode = 0
		const primeNumber = 31

		for (let i = 0; i < key.length; i++) {
			hashcode += primeNumber * hashcode * key.charCodeAt(i) + i;
		}
		return hashcode
	}

	const arr = []
	for (let i = 0; i < 100; i++) {
		arr.push(null)
	}

	const hash = (key) => {
		const code = createHash(key)
		if (arr[modulo(code)]) {
			arr[modulo(code)].add([code, key]);
			arr[modulo(code)] = arr[modulo(code)]
			console.log("lL", key, modulo(code))
		} else {
			const linkedL = linkedList()
			linkedL.add([code, key])
			arr[modulo(code)] = linkedL
		}
		return
	}
	const set = (key, value) => {
		const lList = arr[modulo(createHash(key))]
		if (!(lList)) {
			hash(key)
			set(key, value)
			return
		}
		if (lList.len() == 1 && createHash(key) == lList.getHead().value[0]) {
			lList.getHead().value[0] = createHash(key)
			lList.getHead().value[1] = value
			return
		} else if (lList.len() > 1) {
			lList.setNode(key, value)
		} else {
			return -1
		}
	}

	const entries = () => {
		const finalArr = []
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] == null) continue
			let ptr = arr[i].getHead()
			while (ptr != null) {
				finalArr.push([ptr.value[0], ptr.value[1]])
				ptr = ptr.next
			}
		}
		return finalArr
	}
	return {
		hash,
		set,
		get: (key) => {
			const value = arr[modulo(createHash(key))]
			if (!value) return null
			if (value.len() == 1 && value.getHead().value[0] == createHash(key)) {

				return value.getTail().value[1]
			}
			let ptr = value.getHead()
			value.display()
			while (ptr != null) {
				console.log("here")
				if (ptr.value[0] == createHash(key)) return ptr.value[1]
				ptr = ptr.next
			}
			return null;
		},
		has: (key) => {
			const value = arr[modulo(createHash(key))]
			if (!value) {
				return false
			}
			if (value.len() == 1 && value.getHead().value[0] == createHash(key)) {
				return true
			} else if (value.len() > 1) {
				let ptr = value.getHead()
				const hashed = createHash(key)
				while (ptr != null) {
					if (ptr.value[0] == hashed) {
						return true
					}
					ptr = ptr.next
				}
			}
			return false
		},
		remove: (key) => {
			const value = arr[modulo(createHash(key))]
			value.deleteNode([createHash(key), key])
			value.display()
		},
		length: () => {
			return entries().length
		},
		clear: () => {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = null
			}
		},
		keys: () => {
			const all = entries()
			const res = []
			all.forEach((e) => {
				res.push(e[0])
			})
			return res
		},
		values: () => {
			const all = entries()
			const res = []
			all.forEach((e) => {
				res.push(e[1])
			})
			return res
		},
		entries
	}
}

const hash = hashMap()
hash.hash("Emman")
hash.hash("mmanE")
hash.hash("klfjhasd")
hash.hash("Jay")
hash.set("jAy", "key!!")
hash.set("jy", "key2!!")
hash.set("j13", "key2!!")
hash.set("j3879", "key2!!")
console.log(hash.entries())
console.log(hash.length())
console.log(hash.values())
