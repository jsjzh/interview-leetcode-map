/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-23 09:27:15
 * @LastEditTime: 2019-03-23 10:57:55
 * @Description: 简单的单向链表
 */

class Node {
  constructor(val = null, next = null) {
    this.val = val
    this.next = next
  }
}

export class LinkedList {
  constructor(list = []) {
    this.head = null
    this.tail = null

    let len = list.length
    while (len) {
      this.push(list[list.length - len])
      len--
    }
  }

  push(val) {
    if (this.head === null) {
      this.head = new Node(val)
      this.tail = this.head
    } else {
      this.tail.next = new Node(val)
      this.tail = this.tail.next
    }
  }
}
