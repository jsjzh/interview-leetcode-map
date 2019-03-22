/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-22 08:47:11
 * @LastEditTime: 2019-03-22 09:55:02
 * @Description: helper 函数集合，一般是 leetcode 中的题目已经定义的函数，比如单向链表，二叉树之类的
 */
/**
 * 单向链表的创建，用 push 来往尾部添加一个节点
 * @param {*} val
 */

export class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }

  // 对链表不产生影响，方便测试
  push(val) {
    let newNode = new ListNode(val)
    let currNode = this
    while (currNode.next) currNode = currNode.next
    currNode.next = newNode
    return this
  }

  // 对链表不产生影响，方便测试
  toString() {
    let currNode = this
    let str = ''
    while (currNode.next) {
      str += currNode.val + ','
      currNode = currNode.next
    }
    str += currNode.val
    return str
  }
}

export class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
  push(val) {
    let currNode = this
    let oldLeft = currNode.left
    let oldRight = currNode.right
    while (currNode.left && currNode.right) {
      currNode = currNode.left
    }
    return this
  }
}
