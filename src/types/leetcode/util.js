/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-22 08:47:11
 * @LastEditTime: 2019-03-25 09:44:18
 * @Description: helper 函数集合，一般是 leetcode 中的题目已经定义的函数，比如单向链表，二叉树之类的
 */

/**
 * （leetcode 专用的？）单向链表的创建，用 push 来往尾部添加一个节点
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
}

export class TestTreeNode {
  constructor(list = []) {
    this.val = null
    this.left = null
    this.right = null

    let len = list.length
    while (len) {
      this.push(list[list.length - len])
      len--
    }
  }
  push(val) {
    if (!this.val) {
      this.val = val
    } else {
      let node = new TreeNode(val)

      function haveBlank(root) {
        if (root.left && root.right) return false
        return true
      }

      function add(root) {
        if (haveBlank(root.left)) {
          if (!root.left) {
            root.left = node
          } else if (!root.right) {
            root.right = node
          }
        } else if (haveBlank(root.right)) {
          if (!root.left) {
            root.left = node
          } else if (!root.right) {
            root.right = node
          }
        }
      }

      add(this)
    }
  }
}
